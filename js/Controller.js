/*
The controller contains all the non visual logic and setup for the app. 
This class handles the loading of the twitter feeds
The view will occasionall call functions from here to create things like buttons. 
Takes full screen.  it is designed so that there are no need for scrollbars for a cleaner look.
*/


var canvas = document.getElementById("xcanvas");
var stage= new createjs.Stage(canvas);
var supportsOrientationChange; 

var menu  = document.getElementById("menuCanvas");
var menuStage= new createjs.Stage(menu); 


function Main()
{

	supportsOrientationChange = "onorientationchange" in window, orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";

	/* Ticker */
	createjs.Ticker.addEventListener("tick", handleTick); 
	
	//also a listener for resize
 	window.addEventListener(orientationEvent, function()
 	{
 		reorgContents(true); //from view
	}, false);
/*
	//disable the need for touch events in the content area to save cpu power 
  	stage.mouseEventsEnabled = true;  		
	// enable touch interactions if supported on the current device:
	createjs.Touch.enable(stage);
	// enabled mouse over / out events
	stage.enableMouseOver(10);
	stage.mouseMoveOutside = true; // keep tracking the mouse even when it leaves the canvas
*/
	createjs.Ticker.setFPS(60);
	menuStage.mouseEventsEnabled = true;  		
	createjs.Touch.enable(menuStage);
	menuStage.enableMouseOver();
	menuStage.mouseMoveOutside = false; 


	setCanvas();

}

function handleTick(event) {
     // Actions carried out each tick (aka frame)
     if (!event.paused) {
         // Actions carried out when the Ticker is not paused.
     }
     //things will not render/draw/animate without the update functions
	stage.update();
	menuStage.update();
 }

/*
	the top menu size will change depending on if it is in edit layout mode or not.  since the menu is on top, we need to make it small
	when not in edit layout mode so that the text and links from the twitter feeds can be read and clicked.
 */
function setCanvas()
{
	var w = window.innerWidth;
	var h = window.innerHeight;
	//1920x1080 h:1.77, vert: .56
	//ipad 2  is 1024x672 h:1.52 , 1080p ratio .533 x.34,    776x936 vert:.82, ratio .4 x.866
	//ipod    is 480x208 h:2.3   , 1080p ratio .25 x.192,    326x363 vert:.89, ratio .185 x .336
	//android is 640x287 h:2.22  , 1080p ratio .333 x.265,   360x567 vert:.63, ratio .187 x .525 
	canvas.height =  h;  
	canvas.width  = w ;

	canvas.style.top  = "0px";
	canvas.style.left = "0px";
	stage.update();
	
	if(Data.Model.isToggleEditLayoutOn) 
	{
		menu.height = h;
	}
	else
		menu.height = Data.Model.menuBGstartYLocation; 

	menu.width  = w ;
	menuStage.update();

}

function checkLocalStorage()
{
	//if available, assign the model data
	if(localStorage.titleMenuColor)
	{
		//console.log("save data found")
		Data.Model.saveData = localStorage;
	}

}

function saveData()
{
	for(var key in Data.Model.saveData)
	{
		localStorage.setItem(key, Data.Model.saveData[key]);
	}
}

function deleteData()
{
	localStorage.clear();
}

/*
called from callback when twitter content is loaded	from index.html
 */
function storeTwitterData(data)
{

	var mentions;
	var comma;


    for(var i = 0; i< data.length; i++)
    {
		var tweet = data[i].text;
		var created = parseDate(data[i].created_at);
		var createdDate = created.getDate()+'-'+(created.getMonth()+1)+'-'+created.getFullYear()+' at '+created.getHours()+':'+created.getMinutes();
		tweet = tweet.parseURL().parseUsername().parseHashtag();
		// console.log(tweet)
		Data.Model.tweetData[Data.Model.columnDataCounter].tweets.push(tweet);
		Data.Model.tweetData[Data.Model.columnDataCounter].dates.push(createdDate);
		Data.Model.tweetData[Data.Model.columnDataCounter].URLs.push(data[i].entities.urls);
		Data.Model.tweetData[Data.Model.columnDataCounter].userMentions.push(data[i].entities.user_mentions);
		Data.Model.tweetData[Data.Model.columnDataCounter].sources.push(data[i].source);
		Data.Model.tweetData[Data.Model.columnDataCounter].retweets.push(data[i].retweet_count);

		var timelineTweet = $('<ul>');
		var mentionsPerTweet="none";

        for(var j=0; j < data[i].entities.user_mentions.length; j++)
		{
			mentions  = data[i].entities.user_mentions;
			if( data[i].entities.user_mentions.length == 0)
			{
				mentionsPerTweet= "none";
				return;
			}
//console.log(i +  " " + mentions[j].screen_name)
			if(j ==  data[i].entities.user_mentions.length-1)
			{
				comma = "";
			}
			else
			{
				comma = ", ";
			}
			mentionsPerTweet = mentions[j].screen_name + comma ;			
		}


		timelineTweet.append(
		    $('<li>').append(
		        $('<strong>').text(createdDate),
		        $('<span>').html('<br/>' + tweet + '<br/>Source:' + data[i].source + "<br/>Retweets: " +data[i].retweet_count+"<br/>Mentions: " + mentionsPerTweet+"<br/><br/>")
		    )
		);	

	
		 $('#timeline' +Data.Model.columnDataCounter ).append(timelineTweet);

    }
//console.log( Data.Model.tweetData[Data.Model.columnDataCounter].sources )


    Data.Model.columnDataCounter++;

    if(Data.Model.columnDataCounter == Data.Model.twitterFeedsLoaded)
    {

		checkLocalStorage();
	    initView();
    }

}


