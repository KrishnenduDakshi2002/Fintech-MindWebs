import express from 'express';
import config from 'config';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import helmet from 'helmet';
import connect from './DB/db';
import { router } from './router';

const app = express();


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use('/api',router);

app.listen(3000,()=>{
    console.log(`server running at http://localhost:${3000}`);
    connect();

});
