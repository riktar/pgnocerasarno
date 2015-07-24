function loadSection(section) {
    if (section === 'album') {
        renderSection(section,0);
    }
    
    if (section === 'vangelo') {
        renderSection(section,0);
    }

    if (section === 'news') {
        renderSection(section,0);
    }

    if (section === 'gmg') {
        renderGMG();
    }

    if (section === 'agenda') {
        renderSectionAgenda(section, 0, "DESC");
    }

}


function renderSectionAgenda(section, data, order) {
    $('#gmg').html('');
    $.ajax({
        method: "GET",
        url: POSTURL + "get-" + section + "/" + data +"/"+ order,
        dataType: "json",
        cache: false,
        success: function (data) {
            var htmlToWrite = '';
            var singleToOpen = '';
            var idToSend;
            $('#' + section + ' .container').hide();
            singleToOpen = 'single-go-element';


            var categoria = data.Categoria;

            htmlToWrite += '\
            <div class="row" style="margin-bottom:1em; padding:1em 0;background:#2196f3;color:#fff!important;">\n\
                <div class="col-xs-3"><a class="cambiaMese" style="color:#fff;" data-mod="' + (parseInt(data.modificatore) - 1) + '" ><i style="font-size:2.3em; padding-top:20px;" class="fa fa-arrow-circle-left"></i></a></div>\n\
                <div class="col-xs-6 text-center"><h3 style="margin:0;padding:0;color:#fff!important;">' + data.mese + '<br><small style="color:#fff!important;">' + data.anno + '</small></h3></div>\n\
                <div class="col-xs-3 text-right"><a class="cambiaMese" style="color:#fff;" data-mod="' + (parseInt(data.modificatore) + 1) + '" ><i style="font-size:2.3em; padding-top:20px;" class="fa fa-arrow-circle-right"></i></a></div>\n\
            </div>\n\
            <div class="row" style="margin-bottom:20px;">\n\
<div class="col-xs-6"><a style="color:#000!important;" class="ordinamento" data-mod="' + (parseInt(data.modificatore)) + '" data-order="DESC">DA FINE MESE</a></div>\n\
<div class="col-xs-6 text-right"><a style="color:#000!important;" class="ordinamento" data-mod="' + (parseInt(data.modificatore)) + '" data-order="ASC">DA INIZIO MESE</a></div>\n\
</div>\n\
';
            if (!data.result) {
                $('#' + section + ' .container').show();
                htmlToWrite += '<h1 class="text-center">Nessun Evento Presente</h1>'
                $('#' + section + ' .container').html(htmlToWrite);
                return false;
            }
            for (var i = 0; i <= (data.list.length - 1); i++) {

                var item = data.list[i];
                var imagePath = '';
                if (item.Immagine) {
                    imagePath = MyHost + '' + categoria + '/' + item.Id + '/images/original/' + item.Immagine;

                } else {
                    imagePath = 'img/no-image.jpg';
                }
                idToSend = item.Id;
                var data_split = item.Data.split('-');
                htmlToWrite += '\
<div class="row">\n\
    <div class="col-xs-12">\n\
        <div class="panel panel-default item-list">\n\
            <div class="panel-body" style="margin:0;padding:0;padding-left:15px;">\n\
                <a style="margin-bottom:1em;" class="' + singleToOpen + '" data-id="' + idToSend + '" data-categoria="' + categoria + '" data-image="' + imagePath + '">\n\
                    <div class="row">\n\
                        <div class="col-xs-4 text-center" style="background:#2196f3;">';
                if (item.Data !== undefined) {
                    htmlToWrite += '<h1 style="color:#fff!important;margin:0;padding:30px 10px 5px 10px;">' + data_split[0] + '</h1><h5 style="color:#fff!important;margin:0;padding:0px 10px 25px 10px;">'+item.giorno+'</h5>';
                }
                htmlToWrite += '\
                        </div>\n\
                        <div class="col-xs-8">\n\
                            <h4>' + item.Titolo + '</h4>\n\
                <h5><small>' + item.Luogo + '</small></h5>\n\
                        </div>\n\
                    </div>';



//                if (item.Descrizione !== undefined) {
//                    htmlToWrite += '<p> ' + item.Descrizione + ' </p>';
//                }

                htmlToWrite += '</a>\n\
            </div>\n\
        </div>\n\
    </div>\n\
</div>';
            }
            $('#' + section + ' .container').show();
            $('#' + section + ' .container').html(htmlToWrite);
        }
    });
}

