var MyHost = "http://www.pgnocerasarno.it/upload/";
var POSTURL = "http://www.pgnocerasarno.it/api/";

function parseGetVars()
{
    // creo una array
    var args = new Array();
    // individuo la query (cio� tutto quello che sta a destra del ?)
    // per farlo uso il metodo substring della propriet� search
    // dell'oggetto location
    var query = window.location.search.substring(1);
    // se c'� una querystring procedo alla sua analisi
    if (query)
    {
        // divido la querystring in blocchi sulla base del carattere &
        // (il carattere & � usato per concatenare i diversi parametri della URL)
        var strList = query.split('&');
        // faccio un ciclo per leggere i blocchi individuati nella querystring
        for (str in strList)
        {
            // divido ogni blocco mediante il simbolo uguale
            // (uguale � usato per l'assegnazione del valore)
            var parts = strList[str].split('=');
            // inserisco nella array args l'accoppiata nome = valore di ciascun
            // parametro presente nella querystring
            args[unescape(parts[0])] = unescape(parts[1]);
        }
    }
    return args;
}

document.addEventListener("deviceready", function () {

}, false);

$(function () {
    router.parseRule("<a data-request='{\"rule\": \"home\"}'>", true);

    $('body').on('click', '*[data-request]', function () {
        removeMenu();
        router.parseRule(this, true);
        return false;
    });


    $('body').on('click', '.cambiaMese', function () {

        router.parseRule("<a data-request='{\"rule\": \"agenda\", \"cat\": \"agenda\", \"data\":" + $(this).data('mod') + ", \"order\":\"DESC\"}'>", true);

        //renderSectionAgenda('agenda',$(this).data('mod'), "DESC");
    });
    $('body').on('click', '.ordinamento', function () {
        router.parseRule("<a data-request='{\"rule\": \"agenda\", \"cat\": \"agenda\", \"data\":" + $(this).data('mod') + ", \"order\":\"" + $(this).data('order') + "\"}'>", true);
        //renderSectionAgenda('agenda',$(this).data('mod'), $(this).data('order'));
    });

    $.ajax({
        method: "GET",
        url: POSTURL + "get-menu/",
        dataType: "json",
        cache: false,
        success: function (data) {
            if (data.result) {
                $('#nomePageGMG').html(data.nome);
            } else {
                $('#nomePageGMG').html("GMG");
            }
        }
    });
    
    //FORM COMMENTO
    $('body').on('click','.btn-comment-submit', function () {
        $.ajax({
            type: 'POST',
            url: POSTURL + 'insert-commento-news/',
            data: {
                IdNews: $(this).data('id'),
                Nominativo: $('#NominativoCommento').val(),
                Email: $('#EmailCommento').val(),
                Commento: $('#CommentoCommento').val()
            },
            dataType: 'json',
            success: function (data) {
                if (data.result) {
                    alert("Commento inviato con successo! Il tuo commento sara' presto visibile.");
                } else {
                    alert(data.error);
                }
            }
        });
        return false;
    });
    
    $('body').on('click','#submit-contatti', function () {
        $.ajax({
            type: 'POST',
            url: POSTURL + 'page-contatti/',
            data: {
                nome: $('#nome-contatti').val(),
                email: $('#email-contatti').val(),
                messaggio: $('#messaggio-contatti').val()
            },
            dataType: 'json',
            success: function (data) {
                if (data.result) {
                    alert("Messaggio inviato con successo! Sarai ricontattato al pi� presto!");
                } else {
                    alert(data.error);
                }
            }
        });
        return false;
    });

});

function removeMenu() {
    $('#menu').toggleClass('visibile');
}
