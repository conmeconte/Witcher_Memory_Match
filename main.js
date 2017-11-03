
$(document).ready(function(){
    $('.card').click(function(){
        card_clicked(this);
        display_stats();
    });
    $('.reset').click(function(){
        games_played++;
        reset_stats();
        display_stats();
        $('.row1').addClass('ring');
        $('.row2').addClass('ring');
        $('.row3').addClass('ring');
        setTimeout(removeRow, 5000);
        setTimeout(mix_card, 6000);
        $('.card').removeClass('hidden');
    });
    $('.close').click(function() {
        $('.modal').css({display: 'none'});
    });
    // $('.row1').sortable();   sortable not working why?
    $(window).click( function() {
        if ($('.modal').css('display') === 'block') {
            $('.modal').css({display: 'none'});
        }
        // if($('#myModal2').css('display')=== 'block'){
        //     $('#myModal2').css({display: 'none'});
        // }
    });

    $('#pop-out').on('click',function(){
        openModal(this);
    });

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
    function mix_card(){
        var row1= $('.row1');
        var row1Card1= $('.row1>.card:first-of-type');
        $('.game-area').append(row1);
        $('.row1').append(row1Card1);
        $('.row2').append($('.row2>.card:nth-of-type(2)'));
    }

    //-----------------------------------------MODAL-----------------------------------------------------------------------/



function openModal(element) {
    if($(element).attr('id') === "pop-out"){
        $('#myModal2').css({display: 'block'})
    } else{ $('.modal').css({display: 'block'})}
}

function removeRow(){
    $('.row1').removeClass('ring');
    $('.row2').removeClass('ring');
    $('.row3').removeClass('ring');
}

