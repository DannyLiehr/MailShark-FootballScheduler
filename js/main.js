/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/

const fs = require("fs");
const https = require('https');
const path = require("path");

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }
  

(function () {
    'use strict';

    var csInterface = new CSInterface();
    
    function init() {

           
        initColors();

        $("#generate").click(async function () {

            var selectItem= $("select#teams option:selected").val();
            
            var selectedTeam= new Array();
            for (i in footballTeams){
                if (footballTeams[i].name == selectItem){
                    // We got a match. No "} else {" because it'll skip anyway.
                    selectedTeam = footballTeams[i];
                    break;
                }
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
        
            
            const teamPath = path.join(__dirname, `CSV/${selectedTeam.name}.csv`);
            csInterface.evalScript(`addSchedule("${teamPath}")`);
        });


    }
        
    init();

}());

console.log("Reloaded");