function renderSection(section, start) {
    $('#gmg').html('');
    $.ajax({
        method: "GET",
        url: POSTURL + "get-" + section + "/"+start,
        dataType: "json",
        cache: false,
        success: function (data) {
            var htmlToWrite = '';
            var singleToOpen = '';
            var idToSend;
            if (section === 'album') {
                singleToOpen = 'single-gallery-element';
                htmlToWrite += '\
<div class="row">\n\
    <div class="col-xs-12 text-center">\n\
        <input id="descrizione-foto" type="text" class="form-control" placeholder="Descrizione Foto">\n\
        <button class="btn btn-primary" onclick="getImage();">Carica una tua foto!</button>\n\
    </div>\n\
</div>';
            } else {
                singleToOpen = 'single-go-element';
            }


            var categoria = data.Categoria;
            if(section === "vangelo"){
                data.Categoria = section;
            }
            for (var i = 0; i <= (data.list.length - 1); i++) {

                var item = data.list[i];
                var imagePath = '';
                if (item.Immagine) {
                    if (section === 'album') {
                        imagePath = MyHost + '' + categoria + '/' + item.Id + '/' + item.Immagine;
                        idToSend = item.IdAlbum;
                    } else {
                        imagePath = MyHost + '' + categoria + '/' + item.Id + '/images/original/' + item.Immagine;
                        idToSend = item.Id;
                    }

                } else {
                    imagePath = 'img/no-image.jpg';
                    idToSend = item.Id;
                }

                htmlToWrite += '\
<div class="row">\n\
    <div class="col-xs-12">\n\
        <div class="panel panel-default item-list">\n\
            <div class="panel-body">\n\
                <a class="' + singleToOpen + '" data-id="' + idToSend + '" data-categoria="' + data.Categoria + '" data-image="' + imagePath + '">\n\
                    <h4>' + item.Titolo + '</h4>';

                if (item.Data !== undefined) {
                    htmlToWrite += '<h5><small>PUBBLICATA IL: ' + item.Data + '</small></h5>';
                }

                htmlToWrite += '<div class = "immgh"> <img class = "img-responsive img-thumbnail" src = "' + imagePath + '"> </div>';

                if (item.Descrizione !== undefined) {
                    htmlToWrite += '<p> ' + item.Descrizione + ' </p>';
                }

                htmlToWrite += '</a>\n\
            </div>\n\
        </div>\n\
    </div>\n\
</div>';
            }
            if(start === 0){
                $('#' + section + ' > .container').html(htmlToWrite);
                $('#' + section + ' .pager').html('<div class="container"><div class="row"><div class="col-xs-12 text-center"><a class="addItems btn btn-primary" data-section="'+section+'" data-start="'+(parseInt(start)+5)+'">Visualizza Altri Elementi</a></div></div></div>');
            } else {
                $('#' + section + ' .container').append(htmlToWrite);
                $('#' + section + ' .pager').html('<div class="container"><div class="row"><div class="col-xs-12 text-center"><a class="addItems btn btn-primary" data-section="'+section+'" data-start="'+(parseInt(start)+5)+'">Visualizza Altri Elementi</a></div></div></div>');
            }
        }
    });
}

function renderGMG() {
    $('#gmg').html('');
    htmlGMG = '';
    $.ajax({
        method: "GET",
        url: POSTURL + "page-gmg/",
        dataType: "json",
        cache: false,
        success: function (data) {

            var audioPath = null;
            var item = data.single;
            if (item.Audio) {
                audioPath = MyHost + 'pagina/' + item.Id + '/video/' + item.Audio;
            }
            var imagePath = MyHost + 'pagina/' + item.Id + '/images/original/' + item.Immagine;
            htmlGMG += '<div class="immgh"><img class="img-responsive" src="' + imagePath + '"></div>\n\
<div class="container">';
            if (audioPath) {
                htmlGMG += '\
    <div class="row" style="margin-top:20px;">\n\
        <div class="col-md-12">\n\
            <a href="#" class="btn btn-default" onclick="playAudio(\'' + audioPath + '\');"><span class="fa fa-play"></span></a>\n\
            <a href="#" class="btn large" onclick="stopAudio();"><span class="fa fa-stop"></span></a>\n\
        </div>\n\
    </div>\n\
    <div class="row" style="margin-top:20px;">\n\
        <div class="col-md-12">\n\
            <div class="progress">\n\
               <div id="audio_position" class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%">\n\
                   <span class="sr-only">45% Complete</span>\n\
               </div>\n\
            </div>\n\
        </div>\n\
    </div>';
            }
            htmlGMG += '<div class="row">\n\
        <div class="col-xs-12">\n\
            <h4>' + item.Titolo + '</h4>\n\
            <p>' + item.Descrizione + '</p>\n\
        </div>\n\
    </div>\n\
</div>';
            htmlGMG += '</div>';
            $('#gmg').html(htmlGMG);
        }
    });
}