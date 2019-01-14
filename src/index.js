import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

import auth from './routes/auth';
import register from './routes/register/register';

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect(process.env.MONGODB_URL);

app.use('/api/auth', auth);
app.use('/api/users/register', register);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(8081, () => console.log('Running on localhost:8081'));
