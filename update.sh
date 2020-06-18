#!/bin/sh
LOG_UPDATE="update.log"

echo "Check changes v.3.3"
DIR=$(dirname "$0")

cd "$DIR"
echo "$DIR"
echo "$PWD"
PULL_RESULT=`git pull`


echo "${PULL_RESULT}"

if [ "${PULL_RESULT}" = "Already up-to-date." ];
then
exit 0
fi

echo "START UPDATE 2" > $LOG_UPDATE
rm "package-lock.json"

/usr/bin/pm2 restart all >> $LOG_UPDATE

npm i
#NODE_ENV=production npm run update >> "${LOG_UPDATE}"
npm run build
DIR=/var/www/yakutia.science/web/
rm -fr "${DIR}/*"
cp -avr build/*     $DIR
echo "PM2 start" >> $LOG_UPDATE
date >> $LOG_UPDATE
pm2 list >> $LOG_UPDATE
pm2 restart all >> $LOG_UPDATE

echo "UPDATE finish" >> $LOG_UPDATE
date >> $LOG_UPDATE

sh tools/database/restore.sh
