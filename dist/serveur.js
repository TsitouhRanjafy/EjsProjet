"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const PORT = 4000;
const app = (0, express_1.default)();
app.set('view engine', 'ejs');
// Utilisation de render
app.get('/', (req, res) => {
    // definier le donnée à envoyer
    const data = {
        greeting: 'Hello',
        name: 'Tsitohaina'
    };
    // render fichier index.ejs et le donnée
    res.render('index', data);
    console.log(`File Sent is : index.ejs avec le donnée ${data}`);
});
// Utilisation de sendFile
app.get('/file', function (req, res, next) {
    const cheminStatic = {
        root: path_1.default.join(__dirname, '../public')
    };
    // chemin de notre fichier
    const file = 'file.txt';
    // envoyer le fichier 
    res.sendFile(file, cheminStatic, (error) => {
        if (error) {
            next(error);
        }
        else {
            console.log(`File Sent is: ${file}`);
        }
    });
});
app.set('views', path_1.default.join(__dirname, '../public'));
app.listen(PORT, () => {
    console.log(`PORT : ${PORT}`);
});
