// ==UserScript==
// @name         ExamTopics モーダル削除 & 右クリック許可
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  モーダルを削除し、右クリック・コピーを有効化するスクリプト
// @author       You
// @match        https://www.examtopics.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function removeModal() {
        const modal = document.getElementById('notRemoverPopup');
        if (modal) {
            modal.remove();
        }
    }

    function enableMouseAndKeys() {
        const clearEvents = (el) => {
            el.oncontextmenu = null;
            el.onselectstart = null;
            el.onmousedown = null;
        };

        clearEvents(document);
        clearEvents(document.body);

        document.addEventListener('contextmenu', e => e.stopPropagation(), true);
        document.addEventListener('keydown', e => e.stopPropagation(), true);
        document.addEventListener('keyup', e => e.stopPropagation(), true);
        document.addEventListener('keypress', e => e.stopPropagation(), true);
    }

    window.addEventListener('load', () => {
        removeModal();
        enableMouseAndKeys();

        const observer = new MutationObserver(removeModal);
        observer.observe(document.body, { childList: true, subtree: true });
    });
})();
