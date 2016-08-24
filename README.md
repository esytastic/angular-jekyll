# Gogo web static site

This site has been converted from an [ASP.NET MVC](http://www.asp.net/mvc) app to a fully static site powered by [Jekyll](http://jekyllrb.com/).

## Static asset bundling (css/js)

Bundle specifications in bundle.json define how css and js source files (inside /assets) are built by [Gulp](http://gulpjs.com/) into bundles. These bundles are placed in /src, ready for inclusion by Jekyll in the final build.

## Requirements

* [Node.js](https://nodejs.org)
* [Ruby](https://www.ruby-lang.org)
* [Jekyll](https://jekyllrb.com/) (install with `gem install jekyll:3.0.1 jekyll-utf8`)

## Build steps

There are 2 build steps:

1. Gulp will process bundle and css/js/fonts and place into `/src`  
2. Jekyll will read `/src` and build site, place into `/public`

To install build dependencies run:

    npm install

To build site for production run:

    npm run build

To build site for development run:

    npm run build-dev

## Files and folders

- `assets` - These have been copied _without modification_ from the original ASP site's source code
- `public` (after Jekyll build) - Jekyll emits the final static output in here, this is the "website" that gets deployed
- `src` - The source files that Jekyll uses to build the site
    - `_includes` - Partial templates
    - `_layouts` - Layout templates
    - `_plugins` - Jekyll plugins written in Ruby
    - `css|fonts|js|Resources|Scripts` (after Gulp build) - copied/processed by Grunt step from `/assets`
- `config.yml` - [The Jekyll configuration file](http://jekyllrb.com/docs/configuration/)
- `bundle.json` - Specifies how css and js source files should be bundled together into combined packages
- `gulpfile.js` - Contains Gulp build tasks written in JavaScript

## Developing

To start dev server and watch all assets and site for rebuilding (convenient when developing) run:

    npm start

## Deployment

Deployments compare files in `/public` to S3 bucket contents and updates all changed files. The deployment script uses [AWS shared credentials](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SharedIniFileCredentials.html). 
The profile names saved on your machine should be `[rw]` for staging and `[ggr]` for production.

To deploy run:

    npm run deploy [staging|production]
