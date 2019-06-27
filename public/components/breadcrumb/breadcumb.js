import * as loader from '/lib/js/utils/template_loader.js'

function insertPath(path, href = '/', index = 0) {
    console.log(href);
    if (index === path.length - 1)
        return;

    loader.append_map('.breadcrumb', '/components/breadcrumb/breadcrumb-element.html', undefined, o => {
        o.find('.bc-item').html(path[index]).attr('href', href)
    })
        .then(() => {
            let _href = href !== '/' ? href + '/' + path[index + 1] : href + path[index + 1];
            if (index + 1 === path.length - 2)
                _href += window.location.search;
            insertPath(path, _href, index + 1)
        })

}

export let load = (color_class = 'bg-pink', map_fn = (o => {})) => {
    let path = window.location.pathname;
    return loader.append_map('.breadcrumb-placeholder', '/components/breadcrumb/breadcrumb.html', path, function (o) {
        let path = window.location.pathname.split('/');
        path[0] = 'home';
        insertPath(path);
        o.addClass(color_class);
        map_fn(o)
    }, false, false)
};


$(() => {
    // Automatically inject breadcumb in pages. Classes are retrieved from placeholder
    load('bg-' + $('.breadcrumb-placeholder').attr('color'))
});