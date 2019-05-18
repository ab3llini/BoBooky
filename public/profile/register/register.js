import * as api from '/js/utils/api.js';
import * as session from '/js/utils/session.js';

$(() => {
    $('.dates #usr1').datepicker({
        'format': 'yyyy-mm-dd',
        'autoclose': true
    });

    $("#register-form").submit(function(evt) {
        evt.preventDefault();

        let form = $('.needs-validation')[0];
        if (form.checkValidity() === false) {
            evt.preventDefault();
            evt.stopPropagation();
            form.classList.add('was-validated');
            return
        }
        let pwd = $(this).find('#inputPassword').val();
        let pwd_2 = $(this).find('#inputPasswordRepeated').val();
        form.classList.add('was-validated');
        if (pwd.length < 8) {
            alert('Password mus be at least 8 character long')
            return
        }
        if (pwd !== pwd_2) {
            alert('Password are not the same');
            return;
        }

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
