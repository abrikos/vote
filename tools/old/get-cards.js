const fs = require('fs');

const tpl = 'export {default as MODULE} from "client/pages/about-republic/images/DIR/FILE"'
const path = './client/pages/about-republic/images/';
const dirs = fs.readdirSync(path);

for(const dir of dirs){
    const files = fs.readdirSync(path+ dir);
    let i = 0;
    for(const file of files){
        i++;
        console.log(tpl
            .replace('MODULE',`img_${dir}_${i}`)
            .replace('DIR',dir)
            .replace('FILE',file)
        )
    }
}
