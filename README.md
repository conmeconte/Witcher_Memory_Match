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

> - Proto - JS Event Handling
- Proto - JS Functions

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
    - `git checkout -b v1.0`
> - Work on the scope defined <a href="https://github.com/Learning-Fuze/memory_match/tree/v1.0#scope">Below</a>
> - Save your work to gitHub
> - Add files to git
    - `git add .`
> - Commit files (Group files together)
    - `git commit -m "Memory Match v1.0 - Your Name"`
    - **Replace "Your Name" with your first and last name**
> - Send to gitHub (Push)
    - `git push origin v1.0`
> - Create pull request
    - Pull request should be made from v1.0 to **your repository's** master branch
    - Receive Peer review on your pull request (Wait for Instruction)
        - Reviewer should merge pull request through Github UI once all comments have been resolved
> - **Once Peer Review is complete & auto merge happens through Github UI**
    - Switch to master branch locally
        - `git checkout master`
    - Pull latest merged code
        - `git pull origin master`

### Scope

>- Adding Stats
    - Declare a global variable, `matches`, and set it to 0
        - Every time the application finds a match this variable should be incremented by 1
    - Declare a global variable, `attempts`, and set it to 0
        - Every time a user attempts a match (clicks the 2nd card) the attempts should be incremented by 1
    - Declare a global variable, `accuracy`, and set it to 0
        - Accuracy is defined as a percentage of matches / attempts
    - Declare a global variable, `games_played` and set it to 0
        - When the page is loaded a new global variable should be defined called games_played. When the game is reset by clicking the reset button the games_played should be incremented by 1.
    - Declare a function, `display_stats`, that has the following functionality
        - Inserts the **games_played** value into the element that would be selected like this “.games-played .value”
        - Insert **attempts** value into the element that would be selected using this selector “.attempts .value”
        - Formats **accuracy** to be a percentage number with the **%** sign
        - Takes formatted **accuracy** and inserts the value of the variable into the element that has the selector of “.accuracy .value”
    - Declare a function, `reset_stats`, that has the following functionality
        - Resets variable **accuracy** to 0
        - Resets variable **matches** to 0
        - Resets variable **attempts** to 0
        - Calls **display_stats** function
    - On **Reset button** click, the function handler for the click event should have the following functionality
        - increment games_played by 1
        - call reset_stats
        - call display_stats
        - Reset all cards to have the back face showing
