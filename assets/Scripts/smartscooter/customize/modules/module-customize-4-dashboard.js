/* global $:false, Blob:false, saveAs:false */


gogoroApp.controller('moduleCustomize4DashboardController', ["$scope", "$element", "$window", "$document", "FallbackManagerFactory", function ($scope, $element, $window, $document, FallbackManagerFactory) {
    angular.extend($scope, FallbackManagerFactory);

    $scope.standard = {
      init: function() {
        imgix.fluid({
          fluidClass: 'customize-4-standard'
        });

        var that = this;

        var draggingDial = false;

        // for our sanity. we could also generate this
        var steps = [
          [12, 255, 255, 'rgb(12, 255, 255)'],
          [12, 197, 255, 'rgb(12, 197, 255)'],
          [12, 139, 255, 'rgb(12, 139, 255)'],
          [12, 81, 255, 'rgb(12, 81, 255)'],
          [12, 23, 255, 'rgb(12, 23, 255)'],
          [59, 12, 255, 'rgb(59, 12, 255)'],
          [117, 12, 255, 'rgb(117, 12, 255)'],
          [175, 12, 255, 'rgb(175, 12, 255)'],
          [233, 12, 255, 'rgb(233, 12, 255)'],
          [255, 12, 218, 'rgb(255, 12, 218)'],
          [255, 12, 161, 'rgb(255, 12, 161)'],
          [255, 12, 103, 'rgb(255, 12, 103)'],
          [255, 12, 45, 'rgb(255, 12, 45)'],
          [255, 37, 12, 'rgb(255, 37, 12)'],
          [255, 95, 12, 'rgb(255, 95, 12)'],
          [255, 153, 12, 'rgb(255, 153, 12)'],
          [255, 211, 12, 'rgb(255, 211, 12)'],
          [240, 255, 12, 'rgb(240, 255, 12)'],
          [185, 255, 12, 'rgb(182, 255, 12)'],
          [125, 255, 12, 'rgb(125, 255, 12)'],
          [67, 255, 12, 'rgb(67, 255, 12)'],
          [12, 255, 15, 'rgb(12, 255, 15)'],
          [12, 255, 73, 'rgb(12, 255, 73)'],
          [12, 255, 131, 'rgb(12, 255, 131)'],
          [12, 255, 189, 'rgb(12, 255, 189)'],
          [12, 255, 247, 'rgb(12, 255, 247)']
        ];

        var hsvToRgb = function(h, s, v) {
          h *= 6;
          var i = ~~h,
            f = h - i,
            p = v * (1 - s),
            q = v * (1 - f * s),
            t = v * (1 - (1 - f) * s),
            mod = i % 6,
            r = [v, q, p, p, t, v][mod] * 255,
            g = [t, v, v, q, p, p][mod] * 255,
            b = [p, p, t, v, v, q][mod] * 255;

          return [r, g, b, 'rgb(' + ~~r + ',' + ~~g + ',' + ~~b + ')'];
        };

        var rgb2hex = function(rgb) {
          rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
          return (rgb && rgb.length === 4) ? '#' +
            ('0' + parseInt(rgb[1], 10).toString(16)).slice(-2) +
            ('0' + parseInt(rgb[2], 10).toString(16)).slice(-2) +
            ('0' + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
        };

        var stepTheta = function(theta) {
          // if we floor our theta, we get PI * 2 (floored) possible positions
          // 15 -> 95 * 95 = 9025 possible backgrounds
          // 6-> 38 * 38 = 1444 possible backgrounds
          // 4 -> 26 * 26 = 676 possible backgrounds

          theta *= 4;
          theta = Math.floor(theta);
          theta /= 4;

          return theta;
        };

        var distanceBetweenColors = function(a, b) {
          return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2) + Math.pow(a[2] - b[2], 2));
        };

        var closestColor = function(color) {
          var closestIndex = 0;
          var closestDistance = -1;

          for (var i = 0; i < steps.length; i++) {
            var distance = distanceBetweenColors(color, steps[i]);

            if (closestDistance === -1 || distance < closestDistance) {
              closestIndex = i;
              closestDistance = distance;
            }
          }

          return steps[closestIndex];
        };

        var buildColorWheels = function($el) {
          // hardcode -- if we resize we may not be able to get our width
          var width = 130; //$el.eq(0).width();

          var circleMargin = 14;
          var diameter = width - (circleMargin * 2);
          var radius = diameter / 2;

          var torusThickness = 5;
          var dialTrackRadius = radius - torusThickness / 2;

          var colorWheelCanvas;

          // -----------------------------------------------------------------------------
          // -----------------------------------------------------------------------------
          // generate all possible backgrounds
          // we can take this out for production
/*
          var generateBackgrounds = function() {
            var saveColorList = function() {
              // spit out our color list for reference

              var list = '';

              for (var startIndex = 0; startIndex < colors.length; startIndex++) {
                var startColorHex = rgb2hex(colors[startIndex]).substr(1, 6);

                for (var endIndex = 0; endIndex < colors.length; endIndex++) {
                  var endColorHex = rgb2hex(colors[endIndex]).substr(1, 6);

                  list += startColorHex + endColorHex + '\n';
                }
              }

              var blob = new Blob([list], {
                type: 'text/plain'
              });
              saveAs(blob, 'master-image-list.txt');

              // compare lists with: grep -Fxv -f image-list.txt master-image-list.txt
            };

            // facebook
            //var width = 484;
            //var height = 252;

            // twitter
            var width = 1200;
            var height = 1200;

            var scooterImg = $('<img>', {
              //src: '/img/bgd-module-customize-4-dashboard-social-facebook.png',
              src: '/img/bgd-module-customize-4-dashboard-social-twitter.png',
              width: width,
              height: height,
            })[0];

            // our canvas

            var canvas = $('<canvas>').attr({
              'width': width,
              'height': height
            })[0];

            var context = canvas.getContext('2d');

            $('#site-container').html(canvas);

            // generate list of possible colors

            var colors = [];

            for (var angle = 0; angle < 360; angle += 0.01) {
              var theta = stepTheta(angle * Math.PI / 180);

              var x = dialTrackRadius * Math.cos(theta);
              var y = dialTrackRadius * Math.sin(theta);

              var d = x * x + y * y;

              var rgb = hsvToRgb(
                (theta + Math.PI) / (Math.PI * 2),
                Math.sqrt(d) / radius,
                1
              );

              if (colors.length === 0 ||
                (colors[0] !== rgb[3] &&
                  colors[colors.length - 1] !== rgb[3])) {
                colors.push(rgb[3]);
              }
            }

            //saveColorList();

            // start rendering after our image loads

            var rendered = 0;
            var totalRenders = colors.length * colors.length;

            var startIndex = 0;
            var endIndex = 0;

            var startColor = colors[startIndex];
            var startColorHex = rgb2hex(startColor).substr(1, 6);

            var endColor = colors[endIndex];
            var endColorHex = rgb2hex(endColor).substr(1, 6);

            var raf = $window.requestAnimationFrame;

            var updateGradient = function() {
              if (++endIndex === colors.length) {
                if (++startIndex === colors.length) return false;

                startColor = colors[startIndex];
                startColorHex = rgb2hex(startColor).substr(1, 6);

                endIndex = 0;
              }

              endColor = colors[endIndex];
              endColorHex = rgb2hex(endColor).substr(1, 6);

              return true;
            };

            var iterate = function() {
              var grd = context.createLinearGradient(0, 0, width, 0);
              grd.addColorStop(0, startColor);
              grd.addColorStop(1, endColor);

              context.fillStyle = grd;
              context.fillRect(0, 0, width, height);

              context.drawImage(scooterImg, 0, 0, width, height);

              // save -- MUST RUN IN CHROME

              canvas.toBlob(
                function(blob) {
                  // console.log('rendered: ', ++rendered, ((~~(rendered / totalRenders * 1000)) / 10) + '%', startColorHex + endColorHex);

                  // only uncomment if you want to bring the pain
                  //saveAs(blob, startColorHex + endColorHex + '.jpg');

                  if (updateGradient()) raf(iterate);
                  else // console.log('finished rendering');
                },
                'image/jpeg', 1);
            };

            // alternate method, iterate over a single list to fill in the gaps

            var missingColorIndex = 0;
            var missingColors = [];

            var iterateMissingColors = function() {
              var missingColorHex = missingColors[missingColorIndex];

              var startColorHex = '#' + missingColorHex.substr(0, 6);
              var endColorHex = '#' + missingColorHex.substr(6, 6);

              var grd = context.createLinearGradient(0, 0, width, 0);
              grd.addColorStop(0, startColorHex);
              grd.addColorStop(1, endColorHex);

              context.fillStyle = grd;
              context.fillRect(0, 0, width, height);

              context.drawImage(scooterImg, 0, 0, width, height);

              // save -- MUST RUN IN CHROME

              canvas.toBlob(
                function(blob) {
                  // console.log('rendered: ', ++rendered, ((~~(rendered / missingColors.length * 1000)) / 10) + '%', missingColorHex);

                  // only uncomment if you want to bring the pain
                  //saveAs(blob, missingColorHex + '.jpg');

                  if (++missingColorIndex < missingColors.length) raf(iterateMissingColors);
                  else // console.log('finished rendering');
                },
                'image/jpeg', 1);
            };

            //scooterImg.onload = function() {  raf(iterateMissingColors); };
            scooterImg.onload = function() {
              raf(iterate);
            };
          };
          // -----------------------------------------------------------------------------
          // -----------------------------------------------------------------------------
*/

          var createColorWheelCanvas = function() {
            // 4 times target size

            var scaleFactor = 4;

            var scaledWidth = width * scaleFactor;

            var scaledRadius = radius * scaleFactor;
            var scaledRadiusSquared = scaledRadius * scaledRadius;

            var scaledTorusThickness = torusThickness * scaleFactor;
            var scaledRMT = scaledRadius - scaledTorusThickness;
            var scaledRMTSquared = scaledRMT * scaledRMT;

            var wheelPixel = circleMargin * 4 * (scaledWidth + 1);

            var canvas = $('<canvas>').attr({
              'width': scaledWidth,
              'height': scaledWidth
            })[0];

            var context = canvas.getContext('2d');
            var imageData = context.createImageData(scaledWidth, scaledWidth);
            var pixels = imageData.data;

            for (var y = 0; y < scaledWidth; y++) {
              for (var x = 0; x < scaledWidth; x++) {
                var rx = x - scaledRadius;
                var ry = y - scaledRadius;
                var d = rx * rx + ry * ry;
                var rgb = hsvToRgb(
                  (Math.atan2(ry, rx) + Math.PI) / (Math.PI * 2),
                  Math.sqrt(d) / scaledRadius,
                  1);

                pixels[wheelPixel++] = rgb[0];
                pixels[wheelPixel++] = rgb[1];
                pixels[wheelPixel++] = rgb[2];
                pixels[wheelPixel++] = (d > scaledRadiusSquared || d < scaledRMTSquared) ? 0 : 255;
              }
            }

            context.putImageData(imageData, 0, 0);

            // scale down once

            scaledWidth /= 2;

            colorWheelCanvas = $('<canvas>').attr({
              'width': scaledWidth,
              'height': scaledWidth
            })[0];

            colorWheelCanvas.getContext('2d').drawImage(canvas, 0, 0, scaledWidth, scaledWidth);
          };

          var buildColorWheel = function(index, element) {
            var $el = $(element);

            var $colorWheelEl;
            var $dialEl;

//          var dialY = index === 1 ? -radius / 2 : radius;
//          var dialX = index === 1 ? radius / 2 : 0;
            var dialY = index === 1 ? -radius / 2 : 81;
            var dialX = index === 1 ? radius / 2 : 50;

            var dialWidth2;

            //Gavin
            var iKey = index;
            var isLoop = false;
            var loopNumber = 0; 
            var timeoutSec = 150;
            var pointParting = 10;
            var loopPoints = [];
            var cX = cY = 0;

            var redraw = function(e, eX , eY) {
              if (e) {
               if(!isLoop){e.preventDefault();}

                var offset = $colorWheelEl.offset();
                 //Gavin
                eX = (isNaN(Number(eX))) ? e.pageX : Number(eX);
                eY = (isNaN(Number(eY))) ? e.pageY : Number(eY);
                dialX = eX - offset.left - dialTrackRadius || dialX;
                dialY = eY - offset.top - dialTrackRadius || dialY;
                //dialX = (e.pageX - dialWidth2 / 2) - offset.left - dialTrackRadius || dialX;
                //dialY = (e.pageY - dialWidth2 / 2) - offset.top - dialTrackRadius || dialY;
              }

              var theta = Math.atan2(dialY, dialX);

              dialX = dialTrackRadius * Math.cos(theta);
              dialY = dialTrackRadius * Math.sin(theta);

              var d = dialX * dialX + dialY * dialY;

              // position dial

              $dialEl.css({
                'left': (dialX + dialTrackRadius - dialWidth2 / 2) + 'px',
                'top': (dialY + dialTrackRadius - dialWidth2 / 2) + 'px'
              });

              // set color

              var rgb = hsvToRgb(
                (theta + Math.PI) / (Math.PI * 2),
                Math.sqrt(d) / radius,
                1
              );

              var steppedRgb = closestColor(rgb);

              colorWheelValues[index] = {
                raw: rgb[3],
                stepped: steppedRgb[3]
              };

              $dialEl[0].style.background = steppedRgb[3];

              updateBackground();
            };

            //Gavin
            var circlePoint = function(x,y,r){
                var points = [];
                for(var degree = 360;degree >= 0;degree -= pointParting){
                    var x2 = r * Math.sin(degree * Math.PI / 180);
                    var y2 = r * Math.cos(degree * Math.PI / 180);
                    points.push({"x":x + x2,"y":y + y2});
                }
                return points;
            };

            //Gavin
            var loopAnimation = function(e){
                //var div = '<div style="position:absolute; width:5px; height:5px; background:#000; top:'+loopPoints[loopNumber].y+'px;left:'+loopPoints[loopNumber].x+'px;"></div>';
                //$('body').append(div);
                if(isLoop){
                    redraw(e, loopPoints[loopNumber].x,loopPoints[loopNumber].y);
                    loopNumber++;
                    loopNumber = (loopNumber >= loopPoints.length) ? 0 : loopNumber;
                    setTimeout(function() { loopAnimation(e); },timeoutSec);
                }
            };

            //Gavin
            var startLoop = function(){
              if(!isLoop){
                isLoop = true;
                draggingDial = false;
                loopNumber = (iKey == 0) ? 0 : 30;
                if(cX == 0 || cY == 0){
                    cX = $colorWheelEl.offset().left + 50;
                    cY = $colorWheelEl.offset().top + 50;
                }
                loopPoints = circlePoint(cX,cY,100);
                loopAnimation($dialEl);
              }
            };

            //Gavin
            var stopLoop  = function(){
                //draggingDial = false;
                isLoop = false;
            };

            $colorWheelEl = $('<canvas>').attr({
              'width': width,
              'height': width
            });

            $colorWheelEl[0].getContext('2d').drawImage(colorWheelCanvas, 0, 0, width, width);
            $el.append($colorWheelEl);

            $dialEl = $('<div class="dial"><div class="border"></div></div>');
            $el.append($dialEl);
            dialWidth2 = $dialEl.width() / 2;

            var dialElMousedownFn = function(e) {
              e.preventDefault();
              draggingDial = true;

              $($document).on('mousemove', redraw);
            };

            // need to unbind later
            that.dialElMouseupFn = function(e) {
              draggingDial = false;
              updateSns();

              $($document).off('mousemove', redraw);
            };

            $dialEl.on('mousedown', dialElMousedownFn);
            $($document).on('mouseup', that.dialElMouseupFn);

            redraw();

            //Gavin
            var $gradientToggleEl = $(document).find('.gradient-solid-toggle .gradient');
            var $solidToggleEl = $(document).find('.gradient-solid-toggle .solid');
            var $loopToggleEl = $(document).find('.gradient-solid-toggle .loop');
            $gradientToggleEl.click(function() {
                stopLoop();
            });

            $solidToggleEl.click(function() {
                stopLoop();
            });

            $loopToggleEl.click(function() {
                startLoop();
            });

            //Gavin
            $( window ).resize(function() {
                cX = $colorWheelEl.offset().left + 50;
                cY = $colorWheelEl.offset().top + 50;
                loopPoints = circlePoint(cX,cY,100);
            });
          };

          createColorWheelCanvas();
          $el.each(buildColorWheel);

          // -----------------------------------------------------------------------------
          // -----------------------------------------------------------------------------
          // remove for production

          // only uncomment if you want to bring the pain
          //generateBackgrounds();
          // -----------------------------------------------------------------------------
          // -----------------------------------------------------------------------------
        };

        var updateBackground = function() {
          if (mode === 'solid') {
            var solidColor = colorWheelValues[0].raw;

            if (solidColor !== undefined) $backgroundSolidEl[0].style.background = solidColor;
          } else {
            var leftColor = colorWheelValues[0].raw;
            var rightColor = colorWheelValues[1].raw;

            if (leftColor !== undefined && rightColor !== undefined) {

              $backgroundGradientEl.css({
                'background': '-moz-linear-gradient(left, ' + leftColor + ' 0%, ' + rightColor + ' 100%)'
              }); /* FF 3.6+ */
              $backgroundGradientEl.css({
                'background': '-webkit-gradient(linear, left top, right top, color-stop(0%, ' + leftColor + ')), color-stop(100%,' + rightColor + '))'
              }); /* Chrome, Safari 4+ */
              $backgroundGradientEl.css({
                'background': '-webkit-linear-gradient(left, ' + leftColor + ' 0%, ' + rightColor + ' 100%)'
              }); /* Chrome 10+, Safari 5.1+ */
              $backgroundGradientEl.css({
                'background': '-o-linear-gradient(left, ' + leftColor + ' 0%, ' + rightColor + ' 100%)'
              }); /* Opera 11.10+ */
              $backgroundGradientEl.css({
                'background': '-ms-linear-gradient(left, ' + leftColor + ' 0%, ' + rightColor + ' 100%)'
              }); /* IE 10+ */
              $backgroundGradientEl.css({
                'background': '-linear-gradient(to right, ' + leftColor + ' 0%, ' + rightColor + ' 100%)'
              }); /* W3C */

              var leftColorHex = rgb2hex(leftColor);
              var rightColorHex = rgb2hex(rightColor);

              $backgroundGradientEl.css({
                'filter': "progid:DXImageTransform.Microsoft.gradient( startColorstr='" + leftColorHex + "', endColorstr='" + rightColorHex + "',GradientType=1 )"
              }); /* IE6-8 */
            }
          }
        };

        var updateSns = function() {
          var startColorHex = rgb2hex(colorWheelValues[0].stepped).substr(1, 6);
          var endColorHex;

          if (mode === 'gradient') {
            endColorHex = rgb2hex(colorWheelValues[1].stepped).substr(1, 6);
          } else {
            endColorHex = startColorHex;
          }

          var text = 'Light it up. Make it yours.';

          // get the host (sample)
          //var url = 'http://' + $window.location.host;

          // sample OG sharing -- example uses mod rewrite to rewrite /xxx to /index.php?color=xxx
          var url = 'http://gogoro.tree-axis.com/' + startColorHex + endColorHex;

          var facebookUrl = 'http://www.gogoro.com/about/home/dashboard-social-facebook/' + startColorHex + endColorHex;
          var twitterUrl = 'http://www.gogoro.com/about/home/dashboard-social-twitter/' + startColorHex + endColorHex;

          $facebookEl.attr({
            href: 'http://www.facebook.com/sharer.php?u=' + encodeURI(facebookUrl),
            target: '_blank'
          });
          $twitterEl.attr({
            href: 'http://twitter.com/share?text=' + encodeURI(text) + '&url=' + encodeURI(twitterUrl),
            target: '_blank'
          });
        };

        // setup

        var $el = $($element);

        var $scooterEl = $el.children('.scooter');

        var $backgroundGradientEl = $scooterEl.find('.background .gradient');
        var $backgroundSolidEl = $scooterEl.find('.background .solid');

        var $gradientToggleEl = $el.find('.gradient-solid-toggle .gradient');
        var $solidToggleEl = $el.find('.gradient-solid-toggle .solid');
        //Gavin
        var $loopToggleEl = $el.find('.gradient-solid-toggle .loop');

        var $wheelsEl = $el.find('.color-wheels .wheels');

        var $facebookEl = $el.find('.sns .facebook');
        var $twitterEl = $el.find('.sns .twitter');

        // our wheels

        var colorWheelValues = [{}, {}];
        buildColorWheels($wheelsEl.children('.wheel'));

        updateBackground(); // both wheels are in

        var mode = 'gradient';
        updateSns();

        // hovers

        var gradientToggleFn = function() {
          if (!draggingDial) {
            $gradientToggleEl.stop().fadeTo('fast', 1);
            $solidToggleEl.stop().fadeTo('fast', 0.3);
            //Gavin
            $loopToggleEl.stop().fadeTo('fast', 0.3);

            $wheelsEl.children('.wheel').show();

            $backgroundGradientEl.show();
            $backgroundSolidEl.hide();

            mode = 'gradient';
            updateBackground();
          }
        };

        var solidToggleFn = function() {
          if (!draggingDial) {
            $gradientToggleEl.stop().fadeTo('fast', 0.3);
            $solidToggleEl.stop().fadeTo('fast', 1);
            //Gavin
            $loopToggleEl.stop().fadeTo('fast', 0.3);

            $wheelsEl.children('.wheel').eq(1).hide();

            $backgroundGradientEl.hide();
            $backgroundSolidEl.show();

            mode = 'solid';
            updateBackground();
          }
        };

        //Gavin
        var loopToggleFn = function() {
          if (!draggingDial) {
            $gradientToggleEl.stop().fadeTo('fast', 0.3);
            $solidToggleEl.stop().fadeTo('fast', 0.3);
            $loopToggleEl.stop().fadeTo('fast', 1);
            $wheelsEl.children('.wheel').show();
          }
        };

        $gradientToggleEl.on('click', gradientToggleFn);
        $solidToggleEl.on('click', solidToggleFn);
        //Gavin
        $loopToggleEl.on('click', loopToggleFn);
      },

      destroy: function() {
        var $el = $($element);

        var $gradientToggleEl = $el.find('.gradient-solid-toggle .gradient');
        var $solidToggleEl = $el.find('.gradient-solid-toggle .solid');

        $gradientToggleEl.off('click');
        $solidToggleEl.off('click');

        $($document).off('mouseup', this.dialElMouseupFn);
        $el.find('.wheel').children().remove(); // unbinds dials
      }
    };

    $scope.fallback = {
      init: function() {
      },

      destroy: function() {
      }
    };

    // Initialize module
    $scope.init($scope, $element);
  }]);
