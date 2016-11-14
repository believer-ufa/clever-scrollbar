#!/bin/bash

jspm build CleverScrollbar/CleverScrollbar.js dist/clever-scrollbar.js \
  --format umd \
  --minify \
  --global-name CleverScrollbar \
  --skip-source-maps

jspm build CleverScrollbar/CleverScrollbar.js dist/clever-scrollbar.src.js \
  --format umd \
  --global-name CleverScrollbar \
  --skip-source-maps

