# Дипломный проект по профессии «Fullstack-разработчик на Python»

## ☁️ Облачное хранилище My Cloud

Веб-приложение, которое работает как облачное хранилище. Приложение позволяет пользователям отображать, загружать, отправлять, скачивать и переименовывать файлы. Пользователи могут регистрироваться, логиниться в аккаунт, выходить из него. Пользователь имеет доступ только к своему аккаунту и своим файлам. Есть административный интерфейс — администратор может выполнять все вышеупомянутые действия с любыми пользователями или файлами.

## 🛠 Tech stack

Django, NodeJS, React, Redux, PostgreSQL

Полагаю у вас уже стоит Python, NodeJS, PostgreSQL.

## 🔮 Локальная установка

1. Клонировать репозиторий:
```
$ git clone https://github.com/lulzseq/netology-cloud-storage.git
$ cd netology-cloud-storage
```

2. Cоздать базу данных PostgreSQL:
```
$ psql

$ CREATE DATABASE django_db;
```

3. Активировать виртуальное окружение
```
$ python -m venv env
$ source ./env/bin/activate
```
Создайте файл `.env`, где укажите параметры подключения к PostgreSQL и Django Secret Key:
```
# Django

DJANGO_SECRET_KEY = ''

POSTGRES_DB = 'django_db'
POSTGRES_USER = ''
POSTGRES_PASSWORD = ''
POSTGRES_HOST = ''
POSTGRES_PORT = ''

# React

REACT_APP_API_URL = 'http://127.0.0.1:8000'
```

4. Запустить бэкенд:
```
$ pip install -r requirements.txt
$ python manage.py makemigrations accounts
$ python manage.py makemigrations storage
$ python manage.py migrate
$ python manage.py runserver
```
Пути для API:

```
POST /register/ создать пользователя
POST /login/ логин пользователя
GET /logout/ логаут пользователя
PATCH /api/users/<id> переименовать пользователя по ID
DELETE /api/users/ удалить пользователя

GET /api/users/ получить всех юзеров (или только запрашивающего пользователя)
GET /api/users/<id> получить конкретного юзера по ID

GET /api/files/ получить все файлы
GET /api/files/<id> получить инфо файла по ID

POST /api/files/ загрузить файл (form-data)
PATCH /api/files/<id> переименовать файл по ID
DELETE /api/files/<id> удалить файл по ID
```


5. Запустить фронтенд:
```
$ yarn
$ yarn start
```