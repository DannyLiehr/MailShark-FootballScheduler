//Code you want to execute
// app.doAction("ActionStep","ActionFile.ATN");
var act = argv1 + " (" + argv4 + ")";
var actset;
var fileSelect;
var targetLayer;
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
actset = actset + ".atn";
var fileStr = argv6 + "/" + fileSelect + ".psdt";
var file = new File(fileStr);
// Open the file for reading.
// file.open("r");

// app.activeDocument.activeLayer = app.activeDocument.artLayers.getByName("Player");
// app.doAction(act, actionPath);
alert("Opening Football image now.");
app.open(file);
// If the image selected is the back version, set text.
if (argv4=="Helmet"){
    // Helmet
    app.activeDocument.activeLayer = app.activeDocument.artLayers.getByName("Shell");  

} else{
   if (argv4 == "Back"){
    // Has text.
    // alert("Applying back jersey text: " + argv3);
    app.activeDocument.activeLayer = app.activeDocument.artLayers.getByName("- EDIT TEXT - TEAM");
    targetLayer = app.activeDocument.artLayers.getByName("- EDIT TEXT - NUMBER");
    targetLayer.textItem.contents = argv3;
} else {
    // Front Facting player
  app.activeDocument.activeLayer = app.activeDocument.artLayers.getByName("Player");  
} 
targetLayer = app.activeDocument.artLayers.getByName("- EDIT TEXT - NUMBER");
targetLayer.textItem.contents = argv7;
}

// app.activeDocument.activeLayer = app.activeDocument.artLayers.getByName("- EDIT TEXT - NUMBER");

app.doAction(act, actset);