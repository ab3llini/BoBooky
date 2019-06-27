import psycopg2
import requests
from tqdm import tqdm
import random
import pandas as pd
import numpy.random as rnd
from gpt2.interactive_conditional_samples import interact_model


def check_unavailable(connection) -> list:
    cursor = connection.cursor()
    cursor.execute('select * from image')
    rows = cursor.fetchall()
    unavailable = []
    for r in tqdm(rows, desc='checking available...'):
        req1 = requests.get(r[1])
        req2 = requests.get(r[2])
        if req1.status_code != 200 or req2.status_code != 200:
            unavailable.append(r[0])

    print(f'found {len(unavailable)} unavailable resources')

    with open('./unavailable.txt', 'w') as file:
        for elem in unavailable:
            file.write(str(elem) + '\n')

    cursor.close()
    return unavailable


def update_urls(connection):
    sql_fetch = 'select * from image'
    sql_update = 'UPDATE image SET href = %s, href_small = %s where id = %s'

    cursor = connection.cursor()
    cursor.execute(sql_fetch)

    rows = cursor.fetchall()
    for row in tqdm(rows, desc='updating...'):
        cursor.close()
        cursor = connection.cursor()
        href = row[1]
        href_small = row[1]
        href_l = href.split('/')
        if href_l[3] == 'books':
            href_l[4] = href_l[4].replace('m', 'l')
        else:
            href_l[4] = href_l[4].replace('p5', 'p8')

        href = '/'.join(href_l)
        cursor.execute(sql_update, (href, href_small, row[0]))

    connection.commit()


def set_themes_to_books(connection):
    update_query = 'update book set theme = (select theme from author a where book.author = a.id)'
    cursor = connection.cursor()
    cursor.execute(update_query)
    connection.commit()


def add_events(connection):
    SPLIT_CHAR = '<|endoftext|>'
    address_ids = [46, 47, 49, 50]
    hours = [9, 10, 11, 14, 15, 16, 17, 21, 22]
    desc_1 = ['The event']
    desc_2 = ['The famous writer', 'The writer', 'The author named', 'The famous author', 'The author']
    desc_3 = ['will present his new book', 'will be our special guest presenting the book']

    sql_fetch = 'select id, name, title, book_id from ( \
        select a.id, a.name, b.title, b.id as book_id, b.publication_year, row_number() \
        over (partition by a.id order by b.publication_year desc) rn \
        from author a join book b on a.id = b.author) x \
    where rn < 3'

    sql_insert = 'insert into event(name, description, location, timestamp, related_author, related_book) values (%s, %s, %s, %s, %s, %s)'

    sql_address = 'select name, city from address where id = %s'

    cursor = connection.cursor()
    cursor.execute(sql_fetch)

    rows = cursor.fetchall()
    for row in tqdm(rows, desc='updating...'):
        cursor.close()
        cursor = connection.cursor()
        # Creating the date
        datetime = pd.to_datetime(rnd.choice(pd.bdate_range('2019-09-15', '2019-11-15')))
        datetime = datetime.replace(hour=random.choice(hours))
        weekday = datetime.day_name() + ', ' + datetime.month_name() + ' ' + datetime.strftime('%d')
        time = datetime.strftime('%I%p')

        # Selecting address
        address = random.choice(address_ids)
        cursor.execute(sql_address, (address,))
        place = cursor.fetchone()

        # Creating description
        desc = f'{random.choice(desc_1)} will take place on {weekday} at {time} at the {place[1]} {place[0]}. {random.choice(desc_2)} {row[1]} {random.choice(desc_3)} \"{row[2].split("(")[0]}\"'

        ans = interact_model(
            prompt=desc
        )

        ans = list(filter(lambda x: x != '' and x != '\n', ans.split('\n')))
        ans = desc + ans[0] + ' ' + ans[1] + ' ' + ans[2]
        ans = ans.split(SPLIT_CHAR)[0]
        cursor.execute(sql_insert, (f"{row[1]}'s Event", ans, address, datetime, row[0], row[-1]))
        connection.commit()


if __name__ == '__main__':
    conn = psycopg2.connect(host="ec2-79-125-2-142.eu-west-1.compute.amazonaws.com",
                            database="d3k4sooera9fsh",
                            user="kaxtczmqrauqfc",
                            password="a46181c55c68f90d53b029a88daa5800f4b13f203287f0df528a993ef18e5b14")
    add_events(conn)
    conn.close()
