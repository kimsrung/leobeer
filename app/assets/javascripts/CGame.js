function CGame(bChallengeMode){

    var _bChallengeMode;
    var _fGravityIncrease;
    var _iScore = 0;
    var _iHiScore = 0;
    var _iTimeElaps;

    var _oBall;
    var _oInterface;
    var _oPlayer;
    var _oEndPanel;
    
    this._init = function(bChallengeMode){
        _bChallengeMode = bChallengeMode;
        _iTimeElaps = TIME_GAME;

        _oPlayer = new CPlayer();

        if (_bChallengeMode) { 
            _oInterface = new CInterface(this,_bChallengeMode);
            _oBall = new CBallChallenge(this);
            var scoringData = _oBall.getInitialScoringdata();
            _iScore = scoringData.initGravity;
            _fGravityIncrease = scoringData.tick;
        } else {
            _oInterface = new CInterface(this,_bChallengeMode);
            _oBall = new CBall(this);
        };
        
        _oEndPanel = new CEndPanel(s_oSpriteLibrary.getSprite('panel'));
        
        $(s_oMain).trigger("start_level",1);
    };

    this.unload = function(){
		$(s_oMain).trigger("end_level",1);
        _oBall.unload();
        s_oGame = null;
        
        s_oStage.removeAllChildren();
        
        s_oMain.gotoMenu();
    };
	
    this.update = function(){
        if(s_bClickBall === false){
            return;
        }
        
        if(_oBall.checkEdges()){
            if (_iScore !== 0) {
                _oInterface.updateScore(0, Math.floor(_iHiScore*100)/100);
            };
            if (_bChallengeMode) {
                _iScore = _oBall.getInitialScoringdata().initGravity;
                if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
                    createjs.Sound.play("reset_kickup");
                }
            } else {
                if(_iScore > 0){
                    _iScore = 0;
                    if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
                        createjs.Sound.play("reset_kickup");
                    }
                }
                
            }

        }

        if(s_bClickBall){
            _iTimeElaps -= s_iTimeElaps;
            if(_iTimeElaps < 0){
                    s_bClickBall = false;
                    _oEndPanel.show(Math.floor(_iHiScore*100)/100,_bChallengeMode);
                    $(s_oMain).trigger("end_level",1);
            }else{
                _oInterface.refreshTime(formatTime(_iTimeElaps)); 
            }

            
        }else{
            _oInterface.refreshTime(formatTime(0)); 
        }

        _oBall.update();
        s_oStage.update();
    };

    this.increaseScore = function(){
        if (_bChallengeMode) {
            _iScore += _fGravityIncrease;
        } else {
            _iScore++;
        };

        var fRand = Math.random();
        if (fRand <= 0.25 && _iScore > _iHiScore) {
            _oInterface.newTopScore();
        } else if (fRand <= 0.7) {
            _oInterface.encouragement();
        };
        
        if (_iScore > _iHiScore) { 
            _iHiScore = _iScore;
        };

        _oInterface.updateScore(Math.floor(_iScore*100)/100, Math.floor(_iHiScore*100)/100);
    };

    this.playerAnim = function(posX,posY){
        _oPlayer.display(posX,posY);
    };
    
    s_oGame = this;
    s_bClickBall = true;
	
    this._init(bChallengeMode);
}

var s_bClickBall = true;
var s_oGame = null;