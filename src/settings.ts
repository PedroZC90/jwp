import fs from "fs";
import path from "path";
import dotenv from "dotenv";

import { ServerSettings } from "./types";

const env: string = process.env.NODE_ENV || "development";
const production: boolean = (env === "production");
const development: boolean = !production;

const filename: string = `${ (development) ? ".example" : "" }.env`;
const filepath: string = path.join(process.cwd(), filename);

if (fs.existsSync(filepath)) {
    console.log(`Using ${filename} file to supply environment variables.`);
    dotenv.config({ path: filepath });
}

const MONGODB_HOST = process.env.MONGODB_HOST;
const MONGODB_PORT = Number(process.env.MONGODB_PORT) || undefined;
const MONGODB_USERNAME = process.env.MONGODB_USERNAME;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
const MONGODB_DATABASE = process.env.MONGODB_DATABASE;

const settings: ServerSettings = {
    __dirname: __dirname,
    __outdir: path.join(__dirname, ".."),
    name: process.env.APP_NAME || "default",
    version: process.env.APP_VERSION || "none",
    env,
    production,
    development,
    http: {
        port: Number(process.env.PORT) || 9000,
        https: false
    },
    mongoose: {
        url: process.env.MONGODB_URL || `mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}:${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DATABASE}`,
        host: MONGODB_HOST,
        port: MONGODB_PORT,
        user: MONGODB_USERNAME,
        pass: MONGODB_PASSWORD,
        dbName: MONGODB_DATABASE,
        autoCreate: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
};

console.log("Server Settings:", settings);

export default settings;
