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
        if(this.bouncer && !$(obj).attr('gotit')) {
            this.bouncer = false;
            if (!this.first_card_clicked) {
                this.first_card_clicked = obj;
                $(this.first_card_clicked).addClass('hidden');
                this.bouncer = true;
                $(this.first_card_clicked).attr('gotit', true);

            } else {
                this.second_card_clicked = obj;
                this.attempt++;
                $(this.second_card_clicked).addClass('hidden');
                this.first_card_attr=$(this.first_card_clicked).find(".front img").attr('src');
                this.second_card_attr=$(this.second_card_clicked).find(".front img").attr('src');
                if (this.first_card_attr === this.second_card_attr) {
                    this.match_counter++;
                    this.points= $(this.second_card_clicked).find(".front img").attr('power');
                    this.game_points+= parseInt(this.points);
                    $(this.second_card_clicked).attr('gotit', true);
                    $(this.first_card_clicked).addClass('match_card');
                    $(this.second_card_clicked).addClass('match_card');
                    this.first_card_clicked = null;
                    this.second_card_clicked = null;
                    this.matches++;
                    if (this.match_counter === this.total_possible_matches) {
                        setTimeout(this.controller.openModal,1000);

                    } else {
                        this.settingClick= new Audio();
                        this.settingClick.src = "sound/Shared_FangImpact02GoldDeath_PreCast_1.ogg";
                        this.settingClick.play();

                        this.bouncer=true;
                        return
                    }
                } else {
                    setTimeout(this.delay, 2000);
                    $('.card').addClass('spinner');
                    this.settingClick= new Audio();
                    this.settingClick.src = "sound/EX1_573t Treant_EnterPlay1.ogg";
                    this.settingClick.play();
                    $(this.second_card_clicked).removeAttr('gotit');
                    $(this.first_card_clicked).removeAttr('gotit');
                    return;
                }
            }
        }
    };
    this.delay = () => {
        $(this.first_card_clicked).removeClass('hidden');
        $(this.second_card_clicked).removeClass('hidden');
        $('.card').removeClass('spinner');
        this.first_card_clicked = null;
        this.second_card_clicked = null;
        this.bouncer = true;
    }
}