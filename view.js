
function View(controller){
    this.controller= controller;

    this.init = function(){
        $('.card').click(function () {
            if($('.row1').hasClass('ring')){
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
                var settingClick= new Audio();
                settingClick.volume = 0.4;
                settingClick.src = "sound/collection_manager_card_remove_from_deck_instant.ogg";
                settingClick.play();
                setTimeout(()=>{this.classList.remove("hover")}, 1000); 
            }
    
        });
    
        $('.reset').click(function () {
            games_played++;
            reset_stats();
            display_stats();
            $('.row1').addClass('ring');
            $('.row2').addClass('ring');
            $('.row3').addClass('ring');
            bouncer=false;
            setTimeout(removeRow, 5000);
            setTimeout(()=>{
                shuffleCard2(frontCardArray2);
                bouncer=true; 
            }, 6000);
            $('.card').removeClass('hidden');
            var settingClick= new Audio();
            settingClick.src = "sound/AdventurePanel_down.ogg";
            settingClick.play();
            var settingClick2= new Audio();
            settingClick2.src = "sound/crafting_create_card_start.ogg";
            settingClick2.play();
            $('.card').removeClass('match_card');
        });
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
    
        $('.sounds').on('click', this.controller.togglePlay);

    }

}