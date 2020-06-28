// рабочая версия
const express = require('express');
const bodyParser = require('body-parser');
const multer  = require('multer');
const fs = require('fs');
const cors = require('cors')
const tokenGenerator = require('uuid-token-generator')

const PORT = process.env.PORT || 3000;
const upload = multer();
const app = express();
const cp = require('child_process')
const filenameGenerator = new tokenGenerator()

app.use(express.static(__dirname + '/public'))
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(cors());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


let result;
app.post('/audio', upload.any(), function(req, res) {
    let formData = req.body;
    let files = req.files;
    const filename = `audios/${filenameGenerator.generate()}.wav`
    fs.writeFileSync(filename, req.files[0].buffer, err => {
        if (err)
            console.log(err)
    });
    /*cp.exec('python ./recognizer/work.py ' + filename + " audios/result.wav", ((error, stdout) => {
        result = stdout;
        console.log("Ошибка в питоне:", error);
        console.log("Stdout:", stdout)
        console.log('form data', formData, 'file' , files);
        res.send({result})
    }))*/
    setTimeout(() => {
        res.send({
            result: "Success",
        })
    }, 4000)

});

app.listen(PORT, () => {
    console.log("Test server is running on port:", PORT)
})