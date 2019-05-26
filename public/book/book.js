import * as api from '/lib/js/utils/api.js';
import * as loader from '/lib/js/utils/template_loader.js'


$(() => {

    // Inject
    loader.append('.related-container', '/components/carousel/container.html', 'related-carousel')
        .then(() => {

            api.get.books(0, 20).then(books => {
                books.forEach(book => {
                    loader.append_map('#related-carousel .MS-content', '/components/carousel/items/book.html', book.id, (o) => {
                        //o.find('.image').css("background-image", "url(" + book.image_href + ")");
                        o.find('.title').html(book.title)
                    })
                        .then(() => {
                            if (book === $(books).get(-1)) {
                                $('#related-carousel').multislider({
                                    interval: 3000,
                                    hoverPause: true
                                });
                            }
                        })
                })
            })
        })
});