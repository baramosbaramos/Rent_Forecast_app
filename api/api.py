import time
from flask import Flask, request, jsonify, request
import MySQLdb 
import os
from dotenv import load_dotenv
#from flask_limiter import Limiter
#from flask_limiter.util import get_remote_address

app = Flask(__name__)
#limiter = Limiter(
#    get_remote_address,
#    app=app,
#    default_limits=["30 per hour"],
#)
#

@app.route('/search', methods=["GET"])
def seaching_data(floor_space=0, access_time=20, construction_age=50, diff='difference'):

    load_dotenv()
    min_cost = 0
    max_cost = 10000000
    
    try:
        station_code = request.args.get('code', '')
        cost_type = request.args.get('cost', '')

    except Exception as e:
        print('例外発生:', e)

    if cost_type == "1":
        max_cost = 70000
    elif cost_type == "2":
        min_cost = 70000
        max_cost = 100000
    elif cost_type == "3":
        min_cost = 100000
        max_cost = 150000
    elif cost_type == "4":
        min_cost = 150000
        max_cost = 200000
    elif cost_type == "5":
        min_cost = 200000
        max_cost = 250000
    elif cost_type == "6":
        min_cost = 250000
        max_cost = 300000
    elif cost_type == "7":
        min_cost = 300000
        max_cost = 350000  
    elif cost_type == "8":
        min_cost = 350000
        max_cost = 400000        
    elif cost_type == "9":
        min_cost = 400000
    
    # MySQL接続
    conn = MySQLdb.connect(db='py_scraping', user='scraper', passwd=os.environ['PASS'], charset='utf8mb4')
    cursor = conn.cursor(MySQLdb.cursors.DictCursor)
    query = f'SELECT * FROM `{station_code}_properties` where {min_cost} <= total_fee and total_fee <= {max_cost} and floor_space > {floor_space} and access_time < {access_time} and construction_age < {construction_age} order by {diff}' 

    # 乖離率降順で上位２０件表示
    cursor.execute(query)

    # 辞書型のタプルを取得
    property_tuple = cursor.fetchall()
    property_list = []
    index = 0
    for property in property_tuple:
         index += 1
         property['rank'] = index
         property_list.append(property)

         if index >= 70:
          break
    
    conn.commit()  
    conn.close()
    

    # JSON
    # 辞書型をレスポンスする
    return jsonify(property_list)
