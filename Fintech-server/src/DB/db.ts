
import mongoose from 'mongoose';

async function connect(){
    const DB_CONNECTION = 'mongodb+srv://krishnendudakshi:SvPAWghO2zmBLL1X@testcluster.mcb49vu.mongodb.net/Fintech?retryWrites=true&w=majority'

    try {
        await mongoose.connect(DB_CONNECTION);
        console.log("Database is connected");
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
}

export default connect;