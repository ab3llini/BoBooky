$(() => {
    $('.multi-item-carousel').on('slide.bs.carousel', function (e) {
        let $e = $(e.relatedTarget),
            itemsPerSlide = 4,
            totalItems = $('.carousel-item', this).length,
            $itemsContainer = $('.carousel-inner', this),
            it = itemsPerSlide - (totalItems - $e.index());
        if (it > 0) {
            for (var i = 0; i < it; i++) {
                $('.carousel-item', this).eq(e.direction == "left" ? i : 0).// append slides to the end/beginning
                appendTo($itemsContainer);
            }
        }
    });

});

export let initialize = (id, items, map) => {

    let item_template = $('#' + id + ' .carousel-item.template').remove();
    let container = $('#' + id + ' .carousel-inner');

    items.forEach((item, idx) => {
        let dom = item_template.clone();
        if (idx === 0) {
            dom.addClass('active')
        }
        map(dom, item);
        container.append(dom);
    });
};