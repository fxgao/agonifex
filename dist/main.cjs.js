'use strict';

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

var global$1 = (typeof global !== "undefined" ? global :
            typeof self !== "undefined" ? self :
            typeof window !== "undefined" ? window : {});

// shim for using process in browser
// based off https://github.com/defunctzombie/node-process/blob/master/browser.js

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
var cachedSetTimeout = defaultSetTimout;
var cachedClearTimeout = defaultClearTimeout;
if (typeof global$1.setTimeout === 'function') {
    cachedSetTimeout = setTimeout;
}
if (typeof global$1.clearTimeout === 'function') {
    cachedClearTimeout = clearTimeout;
}

function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}
function nextTick(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
}
// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
var title = 'browser';
var platform = 'browser';
var browser = true;
var env = {};
var argv = [];
var version = ''; // empty string to avoid regexp issues
var versions = {};
var release = {};
var config = {};

function noop() {}

var on = noop;
var addListener = noop;
var once = noop;
var off = noop;
var removeListener = noop;
var removeAllListeners = noop;
var emit = noop;

function binding(name) {
    throw new Error('process.binding is not supported');
}

function cwd () { return '/' }
function chdir (dir) {
    throw new Error('process.chdir is not supported');
}function umask() { return 0; }

// from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
var performance = global$1.performance || {};
var performanceNow =
  performance.now        ||
  performance.mozNow     ||
  performance.msNow      ||
  performance.oNow       ||
  performance.webkitNow  ||
  function(){ return (new Date()).getTime() };

// generate timestamp or delta
// see http://nodejs.org/api/process.html#process_process_hrtime
function hrtime(previousTimestamp){
  var clocktime = performanceNow.call(performance)*1e-3;
  var seconds = Math.floor(clocktime);
  var nanoseconds = Math.floor((clocktime%1)*1e9);
  if (previousTimestamp) {
    seconds = seconds - previousTimestamp[0];
    nanoseconds = nanoseconds - previousTimestamp[1];
    if (nanoseconds<0) {
      seconds--;
      nanoseconds += 1e9;
    }
  }
  return [seconds,nanoseconds]
}

var startTime = new Date();
function uptime() {
  var currentTime = new Date();
  var dif = currentTime - startTime;
  return dif / 1000;
}

var process = {
  nextTick: nextTick,
  title: title,
  browser: browser,
  env: env,
  argv: argv,
  version: version,
  versions: versions,
  on: on,
  addListener: addListener,
  once: once,
  off: off,
  removeListener: removeListener,
  removeAllListeners: removeAllListeners,
  emit: emit,
  binding: binding,
  cwd: cwd,
  chdir: chdir,
  umask: umask,
  hrtime: hrtime,
  platform: platform,
  release: release,
  config: config,
  uptime: uptime
};

// 数组去重
var uniqueArr = function uniqueArr(arr) {
  return Array.from(new Set(arr));
};

function cleanArray(actual) {
  var newArray = [];

  for (var i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }

  return newArray;
}
var index = {
  uniqueArr: uniqueArr,
  cleanArray: cleanArray
};

var ARRAY = /*#__PURE__*/Object.freeze({
  __proto__: null,
  cleanArray: cleanArray,
  'default': index
});

function backToTop() {
  var slow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var c = document.documentElement.scrollTop || document.body.scrollTop;

  if (slow) {
    if (c > 0) {
      window.requestAnimationFrame(backToTop);
      window.scrollTo(0, c - c / 8);
    }
  } else {
    document.documentElement.scrollTop = 0;
  }
}

var scroll = {
  backToTop: backToTop
};

var SCROLL = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': scroll
});

function getBase64(img) {
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, img.width, img.height);
  var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
  var dataURL = canvas.toDataURL("image/" + ext);
  return dataURL;
}

var toBase64Image = function toBase64Image(imgUrl) {
  var image = new Image();
  image.crossOrigin = '';
  image.src = imgUrl;

  image.onload = function () {
    var base64 = getBase64(image);
    return base64;
  };
};

var image = {
  toBase64Image: toBase64Image
};

var IMAGE = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': image
});

/**
 * 防抖函数：当一个函数在一定间隔内没有被调用时，才允许执行被调用方法。
 * func：要执行的函数； wait：执行函数之间的间隔； immediate：首次触发是否立即执行一次；
*/

var debounce = function debounce(func, wait, immediate) {
  var timeout, args, context, timestamp, result;

  var later = function later() {
    var last = _.now() - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;

      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function () {
    context = this;
    args = arguments;
    timestamp = _.now();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);

    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
};
/**
 * 节流函数：每隔某个时间段去执行某个函数，防止函数的过多执行
 * leading：（Boolean）是否立即执行
 * trailing： （Boolean）wait期间如果有再次调用，是否会在“周期后边缘（wait结束）”再次执行
 * leading= true；trailing：true：调用立即执行一次，wait期间如果有再次调用，在周期后边缘再次执行
 * leading= true；trailing：false：调用立即执行一次，wait期间如果有再次调用，在周期后边缘不会执行
 * leading= false；trailing：true：调用需要等待wait时间，wait期间如果再次调用，在周期后边缘再次执行
 * leading= false；trailing：false：调用需要等待wait时间，wait期间如果再次调用，在周期后边缘不会执行
 */


var throttle = function throttle(func, wait, options) {
  var context, args, result;
  var timeout = null;
  var previous = 0;
  if (!options) options = {};

  var later = function later() {
    previous = options.leading === false ? 0 : new Date();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };

  var throttled = function throttled() {
    var now = new Date();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }

      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }

    return result;
  };

  throttled.cancel = function () {
    clearTimeout(timeout);
    previous = 0;
    timeout = context = args = null;
  };

  return throttled;
}; // 发布订阅模式


