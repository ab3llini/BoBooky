$(function () {

    // Inject navbar
    $(".nav-placeholder").load("/components/navbar/navbar.html");

    // Toggle bg color
    $(document).scroll(function () {
        let $nav = $(".navbar");
        let didScroll = $(this).scrollTop() > $nav.height();
        $nav.toggleClass('scrolled', didScroll);
        $nav.toggleClass('unscrolled', !didScroll);
        $nav.toggleClass('bg-dark', didScroll);
    });
    
    console.log("K=" + document.cookie)

});
