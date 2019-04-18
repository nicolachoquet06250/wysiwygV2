function cite_element_into_wysiwyg(elem, destination) {
    let element_content = elem.querySelector('.content').innerHTML;
    let editor = destination.querySelector('.editor');
    let author_name = elem.querySelector('.header').innerText;
    if(author_name.substr(0, 1) === ' ') {
        author_name = author_name.substr(1, author_name.length - 1);
    }
    editor.innerHTML += '<div contentEditable="false" class="citation" data-author="' + elem.getAttribute('data-author') + '" data-author_name="' + author_name + '"><div class="close-bar"><a href="#" class="close-btn">X</a></div>' + element_content + '</div><br>';
}

function init_citations_close_btns() {
    document.querySelectorAll('wysiwyg .editor .citation .close-bar .close-btn').forEach(button => {
        button.addEventListener('click', e => {
            e.preventDefault();
            button.parentElement.parentElement.remove();
        });
    });
}

function init_citation_buttons() {
    document.querySelectorAll('.post .post-toolbar .cite').forEach(button => {
        button.addEventListener('click', () => {
            cite_element_into_wysiwyg(button.parentElement.parentElement, document.querySelector('#wysiwyg'));
            init_citations_close_btns();
        });
    });
}

window.onload = () => {
    init_citation_buttons();

    document.querySelectorAll('.post-list .post').forEach(post => {
        let me = parseInt(document.querySelector('#me').value);

        if(parseInt(post.getAttribute('data-author')) === me) {
            post.classList.add('me');
        }

        post.parentElement.classList.add((parseInt(post.getAttribute('data-author')) === me ? 'left' : 'right') + '-align')
    });
};