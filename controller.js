function Controller(cardArray){
        this.controller= this; 
        this.cards= cardArray; 


    this.initialize= () => {
        this.model= new Model(this);
        this.view= new View(this);
        this.view.init(); 

        this.model.createCards()
        this.model.shuffleCard(cardArray);
        this.checkSoundOption(); 

        $('.card').click(this.handleCardClicked.bind(this));
        $('.card').on('mouseenter', this.handleMouseEnter.bind(this));
    
        $('.reset').click(function () {
            this.model.games_played++;
            this.reset_stats();
            this.view.display_stats();
            $('.card_row').addClass('ring');
            this.model.bouncer=false;
            setTimeout(this.controller.removeRow, 5000);
            setTimeout(()=>{
                this.model.shuffleCard(this.controller.cards);
                this.model.bouncer=true; 
            }, 6000);
            $('.card').removeClass('hidden');
            this.settingClick= new Audio();
            this.settingClick.src = "sound/AdventurePanel_down.ogg";
            this.settingClick.play();
            this.settingClick2= new Audio();
            this.settingClick2.src = "sound/crafting_create_card_start.ogg";
            this.settingClick2.play();
            $('.card').removeClass('match_card');
        }.bind(this));

        $('.close').click(function () {
            $('.modal').css({display: 'none'});
        });
        $('body').click(function() {
            if(event.target.className === "modal"){
                $('.modal').css({display: 'none'});
            }
        });

        $('#pop-out').on('click', function () {
            this.openModal(event.target);
    
            }
        .bind(this));

        $('.setting').on('click', function (event) {
            this.openModal(event.target);
            this.settingClick= new Audio();
            this.settingClick.src = "sound/AdventurePanel_down.ogg";
            this.settingClick.play();
        }.bind(this));
    
        $('.sounds').on('click', this.togglePlay.bind(this));
    }

    
    this.handleCardClicked= (event) => {
        if($('.card_row').hasClass('ring')){
            return; 
        }
        this.model.card_clicked(event.currentTarget);
        this.view.display_stats();
        this.settingClick= new Audio();
        this.settingClick.src = "sound/class_tab_click.ogg";
        this.settingClick.play();
    }

    this.handleMouseEnter= (event) => {
        if(!event.currentTarget.classList.contains("hover") && !event.currentTarget.hasAttribute("gotit")){
            event.currentTarget.classList.add("hover"); 
            this.settingClick= new Audio();
            this.settingClick.volume = 0.4;
            this.settingClick.src = "sound/collection_manager_card_remove_from_deck_instant.ogg";
            this.settingClick.play();
            setTimeout(()=>{event.currentTarget.classList.remove("hover")}, 1000); 
        }
    }


    this.reset_stats= () => {
        this.model.accuracy=0;
        this.model.matches=0;
        this.model.attempt=0;
        this.model.game_points=0;
        this.view.display_stats();
        $('.card').removeAttr("gotit");

    }
    this.openModal = (element) => {
        if($(element).attr('id') === "pop-out"){
            if($('#rulesModal').css('display')=== 'block'){
                $('#rulesModal').css({display: 'none'});
                this.model.infoMusic.pause();
                this.model.infoMusic.currentTime = 0.0;
            }else{
                $('#rulesModal').css({display: 'block'});
                this.model.infoMusic.play();
            }
        }else if($(element).attr('class') === "setting"){
            if($('#settingModal').css('display')=== 'block'){
                $('#settingModal').css({display: 'none'});
    
            }else{
                $('#settingModal').css({display: 'block'});
            }
        } else{
            $('#winModal').css({display: 'block'});
            this.settingClick= new Audio();
            this.settingClick.src = "sound/victory_screen_start.ogg";
            this.settingClick.play();
        }
    }
    this.removeRow= () => {
        $('.card_row').removeClass('ring');
    }

    this.togglePlay= () => {
        if (this.model.isPlaying) {
            $('#ost')[0].pause();
            this.model.isPlaying = false;
            $("i").remove();
            $('.sounds').append(this.model.$soundOff);
            localStorage.setItem('music', 'off');
    
    
        } else {
            $('#ost')[0].play();
            this.model.isPlaying = true;
            $("i").remove();
            $('.sounds').append(this.model.$soundOn);
            localStorage.setItem('music', 'on');
    
        }
    };

    this.checkSoundOption = () => {
        this.userOption = localStorage.getItem('music');
        if(this.userOption==='on'){
            this.model.isPlaying= false; 
            this.togglePlay(); 
        }else{
            this.model.isPlaying=true;
            this.togglePlay(); 
        }
    }
    
}