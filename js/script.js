document.addEventListener('DOMContentLoaded', () => {

    const overlay = document.getElementById('modal-overlay');
    const modal = document.getElementById('modal-content');
    const modalText = document.getElementById('modal-text');
    const closeButton = document.getElementById('modal-close');

    const wszystkieKomorki = document.querySelectorAll('.div_container div');

    const logWiadomosci = document.getElementById('log-wiadomosci');

    function otworzModal(wiadomosc) {
        modalText.textContent = wiadomosc;
        overlay.classList.remove('modal-hidden');
        modal.classList.remove('modal-hidden');
    }

    function zamknijModal() {
        overlay.classList.add('modal-hidden');
        modal.classList.add('modal-hidden');
    }

    wszystkieKomorki.forEach(komorka => {
        komorka.addEventListener('click', () => {

            if (komorka.classList.contains('clicked')) {
                return;
            }

            const wiadomosc = komorka.dataset.wiadomosc;
            const numerKomorki = komorka.textContent.trim(); // Pobieramy numer

            let finalMessage;
            if (wiadomosc) {
                finalMessage = wiadomosc;
            } else {
                finalMessage = `Dla numeru ${numerKomorki} nie ma jeszcze wiadomości.`;
            }

            otworzModal(finalMessage);

            komorka.classList.add('clicked');
            const nowaWiadomosc = document.createElement('p');

            nowaWiadomosc.innerHTML = `<strong>Okienko ${numerKomorki}:</strong> ${finalMessage}`;
            logWiadomosci.appendChild(nowaWiadomosc);
            nowaWiadomosc.scrollIntoView({ behavior: 'smooth', block: 'end' });
        });
    });

    closeButton.addEventListener('click', zamknijModal);
    overlay.addEventListener('click', zamknijModal);

});