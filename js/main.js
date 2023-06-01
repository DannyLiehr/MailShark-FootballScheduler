/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/

var footballTeams=[
    // Name: Visible to user, val: keyword to quickly grab the action (because I was a dummy and didn't attach the names to all actions), col1: colour 1 hex value, so on so forth.
    // DEFAULT: #002a42, #f68c1e, #c6c8ca
    {name:"Arizona Cardinals",      val: "Arizona",         col1: "b0063a",     col2: "000000",     col3: "b0b9bf"},
    {name:"Atlanta Falcons",        val: "Atlanta",         col1: "c8243f",     col2: "000000",     col3: "bac3c9"},
    {name:"Baltimore Ravens",       val: "Baltimore",       col1: "2b2d8b",     col2: "000000",     col3: "d2a941"},
    {name:"Buffalo Bills",          val: "Buffalo",         col1: "005496",     col2: "da2028",     col3: "c6c8ca"},
    {name:"Carolina Panthers",      val: "Carolina",        col1: "0098d8",     col2: "000000",     col3: "d1d2d4"},
    {name:"Chicago Bears",          val: "Chicago",         col1: "00143f",     col2: "f16521",     col3: "c6c8ca"},
    {name:"Cincinnati Bengals",     val: "Cincinnati",      col1: "000000",     col2: "ef4e22",     col3: "c6c8ca"},
    {name:"Cleveland Browns",       val: "Cleveland",       col1: "f16521",     col2: "2c1b00",     col3: "b0b9bf"},
    {name:"Dallas Cowboys",         val: "Dallas",          col1: "00295b",     col2: "b0b6bb",     col3: "bacad3"},
    {name:"Denver Broncos",         val: "Denver",          col1: "001f52",     col2: "f05522",     col3: "c6c8ca"},
    {name:"Detroit Lions",          val: "Detroit",         col1: "006cb0",     col2: "000000",     col3: "b0b6bb"},
    {name:"Green Bay Packers",      val: "Green Bay",       col1: "29433a",     col2: "fec10d",     col3: "c6c8ca"},
    {name:"Houston Texans",         val: "Houston",         col1: "00143f",     col2: "c4122f",     col3: "c6c8ca"},
    {name:"Indianapolis Colts",     val: "Indianapolis",    col1: "00417e",     col2: "b0b9bf",     col3: "c6c8ca"},
    {name:"Jacksonville Jaguars",   val: "Jacksonville",    col1: "00839b",     col2: "9e782b",     col3: "c6c8ca"},
    {name:"Kansas City Chiefs",     val: "Kansas City",     col1: "e21836",     col2: "fec10d",     col3: "c6c8ca"},
    {name:"Las Vegas Raiders",      val: "Las Vegas",       col1: "000000",     col2: "A5ACAF",     col3: "C6C8CA"},
    {name:"Los Angeles Chargers",   val: "Chargers",        col1: "0080C6",     col2: "FFC20E",     col3: "C6C8CA"},
    {name:"Los Angeles Rams",       val: "Rams",            col1: "003594",     col2: "ffa300",     col3: "ffd100"},
    {name:"Miami Dolphins",         val: "Miami",           col1: "008E97",     col2: "FC4C02",     col3: "C6C8CA"},
    {name:"Minnesota Vikings",      val: "Minnesota",       col1: "4F2683",     col2: "FFC62F",     col3: "C6C8CA"},
    {name:"New England Patriots",   val: "New England",     col1: "002244",     col2: "C60C30",     col3: "B0B7BC"},
    {name:"New Orleans Saints",     val: "New Orleans",     col1: "D3BC8D",     col2: "101820",     col3: "C6C8CA"},
    {name:"New York Giants",        val: "Giants",          col1: "0B2265",     col2: "a71930",     col3: "a5acaf"},
    {name:"New York Jets",          val: "Jets",            col1: "125740",     col2: "000000",     col3: "C6C8CA"},
    {name:"Philadelphia Eagles",    val: "Philadelphia",    col1: "004C54",     col2: "ACC0C6",     col3: "A5ACAF"},
    {name:"Pittsburgh Steelers",    val: "Pittsburgh",      col1: "101820",     col2: "FFB612",     col3: "C6C8CA"},
    {name:"San Francisco 49ers",    val: "San Fran",        col1: "AA0000",     col2: "B3995D",     col3: "C6C8CA"},
    {name:"Seattle Seahawks",       val: "Seattle",         col1: "002244",     col2: "69BE28",     col3: "A5acaf"},
    {name:"Tampa Bay Buccaneers",   val: "Tampa Bay",       col1: "D50A0A",     col2: "FF7900",     col3: "b1babf"},
    {name:"Tennessee Titans",       val: "Tennesee",        col1: "0C2340",     col2: "C8102E",     col3: "A2AAAD"}, // I misspelled it on the action.
    {name:"Washington Commanders",  val: "Washington",      col1: "5A1414",     col2: "FFB612",     col3: "C6C8CA"}
]

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
            console.log("AGH");
            //  Bad idea but loop through the Football team....
            var selectedTeam= new Array();
            for (i in footballTeams){
                if (footballTeams[i].name == selectItem){
                    // We got a match. No "} else {" because it'll skip anyway.
                    selectedTeam = footballTeams[i];
                    break;
                }
            }
            // selectedTeam has colour and name information. Let's grab team and number.
            // console.log($("#teamName").text());
            if ($("#teamName").text()){
                selectedTeam.teamName= $("#teamName").text();
            }
            if ($("#teamNumber").text()){
                selectedTeam.teamNumber= $("#teamNumber").text();
            }
            console.table(selectedTeam);


            // End click function
        });
    }
        
    init();

}());
    
