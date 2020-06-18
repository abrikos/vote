import Mongoose from "server/db/Mongoose";
async function main(){
    const persons = await  Mongoose.person.find()
    for(const p of persons){
        console.log(p.fio, p.fname, p.mname, p.lname)
        const arr = p.fio.split(' ');
        p.fname = arr[0];
        p.mname = arr[1];
        p.lname = arr[2];
        try{
            await p.save()
        }catch (e) {
            console.log('ERROR', e.message)
        }

    }
    Mongoose.close()
}

main()
