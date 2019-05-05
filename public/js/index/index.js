import * as api from '/js/utils/api.js';

let config = {
    slide_n_books: 5
}

$(() => {

    // Templates
    let bookTemplate = $('.card.book.template');
    bookTemplate.remove();
    let item = $('.carousel.books .carousel-item').remove(bookTemplate).remove();
    let container = $('.carousel.books .carousel-inner');


    // Populate books
    api.get.books(0, 10 * config.slide_n_books).then(books => {
        console.log(books);
        let bin = [];
        let slideN = 0;
        books.forEach((book) => {
            if (bin.length < config.slide_n_books) {
                bin.push(book)
            }
            else {
                let newSlide = item.clone();
                if (slideN === 0) { newSlide.addClass('active') }
                bin.forEach(book => {
                    let newBook = bookTemplate.clone();

                    newBook.find('img').attr('src', book.image_href);
                    newBook.find('.card-title').html(book.title);
                    newBook.find('.card-text').html(book.author.name);

                    newSlide.children().first().append(newBook)
                });
                container.append(newSlide);
                slideN += 1;
                bin = []
            }
        })
    })
});