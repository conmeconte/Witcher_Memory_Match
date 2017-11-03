
$(document).ready(function() {
    shuffleCard(frontCardArray);
    $('.card').click(function () {
        card_clicked(this);
        display_stats();
    });
    $('.reset').click(function () {
        games_played++;
        reset_stats();
        display_stats();
        $('.row1').addClass('ring');
        $('.row2').addClass('ring');
        $('.row3').addClass('ring');
        setTimeout(removeRow, 5000);
        // setTimeout(mix_card, 6000);
        setTimeout(shuffleCard(frontCardArray), 6000);
        $('.card').removeClass('hidden');
    });
    $('.close').click(function () {
        $('.modal').css({display: 'none'});
    });
    // $('.row1').sortable();   sortable not working why?
    $(window).click(function () {
        if ($('.modal').css('display') === 'block') {
            $('.modal').css({display: 'none'});
        };
        // if($('#myModal2').css('display')=== 'block'){
        //     $('#myModal2').css({display: 'none'});
        // };
        // if($('#myModal3').css('display')=== 'block'){
        //     $('#myModal3').css({display: 'none'});
    });

    $('#pop-out').on('click', function () {
        openModal(this);
    });
    $('.setting').on('click', function () {
        openModal(this);

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
    var games_played=0;
    var cardPairs=2;
    var frontCardArray=["img/Avallac'h.gif","img/Fringilla_Vigo.gif","img/Marching_Orders.gif","img/Triss;_Butterfly_Spell.gif","img/Torrential_Rain.gif", "img/Eskel3.gif", "img/Iris.gif", "img/Geralt.gif", "img/Fake_Ciri.gif"]


    function shuffleCard(cards){
        var cardArrayCopy=[cards.slice(), cards.slice()];
        for(var pair_index=0; pair_index<2; pair_index++) {
            for (var card_index = (cardArrayCopy[pair_index].length), card_order=1; card_index >=0 ,card_order<=cards.length; card_index--, card_order++) {
                var randomCard = Math.floor(Math.random() * cardArrayCopy[pair_index].length);
                var chosenCard = (cardArrayCopy[pair_index])[randomCard];
                var newCardIndex = ((card_order)+(cards.length*pair_index));
                $(".card:nth-of-type(" + newCardIndex + ")>.front>img").attr('src', chosenCard);
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
                return; // Unneeded,

            } else {
                second_card_clicked = obj;
                attempt++;
                $(second_card_clicked).addClass('hidden');
                var first_card_attr=$(first_card_clicked).find(".front img").attr('src');
                var second_card_attr=$(second_card_clicked).find(".front img").attr('src');
                if (first_card_attr === second_card_attr) {
                    match_counter++;
                    $(first_card_clicked).attr('gotit', true);
                    $(second_card_clicked).attr('gotit', true);
                    first_card_clicked = null;
                    second_card_clicked = null;
                    matches++;


                    if (match_counter === total_possible_matches) {
                        setTimeout(openModal,1000);
                    } else {
                        bouncer=true;
                        return
                    }
                } else {
                    setTimeout(delay, 2000);
                    $('.card').addClass('spinner');
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
    function display_stats(){
        $('.games-played .value').text(games_played);
        $('.attempts .value').text(attempt);
        accuracy= (matches/attempt*100).toFixed(2);
        if(accuracy !== "NaN") {
            $('.accuracy .value').text(accuracy + ' %');
        } else{$('.accuracy .value').text('0 %');}
    }


    function reset_stats(){
        accuracy=0;
        matches=0;
        attempt=0;
        display_stats();
        $('.card').removeAttr("gotit");

    }

    //-----------------------------------------MODAL-----------------------------------------------------------------------/



function openModal(element) {
    if($(element).attr('id') === "pop-out"){
        if($('#myModal2').css('display')=== 'block'){
            $('#myModal2').css({display: 'none'});
        }else{$('#myModal2').css({display: 'block'})}
    }else if($(element).attr('class') === "setting"){
        if($('#myModal3').css('display')=== 'block'){
            $('#myModal3').css({display: 'none'});}
        else{$('#myModal3').css({display: 'block'})}
    } else{ $('#myModal').css({display: 'block'})}
}

function removeRow(){
    $('.row1').removeClass('ring');
    $('.row2').removeClass('ring');
    $('.row3').removeClass('ring');
}

//--------------------------Sound-----------------------------------//
// function playSound(sound_class) {
// //            var sound_url=$(sound_class + ' source').attr('src');  //$('.sound_what source').attr('src')
//     $(sound_class)[0].play();
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
