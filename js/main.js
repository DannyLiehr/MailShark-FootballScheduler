/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/


function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }
  

(function () {
    'use strict';

    var csInterface = new CSInterface();
    
    function init() {

           
        initColors();

        $("#generate").click(function () {
            // $("#teams").append(`<div class="" style="width: 35.9453px;">${footballTeams[i].name}</div>`);
            // var value = $('select#dropDownId option:selected').val();
            var selectItem= $("select#teams option:selected").val();
            
            //  Bad idea but loop through the Football team....
            var selectedTeam= new Array();
            for (i in footballTeams){
                if (footballTeams[i].name == selectItem){
                    // We got a match. No "} else {" because it'll skip anyway.
                    selectedTeam = footballTeams[i];
                    break;
                }
            }
            console.log(`Applying team: ${selectedTeam.name}`);
            // selectedTeam has colour and name information. Let's grab team and number.
            // console.log($("#teamName").text());
            if ($("#teamName").text()){
                selectedTeam.teamName= $("#teamName").text();
            }
            if ($("#teamNumber").text()){
                selectedTeam.teamNumber= $("#teamNumber").text();
            }


            csInterface.evalScript(`changeColour("Primary", "${selectedTeam.col1[0]}", "${selectedTeam.col1[1]}","${selectedTeam.col1[2]}","${selectedTeam.col1[3]}")`);
            csInterface.evalScript(`changeColour("Secondary", "${selectedTeam.col2[0]}", "${selectedTeam.col2[1]}","${selectedTeam.col2[2]}","${selectedTeam.col2[3]}")`);
            csInterface.evalScript(`changeColour("Tertiary", "${selectedTeam.col3[0]}", "${selectedTeam.col3[1]}","${selectedTeam.col3[2]}","${selectedTeam.col3[3]}")`);
            // End click function
        });
    }
        
    init();

}());
    
