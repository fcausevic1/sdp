const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 80;
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json()); 

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('sdpDB.db');

function instertTaskIntoDb() {
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS Users (name TEXT)");

    const stmt = db.prepare("INSERT INTO Users VALUES (?)");
    for (let i = 0; i < 1; i++) {
        stmt.run("Adnan");
        stmt.run("Amar");
        stmt.run("Amela");
        stmt.run("Adna");
        stmt.run("Amila");
        stmt.run("Nadja");
        stmt.run("Mujo");
        stmt.run("Goran");
        stmt.run("Damir");
        stmt.run("John");
        stmt.run("Faris");
        stmt.run("Milan");
        stmt.run("Slavko");
    }
    stmt.finalize();
    db.each("SELECT rowid AS id, name FROM Users", (err, row) => {
    });
});
}

async function getTasksFromDB(name) {
    return new Promise((resolve, reject)=>{
      console.log(name);
      db.all(`SELECT * FROM Users WHERE name= "${name}"` , (err, res) => {
        if(err){return reject(err);}
        resolve(res);
        console.log(res);
        });
    })
}
//
app.get('/', async (req,res) => {
 //instertTaskIntoDb();
  res.sendFile(__dirname + '/homePage.html');
})

app.post('/test', async (req, res) => {
  // instertTaskIntoDb();
  console.log("req body: ", req.body.inputData);
  const data = await getTasksFromDB(req.body.inputData);
  console.log("data: ", data)
  const htmlContent = `<div><h1>Data from the Server:</h1>${data.map(item => `<p>${item.name || 'Name not available'}</p>`).join('')}</div>`;
  // Send HTML as JSON
  res.json({ html: htmlContent });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
