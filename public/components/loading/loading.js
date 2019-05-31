
let $object = undefined;

/* Option to set an already-injected loader into the page */
export let set = (o) => {
    $object = $(o);
}

export let show = (loader) => {
    return new Promise(resolve => {
        if ($object === undefined) {
            loader.append('body', '/components/loading/loading.html', 'loading-overlay').then((o) => {
                $object = o;
                resolve($object)
            })
        }
    })
}
export let hide = () => {
    if ($object !== undefined) {
        $object.remove();
        $object = undefined;
    }
}