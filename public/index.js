import * as api from '/lib/js/utils/api.js';
import * as loader from '/lib/js/utils/template_loader.js'

$(() => {

    // Inject
    loader.append('.whatsnew', '/components/carousel/container.html', 'whatsnew-carousel')
        .then(() => {

            api.get.books(0, 20).then(books => {
                books.forEach(book => {
                    loader.append_map('#whatsnew-carousel .MS-content', '/components/carousel/items/book.html', book.id, (o) => {
                        o.find('.book-href').attr('href', '/book/?id=' + book.id);
                        o.find('.image').css("background-image", "url(" + book.image_href + ")");
                        o.find('.title').html(book.title)
                    })
                        .then(() => {
                            if (book === $(books).get(-1)) {
                                $('#whatsnew-carousel').multislider({
                                    interval : 3000,
                                    hoverPause : true
                                });
                            }
                        })
                })
            })
        })

    // Inject
    loader.append('.favourites', '/components/carousel/container.html', 'favourites-carousel')
        .then(() => {

            api.get.books(100, 20).then(books => {
                books.forEach(book => {
                    loader.append_map('#favourites-carousel .MS-content', '/components/carousel/items/book.html', book.id, (o) => {
                        o.find('.image').css("background-image", "url(" + book.image_href + ")");
                        o.find('.title').html(book.title)
                    })
                        .then(() => {
                            if (book === $(books).get(-1)) {
                                $('#favourites-carousel').multislider({
                                    interval : 3000,
                                    hoverPause : true
                                });
                            }
                        })
                })
            })
        })

});