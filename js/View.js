//containers
var mainView;

//images
var BGBMP;

var twitterContentContainer0,twitterContentContainer1,twitterContentContainer2;
var twitterBGContainer0,twitterBGContainer1,twitterBGContainer2;
var timelineDataText0,timelineDataText1,timelineDataText2;
var topMenuContainer;

//menu
var timelineCategoryText0,  timelineCategoryText1, timelineCategoryText2;
var arrowUpBtn0, arrowUpBtn1, arrowUpBtn2, arrowDownBtn0, arrowDownBtn1, arrowDownBtn2;
var gearBtn, dragBtn0, dragBtn1, dragBtn2;
var imageLoaderCounter=0;
var editLayoutContainer;
var editModeText;
var theme0Btn, theme1Btn, theme2Btn, saveBtn;

function initView()
{
	mainView = new createjs.Container();
	stage.addChild(mainView);

	twitterContentContainer0 = new createjs.Container();
	twitterContentContainer1 = new createjs.Container();
	twitterContentContainer2 = new createjs.Container();	
	twitterBGContainer0 = new createjs.Container();
	twitterBGContainer1 = new createjs.Container();
	twitterBGContainer2 = new createjs.Container();	

	mainView.addChild(twitterBGContainer0);
	mainView.addChild(twitterBGContainer1);
	mainView.addChild(twitterBGContainer2);

	mainView.addChild(twitterContentContainer0);
	mainView.addChild(twitterContentContainer1);
	mainView.addChild(twitterContentContainer2);

	editLayoutContainer = new createjs.Container();	
	topMenuContainer = new createjs.Container();
	theme0Btn = new createjs.Container();
	theme1Btn = new createjs.Container();
	theme2Btn = new createjs.Container();
	theme0Btn.name = "theme0Btn";
	theme1Btn.name = "theme1Btn";
	theme2Btn.name = "theme2Btn";

	saveBtn = new createjs.Container();
	saveBtn.name = "saveBtn";

	setupMouseInteractionForMenuItem(theme0Btn);
	setupMouseInteractionForMenuItem(theme1Btn);
	setupMouseInteractionForMenuItem(theme2Btn);
	setupMouseInteractionForMenuItem(saveBtn);

	menuStage.addChild(topMenuContainer );
	menuStage.addChild(editLayoutContainer );

	showMenu();

	//reorgContents();

}


function showTimelineTextBG(in_tweetNameNum, in_BGStartXLocation)
{

    var tweetBG = new createjs.Graphics();
    tweetBG.setStrokeStyle(2).beginStroke(Data.Model.saveData.boxOutlineColor).beginFill(Data.Model.saveData.textBGColor).drawRect(in_BGStartXLocation, Data.Model.BGstartYLocation,window.innerWidth/3.2, window.innerHeight);
	var tweetShapeBG = new createjs.Shape(tweetBG);

	switch(in_tweetNameNum)
	{
		case 0:
			twitterContentContainer0.removeAllChildren();
			twitterBGContainer0.removeAllChildren();
			twitterBGContainer0.addChild(tweetShapeBG); 
			timelineDataText0 = new createjs.DOMElement("timeline" + in_tweetNameNum);
			showTimelineTwitterElement(timelineDataText0, in_BGStartXLocation);
			twitterContentContainer0.addChild(timelineDataText0);
		break;
		case 1:
			twitterContentContainer1.removeAllChildren();
			twitterBGContainer1.removeAllChildren();
			twitterBGContainer1.addChild(tweetShapeBG); 
			timelineDataText1 = new createjs.DOMElement("timeline" + in_tweetNameNum);
			showTimelineTwitterElement(timelineDataText1, in_BGStartXLocation);
			twitterContentContainer1.addChild(timelineDataText1);
		break;
		case 2:
			twitterContentContainer2.removeAllChildren();
			twitterBGContainer2.removeAllChildren();
			twitterBGContainer2.addChild(tweetShapeBG); 
			timelineDataText2 = new createjs.DOMElement("timeline" + in_tweetNameNum);
			showTimelineTwitterElement(timelineDataText2, in_BGStartXLocation);
			twitterContentContainer2.addChild(timelineDataText2);
		break;
	}

}

function showTimelineTwitterElement(inElement, in_BGStartXLocation)
{
	inElement.htmlElement.style.width =window.innerWidth/Data.Model.textWidthModifier+"px" ;
	inElement.htmlElement.style.fontFamily = "Verdana";
	inElement.htmlElement.style.fontSize = Data.Model.fontSize +"px" ;
	inElement.htmlElement.style.display = "block";
	inElement.htmlElement.style.top = Data.Model.topMargin+"px";
	inElement.htmlElement.style.marginLeft = in_BGStartXLocation +"px";
	//inElement.htmlElement.style.color = "green"; 
	
	if(window.innerWidth < 600)
    {
		inElement.htmlElement.style.fontSize = 8 +"px" ;
    }
    
   	if(window.innerWidth < 400)
    {
		inElement.htmlElement.style.fontSize = 5 +"px" ;
    }

}


