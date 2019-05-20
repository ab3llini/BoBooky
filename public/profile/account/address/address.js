import * as api from '/js/utils/api.js';
import * as modals from '/public/components/modal/modal.js'

$(() => {
    api.get.address()
        .then(result => {
            console.log(result)
        })
        .catch(error => {
            modals.error(error)
        })
});