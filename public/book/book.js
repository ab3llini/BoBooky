import * as api from '/lib/js/utils/api.js';
import * as image from '/lib/js/utils/image.js';
import * as loader from '/lib/js/utils/template_loader.js'
import * as modal from '/components/modal/modal.js'


$(() => {

    // Inject modal to handle messages
    modal.inject(modal.type.alert, 'book')


    // GET Args
    let args = new URLSearchParams(window.location.search);

    //If id exists
    if (args.has('id')) {

        // Retrieve and map book
        api.get.book.get(parseInt(args.get('id')))
            .then(book => {
                // Load JSON
                api.map({
                    '.book-title' : book.title,
                    '.book-author' : book.author.name,
                    '.book-rating-val' : book.avg_rating,
                    '.book-price' : book.price,
                    '.book-genres' : book.genres.join(' / '),
                    '.book-publisher' : book.publisher,
                    '.book-isbn' : book.isbn,
                    '.book-isbn-13' : book.isbn13,
                    '.book-date' : [book.publication_month, book.publication_year].join('/'),
                    '.book-description' : book.description.slice(0, 500),
                    '.book-full-description' : book.description.slice(500, book.description.length),
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

                api.get.books(0, 20).then(books => {
                    books.forEach(book => {
                        loader.append_map('#related-carousel .MS-content', '/components/carousel/items/book.html', book.id, (o) => {
                            o.find('.image').css("background-image", "url(" + book.image_href + ")");
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
                            .catch(e => {
                                modal.error(e)
                            });
                    })
                })
            })
            .catch(e => {
                modal.error(e)
            });
    }
    else {
        modal.show('Warning', 'Unknown book id')
    }
});