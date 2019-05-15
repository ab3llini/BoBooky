let debug = true

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
                success: (data) => {
                    resolve(data)
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
    }
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
    }

}