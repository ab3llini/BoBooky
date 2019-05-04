$(function () {
    $(document).scroll(function () {
        let $nav = $(".navbar");
        let didScroll = $(this).scrollTop() > $nav.height();
        $nav.toggleClass('scrolled', didScroll);
        $nav.toggleClass('unscrolled', !didScroll);
        $nav.toggleClass('bg-dark', didScroll);
    });
});