/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/

const fs = require("fs");
const https = require('https');
const path = require("path");
const csv=require('csvtojson');


/**
 * Replaces ' with \' to prevent string breaking in jsx.
 * @param {string} str String that needs apostrophes escaped.
 * @returns {string} Escaped string
 */
function escapeStr(str){
    return str.replace(/'/g, "&apr;"); // Use our own code. I'm going insane. <3
}

  (function () {
    'use strict';
    var csInterface = new CSInterface();
    
    function init() {
        initColors();
                
        $("#generate").click(async function(){
            // Stop the POST request. We don't need that here.
            event.preventDefault();
            
            // The team the user has chosen.
            var selectItem= $("select#teams option:selected").val();

            // Find the array that matches the user's chosen team.
            var selectedTeam = footballTeams.find((team) => team.name == selectItem );

            try{
                // Let's add to the object, since JS is terrible and lets you do that.
                if ($("#teamName").text()){
                    selectedTeam.teamName= $("#teamName").text();
                }
                if ($("#teamNumber").text()){
                    selectedTeam.teamNumber= $("#teamNumber").text();
                }
            
            // Let's add to the object, since JS is terrible and lets you do that.
            if ($("#teamName").text()){
                selectedTeam.teamName= $("#teamName").text();
            }
            if ($("#teamNumber").text()){
                selectedTeam.teamNumber= $("#teamNumber").text();
            }

            // jQuery should keep this from happening, but just in case. 
            if($('input[name="teamText"]').val()== "" && $("#image_mode").val()== "Back") return alert("We cannot generate a schedule with a back facing player until the jersey name blank is filled out.")

            // Change the value of the swatches. Does each one separately because the arguments would be 4 miles long otherwise.
            csInterface.evalScript(`changeColour("Primary", "${selectedTeam.col1[0]}", "${selectedTeam.col1[1]}","${selectedTeam.col1[2]}","${selectedTeam.col1[3]}")`);
            csInterface.evalScript(`changeColour("Secondary", "${selectedTeam.col2[0]}", "${selectedTeam.col2[1]}","${selectedTeam.col2[2]}","${selectedTeam.col2[3]}")`);
            csInterface.evalScript(`changeColour("Tertiary", "${selectedTeam.col3[0]}", "${selectedTeam.col3[1]}","${selectedTeam.col3[2]}","${selectedTeam.col3[3]}")`);
            
            // Sets the csv for their selected team's schedule. This sets the data source in the Data Merge panel.
            const teamPath = path.join(__dirname, `./CSV/${selectedTeam.name}.csv`);
            csInterface.evalScript(`addSchedule("${teamPath}")`);

            // The collective information that we need for the photoshop and data merge part of this. 
            var fbObject={
                name:       selectedTeam.name,
                preseason:  $('#preseason').find(":selected").val() == "on" ? "with" : "without",
                text:       escapeStr($('input[name="teamText"]').val()), // Escape the string for photoshop's sake.
                type:       $('select#image_mode option:selected').val(),
                number:     $('input[name="teamNumber"]').val()== "" ? (new Date().getFullYear() % 100) : $('input[name="teamNumber"]').val() // Grabs the last 2 digits of the current Year
            }

            // return console.table(fbObject)
            // Fetching the CSV, turning it into JSON.
            let jsonObj = await csv().fromFile(path.join(__dirname, "CSV", `${fbObject.name}.csv`));

            // What timezone did they want? And should preseason be in this?
            let tz = $("#timezone").val();                
            // let preEnabled= fbObject.preseason == true ? "with" : "without";
            var mergeIndex;
            // Iterate through our JSON and set with row of data that matches
            jsonObj.forEach((row, i) => {
                // debugger;
                if (row["time zone"] == tz && row.preseason == fbObject.preseason) {
                    debugger;
                    mergeIndex = i + 1
                    return;
                }
            });
            
            var dest;
            // Naming Conventions
            // Default:  Philadelphia-Eagles_Default-Front_Eastern-23
            // Compact: New-York-Giants_Compact_Eastern
            if ($("#image_mode").val()=="Helmet"){
                // Compact image.
                dest=`~/Downloads/${fbObject.name}_Compact_${tz}.pdf`;
            } else {
                // Default
                dest=`~/Downloads/${fbObject.name}_Default-${$("#image_mode").val()}_${tz}-${fbObject.number}.pdf`;
            }

            // Big old string of arguments for talktoPhotoshop
            const args = [
                path.join(__dirname, "jsx", "exec_photoshop.jsx"),
                JSON.stringify(fbObject),
                path.join(__dirname, "actions") ,
                path.join(__dirname, "templates"),
                fbObject.preseason,
                mergeIndex,
                dest,
                teamPath
            ];

            const evalThis = `talkToPhotoshop('${args.join("', '")}')`;
            console.log(evalThis);
            csInterface.evalScript(evalThis);




            } catch (e){
                csInterface.evalScript(`alert("${e}\nPlease email Danny and explain what you put into the extension! Thanks. 🌟")`);               
            }
        });
    }
        
    init();

}());

