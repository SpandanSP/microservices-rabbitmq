Author : Spandan Pramanik
Description : A simple microservice project with RabbitMQ as messaging broker.
Project structure: 
-broker [Communicates between publisher and consumer by sending and reciving messages from RabbitMQ]
-publisher [Sends Messages to broker]
-consumer [Recives message from broker]

How to Run?
1. Run RabbitMQ in a docker container on port 5672
    docker run --name rabbitmq -p 5672:5672 rabbitmq
2. Run all the three projects i.e broker, consumer & publisher. 
    Navigate inside each folder and run node index.js.
3. Broker runs on port 5000, publisher on 5001 & consumer on 5002.