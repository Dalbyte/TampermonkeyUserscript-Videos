// ==UserScript==
// @name         Pikimov Timestamps
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Erweitert Pikimov um die Möglichkeit, Youtube Timestamps hinzuzufügen.
// @author       Alexander Dalbert + Gemini AI (Google)
// @match        https://pikimov.com/*
// @grant        none
// @updateURL   https://github.com/Dalbyte/TampermonkeyUserscript-Videos/raw/refs/heads/main/script/Pikimov%20Timestamps-0.1.user.js
// @downloadURL https://github.com/Dalbyte/TampermonkeyUserscript-Videos/raw/refs/heads/main/script/Pikimov%20Timestamps-0.1.user.js
// @supportURL  https://github.com/Dalbyte/TampermonkeyUserscript-Videos/issues
// ==/UserScript==

// ==UserScript==
// @name         Pikimov Timestamps
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Erweitert Pikimov um die Möglichkeit, Youtube Timestamps hinzuzufügen.
// @author       Alexander Dalbert + Gemini AI (Google)
// @match        https://pikimov.com/*
// @grant        none
// @updateURL    https://github.com/Dalbyte/TampermonkeyUserscript-Videos/raw/refs/heads/main/script/Pikimov%20Timestamps-0.1.user.js
// @downloadURL  https://github.com/Dalbyte/TampermonkeyUserscript-Videos/raw/refs/heads/main/script/Pikimov%20Timestamps-0.1.user.js
// @supportURL   https://github.com/Dalbyte/TampermonkeyUserscript-Videos/issues
// ==/UserScript==

