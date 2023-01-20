"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
async function connect() {
    const DB_CONNECTION = 'mongodb+srv://krishnendudakshi:SvPAWghO2zmBLL1X@testcluster.mcb49vu.mongodb.net/Fintech?retryWrites=true&w=majority';
    try {
        await mongoose_1.default.connect(DB_CONNECTION);
        console.log("Database is connected");
    }
    catch (e) {
        console.log(e);
        process.exit(1);
    }
}
exports.default = connect;
//# sourceMappingURL=db.js.map