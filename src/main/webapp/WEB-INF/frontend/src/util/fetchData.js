export function getFetch(url, callback, errorHandling) {
    fetch(url, {
        method: 'GET',
    })
        .then((data) => data.json())
        .then((jsonData) => {
            callback(jsonData);
        })
        .catch(error => errorHandling(error))
}

export function postFetch(url, data, callback, errorHandling) {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(data => data.json())
        .then(jsonData => {
            callback(jsonData);
        })
        .catch(error => errorHandling(error))
}

export function putFetch(url, errorHandling) {
    fetch(url, {
        method: 'PUT'
    })
        .catch(error => errorHandling(error))
}

export function putFetchWithCallback(url, callback, errorHandling) {
    fetch(url, {
        method: 'PUT'
    }).then(data => data.json())
        .then(json => callback(json))
        .catch(error => errorHandling(error))
}

export function deleteFetch(url, errorHandling) {
    fetch(url, {
        method: 'DELETE'
    })
        .catch(error => errorHandling(error))
}

export function postFetchWithAuth(url, data, callback, errorHandling) {
    const authHeader = new Headers();
    authHeader.append('Authorization', 'Basic code@cooler.com : testuser');

    fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            authorization: 'Basic ' + window.btoa("test@user.com" + ":" + "testuser"),
            'Content-Type': 'application/json'},
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
        .then(data => data.json())
        .then(jsonData => {
            callback(jsonData);
        })
        .catch(error => errorHandling(error))
}


export function fetchNoResponse(url, method) {
    const authHeader = new Headers();
    authHeader.append('Authorization', 'Basic test@user.com : testuser');

    fetch(url, {
        method: method, // *GET, POST, PUT, DELETE, etc.
        headers: { authorization: 'Basic ' + window.btoa("test@user.com" + ":" + "testuser") },
    })
        .catch(error => console.log(error))
}

export function getFetchWithAuth(url, callback, errorHandling) {

    fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: { authorization: 'Basic ' + window.btoa("test@user.com" + ":" + "testuser") }
    })
        .then((data) => data.json())
        .then((jsonData) => {
            callback(jsonData);
        })
        .catch(error => errorHandling(error))
}