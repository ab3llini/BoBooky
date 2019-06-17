import * as loader from '/lib/js/utils/template_loader.js'
import * as api from '/lib/js/utils/api.js';
import * as modal from '/components/modal/modal.js'

$(()=> {
    loader.append_map('.event-per-day-container', '/components/search/event/event-search.html', 0, (o) => {
        console.log('Loaded')
    })
});