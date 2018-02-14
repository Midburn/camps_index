#!/usr/bin/env bash

pipenv run dpp run ./build

gsutil -m cp -r -a public-read public gs://midburn-public/camps2018
