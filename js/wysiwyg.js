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

function result(elem, editor) {
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
        let debug = get_attr(editor, 'debug');

        let resizable = get_attr(editor, 'resizable');
        let resizable_x = get_attr(editor, 'resizable-x');
        let resizable_y = get_attr(editor, 'resizable-y');

        let content = editor.innerHTML;
        editor.innerHTML = '';
        let placeholder = get_attr(editor, 'placeholder', true);
        let classes = editor.classList;

        let spellcheck = get_attr(editor, 'spellcheck') !== null
            ? get_attr(editor, 'spellcheck') : 'false';

        let commands = document.createElement('div');
        commands.classList.add('commands');

        commands.append(create_command_button('G', {
            fontWeight: 'bold'
        }, bold));
        commands.append(create_command_button('I', {
            fontStyle: 'italic'
        }, italic));
        commands.append(create_command_button('U', {
            textDecoration: 'underline'
        }, underline));
        commands.append(create_command_select('Alignements', [
            create_command_select_option('Gauche', 'justifyLeft'),
            create_command_select_option('Centré', 'justifyCenter'),
            create_command_select_option('Justifié', 'justifyFull'),
            create_command_select_option('Droite', 'justifyRight')
        ], {}, changeAlign));
        commands.append(create_command_button('Liens', {}, createLink));
        commands.append(create_command_button('Image', {}, insertImage));
        commands.append(create_command_button('Video Youtube', {}, insertYoutubeVideo));
        commands.append(create_command_select('Titres', [
            create_command_select_option('Titre 1', 'h1'),
            create_command_select_option('Titre 2', 'h2'),
            create_command_select_option('Titre 3', 'h3'),
            create_command_select_option('Titre 4', 'h4'),
            create_command_select_option('Titre 5', 'h5'),
            create_command_select_option('Titre 6', 'h6'),
        ], {}, changeHeading));

        editor.append(commands);
        let wys = create_editor(
            resizable, resizable_x, resizable_y,
            placeholder, content,
            classes,
            focusWys, focusOutWys,
            {
                width: commands.offsetWidth - 13 + 'px',
                minWidth: commands.offsetWidth - 13 + 'px'
            });
        editor.append(wys);
        editor.setAttribute('spellcheck', spellcheck);

        // debug
        helper_debug(editor, wys, debug);
    });
});
