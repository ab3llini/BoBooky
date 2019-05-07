import psycopg2
import requests
from tqdm import tqdm


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
    update_query = 'update book set theme = (select a.theme from author a where a.id = book.id)'
    cursor = connection.cursor()
    cursor.execute(update_query)
    connection.commit()


if __name__ == '__main__':
    conn = psycopg2.connect(host="ec2-79-125-2-142.eu-west-1.compute.amazonaws.com",
                            database="d3k4sooera9fsh",
                            user="kaxtczmqrauqfc",
                            password="a46181c55c68f90d53b029a88daa5800f4b13f203287f0df528a993ef18e5b14")
    set_themes_to_books(conn)
    conn.close()
