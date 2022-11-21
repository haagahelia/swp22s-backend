import express from "express";
import cors from "cors";
import fileupload from "express-fileupload";
import dotenv from "dotenv";

import router from "./routes/api/index.js";
import logger from "./utils/logger.js";
export const our_logger = logger;

dotenv.config({});

const app = express();
//library

app.use(express.json());
app.use(cors());
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

//Test localhost:8787 8777 or so from browser
app.get("/", (_, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.use(process.env.BE_API_URL_PREFIX, router);

const PORT = process.env.BE_SERVER_PORT || 8777;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
