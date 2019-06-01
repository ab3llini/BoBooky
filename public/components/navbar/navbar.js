import * as session from '/lib/js/utils/session.js'

$(function () {


    // Inject navbar
    $(".nav-placeholder").load("/components/navbar/navbar.html", function() {
        // Toggle bg color on scroll
        /*$(document).scroll(function () {
            let $nav = $(".navbar");
            let didScroll = $(this).scrollTop() > $nav.height();
            $nav.toggleClass('scrolled', didScroll);
            $nav.toggleClass('unscrolled', !didScroll);
            $nav.toggleClass('bg-dark', didScroll);
        }); */

        // Bind collapse
        let profile_button = $('.navbar #profile-button');
        if (session.isLoggedIn()) {
            profile_button.attr('data-target', '#profile-ribbon');
            profile_button.attr('aria-controls', 'profile-ribbon')
        }
        else {
            profile_button.attr('data-target', '#register-login-ribbon');
            profile_button.attr('aria-controls', 'register-login-ribbon')
        }

        // Replace salute user
        if (session.isLoggedIn()) {
            $('#profile-ribbon #username').html(session.get().user.username)
        }

        // Bind login functionality
        $("#register-login-form").submit(function(evt){
            evt.preventDefault();
            // Fields
            let inputs = $(this).find('input');
            let form = {};
            inputs.each(function () {
                form[this.name] = this.value;
            });
            session.login(form.username, form.password)
                .then(result => {
                    // Refresh page
                    location.reload();
                })
                .catch(e => {
                    alert('Wrong username or password')
                })
        });

        $('.logout').click(() => {
            session.logout()
                .then(result => {
                    console.log('Logged out')
                    location.reload()
                })
                .catch(e => {
                    console.log("Unable to logout, reason: " + JSON.stringify(e))
                })
        });



    });


});
