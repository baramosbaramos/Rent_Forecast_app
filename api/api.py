import time
from flask import Flask

app = Flask(__name__)
sou = 'helloooooo'

@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}

# this is comment