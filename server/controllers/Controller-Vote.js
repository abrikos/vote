import Mongoose from "server/db/Mongoose";

const passportLib = require('../lib/passport');
const logger = require('logat');

//Mongoose.User.find().then(console.log)
//Mongoose.User.updateMany({},{group:null}).then(console.log).catch(console.error)


module.exports.controller = function (app) {

    app.post('/api/cabinet/vote/list', passportLib.isLogged, (req, res) => {
        Mongoose.vote.find({user: req.session.userId})
            .sort(req.body.sort || req.body.order || {createdAt:-1})
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
                if (!vote) return res.status(404).send({message: `No Vote with id ${req.params.id}`})
                if(vote.enabled){
                    vote.votes.push(req.body.vote)
                    vote.save()
                        .then(v=>res.send(v))
                }else{
                    return res.status(404).send({message: `Голосование завершено`})
                }

            })
            .catch(e => res.send(app.locals.sendError({error: 500, message: e.message})))
    });

    app.post('/api/cabinet/vote/:id/update', passportLib.isLogged, (req, res) => {
        Mongoose.vote.findById(req.params.id)
            .then(model => {
                if (!model) return res.status(404).send({message: `No Quiz with id ${req.params.id}`})
                if (!model.user.equals(req.session.userId)) return res.status(403).send({message: `Wrong user`})

                const fields = ['name', 'published', 'description', 'count'];
                for (const field of fields) {
                    if (req.body[field] !== null) model[field] = req.body[field];
                }
                model.save()
                res.send(model)
            })
            .catch(e => res.send(app.locals.sendError({error: 500, message: e.message})))
    });

    app.post('/api/cabinet/vote/create', passportLib.isLogged, (req, res) => {
        Mongoose.vote.create({user: req.session.userId})
            .then(q => res.send(q))
            .catch(e => res.send(app.locals.sendError({error: 500, message: e.message})))
    });

    app.post('/api/vote/:id/results/add', passportLib.isLogged, (req, res) => {
        Mongoose.vote.findById(req.params.id)
            .then(vote => {
                if (!vote) return res.status(404).send({message: `No Quiz with id ${req.params.id}`})
                Mongoose.result.create({user: req.session.userId, vote, answers: Object.values(req.body)})
                res.sendStatus(200)
            })
            .catch(e => res.send(app.locals.sendError({error: 500, message: e.message})))
    });


};
