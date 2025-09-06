function afisareRezultat(n) {
    document.getElementsByClassName("rezultat")[0].innerHTML = n;
};

function afisareMesaj(n) {
    if (!n) {
        if (!document.getElementById("rezultat-filtrare")) {
            let pRez = document.createElement("p");
            pRez.innerHTML = "Nu au fost găsite oferte de voluntariat! :(";
            pRez.id = "rezultat-filtrare";
            loc = document.getElementsByClassName("grid-produse")[0];
            loc.parentElement.insertBefore(pRez, loc.nextElementSibling);
        }
    }
    else {
        if (document.getElementById("rezultat-filtrare"))
            document.getElementById("rezultat-filtrare").remove();
    }
}

function filtreazaProduse() {
    // PRELUARE DATE FORMULAR
    let inpNume = normalizeazaText(document.getElementById("inp-nume").value.trim().toLowerCase());
    let inpNrOre = document.getElementById("inp-nr-ore").value;
    let inpLocalitate = normalizeazaText(document.getElementById("inp-localitate").value);
    let inpSubcateg = null;
    let vctSubcategRadio = document.getElementsByName("subcateg_rad");
    for (let subcategRadio of vctSubcategRadio) {
        if (subcategRadio.checked) {
            inpSubcateg = subcategRadio.value;
            break;
        }
    }
    let inpCateg = [];
    let vctCategChck = document.getElementsByName("categ_chck");
    for (let categChck of vctCategChck) {
        if (categChck.checked)
            inpCateg.push(categChck.value);
    }
    let inpDescriere = normalizeazaText(document.getElementById("inp-descriere").value.trim().toLowerCase());
    let cuvPlus = [];
    let cuvMinus = [];
    let i = 0;
    while (i < inpDescriere.length) {
        if (inpDescriere[i] == "+" || inpDescriere[i] == "-") {
            let cuv = [];
            let j = i+1;
            while ((inpDescriere[j] != "+") && (inpDescriere[j] != "-") && (inpDescriere[j] != " ") && (j < inpDescriere.length)) {
                cuv.push(inpDescriere[j]);
                j++;
            }
            if (cuv.length > 0) {
                if (inpDescriere[i] == "+")
                    cuvPlus.push(cuv.join(""));
                else
                    cuvMinus.push(cuv.join(""));
            }
        }
        i++;
    }
    let inpStatus = document.getElementById("inp-status").value;
    let inpNrLocuriMultiplu = [];
    for (let optiune of document.getElementById("inp_multiplu-nr-locuri"))
        if (optiune.selected)
            inpNrLocuriMultiplu.push(optiune.value);

    cnt = 0;
    let produse = document.getElementsByClassName("produs");
    for (let produs of produse) {
        if (produs.getElementsByClassName("chck-mentine")[0].checked)
            continue;
        produs.style.display = "none";
        if (sessionStorage.getItem("produse-interzise") && sessionStorage.getItem("produse-interzise").includes(produs.id))
            continue;
        // PRELUARE DATE PRODUSE
        let nume = normalizeazaText(produs.getElementsByClassName("val-nume")[0].innerHTML.trim().toLowerCase());
        let nrOre = produs.getElementsByClassName("val-ore")[0].innerHTML;
        let localitate = normalizeazaText(produs.getElementsByClassName("val-localitate")[0].innerHTML);
        let nrLocuri = produs.getElementsByClassName("val-locuri")[0].innerHTML;
        let subCateg = produs.getElementsByClassName("val-subcategorie")[0].innerHTML;
        let categ = produs.getElementsByClassName("val-categorie")[0].innerHTML;
        let descriere = normalizeazaText(produs.getElementsByClassName("val-descriere")[0].innerHTML.toLowerCase());
        let status = produs.getElementsByClassName("val-status")[0].innerHTML;
        // VERIFICARE CONDIȚII
        let cond1 = (nume.includes(inpNume));
        let cond2 = (parseInt(nrOre) <= parseInt(inpNrOre));
        let cond3 = true;
        if (inpLocalitate)
            cond3 = (localitate == inpLocalitate);
        let cond4 = null;
        if (inpSubcateg == "toate")
            cond4 = true;
        else
            cond4 = (subCateg == inpSubcateg);
        let cond5 = true;
        if (inpCateg.length > 0)
            cond5 = (inpCateg.includes(categ));
        let cond6 = true;
        let gasitCuvPlus = false;
        for (cuv of cuvPlus) {
            if (descriere.includes(cuv)) {
                gasitCuvPlus = true;
                break;
            }
        }
        if ((cuvPlus.length > 0) && !gasitCuvPlus) 
            cond6 = false;
        else {            
            for (cuv of cuvMinus) {
                if (descriere.includes(cuv)) {
                    cond6 = false;
                    break;
                }
            }
        }
        let cond7 = true;
        if (inpStatus != "toate")
            cond7 = (status == inpStatus);
        let cond8 = true;
        if (inpNrLocuriMultiplu.length > 0) {
            cond8 = false;            
            for (let interval of inpNrLocuriMultiplu) {
                st = parseInt(interval.split(":")[0]);
                dr = parseInt(interval.split(":")[1]);
                if ((nrLocuri >= st) && (nrLocuri <= dr)) {
                    cond8 = true;
                    break;
                }
            }
        }

        if (cond1 && cond2 && cond3 && cond4 && cond5 && cond6 && cond7 && cond8) {
            produs.style.display = "block";
            cnt++;
        }
    }
    afisareRezultat(cnt);
    afisareMesaj(cnt);
}

