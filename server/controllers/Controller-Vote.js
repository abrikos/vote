import Mongoose from "server/db/Mongoose";

const passportLib = require('../lib/passport');
const logger = require('logat');
const md5 = require('md5')

//Mongoose.User.find().then(console.log)
//Mongoose.User.updateMany({},{group:null}).then(console.log).catch(console.error)


module.exports.controller = function (app) {

    app.post('/api/cabinet/vote/list', passportLib.isLogged, (req, res) => {
        Mongoose.vote.find({user: req.session.userId})
            .sort(req.body.sort || req.body.order || {createdAt: -1})
            .populate(Mongoose.vote.populationAdmin)
            .then(list => res.send(list))
            .catch(e => res.send(app.locals.sendError({error: 500, message: e.message})))
    });

    app.post('/api/cabinet/vote/:id/view', passportLib.isLogged, (req, res) => {
        Mongoose.vote.findById(req.params.id)
            .populate(Mongoose.vote.populationAdmin)
            .then(vote => {
                if (!vote) return res.status(404).send({message: `No Question with id ${req.params.id}`})
                if (!vote.user.equals(req.session.userId)) return res.status(403).send({message: `Wrong user`})
                res.send(vote)
            })
            .catch(e => res.send(app.locals.sendError({error: 500, message: e.message})))
    });

    app.post('/api/vote/:id/process', (req, res) => {
        Mongoose.vote.findById(req.params.id)
            .populate(Mongoose.vote.populationAdmin)
            .then(vote => {
                if (!vote) return res.status(404).send({message: `No vote with id ${req.params.id}`})
                if (vote.enabled) {
                    vote.votes.push(req.body.vote)
                    vote.save()
                        .then(v => res.send(v))
                } else {
                    return res.status(404).send({message: `Голосование завершено`})
                }

            })
            .catch(e => res.send(app.locals.sendError({error: 500, message: e.message})))
    });

    app.post('/api/bulletin/:hash/:action', async (req, res) => {
        const {hash, action} = req.params;
        const b = await Mongoose.bulletin.findOne({hash})
            .populate(Mongoose.bulletin.population)
        if (!b) return res.sendStatus(404)
        switch (action) {
            case 'voted':
                if (b.voted) return res.sendStatus(403)
                for (const id of Object.keys(req.body)) {
                    const v = await Mongoose.question.findById(id);
                    v.votes.push(req.body[id]);
                    await v.save()
                }
                b.voted = true;
                break;
            case 'sign':
                b.signed = true;
                break;
        }

        await b.save()
        b.vote.populate(Mongoose.vote.populationAdmin).execPopulate((e, a) => {

            res.send(a)
        })

    })

    app.post('/api/cabinet/bulletin/:hash/copied', passportLib.isLogged, async (req, res) => {
        const model = await Mongoose.bulletin.findOne(req.params)
            .populate(Mongoose.bulletin.population)

        if (!model) return res.status(404).send({message: `No Quiz with id ${req.params.id}`})
        if (!model.vote.user.equals(req.session.userId)) return res.status(403).send({message: `Wrong user`})
        model.copied = true;
        await model.save()
        model.vote.populate(Mongoose.vote.populationAdmin).execPopulate((e, a) => {
            res.send(a)
        })

    })

    app.post('/api/cabinet/vote/:id/bulletin/prepare', passportLib.isLogged, async (req, res) => {
        const model = await Mongoose.vote.findById(req.params.id)
            .populate(Mongoose.vote.populationAdmin)

        if (!model) return res.status(404).send({message: `No Quiz with id ${req.params.id}`})
        if (!model.user.equals(req.session.userId)) return res.status(403).send({message: `Wrong user`})
        for (const b of model.bulletins) {
            await b.delete()
        }
        for (let i = 0; i < req.body.count; i++) {
            await Mongoose.bulletin.create({vote: model, hash: md5(new Date() + i)})

        }

        model.populate(Mongoose.vote.populationAdmin).execPopulate((e, a) => {
            res.send(a)
        })
    });

    app.post('/api/cabinet/vote/:id/bulletins/release', passportLib.isLogged, (req, res) => {
        Mongoose.vote.findById(req.params.id)
            .populate(Mongoose.vote.populationAdmin)
            .then(model => {
                if (!model) return res.status(404).send({message: `No Quiz with id ${req.params.id}`})
                if (!model.user.equals(req.session.userId)) return res.status(403).send({message: `Wrong user`})
                model.published = true;
                model.save()
                res.send(model)
            })
            .catch(e => res.send(app.locals.sendError({error: 500, message: e.message})))
    });

    app.post('/api/cabinet/vote/:id/update', passportLib.isLogged, (req, res) => {
        Mongoose.vote.findById(req.params.id)
            .populate(Mongoose.vote.populationAdmin)
            .then(model => {
                if (!model) return res.status(404).send({message: `No Quiz with id ${req.params.id}`})
                if (!model.user.equals(req.session.userId)) return res.status(403).send({message: `Wrong user`})
                const fields = ['name', 'description', 'days'];
                for (const field of fields) {
                    if (req.body[field] !== null) model[field] = req.body[field];
                }

                model.save()
                res.send(model)
            })
            .catch(e => res.send(app.locals.sendError({error: 500, message: e.message})))
    });

    app.post('/api/cabinet/question/:id/update', passportLib.isLogged, (req, res) => {
        Mongoose.question.findById(req.params.id)
            .populate(Mongoose.question.populationAdmin)
            .then(model => {
                if (!model) return res.status(404).send({message: `No Quiz with id ${req.params.id}`})
                if (!model.vote.user.equals(req.session.userId)) return res.status(403).send({message: `Wrong user`})
                model.name = req.body.name;
                model.save()
                res.sendStatus(200)
            })
            .catch(e => res.send(app.locals.sendError({error: 500, message: e.message})))
    });

    app.post('/api/cabinet/vote/:id/question/add', passportLib.isLogged, (req, res) => {
        Mongoose.vote.findById(req.params.id)
            .then(vote => {
                if (!vote) return res.status(404).send({message: `No Quiz with id ${req.params.id}`})
                if (!vote.user.equals(req.session.userId)) return res.status(403).send({message: `Wrong user`})
                Mongoose.question.create({vote})
                    .then(question => {
                        vote.populate(Mongoose.vote.populationAdmin).execPopulate((e, a) => {
                            res.send(a)
                        })
                    })

            })
            .catch(e => res.send(app.locals.sendError({error: 500, message: e.message})))
    });

    app.post('/api/cabinet/vote/create', passportLib.isLogged, (req, res) => {
        Mongoose.vote.create({user: req.session.userId})
            .then(vote => vote.populate(Mongoose.vote.populationAdmin).execPopulate((e, a) => {
                res.send(a)
            }))
            .catch(e => res.send(app.locals.sendError({error: 500, message: e.message})))
    });


};
