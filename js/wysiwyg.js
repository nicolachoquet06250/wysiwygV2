function insert_youtube_video() {
    let url = prompt('Quelle est l\'adresse de la video ?');
    if (url !== '') {
        let html = `<iframe width="560" height="315" src="${url}" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" style="width: 80%;" allowfullscreen></iframe><br><br>`;
        commande('insertHTML', html);
    }
}

function commande(nom, argument) {
    if (typeof argument === 'undefined') {
        argument = '';
    }
    switch (nom) {
        case 'createLink':
            argument = prompt('Quelle est l\'adresse du lien ?');
            break;
        case 'insertImage':
            argument = prompt('Quelle est l\'adresse de l\'image ?');
            break;
    }
    if (!(nom === 'createLink' && argument === '')) {
        document.execCommand(nom, false, argument);
    }
}

function resultat(elem, editor) {
    elem.value = editor.innerHTML;
}

function set_cursor(editor) {
    editor.focus();
    if(editor.childNodes.length >= 1) {
        let id = editor.childNodes.length - 1;
        let lastLine = editor.childNodes[id];
        if(lastLine.nodeName === 'BR') {
            lastLine = editor.childNodes[id - 1];
        }
        let lastLineType = lastLine.nodeName;
        let lastChar = (lastLineType === '#text' ? lastLine.textContent.length : lastLine.innerText.replace("\n", '').length);
        const selection = window.getSelection();
        selection.collapse(lastLine, lastChar -1);
        editor.click();
    }
}

window.addEventListener('load', () => {
    let editors = document.querySelectorAll('wysiwyg');
    editors.forEach(editor => {
        let debug = editor.hasAttribute('debug');

        let resizable = editor.hasAttribute('resizable');
        let resizable_x = editor.hasAttribute('resizable-x');
        let resizable_y = editor.hasAttribute('resizable-y');

        let content = editor.innerHTML;
        editor.innerHTML = '';
        let placeholder = editor.hasAttribute('placeholder') ? editor.getAttribute('placeholder') : null;
        let classes = editor.classList;

        let spellcheck = editor.hasAttribute('spellcheck') ? editor.getAttribute('spellcheck') : 'false';

        let commands = document.createElement('div');
        commands.classList.add('commands');

        let b = document.createElement('input');
        b.setAttribute('type', 'button');
        b.value = 'G';
        b.style.fontWeight = 'bold';
        b.addEventListener('click', bold);

        commands.append(b);

        let i = document.createElement('input');
        i.setAttribute('type', 'button');
        i.value = 'I';
        i.style.fontStyle = 'italic';
        i.addEventListener('click', italic);

        commands.append(i);

        let u = document.createElement('input');
        u.setAttribute('type', 'button');
        u.value = 'U';
        u.style.textDecoration = 'underline';
        u.addEventListener('click', underline);

        commands.append(u);

        let alignements = document.createElement('select');
        alignements.addEventListener('change', () => changeAlign(alignements));
        let first_option_align = document.createElement('option');
        first_option_align.value = '';
        first_option_align.innerHTML = 'Allignements';
        alignements.append(first_option_align);

        let left = document.createElement('option');
        left.value = 'justifyLeft';
        left.innerHTML = 'Gauche';
        alignements.append(left);

        let center = document.createElement('option');
        center.value = 'justifyCenter';
        center.innerHTML = 'Centré';
        alignements.append(center);

        let justify = document.createElement('option');
        justify.value = 'justifyFull';
        justify.innerHTML = 'Justifié';
        alignements.append(justify);

        let right = document.createElement('option');
        right.value = 'justifyRight';
        right.innerHTML = 'Droite';
        alignements.append(right);

        commands.append(alignements);

        let links = document.createElement('input');
        links.setAttribute('type', 'button');
        links.value = 'Liens';
        links.addEventListener('click', createLink);

        commands.append(links);

        let images = document.createElement('input');
        images.setAttribute('type', 'button');
        images.value = 'Image';
        images.addEventListener('click', insertImage);

        commands.append(images);

        let youtube = document.createElement('input');
        youtube.setAttribute('type', 'button');
        youtube.value = 'Vidéo Youtube';
        youtube.addEventListener('click', insertYoutubeVideo);

        commands.append(youtube);

        let titles = document.createElement('select');
        titles.addEventListener('change', () => changeHeading(titles));
        let first_option_titles = document.createElement('option');
        first_option_titles.value = '';
        first_option_titles.innerHTML = 'Titres';
        titles.append(first_option_titles);

        let h1 = document.createElement('option');
        h1.value = 'h1';
        h1.innerHTML = 'Titre 1';
        titles.append(h1);

        let h2 = document.createElement('option');
        h2.value = 'h2';
        h2.innerHTML = 'Titre 2';
        titles.append(h2);

        let h3 = document.createElement('option');
        h3.value = 'h3';
        h3.innerHTML = 'Titre 3';
        titles.append(h3);

        let h4 = document.createElement('option');
        h4.value = 'h4';
        h4.innerHTML = 'Titre 4';
        titles.append(h4);

        let h5 = document.createElement('option');
        h5.value = 'h5';
        h5.innerHTML = 'Titre 5';
        titles.append(h5);

        let h6 = document.createElement('option');
        h6.value = 'h6';
        h6.innerHTML = 'Titre 6';
        titles.append(h6);

        commands.append(titles);

        editor.append(commands);

        let wys = document.createElement('div');
        wys.classList.add('editor');
        wys.setAttribute('contentEditable', 'true');

        if(resizable) {
            wys.classList.add('resizable');
        } else if(resizable_x) {
            wys.classList.add('resizable-x');
        } else if(resizable_y) {
            wys.classList.add('resizable-y');
        }

        if(placeholder) {
            wys.innerHTML = `<span class="placeholder" spellcheck="false">${placeholder}</span>`;
        }
        if(content) {
            wys.innerHTML = content;
        }
        if(classes.length >= 1) {
            classes.forEach(classe => wys.classList.add(classe));
        }

        editor.append(wys);

        editor.setAttribute('spellcheck', spellcheck);

        wys.addEventListener('focus', () => focusWys(wys));
        wys.addEventListener('blur', () => focusOutWys(wys));

        // debug
        if(debug) {
            let result_button_container = document.createElement('div');
            let result_button = document.createElement('input');
            result_button.value = 'Obtenir le HTML';
            result_button.setAttribute('type', 'button');

            result_button_container.append(result_button);
            editor.append(result_button_container);

            let result = document.createElement('textarea');
            result.setAttribute('disabled', 'disabled');
            result.classList.add('html_result');

            result_button.addEventListener('click', () => resultat(result, wys));

            editor.append(result);
        }
    });
});
