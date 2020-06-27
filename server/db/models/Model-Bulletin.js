const path = 'bulletin'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema({
    hash: String,
    copied: Boolean,
    signed: Boolean,
    voted: Boolean,
    vote: {type: mongoose.Schema.Types.ObjectId, ref: 'vote'},
}, {
    //toObject: {virtuals: true},
    toJSON: {virtuals: true}
});

modelSchema.statics.population = [
    'vote'
];


export default mongoose.model(path, modelSchema)


