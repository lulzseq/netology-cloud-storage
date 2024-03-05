# Project on the profession «Fullstack developer»

## ☁️ Cloud-based storage

A web application that acts as cloud storage. The application allows users to display, upload, send, download, and rename files. Users can register, log in to an account, and log out of an account. The user has access only to their account and their files. There is an administrative interface - the administrator can perform all the above actions with any users or files.

## 🛠 Tech stack

Python v.3.10+, NodeJS v.18+, PostgreSQL v.14+.
Django, React, Redux.

## 🔮 Local installation

- clone repo
```
$ git clone https://github.com/lulzseq/netology-cloud-storage.git
$ cd netology-cloud-storage
```
### Database

- create a database in PostgreSQL
```
$ psql

# CREATE DATABASE django_db;
```
### Backend
- activate a virtual environment
```
$ python -m venv env
$ source ./env/bin/activate
```
Create file `.env`, where we specify connection parameters to PostgreSQL and Django Secret Key:
```
# Django

DJANGO_SECRET_KEY = '<DJANGO_SECRET_KEY>'

POSTGRES_DB = 'django_db'
POSTGRES_USER = '<login>'
POSTGRES_PASSWORD = '<password>'
POSTGRES_HOST = 'http://<server IP>'
POSTGRES_PORT = '5432'

# React

REACT_APP_API_URL = 'http://<server IP>'

# For example, in a local deployment, this would be http://127.0.0.1:8000
```

- run the backend
```
(env) $ pip install -r requirements.txt
(env) $ python manage.py makemigrations accounts
(env) $ python manage.py makemigrations storage
(env) $ python manage.py migrate
(env) $ python manage.py runserver
```
API:

```
POST /register/ create a user
POST /login/ user login
GET /logout/ user logout
PATCH /api/users/<id> rename a user by ID
DELETE /api/users/ delete user

GET /api/users/ get all users (or just the requesting user)
GET /api/users/<id> get a specific user by ID

GET /api/files/ get all files
GET /api/files/<id> retrieve file info by ID

POST /api/files/ upload file (form-data)
PATCH /api/files/<id> rename the file by ID
DELETE /api/files/<id> delete file by ID
```
### Frontend
- run the frontend
```
(env) $ yarn
(env) $ yarn start
```

## 🎰 Deployment on the server

- connect to the server
```
$ ssh root@<server IP>
```
- create a user, give him permissions, and connect to him
```
$ adduser <unix_username>
$ usermod <unix_username> -aG sudo
$ su - <unix_username>
```
- update packages, install new ones
```
$ sudo apt update
$ sudo apt upgrade
$ sudo apt install python3-venv python3-pip postgresql nginx
```
- check that Nginx is running
```
$ sudo systemctl start nginx
$ sudo systemctl status nginx
```
- clone the repository and log in
```
$ git clone https://github.com/lulzseq/netology-cloud-storage.git
$ cd netology-cloud-storage
```
### Database
- don't forget to install the database, use the `postgres` user.
```
$ sudo su postgres
$ psql

# CREATE DATABASE django_db;
# CREATE USER <username> WITH PASSWORD '<passowrd>';
# GRANT ALL PRIVILEGES ON DATABASE django_db TO <username>;
# \q

$ exit
```
### Backend
- create a `.env` file for specifying variables
```
# Django

DJANGO_SECRET_KEY = '<DJANGO_SECRET_KEY>'

POSTGRES_DB = 'django_db'
POSTGRES_USER = '<login>'
POSTGRES_PASSWORD = '<password>'
POSTGRES_HOST = 'http://<server IP>'
POSTGRES_PORT = '5432'

# React

REACT_APP_API_URL = 'http://<server IP>'
```
- create and activate the virtual environment
```
$ python3 -m venv env
$ source ./env/bin/activate
```
- install Python dependencies, apply migrations and run the backend
```
(env) $ pip install -r requirements.txt
(env) $ python manage.py makemigrations accounts
(env) $ python manage.py makemigrations storage
(env) $ python manage.py migrate
(env) $ python manage.py runserver 0.0.0.0:8000
```
The Django project should now be accessible at http://<server IP>:8000.
- write the Gunicorn config
```
(env) $ sudo nano /etc/systemd/system/gunicorn.service
```
In the file write the following settings (instead of `<unix_username>` you should substitute your username):
```
[Unit]
Description=gunicorn.service
After=network.target

[Service]
User=dima
Group=www-data
WorkingDirectory=/home/<unix_username>/netology-cloud-storage
ExecStart=/home/<unix_username>/netology-cloud-storage/env/bin/gunicorn --access-logfile - --workers=3 --bind unix:/home/<unix_username>/netology-cloud-storage/server/gunicorn.sock server.wsgi:application

[Install]
WantedBy=multi-user.target
```
- run the Gunicorn
```
(env) $ sudo systemctl start gunicorn
(env) $ sudo systemctl enable gunicorn
```
- write the Nginx config
```
(env) $ sudo nano /etc/nginx/sites-available/netology-cloud-storage
```
In the file write the following settings (instead of `<unix_username>` you should substitute your username):
```
server {
	listen 80;
	server_name 82.97.243.191;

	location /static/ {
		root /home/<unix_username>/netology-cloud-storage;
	}
        
        location /static/js/ {
        alias /home/<unix_username>/netology-cloud-storage/build/static/js/;
    }

       location /static/css/ {
        alias /home/<unix_username>/netology-cloud-storage/build/static/css/;
    }

	location ~ ^/(api|login|register|logout|s)/ {
        include proxy_params;
        proxy_pass http://unix:/home/<unix_username>/netology-cloud-storage/server/gunicorn.sock;
    }

	location / {
		root /home/<unix_username>/netology-cloud-storage/build/;
        try_files $uri /index.html;
	}
}
```
- link to it
```
(env) $ sudo ln -s /etc/nginx/sites-available/netology-cloud-storage /etc/nginx/sites-enabled
```
- open ports and give rights to Nginx
```
(env) $ sudo ufw allow 8000
(env) $ sudo ufw allow 80
(env) $ sudo ufw allow 'Nginx Full'
```
- check that the services are active
```
(env) $ sudo systemctl status gunicorn
(env) $ sudo systemctl status nginx
```
- restart the services
```
(env) $ sudo systemctl daemon-reload
(env) $ sudo systemctl restart gunicorn
(env) $ sudo systemctl restart nginx
```
Now Django project should be accessible via http://<server IP> on normal port 80. If we see a 502 error, it's probably a permissions issue, and change the existing user to our user name:
```
(env) $ sudo nano /etc/nginx/nginx.conf
```
```
...
...
user <unix_username>
...
...
```
- restart services again and Django project should be accessible via http://<server IP> on normal port 80:
```
(env) $ sudo systemctl daemon-reload
(env) $ sudo systemctl restart gunicorn
(env) $ sudo systemctl restart nginx
```
- log out of the user back to `root`
```
(env) $ exit
```
### Frontend
- install NodeJS v.18+ and Yarn
```
$ curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - 
$ sudo apt-get install -y nodejs

$ curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
$ echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
$ sudo apt update && sudo apt install yarn
```
- logging back into our user
```
$ su - <unix_username>
```
- install dependencies and start building the frontend
```
$ yarn
$ yarn build
```
- check Nginx and restart it
```
$ sudo nginx -t
$ sudo systemctl restart nginx
```
The Django + React project should now be fully accessible via http://<server IP> on regular port 80.
## 👮‍♀️ License
- [MIT](https://github.com/lulzseq/netology-cloud-storage/blob/master/LICENSE)
