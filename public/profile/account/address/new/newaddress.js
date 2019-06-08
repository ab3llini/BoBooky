import * as modal from '/components/modal/modal.js'
import * as api from '/lib/js/utils/api.js';
import * as sanitizer from '/lib/js/utils/sanitizer.js';

//Inject modal container
modal.inject(modal.type.alert, 'ui');

$("#new-address").submit(function (e) {
    e.preventDefault();

    sanitizer.locate(this);

    if (sanitizer.validate()) {
        sanitizer.merge('name', ['name', 'surname']);
        sanitizer.castIntegers(['cap']);
        sanitizer.sanitize();
        api.post.user.address(sanitizer.getContext())
            .then(result => modal.show('Result', JSON.stringify(result)))
            .catch(e => modal.error(e))
    }

});

