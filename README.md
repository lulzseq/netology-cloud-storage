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

2. Запустить бэкенд:
```
$ pip install -r requirements.txt
$ python manage.py makemigrations accounts
$ python manage.py makemigrations storage
$ python manage.py migrate
$ python manage.py runserver
```

3. Запустить фронтенд:
```
$ yarn
$ yarn start
```