array=("academyserver" 	"Canon C2020L" 	"Canon iR2520 UFRII LT (копия 1)" 	"CanonMF411" 	"Canon_iR2520" 	"Consultant" 	"GarantClient" 	"install$" 	"KLSHARE" 	"kodeks_client" 	"Kyocera ECOSYS M2030dn KX" 	"Kyocera FS-1125MFP GX" 	"print$" 	"Users" 	"Work" 	"КМНС" 	"КМНС2" 	"Рабочий" 	"Скан Бухгалтерия")
SHARE_DIR=/home/abrikos/share
MOUNT_DIR=/home/abrikos/mount
#for i in "${array[@]}"
#do
#  echo "mkdir -p \"${SHARE_DIR}/$i\""
#  echo "mkdir -p \"${MOUNT_DIR}/$i\""
#done

echo ----------------
for i in "${array[@]}"
do
  if [[ $(findmnt -M "$MOUNT_DIR/$i") ]];  then
    mount.cifs "//192.168.1.10/$i"  "${MOUNT_DIR}/$i" -o username=user,password=123
  else
    echo $i
  fi
done

echo ---------------
for i in "${array[@]}"
do
  echo "cp -R -u -p \"${MOUNT_DIR}/$i\" \"${SHARE_DIR}\""
done
