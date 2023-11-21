FROM debian:bullseye

# set a directory for the app
WORKDIR /home/iel-amra

# install dependencies
RUN apt update
RUN apt upgrade -y
RUN apt install python3.9 -y
RUN apt install python3-pip -y
RUN python3.9 -m pip install Django

EXPOSE 8000

ENTRYPOINT ["python3.9"]
CMD ["manage.py", "runserver", "0.0.0.0:8000"]