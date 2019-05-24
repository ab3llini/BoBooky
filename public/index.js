import * as api from '/lib/js/utils/api.js';
import * as loader from '/lib/js/utils/template_loader.js'

let config = {
    slide_n_books: 4
};

$(() => {

    // Inject carousel
    loader.append('.whatsnew', '/components/carousel/carousel_container.html', 'whatsnew-carousel')
        .then(() => {

            api.get.books(0, 20).then(books => {
                books.forEach(book => {
                    loader.append_map('#whatsnew-carousel .MS-content', '/components/carousel/carousel_item.html', undefined, (o) => {
                        o.html(book.id)
                    })
                        .then(() => {
                            if (book === $(books).get(-1)) {
                                $('#whatsnew-carousel').multislider();
                            }
                        })
                })

            })
        })

});