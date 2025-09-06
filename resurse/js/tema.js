window.addEventListener("load", function() {
    const temaSalvata = localStorage.getItem("tema");
    if (temaSalvata) {
        document.body.classList.remove("light", "contrast", "dark");

        if (["light", "contrast", "dark"].includes(temaSalvata)) {
            document.body.classList.add(temaSalvata);

            const radio = document.querySelector(`input[name="tema"][value="${temaSalvata}"]`);
            if (radio) radio.checked = true;
        }

    } else {
        const standardRadio = document.querySelector('input[name="tema"][value=""]');
        if (standardRadio) standardRadio.checked = true;
    }
});