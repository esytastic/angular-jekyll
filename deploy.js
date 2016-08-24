// Custom S3 deployment script

'use strict';

const Async = require('async');
const AWS = require('aws-sdk');
const Crypto = require('crypto');
const Fs = require('fs');
const Glob = require('glob');
const Mime = require('mime');
const Path = require('path');

const config = {
    environments: {
        staging: {
            profile: 'rw',
            bucket: 'ggrweb'
        },
        production: {
            profile: 'ggr',
            bucket: 'gogoro-website'
        }
    },
    publicRoot: Path.join(__dirname, 'public'),
    concurrentRequests: 10,
    excludeTransform: /^(css|js|Resources|Scripts)/,
    redirects: [
        { src: 'smartscooter/Smarter', dst: '/smartscooter/smarter' },
        { src: 'smartscooter/Faster', dst: '/smartscooter/faster' },
        { src: 'smartscooter/Easier', dst: '/smartscooter/easier' },
        { src: 'smartscooter/Customize', dst: '/smartscooter/customize' },
        { src: 'FAQ', dst: '/faq' },
        { src: 'OPEN', dst: '/open' },
        { src: 'gogoroopen', dst: '/open' },
        { src: 'GogoroOPEN', dst: '/open' },

        // zh-tw redirects

        { src: 'tw/account/login', dst: 'https://my.gogoro.com/tw/account/login' },
        { src: 'tw/smartscooter/Smarter', dst: '/tw/smartscooter/smarter' },
        { src: 'tw/smartscooter/Faster', dst: '/tw/smartscooter/faster' },
        { src: 'tw/smartscooter/Easier', dst: '/tw/smartscooter/easier' },
        { src: 'tw/smartscooter/Customize', dst: '/tw/smartscooter/customize' },
        { src: 'tw/FAQ', dst: '/tw/faq' },
        { src: 'tw/OPEN', dst: '/tw/open' },

        // en-tw redirects

        { src: 'tw/en/account/login', dst: 'https://my.gogoro.com/tw/account/login' },
        { src: 'tw/en/smartscooter/Smarter', dst: '/tw/en/smartscooter/smarter' },
        { src: 'tw/en/smartscooter/Faster', dst: '/tw/en/smartscooter/faster' },
        { src: 'tw/en/smartscooter/Easier', dst: '/tw/en/smartscooter/easier' },
        { src: 'tw/en/smartscooter/Customize', dst: '/tw/en/smartscooter/customize' },
        { src: 'tw/en/FAQ', dst: '/tw/faq' },
        { src: 'tw/en/OPEN', dst: '/tw/en/open' }
    ]
};

const deploymentConfig = config.environments[process.argv[2]];

if (!deploymentConfig) {
    throw new Error('Need to specify valid deployment environment e.g. `node deploy.js production`');
}

var credentials = new AWS.SharedIniFileCredentials({ profile: deploymentConfig.profile });
AWS.config.credentials = credentials;

const s3 = new AWS.S3();

const status = {
    total: 0,
    uploaded: 0,
    skipped: 0
};

function printProgress (action, file) {
    process.stdout.clearLine();
    process.stdout.write('\r' +
        status.uploaded + ' uploaded / ' +
        status.skipped + ' skipped / ' +
        status.total + ' total --- ' +
        (((status.uploaded + status.skipped) / status.total) * 100).toFixed(2) +'% complete' +
        ' --- ' + action + ' ' + file);
}

function printFiles (files) {
    console.log(files);
}

// Prepares a list of files to deploy

function getFiles () {
    return new Promise((resolve, reject) => {
        Glob('**/*.*', { cwd: config.publicRoot }, (err, files) => {
            if (err) {
                return reject(err);
            }
            files = files.filter(f => !Fs.lstatSync(Path.join(config.publicRoot, f)).isDirectory())
            resolve(files.map(f => {
                const body = Fs.readFileSync(Path.join(config.publicRoot, f));
                return  {
                    body: body,
                    type: Mime.lookup(f),
                    md5: Crypto.createHash('md5').update(body).digest('hex'),
                    path: Path.parse(f)
                }
            }));
        });
    });
}

// Does any name transformations required
//
// Amazon S3 will redirect missing trailing slash to trailing slash but not vice-versa
// so you can't have a file called something that isn't index.html and expect both clean
// URLS and sane redrecting on the trailing slash

function doTransforms (files) {
    return new Promise((resolve, reject) => {
        resolve(files.map((f) => {
            if (/[^(index|error)].+\.html/.test(f.path.base) &&
                !/^(css|js|Scripts|Resources)/.test(f.path.dir)) {
                f.path.base = 'index.html';
                f.path.dir += f.path.dir === '' ?
                    f.path.name :
                    '/' + f.path.name;
                return f;
            }
            return f;
        }));
    });
}

function checkIfUploadRequired (file, callback) {

    const key = Path.join(file.path.dir, file.path.base).replace(/\\/g,'/');

    s3.headObject({
        Bucket: deploymentConfig.bucket,
        Key: key
    }, (err, data) => {

        if (err) {
            if (err.code === 'NotFound') {
                return callback(null, true);
            }
            return callback(err);
        }

        // Skip file if not changed

        if (data.Metadata['content-md5'] === file.md5) {
            return callback(null, false);
        }
        callback(null, true);
    });
}

function uploadFile (file, callback) {

    const key = Path.join(file.path.dir, file.path.base).replace(/\\/g,'/');

    const params = {
        Bucket: deploymentConfig.bucket,
        Key: key,
        ACL: 'public-read',
        Body: file.body,
        ContentType: file.type,
        Metadata: {
            'Content-MD5': file.md5
        }
    };

    s3.putObject(params, (err, data) => {

        if (err) {
            return callback(err);
        }

        status.uploaded++;
        printProgress('Uploaded', file.path.dir + '/' + file.path.base);
        callback(null);
    });
}

// Uploads files if they need to be

function uploadFiles (files) {

    status.total = files.length;

    const processFile =  (file, callback) => {

        checkIfUploadRequired(file, (err, required) => {

            if (err) {
                return callback(err);
            }

            if (required) {
                return uploadFile(file, callback);
            }

            status.skipped++;
            printProgress('Skipped', file.path.dir + '/' + file.path.base);
            return callback();
        });
    };

    return new Promise((resolve, reject) => {
        Async.eachLimit(files, config.concurrentRequests, processFile, err => {

            if (err) {
                return reject(err);
            }
            console.log('\n');
            resolve();
        });
    });
}

function setRedirect (rule, callback) {

    const params = {
        Bucket: deploymentConfig.bucket,
        Key: rule.src,
        ACL: 'public-read',
        Body: '', // empty body
        WebsiteRedirectLocation: rule.dst
    };

    s3.putObject(params, (err, data) => {

        if (err) {
            return callback(err);
        }

        console.log('Added redirect %s => %s', rule.src, rule.dst);
        callback(null);
    });
}

// Set up a bunch of redirects

function makeRedirects () {
    return new Promise((resolve, reject) => {

        Async.eachLimit(config.redirects, config.concurrentRequests, setRedirect, err => {

            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}

// Execute promise chain

getFiles()
    .then(doTransforms)
    // .then(printFiles)
    .then(uploadFiles)
    .then(makeRedirects)
    .then(() => {
        console.log('\n\nCOMPLETE!');
    })
    .catch(err => {
        console.log('ERROR!');
        console.log(err.stack);
    });
