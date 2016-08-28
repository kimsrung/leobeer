function CMenu(){
    var _pStartPosPlay;
    var _pStartPosChallenge;
    var _pStartPosAudio;
    var _pStartPosInfo;
    
    var _oBg;
    var _oButPlay;
    var _oButPlayChallenge;
    var _oAudioToggle;
    var _oFade;
    var _oButInfo;
    
    
    
    this._init = function(){
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_menu'));
        s_oStage.addChild(_oBg);

        _pStartPosPlay = {x:(CANVAS_WIDTH/2 - 170),y:CANVAS_HEIGHT -70};
        var oSprite = s_oSpriteLibrary.getSprite('but_play');
        _oButPlay = new CTextButton(_pStartPosPlay.x,_pStartPosPlay.y,oSprite,TEXT_PLAY,FONT_GAME,"#ffffff",30,s_oStage);
        _oButPlay.addEventListener(ON_MOUSE_UP, this._onButPlay, this, false);
        
        _pStartPosChallenge = {x:(CANVAS_WIDTH/2 + 170),y:CANVAS_HEIGHT -70};
        _oButPlayChallenge = new CTextButton(_pStartPosChallenge.x,_pStartPosChallenge.y,oSprite,TEXT_PLAYCHALLENGE,FONT_GAME,"#ffffff",30,s_oStage);
        _oButPlayChallenge.addEventListener(ON_MOUSE_UP, this._onButPlayChallenge, this);

        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
             var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _pStartPosAudio = {x: CANVAS_WIDTH - (oSprite.width/4) - 10, y: (oSprite.height/2) + 10};   
            _oAudioToggle = new CToggle(_pStartPosAudio.x,_pStartPosAudio.y,oSprite);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
            
            if(s_oSoundTrack === null){
                s_oSoundTrack = createjs.Sound.play("soundtrack",{loop:-1,volume:0.7});
            }
        }
        
        var oSprite = s_oSpriteLibrary.getSprite('but_credits');
        _pStartPosInfo = {x: (oSprite.height/2) + 10, y: (oSprite.height/2) + 10}; 
        _oButInfo = new CGfxButton(_pStartPosInfo.x,_pStartPosInfo.y,oSprite,s_oStage);
        _oButInfo.addEventListener(ON_MOUSE_UP, this._onCredits, this);

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        
        s_oStage.addChild(_oFade);
        
        createjs.Tween.get(_oFade).to({alpha:0}, 1000).call(function(){_oFade.visible = false;});  
        
        this.refreshButtonPos (s_iOffsetX,s_iOffsetY);
    };
    
    this.unload = function(){
        _oButPlay.unload(); 
        _oButPlay = null;
        
        _oButInfo.unload();

        _oButPlayChallenge.unload();
        _oButPlayChallenge = null;
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        
        s_oStage.removeAllChildren();
        
        s_oMenu = null;
    };
    
    this.refreshButtonPos = function(iNewX,iNewY){
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX,iNewY + _pStartPosAudio.y);
        }
        
        _oButPlay.setPosition(_pStartPosPlay.x,_pStartPosPlay.y - iNewY);
        _oButPlayChallenge.setPosition(_pStartPosChallenge.x,_pStartPosChallenge.y - iNewY);
        _oButInfo.setPosition(_pStartPosInfo.x + iNewX,iNewY + _pStartPosInfo.y);
    };
    
    this._onButPlay = function(){
        this.unload();
        s_oMain.gotoGame(false);
        
        $(s_oMain).trigger("start_session");
    };

    this._onButPlayChallenge = function(){
        this.unload();
        s_oMain.gotoGame(true);
        
        $(s_oMain).trigger("start_session");
    };
    
    this._onCredits = function(){
        new CCreditsPanel();
    };

    this._onAudioToggle = function(){
        createjs.Sound.setMute(!s_bAudioActive);
    };
    
    s_oMenu = this;
    
    this._init();
}

var s_oMenu = null;