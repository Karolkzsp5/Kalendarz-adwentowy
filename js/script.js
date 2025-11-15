document.addEventListener('DOMContentLoaded', () => {

    function getTodayString() {
        const today = new Date();
        const y = today.getFullYear();
        const m = String(today.getMonth() + 1).padStart(2, '0');
        const d = String(today.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    }

    const savedClickedTiles = JSON.parse(localStorage.getItem('adventCalendarClicked')) || [];

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
        const cellDay = parseInt(komorka.textContent.trim());
        if (isNaN(cellDay)) return;

        if (savedClickedTiles.includes(cellDay)) {
            komorka.classList.add('clicked');

            const wiadomosc = komorka.dataset.wiadomosc || `Brak wiadomości dla dnia ${cellDay}`;
            const nowaWiadomosc = document.createElement('p');
            nowaWiadomosc.innerHTML = `<strong>Okienko ${cellDay}:</strong> ${wiadomosc}`;
            logWiadomosci.appendChild(nowaWiadomosc);
        }
    });

    if (savedClickedTiles.length > 0) {
        logWiadomosci.classList.remove('modal-hidden');
    }

    wszystkieKomorki.forEach(komorka => {
        komorka.addEventListener('click', () => {

            if (komorka.classList.contains('clicked')) {
                return;
            }

            const todayString = getTodayString();
            const lastClickDate = localStorage.getItem('adventCalendarLastClick');

            if (lastClickDate === todayString) {
                otworzModal('Możesz otworzyć tylko jedno okienko dziennie. Wróć jutro!');
                return;
            }

            localStorage.setItem('adventCalendarLastClick', todayString);

            const wiadomosc = komorka.dataset.wiadomosc;
            const numerKomorki = komorka.textContent.trim();
            const cellDayInt = parseInt(numerKomorki);

            let finalMessage;
            if (wiadomosc) {
                finalMessage = wiadomosc;
            } else {
                finalMessage = `Dla numeru ${numerKomorki} nie ma jeszcze wiadomości.`;
            }

            otworzModal(finalMessage);
            komorka.classList.add('clicked');

            logWiadomosci.classList.remove('modal-hidden');

            const nowaWiadomosc = document.createElement('p');
            nowaWiadomosc.innerHTML = `<strong>Okienko ${numerKomorki}:</strong> ${finalMessage}`;
            logWiadomosci.appendChild(nowaWiadomosc);
            nowaWiadomosc.scrollIntoView({ behavior: 'smooth', block: 'end' });

            savedClickedTiles.push(cellDayInt);
            localStorage.setItem('adventCalendarClicked', JSON.stringify(savedClickedTiles));
        });
    });

    closeButton.addEventListener('click', zamknijModal);
    overlay.addEventListener('click', zamknijModal);
});