//Code you want to execute
// app.doAction("ActionStep","ActionFile.ATN");
var act = argv1 + " (" + argv4 + ")";
var actset;
var fileSelect;
switch(argv4){
    case "Front":
        actset= "Team Colors (Jersey)";
        fileSelect= "front player";
        break;
    case "Back":
        actset= "Team Colors (Jersey)";
        fileSelect= "back player";
        break;
    case "Helmet":
        actset= "Team Colors (Helmet)";
        fileSelect= "helmet";
        break;
    default:
        // Default is jersey.
        actset= "Team Colors (Jersey)";
        fileSelect= "front player";
}
// var playerPath = path.join(__dirname, 'templates/' + fileSelect + '.psdt');
var playerPath= argv5 + "/templates/" + fileSelect + ".psdt";
// var actionPath = path.join(__dirname, 'actions/' + actset + '.atn');
var actionPath= argv5 + "/actions/" + actset + ".atn";

var file = new File(playerPath);
// Open the file for reading.
file.open("r");

// app.activeDocument.activeLayer = app.activeDocument.artLayers.getByName("Player");
// app.doAction(act, actionPath);
alert(actionPath);