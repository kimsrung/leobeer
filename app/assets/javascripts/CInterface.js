function CInterface(ref,bChallenge){

    var _refCGame;

    var _bNewTopScoreBusy = false;
    var _bChallenge;

    var _oBg;
    var _oAudioToggle;
    var _oFade;
    var _oExitBut;
    var _oTextScore;
    var _oTimeText;
    var _oTextHiScore;
    var _oTextNewTopScore;
    
    var _pStartPosAudio;
    var _pStartPosExit;
    var _pStartPosScore;
    var _pStartPosTime;
    var _pStartPosTopScore;
    
    this._init = function(ref,bChallenge){
    	_refCGame = ref;
        _bChallenge = bChallenge;

        _oBg = new createjs.Bitmap(s_oSpriteLibrary.getSprite('bg_game'));
        s_oStage.addChild(_oBg);

        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _pStartPosAudio = {x:CANVAS_WIDTH - (oSprite.width/2) -35,y: (oSprite.height/2) + 15};
            _oAudioToggle = new CToggle(_pStartPosAudio.x,_pStartPosAudio.y,oSprite);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        };

        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = {x:CANVAS_WIDTH - (oSprite.width/2) + 5,y:(oSprite.height/2) + 8};
        _oExitBut = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y,oSprite);
        _oExitBut.addEventListener(ON_MOUSE_UP, this._onExit, this);
        
        var szNewTopScore;
        var szScore;
        var szHiScore;
        if (!_bChallenge) {
            szNewTopScore = TEXT_NEWHISCORE;
            szScore = TEXT_SCORE + 0;
            szHiScore = TEXT_HISCORE + 0;

        } else {
            szNewTopScore = TEXT_NEWHIGRAVITY;
            szScore = TEXT_GRAVITY + INIT_GRAVITY_CHALLENGE;
            szHiScore = TEXT_HIGRAVITY + 0;          
        };
        
        
        _oTextNewTopScore = new createjs.Text(szNewTopScore, "24px "+FONT_GAME, "Orange");
        _oTextNewTopScore.x = CANVAS_WIDTH/2;
        _oTextNewTopScore.y = 300;
        _oTextNewTopScore.textBaseline = "alphabetic";
        _oTextNewTopScore.textAlign = "center";
        _oTextNewTopScore.shadow = new createjs.Shadow("#000000", 2, 2, 2);
        _oTextNewTopScore.visible = false;
        
        _pStartPosScore = {x:20,y:65};
        _oTextScore = new createjs.Text(szScore, "60px "+FONT_GAME, "#5b8e2d");
        _oTextScore.x = _pStartPosScore.x;
        _oTextScore.y = _pStartPosScore.y;
        _oTextScore.textBaseline = "alphabetic";
        _oTextScore.textAlign = "left";
        _oTextScore.shadow = new createjs.Shadow("#000000", 3, 3, 2);
		
        _pStartPosTime = {x:20,y:125};
	_oTimeText = new createjs.Text(TEXT_TIME,"50px "+FONT_GAME, "#5b8e2d");
        _oTimeText.x = _pStartPosTime.x;
        _oTimeText.y = _pStartPosTime.y;
        _oTimeText.textAlign = "left";
        _oTimeText.textBaseline = "alphabetic";
	_oTimeText.shadow = new createjs.Shadow("#000000", 3, 3, 2);
        s_oStage.addChild(_oTimeText);
        
        _pStartPosTopScore = {x:CANVAS_WIDTH/2,y:CANVAS_HEIGHT - 10};
        _oTextHiScore = new createjs.Text(szHiScore, "24px "+FONT_GAME, "#fff");
        _oTextHiScore.x = _pStartPosTopScore.x;
        _oTextHiScore.y = _pStartPosTopScore.y;
        _oTextHiScore.textBaseline = "alphabetic";
        _oTextHiScore.textAlign = "center";
        _oTextHiScore.shadow = new createjs.Shadow("#000000", 2, 2, 2);

        s_oStage.addChild(_oTextNewTopScore,_oTextScore,_oTextHiScore);

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        
        s_oStage.addChild(_oFade);
        createjs.Tween.get(_oFade).to({alpha:0}, 1000).call(function(){_oFade.visible = false;}); 
        
        this.refreshButtonPos (s_iOffsetX,s_iOffsetY);
    };
    
    this.refreshButtonPos = function(iNewX,iNewY){
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX,iNewY + _pStartPosAudio.y);
        }
        _oExitBut.setPosition(_pStartPosExit.x - iNewX,_pStartPosExit.y + iNewY);
        
        _oTextScore.x = _pStartPosScore.x + iNewX;
        _oTextScore.y = _pStartPosScore.y + iNewY;
        
        _oTimeText.x = _pStartPosTime.x + iNewX;
        _oTimeText.y = _pStartPosTime.y + iNewY;
        
        _oTextHiScore.x = _pStartPosTopScore.x;
        _oTextHiScore.y = _pStartPosTopScore.y - iNewY;
    };
    
    this.unload = function(){
    	s_oStage.removeChild(_oBg,_oTextNewTopScore,_oTextScore,_oTextHiScore);

        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.unload();
        }

        _oExitBut.unload();
        s_oInterface = null;
    };

    this.updateScore = function(iScore,iHiScore){

        if (!_bChallenge) {

            var szScore = TEXT_SCORE + iScore;
            _oTextScore.text = szScore;

            var szHiScore = TEXT_HISCORE + iHiScore;
            _oTextHiScore.text = szHiScore;            

        } else {

            var _iScore;
            if (iScore === 0) {
                _iScore = INIT_GRAVITY_CHALLENGE;
            } else {
                _iScore = iScore;
            };

            var szScore = TEXT_GRAVITY + _iScore;
            _oTextScore.text = szScore;

            var szHiScore = TEXT_HIGRAVITY + iHiScore;
            _oTextHiScore.text = szHiScore; 

        };
    };
	
    this.refreshTime = function(iValue){
        _oTimeText.text = TEXT_TIME + " " + iValue;
    };

    this.newTopScore = function(){
        if (_bNewTopScoreBusy === false) {
            _bNewTopScoreBusy = true;

            _oTextNewTopScore.text = TEXT_NEWHISCORE;
            _oTextNewTopScore.x = - 200;
            _oTextNewTopScore.alpha = 0.5;
            _oTextNewTopScore.visible = true;
            _oTextNewTopScore.color = "Orange";

            createjs.Tween.get(_oTextNewTopScore)
                .to({x: CANVAS_WIDTH/2, scaleX: 1.5, scaleY: 1.5, alpha:1}, 750,createjs.Ease.backInOut)
                .wait(500)
                .call(function(){
                    createjs.Tween.get(_oTextNewTopScore).
                    to({x: CANVAS_WIDTH + 200, scaleX: 1, scaleY: 1, alpha:0.5}, 750,createjs.Ease.backInOut).
                    call(function(){
                        _oTextNewTopScore.visible = false;
                        _bNewTopScoreBusy = false;
                    }); 
                });  
        };
    };

    this.encouragement = function(){
        if (_bNewTopScoreBusy === false) {
            var rnd = Math.floor(Math.random()*(TEXT_SUPPORT_STRINGS + 1));

            _bNewTopScoreBusy = true;

            _oTextNewTopScore.text = TEXT_SUPPORT[rnd];
            _oTextNewTopScore.x = - 200;
            _oTextNewTopScore.alpha = 0.5;
            _oTextNewTopScore.visible = true;
            _oTextNewTopScore.color = "#fcd000";

            createjs.Tween.get(_oTextNewTopScore)
                .to({x: CANVAS_WIDTH/2, scaleX: 1.5, scaleY: 1.5, alpha:1}, 750,createjs.Ease.backInOut)
                .wait(500)
                .call(function(){
                    createjs.Tween.get(_oTextNewTopScore).
                    to({x: CANVAS_WIDTH + 200, scaleX: 1, scaleY: 1, alpha:0.5}, 750,createjs.Ease.backInOut).
                    call(function(){
                        _oTextNewTopScore.visible = false;
                        _bNewTopScoreBusy = false;
                    }); 
                });  
        };
    };

    this._onExit = function(){
    	this.unload();

    	_refCGame.unload();
        
        $(s_oMain).trigger("end_session");
    };
    
    this._onAudioToggle = function(){
        createjs.Sound.setMute(!s_bAudioActive);
    };
    
    this.getTopScore = function(){
        return _oTextHiScore.text;
    };
    
    s_oInterface = this;
    
    this._init(ref,bChallenge);
};

var s_oInterface = null;