function EventEmitter() {
  // 用Object.create(null)代替空对象{},不继承原型链
  this._events = Object.create(null);
} // 同on方法


EventEmitter.prototype.addListener = EventEmitter.prototype.on; // 监听

EventEmitter.prototype.on = function (type, cb, flag) {
  // 默认值，如果没有_events的话，就给它创建一个
  if (!this._events) {
    this._events = Object.create(null);
  } // 不是newListener 就应该让newListener执行一下


  if (type !== 'newListener') {
    this._events['newListener'] && this._events['newListener'].forEach(function (listener) {
      listener(type);
    });
  }

  if (this._events[type]) {
    // 根据传入的flag来决定是向前还是向后添加
    if (flag) {
      this._events[type].unshift(cb);
    } else {
      this._events[type].push(cb);
    }
  } else {
    this._events[type] = [cb];
  } // 监听的事件不能超过了设置的最大监听数


  if (this._events[type].length === this.getMaxListeners()) {
    console.warn('警告-超过最大监听数');
  }
}; // 监听一次


EventEmitter.prototype.once = function (type, cb, flag) {
  // 先绑定，调用后删除
  function wrap() {
    cb.apply(void 0, arguments);
    this.removeListener(type, wrap);
  } // 自定义属性


  wrap.listen = cb;
  this.on(type, wrap, flag);
}; // 发布


EventEmitter.prototype.emit = function (type) {
  var _this = this;

  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  if (this._events[type]) {
    this._events[type].forEach(function (listener) {
      listener.call.apply(listener, [_this].concat(args));
    });
  }
}; // 返回监听的事件名


EventEmitter.prototype.eventNames = function () {
  return Object.keys(this._events);
}; // 默认最多的绑定次数


EventEmitter.defaultMaxListeners = 10; // 返回监听数

EventEmitter.prototype.getMaxListeners = function () {
  return this._count ? this._count : this.defaultMaxListeners;
}; // 设置最大监听数


EventEmitter.prototype.setMaxListeners = function (n) {
  this._count = n;
}; // 向前添加


EventEmitter.prototype.prependListener = function (type, cb) {
  this.on(type, cb, true);
};

EventEmitter.prototype.prependOnceListener = function (type, cb) {
  this.once(type, cb, true);
}; // 删除监听类型


EventEmitter.prototype.removeListener = function (type, cb) {
  if (this._events[type]) {
    this._events[type] = this._events[type].filter(function (listener) {
      return cb !== listener && cb !== listener.listen;
    });
  }
};

EventEmitter.prototype.removeAllListener = function () {
  this._events = Object.create(null);
}; // 返回所有的监听类型


EventEmitter.prototype.listeners = function (type) {
  return this._events[type];
}; // 首先实现一个类型判断函数


var isType = function isType(obj, type) {
  if (_typeof(obj) !== 'object') return false;
  var typeString = Object.prototype.toString.call(obj);
  var flag;

  switch (type) {
    case 'Array':
      flag = typeString === '[object Array]';
      break;

    case 'Date':
      flag = typeString === '[object Date]';
      break;
    // case 'RegExp':
    //     flag = typeString === '[object RegExp]';
    //     break;

    default:
      flag = false;
  }

  return flag;
};
/**
 * 深克隆
 * @param {源对象} source 
 */


var deepClone = function deepClone(source) {
  // 维护两个储存循环引用的数组
  var parents = [];
  var children = [];

  var _clone = function _clone(parent) {
    if (parent === null) return null;
    if (_typeof(parent) !== 'object') return parent;
    var child, proto;

    if (isType(parent, 'Array')) {
      // 对数组做特殊处理
      child = [];
    } else if (isType(parent, 'Date')) {
      // 对Date对象做特殊处理
      child = new Date(parent.getTime());
    } else {
      // 处理对象原型
      proto = Object.getPrototypeOf(parent); // 利用Object.create切断原型链

      child = Object.create(proto);
    } // 处理循环引用


    var index = parents.indexOf(parent);

    if (index != -1) {
      // 如果父数组存在本对象,说明之前已经被引用过,直接返回此对象
      return children[index];
    }

    parents.push(parent);
    children.push(child);

    for (var i in parent) {
      // 递归
      child[i] = _clone(parent[i]);
    }

    return child;
  };

  return _clone(source);
};

