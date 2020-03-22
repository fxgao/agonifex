function parseTime(date, cFormat) {
    let time_str;
    const formatObj = {
        "M+": date.getMonth() + 1,               //月份   
        "d+": date.getDate(),                    //日   
        "h+": date.getHours(),                   //小时   
        "m+": date.getMinutes(),                 //分   
        "s+": date.getSeconds(),                 //秒
        "S": date.getMilliseconds()              //毫秒   
    };
    if (/(y+)/.test(cFormat)){
        time_str = time_str.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (let key in formatObj){
        if(new RegExp("(" + key+ ")").test(cFormat)){
            time_str = time_str.replace(RegExp.$1, (RegExp.$1.length == 1) ? (formatObj[key]) : (("00" + formatObj[key]).substr(("" + formatObj[key]).length)));
        }
    }
    return time_str;
}

function formatDate(time, format) {
    if (arguments.length === 0) {
        return null
    }
    let d;
    const now = Date.now();
    if(Object.prototype.toString.call(time) == '[object Date]'){
        d = time;
    }else {
        d = new Date(time);
    }
    const diff = (now - d) / 1000;

    if (diff < 60) {
        return "刚刚";
    }
    else if (diff < 3600) {
        return Math.ceil(diff / 60) + "分钟前";
    } 
    else if (diff < 3600 * 24) {
        return Math.ceil(diff / 3600) + "小时前";
    } 
    else if (diff < 3600 * 24 * 2) {
        return "1天前";
    }
    if (format) {
        return parseTime(d, format);
    } else {
        return (
            d.getFullYear() + '-'
            (d.getMonth()+1 > 9 ? (d.getMonth() + 1) : ('0'+ d.getMonth() + 1)) + '-'
            (d.getDate() > 9 ? d.getDate() : ('0'+ d.getDate())) + ' '
            (d.getHours() > 9? d.getHours() : ('0'+ d.getHours())) + ':'
            (d.getMinutes() > 9? d.getMinutes() : ('0'+ d.getMinutes())) + ':'
            (d.getSeconds() > 9? d.getSeconds() : ('0'+ d.getSeconds()))
        );
    }
}

export default {
    formatDate,
    parseTime
};