let object = undefined;

export let type = {
    alert: 'alert',
    checkout : 'checkout'
};

export let inject = (type, id) => {
    return new Promise ((resolve, reject) => {
        if (object === undefined) {
            $('body').append('<div id="modal-container-' + id + '"></div>');
            $('#modal-container-' + id).load('/components/modal/templates/' + type + '.html', () => {
                object = $('#modal-container-' + id + ' #' + type + '-modal');
                resolve(object)
            });
        }
    })
};

export let show = (title, content, e = undefined) => {
    return new Promise( resolve => {
        object.find('.modal-title').html(title);
        object.find('.modal-body .message').html(content);
        if (e !== undefined)
            object.find('.modal-body .error').html(e.message);
        object.modal();
        object.on('hidden.bs.modal', function (e) {
            resolve(object)
        })
    })
};


export let error = (error) => {
    if (error.status === 401) {
        show('Login or Register', 'Please login or register first!')
    }
    else {
        show(error.statusText + ' (' + error.status + ')', 'Something went wrong.', error)
    }
};

