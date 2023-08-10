//Code you want to execute
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

app.open(file);
// If the image selected is the back version, set text.
if (argv4=="Helmet"){
    // Helmet
    app.activeDocument.activeLayer = app.activeDocument.artLayers.getByName("Shell");
} else {

   if (argv4 == "Back"){
        // Has text.
        app.activeDocument.activeLayer = app.activeDocument.artLayers.getByName("- EDIT TEXT - TEAM");
        targetLayer = app.activeDocument.artLayers.getByName("- EDIT TEXT - NUMBER");
        targetLayer.textItem.contents = argv3;
    } else {
        // Front Facting player
        app.activeDocument.activeLayer = app.activeDocument.artLayers.getByName("Player");  
        targetLayer = app.activeDocument.artLayers.getByName("- EDIT TEXT -");
        targetLayer.textItem.contents = argv7;
    } 

}

app.doAction(act, actset);

/* Pseudocode/Bard Generated Code:

Note to self: Use PSD and not JPG.

// Create a JPEGSaveOptions object
var jpgSaveOptions = new JPEGSaveOptions()

// Set the quality of the JPEG image
jpgSaveOptions.quality = 80

// Save the document as a JPEG file
doc.saveAs(saveFile, jpgSaveOptions)

*/