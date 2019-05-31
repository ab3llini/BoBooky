import * as loader from '/lib/js/utils/template_loader.js'
import * as api from '/lib/js/utils/api.js';

$(()=> {
    api.get.chart()
        .then(chart => {
            let books = chart.Books;
            let total_amount = 0.0;
            books.forEach((b, idx) => {
                loader.append_map('.shopping-cart-container', '/components/cart/cart-element.html', b.book.id, (o) => {
                    let book = b.book;
                    let qty = b.qty;
                    o.find('.book-title').html(book.title);
                    o.find('.book-author').html(book.author);
                    o.find('.book-qty').html(qty);
                    o.find('.book-price').html('€ ' + (qty * book.price));
                    o.find('.book-image').attr('src', book.image_href);
                    total_amount += qty * book.price;

                    if (idx === books.length - 1) {
                        $('.summary-subtotal').html('€ ' + total_amount);
                        $('.summary-total').html('€ ' + total_amount);
                        $('.summary-delivery').html('free')
                    }
                })
            });

            /*total_amount = books.map(b => b.qty * b.book.price).reduce((acc, price) => acc + price, 0)
            $('.summary-subtotal').html('€ ' + total_amount);
            $('.summary-total').html('€ ' + total_amount);
            $('.summary-delivery').html('free')*/
        })
})