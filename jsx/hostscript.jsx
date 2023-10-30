/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/
#include "json2.js";


// three functions because the arguments on mainjs would look insane
function changeColour(type, c,m,y,k){
    try{
        app.activeDocument.colors.item(type+ " Color").colorValue = [parseInt(c),parseInt(m),parseInt(y),parseInt(k)]; // CMYK. Hardcode: [100,50,0,0]
    } catch (e){
        alert("No swatch found for: " + type + " Color.")
    }
    
}

function isCompact(){
    // return app.activeDocument.layers.itemByName("Helmet");
    var checkType= app.activeDocument.layers.itemByName("Helmet");
    if (typeof )
}

function addSchedule(path){
    try{
      // Removes the current data source to put our own in
      app.activeDocument.dataMergeProperties.removeDataSource(); 
      // Adds the data source of the selected team based on their path. 
      app.activeDocument.dataMergeProperties.selectDataSource(path);  
      // Find a way to grab a specific entry??? 
    } catch(e){
        alert(e);
    }
}

// talkToPhotoshop('/Library/Application Support/Adobe/CEP/extensions/FootballScheduler/jsx/exec_photoshop.jsx', '{"name":"Arizona Cardinals","preseason":false,"text":"","type":"Front","number":23}', '/Library/Application Support/Adobe/CEP/extensions/FootballScheduler/actions', '/Library/Application Support/Adobe/CEP/extensions/FootballScheduler/templates', 'without', '1', '~/Downloads/example.pdf', '/Library/Application Support/Adobe/CEP/extensions/FootballScheduler/CSV/Arizona Cardinals.csv')

function talkToPhotoshop(jsxPath, fbOptions, actDir, playDir, preseas, mergeIndex, dest, csv) {

        fbOptions = JSON.parse(fbOptions);
         // Create a new File object and specify the path to the file you want to read.
        var file = new File(jsxPath);
        // Open the file for reading.
        file.open("r");
        // Use the File object's read() method to read the contents of the file into a string.
        var fileContents = file.read();
        // Close the file.
        file.close();
        // Create a new BridgeTalk object 
        var bt = new BridgeTalk();

        var curDate = new Date().valueOf();

        var params = "\
            var argv1 = '" + fbOptions.name + "' \
            var argv2 = '" + fbOptions.preseason + "' \
            var argv3 = '" + fbOptions.text + "' \
            var argv4 = '" + fbOptions.type + "' \
            var argv5 = '" + actDir +"' \
            var argv6 = '" + playDir +"' \
            var argv7 = '" + fbOptions.number +"' \
            var argv8 = \"" + playDir  +"\" \
            var argv9 = \"" + curDate +"\" \
        ";
        // Target Photoshop
        bt.target = "photoshop";      
        // JavaScript to execute...
        bt.body = params + fileContents;
        // On success...
        bt.onResult = function (msg) {
            // From here, relink the player file. We'll need to find a way to do that easily. Maybe name the object specifically in the INDD file?
            // var fbLink = app.activeDocument.links.itemByName("MS-player.psd");
            var links= app.activeDocument.links;

            for (var i = 0; i < links.length; i++) {
                if (links[i].label == "fbPlayer"){
                    // links[i].relink(new File(playDir + "/FootballPlayer "+ curDate +".png"));
                    // new File("~/Downloads/FootballPlayer " + argv1 +" "+ argv3 + ".png");
                    links[i].relink(new File("~/Downloads/FootballPlayer " + fbOptions.name +" "+ fbOptions.number + ".png"));
                }
            }

            // hide all layers
            app.activeDocument.layers.itemByName("Schedule - 18 Games").visible= false;
            app.activeDocument.layers.itemByName("Schedule - 20 Games").visible= false;
            app.activeDocument.groups.itemByName("18 Games").visible= false;
            app.activeDocument.groups.itemByName("20 Games").visible= false;

            if (fbOptions.preseason == false){
                // No preseason. So show only the 18 games layer
                app.activeDocument.layers.itemByName("Schedule - 18 Games").visible= true;
                app.activeDocument.groups.itemByName("18 Games").visible= true;
            } else {
                // Preseason on. Show only the 20 games layer.
                app.activeDocument.layers.itemByName("Schedule - 20 Games").visible= true;
                app.activeDocument.groups.itemByName("20 Games").visible= true;
            }


                // Get active document
                var doc = app.activeDocument;
                
                // try {
                //     var filePath= doc.fullName;
                // } catch (e) {
                //     alert("Please save your document.")
                //     return;
                // }

                // Don't give them the choice; they MUST save.
                do{
                    alert("Please save your file in case of later use, and so the data merge may commence.");
                    doc.save();
                }while (!doc.fullName);

                var filePath= doc.fullName;

                
                
                // File paths
                var source = File(filePath);
                var destination = File(dest);
                var sourceData = File(csv);
                // Open the document
                var doc = app.open(source);

                // Data merge settings
                doc.dataMergeProperties.selectDataSource(sourceData);
                doc.dataMergeProperties.dataMergePreferences.recordSelection = RecordSelection.ONE_RECORD;
                // What record do we want?
                doc.dataMergeProperties.dataMergePreferences.recordNumber = parseInt(mergeIndex);
                app.dataMergeOptions.removeBlankLines = true;  


                // Perform merge.
                doc.dataMergeProperties.exportFile(destination, "[High Quality Print]", );
                 
                alert("Your PDF has been merged and saved to your Downloads folder. Please move this PDF to your active project folder before placing it.")

        };
        // On error...
        bt.onError = function (err) {
            alert("Oops! Error: " + err.body);
        }
        // Bombs away...
        alert("Photoshop is about to open to generate a schedule image. You may need to click on it on the dock to continue generating a schedule.");
        bt.send();

        //

}
