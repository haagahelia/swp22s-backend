import express from 'express';
import cors from 'cors';
import fileupload from 'express-fileupload';
import dotenv from 'dotenv';

import { logger } from "./utils/logger.js";
import signatureRouter from "./routes/api/signatures.js";

dotenv.config({});

const app = express();

app.use(express.json());
app.use(cors());
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

//Test localhost:8787 8777 or so from browser
app.get("/", (_, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.use(process.env.BE_API_URL_PREFIX + "/signatures", signatureRouter);

const PORT = process.env.PORT || 8787
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})