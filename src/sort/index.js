function quickSort(arr) {
    if (arr.length <= 1) { return arr; }
    var pivotIndex = Math.floor(arr.length / 2);   //基准位置（理论上可任意选取）
    var pivot = arr.splice(pivotIndex, 1)[0];  //基准数
    var left = [];
    var right = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat([pivot], quickSort(right));  //链接左数组、基准数构成的数组、右数组
};

/**
 * 二分法查找，也称折半查找，是一种在有序数组中查找特定元素的搜索算法。查找过程可以分为以下步骤：
 * （1）首先，从有序数组的中间的元素开始搜索，如果该元素正好是目标元素（即要查找的元素），则搜索过程结束，否则进行下一步。
 * （2）如果目标元素大于或者小于中间元素，则在数组大于或小于中间元素的那一半区域查找，然后重复第一步的操作。
 * （3）如果某一步数组为空，则表示找不到目标元素。
 */
function binarySearch(arr, low, high, key) {
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

export default {
    quickSort,
    binarySearch
}