function handleBGBMPImageLoad(event)
{
	var image = event.target;
	BGBMP = new createjs.Bitmap(image);
	BGBMP.name = "BGBMP";	
	BGBMP.visible = false;  //prevents brief blink
	mainView.addChild(BGBMP);
	initMenu(); //menuC.js
	
}

/*
This is the top menu where it is on top of everything.  layout settings can be done
 */
function showMenu()
{
	timelineCategoryText0= new createjs.Text(Data.Model.twitterFeedName0, "20px Verdana", Data.Model.saveData.twitterFeedNameColor);
	timelineCategoryText1= new createjs.Text(Data.Model.twitterFeedName1, "20px Verdana", Data.Model.saveData.twitterFeedNameColor);
	timelineCategoryText2= new createjs.Text(Data.Model.twitterFeedName2, "20px Verdana", Data.Model.saveData.twitterFeedNameColor);
	editModeText =  new createjs.Text("edit mode", "14px Verdana", Data.Model.saveData.twitterFeedNameColor);

	var tempImage;
	tempImage = new Image();
	tempImage.onload = handleMenuBGImageLoad;
	tempImage.src = "images/gear.png";
	tempImage.name = "gear";

	tempImage = new Image();
	tempImage.onload = handleMenuBGImageLoad;
	tempImage.src = "images/arrow.png";
	tempImage.name = "arrow";

	tempImage = new Image();
	tempImage.onload = handleMenuBGImageLoad;
	tempImage.src = "images/drag.png";
	tempImage.name = "drag";

	//meta
	//
}

function handleMenuBGImageLoad(event)
{
	var image = event.target;

	switch(image.name)
	{
		case "gear":
			gearBtn = new createjs.Bitmap(image);
			gearBtn.name = image.name;
			gearBtn.x =5;
			gearBtn.y =5;			
			setupMouseInteractionForMenuItem(gearBtn);
			imageLoaderCounter++;
		break;
		case "arrow":		
			imageLoaderCounter++;
			arrowUpBtn0 = createBasicBtn(image,"arrowUpBtn0");
			arrowUpBtn1 = createBasicBtn(image,"arrowUpBtn1");	
			arrowUpBtn2 = createBasicBtn(image,"arrowUpBtn2");
			arrowDownBtn0 = createBasicBtn(image,"arrowDownBtn0");
			arrowDownBtn1 = createBasicBtn(image,"arrowDownBtn1");
			arrowDownBtn2 = createBasicBtn(image,"arrowDownBtn2");

			arrowDownBtn0.setTransform(0,0,1,1,180,0,0,image.width, image.height);
			arrowDownBtn1.setTransform(0,0,1,1,180,0,0,image.width, image.height);
			arrowDownBtn2.setTransform(0,0,1,1,180,0,0,image.width, image.height);

		break;
		case "drag":
			imageLoaderCounter++;
			dragBtn0 = createDragBtn(image , 0);
			dragBtn1 = createDragBtn(image , 1);
			dragBtn2 = createDragBtn(image , 2);
					
		break;

	}

	//do stuff when all images are loaded
	if(imageLoaderCounter == 3)
	{
		reorgContents();
		hideEditLayout();
	}
}

/*
This is called every time the screen is resized and also when everything is loaded for the first time.  It rearranges all the contents to
fit the full width of the screen.  it also will make fonts small when width is small
 */
