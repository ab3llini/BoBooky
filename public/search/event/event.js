import * as loader from '/lib/js/utils/template_loader.js'
import * as api from '/lib/js/utils/api.js';
import * as modal from '/components/modal/modal.js'

function process_events(events) {
    console.log(events)
}

$(()=> {
    let args = new URLSearchParams(window.location.search);
    let date = args.get('date');
    let query = args.get('query');

    if (date !== undefined || query !== undefined)
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

    loader.append_map('.event-per-day-container', '/components/search/event/event-search.html', 0, (o) => {
        console.log('Loaded')
    })
});