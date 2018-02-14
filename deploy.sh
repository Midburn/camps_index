#!/usr/bin/env bash

pipenv run dpp run ./build

gsutil -m rsync -r public gs://midburn-public/camps2018
