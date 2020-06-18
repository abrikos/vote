#!/bin/sh
DB_NAME=`node tools/database/dump.js`
mongodump -d $DB_NAME
zip $DB_NAME dump/$DB_NAME/*
#cp academy.zip build/.
unzip -l ${DB_NAME}.zip
#mv academy.zip /var/www/devportal.yakutia.science/web/

