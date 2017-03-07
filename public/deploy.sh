#!/usr/env/bash

sh makesass.sh --no-watch && \
firebase deploy || \
echo "An error occured"
