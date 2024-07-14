# syntax=docker/dockerfile:1


# Dockerize React
FROM node:18 as frontend

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./

RUN npm run build


# Dockerize Django
FROM python:3.10-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

COPY --from=frontend /app/build /app/static

RUN chmod +x /app/manage.py

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
