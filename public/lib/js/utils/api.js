let debug = true;

let make = {
    post: (url, data = undefined, map = (data) => {return JSON.stringify(data)}) => {
        if (debug) {
            console.info('New POST request to ' + url + ' with data = ' + JSON.stringify(data))
        }
        return new Promise((resolve, reject) => {
            $.ajax({
                url: url,
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                data: map(data),
                success: (result) => {
                    resolve(result)
                },
                complete: (xhr, textStatus) => {
                    if (xhr.status !== 200) {
                        var e = new Error(xhr.statusText);
                        e.statusText = xhr.statusText
                        e.status = xhr.status;
                        reject(e)
                    }
                    else
                        resolve()
                }
            });
        })
    },
    put: (url, data = undefined, map = (data) => {return JSON.stringify(data)}) => {
        if (debug) {
            console.info('New PUT request to ' + url + ' with data = ' + JSON.stringify(data))
        }
        return new Promise((resolve, reject) => {
            $.ajax({
                url: url,
                type: 'PUT',
                contentType: 'application/json',
                dataType: 'json',
                data: map(data),
                success: (result) => {
                    resolve(result)
                },
                complete: (xhr, textStatus) => {
                    if (xhr.status !== 200) {
                        var e = new Error(xhr.statusText);
                        e.statusText = xhr.statusText;
                        e.status = xhr.status;
                        reject(e)
                    }
                    else
                        resolve()
                }
            });
        })
    },
    delete: (url, data = undefined,  map = (data) => {return JSON.stringify(data)}) => {
        if (debug) {
            console.info('New DELETE request to ' + url + ' with data = ' + JSON.stringify(data))
        }
        return new Promise((resolve, reject) => {
            $.ajax({
                url: url,
                type: 'DELETE',
                contentType: 'application/json',
                dataType: 'json',
                data: map(data),
                success: (result) => {
                    resolve(result)
                },
                complete: (xhr, textStatus) => {
                    if (xhr.status !== 200) {
                        var e = new Error(xhr.statusText);
                        e.statusText = xhr.statusText
                        e.status = xhr.status;
                        reject(e)
                    }
                    else
                        resolve()
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
                complete: (xhr, textStatus) => {
                    if (xhr.status !== 200)
                        reject(textStatus)
                    else
                        resolve()
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
        get : (id) => { return make.get('/api/book/' + id) },
        related : (id) => { return make.get('/api/book/' + id + '/related')},
        reviews : (id) => { return make.get('/api/book/' + id + '/review') },
        search : {
            query: (query) => { return make.get('/api/book/search?query=' + query)},
            isbn : (isbn) => { return make.get('/api/book/search?isbn=' + isbn)},
            genre : (genre) => { return make.get('/api/book/search?genre=' + genre)},
            year : (year) => { return make.get('/api/book/search?year=' + year)},
            author : (author) => { return make.get('/api/book/search?author=' + author)},
            author_id : (author_id) => { return make.get('/api/book/search?author_id=' + author_id)},
            publisher : (publisher) => { return make.get('/api/book/search?publisher=' + publisher)},
            publisher_id : (publisher_id) => { return make.get('/api/book/search?publisher_id=' + publisher_id)},
            theme : (theme) => { return make.get('/api/book/search?theme=' + theme)}
        }
    },
    address: () => { return make.get('/api/user/0/address')}, //FIX THIS AND PUT IT INSIDE USER KEY!!!!! ASAP!!!!!
    chart: () => { return make.get('/api/user/0/chart')},
    user : {
        wishlist: () => { return make.get('/api/user/0/whishlist') }
    },
    author: {
        get : (id) => { return make.get('/api/author/' + id) },
        books : (id) => { return get.book.search.author_id(id)},
        reviews : (id) => { return make.get('/api/author/' + id + '/review') }
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
    },
    user : {
        address : (body) => {
            return make.post('/api/user/0/address', body)
        },
        wishlist : {
            add : (id) => {
                return make.post('/api/user/0/whishlist/?book_id=' + id, undefined, data => {return data})
            },
            delete : (id) => {
                return make.delete('/api/user/0/whishlist/?bookID=' + id, undefined, data => {return data})
            }
        }
    }
}
export let put = {
    user : {
        cart : (id, qty) => {
            return make.put('/api/user/0/chart', {bookID : parseInt(id), qty: parseInt(qty)})
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