(function() {
    'use strict';

    function selectElement(selector) {
        let myElement = document.querySelector(selector);
        return myElement;
    }

    function initializeScript() {
        let toolDropdown = selectElement("#project > header > div:nth-child(4) > div");

        if (toolDropdown) {
            let dropdownItem = document.createElement("span");
            dropdownItem.textContent = "Youtube Timestamps";
            dropdownItem.style.cursor = "pointer";

            toolDropdown.appendChild(dropdownItem);

            let jobContainer = selectElement("#job");
            let yoyoContainer = selectElement("#yoyo");
            let youtubeTimestampsContainer = null;

            dropdownItem.addEventListener("click", function() {
                if (youtubeTimestampsContainer) {
                    if (youtubeTimestampsContainer.style.display === "none") {
                        youtubeTimestampsContainer.style.display = "block";
                        jobContainer.style.display = "none";
                    } else {
                        youtubeTimestampsContainer.style.display = "none";
                        jobContainer.style.display = "block";
                    }
                } else {
                    youtubeTimestampsContainer = document.createElement("div");
                    youtubeTimestampsContainer.id = "YoutubeTimestamps";
                    youtubeTimestampsContainer.style.display = "block";
                    yoyoContainer.appendChild(youtubeTimestampsContainer);

                    let leftContainer = document.createElement("div");
                    leftContainer.className = "left";
                    youtubeTimestampsContainer.appendChild(leftContainer);

                    // Headline hinzufügen
                    let headline = document.createElement("h2");
                    headline.textContent = "Youtube Timestamps";
                    leftContainer.appendChild(headline);

                    // Timestamps-Container hinzufügen
                    let timestampsList = document.createElement("div");
                    timestampsList.id = "timestampsList";
                    timestampsList.style.maxHeight = "50vh"; // Maximale Höhe festlegen
                    timestampsList.style.overflowY = "auto"; // Vertikales Scrollen aktivieren
                    leftContainer.appendChild(timestampsList);

                    // Buttons hinzufügen
                    let addButton = document.createElement("span");
                    addButton.className = "button";
                    addButton.innerHTML = '<i class="bx bx-plus"></i>add Timestamp';
                    leftContainer.appendChild(addButton);

                    let saveButton = document.createElement("span");
                    saveButton.className = "button";
                    saveButton.textContent = "Save Timestamps to Clipboard";
                    leftContainer.appendChild(saveButton);

                    // Event-Listener für "add Timestamp"
                    addButton.addEventListener("click", function() {
                        addTimestamp();
                    });

                    // Event-Listener für "Save Timestamps to Clipboard"
                    saveButton.addEventListener("click", function() {
                        saveTimestampsToClipboard();
                    });

                    jobContainer.style.display = "none";
                }
            });
        } else {
            console.log("Dropdown-Element nicht gefunden.");
        }
    }

    // Funktion zum Hinzufügen eines Timestamps
    function addTimestamp() {
        let timeElement = selectElement("#timelineControls > div.time > span.mmssms");
        let currentTime = timeElement.textContent;

        // Zeit in mm:ss Format konvertieren und zweistellig machen
        let parts = currentTime.split(':');
        let minutes, seconds;

        if (parts.length === 2) {
            // ss:ms Format
            minutes = '00';
            seconds = parts[0];
        } else if (parts.length === 3) {
            // mm:ss:ms Format
            minutes = parts[0];
            seconds = parts[1];
        } else {
            // Unbekanntes Format, ggf. Fehlerbehandlung hinzufügen
            console.error("Unbekanntes Zeitformat:", currentTime);
            return;
        }

        // Minuten und Sekunden zweistellig machen
        minutes = minutes.padStart(2, '0');
        seconds = seconds.padStart(2, '0');

        let formattedTime = `${minutes}:${seconds}`;

        let timestamp = document.createElement("div");
        timestamp.className = "ytt-timestamp";
        timestamp.innerHTML = `
            <input type="text" class="ytt-timestamp-time" value="${formattedTime}" style="width: 60px;">
            <input type="text" class="ytt-timestamp-title" value="New Timestamp" style="width: 180px;">
            <span class="ytt-timestamp-delete">&#x1F5D1;</span>
        `;

        let timestampsList = document.getElementById("timestampsList");
        timestampsList.appendChild(timestamp);

        // Event-Listener für "Löschen"
        timestamp.querySelector(".ytt-timestamp-delete").addEventListener("click", function() {
            timestamp.remove();
            sortTimestamps();
        });

        // Event-Listener für Zeitänderung
        timestamp.querySelector(".ytt-timestamp-time").addEventListener("change", function() {
            sortTimestamps();
        });

        // Event-Listener für Titeländerung (Leerzeichen entfernen)
        timestamp.querySelector(".ytt-timestamp-title").addEventListener("change", function() {
            this.value = this.value.trimStart();
        });

        sortTimestamps();
    }

    // Funktion zum Speichern von Timestamps in die Zwischenablage
    function saveTimestampsToClipboard() {
        let timestamps = document.querySelectorAll(".ytt-timestamp");
        let clipboardText = "";

        timestamps.forEach(timestamp => {
            let time = timestamp.querySelector(".ytt-timestamp-time").value;
            let title = timestamp.querySelector(".ytt-timestamp-title").value;
            clipboardText += `${time} ${title}\n`;
        });

        navigator.clipboard.writeText(clipboardText).then(() => {
            alert("Timestamps in die Zwischenablage kopiert!");
        }).catch(err => {
            console.error("Fehler beim Kopieren in die Zwischenablage:", err);
        });
    }

    // Funktion zum Sortieren der Timestamps
    function sortTimestamps() {
        let timestampsList = document.getElementById("timestampsList");
        let timestamps = Array.from(timestampsList.children);

        timestamps.sort((a, b) => {
            let timeA = a.querySelector(".ytt-timestamp-time").value;
            let timeB = b.querySelector(".ytt-timestamp-time").value;
            return timeA.localeCompare(timeB);
        });

        timestamps.forEach(timestamp => {
            timestampsList.appendChild(timestamp);
        });
    }

    // Polyfill für GM_addStyle
    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }

    // CSS-Stile für den Button hinzufügen
    addGlobalStyle(`
        #initButton {
            position: fixed;
            bottom: 20px;
            left: 20px;
            z-index: 2147483647;
            pointer-events: auto;
            padding: 10px 15px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        #YoutubeTimestamps {
            padding: 10px;
            border: 1px solid #ccc;
            margin-top: 10px;
        }
        .ytt-timestamp {
            border: 1px solid #eee;
            padding: 5px;
            margin-bottom: 5px;
            display: flex;
            align-items: center;
        }
        .ytt-timestamp-delete {
            cursor: pointer;
            margin-left: 5px;
        }
        /* Die CSS-Regeln für die 'button'-Klasse bleiben unverändert. */
    `);

    let initButton = document.createElement("button");
    initButton.textContent = "Timestamp-Tool starten";
    initButton.id = "initButton";

    initButton.addEventListener("click", function() {
        initializeScript();
        initButton.style.display = "none";
    });

    document.body.appendChild(initButton);
})();