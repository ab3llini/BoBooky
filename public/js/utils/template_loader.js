export let append = (container, template, id, map) => {
    let $ctx = $('<div>');
    $ctx.load(template, () => {
        let $ans = $ctx.first();
        $ans.attr('id', id);
        for (let selector in map){
            if (map.hasOwnProperty(selector)) {
                let $o = $ans.find(selector);
                $o.html(map[selector])
            }
        }
        $(container).append($ans);
    });
};