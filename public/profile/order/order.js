import * as loader from '/lib/js/utils/template_loader.js'
import * as api from '/lib/js/utils/api.js';

$(() => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    api.get.user.order()
        .then(orders => {
            console.log(orders);
            orders.forEach(order => {
                let id = 'order_' + order.orderid;
                loader.append_map('.order-container', '/components/order/order-element.html', id, (o) => {
                    let ts = new Date(order.timestamp);

                    o.find('.order-date').html(ts.getDay() + ' ' + monthNames[ts.getMonth()] + ' ' + ts.getFullYear());
                    o.find('.order-amount').html('Total € ' + order.amount.split('$')[1]);
                    order.Books.forEach((book, idx) => {
                        loader.append_map(o.find('.book-element-container'), '/components/order/order-book-element.html', id + '_' + book.book.id, elem => {
                            elem.find('.book-title').html(book.book.title);
                            elem.find('.book-author').html(book.book.author);
                            elem.find('.book-qty').html(book.qty);
                            elem.find('.book-price').html('€ ' + book.book.price);
                            elem.find('.buy-button').attr('href', '/book/?id=' + book.book.id);
                            elem.find('.book-image').attr('src', book.book.image_href)
                        });
                    })
                })
            })
        })
        .catch(error => {
            console.log(error.toString())
        })

});