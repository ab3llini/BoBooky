import * as loader from '/lib/js/utils/template_loader.js'

export function load_cart() {
    for (let i = 0; i < 10; i++) {
        loader.append_map('.cart > .objects', '/components/cart/element.html', i, (o) => {
        })
    }
}