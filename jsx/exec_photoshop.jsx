
var act; // Photoshop Action name
var actset; // Which Action file to use.
var fileSelect; // Which Photoshop Template to grab.
var targetLayer; // Which layer to make the active/selected one for editing.

// For determining the above factors. Case = Image mode
switch(argv4){
    case "Front":
        actset= "Team Colors (Jersey)";
        fileSelect= "front player";
        act = argv1 + " (" + argv4 + ")";
        break;
    case "Back":
        actset= "Team Colors (Jersey)";
        fileSelect= "back player";
        act = argv1 + " (" + argv4 + ")";
        break;
    case "Helmet":
        actset= "Team Colors (Helmet)";
        fileSelect= "helmet";
        act = argv1;
        break;
    default:
        // Default is jersey.
        actset= "Team Colors (Jersey)";
        fileSelect= "front player";
        act = argv1 + " (" + argv4 + ")";
}

actset = actset + ".atn";
var fileStr = argv6 + "/" + fileSelect + ".psdt";
var file = new File(fileStr);
// Open the file for reading.
app.open(file);


if (argv4=="Helmet"){
    // Helmet
    app.activeDocument.activeLayer = app.activeDocument.artLayers.getByName("Shell");
} else {

   if (argv4 == "Back"){
        // Back Facing Character.
        targetLayer = app.activeDocument.artLayers.getByName("EDIT TEXT - NUMBER");
        targetLayer.textItem.contents= argv7;
        targetLayer = app.activeDocument.artLayers.getByName("- EDIT TEXT - TEAM");
        targetLayer.textItem.contents = argv3;
    } else {
        // Front Facing player
        app.activeDocument.activeLayer = app.activeDocument.artLayers.getByName("Player");  
        targetLayer = app.activeDocument.artLayers.getByName("- EDIT TEXT -");
        targetLayer.textItem.contents = argv7;
    } 

}

app.doAction(act, actset);

  // Create a new file object for the PSD.
  var saveFile = new File("~/Downloads/FootballPlayer " + argv1 +" "+ argv7 + ".png");

  // Create a new PhotoshopSaveOptions object.
  var saveOptions = new PNGSaveOptions();

  // Set the options for the save operation.
  saveOptions.compression = 0;
  saveOptions.interlaced= false;

  // Save the document as a PSD.
  app.activeDocument.saveAs(saveFile, saveOptions, true, Extension.LOWERCASE);
