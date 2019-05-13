import * as api from '/js/utils/api.js';
import '/js/utils/jquery.cookie.js';


$(() => {
    let isLoggedIn = () => {
        return $.cookie('session') !== undefined
    }

})