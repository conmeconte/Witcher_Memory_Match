
function View(controller){
    this.controller= controller;
    this.model= controller.model; 

    this.init = function(){

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



}