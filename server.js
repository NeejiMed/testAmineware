const express = require('express');
const multer = require('multer');
const fs = require('fs');
const app = express();
const upload = multer({ dest: './results' });

const port = 3000;

app.post('/upload', upload.single('file'), (req, res) => {
    try {
        var list = fs.readFileSync(req.file.path, 'utf8').trim().split('\n').map((element) => element.trim());

        const orderedList = list.sort((a, b) => a[0]+a[9]+a.slice(1,9) > b[0]+b[9]+b.slice(1,9) ? 1 : -1)
    
        fs.writeFileSync('orderedList.txt', orderedList.join('\n'));
        res.download('orderedList.txt');
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
    console.log(`Server is running on Port: ${port}`);
});