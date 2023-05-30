# Indesign Football Scheduler

Indesign Extension that needs to communicate with Photoshop as well to set up actions.

Key points to this project:
- The extension needs to respond to users inputting a team and change the colour of a schedule accordingly. This should be the first step.
- The extension needs to work in tandem with Photoshop, open the football player of choice (from the work server? Ask Todd if home computers will be able to reach this server too), run the correct action, and then place the link into the document.
    - To do the above, the following needs to happen: 
        - Users need to specify the home directory for these files, and then locate a Links folder. If none is found, then make one.
        - Perhaps store the actions on the server as well, if you can do that?
        - The dropdown on the extension needs to have an ID matching the team's name in the photoshop action, and then in parenthesis will be the front/back/helmet choice as IDs for those too. We'll pass a concatenated string to Photoshop to choose the *exact* action they need.
- No time limit, but try to work in sprints.
- Testing Method: Guerilla Testing. Just beat the snot out of the program to find the bugs-- Shouldn't be too hard for them to arise.

## More Notes
- Search for teams in Photoshop using regex. `(/\bTERMHERE/\b)`