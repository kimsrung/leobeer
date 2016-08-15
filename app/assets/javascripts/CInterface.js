function CInterface(ref,bChallenge){

    var _refCGame;

    var _bNewTopScoreBusy = false;
    var _bChallenge;

    var _oBg;
    var _oAudioToggle;
    var _oFade;
    var _oExitBut;
    var _oTextScore;
    var _oTextHiScore;
    var _oTextNewTopScore;
    
    this._init = function(ref,bChallenge){
    	_refCGame = ref;
        _bChallenge = bChallenge;

        _oBg = new createjs.Bitmap(s_oSpriteLibrary.getSprite('bg_game'));
        s_oStage.addChild(_oBg);

        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _oAudioToggle = new CToggle(CANVAS_WIDTH - (oSprite.width/2) -35, (oSprite.height/2) + 15,oSprite);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        };

        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _oExitBut = new CGfxButton(CANVAS_WIDTH - (oSprite.width/2) + 5, (oSprite.height/2) + 8,oSprite);
        _oExitBut.addEventListener(ON_MOUSE_UP, this._onExit, this);

        if (!_bChallenge) {
            var szNewTopScore = TEXT_NEWHISCORE,
                szScore = TEXT_SCORE + 0,
                szHiScore = TEXT_HISCORE + 0;

        } else {
            var szNewTopScore = TEXT_NEWHIGRAVITY,
                szScore = TEXT_GRAVITY + INIT_GRAVITY_CHALLENGE,
                szHiScore = TEXT_HIGRAVITY + 0;          
        };

        _oTextNewTopScore = new createjs.Text(szNewTopScore, "bold 24px Verdana", "Orange");
        _oTextNewTopScore.x = CANVAS_WIDTH/2;
        _oTextNewTopScore.y = 200;
        _oTextNewTopScore.textBaseline = "alphabetic";
        _oTextNewTopScore.textAlign = "center";
        _oTextNewTopScore.shadow = new createjs.Shadow("#000000", 2, 2, 2);
        _oTextNewTopScore.visible = false;

        _oTextScore = new createjs.Text(szScore, "bold 60px Verdana", "#5b8e2d");
        _oTextScore.x = 20;
        _oTextScore.y = 65;
        _oTextScore.textBaseline = "alphabetic";
        _oTextScore.textAlign = "left";
        _oTextScore.shadow = new createjs.Shadow("#000000", 3, 3, 2);

        _oTextHiScore = new createjs.Text(szHiScore, "bold 24px Verdana", "#fff");
        _oTextHiScore.x = CANVAS_WIDTH/2;
        _oTextHiScore.y = CANVAS_HEIGHT - 40;
        _oTextHiScore.textBaseline = "alphabetic";
        _oTextHiScore.textAlign = "center";
        _oTextHiScore.shadow = new createjs.Shadow("#000000", 2, 2, 2);

        s_oStage.addChild(_oTextNewTopScore,_oTextScore,_oTextHiScore);

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        
        s_oStage.addChild(_oFade);
        createjs.Tween.get(_oFade).to({alpha:0}, 1000).call(function(){_oFade.visible = false;}); 
    };
    
    this.unload = function(){
    	s_oStage.removeChild(_oBg,_oTextNewTopScore,_oTextScore,_oTextHiScore);

        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.unload();
        }

        _oExitBut.unload();
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
		$(s_oMain).trigger("restart");
    };
    
    this._onAudioToggle = function(){
        createjs.Sound.setMute(!s_bAudioActive);
    };
    
    this._init(ref,bChallenge);
};