import * as api from '/js/utils/api.js';
import '/js/utils/jquery.cookie.js';

export let isLoggedIn = () => {
    return $.cookie('session') !== undefined
}

export let logIn = (username) => {

    let val = {
        username : username
    };
    $.cookie('session', JSON.stringify(val));
};

export let getSession = () => {
    if (isLoggedIn()) {
        return JSON.parse($.cookie('session'));
    }
    else {
        return null
    }
};