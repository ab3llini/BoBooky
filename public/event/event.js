import * as api from '/lib/js/utils/api.js';
import * as image from '/lib/js/utils/image.js';
import * as loader from '/lib/js/utils/template_loader.js'
import * as modal from '/components/modal/modal.js'
import * as loading from '/components/loading/loading.js'
import * as worker from '/lib/js/utils/worker.js'

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

$(() => {

    loader.load_breadcrumb(['bg-purple']);

    //Assign static overlay;
    loading.set('body > .loading');

    // Create new job to load all elements first
    let loadingJob = worker.newJob(2, loading.hide);

    // Then Inject modal to handle messages, then perform all the rest..
    modal.inject(modal.type.alert, 'event').then(modal_obj => {

        // GET Args
        let args = new URLSearchParams(window.location.search);

        //If id exists
        if (args.has('id')) {

            let id = parseInt(args.get('id'))

            api.get.event.get(id)
                .then(event => {
                    // Download author
                    api.get.author.get(event.related_author.id).then(author => {

                        // Set page title
                        document.title = event.name;
                        let ad_arr = event.description.split(' ');
                        let date = new Date(event.timestamp);

                        console.log(event)

                        // Load JSON
                        api.map({
                            '.event-name': event.name,
                            '.event-location' : event.location.name + ', ' +  event.location.address_line_1 + ', ' +  event.location.cap + ', ' +  event.location.city + ', ' +  event.location.country,
                            '.event-author': event.related_author.name,
                            '.event-time': date.getDate() + ' ' + monthNames[date.getMonth()] + ' ' + date.getFullYear() + ' at ' + date.getUTCHours() + ':00',
                            '.event-book' : event.relater_book.title,
                            '.event-description': ad_arr.slice(0, 80).join(' '),
                            '.event-full-description': ad_arr.slice(80, ad_arr.length).join(' '),
                        });

                        $('.event-author').attr('href', '/author/?id=' + event.related_author.id)
                        $('.event-book').attr('href', '/book/?id=' + event.relater_book.id)
                        $('.event-image > .img').css("background-image", "url(" + author.image_url + ")");

                        loadingJob.completeTask();

                    })

                    // Inject related books carousel
                    loader.append('.related-container', '/components/carousel/container.html', 'related-carousel')
                        .then(() => {

                            api.get.book.search.author_id(event.related_author.id).then(books => {

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


                })
                .catch(e => {
                    modal.error(e)
                });



        } else {
            modal.show('Warning', 'Unknown event id')
        }
    })


});