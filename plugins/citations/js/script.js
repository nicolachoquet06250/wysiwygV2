function init_citations_close_btns() {
    document.querySelectorAll('wysiwyg .editor .citation .close-bar .close-btn').forEach(button => {
        button.addEventListener('click', e => {
            e.preventDefault();
            button.parentElement.parentElement.remove();
        });
    });
}