var index$1 = _objectSpread2({
  debounce: debounce,
  throttle: throttle,
  EventEmitter: EventEmitter,
  deepClone: deepClone
}, SCROLL, {}, IMAGE);

var BASIC = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': index$1
});

// 生成随机数


function randomRangeIntegerNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10);

    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);

    default:
      return 0;
  }
}

var index$2 = {
  randomRangeIntegerNum: randomRangeIntegerNum
};

var RANDOM = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': index$2
});

var quickSort = function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  var pivotIndex = Math.floor(arr.length / 2); //基准位置（理论上可任意选取）

  var pivot = arr.splice(pivotIndex, 1)[0]; //基准数

  var left = [];
  var right = [];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return quickSort(left).concat([pivot], quickSort(right)); //链接左数组、基准数构成的数组、右数组
};
/**
 * 二分法查找，也称折半查找，是一种在有序数组中查找特定元素的搜索算法。查找过程可以分为以下步骤：
 * （1）首先，从有序数组的中间的元素开始搜索，如果该元素正好是目标元素（即要查找的元素），则搜索过程结束，否则进行下一步。
 * （2）如果目标元素大于或者小于中间元素，则在数组大于或小于中间元素的那一半区域查找，然后重复第一步的操作。
 * （3）如果某一步数组为空，则表示找不到目标元素。
 */


var binarySearch = function binarySearch(arr, low, high, key) {
  if (low > high) {
    return -1;
  }

  var mid = parseInt((high + low) / 2);

  if (arr[mid] == key) {
    return mid;
  } else if (arr[mid] > key) {
    high = mid - 1;
    return binarySearch(arr, low, high, key);
  } else if (arr[mid] < key) {
    low = mid + 1;
    return binarySearch(arr, low, high, key);
  }
};

var index$3 = {
  quickSort: quickSort,
  binarySearch: binarySearch
};

var SORT = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': index$3
});

var html2Text = function html2Text(val) {
  var div = document.createElement('div');
  div.innerHTML = val;
  return div.textContent || div.innerText;
};

var jsonStringify = function jsonStringify(arg) {
  var qsArr = [];

  for (var k in arg) {
    var v = arg[k];
    qsArr.push({
      name: k,
      value: ("" + v).toString()
    });
  }

  for (var i = 0; i < qsArr.length; i++) {
    qsArr[i] = [qsArr[i].name, qsArr[i].value].join('=');
  }

  return qsArr.join('&');
};

var index$4 = {
  html2Text: html2Text,
  jsonStringify: jsonStringify
};

var STRING = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': index$4
});

function parseTime(date, cFormat) {
  var time_str;
  var formatObj = {
    "M+": date.getMonth() + 1,
    //月份   
    "d+": date.getDate(),
    //日   
    "h+": date.getHours(),
    //小时   
    "m+": date.getMinutes(),
    //分   
    "s+": date.getSeconds(),
    //秒
    "S": date.getMilliseconds() //毫秒   

  };

  if (/(y+)/.test(cFormat)) {
    time_str = time_str.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }

  for (var key in formatObj) {
    if (new RegExp("(" + key + ")").test(cFormat)) {
      time_str = time_str.replace(RegExp.$1, RegExp.$1.length == 1 ? formatObj[key] : ("00" + formatObj[key]).substr(("" + formatObj[key]).length));
    }
  }

  return time_str;
}

function formatDate(time, format) {
  if (arguments.length === 0) {
    return null;
  }

  var d;
  var now = Date.now();

  if (Object.prototype.toString.call(time) == '[object Date]') {
    d = time;
  } else {
    d = new Date(time);
  }

  var diff = (now - d) / 1000;

  if (diff < 60) {
    return "刚刚";
  } else if (diff < 3600) {
    return Math.ceil(diff / 60) + "分钟前";
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + "小时前";
  } else if (diff < 3600 * 24 * 2) {
    return "1天前";
  }

  if (format) {
    return parseTime(d, format);
  } else {
    return d.getFullYear() + '-'(d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + d.getMonth() + 1) + '-'(d.getDate() > 9 ? d.getDate() : '0' + d.getDate()) + ' '(d.getHours() > 9 ? d.getHours() : '0' + d.getHours()) + ':'(d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes()) + ':'(d.getSeconds() > 9 ? d.getSeconds() : '0' + d.getSeconds());
  }
}

var index$5 = {
  formatDate: formatDate,
  parseTime: parseTime
};

var TIME = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': index$5
});

var Vue;

var install = function install(_Vue) {
  Vue = _Vue;

  var Object = _objectSpread2({}, AJAX, {}, ARRAY, {}, BASIC, {}, RANDOM, {}, SORT, {}, STRING, {}, TIME); // 全局变量


  Object.VERSION = '1.0.0'; // 当前环境

  Object.EVN = process.env.NODE_ENV; // 当前域名

  Object.SITDOMAIN = EVN == 'development' ? '' : window.location.protocol + '//' + window.location.hostname + '/';
  Vue.prototype.$utils = Object;
};

var main = {
  install: install
};

module.exports = main;
