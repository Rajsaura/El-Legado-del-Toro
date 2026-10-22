
(function () {
    "use strict";

    const form = document.getElementById(
        "controversia-feedback-form"
    );

    const message = document.getElementById(
        "controversia-feedback-message"
    );

    if (!form || !message) return;

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!form.reportValidity()) return;

        message.textContent =
            "¡Gracias por compartir tu opinión!";

        form.reset();
    });
})();



/* Spanish audio for Carlos and Lucía's dialogue */
(function () {
    "use strict";

    if (!("speechSynthesis" in window)) {
        return;
    }

    const bubbles = document.querySelectorAll(
        ".controversia-bubble"
    );

    bubbles.forEach(function (bubble) {
        const speaker = bubble.querySelector("strong");
        const dialogue = bubble.querySelector("p");

        if (!speaker || !dialogue) return;

        const button = document.createElement("button");
        button.type = "button";
        button.className = "controversia-audio-button";
        button.innerHTML = "🔊";
        button.setAttribute(
            "aria-label",
            "Escuchar el diálogo en español"
        );

        button.addEventListener("click", function () {
            // Stop the previous sentence before playing another.
            window.speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(
                dialogue.textContent.trim()
            );

            utterance.lang = "es-ES";
            utterance.rate = 0.85;
            utterance.pitch = 1;

            const voices = window.speechSynthesis.getVoices();
            const spanishVoice = voices.find(function (voice) {
                return voice.lang.toLowerCase().startsWith("es");
            });

            if (spanishVoice) {
                utterance.voice = spanishVoice;
            }

            button.disabled = true;
            button.innerHTML = "🔊 Reproduciendo...";

            utterance.onend = function () {
                button.disabled = false;
                button.innerHTML = "🔊";
            };

            utterance.onerror = function () {
                button.disabled = false;
                button.innerHTML = "🔊";
            };

            window.speechSynthesis.speak(utterance);
        });

        bubble.appendChild(button);
    });
})();


(function () {
    "use strict";

    const answerBoxes = document.querySelectorAll(
        ".controversia-answer-box"
    );

    answerBoxes.forEach(function (box) {
        const textarea = box.querySelector("textarea");
        const button = box.querySelector(".controversia-answer-button");
        const message = box.querySelector(".controversia-answer-message");

        if (!textarea || !button || !message) return;

        button.addEventListener("click", function () {
            if (!textarea.value.trim()) {
                message.textContent = "Por favor, escribe tu opinión.";
                textarea.focus();
                return;
            }

            message.textContent = "¡Gracias por compartir tu opinión!";
            textarea.value = "";
        });
    });
})();