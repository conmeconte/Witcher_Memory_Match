var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 2;
var match_counter = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 5;
var all_cards_off = false;



$(document).ready(function(){
    
    $('.card').click(check_cards);


});

function display_stats() {
    if(attempts >= 1){
        $('.attempts .value').text(attempts);
    }
    if(games_played >= 1){
        $('.games-played .value').text(games_played);
    }


}

function reset_stats() {
    accuracy = 0;
    match_counter = 0;
    attempts = 0;
    games_played++;
    display_stats();
}

function flip_cards() {
    first_card_clicked.click(check_cards).children('div.back').show();
    second_card_clicked.click(check_cards).children('div.back').show();
    first_card_clicked = null;
    second_card_clicked = null;
    all_cards_off = false;
}

function check_cards() {
    if (all_cards_off == true) {
        return;
    }

    var card=$(this);
    console.log('this is in the inside function ', card);
    card.off('click');
    if (first_card_clicked == null) {
        console.log("I am a card");
        first_card_clicked = card;
        $(this).find('.back').hide();
        card = $(this);
        console.log('card is now',card);
    }

    else {  //the second card was clicked
        $(this).find('.back').hide();
        second_card_clicked = card;
        console.log('card is also', card);

        var card_1_src = first_card_clicked.find('img').attr('src');
        var card_2_src = second_card_clicked.find('img').attr('src');

        if (card_1_src == card_2_src){
            console.log('first and second card match');
            match_counter++;
            attempts++;
            first_card_clicked = null;
            second_card_clicked = null;
            console.log("first card and second card clicked is now",first_card_clicked, "and",second_card_clicked);
            if(match_counter == total_possible_matches){
                console.log('you win');
                games_played++
            }
        }
        else {
            attempts++;
            all_cards_off = true;
            setTimeout(flip_cards, 1000);
            console.log('first and second card do not match');
            console.log(first_card_clicked, second_card_clicked);

        }
    }
    display_stats();
}



