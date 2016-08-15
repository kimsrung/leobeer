function CMenu(){
    var _oBg;
    var _oButPlay;
    var _oButPlayChallenge;
    var _oAudioToggle;
    var _oFade;
    
    this._init = function(){
        _oBg = new createjs.Bitmap(s_oSpriteLibrary.getSprite('bg_menu'));
        s_oStage.addChild(_oBg);

        var oSprite = s_oSpriteLibrary.getSprite('but_play');
        _oButPlay = new CTextButton((CANVAS_WIDTH/2 - 170),CANVAS_HEIGHT -70,oSprite,TEXT_PLAY,"Verdana","#ffffff",30,s_oStage);
        _oButPlay.addEventListener(ON_MOUSE_UP, this._onButPlay, this, false);

        _oButPlayChallenge = new CTextButton((CANVAS_WIDTH/2 + 170),CANVAS_HEIGHT -70,oSprite,TEXT_PLAYCHALLENGE,"Verdana","#ffffff",30,s_oStage);
        _oButPlayChallenge.addEventListener(ON_MOUSE_UP, this._onButPlayChallenge, this);

        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _oAudioToggle = new CToggle(CANVAS_WIDTH - (oSprite.width/2) + 5,(oSprite.height/2) + 20,oSprite);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
            
            if(s_oSoundTrack === null){
                s_oSoundTrack = createjs.Sound.play("soundtrack",{loop:-1,volume:0.7});
            }
            
        }

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        
        s_oStage.addChild(_oFade);
        
        createjs.Tween.get(_oFade).to({alpha:0}, 1000).call(function(){_oFade.visible = false;});  
    };
    
    this.unload = function(){
        _oButPlay.unload(); 
        _oButPlay = null;

        _oButPlayChallenge.unload();
        _oButPlayChallenge = null;
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        
        s_oStage.removeAllChildren();
    };
    
    this._onButPlay = function(){
        this.unload();
        s_oMain.gotoGame(false);
    };

    this._onButPlayChallenge = function(){
        this.unload();
        s_oMain.gotoGame(true);
    };

    this._onAudioToggle = function(){
        createjs.Sound.setMute(!s_bAudioActive);
    };
    
    this._init();
}