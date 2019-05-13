export let get = {
    session : () => {
        return {
            name : 'Alberto'
        }
    },
    books : (offset, limit) => {
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
    login : (username, password) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: '/login',
                type: 'POST',
                body: {
                    username: username,
                    password: password
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
}