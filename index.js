import cors from 'cors';
import express from "express";
import dotenv from "dotenv";

import {API_PREFIX} from "./constants.js";
import {gamesRouter} from "./routes/gameRouter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.use(API_PREFIX, gamesRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})