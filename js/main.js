/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/

const fs = require("fs");
const https = require('https');
const path = require("path");
const csv=require('csvtojson')

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }
  
  (function () {
    'use strict';

    var csInterface = new CSInterface();
    
    function init() {
                
        initColors();
                
        $("#generate").click(async function () {
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

                csInterface.evalScript(`changeColour("Primary", "${selectedTeam.col1[0]}", "${selectedTeam.col1[1]}","${selectedTeam.col1[2]}","${selectedTeam.col1[3]}")`);
                csInterface.evalScript(`changeColour("Secondary", "${selectedTeam.col2[0]}", "${selectedTeam.col2[1]}","${selectedTeam.col2[2]}","${selectedTeam.col2[3]}")`);
                csInterface.evalScript(`changeColour("Tertiary", "${selectedTeam.col3[0]}", "${selectedTeam.col3[1]}","${selectedTeam.col3[2]}","${selectedTeam.col3[3]}")`);
            
                const teamPath = path.join(__dirname, `./CSV/${selectedTeam.name}.csv`);
                csInterface.evalScript(`addSchedule("${teamPath}")`);

                var fbObject={
                    name:       selectedTeam.name,
                    preseason:  $('#preseason').find(":selected").val() == "on" ? true : false,
                    text:       $('input[name="teamText"]').val() || "",
                    type:       $('select#image_mode option:selected').val(),
                    number:     $('input[name="teamNumber"]').val()== "" ? (new Date().getFullYear() % 100) : $('input[name="teamNumber"]').val() // Grabs the last 2 digits of the current Year
                }

                let jsonObj = await csv().fromFile(path.join(__dirname, "CSV", `${fbObject.name}.csv`));

                let tz = $("#timezone").val();                
                let preEnabled= fbObject.preseason == true ? "with" : "without";

                var mergeIndex;
                jsonObj.forEach((row, i) => {
                    if (row["time zone"] == tz && row.preseason == preEnabled) {
                        mergeIndex = i
                        return;
                    }
                })
                
                    var dest= `~/Downloads/${fbObject.name} ${fbObject.number}.pdf`;
                    var csvdest= path.join(__dirname, "CSV", `${fbObject.name}.csv`);
                    
                const args = [
                    path.join(__dirname, "jsx", "exec_photoshop.jsx"),
                    JSON.stringify(fbObject),
                    path.join(__dirname, "actions") ,
                    path.join(__dirname, "templates"),
                    preEnabled,
                    mergeIndex,
                    dest,
                    csvdest
                ];

                const evalThis = `talkToPhotoshop('${args.join("', '")}')`;
                csInterface.evalScript(evalThis);




            } catch (e){
                csInterface.evalScript(`alert("${e}\nPlease email Danny and explain what you put into the extension! Thanks. 🌟")`);               
            }
        });
    }
        
    init();

}());

