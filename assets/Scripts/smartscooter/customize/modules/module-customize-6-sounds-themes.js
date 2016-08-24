/* global $:false, Processing:false, Howl:false */
gogoroApp.controller('moduleCustomize6SoundsThemes', ["$scope", "$element", "FallbackManagerFactory", function ($scope, $element, FallbackManagerFactory) {
    angular.extend($scope, FallbackManagerFactory);
    
    $scope.standard = {
        init: function() {
        
          var that = this;

          var $el = $($element);

          var $themesEl = $el.find('.theme-toggle a');
          var $triggersEl = $el.find('.preview .sounds .sound');

          var $scriptEl = $el.find('#gogoro-sound-processing');
          var $canvasEl = $el.find('#gogoro-sound-processing-canvas');

          var currentTheme, currentAction;
          var themes = ['clean', 'gamey', 'bella', 'slider', 'pongo'];
          var actions = ['kickstandDown', 'kickstandUp', 'remoteLock', 'remoteUnlock', 'turnSignal'];

          var sounds = {};
          for (var i = 0; i < themes.length; i++) sounds[themes[i]] = {};

          var setSoundTitle = function(id) {
            var $triggerEl = $triggersEl.filter(function() {
              return $(this).data('trigger') === id;
            });

            $el.find('.preview .sound-title').html($triggerEl.attr('title'));

            $triggersEl.removeClass('active');
            $triggerEl.addClass('active');
          };

          var trigger = function(id) {
            // set our currentAction
            currentAction = actions.indexOf(id);

            // update our text
            setSoundTitle(id);

            // play sound
            sounds[currentTheme][id].play();

            // trigger animation
            if (that.pjs !== null) that.pjs.trigger(id);
          };

          var advance = function() {
            if (++currentAction >= actions.length) currentAction = 0;
            trigger(actions[currentAction]);
          };

          var loadCurrentThemeSounds = function() {
              var prefix = '//movies.gogoroapp.com/sounds/' + currentTheme + '/';

                for (var i = 0; i < actions.length; i++) {
                  var action = actions[i];

                  if (sounds[currentTheme][action] === undefined) {
                    sounds[currentTheme][action] = new Howl({
                      src: [prefix + action + '.mp3', prefix + action + '.ogg', prefix + action + '.wav']
                    });
                  }
                }

          };

          var setCurrentTheme = function(id) {
            currentTheme = id;
            loadCurrentThemeSounds();

            if (that.pjs !== null) that.pjs.setupTheme(id);
          };

          // our events

          $themesEl.on('click', function() {
            $themesEl.css({
              opacity: 0.3
            });
            $(this).css({
              opacity: 1
            });

            setCurrentTheme($(this).data('theme'));
          });

          $triggersEl.on('click', function(e) {
            trigger($(this).data('trigger'));

            e.stopPropagation();
          });

          $el.find('.preview').on('click', advance);

          // off we go
    
          // save our compiled code
          //var blob = new Blob([Processing.compile($scriptEl.html()).sourceCode], {type: 'text/plain'});
          //saveAs(blob, 'source.txt');

/* --------------------------------------------------------------------------------------------------------------------- */

var playfulSounds = function($p) {
var JavaScript = (function() {
function JavaScript() { throw 'Unable to create the interface'; }
JavaScript.$isInterface = true;
JavaScript.$methods = ['playSound'];
return JavaScript;
})();
$p.JavaScript = JavaScript;
var Timeline = (function() {
function Timeline() {
var $this_1 = this;
function $superCstr(){$p.extendClassChain($this_1)}
$this_1.startMillis = 0;
$this_1.events = null;
$this_1.lastEventIndex = 0;
function reset$0() {
$this_1.startMillis = $p.millis();    
    $this_1.lastEventIndex = 0;
}
$p.addMethod($this_1, 'reset', reset$0, false);
function play$0() {
var currentTime =  $p.millis() - $this_1.startMillis;

    if ($this_1.events != null) {
var i =  $this_1.lastEventIndex;

      while (i < $this_1.events.size()) {
var e =  $this_1.events.get(i);

        if (currentTime >= e.time) {
$this_1.lastEventIndex = i + 1;

          for(var j = 0;  j<moverCount;  j++) {
var m =  new Mover(e.position);
            movers.add(m);
}
}  
        i++;
}
}
}
$p.addMethod($this_1, 'play', play$0, false);
function $constr_0(){
$superCstr();

$this_1.$self.reset();
}

function $constr() {
if(arguments.length === 0) { $constr_0.apply($this_1, arguments); } else $superCstr();
}
$constr.apply(null, arguments);
}
return Timeline;
})();
$p.Timeline = Timeline;
var Event = (function() {
function Event() {
var $this_1 = this;
function $superCstr(){$p.extendClassChain($this_1)}
$this_1.time = 0;
$this_1.position = 0;
function $constr_2(t, p){
$superCstr();

$this_1.time = t;
      $this_1.position = p;
}

function $constr() {
if(arguments.length === 2) { $constr_2.apply($this_1, arguments); } else $superCstr();
}
$constr.apply(null, arguments);
}
return Event;
})();
$p.Event = Event;
var Parameters = (function() {
function Parameters() {
var $this_1 = this;
function $superCstr(){$p.extendClassChain($this_1)}
$this_1.rotationSpeed = 0;
$this_1.shapeType = 0;
$this_1.lineLength = 0;
$this_1.effectType = 0;
$this_1.influence = 0;
$this_1.push = 0;
$this_1.affectX = false;
$this_1.affectY = false;
$this_1.offsetRotationByIndexMultiplier = 0;
$this_1.startColor = 0x00000000;
$this_1.endColor = 0x00000000;
function $constr_0(){
$superCstr();

$this_1.rotationSpeed = 0;

    $this_1.shapeType = shapeTypeLine;
    $this_1.lineLength = 12;

    $this_1.effectType = effectTypeSpread;
    $this_1.influence = 100;
    $this_1.push = $this_1.influence;
    $this_1.affectX = true;
    $this_1.affectY = false;

    $this_1.offsetRotationByIndexMultiplier = 0;

    $this_1.startColor = $p.color(0xFFafdf22);
    $this_1.endColor = $p.color(0xFF2cb33b);
}

function $constr() {
if(arguments.length === 0) { $constr_0.apply($this_1, arguments); } else $superCstr();
}
$constr.apply(null, arguments);
}
return Parameters;
})();
$p.Parameters = Parameters;
var Atom = (function() {
function Atom() {
var $this_1 = this;
function $superCstr(){$p.extendClassChain($this_1)}
$p.defineProperty($this_1, 'radians120', {get: function(){return Atom.radians120}, set: function(val){Atom.radians120 = val}});
$p.defineProperty($this_1, 'radians240', {get: function(){return Atom.radians240}, set: function(val){Atom.radians240 = val}});
$this_1.index = 0;
$this_1.baseLocation = null;
$this_1.currentLocation = null;
$this_1.rotation = 0;
$this_1.rotationMultiplier = 0;
$this_1.parameters = null;
$this_1.triA = null;
$this_1.triB = null;
$this_1.triC = null;
$this_1.c = 0x00000000;
function setup$5(i, x, y, rm, p) {
$this_1.index = i;

    $this_1.baseLocation = new $p.PVector(x, y);
    $this_1.currentLocation = new $p.PVector(x, y);

    $this_1.parameters = p;

    $this_1.rotation = $this_1.index * $this_1.parameters.offsetRotationByIndexMultiplier;
    $this_1.rotationMultiplier = rm;

    if ($this_1.parameters.shapeType == shapeTypeTriangle) {
$this_1.triA = new $p.PVector();
      $this_1.triB = new $p.PVector();
      $this_1.triC = new $p.PVector($this_1.parameters.lineLength, $this_1.parameters.lineLength);

      $this_1.triB.x = $this_1.triC.x * $p.cos(Atom.radians120) - ($this_1.triC.y * $p.sin(Atom.radians120));
      $this_1.triB.y = $this_1.triC.x * $p.sin(Atom.radians120) + ($this_1.triC.y * $p.cos(Atom.radians120));
      $this_1.triA.x = $this_1.triC.x * $p.cos(Atom.radians240) - ($this_1.triC.y * $p.sin(Atom.radians240));
      $this_1.triA.y = $this_1.triC.x * $p.sin(Atom.radians240) + ($this_1.triC.y * $p.cos(Atom.radians240));
}

    var t =  x / drawWidth;
    $this_1.c = $p.lerpColor($this_1.parameters.startColor, $this_1.parameters.endColor, t);
}
$p.addMethod($this_1, 'setup', setup$5, false);
function draw$1(focusLocation) {
$p.pushMatrix();

    $p.translate($this_1.currentLocation.x, $this_1.currentLocation.y);

    var v =  new $p.PVector($this_1.currentLocation.x - focusLocation.x, $this_1.currentLocation.y - focusLocation.y);
    v.normalize();

    var d =  ($this_1.parameters.influence - Math.min($this_1.parameters.influence, $p.PVector.dist(focusLocation, $this_1.currentLocation))) / $this_1.parameters.influence;

    if ($this_1.parameters.effectType == effectTypeSpread) {
if ($this_1.parameters.affectX) $this_1.currentLocation.x = (($this_1.currentLocation.x + (v.x * d * $this_1.parameters.push)) + $this_1.baseLocation.x * 3) / 4;
      else $this_1.currentLocation.x = $this_1.baseLocation.x;

      if ($this_1.parameters.affectY) $this_1.currentLocation.y = (($this_1.currentLocation.y + (v.y * d * $this_1.parameters.push)) + $this_1.baseLocation.y * 3) / 4;
      else $this_1.currentLocation.y = $this_1.baseLocation.y;
} else if ($this_1.parameters.effectType == effectTypeRotate) {
$this_1.rotation += d * $this_1.parameters.push;
} else if ($this_1.parameters.effectType == effectTypeScale) {
$p.scale(d * $this_1.parameters.push + 0.5);
}

    if ($this_1.parameters.shapeType != shapeTypePoint && $this_1.parameters.shapeType != shapeTypeDekoBoko) {
$p.rotate($p.radians($this_1.rotation));
}

   $this_1.rotation += ($this_1.parameters.rotationSpeed * $this_1.rotationMultiplier);

   while($this_1.rotation > 360) {
$this_1.rotation -= 360;
}
   while($this_1.rotation < 360) {
$this_1.rotation += 360;
}

    switch($this_1.parameters.shapeType) {
case shapeTypeCheckered:
          $p.fill($this_1.c);
          $p.noStroke();

          $p.rect(0, 0, $this_1.parameters.lineLength, $this_1.parameters.lineLength);
          $p.rect(0, 0, -$this_1.parameters.lineLength, -$this_1.parameters.lineLength);
          break;case shapeTypePoint:
          $p.stroke($this_1.c);
          $p.noFill();

          $p.point(0, 0);  
          break;case shapeTypeLine:
          $p.fill($this_1.c);
          $p.noStroke();

          $p.rect(-2, -$this_1.parameters.lineLength, 4, $this_1.parameters.lineLength * 2);
          break;case shapeTypeRectCorners:
          $p.fill($this_1.c);
          $p.noStroke();

          $p.ellipse(-$this_1.parameters.lineLength, -$this_1.parameters.lineLength, 2, 2);  
          $p.ellipse(-$this_1.parameters.lineLength, $this_1.parameters.lineLength, 2, 2);  
          $p.ellipse($this_1.parameters.lineLength, $this_1.parameters.lineLength, 2, 2);  
          $p.ellipse($this_1.parameters.lineLength, -$this_1.parameters.lineLength, 2, 2);  
          break;case shapeTypeTriangle:
          $p.fill($this_1.c);
          $p.noStroke();

          $p.triangle($this_1.triA.x, $this_1.triA.y, $this_1.triB.x, $this_1.triB.y, $this_1.triC.x, $this_1.triC.y);
          break;case shapeTypeDekoBoko: 
          $p.stroke($this_1.c);
          $p.noFill();

          var h =  $p.sin($p.radians($this_1.rotation) * 2 + $this_1.index * $this_1.parameters.offsetRotationByIndexMultiplier) * $this_1.parameters.lineLength;
          var s =  ($p.cos($p.radians($this_1.rotation) + $this_1.index * $this_1.parameters.offsetRotationByIndexMultiplier) + 2) / 2;

          $p.scale(s, s);

          $p.line(-$this_1.parameters.lineLength / 2, 0, -$this_1.parameters.lineLength, 0);          
          $p.line($this_1.parameters.lineLength / 2, 0, $this_1.parameters.lineLength, 0);

          $p.line(-$this_1.parameters.lineLength / 2, 0, -$this_1.parameters.lineLength / 2, h);
          $p.line($this_1.parameters.lineLength / 2, 0, $this_1.parameters.lineLength / 2, h);
          $p.line(-$this_1.parameters.lineLength / 2, h, $this_1.parameters.lineLength / 2, h);
}

    $p.popMatrix();
}
$p.addMethod($this_1, 'draw', draw$1, false);
function $constr_5(i, x, y, rm, p){
$superCstr();

$this_1.$self.setup(i, x, y, rm, p);
}

function $constr() {
if(arguments.length === 5) { $constr_5.apply($this_1, arguments); } else $superCstr();
}
$constr.apply(null, arguments);
}
Atom.radians120 =  $p.radians(120);
Atom.radians240 =  $p.radians(240);
return Atom;
})();
$p.Atom = Atom;
var Mover = (function() {
function Mover() {
var $this_1 = this;
function $superCstr(){$p.extendClassChain($this_1)}
$this_1.location = null;
$this_1.target = null;
$this_1.direction = null;
$this_1.speed = 0;
$this_1.forceStrength = 0;
$this_1.dead = false;
function setup$1(y) {
$this_1.location = new $p.PVector(0, y);
    $this_1.target = new $p.PVector(drawWidth, y);

         var angle =  0 - $p.random($p.PI / 8) + $p.random($p.PI / 8);
    $this_1.direction = new $p.PVector($p.cos(angle), $p.sin(angle));

    $this_1.speed = $p.random(12, 22);
    $this_1.forceStrength = $p.random(0.1, 0.2);

    $this_1.dead = false;
}
$p.addMethod($this_1, 'setup', setup$1, false);
function update$1(mode) {
$this_1.$self.seek($this_1.target.x, $this_1.target.y);
    $this_1.$self.move();

    $this_1.$self.draw();
}
$p.addMethod($this_1, 'update', update$1, false);
function seek$2(x, y) {
$this_1.$self.seek(x, y, 1);
}
$p.addMethod($this_1, 'seek', seek$2, false);
function seek$3_2(x, y, strength) {
var angle =  $p.atan2(y - $this_1.location.y, x - $this_1.location.x);

    var force =  new $p.PVector($p.cos(angle), $p.sin(angle));
    force.mult($this_1.forceStrength * strength);

    $this_1.direction.add(force);
    $this_1.direction.normalize();
}
$p.addMethod($this_1, 'seek', seek$3_2, false);
function move$0() {
var velocity =  $this_1.direction.get();
    velocity.mult($this_1.speed);

    if ($this_1.location.x < $this_1.target.x && $this_1.location.x + velocity.x >= $this_1.target.x) $this_1.dead = true;
    else if ($this_1.location.x > $this_1.target.x && $this_1.location.x + velocity.x <= $this_1.target.x) $this_1.dead = true;

    $this_1.location.add(velocity);
}
$p.addMethod($this_1, 'move', move$0, false);
function draw$0() {
if (moversVisible) {
$p.noStroke();
      $p.fill(0xFFf1f3f3, 255);
      $p.ellipse($this_1.location.x, $this_1.location.y, 4, 4);
}
}
$p.addMethod($this_1, 'draw', draw$0, false);
function $constr_1(x){
$superCstr();

$this_1.$self.setup(x);
}

function $constr() {
if(arguments.length === 1) { $constr_1.apply($this_1, arguments); } else $superCstr();
}
$constr.apply(null, arguments);
}
return Mover;
})();
$p.Mover = Mover;

function bindJavascript(js) {
javascript = js;
}
$p.bindJavascript = bindJavascript;
bindJavascript = bindJavascript.bind($p);
var javascript = null;

var bgdColor =  $p.color(0xFF323237);

var screenWidth =  480;
var screenHeight =  370;

var padding =  20;
var drawWidth =  screenWidth - padding * 2;
var drawHeight =  screenHeight - padding * 2;

var atoms = null;
var movers = null;
var moverCount =  3;

var moversVisible =  true;

var currentTimeline = null;
var kickstandDownTimeline = null,kickstandUpTimeline = null,remoteLockTimeline = null,remoteUnlockTimeline = null,turnSignalTimeline = null;

var shapeTypeCheckered =  1;
var shapeTypePoint =  2;
var shapeTypeLine =  3;
var shapeTypeRectCorners =  4;
var shapeTypeTriangle =  5;
var shapeTypeDekoBoko =  6;

var effectTypeSpread =  1;
var effectTypeRotate =  2;
var effectTypeScale =  3;

var orientationTypeNormal =  1;
var orientationTypeMirroredRows =  2;

function setup() {
$p.size(480, 370);

  var events =  new $p.ArrayList();

  events.add(new Event(0, drawHeight / 5.0 * 4.5));
  events.add(new Event(100, drawHeight / 5.0 * 3.5));
  events.add(new Event(175, drawHeight / 5.0 * 2.5));
  events.add(new Event(250, drawHeight / 5.0 * 1.5));
  events.add(new Event(300, drawHeight / 5.0 * 0.5));

  kickstandDownTimeline = new Timeline();
  kickstandDownTimeline.events = events;

  events = new $p.ArrayList();

  events.add(new Event(0, drawHeight / 5.0 * 0.5));
  events.add(new Event(100, drawHeight / 5.0 * 2.5));
  events.add(new Event(150, drawHeight / 5.0 * 3.5));
  events.add(new Event(200, drawHeight / 5.0 * 4.5));

  kickstandUpTimeline = new Timeline();
  kickstandUpTimeline.events = events;

  events = new $p.ArrayList();

  events.add(new Event(0, drawHeight / 5.0 * 1.0));
  events.add(new Event(25, drawHeight / 5.0 * 0.75));
  events.add(new Event(100, drawHeight / 5.0 * 3.5));
  events.add(new Event(200, drawHeight / 5.0 * 2.5));
  events.add(new Event(200, drawHeight / 5.0 * 4.5));

  remoteLockTimeline = new Timeline();
  remoteLockTimeline.events = events;

  events.add(new Event(0, drawHeight / 5.0 * 4.5));
  events.add(new Event(0, drawHeight / 5.0 * 4.25));
  events.add(new Event(75, drawHeight / 5.0 * 2.5));
  events.add(new Event(75, drawHeight / 5.0 * 2.25));
  events.add(new Event(150, drawHeight / 5.0 * 0.5));

  remoteUnlockTimeline = new Timeline();
  remoteUnlockTimeline.events = events;

  events = new $p.ArrayList();

  events.add(new Event(0, drawHeight / 5.0 * 2.5));
  events.add(new Event(10, drawHeight / 5.0 * 2.25));
  events.add(new Event(10, drawHeight / 5.0 * 2.75));

  turnSignalTimeline = new Timeline();
  turnSignalTimeline.events = events;

  movers = new $p.ArrayList();
  atoms = new $p.ArrayList();

  $p.background(bgdColor);
  $p.frameRate(60);
}
$p.setup = setup;
setup = setup.bind($p);

function setupTheme(id) {
atoms.clear();
  movers.clear();

  if (id == "clean") {
moversVisible = false;

         var p =  new Parameters();
    p.lineLength = 6;

    placeAtoms(9, 30, false, orientationTypeNormal, 1, p);
} else if (id == "gamey") {
moversVisible = false;

    var p =  new Parameters();

    p.lineLength = 13.5;
    p.shapeType = shapeTypeCheckered;
    p.effectType = effectTypeRotate;

    p.startColor = $p.color(0xFF46ff78);
    p.endColor = $p.color(0xFF4effd0);
    p.push = 2;

    placeAtoms(16.667, 6, true, orientationTypeNormal, 1, p);
} else if (id == "bella") {
moversVisible = false;

    var p =  new Parameters();

    p.rotationSpeed = 0.15;
    p.shapeType = shapeTypeTriangle;
    p.effectType = effectTypeScale;
    p.push = 0.66;
    p.offsetRotationByIndexMultiplier = 1;

    p.startColor = $p.color(0xFF3165d5);
    p.endColor = $p.color(0xFF4cd8fd);

    placeAtoms(21.75, 13.125, true, orientationTypeMirroredRows, 1, p);
} else if (id == "slider") {

} else if (id == "pongo") {

}
}
$p.setupTheme = setupTheme;
setupTheme = setupTheme.bind($p);

function placeAtoms(densityH, densityV, staggeredGrid, orientationType, rotationMultiplier, p) {
var index =  0;
  var dx =  drawWidth / densityH;
  var dy =  drawHeight / densityV;

  var startX =  dx / 2;
  var evenStartY =  dy / 2;
  var oddStartY =  evenStartY;

  if (staggeredGrid) {
evenStartY += dy / 4;
    oddStartY -= dy / 4;
}

  var odd =  false,oddRow =  false;
  for(var x = startX;  x<drawWidth;  x += dx) {
var currentStartY =  odd ? oddStartY : evenStartY;
    odd = !odd;

    for(var y = currentStartY;  y<drawHeight;  y += dy) {
var rm =  rotationMultiplier;
      if (orientationType == orientationTypeMirroredRows && oddRow) rm = -rm;

      var a =  new Atom(index++, x, y, rm, p);
      atoms.add(a);

      oddRow = !oddRow;
}
}
}
$p.placeAtoms = placeAtoms;
placeAtoms = placeAtoms.bind($p);

function draw() {
$p.background(bgdColor);

     if (currentTimeline != null) currentTimeline.play();

     $p.pushMatrix();
  $p.translate(padding, padding);

     var farLocation =  new $p.PVector(-99999, -99999);

  var i =  0; 
  while(i < atoms.size()) {
var a =  atoms.get(i);
    var m =  findClosestMover(a);

         a.draw(m == null ? farLocation : m.location);
    a.draw(m == null ? farLocation : m.location);
    a.draw(m == null ? farLocation : m.location);

    i++;
}

  i = 0;
  while(i < movers.size()) {
var m =  movers.get(i);
    m.update();

    if (m.dead) movers.remove(i);
    else i++;
}

  $p.popMatrix();
}
$p.draw = draw;
draw = draw.bind($p);

function findClosestMover(a) {
var closestD =  -1;
  var closestM =  null;

  var i =  0;
  while(i < movers.size()) {
var m =  movers.get(i);
    var distance =  m.location.dist(a.currentLocation);

    if (closestD == -1 || distance < closestD) {
closestD = distance;
      closestM = m;
}

    i++;
}

  return closestM;
}
$p.findClosestMover = findClosestMover;
findClosestMover = findClosestMover.bind($p);

function trigger(id) {
if (id == "kickstandDown") {
currentTimeline = kickstandDownTimeline;
      currentTimeline.reset();
} else if (id == "kickstandUp") {
currentTimeline = kickstandUpTimeline;
      currentTimeline.reset();
} else if (id == "remoteLock") {
currentTimeline = remoteLockTimeline;
      currentTimeline.reset();
} else if (id == "remoteUnlock") {
currentTimeline = remoteUnlockTimeline;
      currentTimeline.reset();
} else if (id == "turnSignal") {
currentTimeline = turnSignalTimeline;
      currentTimeline.reset();
}
}
$p.trigger = trigger;
trigger = trigger.bind($p);
};

/* --------------------------------------------------------------------------------------------------------------------- */

          that.pjs = new Processing($canvasEl[0], playfulSounds);

          if (that.pjs !== null) {
            that.pjs.bindJavascript(this);

            // all set
            setCurrentTheme(themes[0]);

            currentAction = -1;
          }
        },
        destroy: function() {
            this.pjs = null;
            delete this.pjs;
        
            var $el = $($element);

            var $themesEl = $el.find('.theme-toggle a');
            var $triggersEl = $el.find('.preview .sounds .sound');
        
            $themesEl.off('click');
            $triggersEl.off('click');
            $el.find('.preview').off('click');
        }
      };

      $scope.fallback = {
        init: function() {
        },
        destroy: function() {
        }
      };

     // Initialize module
     $scope.init($scope, $element, true);
}]);