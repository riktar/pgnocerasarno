var gallery = '';
var htmlGMG = '';
var MyHost = "http://www.pgnocerasarno.it/upload/";
var POSTURL = "http://www.pgnocerasarno.it/api/";
$(function () {

    //MENU HOME
    $('#home-page a.btn').on('click', function () {
        $('.navbar-brand').removeClass('focus');
        $('#content-page .sectiontoshow').hide();
        $('#section-main').toggleClass('visibile');
        $('#main-menu').toggleClass('visibile');
        $('.navbar-brand[data-target="' + $(this).data('page') + '"]').addClass('focus');

        loadSection($(this).data('page'));

        $('#' + $(this).data('page')).show();
        return false;
    });

    //MENU INTERNO
    $('body').on('click', '.navbar-brand', function () {
        if ($(this).attr('id') === 'home-button')
            return false;
        if ($('#single-view').hasClass('visibile')) {
            $('#home-button')
                    .toggleClass('home-go-element')
                    .toggleClass('single-go-element')
                    .children('.fa')
                    .toggleClass('fa-home')
                    .toggleClass('fa-arrow-left')
                    .removeClass('focus');
            $('#single-view').toggleClass('visibile');
            setTimeout(function () {
                $('#single-view').html('');
            }, 500);
        }
        
        if ($('#single-gallery').hasClass('visibile')) {
            $('#home-button')
                    .toggleClass('home-go-element')
                    .toggleClass('single-gallery-element')
                    .children('.fa')
                    .toggleClass('fa-home')
                    .toggleClass('fa-arrow-left')
                    .removeClass('focus');
            $('#single-gallery').toggleClass('visibile');
            setTimeout(function () {
                $('#single-gallery #gallery-image').html('');
            }, 500);
        }
        
        $("#" + $('.navbar-brand.focus').data('target')).hide();
        $('.navbar-brand').removeClass('focus');
        $(this).addClass('focus');

        loadSection($(this).data('target'));

        $("#" + $(this).data('target')).show();
    });


    //PAGINA SINGOLA
    $('body').on('click', '.single-go-element', function () {

        $('#home-button')
                .toggleClass('home-go-element')
                .toggleClass('single-go-element')
                .children('.fa')
                .toggleClass('fa-home')
                .toggleClass('fa-arrow-left')
                .removeClass('focus');
        if ($(this).attr('id') === 'home-button') {
            $('#single-view').toggleClass('visibile');
            setTimeout(function () {
                $('#single-view').html('');
            }, 500);
            return false;
        }
        getSingle($(this).data('id'), $(this).data('categoria'), $(this).data('image'));
        $('#single-view').toggleClass('visibile');
        return false;
    });
    
    //PAGINA SINGOLA GALLERY
    $('body').on('click', '.single-gallery-element', function () {

        $('#home-button')
                .toggleClass('home-go-element')
                .toggleClass('single-gallery-element')
                .children('.fa')
                .toggleClass('fa-home')
                .toggleClass('fa-arrow-left')
                .removeClass('focus');
        if ($(this).attr('id') === 'home-button') {
            $('#single-gallery').toggleClass('visibile');
            setTimeout(function () {
                $('#gallery-image').slick('unslick');
                gallery = '';
                $('#single-gallery #gallery-image').html('');
            }, 500);
            return false;
        }
        getSingleGallery($(this).data('id'), $(this).data('categoria'), $(this).data('image'));
        if (gallery !== '')
            $('#gallery-image').slick('unslick');
        gallery = $('#gallery-image').slick();
        $('#single-gallery').toggleClass('visibile');
        return false;
    });
    
    
    $('body').on('click', '.cambiaMese', function () {
        console.log('clicc');
        renderSectionAgenda('agenda',$(this).data('mod'), "DESC");
    });
    $('body').on('click', '.ordinamento', function () {
        console.log('clicc');
        renderSectionAgenda('agenda',$(this).data('mod'), $(this).data('order'));
    });
    
    $('body').on('click','.addItems',function(){
        renderSection($(this).data('section'), $(this).data('start'));
    });

    //TORNA ALLA HOME
    $('body').on('click', '.home-go-element', function () {
        $('#section-main').toggleClass('visibile');
        $('#main-menu').toggleClass('visibile');
        setTimeout(function () {
            $('#content-page .sectiontoshow').hide();
        }, 500);
        return false;
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
    
    //CONTATTI
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
                    alert("Messaggio inviato con successo! Sarai ricontattato al più presto!");
                } else {
                    alert(data.error);
                }
            }
        });
        return false;
    });


});