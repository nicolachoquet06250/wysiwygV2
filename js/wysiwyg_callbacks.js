function bold() {
    commande('bold');
}

function italic() {
    commande('italic');
}

function underline() {
    commande('underline');
}

function changeAlign(alignements) {
    commande(alignements.value);
    alignements.selectedIndex = 0;
}

function createLink() {
    commande('createLink');
}

function insertImage() {
    commande('insertImage');
}

function insertYoutubeVideo() {
    insert_youtube_video();
}

function changeHeading(titles) {
    commande('heading', titles.value);
    titles.selectedIndex = 0;
}

function keyDownForShortCuts(evt) {
    if(evt.ctrlKey && (evt.key === 'l' || evt.key === 'L')) {
        evt.preventDefault();
        commande('justifyLeft');
    }
    else if(evt.ctrlKey && (evt.key === 'r' || evt.key === 'R')) {
        evt.preventDefault();
        commande('justifyRight');
    }
    else if(evt.ctrlKey && (evt.key === 'j' || evt.key === 'J')) {
        evt.preventDefault();
        commande('justifyFull');
    }
    else if(evt.ctrlKey && (evt.key === 'c' || evt.key === 'C')) {
        evt.preventDefault();
        commande('justifyCenter');
    }
    else if(evt.ctrlKey && (evt.key === 'b' || evt.key === 'B')) {
        evt.preventDefault();
        commande('bold');
    }
    else if(evt.ctrlKey && (evt.key === 'i' || evt.key === 'I')) {
        evt.preventDefault();
        commande('italic');
    }
    else if(evt.ctrlKey && (evt.key === 'u' || evt.key === 'U')) {
        evt.preventDefault();
        commande('underline');
    }
}

function keyUpForAddSmiles(wys) {
    let content = wys.innerHTML;
    if(content.indexOf(' :D ') !== -1 || content.indexOf(' :) ') !== -1) {
        content = content.replace(' :D', ' <img src="./images/smiles/smile.png" class="smile" alt=":D" /> ');
        content = content.replace(' :)', ' <img src="./images/smiles/smile.png" class="smile" alt=":)" /> ');
        wys.innerHTML = content;
        set_cursor(wys);
    }
}

function focusWys(wys) {
    let placeholder_class = wys.querySelector('.placeholder');
    if(placeholder_class !== null) {
        placeholder_class.remove();
    }
    wys.addEventListener('keydown', keyDownForShortCuts);
    wys.addEventListener('keyup', () => keyUpForAddSmiles(wys));
}

function focusOutWys(wys) {
    let placeholder = wys.parentElement.getAttribute('placeholder');
    if(placeholder !== null
        && (wys.querySelector('placeholder') !== null
            || wys.childNodes.length === 0
            || (wys.childNodes.length === 1
                && wys.childNodes[0].nodeName === 'BR' ))) {
        wys.innerHTML = '<span class="placeholder">' + placeholder + '</span>';
    }
}