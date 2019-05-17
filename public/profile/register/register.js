import * as api from '/js/utils/api.js';


$("#register-form").submit(function(evt) {
    evt.preventDefault();
    // Fields
    let inputs = $(this).find('input');
    let body = {};
    inputs.each(function () {
        if($(this).attr('name'))
            body[this.name] = this.value;
    });

    // API Call
    api.post.register(body)
        .then(result => {
            console.log(result)
        })
        .catch(e => {
            console.log(e)
            console.log(e.responseText)
        })

})
