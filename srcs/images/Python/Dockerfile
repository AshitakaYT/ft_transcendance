FROM python:3.9

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY requirements.txt /app
COPY ./Script/script.sh /
RUN chmod +x /script.sh

RUN	pip install uvicorn && \
	pip install django && \
    pip install python-dotenv && \
    pip install psycopg2 && \
    pip install whitenoise && \
    pip install social-auth-app-django && \
    pip install django-oauth-toolkit && \
    pip install requests

RUN apt-get update && \
    apt-get install -y \
        build-essential \
        libpq-dev \
        nmap \
    && rm -rf /var/lib/apt/lists/* \
	pip install -r requirements.txt

RUN mkdir /cert

RUN openssl req -x509 -nodes -days 365 -newkey \
    rsa:2048 -keyout /cert/key.pem -out /cert/cert.pem -subj \
    "/C=FR/ST=France/L=Lyon/O=42/OU=LaRueZebi/CN=ft_transcendance.fr"

EXPOSE 8000

#CMD ["tail", "-f", "/dev/null"] # issue finding
CMD [ "uvicorn", "transcendance.asgi:application", \
        "--reload", "--host", "0.0.0.0", "--port", "8000", \
            "--ssl-keyfile", "/cert/key.pem", "--ssl-certfile", "/cert/cert.pem" ]
ENTRYPOINT [ "/script.sh" ]