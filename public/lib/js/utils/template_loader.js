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