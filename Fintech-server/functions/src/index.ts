import app from './app';

import * as functions from 'firebase-functions';


export const aagman = functions.region('asia-south1').https.onRequest(app);