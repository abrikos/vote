//import moment from "moment";
import transliterate from "transliterate";
import moment from "moment";

const modelLabel = 'Голосование';
const path = 'question'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema({
        name: {type: String, label: 'Вопрос голосования', control: 'markdown'},
        votes: [{type: Number}],
        vote: {type: mongoose.Schema.Types.ObjectId, ref: 'vote'},
        photo: {type: mongoose.Schema.Types.ObjectId, ref: 'File'},
        files: [{type: mongoose.Schema.Types.ObjectId, ref: 'File'}],
    },
    {
        timestamps: {createdAt: 'createdAt'},
        toObject: {virtuals: true},
        // use if your results might be retrieved as JSON
        // see http://stackoverflow.com/q/13133911/488666
        toJSON: {virtuals: true}
    });


modelSchema.statics.population = [
    'photo', 'files', 'vote'
];

modelSchema.statics.populationAdmin = [
    'photo', 'files', 'vote'
];

modelSchema.formOptions = {
    label: modelLabel,
    listOrder: {name: 1},
    listFields: ['name'],
    searchFields: ['name'],
}

modelSchema.virtual('date')
    .get(function () {
        return moment(this.createdAt).format('YYYY-MM-DD HH:mm:ss')
    })
    .set(function (val) {
        this.createdAt = moment(val).format('YYYY-MM-DD HH:mm:ss');

    });


modelSchema.virtual('adminLink')
    .get(function () {
        return `/admin/${path}/${this.id}/update`
    });

modelSchema.virtual('for')
    .get(function () {
        return this.votes.filter(v => v).length
    });
modelSchema.virtual('against')
    .get(function () {
        return this.votes.filter(v => !v).length
    });

modelSchema.virtual('photoPath')
    .get(function () {
        return this.photo ? this.photo.path : '/noImage.png'
    });


modelSchema.virtual('link')
    .get(function () {
        return `/${path}/` + this.id + '/-' + (this.name ? transliterate(this.name).replace(/[^a-zA-Z0-9]/g, '-') : '')
    });

modelSchema.virtual('shareLink')
    .get(function () {
        return `/api/${path}/share/` + this.id + '/' + (this.name ? transliterate(this.name).replace(/[^a-zA-Z0-9]/g, '-') : '')
    });


export default mongoose.model(path, modelSchema)


