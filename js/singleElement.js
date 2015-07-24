function getSingle(id, categoria, imagePath) {
    var htmlSingle = '';
    $.ajax({
        method: "GET",
        url: POSTURL + "single-" + categoria + "/" + id,
        dataType: "json",
        cache: false,
        success: function (data) {
            var audioPath = null;
            var item = data.single;
            if (item.Audio) {
                audioPath = MyHost + '' + categoria + '/' + id + '/video/' + item.Audio;
            }
            if (categoria !== 'agenda') {
                htmlSingle = '\
<div class="immgh"><img class="img-responsive" src="' + imagePath + '"></div>';
            } else {
                htmlSingle = '<div id="map-canvas" style="width:100%; height:200px;"></div><h4 class="bg-primary text-center" style="padding:.5em 0;"><i class="fa fa-map-marker"></i> ' + item.Luogo + '</h4>';
            }
            htmlSingle += '<div class="container">';
            if (audioPath) {
                htmlSingle += '\
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

            if (categoria == 'agenda') {
                htmlSingle += '<div class="row">\n\
        <div class="col-xs-12">\n\
            <h4>' + item.Titolo + '</h4>';
                
                if (item.DataFine !== undefined && item.DataFine !== '' && item.DataFine !== null) {
                    htmlSingle += '<h5><small>DAL : ' + item.Data + ' AL : ' + item.DataFine + '</small></h5>';
                } else {
                    htmlSingle += '<h5><small>IN DATA : ' + item.Data + '</small></h5>';
                }
                htmlSingle += '<h5><small>ORARIO ' + item.Orario + '</small></h5><p>' + item.Descrizione + '</p>\n\
        </div>\n\
    </div>';
            } else {
                htmlSingle += '<div class="row">\n\
        <div class="col-xs-12">\n\
            <h4>' + item.Titolo + '</h4>\n\
            <h5><small>PUBBLICATA IL: ' + item.Data + '</small></h5>\n\
            <p>' + item.Descrizione + '</p>\n\
        </div>\n\
    </div>';
            }


            if (categoria !== 'agenda') {
                htmlSingle += '<div class="row">\n\
        <div class="col-md-12">\n\
        <h4 class="bg-primary text-center" style="padding:.5em 0;"><i class="fa fa-comment"></i> LASCIA UN COMMENTO</h4>\n\
                <div class="form-group">\n\
                    <label for="exampleInputEmail1">Email (non verr&agrave; mai visualizzata)</label>\n\
                        <input id="EmailCommento" type="email" class="form-control" placeholder="Email">\n\
                </div>\n\
                <div class="form-group">\n\
                    <label for="exampleInputPassword1">Nome</label>\n\
                    <input id="NominativoCommento" type="text" class="form-control" placeholder="Nome">\n\
                </div>\n\
                <div class="form-group">\n\
                    <label for="textareaContatti">Commento</label>\n\
                    <textarea style="height:75px;" id="CommentoCommento" class="form-control" placeholder="Messaggio"></textarea>\n\
                </div>\n\
                <button data-id="' + id + '" class="btn btn-default btn-comment-submit">Invia</button>\n\
        </div>\n\
    </div>\n\
</div>';
                htmlSingle += '\
<div class="container">\n\
<h4 class="bg-primary text-center" style="padding:.5em 0;"><i class="fa fa-comment"></i> TUTTI COMMENTI</h4>\n\
';
                if (data.comments) {
                    for (var i = 0; i <= (data.comments.length - 1); i++) {
                        var commento = data.comments[i].object;
                        htmlSingle += '\
<div class="row">\n\
        <div class="col-xs-12">\n\
        <h4>' + commento.Nominativo + '</h4>\n\
        <h5><small>PUBBLICATO IL: ' + commento.Data + '</small></h5>\n\
        <p>' + commento.Commento + '</p>\n\
    </div>\n\
</div>\n\
<hr style="border-top:1px solid #ccc">';
                    }
                } else {
                    htmlSingle += '\
<div class="row">\n\
        <div class="col-xs-12">\n\
        <h4>NESSUN COMMENTO INSERITO</h4>\n\
    </div>\n\
</div>\n\
';
                }
            }
            htmlSingle += '</div>';
            $('#single-view').html(htmlSingle);
            //initMap(longi,lati);
            initMap(item.longi, item.lati);
        }
    });
}

function getSingleGallery(id, categoria, imagePath) {
    var htmlSingle = '';
    $.ajax({
        method: "GET",
        url: POSTURL + "get-gallery/" + id,
        dataType: "json",
        cache: false,
        async: false,
        success: function (data) {
            var items = data.list;

            for (var i = 0; i <= (items.length - 1); i++) {
                imagePath = MyHost + '' + categoria + '/' + items[i].Id + '/' + items[i].Media;
                htmlSingle += '<div style="background-image: url(\'' + imagePath + '\')">\n\
\n\<div class="label-foto" style="position:absoulte;height:auto;padding:10px; bottom:0; left:0;width:100%; color:#fff; background:rgba(0,0,0,.6)"><p>' + items[i].Descrizione + '</p></div>\n\
</div>';
            }
            $('#gallery-image').html(htmlSingle);
        }
    });
}