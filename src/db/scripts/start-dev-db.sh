# start-dev-db.sh
#! /bin/bash

# Set correct permissions for this script.
# `sudo chmod 755 ./start-dev-db.sh`

docker run --rm --name db-links-app-dev -p 8443:8443 -p 8084:8084 \
-v $HOME/db/links-app-dev/lib:/var/lib/faunadb \
-v $HOME/db/links-app-dev/log:/var/log/faunadb \
fauna/faunadb
