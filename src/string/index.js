function html2Text(val) {
    const div = document.createElement('div')
    div.innerHTML = val
    return div.textContent || div.innerText
}

function jsonStringify(arg) {
    let qsArr = [];
    for (let k in arg) {
      let v = arg[k];
      qsArr.push({
        name: k,
        value: ("" + v).toString()
      })
    }
    for (let i = 0; i < qsArr.length; i++) {
      qsArr[i] = [qsArr[i].name, qsArr[i].value].join('=')
    }
    return qsArr.join('&');
};

export default{
    html2Text,
    jsonStringify
}