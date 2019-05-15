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

            if (username === undefined || username === '') {
                reject();
                return;
            }

            if (password === undefined || password === '') {
                reject();
                return;
            }

            $.ajax({
                url: '/login',
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify({
                    username: username,
                    password: password
                }),
                success: (data) => {
                    resolve(data)
                },
                error: (error) => {
                    reject(error)
                }
            });
        })
    },
    logout : () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: '/logout',
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
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