function reorgContents(in_isFromResize)
{

	//if resize while in edit mode, it will get out of edit mode.  saves extra work
	if(in_isFromResize)
	{
		Data.Model.isToggleEditLayoutOn = false;
		hideEditLayout();
	}
	

 	setCanvas();

 	var leftBGOffset = Data.Model.BGstartXLocationModifer0;

	//make things smaller
	if(window.innerWidth < 400)
    {
		leftBGOffset = 0;
    }
    
    if(window.innerWidth < 600)
    {
		timelineCategoryText0.font = "10px Verdana";
		timelineCategoryText1.font = "10px Verdana";
		timelineCategoryText2.font = "10px Verdana";
		editModeText.font = "10px Verdana";
    }
    else
    {
    	timelineCategoryText0.font = "20px Verdana";
		timelineCategoryText1.font = "20px Verdana";
		timelineCategoryText2.font = "20px Verdana";
    }

  	showTimelineTextBG(0, leftBGOffset);
	showTimelineTextBG(1, window.innerWidth/Data.Model.BGstartXLocationModifer1);
	showTimelineTextBG(2, window.innerWidth - window.innerWidth/3.2);

	timelineCategoryText0.color = Data.Model.saveData.twitterFeedNameColor;
	timelineCategoryText1.color = Data.Model.saveData.twitterFeedNameColor;
	timelineCategoryText2.color = Data.Model.saveData.twitterFeedNameColor;

	//resize menu contents
	topMenuContainer.removeAllChildren();

    var tweetBG = new createjs.Graphics();
    tweetBG.setStrokeStyle(2).beginStroke(Data.Model.saveData.boxOutlineColor).beginFill(Data.Model.saveData.titleMenuColor).drawRoundRect(0, 0,window.innerWidth, Data.Model.menuBGstartYLocation,10);
	var tweetShapeBG = new createjs.Shape(tweetBG);	
	topMenuContainer.addChild(tweetShapeBG);
	
	timelineCategoryText0.x = window.innerWidth/6 - timelineCategoryText0.getMeasuredWidth()/2;
	timelineCategoryText0.y = Data.Model.timelineCatetoryTextStartY;

	timelineCategoryText1.x = window.innerWidth/2 - timelineCategoryText1.getMeasuredWidth()/2;
	timelineCategoryText1.y = Data.Model.timelineCatetoryTextStartY;

	timelineCategoryText2.x = window.innerWidth/1.2 - timelineCategoryText2.getMeasuredWidth()/2;
	timelineCategoryText2.y = Data.Model.timelineCatetoryTextStartY;

	editModeText.x = 5;
	editModeText.y = 55;
	
	if(imageLoaderCounter == 3) //make sure all images are loaded before trying to mess with it otherwise errors
	{
	
		dragBtn0.x = window.innerWidth/6 - dragBtn0.image.width/2;
		dragBtn0.y = Data.Model.dragBtnYLocation;
		dragBtn1.x = window.innerWidth/2 - dragBtn1.image.width/2;
		dragBtn1.y = Data.Model.dragBtnYLocation;
		dragBtn2.x = window.innerWidth/1.2 - dragBtn0.image.width/2;
		dragBtn2.y = Data.Model.dragBtnYLocation;

		arrowUpBtn0.x = window.innerWidth/3.2 - arrowUpBtn0.image.width;
		arrowUpBtn0.y = arrowUpBtn1.y = arrowUpBtn2.y = Data.Model.arrowUpYLocation;
		arrowDownBtn0.x = arrowUpBtn0.x;
		arrowDownBtn0.y = arrowDownBtn1.y = arrowDownBtn2.y = arrowUpBtn0.y + 35;
		
		arrowUpBtn1.x = window.innerWidth/1.6 ;
		arrowDownBtn1.x = arrowUpBtn1.x;

		arrowUpBtn2.x = window.innerWidth - arrowUpBtn0.image.width - 10;
		arrowDownBtn2.x = arrowUpBtn2.x;
		
	}

	layerTopMenuContainerItems();

}

function layerTopMenuContainerItems()
{
	topMenuContainer.addChild(timelineCategoryText0);
	topMenuContainer.addChild(timelineCategoryText1);
	topMenuContainer.addChild(timelineCategoryText2);
	topMenuContainer.addChild(editModeText);
	
	topMenuContainer.addChild(gearBtn);
	topMenuContainer.addChild(dragBtn0);
	topMenuContainer.addChild(dragBtn1);
	topMenuContainer.addChild(dragBtn2);
	topMenuContainer.addChild(arrowUpBtn0);
	topMenuContainer.addChild(arrowDownBtn0);
	topMenuContainer.addChild(arrowUpBtn1);
	topMenuContainer.addChild(arrowDownBtn1);
	topMenuContainer.addChild(arrowUpBtn2);
	topMenuContainer.addChild(arrowDownBtn2);

}


