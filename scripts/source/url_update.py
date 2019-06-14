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
    address_ids = [46, 47]
    hours = [9, 10, 11, 14, 15, 16, 17, 21, 22]
    desc_1 = ['In this event', 'Today', 'During the event']
    desc_2 = ['the famous writer', 'the writer', 'the author named', 'the famous author']
    desc_3 = ['will present his new books', 'will talk about his last productions', 'will be our special guest']
    sql_fetch = 'select id, name from author'

    sql_insert = 'insert into event(name, description, location, timestamp, related_author) values (%s, %s, %s, %s, %s)'

    cursor = connection.cursor()
    cursor.execute(sql_fetch)

    rows = cursor.fetchall()
    for row in tqdm(rows, desc='updating...'):
        cursor.close()
        cursor = connection.cursor()
        datetime = pd.to_datetime(rnd.choice(pd.bdate_range('2019-08-01', '2019-12-31')))
        datetime = datetime.replace(hour=random.choice(hours))
        desc = f'{random.choice(desc_1)} {random.choice(desc_2)} {row[1]} {random.choice(desc_3)}'
        ans = interact_model(
            prompt=desc
        )
        ans = desc + ans.split('\n')[0] + ' ' + ans.split('\n')[2]
        cursor.execute(sql_insert, (f"{row[1]}'s Event", ans, random.choice(address_ids), datetime, row[0]))
        connection.commit()


if __name__ == '__main__':
    conn = psycopg2.connect(host="ec2-79-125-2-142.eu-west-1.compute.amazonaws.com",
                            database="d3k4sooera9fsh",
                            user="kaxtczmqrauqfc",
                            password="a46181c55c68f90d53b029a88daa5800f4b13f203287f0df528a993ef18e5b14")
    add_events(conn)
    conn.close()
