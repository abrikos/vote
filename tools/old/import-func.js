import {parse} from "node-html-parser";
import * as axios from "axios";
import md5 from "md5";

const fs = require('fs');

export default {
    async getDom(path) {
        const response = await axios.get(path);
        return parse(response.data);
    },

    async getDomFile(path) {
        const data = fs.readFileSync(path, 'utf-8');
        return parse(data);
    },

    mainSite: 'https://yakutia.science',

    adaptLink(path) {
        return path.replace(this.mainSite, '').substr(1).split('/').join('-')
    },

    getImage(image) {
        let src = image.attributes.src;
        if (!src) src = image.attributes['data-src'];
        if (!src) src = image.attributes['uk-img'];
        if (!src.includes(this.mainSite)) src = this.mainSite + src;
        const file = this.getFileName(src);
        return {src, ...file}
    },

    getFileName(src) {
        const extension = src.split('.').pop();
        return {name: md5(src), extension};
    }


}
