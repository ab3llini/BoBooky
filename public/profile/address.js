import * as api from '/lib/js/utils/api.js';
import * as modals from '/components/modal/modal.js'
import * as loader from '/lib/js/utils/template_loader.js'
import * as session from '/lib/js/utils/session.js'

$(() => {

    $('.name-placeholder').html(session.get().user.name + ' ' + session.get().user.surname);
    $('.email-placeholder').html(session.get().user.email);

    let date = new Date(session.get().user.birthdate);

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    $('.birthday-placeholder').html(date.getDate() + ' ' + monthNames[date.getMonth()] + ' ' + date.getFullYear());

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
                ).then(o => {
                    o.find('.delete').click(function () {
                        api.del.user.address(address.id).then(res => {
                            o.slideUp()
                        }).catch(e => modals.error(e))
                    })
                    o.find('.edit').click(function () {
                        window.location.href = 'edit/?id=' + address.id
                    })
                })
            })
        })
        .catch(error => {
            modals.error(error)
        })
});