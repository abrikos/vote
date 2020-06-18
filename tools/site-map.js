import Mongoose from "server/db/Mongoose";

const fs = require('fs');


async function siteMap() {
    const map = [];
    map.push({label: 'Главная', path: '/', menu: true});
    map.push({label: 'Новости', path: '/news', menu: true});
    const divisions = await Mongoose.division.find({inMenu: true});
    map.push({label: 'Структура', items: [{label: 'Аппарат', path: '/apparatus'},{label: 'Группа по подготовке научных журналов', path: '/journal'}].concat(divisions.map(d => ({label: d.name, path: d.link}))), menu: true});
    const meetings = await Mongoose.council.find({isJoined: true});
    map.push({label: 'Ученые советы', items: [{label: 'Ученый совет Президиума АН РС(Я)', path: '/presidium/council'}, {label: '------'}, {label: 'Объединенные ученые советы', path: '/council-about'}].concat(meetings.map(d => ({label: d.name, path: d.link}))), menu: true});
    map.push({
        label: 'Члены АН РС(Я)', menu: true, items: Mongoose.person.schema.paths.member.options.select.map(s => ({label: s.label, path: `/people/${s.value}/members`}))
    })
    map.push({
        label: 'Президиум', menu: true, items: [
            {label: 'Руководство', path: '/people/supervisors/all'},
            {label: 'И.о. Президента', path: '/presidium/president', className: 'level2'},
            {label: 'Вице-президенты', path: '/presidium/vice', className: 'level2'},
            {label: 'Главный ученый секретарь', path: '/presidium/scsecretary', className: 'level2'},
            {label: 'Секретариат', path: '/division/5e80f5ba7549ce5472a10e13/secretariat'},
            {label: 'Документы', path: '/documents/presidium'},
        ]
    });
    map.push({
        label: 'Проекты', items: [
            {label: 'Издания', path: '/edition', menu: true},
            {label: '------'},
            {label: 'История Якутии', path: '/project/sakha-history'},
            {label: 'История Якутии. Том 1', path: '/project/sakha-history/1'},
            {label: 'История Якутии. Том 2', path: '/project/sakha-history/2'},
            {label: 'История Якутии. Том 3', path: '/project/sakha-history/3'},
            {label: '------'},
            {label: 'Переработка мусора', path: '/project/recycle'},
            {label: '------'},
            {label: 'Компилятор FORTRAN', path: '/fortran'},
        ], menu: true
    })

    map.push({
        label: 'Информация', items: [
            {label: 'Выборы', path: '/election', className: 'text-danger'},
            {label: 'Об Академии', path: '/about'},
            {label: 'Веб-ресурсы академии', path: '/web-resources'},
            {label: 'Научные учереждения', path: '/science-org'},
            {label: 'Документы', path: '/documents/all'},
            {label: 'Партнёры', path: '/partners'},
            {label: 'СМИ о нас', path: '/mass-media'},
            {label: 'О Республике', path: '/about-republic'},
            {label: 'Правительство Республики Саха (Якутия)', path: '/gov'},
            {label: '------'},
            {label: 'Контакты', path: '/contacts'},
            {label: 'Телефонный справочник', path: '/phone-book'}
        ], menu: true
    });
    Mongoose.close()
    return map;
}


siteMap().then(map => fs.writeFileSync('client/components/site-map-compiled.json', JSON.stringify(map)))

