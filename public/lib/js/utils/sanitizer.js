let context = undefined;
let form = undefined;

export let locate = (o) => {
    let inputs = $(o).find('input');
    form = $(o);
    context = {};
    inputs.each(function () {
        if ($(this).attr('name'))
            context[this.name] = this.value;
    });
};

export let validate = () => {
    if (form[0].checkValidity() === false) {
        form[0].classList.add('was-validated');
        return false
    }
    return true;
};

export let getContext = () => {
    return context
};

export let merge = function (target, keys) {

    if (context === undefined)
        return;
    let map = [];
    keys.forEach(function (k) {
        map.push(context[k]);
        delete context[k];
    });
    context[target] = map.join(' ')
};

export let castIntegers = (keys) => {
    if (context === undefined)
        return;
    keys.forEach(function (k) {
        let ans = parseInt(context[k], 10);
        context[k] = Number.isNaN(ans) ? context[k] : ans;
    });
};

export let sanitize = () => {
    for (let key in context) {
        if (context.hasOwnProperty(key)) {
            if (context[key] === '')
                delete context[key];
            else {
                // Silly XSS Sanitizer. LoL this sucks, but we have no time to work on serious server-side security
                if (typeof context[key] === 'string')
                    context[key] = (context[key]).replace(/<(|\/|[^>\/bi]|\/[^>bi]|[^\/>][^>]+|\/[^>][^>]+)>/g, '')
            }
        }
    }
};


