const express = require("express");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");
const sass = require("sass");
<<<<<<< HEAD
=======
const pg = require("pg");

const Client = pg.Client;
client = new Client({
    database: "Proiect TW 2025",
    user: "Edi",
    password: "Edi",
    host: "localhost",  
    port: 5432
});
client.connect();
>>>>>>> df6433f (Versiunea finală a proiectului)

console.log("Folderul proiectului este:", __dirname);
console.log("Calea fișierului index.js este:", __filename);
console.log("Folderul curent de lucru este:", process.cwd());

const app = express();
app.set("view engine", "ejs");

obGlobal = {
    obErori: null,
    obImagini: null,
    folderScss: path.join(__dirname, "resurse/scss"),
    folderCss: path.join(__dirname, "resurse/css"),
<<<<<<< HEAD
    folderBackup: path.join(__dirname, "backup")
=======
    folderBackup: path.join(__dirname, "backup"),
    optiuniMeniu: null
>>>>>>> df6433f (Versiunea finală a proiectului)
}
vect_foldere = ["temp", "backup"];
for (let folder of vect_foldere) {
    let caleFolder = path.join(__dirname, folder);
    if (!fs.existsSync(caleFolder)) {
        fs.mkdirSync(caleFolder);
    }
}
<<<<<<< HEAD
=======
client.query("SELECT * FROM UNNEST(ENUM_RANGE(NULL::categ_oferta))", function (err, rezCateg) {
    if (err)
        afisareEroare(err, 2);
    else
        obGlobal.optiuniMeniu = rezCateg.rows;
})
>>>>>>> df6433f (Versiunea finală a proiectului)

function compileazaScss(caleScss, caleCss) {
    if (!caleCss) {
        let numFisBnm = path.basename(caleScss);
        let numFis = numFisBnm.split(".")[0];
        caleCss = numFis.concat(".css");
    }
    if (!path.isAbsolute(caleScss))
        caleScss = path.join(obGlobal.folderScss, caleScss);
    if (!path.isAbsolute(caleCss))
        caleCss = path.join(obGlobal.folderCss, caleCss);
    let caleBackup = path.join(obGlobal.folderBackup, "resurse/css");
    if (!fs.existsSync(caleBackup))
        fs.mkdirSync(caleBackup, { recursive: true });
    let d = new Date();
    let numFisCss = path.basename(caleCss);
    let numFis = numFisCss.split(".")[0];
<<<<<<< HEAD
    numFis = numFis.concat(String(d.getFullYear()), String(d.getMonth()+1), String(d.getDate()), String(d.getHours()), String(d.getMinutes()), String(d.getSeconds()));
=======
    numFis = numFis.concat("_", String(d.getFullYear()), String(d.getMonth()+1), String(d.getDate()), String(d.getHours()), String(d.getMinutes()), String(d.getSeconds()));
>>>>>>> df6433f (Versiunea finală a proiectului)
    numFisCss = numFis.concat(".css");
    if (fs.existsSync(caleCss)){
        try{
            fs.copyFileSync(caleCss, path.join(caleBackup, numFisCss));
        }
        catch(error){
            console.log("A apărut o eroare în timpul copierii fișierelor CSS!")
        }
    }
    rez = sass.compile(caleScss, { sourceMap: true });
    fs.writeFileSync(caleCss, rez.css);
}
vect_fisiere = fs.readdirSync(obGlobal.folderScss);
for (let numFis of vect_fisiere) {
    if (path.extname(numFis) == ".scss")
        compileazaScss(numFis);
}
fs.watch(obGlobal.folderScss, function (eveniment, numFis) {
    if (eveniment == "change" || eveniment == "rename") {
        let cale = path.join(obGlobal.folderScss, numFis);
        if (fs.existsSync(cale))
            compileazaScss(cale);
    }
})

function initErori() {
    let continut = fs.readFileSync(path.join(__dirname, "resurse/json/erori.json")).toString("utf-8");
    obGlobal.obErori = JSON.parse(continut);
    obGlobal.obErori.eroare_default.imagine = path.join(obGlobal.obErori.cale_baza, obGlobal.obErori.eroare_default.imagine);
    for (let eroare of obGlobal.obErori.info_erori) {
        eroare.imagine = path.join(obGlobal.obErori.cale_baza, eroare.imagine);
    }
}
initErori();

