
$(document).ready(function() {
    shuffleCard2(frontCardArray2);
    $('.card').click(function () {
        card_clicked(this);
        display_stats();
        var settingClick= new Audio();
        settingClick.src = "sound/class_tab_click.ogg";
        settingClick.play();
    });
    $('.card').on('mouseenter',function () {
        var settingClick= new Audio();
        settingClick.volume = 0.4;
        settingClick.src = "sound/collection_manager_card_remove_from_deck_instant.ogg";
        settingClick.play();
    });

    $('.reset').click(function () {
        games_played++;
        reset_stats();
        display_stats();
        $('.row1').addClass('ring');
        $('.row2').addClass('ring');
        $('.row3').addClass('ring');
        setTimeout(removeRow, 5000);
        setTimeout(shuffleCard2(frontCardArray2), 6000);
        $('.card').removeClass('hidden');
        var settingClick= new Audio();
        settingClick.src = "sound/AdventurePanel_down.ogg";
        settingClick.play();
        var settingClick2= new Audio();
        settingClick2.src = "sound/crafting_create_card_start.ogg";
        settingClick2.play();
        $('.card').removeClass('match_card');



    });
    $('.close').click(function () {
        $('.modal').css({display: 'none'});
    });
    // $('.row1').sortable();   sortable not working why?
    $(window).click(function () {
        if ($('.modal').css('display') === 'block') {
            $('.modal').css({display: 'none'});
        }
    });

    $('#pop-out').on('click', function () {
        openModal(this);

    });
    $('.setting').on('click', function () {
        openModal(this);
        var settingClick= new Audio();
        settingClick.src = "sound/AdventurePanel_down.ogg";
        settingClick.play();
    });

    $('.sounds').on('click', togglePlay);



});

    var first_card_clicked= null;
    var second_card_clicked = null;
    var total_possible_matches=9;
    var match_counter = 0;
    var bouncer=true;

    var matches =0;
    var attempt=0;
    var accuracy=0;
    var games_played=1;
    var cardPairs=2;
    var game_points=0;
    // var frontCardArray=["img/Avallac'h.gif","img/Fringilla_Vigo.gif","img/Marching_Orders.gif","img/Triss;_Butterfly_Spell.gif","img/Torrential_Rain.gif", "img/Eskel3.gif", "img/Iris.gif", "img/Geralt.gif", "img/Fake_Ciri.gif"]
    var frontCardArray2=[
        {
            src: "img/Avallac'h.gif",
            power: 10,
            cardType: "regular"},
        {
            src: "img/Fringilla_Vigo.gif",
            power: 6,
            cardType:"regular"},
        {
            src: "img/Marching_Orders.gif",
            power: 0,
            cardType: "marching"},
        {
            src: "img/Triss;_Butterfly_Spell.gif",
            power: 5,
            cardType:"regular"},
        {
            src:  "img/Torrential_Rain.gif",
            power: 0,
            cardType:"rain"},
        {
            src:  "img/Eskel3.gif",
            power: 5,
            cardType:"regular"},
        {
            src:  "img/Iris.gif",
            power: 2,
            cardType:"regular"},
        {
            src:  "img/Geralt.gif",
            power: 12,
            cardType:"regular"},
        {
            src:  "img/Fake_Ciri.gif",
            power: 6,
            cardType:"regular"}
           ];


    function shuffleCard2(cards){
        var cardArrayCopy=[cards.slice(), cards.slice()];
        for(var pair_index=0; pair_index<2; pair_index++) {
            for (var card_index = (cardArrayCopy[pair_index].length), card_order=1; card_index >=0 ,card_order<=cards.length; card_index--, card_order++) {
                var randomCard = Math.floor(Math.random() * cardArrayCopy[pair_index].length);
                // var chosenCard = (cardArrayCopy[pair_index])[randomCard].src;
                var chosenCard = (cardArrayCopy[pair_index])[randomCard];
                var newCardIndex = ((card_order)+(cards.length*pair_index));
                // $(".card:nth-of-type(" + newCardIndex + ")>.front>img").attr('src', chosenCard);
                $(".card:nth-of-type(" + newCardIndex + ")>.front>img").attr(chosenCard);
                cardArrayCopy[pair_index].splice(randomCard, 1);
            }
        }
    }

    var isPlaying= false;
    /*===============================Button Click Function==============================================*/
    function card_clicked(obj) {
        if(bouncer === true && $(obj).attr('gotit') === undefined) {
            bouncer = false;
            if (first_card_clicked === null) {
                first_card_clicked = obj;
                $(first_card_clicked).addClass('hidden');
                bouncer = true;
                $(first_card_clicked).attr('gotit', true);
                return; // Unneeded,

            } else {
                second_card_clicked = obj;
                attempt++;
                $(second_card_clicked).addClass('hidden');
                var first_card_attr=$(first_card_clicked).find(".front img").attr('src');
                var second_card_attr=$(second_card_clicked).find(".front img").attr('src');
                if (first_card_attr === second_card_attr) {
                    match_counter++;
                    var points= $(second_card_clicked).find(".front img").attr('power');
                    game_points+= parseInt(points);
                    // $(first_card_clicked).attr('gotit', true);
                    $(second_card_clicked).attr('gotit', true);
                    $(first_card_clicked).addClass('match_card');
                    $(second_card_clicked).addClass('match_card');
                    first_card_clicked = null;
                    second_card_clicked = null;
                    matches++;



                    if (match_counter === total_possible_matches) {
                        setTimeout(openModal,1000);

                    } else {
                        var settingClick= new Audio();
                        settingClick.src = "sound/Shared_FangImpact02GoldDeath_PreCast_1.ogg";
                        settingClick.play();

                        bouncer=true;
                        return
                    }
                } else {
                    setTimeout(delay, 2000);
                    $('.card').addClass('spinner');
                    var settingClick= new Audio();
                    settingClick.src = "sound/EX1_573t Treant_EnterPlay1.ogg";
                    settingClick.play();
                    $(second_card_clicked).removeAttr('gotit');
                    $(first_card_clicked).removeAttr('gotit');
                    function delay() {
                        $(first_card_clicked).removeClass('hidden');
                        $(second_card_clicked).removeClass('hidden');
                        $('.card').removeClass('spinner');
                        first_card_clicked = null;
                        second_card_clicked = null;
                        bouncer = true;
                        // animation: spin 8s infinite linear;
                    }
                    return;
                }
            }
        }
    };

    /*=====================================================================================================================*/
    function display_stats(){
        $('.games-played .value').text(games_played);
        $('.attempts .value').text(attempt);
        $('.points .value').text(game_points);
        accuracy= (matches/attempt*100).toFixed(2);
        if(accuracy !== "NaN") {
            $('.accuracy .value').text(accuracy + ' %');
        } else{$('.accuracy .value').text('0 %');}
    }


    function reset_stats(){
        accuracy=0;
        matches=0;
        attempt=0;
        game_points=0;
        display_stats();
        $('.card').removeAttr("gotit");

    }

    //-----------------------------------------MODAL-----------------------------------------------------------------------/


