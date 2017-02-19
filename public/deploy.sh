#!/usr/env/bash

sh makesass.sh --no-watch && \
cd ./framework && \
sh makesass.sh --no-watch && \
cd .. && \
cd ./framework && \
sh makesass.sh --no-watch && \
firebase deploy || \
echo "An error occured"
