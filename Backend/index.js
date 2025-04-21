const express = require('express');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const cors = require('cors');
const multer = require('multer');

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.post('/generate-pdf', async (req, res) => {
    const latexCode = req.body.latex;
    console.log("Got request",latexCode);
  const filename = `resume_${Date.now()}`;
  const texPath = `/tmp/${filename}.tex`;
  const pdfPath = `/tmp/${filename}.pdf`;

  fs.writeFileSync(texPath, latexCode);

  exec(`latexmk -pdf -output-directory=/tmp ${texPath}`, (err, stdout, stderr) => {
    if (err) {
      return res.status(500).json({ error: 'Compilation failed', stderr });
    }

    res.download(pdfPath, 'resume.pdf', () => {
      fs.unlinkSync(texPath);
      fs.unlinkSync(pdfPath);
      fs.unlinkSync(`/tmp/${filename}.log`);
      fs.unlinkSync(`/tmp/${filename}.aux`);
      fs.unlinkSync(`/tmp/${filename}.fls`);
      fs.unlinkSync(`/tmp/${filename}.fdb_latexmk`);
    });
  });
});

app.listen(3001, () => console.log('Server running on port 3001'));
