import * as loader from '/lib/js/utils/template_loader.js'
import * as api from '/lib/js/utils/api.js';


const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

function processOrders(orders, idx=0) {
    if(idx === orders.length - 1)
        return;

    let order = orders[idx];
    let id = 'order_' + order.orderid;
    loader.append_map('.order-container', '/components/order/order-element.html', id, (o) => {
        let ts = new Date(order.timestamp);

        o.find('.order-date').html(ts.getDate() + ' ' + monthNames[ts.getMonth()] + ' ' + ts.getFullYear());
        o.find('.order-amount').html('€ ' + order.amount.split('$')[1]);
        o.find('.address-name').html(order.address.name + ' (' + order.address.city + ', ' + order.address.country + ')');
        order.Books.forEach((book, idx) => {
            loader.append_map(o.find('.book-element-container'), '/components/order/order-book-element.html', id + '_' + book.book.id, elem => {
                elem.find('.book-title').html(book.book.title);
                elem.find('.book-author').html(book.book.author);
                elem.find('.book-qty').html(book.qty);
                elem.find('.book-price').html('€ ' + book.book.price);
                elem.find('.buy-button').click(() => {
                    window.location.href = '/book/?id=' + book.book.id
                });
                elem.find('.book-image').attr('src', book.book.image_href)
            });
        })
    }).then(() => {
        processOrders(orders, idx + 1)
    })
}

$(() => {
    api.get.user.order()
        .then(orders => {
            processOrders(orders)
        })
        .catch(error => {
            console.log(error.toString())
        });
});