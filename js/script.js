// script.js

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Elementy okna modalnego ---
    const overlay = document.getElementById('modal-overlay');
    const modal = document.getElementById('modal-content');
    const modalText = document.getElementById('modal-text');
    const closeButton = document.getElementById('modal-close');

    // --- 2. Elementy siatki (gridu) ---
    const wszystkieKomorki = document.querySelectorAll('.div_container div');

    // --- 3. NOWY ELEMENT: Kontener na logi ---
    const logWiadomosci = document.getElementById('log-wiadomosci');

    // --- 4. Funkcje (bez zmian) ---
    function otworzModal(wiadomosc) {
        modalText.textContent = wiadomosc;
        overlay.classList.remove('modal-hidden');
        modal.classList.remove('modal-hidden');
    }

    function zamknijModal() {
        overlay.classList.add('modal-hidden');
        modal.classList.add('modal-hidden');
    }

    // --- 5. Nasłuchiwacze zdarzeń (TUTAJ ZMIANY) ---
    wszystkieKomorki.forEach(komorka => {
        komorka.addEventListener('click', () => {

            if (komorka.classList.contains('clicked')) {
                return;
            }

            const wiadomosc = komorka.dataset.wiadomosc;
            const numerKomorki = komorka.textContent.trim(); // Pobieramy numer

            // Ustalamy, jaka będzie finalna wiadomość
            let finalMessage;
            if (wiadomosc) {
                finalMessage = wiadomosc;
            } else {
                finalMessage = `Dla numeru ${numerKomorki} nie ma jeszcze wiadomości.`;
            }

            // Otwórz modal (bez zmian)
            otworzModal(finalMessage);

            // Oznacz jako kliknięty (bez zmian)
            komorka.classList.add('clicked');

            // --- 👇 NOWA LOGIKA: Dodaj wiadomość do logu na dole strony 👇 ---

            // 1. Stwórz nowy element <p>
            const nowaWiadomosc = document.createElement('p');

            // 2. Użyj 'innerHTML', aby dodać formatowanie (np. pogrubienie)
            nowaWiadomosc.innerHTML = `<strong>Okienko ${numerKomorki}:</strong> ${finalMessage}`;

            // 3. Dodaj nowy element <p> do kontenera #log-wiadomosci
            logWiadomosci.appendChild(nowaWiadomosc);
        });
    });

    // Zamykanie modala (bez zmian)
    closeButton.addEventListener('click', zamknijModal);
    overlay.addEventListener('click', zamknijModal);

});