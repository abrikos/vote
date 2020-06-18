import funcs from "tools/old/import-func"
import Mongoose from "server/db/Mongoose";

async function mainApparat() {
    await Mongoose.Presidium.deleteMany().exec()

    const path = './static/prezidium-apparat-akademii-nauk-rsya';
    const root = await funcs.getDomFile(path);
    const personsContainer = root.querySelector('.uk-child-width-1-2@s');
    const persons = personsContainer.childNodes.filter(n => n.nodeType === 1);
    const name = root.querySelector('h1').rawText.trim();
    for (const person of persons) {
        const fio = person.querySelector('.el-title').rawText.trim();
        const statusNode = person.querySelector('.el-meta');
        const statusObj = statusNode && statusNode.rawText.trim();
        const division = statusObj.split('|');
        const status = division[1] ? division[1] : statusObj;
        const contactsNode = person.querySelector('.el-content');
        const contacts = contactsNode.querySelectorAll('a');
        const phone = contacts[0].rawText.trim();
        const email = contacts[1].rawText.trim();
        let personFound = await Mongoose.Person.findOne({fio});

        const div = await Mongoose.Division.findOne({name: division[0].toLowerCase().trim()})
        console.log(fio, phone, email)
        //continue;

        if (!personFound) personFound = await Mongoose.Person.create({fio, division: div, status, phone, email});
        personFound.isApparat = true;
        await personFound.save();
    }

    Mongoose.close()
}

mainApparat()
