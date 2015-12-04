var Data =  Data || {};
Data.Model = {
   
    twitterFeedName0: "@Data",
    twitterFeedName1: "@laughingsquid",
    twitterFeedName2: "@techcrunch",

    timelineCatetoryTextStartY: 30,
    dragBtnYLocation: 0,
    themeBtnSize: 50,
    columnDataCounter:0,
    twitterFeedsLoaded:3,
    topMargin:80,  //determins where text starts
    fontSize:12,
    BGstartYLocation: 60, //the background for the text
    menuBGstartYLocation: 80, //the background for the text
    arrowUpYLocation: 5,
    scrollNextPageOffset: 150,
    scrollSpeed: 1000, //in miliseconds
    textWidthModifier: 3.5,
    BGstartXLocationModifer0:15,  //in pixels
    BGstartXLocationModifer1:2.86,  // in ratio to whole width
    BGstartXLocationModifer2:10, //right aligned offset
    
    
    isToggleEditLayoutOn: false,
    
    saveData:{
        //data to be saved
        twitterFeedNameColor: "#000000",
        titleMenuColor: "#FFFFFF",  //default white color
        textBGColor: "rgba(255,255,255,0.7)", 
        boxOutlineColor:  "#CCCCCC", 
    },

    tweetData:[
        {  //@Data,
            tweets:[],
            dates:[],
            URLs:[],
            userMentions:[],
            sources:[],
            retweets:[]
        },
        {  //@laughingsquid
            tweets:[],
            dates:[],
            URLs:[],
            userMentions:[],
            sources:[],
            retweets:[]
        }
        ,
        {  //@techcrunch
            tweets:[],
            dates:[],
            URLs:[],
            userMentions:[],
            sources:[],
            retweets:[]
        }
    ]


};

