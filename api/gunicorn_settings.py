#
# Gunicorn config file
#
wsgi_app = 'api.wsgi:app'

# Server Mechanics
#========================================
# current directory
chdir = '/home/ubuntu/suumo/api'

# daemon mode
daemon = False

# enviroment variables

# Server Socket
#========================================
bind = '127.0.0.1:5000'

# Worker Processes
#========================================
workers = 2

#  Logging
#========================================
# access log
accesslog = 'access.log'
access_log_format = '%(h)s %(l)s %(u)s %(t)s "%(r)s" %(s)s %(b)s "%(f)s" "%(a)s"'

# gunicorn log
errorlog = '-'
loglevel = 'info'
