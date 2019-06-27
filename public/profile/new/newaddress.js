import * as modal from '/components/modal/modal.js'
import * as api from '/lib/js/utils/api.js';
import * as sanitizer from '/lib/js/utils/sanitizer.js';

//Inject modal container
modal.inject(modal.type.alert, 'ui').then(modal => modal.on('hidden.bs.modal', function (e) {
    window.location.href = '/profile/';
}))

$("#new-address").submit(function (e) {
    e.preventDefault();

    sanitizer.locate(this);

    if (sanitizer.validate()) {
        sanitizer.merge('name', ['name', 'surname']);
        sanitizer.castIntegers(['cap']);
        sanitizer.sanitize();
        api.post.user.address(sanitizer.getContext())
            .then(result => modal.show('Cool!', 'We\'ve added the address!'))
            .catch(e => modal.error(e))
    }

});

