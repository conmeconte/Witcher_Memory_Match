function Controller(cardArray){
        this.controller= this; 


    this.initialize= () => {
        this.model= new Model(this);
        this.view= new View(this);
        this.view.init(); 

        this.model.createCards()
        this.model.shuffleCard(cardArray);
        this.checkSoundOption(); 
    }

    this.display_stats= () => {
        $('.games-played .value').text(this.model.games_played);
        $('.attempts .value').text(this.model.attempt);
        $('.points .value').text(this.model.game_points);
        this.model.accuracy= (this.model.matches/this.model.attempt*100).toFixed(2);
        if(this.model.accuracy !== "NaN") {
            $('.accuracy .value').text(this.model.accuracy + ' %');
        } else{$('.accuracy .value').text('0 %');}
    }

    this.reset_stats= () => {
        this.model.accuracy=0;
        this.model.matches=0;
        this.model.attempt=0;
        this.model.game_points=0;
        this.display_stats();
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
        $('.row1').removeClass('ring');
        $('.row2').removeClass('ring');
        $('.row3').removeClass('ring');
    }

    this.togglePlay= () => {
        if (this.model.isPlaying) {
            $('#ost')[0].pause();
            isPlaying = false;
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