import * as session from '/lib/js/utils/session.js'
import * as modal from "/components/modal/modal.js";


$(function () {


    // Inject navbar
    $(".nav-placeholder").load("/components/navbar/navbar.html", function () {

        // Close all collapse items when a new one is opened
        $('.nav-link').click(function () {
            if ($(this).attr('data-toggle') === 'collapse') {
                $('.auto-hide.show:not(.nav-collapse)').collapse('hide')
            }
        });

        // Bind collapse
        let profile_button = $('.navbar #profile-button');
        if (session.isLoggedIn()) {
            profile_button.attr('data-target', '#profile-ribbon');
            profile_button.attr('aria-controls', 'profile-ribbon')

        } else {
            profile_button.attr('data-target', '#register-login-ribbon');
            profile_button.attr('aria-controls', 'register-login-ribbon')
        }

        // Replace salute user
        if (session.isLoggedIn()) {
            $('#profile-ribbon #username').html(session.get().user.name)
        }

        //Inject modal container
        modal.inject(modal.type.alert, 'navbar-modal');

        // Bind login functionality
        $("#register-login-form").submit(function (evt) {
            evt.preventDefault();
            // Fields
            let inputs = $(this).find('input');
            let form = {};
            inputs.each(function () {
                form[this.name] = this.value;
            });
            session.login(form.username, form.password)
                .then(result => {
                    //modal.show('Welcome back ' + session.get().user.name + '!', 'We were missing you!')
                    location.reload()
                })
                .catch(e => {
                    modal.show('Well, that didn\'t work', 'Check your credentials and try again!')
                })
        });
        $('.logout').click(() => {
            session.logout()
                .then(result => {
                    modal.show('See you soon!', 'You have successfully disconnected.').then(o => {
                        window.location.href = '/'
                    })
                })
                .catch(e => {
                    modal.error(e)
                })
        });

        $('.navbar #cart-button').click(function () {
            if (session.isLoggedIn())
                window.location.href = '/profile/cart';
            else
                modal.show('Please login or register!', 'You need to be logged in in order to see your cart.')
        })
        $('.navbar #wishlist-button').click(function () {
            if (session.isLoggedIn())
                window.location.href = '/profile/wishlist'
            else
                modal.show('Please login or register!', 'You need to be logged in in order to see your wishlist.')
        })

    });


});
