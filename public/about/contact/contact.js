import * as modal from '/components/modal/modal.js'

$(() => {
    $('button').click(function () {
        modal.show('Thanks for your message!', 'We will get back to you ASAP!').then(() => {
            window.location.href = '/'
        })
    })
})