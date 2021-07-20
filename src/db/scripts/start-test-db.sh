# start-test-db.sh
#! /bin/bash

# Set correct permissions for this script.
# `sudo chmod 755 ./start-test-db.sh`

docker run --rm --name db-links-app-test -p 8453:8443 -p 8094:8084 fauna/faunadb
