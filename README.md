# Memory Match - Version 0.5 (v0.5)

#### Overview
> Version 0.5 is where we combine the basic JS skills we learned through the presentations & prototypes and apply it towards the v0.1 HTML structure. We will be adding the basic functionality to match cards as they are clicked and determine if the game is won by the user.

> For this version we will be breaking down the programmatic flow and explaining the decisions that the program has to make to fully understand how the user is interacting. As we move further into the program we will be showing less and less of the flow and expect a certain level of understanding of logical flow. The diagram below should help you follow along with the bullet points.

> **Related Reading**
> - <a href="https://drive.google.com/open?id=0B7eOl4joefDuR2FKZTVvN0lQQ00">READING - JS Comparisons & Conditionals</a>
> - <a href="https://drive.google.com/open?id=0B7eOl4joefDuRHNPU0xXNUNIRGs">READING - JS Functions</a>

> **Related Videos**
> - <a href="https://plus.google.com/u/0/events/cn2ca07j9v8nt5kdd1olqe3ljrc?authkey=CNK97_OZ4ee8ag">Video - JS Functions</a>
> - <a href="https://plus.google.com/u/0/hangouts/onair/watch?hid=hoaevent%2Fc4a35jk6e468buf0fpua0em74dc&ytl=...">Video - JS Comparisons and Conditionals</a>

> **Related Prototypes**
> - <a href="https://github.com/Learning-Fuze/prototypes/tree/master/js_comparisons_conditionals">PROTOTYPE - JS Comparisons & Conditionals</a>
> - <a href="https://github.com/Learning-Fuze/prototypes/tree/master/js_functions">PROTOTYPE - JS Functions</a>

#### Getting Started

> - If you haven't already started the v0.1 start there - <a href="https://github.com/Learning-Fuze/memory_match/tree/v0.1#getting-started">View Details Here</a>
> - Are you on your master branch?
    - **Yes** - continue to "Pull Latest Changes"
    - **I dont know** Run the command below
        - `git branch` - this will highlight the branch you are currently on
    - **No** - Make sure you `git add .` and `git commit` to your current branch before you switch to your master branch
> - Pull Latest Changes    
        - `git checkout master`
        - `git pull origin master` - **Now continue with the next steps**
> - Create a feature branch
    - `git checkout -b v0.5`
> - Work on the scope defined <a href="https://github.com/Learning-Fuze/memory_match/tree/v0.5#scope">Below</a>
> - Save your work to gitHub
> - Add files to git
    - `git add .`
> - Commit files (Group files together)
    - `git commit -m "Memory Match v0.5 - Your Name"`
    - **Replace "Your Name" with your first and last name**
> - Send to gitHub (Push)
    - `git push origin v0.5`
> - Create pull request
    - Pull request should be made from v0.5 to **your repository's** master branch
    - Receive Peer review on your pull request (Wait for Instruction)
        - Reviewer should merge pull request through Github UI once all comments have been resolved
> - **Once Peer Review is complete & auto merge happens through Github UI**
    - Switch to master branch locally
        - `git checkout master`
    - Pull latest merged code
        - `git pull origin master`

#### Scope

> - Create 4 card static layout by removing 7 of the nine matching cards
> - Add a click handler to each card by 1 of these 2 methods
>   - jQuery - Intermediate
>       - Add click method to a jQuery Selector with the parameter equal to a function called card_clicked
>   - onclick attribute - Fundamentals
>       - the value of the attribute on each element should be set to card_clicked with a parameter of the keyword this
> - Declare and assign 3 global (see scope presentation) variables
>   - **first_card_clicked** assigned to null
>   - **second_card_clicked** assigned to null
>   - **total_possible_matches** assign to number of total possible matches (in this case 2)
>   - *match_counter* assigned to 0
> - Declare card_clicked function in the script.js file with the following functionality in it
>   - Show the card face
>   - Check if variable first_card_clicked is not null
>       - true - assign first_card_clicked equal to the html DOM Element that was clicked
>           - click handler functionality is complete, return
>       - false - assign second_card_clicked to the html DOM Element that was clicked
>           - check if first_card_clicked is equivalent to the second_card_clicked
>               - true
>                   - increment match_counter by 1
>                   - reset both variables defined above to null again and then wait for next card click
>                   - check if match_counter is equivalent to total_possible_matches
>                       - true
>                           - Display a message to the user they have won
>                       - false
>                           - click handler functionality is complete, return
>               - false
>                   - Wait 2 seconds then
>                       - Be wary of waiting programmatically but not being able to control the user from clicking on cards while the program waits execute the reset of the code
>                       - Show card back on both elements that are flipped over
>                       - reset both card_clicked
>                       - variables to null
>                       - click handler functionality is complete, return
> <img src="https://docs.google.com/drawings/d/1JT0nsiTg3HXG2L3QFPnfAmPoQDWUCRNKDvl2qr1r9xo/pub?w=960&h=720" width="750"/>
