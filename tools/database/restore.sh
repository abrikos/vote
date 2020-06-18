#!/bin/sh
BASEDIR=$(dirname "$0")
cd "./${BASEDIR}/../.."

## restore DB
wget -O academy.zip https://academy.abrikos.pro/academy.zip
unzip -o academy.zip
mongorestore --drop

## fetch static files
wget -O upload.idx https://academy.abrikos.pro/uploads/
for file in `cat upload.idx | grep -o '<a .*href=.*>' | sed -e 's/<a /\n<a /g' | sed -e 's/<a .*href=['"'"'"]//' -e 's/["'"'"'].*$//' -e '/^$/ d'`;
do
if [ ! -f "uploads/${file}" ]; then
    wget -nc -O "uploads/${file}" "https://academy.abrikos.pro/uploads/${file}"
fi
done