//Twitter Parsers.
String.prototype.parseURL = function() {
    return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g, function(url) {
        return url.link(url);
    });
};
String.prototype.parseUsername = function() {
    return this.replace(/[@]+[A-Za-z0-9-_]+/g, function(u) {
        var username = u.replace("@","")
        return u.link("http://twitter.com/"+username);
    });
};
String.prototype.parseHashtag = function() {
    return this.replace(/[#]+[A-Za-z0-9-_]+/g, function(t) {
        var tag = t.replace("#","")
        return t.link("https://twitter.com/hashtag/"+tag);
    });
};


function parseDate(str) {
    var v=str.split(' ');
    return new Date(Date.parse(v[1]+" "+v[2]+", "+v[5]+" "+v[3]+" UTC"));
} 

function openInNewTab(url )
{
  var win=window.open(url, '_blank');
  win.focus();
}


/*
 
These functions below are called from the view

 */

function createDragBtn(image,  in_num)
{
	var tempBtn = new createjs.Bitmap(image);
	tempBtn.name = image.name+""+ in_num;	
	setupDragAndDropForButton(tempBtn);
	
	return tempBtn;
}

function createBasicBtn(image, in_name)
{
	var tempBtn = new createjs.Bitmap(image);
	tempBtn.name = in_name;	
	setupMouseInteractionForMenuItem(tempBtn);
	
	return tempBtn;
}

