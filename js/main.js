/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/

const https = require('https');

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
            csInterface.evalScript(`addSchedule()`);
            // End click function
        });

        // GET
        $("#get").click( async () => {
            
            const url =  "https://www.themailshark.com/prepress/examples/Football/The%20Mail%20Shark.csv"
            
            console.log("Getting the response...")
            const response = await getRemoteFile(url);

            console.log("RESPONSE:", response);
            // Start to find & replace!

        })


    }
        
    init();

}());




    
/**
 * getRemoteFile(url, outputPath)
 * @param {string} url  Path the file to download
 * @return new Promise
 */
async function getRemoteFile (url) {

    return new Promise ((resolve, reject) => {

        https.get(url,(res) => {

            // console.log(res);

            if (res.statusCode === 404) {
                reject("Page not found.")
            }

            let data = ""

            res.on('data', chunk => {
                data += chunk.toString('utf8')
            });

            res.on('end', () => {
                resolve(data);
            });

            // // console.log()
            // resolve(res);

            // // // Image will be stored at this path
            // const filePath = fs.createWriteStream(outputPath);
            // res.pipe(filePath);
            // filePath.on('finish',() => {
            //     filePath.close();
            //     // console.log('Download Completed'); 
            //     resolve();
            // });
        })
       


    })
}