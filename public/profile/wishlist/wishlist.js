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
    let loadingJob = worker.newJob(1, loading.hide);

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
                book_obj.find('.book-rating-val').html(book.avg_rating);

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
                            $(this).parents('.book').first().slideUp()
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

                rating.append_rating(book_obj.find('.rating'), book.avg_rating);

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

        // Wishlist
        let wishlist = [];
        let inWishlist = [];

        // Fetch all books that match the query
        api.get.user.wishlist().then(books => {

            if (books !== undefined && books.length > 0) {

                wishlist = books;
                books.forEach(book => {
                    inWishlist.push(book.id);
                });
                inject_books(inWishlist, books)

            } else {
                $('.books-container').html("Your wishlist is empty! Add something :)");
                loadingJob.completeTask()
            }
        }).catch(
            e => {
                loadingJob.completeTask();
                modal.error(e)
            });


    })
});