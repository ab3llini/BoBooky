import * as api from '/js/utils/api.js';
import * as carousel from '/js/components/carousel.js'

let config = {
    slide_n_books: 4
};

$(() => {
    // Populate books
    api.get.books(0, 10 * config.slide_n_books).then(books => {
        carousel.initialize('books', books, (dom, item) => {
            dom.find('img').attr('src', item.image_href);
            dom.find('.card-title').html(item.title);
            dom.find('.card-text').html(item.description);
        })
    })
});