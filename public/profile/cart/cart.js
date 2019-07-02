import * as loader from '/lib/js/utils/template_loader.js'
import * as api from '/lib/js/utils/api.js';
import * as modal from '/components/modal/modal.js'


let total_amount = 0.0;

function process_cart(cart, idx = 0) {
    if (idx >= cart.Books.length) {
        $('.summary-subtotal').html('€ ' + total_amount.toFixed(2));
        $('.summary-total').html('€ ' + total_amount.toFixed(2));
        $('.summary-delivery').html('free');
        return
    }

    let b = cart.Books[idx];
    loader.append_map('.shopping-cart-container', '/components/cart/cart-element.html', b.book.id, (o) => {
        let book = b.book;
        let qty = b.qty;
        o.find('.book-title').html(book.title);
        o.find('.book-author').html(book.author);
        o.find('.book-qty').html(qty);
        o.find('.book-price').html('€ ' + (qty * book.price).toFixed(2));
        o.find('.book-image').attr('src', book.image_href);
        o.find('.plus-button').click(function () {
            let $item = $(this).parents('.shopping-item').first();
            api.put.user.cart(book.id, qty + 1).then(function () {
                qty += 1;
                $item.find('.book-qty').html(qty);
                o.find('.minus-button').prop('disabled', qty === 1);
                total_amount += book.price;
                $('.summary-subtotal').html('€ ' + total_amount.toFixed(2));
                $('.summary-total').html('€ ' + total_amount.toFixed(2));
            })
        });
        o.find('.minus-button').click(function () {
            let $item = $(this).parents('.shopping-item').first();

            if (qty > 1) {
                api.put.user.cart(book.id, qty - 1).then(function () {
                    qty -= 1;
                    $item.find('.book-qty').html(qty);
                    o.find('.minus-button').prop('disabled', qty === 1);
                    total_amount -= book.price;
                    $('.summary-subtotal').html('€ ' + total_amount.toFixed(2));
                    $('.summary-total').html('€ ' + total_amount.toFixed(2));
                })
            }
        }).prop('disabled', qty === 1);
        o.find('.trash-button').click(function () {
            let $item = $(this).parents('.shopping-item').first();
            api.put.user.cart(book.id, 0).then(() => {
                $item.slideUp(() => {
                    total_amount -= qty * book.price;
                    $('.summary-subtotal').html('€ ' + total_amount.toFixed(2));
                    $('.summary-total').html('€ ' + total_amount.toFixed(2));
                    $item.remove()
                })
            })
        });
        total_amount += qty * book.price;

        if (idx === cart.Books.length - 1) {
            $('.summary-subtotal').html('€ ' + total_amount.toFixed(2));
            $('.summary-total').html('€ ' + total_amount.toFixed(2));
            $('.summary-delivery').html('free')
        }
    }).then(() => process_cart(cart, idx + 1))
}

$(() => {
    let addresses_map = {};

    // Filling up the modal
    api.get.address()
        .then(addresses => {
            if(addresses.length === 0) {
                let modal = $('#address-modal');
                modal.find('#exampleModalLabel').html('No shipping address found');
                modal.find('#modal-addresses-list').html('Please insert at least one address')
                modal.find('#continue-modal-button').html('Go').click(() => {
                    window.location.replace('/profile')
                })

            } else {
                addresses.forEach((addr, idx) => {
                    addresses_map[addr.id] = addr;
                    loader.append_map('#modal-addresses-list', '/components/cart/address-radio.html', 'address_' + addr.id, (o) => {
                        o.find('input').attr('id', addr.id);
                        o.find('.label-text').html(addr.name + ' (' + addr.city + ', ' + addr.country + ')')
                    });
                });

                $('#continue-modal-button').click(() => {
                    // Getting selected ID
                    let address_id = $("input[name='address']:checked");

                    $('#address-modal').modal('hide');

                    // Sending order request
                    api.get.chart()
                        .then(chart => {
                            let order = {};
                            order.address = addresses_map[address_id.attr('id')];
                            order.books = chart.Books;
                            order.books.forEach(book => {
                                book.book.theme = {
                                    id: 0,
                                    name: '0xdeadbeef'
                                }
                            });
                            order.amount = chart.Books.map(b => b.book.price * b.qty)
                                .reduce((prev, curr) => prev + curr);

                            api.post.user.order(order)
                                .then(() => {
                                    api.del.user.cart()
                                        .then(() => {
                                            modal.show('Thanks!', 'We have received your order!').then(() => {
                                                window.location.replace('/profile/order')
                                            });
                                        })

                                        .catch((error) => modal.error(error))
                                })
                        })
                        .catch(error => {
                            console.log(error)
                        })
                })
            }
        });
});


api.get.chart()
    .then(cart => {
        if (jQuery.isEmptyObject(cart)) {
            $('.empty-cart').removeClass('d-none')
        } else {
            process_cart(cart);
        }

        $('.buy-button').prop('disabled', jQuery.isEmptyObject(cart)).click(function () {
            $('#address-modal').modal('show');
        })
    })