# Installing kafka on Linux Server
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
   > sudo snap install docker

1. Install nodejs
   > sudo apt install nodejs
1. Install npm 
   > sudo apt install npm
1. Create docker-compose.yml file 
    ``` 
    version: "3"
    services: 
    zookeeper:
        image: "bitnami/zookeeper:latest"
        ports:
        - "port:port"
        environment:
        - ALLOW_ANONYMOUS_LOGIN=yes
    kafka:
        image: "bitnami/kafka:latest"
        container_name: "kafka"
        ports:
        - "port:port"
        environment:
        - KAFKA_BROKER_ID=1
        - KAFKA_LISTENERS=PLAINTEXT://:port
        - KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://127.0.0.1:port
        - KAFKA_ZOOKEEPER_CONNECT=zookeeper:port
        - ALLOW_PLAINTEXT_LISTENER=yes
        depends_on:
        - zookeeper
    ``` 
1. Init npm (to create package.json)
   > npm init
1. > npm i node-rdkafka --save
1. Change package.json dependencies and scripts
      ```
      {
      "name": "kafka",
      "version": "1.0.0",
      "description": "kafka trial",
      "main": "index.js",
      "dependencies": {
        "avsc": "^5.7.6",
        "bindings": "^1.5.0",
        "file-uri-to-path": "^1.0.0",
        "nan": "^2.17.0",
        "node-rdkafka": "^2.14.0"
       },
       "scripts": {
       "start:producer": "node ./producer/index.js",
       "start:consumer": "node ./consumer/index.js"
       },
       "author": "Autor",
       "license": "ISC"
       }
       ```
1. Create node_modules
   > npm install
1. Create file topic_creation.sh
      ```
      docker exec -it kafka /opt/bitnami/kafka/bin/kafka-topics.sh \
      --create \
      --zookeeper zookeeper:port \
      --replication-factor 1 \
      --partitions 1 \
      --topic task
      ```
1. Create "consumer" folder and "index.js" inside of it 
1. Create "producer" folder and "index.js" inside of it 
      
# Running kafka on Linux server
1. Run docker-compose.yml file 
   > sudo docker-compose up
1. Run producer script
   > npm run start:producer
1. Run producer script
   > npm run start:consumer




