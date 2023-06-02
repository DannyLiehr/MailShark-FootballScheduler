/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/

function sayHello(){
    alert("AAGH")
}


// three functions because the arguments on mainjs would look insane
function changeColour(type, c,m,y,k){
    app.activeDocument.colors.item(type+ " Color").colorValue = [parseInt(c),parseInt(m),parseInt(y),parseInt(k)]; // CMYK. Hardcode: [100,50,0,0]
}

function addSchedule(){
    app.panels.item("data merge").visible = true;
    // selectDataSource(dataSourceFile:File)
}