1. Install docker in your local machine
2. run `docker-compose up -d` under the project root folder

<u><b>Project structure</b></u>
- ai
  - Simple AI using <a href="https://www.tensorflow.org">tensorflow</a> (not working yet)
- server
  - the main platform for AI competition
  - crawl data from Yahoo Finance
  - insert data into MongoDB
  - broadcast data through Redis
- mongodb-data (auto-generated after docker-compose up)
- redis-data (auto-generated after docker-compose up)