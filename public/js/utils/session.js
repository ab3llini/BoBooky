import * as api from '/js/utils/api.js';
import '/js/utils/jquery.cookie.js';

export let isLoggedIn = () => {
    return $.cookie('session') !== undefined
}

export let login = (username, password) => {

    return new Promise((resolve, reject) => {
        api.post.login(username, password)
            .then(result => {
                $.cookie('session', JSON.stringify(result));
                console.log('Authorized' + JSON.stringify(result))
                resolve(result)
            })
            .catch(e => {
                console.log('Unauthorized');
                reject(e)
            })
    })

};

export let logout = () => {
    if (isLoggedIn()) {
        $.removeCookie('session');
    }
};

export let get = () => {
    if (isLoggedIn()) {
        return JSON.parse($.cookie('session'))
    }
    else {
        return null
    }
};