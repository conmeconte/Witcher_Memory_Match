var game = null;

$(document).ready(function(){
    game = new MemoryMatchGame();
});

function MemoryMatchGame(){
    /*properties*/
    this.initialize = function(){
    }
    this.create_cards = function(){
    }
    this.handle_card_click = function(){
    }
    this.reset = function(){
    }
    this.start = function(){
    }
    this.stop = function(){
    }
    this.win_check = function(){
    }
    function Card(){
      this.create_element = function(){
      }
      this.show = function(){
      }
      this.hide = function(){
      }
      this.handleClick = function(){
      }
    }
    function Stats_view(){
      this.create_element = function(){
      }
      this.display(){
      }
      this.update_info(){
      }
      this.reset(){
      }
    }
}
