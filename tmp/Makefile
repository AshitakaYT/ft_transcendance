all : build
	make run

build: 
	docker build -t tr .

run :
	docker container run --mount type=bind,source=./srcs/aucousin_tests/token_auth/project/new/TokenAuth/TokenAuthWhole,target=/home/iel-amra --name trc --rm -p 8000:8000 tr

rund :
	docker container run --mount type=bind,source=./srcs/aucousin_tests/token_auth/project/new/TokenAuth/TokenAuthWhole--name trc -d --rm -p 8000:8000 tr


inspect :
	docker container exec -it trc bash

stop :
	docker stop trc

clean :
	docker image rm tr

prune :
	docker system prune

.PHONY: all build run stop clean prune inspect