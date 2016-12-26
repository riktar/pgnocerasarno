
var router = {
    parseRule: function (rule, modState) {
        var myRule = $(rule).data('request');
        if (myRule !== null) {
            switch (myRule.rule) {

                case 'home' :
                    if (modState === true)
                        history.replaceState({"rule": "home"}, null, '#!home');
                    $('#menu').addClass('visibile');
                    break;

                case 'contatti' :
                    if (modState === true)
                        history.pushState(myRule, null, '#!contatti');
                    $("#container-all-section").load("./contatti.html");
                    switchMenu('contatti');
                    $('#menu').removeClass('visibile');
                    break;

                case 'news' :
                    if (modState === true)
                        history.pushState(myRule, null, '#!news');
                    $("#container-all-section").data("params", myRule);
                    $("#container-all-section").load('list-standard.html');
                    switchMenu('news');
                    $('#menu').removeClass('visibile');
                    break;

                case 'vangelo' :
                    if (modState === true)
                        history.pushState(myRule, null, '#!vangelo');
                    $("#container-all-section").data("params", myRule);
                    $("#container-all-section").load('list-standard.html');
                    switchMenu('vangelo');
                    $('#menu').removeClass('visibile');
                    break;

                case 'agenda' :
                    if (modState === true)
                        history.pushState(myRule, null, '#!agenda');
                    $("#container-all-section").data("params", myRule);
                    $("#container-all-section").load('list-agenda.html');
                    switchMenu('agenda');
                    $('#menu').removeClass('visibile');
                    break;

                case 'gmg' :
                    if (modState === true)
                        history.pushState(myRule, null, '#!gmg');
                    $("#container-all-section").data("params", myRule);
                    $("#container-all-section").load('page-gmg.html');
                    switchMenu('gmg');
                    $('#menu').removeClass('visibile');
                    break;
                
                case 'wakeup' :
                    if (modState === true)
                        history.pushState(myRule, null, '#!wakeup');
                    $("#container-all-section").data("params", myRule);
                    $("#container-all-section").load('page-wakeup.html');
                    switchMenu('vangelo');
                    $('#menu').removeClass('visibile');
                    break;

                case 'single' :
                    if (modState === true)
                        history.pushState(myRule, null, '#!single');
                    $("#container-all-section").data("params", myRule);
                    $("#container-all-section").load('single.html');
                    switchMenu(myRule.cat);
                    $('#menu').removeClass('visibile');
                    break;

                case 'album' :
                    if (modState === true)
                        history.pushState(myRule, null, '#!album');
                    $("#container-all-section").data("params", myRule);
                    $("#container-all-section").load('list-album.html');
                    switchMenu('album');
                    $('#menu').removeClass('visibile');
                    break;

                case 'thumbalbum' :
                    if (modState === true)
                        history.pushState(myRule, null, '#!album-thumb');
                    $("#container-all-section").data("params", myRule);
                    $("#container-all-section").load('thumb-album.html');
                    switchMenu('album');
                    $('#menu').removeClass('visibile');
                    break;

                case 'single-album' :
                    if (modState === true)
                        history.pushState(myRule, null, '#!single-album');
                    $("#container-all-section").data("params", myRule);
                    $("#container-all-section").load('single-album.html');
                    switchMenu('album');
                    $('#menu').removeClass('visibile');
                    break;


                default:
                    if (modState === true)
                        history.replaceState({request: "home"}, null, '#!home');
                    $('#menu').addClass('visibile');
                    break;
            }
        }
    }
};

function switchMenu(voice) {
    $('#top-menu .navbar-brand.focus').removeClass('focus');
    $('#top-menu .navbar-brand[data-target="' + voice + '"]').addClass('focus');
}

window.onpopstate = function (event) {
    //console.log(JSON.stringify(event.state));
    router.parseRule('<a data-request=\'' + JSON.stringify(event.state) + '\'>', false);
    //window.history.back();
};