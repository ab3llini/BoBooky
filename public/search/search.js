import * as api from '/lib/js/utils/api.js';
import * as image from '/lib/js/utils/image.js';
import * as loader from '/lib/js/utils/template_loader.js'
import * as modal from '/components/modal/modal.js'
import * as loading from '/components/loading/loading.js'
import * as worker from '/lib/js/utils/worker.js'
import * as rating from '/components/review/rating/rating.js'


$(() => {

    $('.search-bar').focus(function () {
        $(this).parents('.search-bar-wrapper').addClass('focused')
    })
    $('.search-bar').focusout(function () {
        $(this).parents('.search-bar-wrapper').removeClass('focused')
    })

    //Assign static overlay;
    loading.set('body > .loading');

    // Create new job to load all elements first
    let loadingJob = worker.newJob(4, loading.hide);

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
                book_obj.find('.genres').html(book.genres.map(genre => '<a class="text-decoration-none text-gray" href="/search/genre/?genre=' + genre.name + '">' + genre.name + '</a>').join(' / '));
                book_obj.find('.theme').html('<a class="text-decoration-none text-gray" href="/search/theme/?theme=' + book.theme + '">' + book.theme + '</a>');
                book_obj.find('.price').html(book.price);
                book_obj.find('.book-rating-val').html(parseInt(book.avg_rating));

                // Setup in wishlist
                if (inWishlist.indexOf(book.id) >= 0) {
                    let $btn = book_obj.find('.wishlist');
                    let $heart = $btn.find('.fa');
                    $heart.removeClass('fa-heart-o');
                    $heart.addClass('fa-heart')
                }

                // Bind handlers for wishlist
                book_obj.find('.wishlist').unbind().click(function () {

                    let idx = inWishlist.indexOf(book.id);
                    if (idx >= 0) {
                        api.post.user.wishlist.delete(book.id).then(() => {
                            console.log('Removed');
                            let $heart = $(this).find('.fa');
                            $heart.removeClass('fa-heart');
                            $heart.addClass('fa-heart-o');
                            inWishlist.splice(idx, 1)
                        }).catch(e => modal.error(e))
                    } else {
                        api.post.user.wishlist.add(book.id).then(() => {
                            console.log('Added');
                            let $heart = $(this).find('.fa');
                            $heart.removeClass('fa-heart-o');
                            $heart.addClass('fa-heart');
                            inWishlist.push(book.id)
                        }).catch(e => modal.error(e))
                    }
                });

                rating.append_rating(book_obj.find('.rating'), parseInt(book.avg_rating));

                api.get.book.reviews(book.id).then(reviews => {
                    if (reviews === undefined) {
                        return
                    }
                    book_obj.find('.book-rating-qty').html(reviews.length)
                })
            }).then(() => {
                if (book === $(books).get(-1)) {
                    loadingJob.completeTask()
                }
            })
                .catch(e => {
                    loadingJob.completeTask();
                    modal.error(e)
                });
        })
    };

    // Then Inject modal to handle messages, then perform all the rest..
    modal.inject(modal.type.alert, 'search').then(modal_obj => {

        // GET Args
        let args = new URLSearchParams(window.location.search);
        let query = '';
        //If id exists
        if (args.has('q'))
            query = args.get('q');

        // Utilities
        let get_filter = (key, _default = undefined) => args.has(key) ? args.get(key) : (_default !== undefined ? _default : 'default');
        let create_options = (filter, options) => options.forEach(option => $(filter).append(new Option(option, option)));

        let filters = {
            orderby: get_filter('orderby'),
            genre: get_filter('genre'),
            theme: get_filter('theme'),
            page: parseInt(get_filter('page', 0))
        };


        let filterJob = worker.newJob(2, () => {
            // Set values to search and genre/theme filters
            $('.search-bar').val(query);
            $('.filter.orderby').val(filters.orderby);
            $('.filter.genre').val(filters.genre);
            $('.filter.theme').val(filters.theme);
        });

        let next_btn = $('.next');
        let prev_btn = $('.previous');

        next_btn.click(function () {
            $('.search-form .page').val(filters.page + 1);
            $('.search-form').submit();
        });

        prev_btn.click(function () {
            $('.search-form .page').val(filters.page - 1);
            $('.search-form').submit();
        });

        $('.filter').change(() => $('.search-form').submit());

        // Fetch all genres and populate filter
        api.get.book.genres().then(genres => {
            create_options('.filter.genre', genres.map(genre => genre.name).sort());
            loadingJob.completeTask();
            filterJob.completeTask()
        }).catch(e => {
            modal.error(e);
            loadingJob.completeTask();
        });

        // Fetch all discover and populate filter
        api.get.book.themes().then(themes => {
            create_options('.filter.theme', themes.map(theme => theme.name).sort());
            loadingJob.completeTask();
            filterJob.completeTask()
        }).catch(e => {
            modal.error(e);
            loadingJob.completeTask();
        });

        // Inject authors carousel
        api.get.book.search.author(query).then(books => {

            // Fetch all authors that match the query
            let authors = {};

            if (books !== undefined) {
                books.forEach(book => {
                    // Check-Add author
                    if (!(book.author.id in authors)) {
                        authors[book.author.id] = book.author
                    }
                })
            }

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

                                        loadingJob.completeTask()
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
                loadingJob.completeTask();
                $('.author-container').html("No authors found..")
            }
        }).catch(e => modal.error(e));

        // Wishlist
        let wishlist = [];
        let inWishlist = [];

        let query_args = {
            query: query,
            orderby: filters.orderby,
            genre: filters.genre,
            theme: filters.theme,
            offset: filters.page
        };

        if (query_args.orderby === 'default')
            delete query_args.orderby;
        if (query_args.genre === 'default')
            delete query_args.genre;
        if (query_args.theme === 'default')
            delete query_args.theme;
        if (query_args.page === 0)
            delete query_args.page;

        // Fetch all books that match the query
        api.get.book.search.mixed(query_args).then(books => {

            if (books.length < 20) {
                next_btn.hide();
            }
            if (filters.page === 0) {
                prev_btn.hide();
            }

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

            } else {
                $('.books-container').html("No books found..");
                loadingJob.completeTask()
            }
        }).catch(
            e => {
                loadingJob.completeTask();
                modal.error(e)
            });

    })
});