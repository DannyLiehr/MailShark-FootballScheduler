/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/



(function () {
    'use strict';

    var csInterface = new CSInterface();
    
    function init() {

        $("#generate").click(function(){
            var myDoc = app.activeDocument;
            var myColor = myDoc.colors.itemByName("red");  
                    try{
                        if(myColor.space ==ColorSpace.CMYK){
                            if(myColor.name=="red"){
                                myColor.model=ColorModel.SPOT;
                                var myCV = myColor.colorValue=[0,100,80,0];
                                myColor.name = "red";
                                alert(myColor);
                                }
                            }
                        }
                        catch(e){alert(e)}
        });
                
        initColors();
                
        $("#btn_test").click(function () {
            csInterface.evalScript('sayHello()');
        });
    }
        
    init();

}());
    
