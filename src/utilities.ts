export function getSeconds(time: string) {
    const DIVIDER = ':'
    let timeArray = time.split(DIVIDER)

    let length = timeArray.length
    let seconds = 0
    timeArray.forEach((item, i) => {
        seconds += parseInt(item) * (Math.pow(60, (length - i - 1)))
    })
    return seconds;
}

export const pluck = function (objectArray: any[], element: string) {
    let uniqueList: string[] = []
    objectArray.forEach(item => {
        if (item.hasOwnProperty(element)) {
            if (!uniqueList.includes(item[element])) uniqueList.push(item[element])
        }
    })
    return uniqueList.sort()
}

export const getDataFromServer = async function (endpoint: string) {
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
