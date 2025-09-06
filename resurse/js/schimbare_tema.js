window.addEventListener("load", function() {
    const temaRadios = document.querySelectorAll('input[name="tema"]');

    temaRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            document.body.classList.remove('light', 'contrast', 'dark');
            if (radio.value) {
                document.body.classList.add(radio.value);
                localStorage.setItem('tema', radio.value);
            } else {
                localStorage.removeItem('tema');
            }
        });
    });
});