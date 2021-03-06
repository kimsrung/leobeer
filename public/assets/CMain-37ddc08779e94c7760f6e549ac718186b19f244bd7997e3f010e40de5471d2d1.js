function CMain(oData){
    var _bUpdate;
    var _iCurResource = 0;
    var RESOURCE_TO_LOAD = 0;
    var _iState = STATE_LOADING;
    
    var _oPreloader;
    var _oMenu;
    var _oGame;

    this.initContainer = function(oData){
        // init constants
	TIME_GAME = oData.time_game;
        INIT_GRAVITY_NORMAL = oData.gravity;
        INIT_BALLMASS_NORMAL = oData.ballMass;
        FRICTION_NORMAL = oData.friction;
        EDGEFRICTION_NORMAL = oData.edgeFriction;
        ROTATIONSPEED_NORMAL = oData.rotationSpeed;
        HORIZ_KICKFORCE_NORMAL = oData.horizKickForce;
        VERT_KICKFORCE_NORMAL = oData.vertKickForce;
        RESTITUTION_KICKFORCE_NORMAL = oData.restitutionKickForce;

        INIT_GRAVITY_CHALLENGE = oData.chGravity;
        INIT_BALLMASS_CHALLENGE = oData.chBallMass;
        FRICTION_CHALLENGE = oData.chFriction;
        EDGEFRICTION_CHALLENGE = oData.chEdgeFriction;
        ROTATIONSPEED_CHALLENGE = oData.chRotationSpeed;
        HORIZ_KICKFORCE_CHALLENGE = oData.chHorizKickForce;
        VERT_KICKFORCE_CHALLENGE = oData.chVertKickForce;
        RESTITUTION_KICKFORCE_CHALLENGE = oData.chRestitutionKickForce;
        GRAVITY_INCREASE = oData.chGravityIncrease;      

        s_oStage = new createjs.Stage("canvas");       
        createjs.Touch.enable(s_oStage);
        
        s_bMobile = jQuery.browser.mobile;
        if(s_bMobile === false){
            s_oStage.enableMouseOver(20);  
        }
        
        s_iPrevTime = new Date().getTime();

        createjs.Ticker.setFPS(30);
        createjs.Ticker.addEventListener("tick", this._update);
        
        if (navigator.userAgent.match(/Windows Phone/i)) {
            DISABLE_SOUND_MOBILE = true;
        }
		
        s_oSpriteLibrary  = new CSpriteLibrary();

        //ADD PRELOADER
        _oPreloader = new CPreloader();
        _bUpdate = true;
    };
    
    this.preloaderReady = function(){
        this._loadImages();
		
	if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            this._initSounds();
        }
    };

    this.soundLoaded = function(){
         _iCurResource++;
         var iPerc = Math.floor(_iCurResource/RESOURCE_TO_LOAD *100);

         _oPreloader.refreshLoader(iPerc);
        
         if(_iCurResource === RESOURCE_TO_LOAD){
            _oPreloader.unload();
            
            this.gotoMenu();
         }
    };
    
    this._initSounds = function(){
         if (!createjs.Sound.initializeDefaultPlugins()) {
             return;
         }

        if(navigator.userAgent.indexOf("Opera")>0 || navigator.userAgent.indexOf("OPR")>0){
            createjs.Sound.alternateExtensions = ["mp3"];
            createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this));

            createjs.Sound.registerSound("/reset_kickup.ogg", "reset_kickup");
            createjs.Sound.registerSound("/soundtrack.ogg", "soundtrack");
            createjs.Sound.registerSound("/tap.ogg", "tap");
        }else{
            createjs.Sound.alternateExtensions = ["ogg"];
            createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this));

            createjs.Sound.registerSound("/reset_kickup.mp3", "reset_kickup");
            createjs.Sound.registerSound("/soundtrack.mp3", "soundtrack");
            createjs.Sound.registerSound("/tap.mp3", "tap");
        }
        RESOURCE_TO_LOAD += 3;
        
    };
    
    this._loadImages = function(){
        s_oSpriteLibrary.init( this._onImagesLoaded,this._onAllImagesLoaded, this );

        s_oSpriteLibrary.addSprite("audio_icon","./audio_icon.png");
        s_oSpriteLibrary.addSprite("ball_1","/ball_1.png");
        s_oSpriteLibrary.addSprite("ball_2","/ball_2.png");
        s_oSpriteLibrary.addSprite("ball_3","/ball_3.png");
        s_oSpriteLibrary.addSprite("ball_hit","/ball_hit.png");
        s_oSpriteLibrary.addSprite("shadow","/shadow.png");
        s_oSpriteLibrary.addSprite("bg_game","/bg_game.jpg");
        s_oSpriteLibrary.addSprite("bg_menu","/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("but_exit","/but_exit.png");
        s_oSpriteLibrary.addSprite("but_play","/but_play.png");
        s_oSpriteLibrary.addSprite("panel","/msg_box.png");
        s_oSpriteLibrary.addSprite("but_credits","/but_credits.png");
        s_oSpriteLibrary.addSprite("logo_credits","/logo_credits.png");

        s_oSpriteLibrary.addSprite("player_1", "/player_sprite_1.png");
        s_oSpriteLibrary.addSprite("player_2", "/player_sprite_2.png");
        s_oSpriteLibrary.addSprite("player_3", "/player_sprite_3.png");
        s_oSpriteLibrary.addSprite("player_4", "/player_sprite_4.png");
        s_oSpriteLibrary.addSprite("player_5", "/player_sprite_5.png");
        s_oSpriteLibrary.addSprite("player_6", "/player_sprite_6.png");
        s_oSpriteLibrary.addSprite("player_7", "/player_sprite_7.png");
        
        RESOURCE_TO_LOAD += s_oSpriteLibrary.getNumSprites();

        s_oSpriteLibrary.loadSprites();
    };
    
    this._onImagesLoaded = function(){
        _iCurResource++;

        var iPerc = Math.floor(_iCurResource/RESOURCE_TO_LOAD *100);

        _oPreloader.refreshLoader(iPerc);
        
        if(_iCurResource === RESOURCE_TO_LOAD){
            _oPreloader.unload();
            
            this.gotoMenu();
        }
    };
    
    this._onAllImagesLoaded = function(){
        
    };
    
    this.onAllPreloaderImagesLoaded = function(){
        this._loadImages();
    };
    
    this.gotoMenu = function(){
        _oMenu = new CMenu();
        _iState = STATE_MENU;
    };
    
    this.gotoGame = function(bChallengeMode){
        _oGame = new CGame(bChallengeMode);
			
        _iState = STATE_GAME;
    };
    
    this.gotoHelp = function(){
        _oHelp = new CHelp();
        _iState = STATE_HELP;
    };
    
    this.stopUpdate = function(){
        _bUpdate = false;
        createjs.Ticker.paused = true;
        $("#block_game").css("display","block");
    };

    this.startUpdate = function(){
        s_iPrevTime = new Date().getTime();
        _bUpdate = true;
        createjs.Ticker.paused = false;
        $("#block_game").css("display","none");
    };


    
    this._update = function(event){
        if(!_bUpdate){
            return;
        }
        
        var iCurTime = new Date().getTime();
        s_iTimeElaps = iCurTime - s_iPrevTime;
        s_iCntTime += s_iTimeElaps;
        s_iCntFps++;
        s_iPrevTime = iCurTime;
        
        if ( s_iCntTime >= 1000 ){
            s_iCurFps = s_iCntFps;
            s_iCntTime-=1000;
            s_iCntFps = 0;
        }
                
        if(_iState === STATE_GAME){
            _oGame.update();
        }
        
        s_oStage.update(event);

    };
    
    s_oMain = this;

    this.initContainer(oData);
}

var s_bMobile;
var s_bAudioActive = true;
var s_iCntTime = 0;
var s_iTimeElaps = 0;
var s_iPrevTime = 0;
var s_iCntFps = 0;
var s_iCurFps = 0;

var s_oSoundTrack = null;
var s_oDrawLayer;
var s_oStage;
var s_oMain;
var s_oSpriteLibrary;
var s_oGameSettings;
