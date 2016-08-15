function CGame(bChallengeMode){

    var _bChallengeMode;
    var _fGravityIncrease;
    var _iScore = 0;
    var _iHiScore = 0;

    var _oBall;
    var _oInterface;
    var _oPlayer;
    
    this._init = function(bChallengeMode){
        _bChallengeMode = bChallengeMode;

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
    };

    this.unload = function(){
        _oBall.unload();

        s_oMain.gotoMenu();
    };
	
    this.update = function(){
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
                
            };
        };

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
			$(s_oMain).trigger("new_highscore",_iHiScore);
        };

        _oInterface.updateScore(Math.floor(_iScore*100)/100, Math.floor(_iHiScore*100)/100);
    };

    this.playerAnim = function(posX,posY){
        _oPlayer.display(posX,posY);
    };
    
    this._init(bChallengeMode);
}