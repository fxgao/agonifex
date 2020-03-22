// 数组去重
const uniqueArr = function (arr) {
    return Array.from(new Set(arr))
}

export function cleanArray(actual) {
    const newArray = []
    for (let i = 0; i < actual.length; i++) {
      if (actual[i]) {
        newArray.push(actual[i])
      }
    }
    return newArray
}

export default {
    uniqueArr,
    cleanArray
}