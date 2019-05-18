import * as api from '/js/utils/api.js';
import * as session from '/js/utils/session.js';

$(() => {

    let forms = $('.needs-validation');
    forms.each((idx, form) => {
        form.addEventListener('submit', (event) => {
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated')
        }, false)
    });

    $('.dates #usr1').datepicker({
        'format': 'yyyy-mm-dd',
        'autoclose': true
    });

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
                let m = $('#successModal');
                m.modal();
                m.on('hidden.bs.modal', function (e) {
                    session.login(body['email'], body['password'])
                        .then(result => {
                            $(window.location).attr('href', '/');
                        })
                        .catch(e => {
                            $('#errorModal').modal();
                        })
                })
            })
            .catch(e => {
                $('#errorModal').modal();
            })
    })
})
