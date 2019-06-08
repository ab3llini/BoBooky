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

export let show = (title, content) => {
    object.find('.modal-title').html(title);
    object.find('.modal-body').html(content);
    object.modal();
    return object
};


export let error = (error) => {
    if (error.status === 401) {
        show('Login or Register', 'Please login or register first!')
    }
    else {
        show(error.statusText + ' (' + error.status + ')', 'Something went wrong.')
    }
}

