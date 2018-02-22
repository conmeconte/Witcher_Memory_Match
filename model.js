function Model(controller){
    this.controller= controller;
    

    this.first_card_clicked= null;
    this.second_card_clicked = null;
    this.total_possible_matches=9;
    this.match_counter = 0;
    this.bouncer=true;

    this.matches =0;
    this.attempt=0;
    this.accuracy=0;
    this.games_played=1;
    this.cardPairs=2;
    this.game_points=0;
    this.isPlaying= false;

    this.infoMusic= new Audio();
    this.infoMusic.src = "sound/Collection Manager.ogg"; 

    this.$soundOff=$('<i>').attr({
        class: "fa fa-volume-off",
        "aria-hidden" : "true"
    });
    this.$soundOn=$('<i>').attr({
        class: "fa fa-volume-up",
        "aria-hidden" : "true"
    });


    
    this.createCards= () => {
        for(var i=1; i<=frontCardArray.length*2; i++){
            
            const cardImgFront= $('<img>')
            const cardImgBack= $('<img>')
            const front= $('<div>').addClass("front")
            const back= $('<div>').addClass("back")
            const card= $('<div>').addClass(`card num${i}`)

            front.append(cardImgFront);
            back.append(cardImgBack);
            card.append(front, back); 

            $('.card_row').append(card)

        }


    }


    this.shuffleCard= (cards) => {
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

    this.card_clicked = (obj) => {
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
                    this.delay= () => {
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
}