export let load = (selector, src) => {
    return new Promise((resolve) => {
        let $image = $(selector);
        $image.one("load", function() {

        }).each(function() {
            if(this.complete) {
                $(this).trigger('load');
                resolve()
            }
        });
        $image.attr("src", src);
    })
};