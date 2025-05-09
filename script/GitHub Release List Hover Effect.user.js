// ==UserScript==
// @name         GitHub Release List Hover Effect
// @namespace    http://tampermonkey.net/
// @version      1.6
// @description  Vergrößert den Text von Release-Listenelementen bei Hover auf GitHub
// @author       Alexander Dalbert
// @match        https://github.com/*/*/releases*
// @grant        GM_addStyle
// @updateURL   https://github.com/Dalbyte/TampermonkeyUserscript-Videos/raw/refs/heads/main/script/GitHub%20Release%20List%20Hover%20Effect.user.js
// @downloadURL https://github.com/Dalbyte/TampermonkeyUserscript-Videos/raw/refs/heads/main/script/GitHub%20Release%20List%20Hover%20Effect.user.js
// @supportURL  https://github.com/Dalbyte/TampermonkeyUserscript-Videos/issues
// ==/UserScript==

(function() {
    'use strict';

    // Füge benutzerdefiniertes CSS für den Hover-Effekt hinzu
    GM_addStyle(`
        ul li {
            font-size: 1.1em;
            transition: all 0.6s 0.1s ease-in-out;
        }

        ul li:hover {
            font-size: 1.2em;
            /*background: linear-gradient(90deg, #3eb12755, #add61655);*/
            /*color: white;*/
            padding: 15px;
            border-radius: 10px;
            border-color: #62D399;
            border-style: solid;
            border-width: 3px;
        }

        .px-lg-5 {
            padding-left: 10rem !important;
            padding-right: 10rem !important;
        }
    `);

})();
