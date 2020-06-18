import funcs from "tools/old/import-func"
import Mongoose from "server/db/Mongoose";
import transliterate from 'transliterate';
import {func} from "prop-types";

const fs = require('fs')

async function main() {
    await Mongoose.Edition.deleteMany().exec();
    const wgets = [];
    const root = await funcs.getDom(funcs.mainSite + '/izdaniya');
    const tiles = root.querySelectorAll('.uk-grid-collapse');
    for(const tile of tiles){
        const header = tile.querySelector('h2').rawText.trim();

        const metas = tile.querySelectorAll('.uk-text-meta');
        const year = metas[0].rawText.trim();
        const format = metas[1].rawText.trim();
        const texts = tile.querySelectorAll('.uk-margin');
        const text = texts.slice(3).map(t=>t.rawText.trim()).join(' \n');
        const imageNode = tile.querySelector('img');
        const file = funcs.getImage(imageNode);
        let image = await Mongoose.Image.findOne({name:file.name});
        if(!image) image = await Mongoose.Image.create(file);
        let model = await Mongoose.Edition.findOne({header});

        if(!model) model = await Mongoose.Edition.create({header, image, year, format, text});
        console.log(model)
        wgets.push(`wget -nc -O ${image.path.slice(1)} "${file.src}"`);
    }

    const file = fs.openSync(`./izdania-files.sh`, 'w');
    fs.writeSync(file, wgets.join('\n'), null, null);
    fs.closeSync(file);
    Mongoose.close()
}

main()
