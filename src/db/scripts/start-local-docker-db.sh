# start-docker-db.sh
#! /bin/bash

# Set correct permissions for this script and to the mounted db dir.
# `sudo chmod 755 ./start-local-docker-db.sh`
# `sudo chmod -R 755 ./src/db/local`

docker run --rm --name faunadb -p 8443:8443 -p 8084:8084 \
-v $HOME/db/links-app-dev/lib:/var/lib/faunadb \
-v $HOME/db/links-app-dev/log:/var/log/faunadb \
fauna/faunadb
