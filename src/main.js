/**
 * author: fxgao 2020/03/05
 * Based on Underscore.js 1.8.3
 */

// 引入子模块
import * as ARRAY from './array/index'
import * as BASIC from './basic/index'
import * as RANDOM from './random/index'
import * as SORT from './sort/index'
import * as STRING from './string/index'
import * as TIME from './time/index'

let Vue
const install = function(_Vue){
    Vue = _Vue;
    const Object = {
        ...AJAX,
        ...ARRAY,
        ...BASIC,
        ...RANDOM,
        ...SORT,
        ...STRING,
        ...TIME
    };
    // 全局变量
    Object.VERSION = '1.0.0';
    // 当前环境
    Object.EVN = process.env.NODE_ENV;
    // 当前域名
    Object.SITDOMAIN = EVN == 'development' ? '' : window.location.protocol + '//' + window.location.hostname + '/';

    Vue.prototype.$utils = Object;
}


export default {
    install
}