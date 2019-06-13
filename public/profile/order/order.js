import * as loader from '/lib/js/utils/template_loader.js'
import * as api from '/lib/js/utils/api.js';

$(() => {
    let id = 'funny_id_0';
    loader.append_map('.order-container', '/components/order/order-element.html', id, (o) => {
        loader.append_map('#funny_id_0 .book-element-container', '/components/order/order-book-element.html', 0, o => {
            o.addClass('border-top')
        });
        loader.append_map('#funny_id_0 .book-element-container', '/components/order/order-book-element.html', 1, o => {
        })
    })
})