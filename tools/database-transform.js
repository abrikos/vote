import Mongoose from "server/db/Mongoose";
async function main(){
    return
    const upd = await  Mongoose.division.updateMany({},{$set:{persons:[]}});
    console.log(upd)
    const persons = await  Mongoose.person.find().populate('division')
    for(const p of persons){
        if(!p.division) continue;
        console.log(p.fio)
        p.division.persons.push(p)
        await p.division.save();
    }
    Mongoose.close()
}

main()
