import * as api from '/lib/js/utils/api.js';
import * as modals from '/components/modal/modal.js'
import * as loader from '/lib/js/utils/template_loader.js'

$(() => {
    api.get.address()
        .then(addresses => {
            addresses.forEach(function (address) {
                loader.append_selectors(
                    '#address-container',
                    '/components/address/address.html',
                    address.id,
                    {
                        '.name' : address.name,
                        '.address_line_1' : address.address_line_1,
                        '.address_line_2' : address.address_line_2,
                        '.cap' : address.cap,
                        '.city' : address.city,
                        '.country' : address.country
                    }
                )
            })
        })
        .catch(error => {
            modals.error(error)
        })
});