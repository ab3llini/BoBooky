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
    let loadingJob = worker.newJob(3, loading.hide);


    // Then Inject modal to handle messages, then perform all the rest..
    modal.inject(modal.type.alert, 'search').then(modal_obj => {

        // GET Args
        let args = new URLSearchParams(window.location.search);

        //If id exists
        if (args.has('q')) {

            let query = args.get('q');

            // Utilities
            let get_filter = (key, _default = undefined) => args.has(key) ? args.get(key) : (_default !== undefined ? _default : 'default');
            let create_options = (filter, options) => options.forEach(option => $(filter).append(new Option(option, option)));

            let filters = {
                genre: get_filter('genre'),
                theme: get_filter('theme'),
                page : parseInt(get_filter('page', 0))
            };


            let filterJob = worker.newJob(2, () => {
                // Set values to search and genre/theme filters
                $('.search-bar').val(query);
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

            let query_args = {
                query: query,
                genre: filters.genre,
                theme: filters.theme,
                offset : filters.page,
                extra: 'author-bypass'
            };

            if (query_args.genre === 'default')
                delete query_args.genre;
            if (query_args.theme === 'default')
                delete query_args.theme;
            if (query_args.page === 0)
                delete query_args.page;

            // Fetch all books that match the query
            api.get.book.search.mixed(query_args).then(authors => {

                if (authors.length < 20) {
                    next_btn.hide();
                }
                if (filters.page === 0) {
                    prev_btn.hide();
                }

                if (authors.length > 0) {
                    authors.forEach(author => {
                        loader.append_map('.author-container', '/components/search/author/author.html', author.id, function (book_obj) {
                            book_obj.find('.author-href').attr('href', '/author/?id=' + author.id);
                            book_obj.find('.image').css("background-image", "url(" + author.href + ")");
                            book_obj.find('.title').html(author.name);
                        })
                            .then(() => {
                                if (author === $(Object.values(authors)).get(-1)) {
                                    loadingJob.completeTask()
                                }
                            })
                            .catch(e => {
                                modal.error(e)
                            });
                    })
                } else {
                    loadingJob.completeTask();
                    $('.author-container').parent().html("No authors found..")
                }
            }).catch(
                e => {
                    loadingJob.completeTask();
                    modal.error(e)
                });

        } else {
            loading.hide();
            modal.show('Warning', 'No query was provided!')
        }
    })
});