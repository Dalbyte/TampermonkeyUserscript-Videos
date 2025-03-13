// ==UserScript==
// @name         GitHub Release List Hover Effect
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Vergrößert den Text von Release-Listenelementen bei Hover auf GitHub
// @author       Alexander Dalbert
// @match        https://github.com/*/*/releases*
// @grant        GM_addStyle
// @updateURL   https://github.com/Dalbyte/TampermonkeyUserscript-Videos/raw/refs/heads/main/script/GitHub%20Release%20List%20Hover%20Effect-1.0.user.js
// @downloadURL https://github.com/Dalbyte/TampermonkeyUserscript-Videos/raw/refs/heads/main/script/GitHub%20Release%20List%20Hover%20Effect-1.0.user.js
// @supportURL  https://github.com/Dalbyte/TampermonkeyUserscript-Videos/issues
// ==/UserScript==

(function() {
    'use strict';

    // Füge benutzerdefiniertes CSS für den Hover-Effekt hinzu
    GM_addStyle(`
        ul li:hover {
            font-size: 1.7em;
            font-weight: bold;
            background: linear-gradient(90deg, #3eb127, #add616);
            color: white;
            padding: 5px;
            border-radius: 10px;
            transition: all 0.6s ease-in-out;
        }
    `);

})();
