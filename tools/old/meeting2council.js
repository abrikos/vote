import Mongoose from "server/db/Mongoose";
async function main(){
    await Mongoose.council.deleteMany();
    const models = await  Mongoose.meeting.find().populate('division')
    for(const m of models){
        const rest = new Mongoose.council(m.toJSON());
        console.log(rest)
        await rest.save();
    }
    Mongoose.close()
}

main()
