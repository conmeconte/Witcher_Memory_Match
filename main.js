
$(document).ready(function() {
    shuffleCard2(frontCardArray2);
    $(window).click(function () {
        if ($('.modal').css('display') === 'block') {
            $('.modal').css({display: 'none'});
        }
        if ($('#winModal').css('display') === 'block') {
            $('.modal').css({display: 'none'});
        }
        if ($('#ruleModal').css('display') === 'block') {
            $('.modal').css({display: 'none'});
        }
        if ($('#settingModal').css('display') === 'block') {
            $('.modal').css({display: 'none'});
        }
    });
    checkSoundOption(); 
    $('.card').click(function () {
        if($('.row1').hasClass('ring')){
            return; 
        }
        card_clicked(this);
        display_stats();
        var settingClick= new Audio();
        settingClick.src = "sound/class_tab_click.ogg";
        settingClick.play();
    });
    $('.card').on('mouseenter', function() {
        if(!this.classList.contains("hover") && !this.hasAttribute("gotit")){
            this.classList.add("hover"); 
            var settingClick= new Audio();
            settingClick.volume = 0.4;
            settingClick.src = "sound/collection_manager_card_remove_from_deck_instant.ogg";
            settingClick.play();
            setTimeout(()=>{this.classList.remove("hover")}, 1000); 
        }

    });

    $('.reset').click(function () {
        games_played++;
        reset_stats();
        display_stats();
        $('.row1').addClass('ring');
        $('.row2').addClass('ring');
        $('.row3').addClass('ring');
        bouncer=false;
        setTimeout(removeRow, 5000);
        setTimeout(()=>{
            shuffleCard2(frontCardArray2);
            bouncer=true; 
        }, 6000);
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

/*========================Global Variables===============================================*/

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
    var isPlaying= false;




    function shuffleCard2(cards){
        var cardArrayCopy=[cards.slice(), cards.slice()];
        for(var pair_index=0; pair_index<2; pair_index++) {
            for (var card_index = (cardArrayCopy[pair_index].length), card_order=1; card_index >=0 ,card_order<=cards.length; card_index--, card_order++) {
                var randomCard = Math.floor(Math.random() * cardArrayCopy[pair_index].length);
                var chosenCard = (cardArrayCopy[pair_index])[randomCard];
                var newCardIndex = ((card_order)+(cards.length*pair_index));
                $(".card:nth-of-type(" + newCardIndex + ")>.front>img").attr(chosenCard);
                cardArrayCopy[pair_index].splice(randomCard, 1);
            }
        }
    }

    /*===============================Button Click Function==============================================*/
    function card_clicked(obj) {
        if(bouncer && !$(obj).attr('gotit')) {
            bouncer = false;
            if (!first_card_clicked) {
                first_card_clicked = obj;
                $(first_card_clicked).addClass('hidden');
                bouncer = true;
                $(first_card_clicked).attr('gotit', true);

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
        if($('#rulesModal').css('display')=== 'block'){
            $('#rulesModal').css({display: 'none'});
            infoMusic.pause();
            infoMusic.currentTime = 0.0;
        }else{
            $('#rulesModal').css({display: 'block'});
            infoMusic.play();
        }
    }else if($(element).attr('class') === "setting"){
        if($('#settingModal').css('display')=== 'block'){
            $('#settingModal').css({display: 'none'});

        }else{
            $('#settingModal').css({display: 'block'});
        }
    } else{
        $('#winModal').css({display: 'block'});
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
        localStorage.setItem('music', 'off');


    } else {
        $('#ost')[0].play();
        isPlaying = true;
        $("i").remove();
        $('.sounds').append($soundOn);
        localStorage.setItem('music', 'on');

    }
};

function checkSoundOption(){
    var userOption = localStorage.getItem('music');
    if(userOption==='on'){
        isPlaying= false; 
        togglePlay(); 
    }else{
        isPlaying=true;
        togglePlay(); 
    }
}