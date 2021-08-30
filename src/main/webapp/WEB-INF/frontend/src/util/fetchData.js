export function getFetch(url, callback, errorHandling) {
    fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Authorization': localStorage.jwtToken
        }
    })
        .then((data) => data.json())
        .then((jsonData) => {
            callback(jsonData);
        })
        .catch(error => errorHandling(error))
}

export function postFetch(url, data, callback, errorHandling) {
    fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'no-cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.jwtToken
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
        .then(data => data.json())
        .then(jsonData => {
            callback(jsonData);
        })
        .catch(error => errorHandling(error))
}