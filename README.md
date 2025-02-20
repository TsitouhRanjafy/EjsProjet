<img src="https://github.com/user-attachments/assets/ce3470c2-ced4-4411-b119-25d433735eb7" alt="ejs" width="250" height="250">
<img src="https://github.com/user-attachments/assets/a2cc4a73-4d70-4566-8ee5-2bb99f3d7bd0" alt="expressjs" width="250" >


# Express JS sendfile() vs render()

La fonction sendFile() dans Express.js est principalement utilisée pour envoyer le fichier au chemin donné tandis que 
la fonction render() est utilisée pour restituer une vue et envoyer la chaîne HTML au client en réponse. Dans cet article,
nous verrons la différence détaillée entre cette fonction avec leur syntaxe et leur mise en œuvre pratique.

## Installation

initialisez le `NPM` à l'aide de la commande ci-dessous.Le fichier package.json sera créé.

```shell
  npm init -y
```
Nous allons maintenant installer la dépendance nécessaire pour notre projet à l'aide des commandes suivant:
### `express` , `ejs` et `typescript`
```bash
  npm i express ejs typescript
```

### `@types`

```bash
  npm i --save-dev @types/express @types/ejs
```

## Configuration 

Structure : 
```
├── public/
│   ├── index.ejs
│   └── file.txt
└── src/
    └── serveur.js
```

 `package.json` :
```json
  {
  "name": "ejsvssendfile",
  "version": "1.0.0",
  "description": "Ejs() VS SendFile()",
  "main": "index.js",
  "scripts": {
    "test": "npx tsc && node ./dist/serveur.js"
  },
  "author": "Tsitohaina",
  "license": "ISC",
  "dependencies": {
    "@types/ejs": "^3.1.5",
    "@types/express": "^4.17.21",
    "ejs": "^3.1.10",
    "express": "^4.19.2",
    "typescript": "^5.5.4"
  }
}
```
initialiser typescript :
```
  tsc --init
```
```json
  {
  "compilerOptions": {
    "target": "es2022",                                  /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
    "module": "commonjs",                                /* Specify what module code is generated. */
    "outDir": "./dist/",                                   /* Specify an output folder for all emitted files. */
    "esModuleInterop": true,                             /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */
    "forceConsistentCasingInFileNames": true,            /* Ensure that casing is correct in imports. */

    "strict": true,                                      /* Enable all strict type-checking options. */
    "skipLibCheck": true                                 /* Skip type checking all .d.ts files. */
  },
  "include": ["./src/**/*.ts"],
}

```

`index.ejs` : 
```ejs
  <!-- views/index.ejs -->
<!DOCTYPE html>
<html lang=en>

<head>
    <title>Express Render Function</title>
</head>

<body>
    <h1>
        <%= greeting %>, <%= name %>!   
    </h1>
</body>

</html>

```

## Initialisation
La fonction sendFile() dans Express.js est utilisée pour envoyer le fichier en réponse à la requête HTTP effectuée par le client. 
Cette fonction prend le chemin absolu du fichier comme argument et le fichier qui est utilisé pour être envoyé au client.

Syntaxe: ` res.sendFile(chemin [, options] [, fn]) `

La fonction render() dans Express est utilisée pour générer les vues HTML dynamiques.
Il restitue principalement les fichiers modèles spécifiés en les combinant avec les données et en facilitant la création de pages Web dynamiques en réponse à la requête HTTP des clients.

Syntaxe: ` res.render(view, [locals], callback) `

Exemple : 
```javascript
/// app.js (main)
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

```

## Lancement

pour lancer notre serveur . Executer le commande ci-dessous.
```
  npm start
```






