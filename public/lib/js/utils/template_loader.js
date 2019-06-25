export let append_selectors = (container, template, id = undefined, selectors) => {
    return new Promise(resolve => {
        let $ctx = $('<div>');
        $ctx.load(template, () => {
            let $ans = $ctx.children().first();
            if (id !== undefined)
                $ans.attr('id', id);
            for (let selector in selectors) {
                if (selectors.hasOwnProperty(selector)) {
                    let $o = $ans.find(selector);
                    $o.html(selectors[selector])
                }
            }
            $(container).append($ans
                .hide()
                .fadeIn(500)
            );
            resolve($ans);
        });
    })
};

export let append_map = (container, template, id, map_fn, prepend = false, animation = true) => {
    return new Promise(resolve => {

        let $ctx = $('<div>');
        $ctx.load(template, () => {
            let $ans = $ctx.children().first();
            if (id !== undefined)
                $ans.attr('id', id);
            map_fn($ans);
            if (prepend) {
                if (animation)
                    $(container).prepend($ans
                        .fadeIn(500)
                    );
                else
                    $(container).prepend($ans);

            } else {
                if (animation)
                $(container).append($ans
                    .hide()
                    .fadeIn(500)
                );
                else
                    $(container).append($ans);
            }
            resolve($ans);
        });
    })
};

function insertPath(path, href = '/', index = 0) {
    if (index === path.length - 1)
        return;

    append_map('.breadcrumb', '/components/breadcrumb/breadcrumb-element.html', undefined, o => {
        console.log(href);
        o.find('.bc-item').html(path[index]).attr('href', href)
    })
        .then(() => insertPath(path,
            href !== '/' ? href + '/' + path[index + 1] : href + path[index + 1],
            index + 1))

}

export let load_breadcrumb = (classes = [], map_fn = o => {
}) => {
    console.log(window.location.pathname);
    let path = window.location.pathname;
    return append_map('.breadcrumb-placeholder', '/components/breadcrumb/breadcrumb.html', path, function (o) {
        let path = window.location.pathname.split('/');
        path[0] = 'Home';

        insertPath(path);

        for (let i = 0; i < classes.length; i++)
            o.addClass(classes[i]);

        map_fn(o)
    }, false, false)
};

export let append = (container, template, id, processing = undefined) => {
    return new Promise(resolve => {
        let $ctx = $('<div>');
        $ctx.load(template, () => {
            let $ans = $ctx.children().first();
            $ans.attr('id', id);
            if (processing !== undefined) {
                processing($ans);
            }
            $(container).append($ans
                .hide()
                .fadeIn(500)
            );
            resolve($ans);
        });
    })
};