function initImagini() {
    let continut = fs.readFileSync(path.join(__dirname, "resurse/json/galerie.json")).toString("utf-8");
    obGlobal.obImagini = JSON.parse(continut);
    let vImagini = obGlobal.obImagini.imagini;
    let caleAbs = path.join(__dirname, obGlobal.obImagini.cale_galerie);
    let caleAbsMediu = path.join(__dirname, obGlobal.obImagini.cale_galerie, "mediu");
    let caleAbsMic = path.join(__dirname, obGlobal.obImagini.cale_galerie, "mic");
    fs.rmSync(caleAbsMediu, {recursive: true, force: true});
    fs.rmSync(caleAbsMic, {recursive: true, force: true});
    fs.mkdirSync(caleAbsMediu);
    fs.mkdirSync(caleAbsMic);
    for (let imagine of vImagini) {
        [numeFis, ext] = imagine.fisier_imagine.split(".");
        if (numeFis.split(" ").length > 1)
            numeFis = numeFis.split(" ").join("_");
        let caleFisAbs = path.join(caleAbs, imagine.fisier_imagine);
        let caleFisMediuAbs = path.join(caleAbsMediu, numeFis + ".webp");
        sharp(caleFisAbs).resize(300).toFile(caleFisMediuAbs);
        imagine.fisier_mediu = path.join("/", obGlobal.obImagini.cale_galerie, "mediu", numeFis + ".webp");
        let caleFisMicAbs = path.join(caleAbsMic, numeFis + ".webp");
        sharp(caleFisAbs).resize(150).toFile(caleFisMicAbs);
        imagine.fisier_mic = path.join("/", obGlobal.obImagini.cale_galerie, "mic", numeFis + ".webp");
        imagine.fisier_imagine = path.join("/", obGlobal.obImagini.cale_galerie, imagine.fisier_imagine)
    }
}
initImagini();

function afisareEroare(res, identificator, titlu, text, imagine) {
    let eroare = obGlobal.obErori.info_erori.find(function (elem) {
        return elem.identificator == identificator;
    });
    if (eroare) {
        if (eroare.status)
            res.status(identificator);
        var titluCustom = titlu || eroare.titlu;
        var textCustom = text || eroare.text;
        var imagineCustom = imagine || eroare.imagine;
    }
    else {
        var err = obGlobal.obErori.eroare_default;
        var titluCustom = titlu || err.titlu;
        var textCustom = text || err.text;
        var imagineCustom = imagine || err.imagine;
    }
    res.render("pagini/eroare", {
        titlu: titluCustom,
        text: textCustom,
        imagine: imagineCustom
    })
}

<<<<<<< HEAD
=======
app.use(/.*/, function (req, res, next) {
    res.locals.optiuniMeniu = obGlobal.optiuniMeniu;
    next();
});
>>>>>>> df6433f (Versiunea finală a proiectului)
app.use("/resurse", express.static(path.join(__dirname, "resurse")));
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

app.get("/favicon.ico", function (req, res) {
    res.sendFile(path.join(__dirname, "/resurse/ico/favicon.ico"));
});

app.get(["/", "/index", "/home"], function (req, res) {
    res.render("pagini/index", { ip: req.ip, imagini: obGlobal.obImagini.imagini });
});

// Am separat această cerere de cererile generice întrucât trebuia să trimit obiectul cu atributul imagini.
app.get("/galerieStatica", function (req, res) {
    res.render("pagini/galerieStatica", { imagini: obGlobal.obImagini.imagini });
});

app.get("/galerieAnimata", function (req, res){
    const arr = [4, 9, 16];
    const nr = arr[Math.floor(Math.random() * 3)];
    const n = Math.sqrt(nr);
    vctImagini = obGlobal.obImagini.imagini;

    // Selectăm fotografiile care au numele mai scurt de 26 de caractere
    for (let imagine of vctImagini) {
        if (imagine.nume_poza.length > 26) {    // Rămân 18 fotografii
            let index = vctImagini.indexOf(imagine);
            if (index > -1) {
                vctImagini.splice(index, 1);
            }
        }
    }
    
    // Amestecăm aleatoriu fotografiile din vector
    for (let i = 0; i < vctImagini.length; i++) {
        let j = Math.floor(Math.random() * (i+1));
        [vctImagini[i], vctImagini[j]] = [vctImagini[j], vctImagini[i]];
    }
    vctImagini = vctImagini.slice(0, nr);   // S-a remarcar un comportament dubios cu vctImagini.splice(nr)

    // Stabilim ordinea de afișare
    const arr4 = [[1, 3], [4, 2]];
    const pct4 = ["0%", "100%"];
    const arr9 = [[1, 3, 2], [7, 4, 5], [9, 8, 6]];
    const pct9 = ["0%", "50%", "100%"];
    const arr16 = [[2, 7, 5, 9], [4, 3, 1, 6], [8, 12, 13, 10], [11, 14, 16, 15]];
    const pct16 = ["0%", "33.3333333333%", "66.6666666666%", "100%"];
    const dictArr = {4: arr4, 9: arr9, 16: arr16};
    const dictPct = {4: pct4, 9: pct9, 16: pct16};
    ordine = [];
    for (let cnt = 1; cnt <= nr; cnt++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (dictArr[nr][i][j] == cnt) {
                    cooordonata = "".concat("(", String(dictPct[nr][j]), " ", String(dictPct[nr][i]), ")");
                    ordine.push(cooordonata);
                    i = n;
                    j = n;
                }
            }
        }
    }

    // Facem inserție în SCSS
    variabile = "$n: ".concat(String(n), ";\n");
    variabile = variabile.concat("$centru: ".concat(String(ordine), ";"));
    let continut = fs.readFileSync(path.join(obGlobal.folderScss, "galerie_animata.scss"), "utf8");
    const updated = continut.replace(/(\/\/ ==== dynamic-vars start ====)([\s\S]*?)(\/\/ ==== dynamic-vars end ====)/, `$1\n${variabile}\n$3`);
    fs.writeFileSync(path.join(obGlobal.folderScss, "galerie_animata.scss"), updated, "utf8");
    compileazaScss("galerie_animata.scss");

    res.render("pagini/galerieAnimata", { vctImagini });
});

