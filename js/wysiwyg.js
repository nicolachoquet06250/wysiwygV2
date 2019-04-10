function insert_youtube_video() {
    let url = prompt("Quelle est l'adresse de la video ?");
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
        case "createLink":
            argument = prompt("Quelle est l'adresse du lien ?");
            break;
        case "insertImage":
            argument = prompt("Quelle est l'adresse de l'image ?");
            break;
    }
    if (!(nom === 'createLink' && argument === '')) {
        document.execCommand(nom, false, argument);
    }
}

function resultat() {
    document.getElementById("resultat").value = document.getElementById("editeur").innerHTML;
}
