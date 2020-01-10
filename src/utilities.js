export function getSeconds(time) {
    const DIVIDER = ':'
    let timeArray = time.split(DIVIDER)

    let length = timeArray.length
    let seconds = 0
    timeArray.forEach((item, i) => {
        seconds += parseInt(item) * (Math.pow(60, (length - i - 1)))
    })
    return seconds;
}

export const pluck = function (objectArray, element) {
    let uniqueList = []
    objectArray.forEach(item => {
        if (item.hasOwnProperty(element)) {
            if (!uniqueList.includes(item[element])) uniqueList.push(item[element])
        }
    })
    return uniqueList.sort()
}

export const getDataFromServer = async function (endpoint) {
    let data = fetch(endpoint, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            if (!response.ok) throw Error(response.statusText);
            return response;
        })
        .then(response => response.json())

    return await data
}

export function getSummaryFromObject(objectData, objectKey, limit = 10) {

    let summary = new Map()
    if (!objectData) return [];
    if (objectData.length < 1) return [];

    objectData.forEach(item => {
        let key = item[objectKey];
        if (summary.has(key)) {
            let count = summary.get(key)
            summary.set(key, count + 1)
        } else {
            summary.set(key, 1)
        }
    })

    // convert map to array
    let summaryArray = []
    summary.forEach((value, key) => {
        let percent = ((value / objectData.length) * 100).toFixed(1)
        let object = { key, value, percent }
        summaryArray.push(object)
    })

    summaryArray.sort((a, b) => {
        return b.value - a.value
    })

    return summaryArray.slice(0, limit);
}


export function getSummaryFromObject2D(objectData, objectKeys, limit = 10) {

    let summary = []
    if (!objectData) return [];
    if (objectData.length < 1) return [];

    objectData.forEach(item => {
        //    let arrayKey = [ item[objectKeys[0]] , item[objectKeys[1]] ]
        let arrayKey = item[objectKeys[0]] + '~' + item[objectKeys[1]]
        if (summary.hasOwnProperty(arrayKey)) {
            summary[arrayKey] += 1
        } else {
            summary[arrayKey] = 1
        }

    })

    // convert map to array
    let summaryArray = []
    for (let key in summary) {
        let value = summary[key]
        let percent = ((value / objectData.length) * 100).toFixed(1)
        let keys = key.split('~')
        let object = { keyA: keys[0], keyB: keys[1], value, percent }
        summaryArray.push(object)
    }

    summaryArray.sort((a, b) => {
        return b.value - a.value
    })

    return summaryArray.slice(0, limit);
}
