// ==UserScript==
// @name        YouTube Video List
// @namespace   Violentmonkey Scripts
// @match       https://www.youtube.com/channel/*/videos
// @grant       none
// @version     1.0
// @author      -
// @description 5/25/2021, 3:13:51 PM
// ==/UserScript==

function is_url(s) {
    try {
        new URL(s);
    } catch {
        return false;
    }
    return true;
}

function not_scheduled(a_node) {
    return a_node
        .closest('#dismissible')
        .querySelector('#buttons')
        .childNodes
        .length === 0;
}

function generate_list() {
    const new_window = window.open();

    Array.from(document.querySelectorAll("#video-title"))
        .filter(not_scheduled)
        .map(({href}) => href)
        .filter(is_url)
        .forEach(href => new_window.document.write(`${href}<br/>`));

    new_window.document.close();
}

function make_button(text, callback) {
    const button = document.createElement('button');
    button.textContent = text;
    button.onclick = callback;
    return button;
}

function insert_after(new_node, existing_node) {
    existing_node
        .parentNode
        .insertBefore(new_node, existing_node.nextSibling);
}

insert_after(
    make_button('Video List', generate_list),
    document.querySelector('#subscribe-button')
);