function sorteazaArticole(semn) {
        let produse = document.getElementsByClassName("produs");
        let vctProduse = Array.from(produse);
        vctProduse.sort(function(a, b) {
            nrLocuriA = a.getElementsByClassName("val-locuri")[0].innerHTML;
            nrLocuriB = b.getElementsByClassName("val-locuri")[0].innerHTML;
            if (nrLocuriA - nrLocuriB)
                return semn * (nrLocuriA - nrLocuriB);
            localitateA = a.getElementsByClassName("val-localitate")[0].innerHTML.trim().toLowerCase();
            localitateB = b.getElementsByClassName("val-localitate")[0].innerHTML.trim().toLowerCase();
            return semn * localitateA.localeCompare(localitateB);
        });
        for (let produs of vctProduse) 
            produs.parentNode.appendChild(produs);
    }

function evalueazaButoane() {
    let btnsChck = document.getElementsByName("articol_chck");
    let cnt = 0;
    for(let btnChck of btnsChck)
        if (btnChck.checked)
            cnt++;
    if(cnt == 0) {
        document.getElementById("selectare").value = "1";
        document.getElementById("selectare").innerHTML = "<i class='bi bi-check-square-fill'></i><span class='d-none d-sm-block'> Selectează toate</span>";
    }
    if(cnt >= 1) {
        document.getElementById("selectare").value = "0";
        document.getElementById("selectare").innerHTML = "<i class='bi bi-check-square'></i><span class='d-none d-sm-block'> Deselectează toate</span>";
    }
}

function validareTextarea() {
    let textarea = document.getElementById("inp-descriere");
    let feedback = document.getElementById("descriereFeedback");
    let valid = true;

    if (textarea.value.replaceAll(" ", "")) {
        for (let cuv of textarea.value.trim().split(" ")) {
            if ((cuv[0] != "+") && (cuv[0] != "-")) {
                valid = false;
                break;
            }
        }
        if (valid) {
            textarea.classList.remove("is-invalid");
            textarea.classList.add("is-valid");
            feedback.style.display = "none";
        } else {
            textarea.classList.add("is-invalid");
            textarea.classList.remove("is-valid");
            feedback.style.display = "block";
        }
    }
    else {
        textarea.classList.remove("is-invalid");
        textarea.classList.remove("is-valid");
        feedback.style.display = "none";
    }
}

