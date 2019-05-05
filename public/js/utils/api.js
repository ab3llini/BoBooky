export let get = {
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