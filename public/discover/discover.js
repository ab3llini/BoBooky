$(() => {

    let args = new URLSearchParams(window.location.search);

    //If id exists
    if (args.has('show')) {
        let show = args.get('show');
        $('#' + show).addClass('border-bottom')
        $('.' + show).addClass('active show')

    }
    else {
        alert('This link is broken! you need to pass what to show!')
    }

    $('.nav-item').click(function () {
        $('a').find('h3').toggleClass('border-bottom');
    })



});