function normalizeazaText(text) {
    return text
        .normalize("NFD")              
        .replace(/[\u0300-\u036f]/g, "") 
        .toLowerCase();                
}

function marcareProduseIeftine() {
    let vctCateg = [];
    for (let btn of document.getElementsByName("categ_chck"))
        vctCateg.push(btn.value);
    for (let categ of vctCateg) {
        let produse = document.getElementsByClassName(categ);
        let min = 1000000;
        let prodMin =  "";
        for (let produs of produse) {
            if (parseInt(produs.getElementsByClassName("val-ore")[0].innerHTML) < min) {
                min = parseInt(produs.getElementsByClassName("val-ore")[0].innerHTML);
                prodMin = produs.id;
            }
        }
        let text = document.createElement("span");
        text.innerHTML = " - OFERTĂ ORE";
        text.style.color = "#ff3737";
        let loc = document.getElementById(prodMin).getElementsByClassName("val-nume")[0];
        loc.parentElement.insertBefore(text, loc.nextElementSibling);
        
        document.getElementById(prodMin).getElementsByClassName("ore")[0].style.backgroundColor = "#ff3737";
    }
}

function getAttributes(produs) {
    let nrLocuri = produs.getElementsByClassName("val-locuri")[0]?.innerText.trim();
    let nrOre = produs.getElementsByClassName("val-ore")[0]?.innerText.trim();
    let dataStart = produs.getElementsByClassName("val-data-inceput")[0]
        ?.querySelector("time")
        ?.getAttribute("datetime");
    let dataSfarsit = produs.getElementsByClassName("val-data-sfarsit")[0]
        ?.querySelector("time")
        ?.getAttribute("datetime");

    return {
        locuri: parseInt(nrLocuri, 10),
        ore: parseInt(nrOre, 10),
        dataStart: new Date(dataStart),
        dataSfarsit: new Date(dataSfarsit),
    };
}

function compareValues(a, b, order = "asc") {
    if (a instanceof Date && b instanceof Date) {
        a = a.getTime();
        b = b.getTime();
    }
    if (typeof a === "string") a = a.toLowerCase();
    if (typeof b === "string") b = b.toLowerCase();

    let cmp = 0;
    if (a < b) cmp = -1;
    if (a > b) cmp = 1;

    return order === "asc" ? cmp : -cmp;
}

function makeComparator(primaryKey, primaryOrder, secondaryKey, secondaryOrder) {
    return function (prodA, prodB) {
        let attrsA = getAttributes(prodA);
        let attrsB = getAttributes(prodB);

        let cmp1 = compareValues(attrsA[primaryKey], attrsB[primaryKey], primaryOrder);
        if (cmp1 !== 0) return cmp1;

        return compareValues(attrsA[secondaryKey], attrsB[secondaryKey], secondaryOrder);
    };
}

function aplicaSortare() {
    let key1 = document.getElementById("sortKey1").value;
    let order1 = document.querySelector('input[name="order1"]:checked').value;
    let key2 = document.getElementById("sortKey2").value;
    let order2 = document.querySelector('input[name="order2"]:checked').value;

    let vctProduse = Array.from(document.getElementsByClassName("produs"));
    vctProduse.sort(makeComparator(key1, order1, key2, order2));

    for (let produs of vctProduse) {
        produs.parentNode.appendChild(produs);
    }
}

