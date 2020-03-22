// 生成随机数

function randomNum(integerLen, decimalLen,firstIntegerOne = true) {
    if(arguments.length === 0 || Object.prototype.toString.call(integerLen) !== '[object Number]' || Object.prototype.toString.call(decimalLen) !== '[object Number]'){
        return null;
    }
    let resStr;
    let resInteger = firstIntegerOne ? Math.floor((Math.random()+1)*Math.pow(10,integerLen-1)) : Math.floor((Math.random()+Math.floor(Math.random()*9+1))*Math.pow(10,integerLen-1));
    let resDecimal = Math.random().toFixed(decimalLen);
    if(integerLen > 0){
        if(decimalLen > 0){
            resStr = resInteger + resDecimal;
        }else {
            resStr = resInteger;
        }
    }else {
        if(decimalLen > 0){
            resStr = resDecimal;
        }
    }
    return resStr
}

// 生成 [n,m] 的随机整数
function randomRangeIntegerNum(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
        break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        break; 
        default: 
            return 0; 
        break; 
    } 
}



export default {
    randomRangeIntegerNum,
    randomNum
}