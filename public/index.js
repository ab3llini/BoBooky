import * as api from '/lib/js/utils/api.js';
import * as loader from '/lib/js/utils/template_loader.js'

$(() => {
    $('#search-form .fa-search').click(function () {
        $('#search-form').submit()
    })
});