let debug = true;

let make = {
    post: (url, data = undefined) => {
        if (debug) {
            console.info('New POST request to ' + url + ' with data = ' + JSON.stringify(data))
        }
        return new Promise((resolve, reject) => {
            $.ajax({
                url: url,
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(data),
                success: (result) => {
                    resolve(result)
                },
                error: (error) => {
                    reject(error)
                }
            });
        })
    },

    get: (url, data = undefined) => {
        if (debug) {
            console.info('New GET request to ' + url + ' with data = ' + JSON.stringify(data))
        }
        return new Promise((resolve, reject) => {
            $.ajax({
                url: url,
                type: 'GET',
                data: data,
                success: (result) => {
                    resolve(result)
                },
                error: (error) => {
                    reject(error)
                }
            });
        })
    }
};

export let get = {
    books: (offset, limit) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: '/api/book',
                type: 'GET',
                data: {
                    offset: offset,
                    limit: limit
                },
                success: (data) => {
                    resolve(data)
                },
                error: (error) => {
                    reject(error)
                }
            });
        })
    },
    book : {
        get : (id) => make.get('/api/book/' + id),
        related : (id) => make.get('/api/book/' + id + '/related'),
        reviews : (id) => make.get('/api/book/' + id + '/reviews')
    },
    address: () => make.get('/api/user/0/address'),
    chart: () => make.get('/api/user/0/chart')
};
export let post = {
    login: (username, password) => {
        return make.post('/login', {
            username: username,
            password: password
        })
    },
    logout: () => {
        return make.post('/logout');
    },
    register: (body) => {
        return make.post('/api/user/register', body)
    },
    user : {
        address : (body) => {
            return make.post('/api/user/0/address', body)
        }
    }
}

export let map = (map) => {
    for (let sel in map) {
        if (map.hasOwnProperty(sel)) {
            $(sel).html(map[sel])
        }
    }
}