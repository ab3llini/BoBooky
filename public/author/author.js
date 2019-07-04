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
    let loadingJob = worker.newJob(2, loading.hide);

    // Then Inject modal to handle messages, then perform all the rest..
    modal.inject(modal.type.alert, 'author').then(modal_obj => {

        // GET Args
        let args = new URLSearchParams(window.location.search);

        //If id exists
        if (args.has('id')) {

            let id = parseInt(args.get('id'));

            let avg_rating = 0;

            // Download author reviews
            api.get.author.reviews(id).then(reviews => {
                if (reviews === undefined) {
                    loadingJob.completeTask();
                    return
                }

                let reviewJob = worker.newJob(reviews.length, () => {

                    avg_rating = parseInt(avg_rating / reviews.length);

                    // Retrieve and map author
                    api.get.author.get(id)
                        .then(author => {

                            // Set page title
                            document.title = author.name;

                            let ad_arr = author.description.split(' ');


                            // Load JSON
                            api.map({
                                '.author-name': author.name,
                                '.author-rating-val': avg_rating,
                                '.author-description': ad_arr.slice(0, 80).join(' '),
                                '.author-full-description': ad_arr.slice(80, ad_arr.length).join(' '),
                            });

                            $('.author-image > .img').css("background-image", "url(" + author.image_url + ")");
                            $('.author-events').attr('href', '/search/event/?q=' + author.name);

                            //Inject rating
                            rating.append_rating('.author-rating', avg_rating).then(o => { loadingJob.completeTask() })

                        })
                        .catch(e => {
                            modal.error(e)
                        });
                });


                $('.author-rating-qty').html(reviews.length);
                reviews.forEach(function (review) {
                    loader.append_map('.author-reviews-container', '/components/review/review.html', review.id, (o) => {
                        o.find('.author').html(review.author.name + ' ' + review.author.surname);
                        o.find('.content').html(review.body);
                        o.find('.title').html(review.title);
                        avg_rating += review.rating;
                        rating.append_rating(o.find('.rating'), review.rating)
                    }).then(() => {
                        reviewJob.completeTask()
                    })
                })
            }).catch(e => {
                modal.error(e)
            });



            // Inject related books carousel
            loader.append('.related-container', '/components/carousel/container.html', 'related-carousel')
                .then(() => {


                    api.get.book.search.author_id(id).then(books => {

                        if (books === undefined) {
                            loadingJob.completeTask();
                            return;
                        }
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


        } else {
            modal.show('Warning', 'Unknown author id')
        }
    })


});