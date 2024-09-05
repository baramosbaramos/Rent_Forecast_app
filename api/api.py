import time
import MySQLdb 
import os
from flask import Flask, request, jsonify, request
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
def seaching_data(floor_space=0, access_time=20, construction_age=100, diff='difference', renting='projected_rent'):

    load_dotenv()
    min_cost = 0
    max_cost = 100000000
    min_space = 0
    max_space = 1000
    max_age = 100
    max_time = 100
    
    try:
        station_code = request.args.get('code', '')
        min_cost = int(request.args.get('mincost', ''))
        max_cost = int(request.args.get('maxcost', ''))
        min_space = int(request.args.get('minspace', ''))
        max_space = int(request.args.get('maxspace', ''))
        max_age = int(request.args.get('maxage', ''))
        max_time = int(request.args.get('maxtime', ''))

    except Exception as e:
        print('例外発生:', e)
    
    
    # MySQL接続
    conn = MySQLdb.connect(db='py_scraping', user='scraper', passwd=os.environ['PASS'], charset='utf8mb4')
    cursor = conn.cursor(MySQLdb.cursors.DictCursor)
    query = f'SELECT * FROM `{station_code}_properties` where {min_cost} <= total_fee and total_fee <= {max_cost} and {min_space} <= floor_space and floor_space <= {max_space} and construction_age <= {max_age} and access_time <= {max_time} and construction_age <= {construction_age} and {diff} < 0 order by {renting} DESC limit 70' 

    # 適正家賃降順で上位７０件表示
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
    

    # JSONをレスポンスする
    return jsonify(property_list)
