
$(document).ready(function(){
    $('.card').click(function(){
        card_clicked(this);
        display_stats();
    });
    $('.reset').click(function(){
        games_played++;
        reset_stats();
        display_stats();
        $('.card').removeClass('hidden');
        console.log('hehahaha');

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
        if(bouncer === true) {
            bouncer = false;
            if (first_card_clicked === null) {
                first_card_clicked = obj;
                $(first_card_clicked).addClass('hidden');
                bouncer = true;
                return;

            } else {
                second_card_clicked = obj;
                attempt++;
                $(second_card_clicked).addClass('hidden');
                var first_card_attr=$(first_card_clicked).find(".front img").attr('src');
                var second_card_attr=$(second_card_clicked).find(".front img").attr('src');
                if (first_card_attr === second_card_attr) {
                    match_counter++;
                    first_card_clicked = null;
                    second_card_clicked = null;
                    matches++

                    if (match_counter === total_possible_matches) {
                        return alert("You Win!")
                    } else {
                        bouncer=true;
                        return
                    }
                } else {
                    setTimeout(delay, 2000);

                    function delay() {
                        $(first_card_clicked).removeClass('hidden');
                        $(second_card_clicked).removeClass('hidden');
                        first_card_clicked = null;
                        second_card_clicked = null;
                        bouncer = true;
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
    }