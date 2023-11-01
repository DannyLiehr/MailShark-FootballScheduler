# Indesign Football Scheduler
[![Version](https://img.shields.io/badge/version-v1.0.0-blue.svg)](https://github.com/DannyLiehr/MailShark-FootballScheduler)
This extension automatically sets team name, team swatches, player image and merges a single page document. The end result is a football schedule with the user's selected team swatch, jersey name (if applicable), jersey number, and timezone.

## Documentation
This is a CEP Adobe Extension. The bulk of this program is written in JSX, specifically EC3 JS (1998). **All arguments and data must be passed to the JSX files as strings. The functions use British English because I use British English. Thanks for understanding!**

### Functions 
#### changeColour(type, c,m,y,k)
File: `hostscript.jsx`
Changes the colour of the document. This changes one swatch at a time for sanity's sake.
| Argument | Description |
| -------- | ------- |
| type  | Type of colour to change ("Primary", "Secondary", "Tertiary")   |
| c | Cyan value of colour     |
| m    | Magenta value of colour    |
| y | Yellow value of colour     |
| k    | Key (Black) value of colour    |
#### addSchedule(path)
File: `hostscript.jsx`
Changes the colour of the document. This changes one swatch at a time for sanity's sake.
| Argument | Description |
| -------- | ------- |
| path  | The path of the team's CSV. This automatically points to the project's "CSV" folder. |
#### talkToPhotoshop(jsxPath, fbOptions, actDir, playDir, preseas, mergeIndex, dest, csv)
File: `hostscript.jsx`
Launches Photoshop, makes actions happen, places the file and merges out the document.
| Argument | Description |
| -------- | ------- |
| jsxpath  | Path to exec_photoshop.jsx |
| fbOptions  | Stringified JSON of the football team & data necessary to create the files. |
| actDir  | Path to "actions" directoryr. |
| playDir  | playDir Path to "templates" directory. |
| preseas  | Whether or not preseason is enabled. |
| mergeIndex  | Which row of the CSV to merge out into a single page document. |
| dest  | The user's downloads folder to save the PDF to. |
| csv  | Path to "CSV" directory. |