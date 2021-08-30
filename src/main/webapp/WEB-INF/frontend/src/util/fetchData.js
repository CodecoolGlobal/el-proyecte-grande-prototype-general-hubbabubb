export function getFetch(url, callback, errorHandling) {
    fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
    })
        .then((data) => data.json())
        .then((jsonData) => {
            callback(jsonData);
        })
        .catch(error => errorHandling(error))
}

export function postFetch(url, data, callback, errorHandling) {
    const authHeader = new Headers();
    authHeader.append('Authorization', localStorage.jwtToken);

    fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: authHeader,
        body: data // body data type must match "Content-Type" header
    })
        .then(data => data.json())
        .then(jsonData => {
            callback(jsonData);
        })
        .catch(error => errorHandling(error))
}

export function getFetchWithAuth(url, callback, errorHandling) {
    const authHeader = new Headers();
    authHeader.append('Authorization', localStorage.jwtToken);

    fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: authHeader
    })
        .then((data) => data.json())
        .then((jsonData) => {
            callback(jsonData);
        })
        .catch(error => errorHandling(error))
}