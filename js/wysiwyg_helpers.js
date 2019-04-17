function get_attr(editor, key, nullable = false) {
    return editor.hasAttribute(key) ? editor.hasAttribute(key) : (nullable? null : '');
}

function create_command_button(label, style = {}, onclick = null) {
    let b = document.createElement('input');
    b.setAttribute('type', 'button');
    b.value = label;
    for(let prop in style) {
        let value = style[prop];
        b.style[prop] = value;
    }
    if(onclick !== null) b.addEventListener('click', () => onclick(b));

    return b;
}

function create_command_select(label, options = [], style = {}, onchange = null) {
    let s = document.createElement('select');
    let first_option_align = create_command_select_option(label, '');
    s.append(first_option_align);

    options.forEach(option => {
        s.append(option);
    });

    if(onchange !== null) s.addEventListener('change', () => onchange(s));
    return s;
}

function create_command_select_option(label, value) {
    let o = document.createElement('option');
    o.value = value;
    o.innerHTML = label;
    return o;
}

function create_editor(resizable, resizable_x, resizable_y, placeholder, content, classes, onfocus = null, onblur = null) {
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

    if(onfocus !== null) wys.addEventListener('focus', () => onfocus(wys));
    if(onblur !== null) wys.addEventListener('blur', () => onblur(wys));

    return wys;
}

function create_debug_textarea() {
    let result = document.createElement('textarea');
    result.setAttribute('disabled', 'disabled');
    result.classList.add('html_result');
    return result;
}

function helper_debug(editor, wys, debug) {
    if(debug) {
        let _result = create_debug_textarea();

        let result_button_container = document.createElement('div');
        result_button_container.append(create_command_button('Obtenir le HTML', {},
            () => result(_result, wys)));

        editor.append(result_button_container);
        editor.append(_result);
    }
    return editor;
}