import funcs from "tools/old/import-func"
import Mongoose from "server/db/Mongoose";

const fs = require('fs')

async function main() {

    const path = './static/prezidium-inostrannye-chleny';
    const root = await funcs.getDomFile(path);
    const container = root.querySelectorAll('.uk-child-width-1-1');
    const items = container[5].childNodes.filter(n => n.nodeType === 1);
    let i = 1;
    for (const item of items) {
        const imgNode = item.querySelector('img');
        const fio = item.querySelector('.el-title').rawText.trim();
        const status = item.querySelector('.el-meta').rawText.trim();
        const description = item.querySelector('.el-content').rawText.trim();
        let person = await Mongoose.Person.findOne({fio});

        const file = funcs.getImage(imgNode);
        const image = await Mongoose.Image.findOne({name: file.name});
        if(!person) person = await Mongoose.Person.create({fio, image, description})
        if(!person.image) person.image = image;
        if(!person.description) person.description = description;
        person.member = 2;
        person.memberStatus = status;
        i++;
        await person.save();
        console.log(fio, person.image)
    }

    Mongoose.close()
}

main()
