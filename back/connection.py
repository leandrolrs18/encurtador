from flask import Flask, request, json
from datetime import datetime
import mysql.connector
from mysql.connector import Error
from mysql.connector import errorcode
import os

DB_HOST = os.environ.get('DB_HOST')
#DB_NAME = 'dbexercitium'  # environ.get('DB_NAME') 
DB_USER = os.environ.get('DB_USER')
DB_PASSWORD = os.environ.get('MARIADB_PASSWORD')
DB_NAME = 'encurtador'

def run_insert_query(query, values, table_name):

    connection = get_database_connection()
    res = ''
    id = None

    try:
        cursor = connection.cursor()
        cursor.execute(query, values)
        connection.commit()
        id = cursor.lastrowid

        if id is not None:
            res += 'Record with id('+str(id) + \
                ') inserted successfully into '+table_name+' table'
        else:
            res += str(cursor.rowcount) + \
                ' Record inserted successfully into '+table_name+' table'
        cursor.close()
    except mysql.connector.Error as error:
        res += "Failed to inser record into table {}".format(error)
    finally:
        if connection.is_connected():
            connection.close()

    return (id)


def run_update_query(query, values, table_name):

    connection = get_database_connection()
    res = ''
    id = None

    try:
        print("LOG VALUE: ", values)
        cursor = connection.cursor()
        cursor.execute(query, values)
        connection.commit()
        id = cursor.lastrowid
        if id is not None:
            res += 'Record with id('+str(id) + \
                ') updated successfully '+table_name+' table'
        else:
            res += str(cursor.rowcount) + \
                ' Record updated successfully into '+table_name+' table'
        cursor.close()

    except mysql.connector.Error as error:
        res += "Failed to update record into table {}".format(error)

    finally:
        if connection.is_connected():
            connection.close()

    return (res, id)


def run_select_query(query, *argv):

    connection = get_database_connection()
    values = ''

    if (len(argv) > 0):
        values = argv[0]

    try:
        print("LOG VALUE: ", values)
        cursor = connection.cursor()
        cursor.execute(query, values)
        res = cursor.fetchall()
        cursor.close()
    except mysql.connector.Error as error:
        res = "Failed to select from table {}".format(error)
    finally:
        if connection.is_connected():
            connection.close()

    return json.dumps(res, ensure_ascii=False, default=str)


def run_select_query_e(query, *argv):

    connection = get_database_connection()
    values = ''

    if (len(argv) > 0):
        values = argv[0]

    try:
        print("LOG VALUE: ", values)
        cursor = connection.cursor()
        cursor.execute(query, values)
        res = cursor.fetchall()
        cursor.close()
    except mysql.connector.Error as error:
        res = "Failed to select from table {}".format(error)
    finally:
        if connection.is_connected():
            connection.close()

    return res


def get_database_connection():
    
    return mysql.connector.connect(host=DB_HOST, database=DB_NAME, user=DB_USER, password=DB_PASSWORD)