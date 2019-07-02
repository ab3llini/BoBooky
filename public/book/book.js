import * as api from '/lib/js/utils/api.js';
import * as image from '/lib/js/utils/image.js';
import * as loader from '/lib/js/utils/template_loader.js'
import * as modal from '/components/modal/modal.js'
import * as loading from '/components/loading/loading.js'
import * as worker from '/lib/js/utils/worker.js'
import * as rating from '/components/review/rating/rating.js'


$(() => {

    //Assign static overlay;
    loading.set('body > .loading');

    // Create new job to load all elements first
    let loadingJob = worker.newJob(4, loading.hide);

    // Then Inject modal to handle messages, then perform all the rest..
    modal.inject(modal.type.alert, 'book').then(modal_obj => {

        // GET Args
        let args = new URLSearchParams(window.location.search);

        //If id exists
        if (args.has('id')) {

            let id = parseInt(args.get('id'));

            let inWishlist = false;

            // Init wishlist
            api.get.user.wishlist().then(wishlist => {
                wishlist.forEach(function (book) {
                    if (book.id === id) {
                        inWishlist = true;
                        let $btn = $('.wishlist');
                        let $heart = $btn.find('.fa');
                            $heart.removeClass('fa-heart-o');
                            $heart.addClass('fa-heart')
                    }
                })
            }).catch(e => {});

            // Bind wishlist add/remove
            $('.wishlist').unbind().click(function () {
                if (inWishlist) {
                    api.post.user.wishlist.delete(id).then(()=> {
                        console.log('Removed');
                        let $heart = $(this).find('.fa');
                        $heart.removeClass('fa-heart');
                        $heart.addClass('fa-heart-o');
                        inWishlist = false;
                    }).catch(e => modal.error(e))
                }
                else {
                    api.post.user.wishlist.add(id).then(()=> {
                        console.log('Added');
                        let $heart = $(this).find('.fa');
                        $heart.removeClass('fa-heart-o');
                        $heart.addClass('fa-heart');
                        inWishlist = true;
                    }).catch(e => modal.error(e))
                }
            });


            // Bind add/remove to cart
            $('.cart-add').click(function() {
                let qty = $(this).parents('.input-group').first().find('.cart-qty').first().val();
                api.put.user.cart(id, qty).then(() => {
                    modal.show('Thanks!', 'The book was added to your cart!')
                }).catch( e => modal.error(e) )
            });

            // Retrieve and map book
            api.get.book.get(id)
                .then(book => {

                    // Set page title
                    document.title = book.title;

                    let bd_arr = book.description.split(' ');

                    let bind_link = (link, name) => {
                        return '<a href="' + link + '" class="text-decoration-none text-gray">' + name + '</a>'
                    };

                    // Load JSON
                    api.map({
                        '.book-title': book.title,
                        '.book-author': book.author.name,
                        '.book-rating-val': parseInt(book.avg_rating),
                        '.book-price': book.price,
                        '.book-genres': book.genres.map(genre => bind_link('/search/genre/?genre=' + genre, genre)).join(' / '),
                        '.book-theme':  bind_link('/search/theme/?theme=' + book.theme, book.theme),
                        '.book-publisher': book.publisher,
                        '.book-isbn': book.isbn,
                        '.book-isbn-13': book.isbn13,
                        '.book-date': [book.publication_month, book.publication_year].join('/'),
                        '.book-description': bd_arr.slice(0, 80).join(' '),
                        '.book-full-description': bd_arr.slice(80, bd_arr.length).join(' '),
                    });

                    $('.book-author-href').attr('href', '/author/?id='+book.author.id);
                    $('.author-events').attr('href', '/search/event/?q=' + book.author.name);

                    // Load book image
                    image.load('.book-image > img', book.image_href).then(() => {
                        loadingJob.completeTask()
                    });

                    //Inject rating
                    rating.append_rating('.book-rating', parseInt(book.avg_rating)).then(o => { loadingJob.completeTask() })

                })
                .catch(e => {
                    modal.error(e)
                });

            // Inject related books carousel
            loader.append('.related-container', '/components/carousel/container.html', 'related-carousel')
                .then(() => {

                    api.get.book.related(id).then(books => {
                        $('.book-data').html(books[0].title);

                        books.forEach(book => {
                            loader.append_map('#related-carousel .MS-content', '/components/carousel/items/book.html', book.id, function (book_obj) {
                                book_obj.find('.book-href').attr('href', '/book/?id=' + book.id);
                                book_obj.find('.image').css("background-image", "url(" + book.image_href + ")");
                                book_obj.find('.title').html(book.title);
                                book_obj.find('.data').html(book.title);
                            })
                                .then(() => {
                                    if (book === $(books).get(-1)) {
                                        let ms = $('#related-carousel');
                                        ms.multislider({
                                            interval: 3000,
                                            hoverPause: true
                                        });
                                        ms.on('ms.after.animate', function(){
                                            let data = $(this).find('.item').first().find('.data').html();
                                            $('.book-data').html(data)
                                        });
                                        loadingJob.completeTask()
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
                if (reviews.length === 0) {
                    loadingJob.completeTask();
                    return
                }

                $('.book-rating-qty').html(reviews.length);

                reviews.forEach(function (review) {
                    loader.append_map('.book-reviews-container', '/components/review/review.html', review.id, (o) => {
                        o.find('.author').html(review.author.name + ' ' + review.author.surname);
                        o.find('.content').html(review.body);
                        o.find('.title').html(review.title);
                        rating.append_rating(o.find('.rating'), review.rating)
                    }).then(() => {
                        loadingJob.completeTask()
                    })
                })
            }).catch(e => {
                modal.error(e)
            })
        } else {
            modal.show('Warning', 'Unknown book id')
        }
    })


});