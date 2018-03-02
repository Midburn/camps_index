#!/usr/bin/env bash

LOGFILE=./load_build_loop.log

echo "sleeping 2 seconds to let mysql start"
sleep 2

echo "Starting load build loop, updating every ${LOOP_INTERVAL_SECONDS} seconds"
while true; do
    ! ./load_camps_2018.sh > $LOGFILE 2>&1 && cat $LOGFILE && echo failed to load camps data from DB && exit 1
    ! pipenv run dpp run --verbose ./build_from_tsv > $LOGFILE 2>&1 && cat $LOGFILE && echo failed to build && exit 1
    mkdir -p /usr/share/nginx/html/
    ! cp -rf public/ /usr/share/nginx/html/ && echo failed to copy to nginx html directory && exit 1
    sleep "${LOOP_INTERVAL_SECONDS}"
    echo .
done
