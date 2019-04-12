import xml.etree.ElementTree as ET
import numpy as np
from tqdm import tqdm
import os
import pandas as pd

BOOKS_FOR_AUTHOR = 7
TAGS_FOR_BOOK = 4


class XMLParser:
    def __init__(self, path: str = None):
        self.__path = path or os.environ['XML_PATH']
        self.image = {}
        self.author = {}
        self.book = {}
        self.publisher = {}
        self.related_books = {}
        self.genre = {}
        self.book_to_genre = {}

        self.__image_idx = 0
        self.__author_idx = 0
        self.__book_idx = 0
        self.__publisher_idx = 0
        self.__genre_idx = 0
        self.__books_idx = {}

    def parse_all(self):
        for file_name in tqdm(os.listdir(self.__path), desc='Parsing files...', unit='file'):
            self.parse_book(xml_name=file_name)

        print('Pre processing data...')
        self.__pre_process_data()
        print(f'Images -> {len(self.image)}')
        print(f'Authors -> {len(self.author)}')
        print(f'books -> {len(self.book)}')
        print(f'Publishers -> {len(self.publisher)}')
        print(f'Related books -> {len(self.related_books)}')
        print(f'Genres -> {len(self.genre)}')
        print(self.related_books)

    def parse_book(self, xml_name: str):

        tree = ET.parse(os.path.join(self.__path, xml_name))
        book = tree.find('book')
        author = book.find('authors/author')

        # Book
        author_img = self.__add_image(author.find('image_url').text, author.find('small_image_url').text)
        author_idx = self.__add_author(author.find('name').text, author_img)
        publisher_idx = self.__add_publisher(book.find('publisher').text)
        book_img_idx = self.__add_image(book.find('image_url').text, book.find('small_image_url').text)
        price = np.random.rand() * 90 + 10
        price = format(price, '.2f')

        genres = set()
        for shelf in book.findall('.//shelf')[0:TAGS_FOR_BOOK]:
            genres.add(self.__add_genre(shelf.attrib['name']))

        self.book_to_genre[self.__book_idx] = list(genres)

        self.__add_book(book.find('title').text,
                        author_idx,
                        book.find('description').text,
                        publisher_idx,
                        price,
                        book.find('isbn').text,
                        book.find('isbn13').text,
                        book.find('publication_year').text,
                        book.find('publication_month').text,
                        book_img_idx, book.find('id').text)

        # Similar books
        similar_books = book.find('similar_books')
        ids = []
        if similar_books is not None:
            for book_id in similar_books.findall('book'):
                ids.append(book_id.find('id').text)
        self.__add_related_books(ids)

    def get_associations_set(self) -> set:
        ans = set()
        for _book in self.related_books.keys():
            related = [rel for rel in self.related_books[_book][0:10]]
            for _related in related:
                ans.add(tuple(sorted((_book, _related))))

        return ans

    def create_csv(self, out_dir: str = None):
        path = out_dir or os.environ['CSV_PATH']
        if not os.path.exists(path):
            os.makedirs(path)

        print('Writing images...')
        samples = []
        for key in self.image.keys():
            samples.append([key, *self.image[key]])
        df = pd.DataFrame(samples)
        print(df.describe())
        df.to_csv(os.path.join(path, 'image.csv'), header=False, index=False)

        print('Writing authors...')
        samples = []
        for key in self.author.keys():
            samples.append([key, *self.author[key]])
        df = pd.DataFrame(samples)
        print(df.describe())
        df.to_csv(os.path.join(path, 'author.csv'), header=False, index=False)

        print('Writing publishers...')
        samples = []
        for key in self.publisher.keys():
            samples.append([key, *self.publisher[key]])
        df = pd.DataFrame(samples)
        print(df.describe())
        df.to_csv(os.path.join(path, 'publisher.csv'), header=False, index=False)

        print('Writing books...')
        samples = []
        for key in self.book.keys():
            samples.append([key, *self.book[key]])
        df = pd.DataFrame(samples)
        print(df.describe(include='all'))
        df.to_csv(os.path.join(path, 'book.csv'), header=False, index=False)

        print('Writing associations...')
        samples = list(self.get_associations_set())
        df = pd.DataFrame(samples)
        print(df.describe())
        df.to_csv(os.path.join(path, 'book_to_book_suggestion.csv'), header=False, index=False)

        print('Writing genres...')
        samples = []
        for key in self.genre.keys():
            samples.append([key, *self.genre[key]])
        df = pd.DataFrame(samples)
        print(df.describe())
        df.to_csv(os.path.join(path, 'genres.csv'), header=False, index=False)

        print('Writing book_to_genres...')
        samples = set()
        for book in self.book_to_genre.keys():
            for _genre in self.book_to_genre[book]:
                samples.add((book, _genre))
        df = pd.DataFrame(samples)
        print(df.describe())
        df.to_csv(os.path.join(path, 'books_to_genres.csv'), header=False, index=False)

    def __pre_process_data(self):
        """
        Removes all the authors with:
         - no image

        Removes all books with the following properties:
         - no description
         - no publication year
         - no author
         - no image
         - no publisher
         - no isbn
        """

        def author_filter(author):
            count = 0
            for _book in self.book.values():
                if _book[1] == author[0]:
                    count += 1
            return count >= BOOKS_FOR_AUTHOR

        prev_book_count = 0
        self.__fix_related_books()
        self.__apply_filters()
        books_count = len(self.book)
        while prev_book_count != books_count:
            prev_book_count = books_count
            self.author = dict(filter(author_filter, self.author.items()))
            self.__apply_filters()
            books_count = len(self.book)

    def __apply_filters(self):
        def book_filter(book_list):
            condition = True
            # author
            condition = condition and book_list[1][1] in self.author.keys()
            # description
            condition = condition and book_list[1][2] is not None
            # publisher
            condition = condition and book_list[1][3] in self.publisher.keys()
            # isbn
            condition = condition and book_list[1][5] is not None
            # year
            condition = condition and book_list[1][7] is not None
            # image
            condition = condition and self.image[book_list[1][9]][0] is not None
            # genre
            condition = condition and len(self.book_to_genre[book_list[0]]) > 0
            return condition

        self.author = dict(filter(lambda author: self.image[author[1][2]][0] is not None, self.author.items()))
        self.book = dict(filter(book_filter, self.book.items()))

        self.book = dict(filter(lambda _book: len(self.related_books[_book[0]]) > 0, self.book.items()))
        self.publisher = dict(filter(lambda pub: pub[1][0] is not None, self.publisher.items()))
        self.image = dict(filter(lambda img: img[1][0] is not None, self.image.items()))

        authors_from_books = [x[1] for x in self.book.values()]
        self.author = dict(filter(lambda author: author[0] in authors_from_books, self.author.items()))
        publishers_from_books = [x[3] for x in self.book.values()]
        self.publisher = dict(filter(lambda pub: pub[0] in publishers_from_books, self.publisher.items()))
        self.related_books = dict(filter(lambda rel_books: len(rel_books[1]) > 0, self.related_books.items()))
        self.related_books = dict(
            filter(lambda rel_books: rel_books[0] in self.book.keys(), self.related_books.items()))
        images_from_books = [x[9] for x in self.book.values()]
        images_from_authors = [x[2] for x in self.author.values()]
        images_from_db = [*images_from_books, *images_from_authors]
        self.image = dict(filter(lambda img: img[0] in images_from_db, self.image.items()))

        self.book_to_genre = dict(filter(lambda genre: genre[0] in self.book, self.book_to_genre.items()))
        genres_from_book = []
        for gen_list in self.book_to_genre.values():
            genres_from_book = [*genres_from_book, *gen_list]
        self.genre = dict(filter(lambda genre: genre[0] in genres_from_book, self.genre.items()))

    def __fix_related_books(self):
        for our_id in tqdm(self.related_books.keys(), desc='adjusting related books... ', unit='book'):
            xml_ids = self.related_books[our_id]
            self.related_books[our_id] = [self.__books_idx[x] for x in xml_ids if x in self.__books_idx.keys()]

    def __add_image(self, href: str, href_small: str) -> int:
        real_href = ''.join(href.split('\n'))
        real_href_small = ''.join(href_small.split('\n'))
        if 'nophoto' in real_href:
            real_href = None
        if 'nophoto' in real_href_small:
            real_href_small = None

        for key, value in self.image.items():
            if value[0] == real_href:
                return key
        self.image[self.__image_idx] = [real_href, real_href_small]
        self.__image_idx += 1
        return self.__image_idx - 1

    def __add_author(self, name, image_id, description=None) -> int:
        for key, value in self.author.items():
            if value[0] == name:
                return key
        self.author[self.__author_idx] = [name, description, image_id]
        self.__author_idx += 1
        return self.__author_idx - 1

    def __add_publisher(self, name) -> int:
        for key, value in self.publisher.items():
            if value[0] == name:
                return key
        self.publisher[self.__publisher_idx] = [name]
        self.__publisher_idx += 1
        return self.__publisher_idx - 1

    def __add_genre(self, name, description=None) -> int:
        for key, value in self.genre.items():
            if value[0] == name:
                return key
        self.genre[self.__genre_idx] = [name, description]
        self.__genre_idx += 1
        return self.__genre_idx - 1

    def __add_book(self, title, author_id, description, publisher_id, price, isbn, isbn_13, publication_year,
                   publication_month, image_id, xml_id) -> int:
        self.book[self.__book_idx] = [title, author_id, description, publisher_id, price, isbn, isbn_13,
                                      publication_year, publication_month, image_id]
        self.__books_idx[xml_id] = self.__book_idx
        self.__book_idx += 1
        return self.__book_idx - 1

    def __add_related_books(self, ids):
        self.related_books[self.__book_idx - 1] = ids


if __name__ == '__main__':
    parser = XMLParser()
    parser.parse_all()
    # parser.parse_book('../sample_book.xml')
    # print(parser.book_to_genre)
    parser.create_csv()
