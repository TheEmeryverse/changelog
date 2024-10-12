#! /bin/bash

cd /home/containerConfigs/changelog/

git pull
docker stop changelog
docker rm changelog
cd dist
docker build -t html-site .
docker run -d --name=changelog -p 7070:80 html-site