<<<<<<< HEAD
=======
app.get("/produse", async (req, res) => {
    var condQuery = "";
    if (req.query.categorie)
        condQuery = ` WHERE categorie='${req.query.categorie}'`;

    queryCateg = "SELECT * FROM UNNEST(ENUM_RANGE(NULL::categ_oferta))";
    querySubCateg = "SELECT * FROM UNNEST(ENUM_RANGE(NULL::subcateg_oferta))";
    try {
        const categ = await client.query(queryCateg);
        const subcateg = await client.query(querySubCateg);
        const produse = await client.query("SELECT * FROM produse" + condQuery + " ORDER BY id ASC");
        const minOre = await client.query("SELECT MIN(total_ore) FROM produse" + condQuery);
        const maxOre = await client.query("SELECT MAX(total_ore) FROM produse" + condQuery);
        const localitati = await client.query("SELECT ARRAY_AGG(DISTINCT localitate ORDER BY localitate) AS localitati FROM produse" + condQuery);
        const vctSubcateg = await client.query("SELECT ARRAY_AGG(DISTINCT subcategorie::text ORDER BY subcategorie::text) AS vctsubcateg FROM produse" + condQuery);
        const status = await client.query("SELECT ARRAY_AGG(DISTINCT val ORDER BY val) AS status FROM ( SELECT CASE WHEN accepta_voluntari = TRUE THEN 'Da' ELSE 'Nu' END AS val FROM produse" + condQuery + ")");
        const minLocuri = await client.query("SELECT MIN(nr_locuri) FROM produse" + condQuery);
        const maxLocuri = await client.query("SELECT MAX(nr_locuri) FROM produse" + condQuery);

        res.render("pagini/produse", { 
            produse: produse.rows, 
            categorii: categ.rows, 
            subcategorii: subcateg.rows,
            minOre: minOre.rows[0].min,
            maxOre: maxOre.rows[0].max,
            localitati: localitati.rows[0].localitati || [],
            vctSubcateg: vctSubcateg.rows[0].vctsubcateg || [],
            status: status.rows[0].status || [],
            minLocuri: minLocuri.rows[0].min,
            maxLocuri: maxLocuri.rows[0].max
        });
    }
    catch (err) {
        afisareEroare(res, 2);
    }
});

app.get("/produs/:id/:categorie", function (req, res) {
    client.query(`SELECT * FROM produse WHERE id=${req.params.id}`, function (err, rez) {
        if (err)
            afisareEroare(res, 2);
        else {
            if (rez.rowCount == 0) 
                afisareEroare(res, 404);
            else {
                client.query(`SELECT * FROM produse WHERE categorie='${req.params.categorie}'`, function (errCateg, rezCateg) {
                    if (errCateg) 
                        afisareEroare(res, 2);
                        
                    else
                        res.render("pagini/produs", { produs: rez.rows[0], sugestii: rezCateg.rows });
                })
            }
        }
    });
})

>>>>>>> df6433f (Versiunea finală a proiectului)
app.get(/.*.ejs/, function (req, res) {
    afisareEroare(res, 400);
});

app.get(/^\/resurse\/[a-zA-Z0-9_\/]*$/, function (req, res) {
    afisareEroare(res, 403);
});

app.get(/.*/, function (req, res) { // "*" dă eroare la path-to-regexp
    try {
        res.render("pagini" + req.url, function (err, rezultatRandare) {
            if (err) {
                if (err.message.startsWith("Failed to lookup view")) {
                    afisareEroare(res, 404);
                }
                else {
                    afisareEroare(res);
                }
            }
            else {
                res.send(rezultatRandare);
            }
        });
    }
    catch (errRandare) {
        if (errRandare.message.startsWith("Cannot find module")) {
            afisareEroare(res, 404);
        }
        else {
            afisareEroare(res);
        }
    }
});

app.listen(8080);
console.log("Serverul a pornit!");