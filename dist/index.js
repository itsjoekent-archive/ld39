/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Game = __webpack_require__(2);

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var game = new _Game2.default();
window.startGame = game.start;

// setInterval(() => {
//   for (var i = 0; i < 200; i++) {
//     game.particleManager.makeParticle(Math.random() * 100, Math.random() * 100, Math.random() * 1000, 'test');
//   }
//
//   console.log(game.particleManager.particles.length);
// }, 100);

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ParticleManager = __webpack_require__(3);

var _ParticleManager2 = _interopRequireDefault(_ParticleManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game() {
    _classCallCheck(this, Game);

    this.canvas = document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');

    this.lastFrame = Date.now();
    this.entities = {};

    this.particleManager = new _ParticleManager2.default();

    this.start = this.start.bind(this);
    this.draw = this.draw.bind(this);
  }

  _createClass(Game, [{
    key: 'start',
    value: function start() {
      requestAnimationFrame(this.draw);
    }
  }, {
    key: 'entityIterator',
    value: function entityIterator(cb) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Object.keys(this.entities)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;

          cb(this.entities[key]);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: 'update',
    value: function update(delta) {
      var props = { delta: delta, game: this };

      this.entityIterator(function (entity) {
        return entity.update(props);
      });
      this.particleManager.update(props);
    }
  }, {
    key: 'addEntity',
    value: function addEntity(entity) {
      this.entities[entity.id] = entity;
    }
  }, {
    key: 'killEntity',
    value: function killEntity(id) {
      delete this.entities[id];
    }
  }, {
    key: 'draw',
    value: function draw() {
      var ctx = this.ctx;

      // Collect frame data to calculate delta

      var now = Date.now();
      var delta = now - this.lastFrame;
      this.update(delta);

      // Save blank context
      ctx.save();

      // Clear screen
      ctx.fillStyle = '#FFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render
      var props = { ctx: ctx };
      this.entityIterator(function (entity) {
        return entity.draw(props);
      });
      this.particleManager.draw(props);

      // Restore context to blank state
      ctx.restore();

      // Update frame data to calculate next delta
      this.lastFrame = Date.now();
      requestAnimationFrame(this.draw);
    }
  }]);

  return Game;
}();

exports.default = Game;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Particle = __webpack_require__(4);

var _Particle2 = _interopRequireDefault(_Particle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var INIT_PARTICLES = 10000;

var ParticleManager = function () {
  function ParticleManager() {
    _classCallCheck(this, ParticleManager);

    this.particles = []; // Array of particle objects.
    this.freeStack = []; // Array of indexes pointing at free particles in `this.particles`.
    this.reference = {}; // Reference object for particle id's.

    // Generate object pool.
    for (var index = 0; index < INIT_PARTICLES; index++) {
      var particle = this.makeParticle(0, 0, 0);
      this.setFree(particle.id);
    }
  }

  _createClass(ParticleManager, [{
    key: 'particleIterator',
    value: function particleIterator(cb) {
      for (var i = 0; i < this.particles.length; i++) {
        var particle = this.particles[i];
        if (particle.isAlive) cb(particle);
      }
    }
  }, {
    key: 'getFree',
    value: function getFree() {
      // If there are no free particles, make a new one
      if (!this.freeStack.length) {
        var particle = new _Particle2.default(0, 0, 1000);
        var index = this.particles.push(particle) - 1;
        this.reference[particle.id] = index;

        return particle;
      }

      // Otherwise pick a particle from the stack.
      var freeIndex = this.freeStack.pop();
      return this.particles[freeIndex];
    }
  }, {
    key: 'makeParticle',
    value: function makeParticle(x, y, lifespan, type) {
      var particle = this.getFree();

      particle.x = x;
      particle.y = y;
      particle.lifespan = lifespan;
      particle.type = type;
      particle.reset();

      return particle;
    }
  }, {
    key: 'setFree',
    value: function setFree(id) {
      var index = this.reference[id];
      var particle = this.particles[index];
      particle.isAlive = false;

      this.freeStack.push(index);
    }
  }, {
    key: 'update',
    value: function update(props) {
      this.particleIterator(function (particle) {
        return particle.update(props);
      });
    }
  }, {
    key: 'draw',
    value: function draw(props) {
      this.particleIterator(function (particle) {
        return particle.draw(props);
      });
    }
  }]);

  return ParticleManager;
}();

exports.default = ParticleManager;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Entity2 = __webpack_require__(5);

var _Entity3 = _interopRequireDefault(_Entity2);

var _Test = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PARTICLE_MAP = {
  'test': {
    update: _Test.update,
    draw: _Test.draw
  }
};

var Particle = function (_Entity) {
  _inherits(Particle, _Entity);

  function Particle(x, y, lifespan, type) {
    _classCallCheck(this, Particle);

    var _this = _possibleConstructorReturn(this, (Particle.__proto__ || Object.getPrototypeOf(Particle)).call(this, x, y));

    _this.lifespan = lifespan;
    _this.type = type;

    _this.reset();
    return _this;
  }

  _createClass(Particle, [{
    key: 'reset',
    value: function reset() {
      this.born = Date.now();
      this.death = Date.now() + this.lifespan;

      this.isAlive = this.born < this.death;
    }
  }, {
    key: 'update',
    value: function update(props) {
      var game = props.game;


      if (this.isAlive && this.death < Date.now()) {
        game.particleManager.setFree(this.id);
        return;
      }

      PARTICLE_MAP[this.type].update.apply(this, [props]);
    }
  }, {
    key: 'draw',
    value: function draw(props) {
      PARTICLE_MAP[this.type].draw.apply(this, [props]);
    }
  }]);

  return Particle;
}(_Entity3.default);

exports.default = Particle;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = __webpack_require__(6);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Entity = function () {
  function Entity(x, y) {
    _classCallCheck(this, Entity);

    this.x = x;
    this.y = y;

    this.id = (0, _helpers.guid)();
  }

  _createClass(Entity, [{
    key: 'update',
    value: function update(_ref) {
      var delta = _ref.delta,
          game = _ref.game;

      return;
    }
  }, {
    key: 'draw',
    value: function draw(_ref2) {
      var ctx = _ref2.ctx;

      return;
    }
  }]);

  return Entity;
}();

exports.default = Entity;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.guid = guid;
// Generate a random GUID.
// @see https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
//
// @return String
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update = update;
exports.draw = draw;
function update(_ref) {
  var delta = _ref.delta,
      game = _ref.game;

  this.x += 0.1 * delta;
  this.y += 0.1 * delta;
}

function draw(_ref2) {
  var ctx = _ref2.ctx;

  ctx.fillStyle = '#111';
  ctx.fillRect(this.x, this.y, 10, 10);
}

/***/ })
/******/ ]);