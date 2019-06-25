import * as loader from '/lib/js/utils/template_loader.js'
import * as api from '/lib/js/utils/api.js';

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

function process_events(events, index=0, last_day=undefined) {
    if(index === events.length)
        return;
    let event = events[index];
    console.log(event);
    let date = new Date(event.timestamp);
    loader.append_map('.event-per-day-container', '/components/search/event/event-search.html', event.id, (o) => {

        o.find(".event-title").html(event.name.toUpperCase());
        o.find(".event-author").html(event.related_author.name);
        o.find(".event-book").html(event.relater_book.title);
        o.find(".event-location").html(event.location.city + ' ' + event.location.name);
        o.find(".event-time").html(date.getUTCHours() + ':' + date.getMinutes() + '0');
        o.find(".day").html(date.getDate());
        o.find(".month").html(monthNames[date.getMonth()]);
        if(last_day === date.getDate()) {
            let $o = o.find(".event-date")
            $o.parent().removeClass('d-block').addClass('d-none')
            $o.remove()
        }
    })
        .then(() => {
            process_events(events, index + 1, date.getDate())
        })
}

$(()=> {
    let args = new URLSearchParams(window.location.search);
    let date = "";
    let query = "";

    if(args.has('date'))
        date = args.get('date');
    if(args.has('q'))
        query = args.get('q');

    console.log(date);
    console.log(query);

    $(".search-button").click(e => {
        $(".search-form").submit()
    });



    if (date !== "" || query !== "")
        api.get.event.search(date, query)
            .then(results => {
                process_events(results)
            })
            .catch(error => {
                console.log(error.toString())
            });
    else
        api.get.event.all()
            .then(results => {
                process_events(results)
            })
            .catch(error => {
                console.log(error.toString())
            });
});