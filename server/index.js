// рабочая версия
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const cors = require('cors');
const tokenGenerator = require('uuid-token-generator');
const Database = require('./db');
const morgan = require('morgan')
const {v4: uuidv4} = require('uuid');

const PORT = process.env.PORT || 15000;
const app = express();
const cp = require('child_process');
const filenameGenerator = new tokenGenerator()

// to support JSON-encoded bodies
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json());
app.use(cors());
// to support URL-encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
}));

function generateV4UUID(_request) {
    console.log('test: ', uuidv4())
    return uuidv4();
}

const generator = generateV4UUID;
const headerName = 'X-Request-Id';
const setHeader = true;
const ATTRIBUTE_NAME = 'id';

app.use(function (request, response, next) {
    const oldValue = request.get(headerName);
    const id = oldValue === undefined ? generator(request) : oldValue;

    if (setHeader) {
        response.set(headerName, id);
    }

    request[ATTRIBUTE_NAME] = id;

    next();
});

app.use(
    morgan(
        "[:date[iso] ] Started :method :url for :remote-addr",
        {
            immediate: true
        }
    )
)

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const db = new Database();

const upload = multer();

app.get('/api-github/user/pavellap', (req, res) => {
    res.send('dat')
})

app.post('/audio', upload.any(), function (req, res) {
    console.log('got request')
    const hash = filenameGenerator.generate()
    const filename = `audios/${hash}.wav`
    console.log('okay lets go')
    fs.writeFileSync(filename, req.files[0].buffer, err => {
        if (err)
            console.log(err)
    });
    db.insertUnprocessedEntry(hash, Math.random() * 10);
    console.log('script')
    cp.exec(`python3 ./network/main.py ${filename}`, ((error, stdout) => {
        try {
            const parsed = JSON.parse(stdout.replaceAll('\'', '\"'));
            db.updateEmotion(hash, parsed.emotion);
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