function showEditLayout()
{
	dragBtn0.visible = true;
	dragBtn1.visible = true;
	dragBtn2.visible = true;
	editModeText.visible = true;
	arrowUpBtn0.visible = false;
	arrowUpBtn1.visible = false;
	arrowUpBtn2.visible = false;
	arrowDownBtn0.visible = false;
	arrowDownBtn1.visible = false;
	arrowDownBtn2.visible = false;


	editLayoutContainer.removeAllChildren();
	theme0Btn.removeAllChildren();
	theme1Btn.removeAllChildren();
	theme2Btn.removeAllChildren();
	saveBtn.removeAllChildren();

	//creating all the items
	var editLayoutBG = new createjs.Graphics();
    editLayoutBG.setStrokeStyle(5).beginStroke("black").beginFill("white").drawRoundRect(window.innerWidth/2 - window.innerWidth/2/2, 0,window.innerWidth/2, window.innerHeight/3,10);
    var editLayouBGShape = new createjs.Shape(editLayoutBG);
    editLayoutContainer.alpha = 0;
    editLayoutContainer.y = 100;
	createjs.Tween.get(editLayoutContainer).to({ x: editLayoutContainer.x, y: editLayoutContainer.y + 100 , alpha: 1},1000, createjs.Ease.getPowOut(3));
	
	var editDialogText = new createjs.Text("Edit Layout Mode", "20px Verdana", "black");
	editDialogText.x = window.innerWidth/2 - editDialogText.getMeasuredWidth()/2;
	editDialogText.y = 10;
	
	var editDialogOptionsText = new createjs.Text("Color Theme Change", "18px Verdana", "black");
	editDialogOptionsText.x = window.innerWidth/2 - editDialogText.getMeasuredWidth()/2;
	editDialogOptionsText.y = 50;

	var theme0 = new createjs.Graphics();
    theme0.setStrokeStyle(2).beginStroke("gray").beginLinearGradientFill(["#fff","#FFF"], [0, 1], 0, 0, 0, Data.Model.themeBtnSize).drawRoundRect(0, 0,Data.Model.themeBtnSize, Data.Model.themeBtnSize,10);
    var themeShape0 = new createjs.Shape(theme0);
	theme0Btn.addChild(themeShape0);
	theme0Btn.x = window.innerWidth/3;
	theme0Btn.y = 90;

	var theme1 = new createjs.Graphics();
    theme1.setStrokeStyle(2).beginStroke("#16B245").beginLinearGradientFill(["#FFA31F","#03C03C"], [0, 1], 0, 0, 0, Data.Model.themeBtnSize).drawRoundRect(0, 0,Data.Model.themeBtnSize, Data.Model.themeBtnSize,10);
    var themeShape1 = new createjs.Shape(theme1);
	theme1Btn.addChild(themeShape1);
	theme1Btn.x = window.innerWidth/2 - Data.Model.themeBtnSize/2;
	theme1Btn.y = 90;

	var theme2 = new createjs.Graphics();
    theme2.setStrokeStyle(2).beginStroke("#096BB2").beginLinearGradientFill(["#FDFD96","#147FCC"], [0, 1], 0, 0, 0, Data.Model.themeBtnSize).drawRoundRect(0, 0,Data.Model.themeBtnSize, Data.Model.themeBtnSize,10);
    var themeShape2 = new createjs.Shape(theme2);
	theme2Btn.addChild(themeShape2);
	theme2Btn.x = window.innerWidth/1.5 - Data.Model.themeBtnSize;
	theme2Btn.y = 90;

	var saveGraphic = new createjs.Graphics();
    saveGraphic.beginStroke("gray").beginLinearGradientFill(["#fff","#ccc"], [0, 1], 0, 0, 0, Data.Model.themeBtnSize).drawRoundRect(0, 0,Data.Model.themeBtnSize*3, Data.Model.themeBtnSize,10);
    var saveShape = new createjs.Shape(saveGraphic);
    var saveText = new createjs.Text("Save Layout", "20px Verdana", "black");
	saveText.x = (Data.Model.themeBtnSize*3- saveText.getMeasuredWidth())/2;
	saveText.y = 10;
	saveText.mouseEnabled = false;
	saveBtn.addChild(saveShape);
	saveBtn.addChild(saveText);
	saveBtn.x = window.innerWidth/2 - Data.Model.themeBtnSize*3/2;
	saveBtn.y = 170;
	
	var instructionText;
	if(window.innerWidth < 800)
	{
		instructionText = new createjs.Text("(Drag the hand on the top menu\nto arrange the columns)", "14px Verdana", "black");
		instructionText.x = window.innerWidth/2 - instructionText.getMeasuredWidth()/4;
	}
	else
	{
		instructionText = new createjs.Text("(Drag the hand on the top menu to arrange the columns)", "14px Verdana", "black");
		instructionText.x = window.innerWidth/2 - instructionText.getMeasuredWidth()/2;
	}

	instructionText.y = 230;


	editLayoutContainer.addChild(editLayouBGShape);
	editLayoutContainer.addChild(editDialogText);
	editLayoutContainer.addChild(instructionText);
	editLayoutContainer.addChild(editDialogOptionsText);
	editLayoutContainer.addChild(theme0Btn);
	editLayoutContainer.addChild(theme1Btn);
	editLayoutContainer.addChild(theme2Btn);
	editLayoutContainer.addChild(saveBtn);
}

function hideEditLayout()
{

	dragBtn0.visible = false;
	dragBtn1.visible = false;
	dragBtn2.visible = false;
	editModeText.visible = false;
	arrowUpBtn0.visible = true;
	arrowUpBtn1.visible = true;
	arrowUpBtn2.visible = true;
	arrowDownBtn0.visible = true;
	arrowDownBtn1.visible = true;
	arrowDownBtn2.visible = true;
	
}