function setupMouseInteractionForMenuItem(btn)
{
	btn.cursor = "pointer";
	btn.addEventListener("mouseover", function(e){
		var btn = e.target;
		btn.y -= 2;

	});
	btn.addEventListener("mouseout", function(e){
		var btn = e.target;
		btn.y += 2;
	});

	btn.addEventListener("click", function(e){
		switch(btn.name)
		{
			case "gear":			
				Data.Model.isToggleEditLayoutOn = !Data.Model.isToggleEditLayoutOn;

				if(Data.Model.isToggleEditLayoutOn)
				{
					showEditLayout();
				}
				else
				{
					hideEditLayout();
				}
				setCanvas();		

			break;
			case "arrowUpBtn0":		
				if( twitterContentContainer0.y < 0 )
					createjs.Tween.get(twitterContentContainer0).to({ x: twitterContentContainer0.x, y: twitterContentContainer0.y + (window.innerHeight- Data.Model.scrollNextPageOffset)}, Data.Model.scrollSpeed, createjs.Ease.getPowOut(3));
				else
					twitterContentContainer0.y = 0;
		
			break;
			case "arrowDownBtn0":			
				createjs.Tween.get(twitterContentContainer0).to({ x: twitterContentContainer0.x, y: twitterContentContainer0.y - (window.innerHeight- Data.Model.scrollNextPageOffset)}, Data.Model.scrollSpeed, createjs.Ease.getPowOut(3));
			
			break;
			case "arrowUpBtn1":			
				if( twitterContentContainer1.y < 0 )
					createjs.Tween.get(twitterContentContainer1).to({ x: twitterContentContainer1.x, y: twitterContentContainer1.y + (window.innerHeight- Data.Model.scrollNextPageOffset)}, Data.Model.scrollSpeed, createjs.Ease.getPowOut(3));
				else
					twitterContentContainer1.y = 0;
			break;
			case "arrowDownBtn1":
				createjs.Tween.get(twitterContentContainer1).to({ x: twitterContentContainer1.x, y: twitterContentContainer1.y - (window.innerHeight- Data.Model.scrollNextPageOffset)}, Data.Model.scrollSpeed, createjs.Ease.getPowOut(3));
			break;
			case "arrowUpBtn2":			
				if( twitterContentContainer2.y < 0 )
					createjs.Tween.get(twitterContentContainer2).to({ x: twitterContentContainer2.x, y: twitterContentContainer2.y + (window.innerHeight- Data.Model.scrollNextPageOffset)}, Data.Model.scrollSpeed, createjs.Ease.getPowOut(3));
				else
					twitterContentContainer2.y = 0;
			break;
			case "arrowDownBtn2":			
					createjs.Tween.get(twitterContentContainer2).to({ x: twitterContentContainer2.x, y: twitterContentContainer2.y - (window.innerHeight- Data.Model.scrollNextPageOffset)}, Data.Model.scrollSpeed, createjs.Ease.getPowOut(3));
			break;
			case "theme0Btn":
				Data.Model.saveData.titleMenuColor= "rgba(255,255,255,1.0)";
				Data.Model.saveData.textBGColor= "rgba(255,255,255,.7)";
				Data.Model.saveData.twitterFeedNameColor= "#000000";
				Data.Model.saveData.boxOutlineColor = "#cccccc";
				reorgContents();
			break;
			case "theme1Btn":			
				Data.Model.saveData.titleMenuColor= "#FFA31F";
				Data.Model.saveData.textBGColor= "rgba(3,192,60,.7)";
				Data.Model.saveData.twitterFeedNameColor= "#7800FF";
				Data.Model.saveData.boxOutlineColor = "#16B245";
				reorgContents();
			break;
			case "theme2Btn":			
				Data.Model.saveData.titleMenuColor= "#FDFD96";
				Data.Model.saveData.textBGColor= "rgba(20,127,204,.7)";
				Data.Model.saveData.twitterFeedNameColor= "#B21512";
				Data.Model.saveData.boxOutlineColor = "#096BB2";
				reorgContents();
			break;
			case "saveBtn":
				saveData();
				Data.Model.isToggleEditLayoutOn = false;
				hideEditLayout();
				setCanvas();	
			break;
		}
	});

}


function setupDragAndDropForButton(btn)
{
	btn.cursor = "pointer";

	btn.addEventListener("pressmove", function ( event ) {
	
		var scopeBtn = event.target;

		//console.log("creating drag and dopr");
		var tempTimelineCategoryTxt, tempTwitterContentContainer, tempTwitterBGContainer;
		var offset, arrowOffsetX;
		var currentUpArrow, currentDownArrow;
		var imageOffset = 40;

		switch(scopeBtn.name)
		{
			case "drag0":
				tempTimelineCategoryTxt = timelineCategoryText0;
				tempTwitterContentContainer = twitterContentContainer0;	
				tempTwitterBGContainer = twitterBGContainer0;
				offset = window.innerWidth/3.2/2;	
				currentUpArrow = arrowUpBtn0;	
				currentDownArrow = arrowDownBtn0;
				arrowOffsetX = offset - imageOffset;	
			break;
			case "drag1":
				tempTimelineCategoryTxt = timelineCategoryText1;
				tempTwitterContentContainer = twitterContentContainer1;
				tempTwitterBGContainer = twitterBGContainer1;
				offset = window.innerWidth/2;	
				currentUpArrow = arrowUpBtn1;	
				currentDownArrow = arrowDownBtn1;
				arrowOffsetX = window.innerWidth/3.2/2- imageOffset;
			break;
			case "drag2":
				tempTimelineCategoryTxt = timelineCategoryText2;
				tempTwitterContentContainer = twitterContentContainer2;	
				tempTwitterBGContainer = twitterBGContainer2;
				offset = window.innerWidth - window.innerWidth/3.2/2 ;
				currentUpArrow = arrowUpBtn2;	
				currentDownArrow = arrowDownBtn2;
				arrowOffsetX = window.innerWidth/3.2/2- imageOffset;
				
			break;
		}


		scopeBtn.x = event.stageX - scopeBtn.image.width/2;
		tempTimelineCategoryTxt.x = scopeBtn.x - timelineCategoryText0.getMeasuredWidth()/2 ;
		tempTwitterContentContainer.x = scopeBtn.x - offset; 
		tempTwitterBGContainer.x = scopeBtn.x - offset; 

		currentUpArrow.x = scopeBtn.x + arrowOffsetX ; //right side
		currentDownArrow.x = currentUpArrow.x ;
		
	});

		
}


/*
window.onscroll = function (e) {  
// called when the window is scrolled.  
} 
*/