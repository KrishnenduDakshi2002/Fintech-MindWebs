import express from 'express';
import config from 'config';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import helmet from 'helmet';
const app = express();


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());

app.get('/',(req,res)=>{
    res.send(200);
})

app.listen(3000,()=>{

    console.log(`server running at http://localhost:${3000}`);

});
