$(document).ready(function(){
    $('.card').on("click", card_clicked);
    var first_card_clicked= null;
    var second_card_clicked = null;
    var total_possible_matches=9;
    var match_counter = 0;
    var bouncer=true;


    function card_clicked() {
        if(bouncer === true){
            bouncer=false;
        if (first_card_clicked === null) {
            first_card_clicked = this;
            $(first_card_clicked).addClass('hidden');
            bouncer=true;
            return;

        } else {
            second_card_clicked = this;
            $(second_card_clicked).addClass('hidden');
            if (first_card_clicked === second_card_clicked) {
                match_counter++;
                first_card_clicked = null;
                second_card_clicked = null;
                if (match_counter === total_possible_matches) {
                    return alert("You Win!")
                } else {
                    return
                }
            } else {
                setTimeout(delay, 2000);

                function delay() {
                    $(first_card_clicked).removeClass('hidden');
                    $(second_card_clicked).removeClass('hidden');
                    first_card_clicked = null;
                    second_card_clicked = null;
                    bouncer=true; }
                return;
            }
        }

    }}
});


