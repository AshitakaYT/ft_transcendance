all : build
	make run

build: 
	docker build -t tr .

run :
	docker container run --mount type=bind,source=/Users/nchabli/Documents/transcendance/ft_transcendance/srcs,target=/app --name trc --rm -p 8000:8000 tr

rund :
	docker container run --mount type=bind,source=/Users/nchabli/Documents/transcendance/ft_transcendance/srcs,target=/app --name trc -d --rm -p 8000:8000 tr


inspect :
	docker container exec -it trc bash

stop :
	docker stop trc

clean :
	docker image rm tr

prune :
	docker system prune

.PHONY: all build run stop clean prune inspect