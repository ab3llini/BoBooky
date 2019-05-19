let object = undefined;

export let type = {
    alert: 'alert'
};

export let inject = (type, id) => {
    if (object === undefined) {
        $('body').append('<div id="modal-container-' + id + '"></div>');
        $('#modal-container-' + id).load('/components/modal/templates/' + type + '.html', () => {
            object = $('#modal-container-' + id + ' #' + type + '-modal')
        });
    }
};

export let show = (title, content) => {
    object.find('.modal-title').html(title);
    object.find('.modal-body').html(content);
    object.modal()
    return object
};

export let error = (error) => {
    show(error.statusText + ' (' + error.status + ')', 'Something went wrong.')
}

