// 引入子组件
import * as SCROLL from './scroll'
import * as IMAGE from './image'

/**
 * 防抖函数：当一个函数在一定间隔内没有被调用时，才允许执行被调用方法。
 * func：要执行的函数； wait：执行函数之间的间隔； immediate：首次触发是否立即执行一次；
*/
function debounce(func, wait, immediate) {
    var timeout, args, context, timestamp, result;
    var later = function() {
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
    return function() {
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
function throttle (func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};

    var later = function () {
        previous = options.leading === false ? 0 : new Date();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
    };

    var throttled = function () {
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
};

// 发布订阅模式
function EventEmitter() {
    // 用Object.create(null)代替空对象{},不继承原型链
    this._events = Object.create(null);
}

// 同on方法
EventEmitter.prototype.addListener = EventEmitter.prototype.on;
// 监听
EventEmitter.prototype.on = function (type, cb, flag) {
    // 默认值，如果没有_events的话，就给它创建一个
    if (!this._events) {
        this._events = Object.create(null);
    }
    // 不是newListener 就应该让newListener执行一下
    if (type !== 'newListener') {
        this._events['newListener'] && this._events['newListener'].forEach(listener => {
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
    }
    // 监听的事件不能超过了设置的最大监听数
    if (this._events[type].length === this.getMaxListeners()) {
        console.warn('警告-超过最大监听数');
    }
};

// 监听一次
EventEmitter.prototype.once = function (type, cb, flag) {
    // 先绑定，调用后删除
    function wrap() {
        cb(...arguments);
        this.removeListener(type, wrap);
    }
    // 自定义属性
    wrap.listen = cb;
    this.on(type, wrap, flag);
};
// 发布
EventEmitter.prototype.emit = function (type, ...args) {
    if (this._events[type]) {
        this._events[type].forEach(listener => {
            listener.call(this, ...args);
        });
    }
};

// 返回监听的事件名
EventEmitter.prototype.eventNames = function () {
    return Object.keys(this._events);
};
// 默认最多的绑定次数
EventEmitter.defaultMaxListeners = 10;

// 返回监听数
EventEmitter.prototype.getMaxListeners = function () {
    return this._count ? this._count : this.defaultMaxListeners;
};
// 设置最大监听数
EventEmitter.prototype.setMaxListeners = function (n) {
    this._count = n;
};
// 向前添加
EventEmitter.prototype.prependListener = function (type, cb) {
    this.on(type, cb, true);
};
EventEmitter.prototype.prependOnceListener = function (type, cb) {
    this.once(type, cb, true);
};

// 删除监听类型
EventEmitter.prototype.removeListener = function (type, cb) {
    if (this._events[type]) {
        this._events[type] = this._events[type].filter(listener => {
            return cb !== listener && cb !== listener.listen;
        });
    }
};
EventEmitter.prototype.removeAllListener = function () {
    this._events = Object.create(null);
};

// 返回所有的监听类型
EventEmitter.prototype.listeners = function (type) {
    return this._events[type];
};

/**
 * 深克隆
 * @param {源对象} source 
 */
// 首先实现一个类型判断函数
const isType = (obj, type) => {
    if (typeof obj !== 'object') return false;
    const typeString = Object.prototype.toString.call(obj);
    let flag;
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
function deepClone(source) {
    // 维护两个储存循环引用的数组
    const parents = [];
    const children = [];
  
    const _clone = parent => {
        if (parent === null) return null;
        if (typeof parent !== 'object') return parent;

        let child, proto;
    
        if (isType(parent, 'Array')) {
            // 对数组做特殊处理
            child = [];
        } else if (isType(parent, 'Date')) {
            // 对Date对象做特殊处理
            child = new Date(parent.getTime());
        } else {
            // 处理对象原型
            proto = Object.getPrototypeOf(parent);
            // 利用Object.create切断原型链
            child = Object.create(proto);
        }
    
        // 处理循环引用
        const index = parents.indexOf(parent);
    
        if (index != -1) {
            // 如果父数组存在本对象,说明之前已经被引用过,直接返回此对象
            return children[index];
        }
        parents.push(parent);
        children.push(child);
    
        for (let i in parent) {
            // 递归
            child[i] = _clone(parent[i]);
        }
    
        return child;
    };
    return _clone(source);
};

export default {
    debounce,
    throttle,
    EventEmitter,
    deepClone,
    ...SCROLL.default,
    ...IMAGE.default
}