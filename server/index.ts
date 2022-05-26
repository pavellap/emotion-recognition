// рабочая версия
import bodyParser from "body-parser";
import multer from 'multer';
import * as fs from "fs";
import cors from 'cors';
const tokenGenerator = require('uuid-token-generator');
import Database from "./db";
import express from 'express';
import { getAudioDurationInSeconds } from 'get-audio-duration';
import * as path from "path";

const PORT = process.env.PORT || 15000;
const app = express();
const cp = require('child_process');
const filenameGenerator = new tokenGenerator()
app.use(express.static(__dirname + '/public'))
// to support JSON-encoded bodies
app.use(bodyParser.json());
app.use(cors());
// to support URL-encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const db = new Database();

const upload = multer();

export enum Emotions {
  angry = "angry",
  sad = "sad",
  neutral = "neutral",
  happy = "happy"
}

export enum Genders {
  male = 'male',
  female = 'female',
}

type RecognitionResultType = {
    emotion?: Emotions,
    gender?: Genders,
    success: boolean,
    reason?: 'silence' // todo: extend type
}

app.post('/audio', upload.any(), async (req, res) => {
    const hash = filenameGenerator.generate()
    const filename = `audios/${hash}.wav`
    // @ts-ignore
    fs.writeFileSync(filename, req.files[0].buffer);
    const length = await getAudioDurationInSeconds(filename);
    await db.insertUnprocessedEntry(hash, length);
    const targetFile = path.resolve(__dirname, `../${filename}`);
    const bufferFile = path.resolve(__dirname, `../audios/processed.wav`)
    cp.exec(`python3 ./network/main.py ${targetFile} ${bufferFile}`, ((error, stdout: string) => {
        try {
            console.log('stdout: ', stdout)
            const parsed: RecognitionResultType = JSON.parse(stdout.replaceAll('\'', '\"'));
            if (!parsed.success) {
                res.send({
                error: true
            })
            }
            db.updateResult(hash, {
                emotion: parsed.emotion,
                gender: parsed.gender
            });
            res.send({...parsed, error: false})
        } catch (e) {
            console.log('err parsed: ', e)
            res.send({
                error: true
            })
        }
    }))
});

app.listen(PORT, async () => {
    await db.connect();
    await db.createTable();
    console.log("Test server is running on port:", PORT)
})