// 数组去重
function uniqueArr (arr) {
    return Array.from(new Set(arr))
}

function cleanArray(actual) {
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