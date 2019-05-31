import * as api from '/lib/js/utils/api.js';
import * as image from '/lib/js/utils/image.js';
import * as loader from '/lib/js/utils/template_loader.js'
import * as modal from '/components/modal/modal.js'
import * as loading from '/components/loading/loading.js'


$(() => {

    // First inject the loader
    loading.show(loader).then(loading_obj => {

        // Then Inject modal to handle messages, then perform all the rest..
        modal.inject(modal.type.alert, 'book').then(modal_obj => {

            console.log('Loaded!');

            // GET Args
            let args = new URLSearchParams(window.location.search);

            //If id exists
            if (args.has('id')) {

                let id = parseInt(args.get('id'))

                // Retrieve and map book
                api.get.book.get(id)
                    .then(book => {
                        // Load JSON
                        api.map({
                            '.book-title': book.title,
                            '.book-author': book.author.name,
                            '.book-rating-val': book.avg_rating,
                            '.book-price': book.price,
                            '.book-genres': book.genres.join(' / '),
                            '.book-publisher': book.publisher,
                            '.book-isbn': book.isbn,
                            '.book-isbn-13': book.isbn13,
                            '.book-date': [book.publication_month, book.publication_year].join('/'),
                            '.book-description': book.description.slice(0, 500),
                            '.book-full-description': book.description.slice(500, book.description.length),
                        });
                        // Load book image
                        image.load('.book-image > img', book.image_href).then(() => {
                            $('.section.top').fadeIn()
                        })
                    })
                    .catch(e => {
                        modal.error(e)
                    });

                // Inject related books carousel
                loader.append('.related-container', '/components/carousel/container.html', 'related-carousel')
                    .then(() => {

                        api.get.book.related(id).then(books => {
                            books.forEach(book => {
                                loader.append_map('#related-carousel .MS-content', '/components/carousel/items/book.html', book.id, function (book_obj) {
                                    book_obj.find('.book-href').attr('href', '/book/?id=' + book.id);
                                    book_obj.find('.image').css("background-image", "url(" + book.image_href + ")");
                                    book_obj.find('.title').html(book.title)
                                })
                                    .then(() => {
                                        if (book === $(books).get(-1)) {
                                            $('#related-carousel').multislider({
                                                interval: 3000,
                                                hoverPause: true
                                            });
                                            $('.section.bottom').fadeIn()
                                        }
                                    })
                                    .catch(e => {
                                        modal.error(e)
                                    });
                            })
                        })
                    })
                    .catch(e => {
                        modal.error(e)
                    });

                // Download reviews
                api.get.book.reviews(id).then(reviews => {
                    reviews.forEach(function (review) {
                        loader.append_map('.book-reviews-container', '/components/review/review.html', review.id, (o) => {
                            o.find('.author').html(review.author)
                            o.find('.content').html(review.body)
                            o.find('.title').html(review.title)
                        })
                    })
                }).catch(e => {
                    modal.error(e)
                })
            } else {
                modal.show('Warning', 'Unknown book id')
            }
        })
    })
});