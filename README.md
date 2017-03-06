# Memory Match

### Overview

> Version 2.0 is a technology refactoring.  A refactoring is when code is overhauled to encorporate a new concept or to make up for "technical debt".

> ##### Related Reading

> - <a href="https://docs.google.com/presentation/d/1eAlPqkPUIN4rfDcVZefz3GBiRszlBF89qj2lSnkxzfc/pub?start=false&loop=false&delayms=3000&slide=id.g75dce0c75_1_5">READING - OOP Basics</a>
- <a href="https://docs.google.com/presentation/d/17hxhHxdsEFo42iClxdLfHeMJRnxSu7Y9lt7Tv_J9fIc/pub?start=false&loop=false&delayms=3000">READING - JS Functions</a>

> ##### Related Videos
 
> - <a href="https://www.youtube.com/watch?v=cXeHN5uydmY&feature=youtu.be" target="_blank">Video - Event Handling</a>
- <a href="https://www.youtube.com/watch?v=OzbKGDrjGW0&feature=youtu.be">Video - JS Functions</a>

> ##### Related Prototypes

> - Proto - JS OOP
- Proto - JS Functions

#### Getting Started

> - This assumes you have completed the 1.0 memory match - <a href="https://github.com/Learning-Fuze/memory_match/tree/v1.0#getting-started">View Details Here</a>.  Make sure you are starting from your 1.0 code before making a version2.0 branch.


### Scope

>- Refactor your code into the following objects:
    - #### Game
      - *properties*: 
        - cards - property that holds the cards in your game
        - first_card_clicked - property that holds the card that was firstly clicked this round
        - second_card_clicked - property that holds the card that was secondarily clicked this round
        - matches_remaining - the number of matches remaining
        - game_running - a boolean that shows whether the game is currently active or not
        - game_board_display - the dom element on the page that will contain the cards
        - stats_display - the dom element ont he page that will contain the stats
      - methods: 
        - *initialize*
          - purpose: does all house keeping for the game on startup, including initializing of button click handlers not including cards
          - params: none
          - returns: the game object
        - *create_cards*
          - purpose: creates all card objects from the card constructor / object
          - params: data pertaining to creating the cards, such as images or other information
          - returns: the game object
        - *handle_card_click*
          - purpose: 
           - checks whether it is the first or second card that has been clicked
           - checks if a match has occured
             - takes actions depending on if match occurred
        - *reset_game*
          - purpose: resets the game back to a fresh state
          - params: none
          - returns: the game object
        - *start_game*
          - purpose: changes the game state to started and initiates any other functions needed by game
          - params: none
          - returns: the game object
        - *stop_game*
          - purpose: change the game state to stopped and deactivates any needed items, such as click handlers
          - params: none
          - returns: the game object
        - *win_game*
          - purpose: checks to see if user won the game, and indicate to the user that the game is won if necessary
          - params: none
          - returns: whether the game is won or not
     - #### Card
       - *create_element*
         - purpose: 
           - does everything necessary to make the dom element.  
           - attaches the click handler, which calls the card's click handler
         - params: none or may pass in necessary data to make this element, such as image
         - returns: the dom element created, for use with the game object to put in the display element
       - *flip*
         - purpose: flips the dom element or otherwise reveals the card
         - params: none
         - returns: none
       - *hide*
         - purpose: hides the card so that the back is visible again
         - params: none
         - returns: none
       - *handleClick*
         - purpose: handles the click on the card, flipping the card as necessary and informing the game that the click has happened
         - params: none
         - returns: none
     - #### Stats_view
       - *create_element*
         - purpose: 
           - creates or attaches to a stats object on the page  
         - params: none
         - returns: none
       - *display*
         - purpose: updates dom with the current stat information
         - params: none
         - returns: none
       - *update_info*
         - purpose: stores information internally in stats view, such as accuracy or attempts
         - params: multiple
         - returns: none
       - *reset*
         - purpose: resets all stats back to baseline, as necessary
         - params: multiple
         - returns: none
      
