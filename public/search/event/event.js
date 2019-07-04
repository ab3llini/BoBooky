import * as loader from '/lib/js/utils/template_loader.js'
import * as api from '/lib/js/utils/api.js';
import * as modal from "../../components/modal/modal.js";

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

function process_events(events, index = 0, last_day = undefined) {
    if (index === events.length)
        return;
    let event = events[index];
    let date = new Date(event.timestamp);
    loader.append_map('.event-per-day-container', '/components/search/event/event-search.html', event.id, (o) => {

        o.find(".event-title").html(event.name);
        o.find(".event-author").html(event.related_author.name);
        o.find(".event-book").html(event.relater_book.title);
        o.find(".event-location").html(event.location.city + ' ' + event.location.name);
        o.find(".event-time").html(date.getUTCHours() + ':' + date.getMinutes() + '0');
        o.find(".day").html(date.getDate());
        o.find(".more").attr('href', '/event/?id=' + event.id)
        o.find(".month").html(monthNames[date.getMonth()]);
        if (last_day === date.getDate()) {
            let $o = o.find(".event-date");
            $o.parent().removeClass('d-block').addClass('d-none');
            $o.remove()
        }
    })
        .then(() => {
            process_events(events, index + 1, date.getDate())
        })
}

$(() => {

    $('.filter.date').datepicker({
        'format': 'yyyy-mm-dd',
        'autoclose': true
    });

    $('.filter.date').change(function () {
        $(this).parents('form').first().submit()
    })

    // Then Inject modal to handle messages, then perform all the rest..
    modal.inject(modal.type.alert, 'search').then(modal_obj => {

        $('.search-bar').focus(function () {
            $(this).parents('.search-bar-wrapper').addClass('focused')
        })
        $('.search-bar').focusout(function () {
            $(this).parents('.search-bar-wrapper').removeClass('focused')
        })


        let args = new URLSearchParams(window.location.search);

        let get_filter = (key, _default = undefined) => args.has(key) ? args.get(key) : (_default !== undefined ? _default : 'default');

        let filters = {
            date: get_filter('date', ''),
            query: get_filter('q'),
            page: parseInt(get_filter('page', 0))
        };

        $('.filter.query').val(filters.query);
        $('.filter.date').val(filters.date);

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

        let query_args = {
            query_string: filters.query,
            date_from: filters.date,
            offset: filters.page
        };

        if (query_args.query_string === 'default')
            delete query_args.query_string;
        if (query_args.date_from === 'default' || query_args.date_from === '')
            delete query_args.date_from;
        if (query_args.offset === 0)
            delete query_args.offset;

        api.get.event.search(query_args)
            .then(results => {

                // do not remove check of undefined!!!!!
                // if so, return empty array instead
                if (results !== undefined) {
                    if (results.length < 20) {
                        next_btn.hide();
                    }
                    if (filters.page === 0) {
                        prev_btn.hide();
                    }
                    if (results.length > 0)
                        process_events(results)
                } else {
                    prev_btn.hide();
                    next_btn.hide();
                    $('.container.events').html('No events found')

                }
            })
            .catch(error => {
                modal.error(error)
            });

    });

});