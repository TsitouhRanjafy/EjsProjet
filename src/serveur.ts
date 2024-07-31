import express, { Application , Request , Response } from 'express'
import path from 'path'


const PORT = 4000
const app : Application = express();

app.set('view engine', 'ejs');

// Utilisation de render
app.get('/',(req : Request, res : Response)=> {
    // definier le donnée à envoyer
    const data = {
        greeting: 'Hello',
        name: 'Tsitohaina'
    };
    // render fichier index.ejs et le donnée
    res.render('index', data);
    console.log(`File Sent is : index.ejs avec le donnée ${data}`);
    
})

// Utilisation de sendFile
app.get('/file', function (req, res, next) {
    const cheminStatic = {
        root: path.join(__dirname,'../public')
    };
    
    // chemin de notre fichier
    const file = 'file.txt';
    // envoyer le fichier 
    res.sendFile(file, cheminStatic,(error) =>{
        if (error) {
            next(error);
        } else {
            console.log(`File Sent is : ${file}`);
        }
    });
});

app.set('views',path.join(__dirname,'../public'));

app.listen(PORT, () =>{
    console.log(`PORT : ${PORT}`);
})

