// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://veeva.io/profile/detail/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=veeva.io
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // shortcuts won't work unless webpage is in focus. e.g. shortcuts don't work while in finder - is there a way to fix this? --- TODO
    // solution: use window.addEventListener instead of document.
    // set widths for columns on data table --- TODO
    // show unpolished/ x button --- TODO
    // navigate up & down on table using keyarrows --- TODO
    // pulls all links in KP's information --- TODO
    // arrow keys extra features: opt+arrow 10 points, cmd+arrow: 20 points, etc.
    // plus window move along with it (automatic maybe?)
    // auto delete error popups?
    // fix window focus? not its only DB so you only need one section

    // --- TODO ---
    // make logic so that possible matches go up top (not match/mismatch types on table)
    // rest go below and you can batch unmatch them


    // prevents shortcuts from being triggered when typing
    function isTyping() {
        return document.activeElement.tagName.toLowerCase() === 'input' || document.activeElement.tagName.toLowerCase() === 'textarea';
    }

    // select element by its text content
    function findElementByTextContent(selector, textContent) {
        var elements = document.querySelectorAll(selector);

        for (var i = 0; i < elements.length; i++) {
            if (elements[i].textContent.trim() === textContent.trim()) {
                return elements[i];
            }
        }

        return null;
    }

    // select element by its text content (anchor)
    function findAnchorlement(tagName, textContent) {
        var elements = document.querySelectorAll(tagName);

        for (var i = 0; i < elements.length; i++) {
            if (elements[i].textContent.trim() === textContent.trim()) {
                return elements[i];
            }
        }

        return null;
    }

    // hit "s" to order by first name & refreshes search
    document.addEventListener('keydown', function (e) {
        if ((e.key === 's' || e.key === 'ㄴ') && !isTyping()) {
            var firstNameElement = findElementByTextContent('span.ag-header-cell-text', 'First Name');
            if (firstNameElement) {
                // Focus on the element
                firstNameElement.focus();

                // Simulate a click event twice to mimic a double click
                firstNameElement.click();
                firstNameElement.click();
            }
        }
    });

    // hit "d" to order by affiliation/workplace
    document.addEventListener('keydown', function (e) {
        if ((e.key === 'd' || e.key === 'ㅇ') && !isTyping()) {
            var affiliationElement = findElementByTextContent('span.ag-header-cell-text', 'Affiliation');
            var workplaceElement = findElementByTextContent('span.ag-header-cell-text', 'Workplace');
            var institutionElement = findElementByTextContent('span.ag-header-cell-text', 'Institution');
            var facilityElement = findElementByTextContent('span.ag-header-cell-text', 'Facility');

            var targetElement = affiliationElement || workplaceElement || institutionElement || facilityElement;

            if (targetElement) {
                // Focus on the element
                targetElement.focus();

                // Simulate a click event twice to mimic a double click
                targetElement.click();
                targetElement.click();
            }
        }
    });

     // hit "." to expand/fold data table
    document.addEventListener('keydown', function (e) {
        if (e.key === '.' && !isTyping()) {
            const dataColumns = document.querySelector('.ag-header-cell-resize');
            if (dataColumns) {
                // Simulate a double-click event
                dataColumns.dispatchEvent(new Event('dblclick'));
            }
        }
    });

    // hit "k" to show person data
    document.addEventListener('keydown', function (e) {
        if ((e.key === 'k' || e.key === 'ㅏ') && !isTyping()) {
            findAnchorlement('a', 'Show Person Data').click();
        }
    });

    // hit "l" to click all links --- TODO

    // // hit "x" to show unpolished
    // document.addEventListener('keydown', function (e) {
    //  if ((e.key === 'x' || e.key === 'ㅌ') && !isTyping()) {
    //    findElementByTextContent('.btn-outline-primary', 'Show unpolished').click();
    //  }
    // });
        // looks like this function is not needed anymore b/c of shortcut "c"
        // glitch: sometimes it matches/unmatches data instead --- TODO

    // hit "c" to undo show unpolished
    document.addEventListener('keydown', function (e) {
        if ((e.key === 'c' || e.key === 'ㅊ') && !isTyping()) {
            document.querySelectorAll('.btn-outline-primary:not(.align-baseline)')[2].click(); //.algin-baseline b/c match/unmatch btn share same classname
        }
    });
        // simplify logic for it to be one shortcut --- TODO --- unexpected results: this one shortcut works as both!

    // hit "v" to reset filter
    document.addEventListener('keydown', function (e) {
        if ((e.key === 'v' || e.key === 'ㅍ') && !isTyping()) {
            document.querySelectorAll('.btn-outline-danger')[1].click();
        }
    });

    // hit "/" to focus on table
    // no easy solution for now. hit "/" and "tab" and then hit up/down arrow keys
    document.addEventListener('keydown', function (e) {
        if ((e.key === '/') && !isTyping()) {
            const firstRow = document.querySelector('div.ag-row[row-index="0"]');

            if (firstRow) {
                // Set the tabindex to make the element focusable
                firstRow.setAttribute('tabindex', '0');

                // Focus on the element
                firstRow.focus();

                // Remove the tabindex after focusing
                firstRow.removeAttribute('tabindex');
            }
        }
    });

    // hit "a" to select all data on table
    document.addEventListener('keydown', function (e) {
        if ((e.key === 'a' || e.key === 'ㅁ') && !isTyping()) {
            document.querySelector('.ag-selection-checkbox').click();
        }
    });

    // hit "-" to copy KP ID
    window.addEventListener('keydown', function (e) {
        if (e.key === '-' && !isTyping()) {
            document.querySelector('.fa.fa-copy').click();
        }
    });

    // hit "=" to click UTC + note it's using window.
    window.addEventListener('keydown', function (e) {
        if (e.key === '=' && !isTyping()) {
            document.querySelectorAll('.btn-outline-danger')[0].click();
        }
    });

    // hit "0" to submit profile
    window.addEventListener('keydown', function (e) {
        if (e.key === '0' && !isTyping()) {
            document.querySelector('.btn-outline-success').click();
        }
    });

    // hit "q, w, e, r, t" to navigate b/w dropdown menu items
    document.addEventListener('keydown', function (e) {
        // Check if the pressed key is one of the allocated keys (q, w, e, r, t)
        if (['q', 'w', 'e', 'r', 't', 'ㅂ', 'ㅈ', 'ㄷ', 'ㄱ', 'ㅅ'].includes(e.key) && !isTyping()) {
            var dropdownItems = document.querySelectorAll('.dropdown-item.btn-sm');

            var index;
            switch (e.key) {
                case 'q':
                case 'ㅂ':
                index = 0;
                break;
                case 'w':
                case 'ㅈ':
                index = 1;
                break;
                case 'e':
                case 'ㄷ':
                index = 2;
                break;
                case 'r':
                case 'ㄱ':
                index = 3;
                break;
                case 't':
                case 'ㅅ':
                index = 4;
                break;
            }

            if (index < dropdownItems.length) {
                var selectedItem = dropdownItems[index];
                console.log(`Pressed key: ${e.key}, Selected text: ${selectedItem.textContent}`);
                selectedItem.click();
            }
        }
    });

})();