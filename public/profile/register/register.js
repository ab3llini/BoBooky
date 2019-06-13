import * as modal from '/components/modal/modal.js'
import * as api from '/lib/js/utils/api.js';
import * as session from '/lib/js/utils/session.js';
import * as sanitizer from '/lib/js/utils/sanitizer.js';


$(() => {
    $('.dates #usr1').datepicker({
        'format': 'yyyy-mm-dd',
        'autoclose': true
    });

    modal.inject(modal.type.alert, 'ui');


    $("#register-form").submit(function (evt) {
        evt.preventDefault();

        sanitizer.locate(this);

        let pwd = $(this).find('#inputPassword').val();
        let pwd_2 = $(this).find('#inputPasswordRepeated').val();
        $(this)[0].classList.add('was-validated');
        if (pwd.length < 8) {
            modal.show('Warning', 'Password must be at least 8 character long');
            return
        }
        if (pwd !== pwd_2) {
            modal.show('Warning', 'Password are not the same');
            return;
        }

        if (sanitizer.validate()) {
            sanitizer.sanitize();
            let ctx = sanitizer.getContext();
            api.post.register(ctx)
                .then(result => {
                    modal.show('Welcome!', 'You have successfully registered')
                        .on('hidden.bs.modal', function (e) {
                            session.login(ctx['email'], ctx['password'])
                                .then(result => {
                                    $(window.location).attr('href', '/');
                                })
                                .catch(e => {
                                    modal.error(e)
                                })
                        })
                })
                .catch(e => {
                    modal.error(e)
                })
        }
    })
});
