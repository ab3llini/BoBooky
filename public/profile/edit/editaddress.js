import * as api from '/lib/js/utils/api.js';
import * as sanitizer from '/lib/js/utils/sanitizer.js';
import * as modal from "/components/modal/modal.js";

//Inject modal container
modal.inject(modal.type.alert, 'editaddr').then(modal => modal.on('hidden.bs.modal', function (e) {
    window.location.href = '/profile/';
}));

$(() => {

    let id = parseInt(new URLSearchParams(window.location.search).get('id'));

    // Get address to edit
    let address = undefined;
    api.get.address().then(res => {
        res.forEach(r => {
            if (r.id === id)
                address = r;
        });

        $('#inputName').val(address.name.split(' ')[0])
        $('#inputSurname').val(address.name.split(' ')[1])
        $('#inputPostalCode').val(address.cap)
        $('#inputCity').val(address.city)
        $('#inputCountry').val(address.country)
        $('#addressLine1').val(address.address_line_1)
        $('#addressLine2').val(address.address_line_2)

        $('.delete').click(function () {
            api.del.user.address(address.id).then(res => {
                window.location.href = '/profile'
            }).catch(e => modal.error(e))
        })

    })


    $("#new-address").submit(function (e) {
        e.preventDefault();

        sanitizer.locate(this);

        if (sanitizer.validate()) {
            sanitizer.merge('name', ['name', 'surname']);
            sanitizer.castIntegers(['cap']);
            sanitizer.sanitize();
            api.put.user.address(id, sanitizer.getContext())
                .then(result => modal.show('Done!', 'We\'ve updated your address!'))
                .catch(e => modal.error(e))
        }

    });

});