var infoMusic= new Audio();
infoMusic.src = "sound/Collection Manager.ogg";

function openModal(element) {
    if($(element).attr('id') === "pop-out"){
        if($('#myModal2').css('display')=== 'block'){
            $('#myModal2').css({display: 'none'});
            infoMusic.pause();
            infoMusic.currentTime = 0.0;
        }else{
            $('#myModal2').css({display: 'block'});
            infoMusic.play();
        }
    }else if($(element).attr('class') === "setting"){
        if($('#myModal3').css('display')=== 'block'){
            $('#myModal3').css({display: 'none'});

        }else{
            $('#myModal3').css({display: 'block'});
        }
    } else{
        $('#myModal').css({display: 'block'});
        var settingClick= new Audio();
        settingClick.src = "sound/victory_screen_start.ogg";
        settingClick.play();
    }
}

function removeRow(){
    $('.row1').removeClass('ring');
    $('.row2').removeClass('ring');
    $('.row3').removeClass('ring');
}

//--------------------------Sound-----------------------------------//
// function playSound(sound_class) {
//     var sound_url=$(sound_class + ' source').attr('src');  //$('.sound_what source').attr('src')
//     $(sound_url)[0].play();
// };

// function togglePlay() {
//     return myOst.paused ? myOst.play() : myOst.pause();
// }; doesn't work

var $soundOff=$('<i>').attr({
    class: "fa fa-volume-off",
    "aria-hidden" : "true"
});
var $soundOn=$('<i>').attr({
    class: "fa fa-volume-up",
    "aria-hidden" : "true"
});
function togglePlay() {
    if (isPlaying) {
        $('#ost')[0].pause();
        isPlaying = false;
        $("i").remove();
        $('.sounds').append($soundOff);



    } else {
        $('#ost')[0].play();
        isPlaying = true;
        $("i").remove();
        $('.sounds').append($soundOn);
    }
};
