import * as api from '/lib/js/utils/api.js';
import * as image from '/lib/js/utils/image.js';
import * as loader from '/lib/js/utils/template_loader.js'
import * as modal from '/components/modal/modal.js'
import * as loading from '/components/loading/loading.js'
import * as worker from '/lib/js/utils/worker.js'
import * as rating from '/components/review/rating/rating.js'


$(() => {

    let inject_books = (inWishlist, books) => {
        // append books
        books.forEach(book => {


            // Add book to results
            loader.append_map('.books-container', '/components/search/book.html', book.id, function (book_obj) {
                book_obj.find('.book-href').attr('href', '/book/?id=' + book.id);
                book_obj.find('.author-href').attr('href', '/author/?id=' + book.author.id);
                book_obj.find('.image').css("background-image", "url(" + book.image_href + ")");

                book_obj.find('.title').html(book.title);
                book_obj.find('.author').html(book.author.name);
                book_obj.find('.date').html([book.publication_month, book.publication_year].join('/'));
                book_obj.find('.genres').html(book.genres.map(genre => genre.name).join(' / '));
                book_obj.find('.theme').html(book.theme);
                book_obj.find('.price').html(book.price);
                book_obj.find('.book-rating-val').html(book.avg_rating);

                // Setup in wishlist
                if (inWishlist.indexOf(book.id) > 0) {
                    let $btn = book_obj.find('.wishlist');
                    let $heart = $btn.find('.fa');
                    $heart.removeClass('fa-heart-o');
                    $heart.addClass('fa-heart')
                }

                // Bind handlers for wishlist
                book_obj.find('.wishlist').unbind().click(function () {

                    let idx = inWishlist.indexOf(book.id)
                    if (idx > 0) {
                        api.post.user.wishlist.delete(book.id).then(() => {
                            console.log('Removed')
                            let $heart = $(this).find('.fa');
                            $heart.removeClass('fa-heart');
                            $heart.addClass('fa-heart-o')
                            inWishlist.splice(idx, 1)
                        }).catch(e => modal.error(e))
                    } else {
                        api.post.user.wishlist.add(book.id).then(() => {
                            console.log('Added')
                            let $heart = $(this).find('.fa');
                            $heart.removeClass('fa-heart-o');
                            $heart.addClass('fa-heart')
                            inWishlist.push(book.id)
                        }).catch(e => modal.error(e))
                    }
                });

                rating.append_rating(book_obj.find('.rating'), book.avg_rating).then(o => { /*loadingJob.completeTask() */
                })

                api.get.book.reviews(book.id).then(reviews => {
                    if (reviews === undefined) {
                        return
                    }
                    book_obj.find('.book-rating-qty').html(reviews.length)
                })
            }).then(() => {
                if (book === $(books).get(-1)) {
                    //loadingJob.completeTask()
                }
            })
                .catch(e => {
                    modal.error(e)
                });


        })
    }

    //Assign static overlay;
    //loading.set('body > .loading');

    // Create new job to load all elements first
    //let loadingJob = worker.newJob(4, loading.hide);

    // Then Inject modal to handle messages, then perform all the rest..
    modal.inject(modal.type.alert, 'search').then(modal_obj => {

        // GET Args
        let args = new URLSearchParams(window.location.search);

        //If id exists
        if (args.has('q')) {

            let query = args.get('q')

            // Fetch all authors that match the query
            let authors = {};

            // Inject authors carousel
            api.get.book.search.author(query).then(books => {
                books.forEach(book => {
                    // Check-Add author
                    if (!(book.author.id in authors)) {
                        authors[book.author.id] = book.author
                    }
                })
                if (Object.values(authors).length > 0) {
                    loader.append('.author-container', '/components/carousel/container.html', 'author-carousel')
                        .then(() => {
                            Object.values(authors).forEach(author => {
                                loader.append_map('#author-carousel .MS-content', '/components/carousel/items/author.html', author.id, function (book_obj) {
                                    book_obj.find('.author-href').attr('href', '/author/?id=' + author.id);
                                    book_obj.find('.image').css("background-image", "url(" + author.image_url + ")");
                                    book_obj.find('.title').html(author.name);
                                })
                                    .then(() => {
                                        if (author === $(Object.values(authors)).get(-1)) {
                                            let ms = $('#author-carousel');
                                            ms.multislider({
                                                interval: 3000,
                                                hoverPause: true
                                            }).multislider('pause');

                                            //loadingJob.completeTask()
                                        }
                                    })
                                    .catch(e => {
                                        modal.error(e)
                                    });
                            })

                        })
                        .catch(e => {
                            modal.error(e)
                        });

                } else {
                    $('.author-container').html("No authors found..")
                }
            }).catch(e => modal.error(e))

            // Wishlist
            let wishlist = [];
            let inWishlist = []


            // Fetch all books that match the query
            api.get.book.search.query(query).then(books => {

                if (books !== undefined && books.length > 0) {

                    // Init wishlist
                    api.get.user.wishlist().then(_wishlist => {

                        wishlist = _wishlist;
                        _wishlist.forEach(book => {
                            inWishlist.push(book.id);
                        });
                        inject_books(inWishlist, books)

                    }).catch(e => {
                        inject_books(inWishlist, books)
                    });

                }
            }).catch(e => modal.error(e));

        } else {
            modal.show('Warning', 'Unknown book id')
        }
    })


});