# Instrucctions for installing kafka in Linux Server
## Docker commands
```
$ sudo apt install docker
$ docker images
$ docker ps (-a)
$ docker exec -it "ContainerID" bash
$ docker restart "ContainerID"
$ docker stop "ContainerID"
$ docker rm "ContainerID"
``` 
[More docker commands you might need](https://geekflare.com/es/docker-commands/)
## Steps
1. Install docker
    > sudo apt install docker
1. Create docker-compose.yml file 
    ``` 
    version: "3"
    services: 
    zookeeper:
        image: "bitnami/zookeeper:latest"
        ports:
        - "2181:2181"
        environment:
        - ALLOW_ANONYMOUS_LOGIN=yes
    kafka:
        image: "bitnami/kafka:latest"
        container_name: "kafka"
        ports:
        - "9092:9092"
        environment:
        - KAFKA_BROKER_ID=1
        - KAFKA_LISTENERS=PLAINTEXT://:9092
        - KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://127.0.0.1:9092
        - KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181
        - ALLOW_PLAINTEXT_LISTENER=yes
        depends_on:
        - zookeeper
    ``` 
1. Run docker-compose.yml file 
    > docker-compose up