window.onload = function() {
    document.getElementById("filtrare").onclick = function() {
        filtreazaProduse();
    }

    document.getElementById("resetare").onclick = function() {
        document.getElementById("inp-nume").value = "";
        document.getElementById("inp-nr-ore").value = document.getElementById("inp-nr-ore").max;
        document.getElementById("info-nr-ore").innerHTML = `(${document.getElementById("inp-nr-ore").max})`;
        document.getElementById("inp-localitate").value = "";
        let vctSubcategRadio = document.getElementsByName("subcateg_rad");
        for (let subcategRadio of vctSubcategRadio) {
            if (subcategRadio.value == "toate") {
                subcategRadio.checked = true;
                break;
            }
        }
        let vctCategChck = document.getElementsByName("categ_chck");
        for (let categChck of vctCategChck) 
            categChck.checked = false;
        document.getElementById("inp-descriere").value = "";
        validareTextarea();
        document.getElementById("inp-status").value = "toate";
        for (let optiune of document.getElementById("inp_multiplu-nr-locuri"))
            optiune.selected = false;

        let produse = document.getElementsByClassName("produs");
        for (let produs of produse) {
            produs.style.display = "block";
            afisareRezultat(produse.length);
        }
        if (document.getElementById("rezultat-filtrare"))
            document.getElementById("rezultat-filtrare").remove();        
    }

    document.getElementById("asc-nr-locuri-localitate").onclick = function() { sorteazaArticole(1); };
    document.getElementById("dsc-nr-locuri-localitate").onclick = function() { sorteazaArticole(-1); };

    document.getElementById("calculare").onclick = function() {
        let sumaLocuri = 0;
        for(let btn of document.getElementsByName("articol_chck")) {
            if(btn.checked && (document.getElementById(btn.value).style.display != "none"))
                sumaLocuri += parseInt(document.getElementById(btn.value).getElementsByClassName("val-locuri")[0].innerHTML);
        }
        if (!document.getElementById("rezultat-nr-locuri")) {        
            let bRez = document.createElement("b");
            bRez.innerHTML = sumaLocuri;
            let pRez = document.createElement("p");
            pRez.innerHTML = "Numărul de locuri este: ";
            pRez.appendChild(bRez);
            pRez.id = "rezultat-nr-locuri";
            loc = document.getElementsByClassName("butoane")[0];
            loc.parentElement.insertBefore(pRez, loc.nextElementSibling);
            setTimeout(function() {
                if (document.getElementById("rezultat-nr-locuri"))
                    document.getElementById("rezultat-nr-locuri").remove();
            }, 2000);
        }
    }
    document.getElementById("selectare").onclick = function() {
        if(parseInt(this.value)) {
            this.value = "0";
            this.innerHTML = "<i class='bi bi-check-square'></i><span class='d-none d-sm-block'> Deselectează toate</span>";
            for(let btn of document.getElementsByName("articol_chck")) {
                if (document.getElementById(btn.value).style.display != "none")
                    btn.checked = true;
            }
        }
        else {
            this.value = "1";
            this.innerHTML = "<i class='bi bi-check-square-fill'></i><span class='d-none d-sm-block'> Selectează toate</span>";
            for(let btn of document.getElementsByName("articol_chck")) {
                if (document.getElementById(btn.value).style.display != "none")
                    btn.checked = false;
            }
        }
    }

    let btnsChck = document.getElementsByName("articol_chck");
    for(let btnChck of btnsChck) {
        btnChck.addEventListener("change", function() {
            evalueazaButoane();
        });
    }  

    document.getElementById("inp-nr-ore").onmousemove = function () {
        document.getElementById("info-nr-ore").innerHTML = `(${this.value})`;
        filtreazaProduse();
    }

    document.getElementById("inp-descriere").addEventListener("blur", validareTextarea);
    //document.getElementById("inp-descriere").addEventListener("input", validareTextarea);

    document.getElementById("inp-nume").oninput = function () {
        filtreazaProduse();
    }

    document.getElementById("inp-localitate").oninput = function () {
        filtreazaProduse();
    }

    const btnsSubcateg = document.getElementsByName("subcateg_rad");
    btnsSubcateg.forEach(radio => {
        radio.addEventListener("change", (event) => {
            if (event.target.checked) {
                filtreazaProduse();
            }
        });
    });

    document.getElementById("inp-descriere").oninput = function () {
        validareTextarea();
        filtreazaProduse();
    }

    document.getElementById("inp-status").onchange = function () {
        filtreazaProduse();
    }

    document.getElementById("inp_multiplu-nr-locuri").onchange = function () {
        filtreazaProduse();
    }

    const btnsCateg = document.getElementsByName("categ_chck");
    btnsCateg.forEach(radio => {
        radio.addEventListener("change", (event) => {
            filtreazaProduse();
        });
    });

    document.querySelectorAll(".mentine-btn").forEach(btn => {
        btn.addEventListener("click", function () {
            const checkbox = this.previousElementSibling;
            checkbox.checked = !checkbox.checked;
            if (this.classList.toggle("active", checkbox.checked)) 
                document.getElementById(this.value).style.backgroundColor = "#20c997";
            else
                document.getElementById(this.value).style.backgroundColor = "var(--background-produs)";
        });
    });

    document.querySelectorAll(".sterge-btn").forEach(btn => {
        btn.addEventListener("click", function () {
            document.getElementById(this.value).style.display = "none";
            afisareRezultat(parseInt(document.getElementsByClassName("rezultat")[0].innerHTML) - 1);
        });
    });

    document.querySelectorAll(".sterge-definitiv-btn").forEach(btn => {
        btn.addEventListener("click", function () {
            document.getElementById(this.value).remove();
            afisareRezultat(parseInt(document.getElementsByClassName("rezultat")[0].innerHTML) - 1);
            let produseInterzise = sessionStorage.getItem("produse-interzise");
            if (produseInterzise) 
                sessionStorage.setItem("produse-interzise", produseInterzise + " " + this.value);
            else
                sessionStorage.setItem("produse-interzise", this.value);
        });
    });

    document.querySelectorAll(".produs").forEach(produs => {
        if (sessionStorage.getItem("produse-interzise") && sessionStorage.getItem("produse-interzise").includes(produs.id)) {
            produs.remove();
            afisareRezultat(parseInt(document.getElementsByClassName("rezultat")[0].innerHTML) - 1);
        }
    });

    document.querySelectorAll(".produs").forEach(card => {
        card.addEventListener("click", () => {
            document.getElementById("modal-nume").textContent = card.dataset.nume;
            document.getElementById("modal-categorie").textContent = card.dataset.categorie;
            document.getElementById("modal-subcategorie").textContent = card.dataset.subcategorie;
            document.getElementById("modal-descriere").textContent = card.dataset.descriere;
            document.getElementById("modal-nr_locuri").textContent = card.dataset.nr_locuri;
            document.getElementById("modal-total_ore").textContent = card.dataset.total_ore;
            document.getElementById("modal-ore_pe_zi").textContent = card.dataset.ore_pe_zi;
            document.getElementById("modal-localitate").textContent = card.dataset.localitate;
            document.getElementById("modal-abilitati").textContent = card.dataset.abilitati;
            document.getElementById("modal-data_inceput").textContent = new Date(card.dataset.data_inceput).toLocaleDateString("ro-RO");
            document.getElementById("modal-data_sfarsit").textContent = new Date(card.dataset.data_sfarsit).toLocaleDateString("ro-RO");
            document.getElementById("modal-accepta").textContent = card.dataset.accepta;
            document.getElementById("modal-imagine").src = card.dataset.imagine;
            document.getElementById("modal-imagine").alt = card.dataset.nume;

            document.getElementById("modal-produs").style.display = "flex";
        });
    });

    document.querySelector("#modal-produs .close").addEventListener("click", () => {
        document.getElementById("modal-produs").style.display = "none";
    });

    document.getElementById("modal-produs").addEventListener("click", (e) => {
        if (e.target === document.getElementById("modal-produs")) {
            document.getElementById("modal-produs").style.display = "none";
        }
    });

    marcareProduseIeftine();

    document.getElementById("applySort").addEventListener("click", aplicaSortare);
}