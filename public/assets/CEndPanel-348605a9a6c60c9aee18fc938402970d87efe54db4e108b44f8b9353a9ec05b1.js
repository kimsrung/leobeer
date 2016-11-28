function CEndPanel(oSpriteBg){
    var _iScore;
    var _oBg;
    var _oScoreTextBack;
    var _oScoreText;
    var _oMsgText;
    var _oMsgTextBack;
    var _oGroup;
    
    this._init = function(oSpriteBg){
        _oGroup = new createjs.Container();
        _oGroup.alpha = 0;
        _oGroup.visible=false;
        s_oStage.addChild(_oGroup);
        
        _oBg = createBitmap(oSpriteBg);
        _oGroup.addChild(_oBg);

        _oMsgTextBack = new createjs.Text("","60px "+FONT_GAME, "#000");
        _oMsgTextBack.x = CANVAS_WIDTH/2 +1;
        _oMsgTextBack.y = (CANVAS_HEIGHT/2)-160;
        _oMsgTextBack.textAlign = "center";
        _oGroup.addChild(_oMsgTextBack);

        _oMsgText = new createjs.Text("","60px "+FONT_GAME, "#ffffff");
        _oMsgText.x = CANVAS_WIDTH/2;
        _oMsgText.y = (CANVAS_HEIGHT/2)-162;
        _oMsgText.textAlign = "center";
        _oGroup.addChild(_oMsgText);
      
        _oScoreTextBack = new createjs.Text("","40px "+FONT_GAME, "#000");
        _oScoreTextBack.x = CANVAS_WIDTH/2 +1;
        _oScoreTextBack.y = (CANVAS_HEIGHT/2) + 50;
        _oScoreTextBack.textAlign = "center";
        _oGroup.addChild(_oScoreTextBack);
        
        _oScoreText = new createjs.Text("","40px "+FONT_GAME, "#ffffff");
        _oScoreText.x = CANVAS_WIDTH/2;
        _oScoreText.y = (CANVAS_HEIGHT/2) + 52;
        _oScoreText.textAlign = "center";
        _oGroup.addChild(_oScoreText);
        
    };
    
    this.unload = function(){
        _oGroup.off("mousedown",this._onExit);
    };
    
    this._initListener = function(){
        _oGroup.on("mousedown",this._onExit);
        $(s_oMain).trigger("show_interlevel_ad");
    };
    
    this.show = function(iScore,bChallengeMode){
        _iScore = iScore;
        
        createjs.Sound.play("game_over");
        
        _oMsgTextBack.text = TEXT_GAMEOVER;
        _oMsgText.text = TEXT_GAMEOVER;
        
        _oScoreTextBack.text = TEXT_SCORE +": "+iScore;
        _oScoreText.text = TEXT_SCORE +": "+iScore;
        
        _oGroup.visible = true;
        
        var oParent = this;
        createjs.Tween.get(_oGroup).to({alpha:1 }, 500).call(function() {oParent._initListener();});

        $(s_oMain).trigger("save_score",[iScore,bChallengeMode?"challenge":"normal"]);
    };
    
    this._onExit = function(){
        $(s_oMain).trigger("share_event",_iScore);
        
        _oGroup.off("mousedown",this._onExit);
        s_oStage.removeChild(_oGroup);
        
        s_oGame.unload();
    };
    
    this._init(oSpriteBg);
    
    return this;
}
;
