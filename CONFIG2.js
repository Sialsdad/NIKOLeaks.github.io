window.onload = function() {
    OnStart();
   };
    //-----------Header Things----------\\
    var ProfilePicture = "Pfp Link";
    var UserName = "UserName";//username here
    //-----------Button Names----------\\
    var Button1Name = "button1";//Put Your button names here
    var Button2Name = "Button2";
    var Button3Name = "Button3";
    var Button4Name = "Button4";
    //-----------Button Links----------\\
    var Button1Link = "";//put button links here
    var Button2Link = "";
    var Button3Link = "";
    var Button4Link = "";
    //-----------Footer----------\\
    var Copyright = "© Copyright [Year], [Copmany], [Rights]";
    //------------Button Config------------\\
    var ButtonColor = "Black";//MAKE SURE THE FIRST LETTER IS CAPITLE
    var ButtonHoverColor = "White";
    var ButtonTextColor = "White";
    var ButtonHoverText = "Black";
    //FILE LOCATION\\ //where this file is located
    var ConfigLocation ="Config.js";
    //----------------------------↓↓↓ The Boring Stuff ↓↓↓--------------------------------\\
    //If you care about this you can scroll down
    var doc = document;

function OnStart(){ 
    //------------------button names----------\\
    doc.getElementById("Button1").value=Button1Name;
    doc.getElementById("Button2").value=Button2Name;
    doc.getElementById("Button3").value=Button3Name;
    doc.getElementById("Button4").value=Button4Name;
    //-----------------------HEADER--------------------------------------\\
    doc.getElementById("IMG").src = ProfilePicture;
    doc.getElementById("UserName").innerHTML = UserName;
    //-------------------Footer-------------------------------------------\\
    doc.getElementById("H2").innerHTML=Copyright;
    //-----------------------Button Click Listener---------------------\\
    document.getElementById("Button1").addEventListener("click", ButtonOpen1);
    document.getElementById("Button2").addEventListener("click", ButtonOpen2);
    document.getElementById("Button3").addEventListener("click", ButtonOpen3);
    document.getElementById("Button4").addEventListener("click", ButtonOpen4);
    //-----------------------Button Colors----------------------------------\\
    //-------------------Background------------\\
    document.getElementById("Button1").style.backgroundColor = ButtonColor;
    document.getElementById("Button2").style.backgroundColor = ButtonColor;
    document.getElementById("Button3").style.backgroundColor = ButtonColor;
    document.getElementById("Button4").style.backgroundColor = ButtonColor;
    //-----------------text-------------------------/\\   
    document.getElementById("Button1").style.color = ButtonTextColor;
    document.getElementById("Button2").style.color = ButtonTextColor;
    document.getElementById("Button3").style.color = ButtonTextColor;
    document.getElementById("Button4").style.color = ButtonTextColor;
 }
 function ButtonOpen1()
 {
   window.open(Button1Link)
 }
 function ButtonOpen2()
 {
   window.open(Button2Link)
 }
 function ButtonOpen3()
 {
   window.open(Button3Link)
 }
 function ButtonOpen4()
 {
   window.open(Button4Link)
 }
 function ButtonColorManager(){

 }
 