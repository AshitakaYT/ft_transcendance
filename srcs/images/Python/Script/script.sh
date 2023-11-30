#!/bin/bash

wait_for_db() {
    echo "Waiting for the 'db' container to be ready..."
    while ! ncat -z db 5432; do
        sleep 1
    done
    echo "'db' container is ready!"
}

wait_for_db

python /app/manage.py migrate