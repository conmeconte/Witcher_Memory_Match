
function View(controller){
    this.controller= controller;

    this.init = function(){
        $('.card').click(function () {
            if($('.card_row').hasClass('ring')){
                return; 
            }
            this.controller.model.card_clicked(this);
            display_stats();
            var settingClick= new Audio();
            settingClick.src = "sound/class_tab_click.ogg";
            settingClick.play();
        });
        $('.card').on('mouseenter', function() {
            if(!this.classList.contains("hover") && !this.hasAttribute("gotit")){
                this.classList.add("hover"); 
                this.settingClick= new Audio();
                this.settingClick.volume = 0.4;
                this.settingClick.src = "sound/collection_manager_card_remove_from_deck_instant.ogg";
                this.settingClick.play();
                setTimeout(()=>{this.classList.remove("hover")}, 1000); 
            }
    
        });
    
        $('.reset').click(function () {
            this.controller.model.games_played++;
            this.controller.reset_stats();
            this.controller.display_stats();
            $('.card_row').addClass('ring');
            this.controller.model.bouncer=false;
            setTimeout(this.controller.removeRow, 5000);
            setTimeout(()=>{
                this.controller.model.shuffleCard(this.controller.cards);
                this.controller.model.bouncer=true; 
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

        $(window).click(function () {
            if ($('.modal').css('display') === 'block') {
                $('.modal').css({display: 'none'});
            }
        });
    
        $('#pop-out').on('click', function () {
            this.controller.openModal(event.target);
    
        }.bind(this));
        $('.setting').on('click', function (event) {
            this.controller.openModal(event.target);
            this.settingClick= new Audio();
            this.settingClick.src = "sound/AdventurePanel_down.ogg";
            this.settingClick.play();
        }.bind(this));
    
        $('.sounds').on('click', this.controller.togglePlay.bind(this));

    }

}