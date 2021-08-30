export function getFetch(url, callback) {
    fetch(url)
        .then(data => data.json())
        .then(jsonData => {
            callback(jsonData);
        })
}

export function postFetch(url, data, callback, errorHandling) {
    fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'no-cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
        .then(data => data.json())
        .then(jsonData => {
            callback(jsonData);
        })
        .catch(error => errorHandling(error))
}