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

    $('body').on('click touchstart', '*[data-request]', function() {
        removeMenu();
        router.parseRule(this, true);
        return false;
    });


    $('body').on('click touchstart', '.cambiaMese', function () {

        router.parseRule("<a data-request='{\"rule\": \"agenda\", \"cat\": \"agenda\", \"data\":" + $(this).data('mod') + ", \"order\":\"DESC\"}'>", true);

        //renderSectionAgenda('agenda',$(this).data('mod'), "DESC");
    });
    $('body').on('click touchstart', '.ordinamento', function () {
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
    $('body').on('click touchstart','.btn-comment-submit', function () {
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
    
    $('body').on('click touchstart','#submit-contatti', function () {
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
    
    $('body').on('click touchstart','.addItems',function(){
        renderSection($(this).data('section'), $(this).data('start'));
    });
    

});

function removeMenu() {
    $('#menu').toggleClass('visibile');
}

function renderSection(cat, start) {
        $.ajax({
            method: "GET",
            url: POSTURL + "get-" + cat + "/" + start,
            dataType: "json",
            crossDomain: true,
            cache: false,
            success: function (data) {
                var htmlToWrite = '';
                var singleToOpen = 'single-go-element';
                var idToSend;
                for (var i = 0; i <= (data.list.length - 1); i++) {
                    var item = data.list[i];
                    var imagePath = '';
                    if (item.Immagine) {
                        imagePath = MyHost + 'news/' + item.Id + '/images/original/' + item.Immagine;
                        idToSend = item.Id;
                    } else {
                        imagePath = 'img/no-image.jpg';
                        idToSend = item.Id;
                    }
                    htmlToWrite += '\
                            <div class="article">\n\
                                    <div class="high">';
                    if (item.Descrizione !== undefined) {
                        htmlToWrite += item.Descrizione;
                    }
                    htmlToWrite += '</div>\n\
                                    <div class="img" style="background-image: url(\'' + imagePath + '\')"></div>\n\
                                    <div data-request=\'{"rule": "single", "cat": "' + cat + '", "id":' + idToSend + ', "imgPath":"' + imagePath + '"}\' class="text">\n\
                                    <h2 class="title">' + item.Titolo + '</h2>';
                    if (item.Data !== undefined) {
                        htmlToWrite += '<p class="data">' + item.Data + '</p>';
                    }
                    htmlToWrite += '</div></div>';
                }

                if (start === 0) {
                    $('#content-lista').html(htmlToWrite);
                    $('#pager').html('<div class="container"><div class="row"><div class="col-xs-12 text-center"><a class="addItems btn btn-primary" data-section="' + cat + '" data-start="' + (parseInt(start) + 5) + '">Visualizza Altri Elementi</a></div></div></div>');
                } else {
                    $('#content-lista').append(htmlToWrite);
                    $('#pager').html('<div class="container"><div class="row"><div class="col-xs-12 text-center"><a class="addItems btn btn-primary" data-section="' + cat + '" data-start="' + (parseInt(start) + 5) + '">Visualizza Altri Elementi</a></div></div></div>');
                }
            }
        });
    }
