// ==UserScript==
// @name         GoogleDocsFlipTheScript
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Invertiert die Farben der aktuellen Webseite
// @author       Dein Name
// @match        https://docs.google.com/document/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle('html { filter: invert(100%); }');
    GM_addStyle('img, video, iframe { filter: invert(100%); }');
    GM_addStyle('body { transform: scaleX(1) scaleY(-1); }');
})();