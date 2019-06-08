import * as api from '/lib/js/utils/api.js';
import '/lib/js/utils/jquery.cookie.js';

export let isLoggedIn = () => {
    return $.cookie('session') !== undefined
};

export let login = (username, password) => {

    return new Promise((resolve, reject) => {
        api.post.login(username, password)
            .then(result => {
                $.cookie('session', JSON.stringify(result), { path: '/' });
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
    return new Promise((resolve, reject) => {


        console.log($.removeCookie('session',{ path: '/' }))

        api.post.logout()
            .then(result => {
                resolve(result)
            })
            .catch(e => {
                reject(e)
            })
    })

};

export let get = () => {
    if (isLoggedIn()) {
        return JSON.parse($.cookie('session'))
    }
    else {
        return null
    }
};