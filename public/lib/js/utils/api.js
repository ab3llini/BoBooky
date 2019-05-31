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
        reviews : (id) => make.get('/api/book/' + id + '/review')
    },
    address: () => make.get('/api/user/0/address')
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

export let map = (map_fn) => {
    for (let sel in map_fn) {
        if (map_fn.hasOwnProperty(sel)) {
            $(sel).html(map_fn[sel])
        }
    }
}