import * as loader from '/lib/js/utils/template_loader.js'
import * as api from '/lib/js/utils/api.js';
import * as modal from '/components/modal/modal.js'

$(()=> {
    let total_amount = 0.0;
    api.get.chart()
        .then(chart => {
            //todo: manage empty cart
            let books = chart.Books;
            books.forEach((b, idx) => {
                loader.append_map('.shopping-cart-container', '/components/cart/cart-element.html', b.book.id, (o) => {
                    let book = b.book;
                    let qty = b.qty;
                    o.find('.book-title').html(book.title);
                    o.find('.book-author').html(book.author);
                    o.find('.book-qty').html(qty);
                    o.find('.book-price').html('€ ' + (qty * book.price));
                    o.find('.book-image').attr('src', book.image_href);
                    o.find('.plus-button').click(function(){
                        let $item = $(this).parents('.shopping-item').first();
                        api.put.user.cart(book.id, qty + 1).then(function () {
                            qty += 1;
                            $item.find('.book-qty').html(qty);
                            total_amount += book.price;
                            $('.summary-subtotal').html('€ ' + total_amount.toFixed(2));
                            $('.summary-total').html('€ ' + total_amount.toFixed(2));
                        })
                    });
                    o.find('.minus-button').click(function(){
                        let $item = $(this).parents('.shopping-item').first();

                        if(qty > 1) {
                            api.put.user.cart(book.id, qty - 1).then(function () {
                                qty -= 1;
                                $item.find('.book-qty').html(qty);
                                total_amount -= book.price;
                                $('.summary-subtotal').html('€ ' + total_amount.toFixed(2));
                                $('.summary-total').html('€ ' + total_amount.toFixed(2));
                            })
                        }
                    });
                    o.find('.trash-button').click(function() {
                        let $item = $(this).parents('.shopping-item').first();
                        api.put.user.cart(book.id, 0).then(() => {
                            $item.slideUp(() => {
                                total_amount -= qty*book.price;
                                $('.summary-subtotal').html('€ ' + total_amount.toFixed(2));
                                $('.summary-total').html('€ ' + total_amount.toFixed(2));
                                $item.remove()
                            })
                        })
                    });
                    total_amount += qty * book.price;

                    if (idx === books.length - 1) {
                        $('.summary-subtotal').html('€ ' + total_amount.toFixed(2));
                        $('.summary-total').html('€ ' + total_amount.toFixed(2));
                        $('.summary-delivery').html('free')
                    }
                })
            });

            /*total_amount = books.map(b => b.qty * b.book.price).reduce((acc, price) => acc + price, 0)
            $('.summary-subtotal').html('€ ' + total_amount);
            $('.summary-total').html('€ ' + total_amount);
            $('.summary-delivery').html('free')*/

            $('.buy-button').click(function () {
                modal.inject(modal.type.alert, 'cart-modal').then(modal => {
                    api.get.chart()
                        .then(chart => {
                            let order = {};
                            order.books = chart.Books;
                            order.books.forEach(book => {
                                book.book.theme = {
                                    id: 0,
                                    name: 'Fuuuuuuuck'
                                }
                            });
                            order.amount = chart.Books.map(b => b.book.price * b.qty)
                                .reduce((prev, curr) => prev + curr);

                            api.post.user.order(order)
                                .then(() => {
                                    console.log('Order Created!');
                                    api.del.user.cart()
                                        .then(() => {
                                            window.location.replace('/profile/order')
                                        })
                                        .catch((error) => modal.error(error))
                                })
                        })
                        .catch(error => {
                            console.log(error)
                        })
                })
            })
        })

});