function CBall(CGameRef){

	var _bFrozen = false;

	var _fMass = INIT_BALLMASS_NORMAL;
	var _fTheta = 0;
	var _fAngVel = 0;
	var _fFriction = FRICTION_NORMAL;
	var _fEdgesFriction = EDGEFRICTION_NORMAL;
	var _fRotationSpeed = ROTATIONSPEED_NORMAL;
	var _fMaxXKickForce = HORIZ_KICKFORCE_NORMAL;
	var _fMaxYKickForce = VERT_KICKFORCE_NORMAL;
	var _fBounceKickForce = RESTITUTION_KICKFORCE_NORMAL;

	var _v2Pos;
	var _v2Vel;
	var _v2Acc;
	var _v2Gravity = new CVector2(0, INIT_GRAVITY_NORMAL);

	var _oSprite;
	var _oShadowSprite;
	var _oHitSprite;

	var _refCGame;

	this._init = function(CGameRef){
		var szBallType = "ball_" + Math.floor(Math.random()*3 + 1);
		_oSprite = new createjs.Bitmap(s_oSpriteLibrary.getSprite(szBallType));
		_oSprite.regX = BALL_SIZE/2;
		_oSprite.regY = BALL_SIZE/2;
		_oSprite.x = CANVAS_WIDTH/2;
		_oSprite.y = CANVAS_HEIGHT/2;

		_oShadowSprite = new createjs.Bitmap(s_oSpriteLibrary.getSprite('shadow'));
		_oShadowSprite.regX = SHADOW_WIDTH/2;
		_oShadowSprite.regY = SHADOW_HEIGHT/2;
		_oShadowSprite.x = _oSprite.x;
		_oShadowSprite.y = CANVAS_HEIGHT - BALL_BOUNCE_YOFFSET;
		_oShadowSprite.alpha = 0.65;

		_oHitSprite = new createjs.Bitmap(s_oSpriteLibrary.getSprite('ball_hit'));
		_oHitSprite.regX = BALL_SIZE/2;
		_oHitSprite.regY = BALL_SIZE/2;
		_oHitSprite.x = CANVAS_WIDTH/2;
		_oHitSprite.y = CANVAS_HEIGHT/2;
		_oHitSprite.alpha = 0;

		s_oStage.addChild(_oShadowSprite);
		s_oStage.addChild(_oSprite);
		s_oStage.addChild(_oHitSprite);

		_oSprite.on("mousedown", this.clicked, this);

		_v2Pos = new CVector2(_oSprite.x,_oSprite.y);
		_v2Vel = new CVector2(0,0);
		_v2Acc = new CVector2(0,0);

		_refCGame = CGameRef;
	};

	this.unload = function(){
		s_oStage.removeChild(_oSprite,_oShadowSprite,_oHitSprite);
		_oSprite = undefined;
	};

	this.update = function(){
		_v2Acc.addV(_v2Gravity);
		this._friction();

		_v2Vel.addV(_v2Acc);
		
		_v2Pos.addV(_v2Vel);

		_v2Acc._init(0,0);

		_oSprite.x = _v2Pos.getX();
		_oSprite.y = _v2Pos.getY();
		_fAngVel = _v2Vel.getX();
		_fTheta += _fAngVel;
		_oSprite.rotation = _fTheta * _fRotationSpeed;

		_oShadowSprite.x = _oSprite.x;
		_oShadowSprite.scaleX = _oShadowSprite.scaleY = _oSprite.y / (CANVAS_HEIGHT - BALL_SIZE/2 - BALL_BOUNCE_YOFFSET);
		_oShadowSprite.alpha =  _oSprite.y / (CANVAS_HEIGHT - BALL_SIZE/2 - BALL_BOUNCE_YOFFSET);

		_oHitSprite.x = _oSprite.x;
		_oHitSprite.y = _oSprite.y;
		_oHitSprite.rotation = _fTheta * _fRotationSpeed;
	};

	this.checkEdges = function(){
		if (_v2Pos.getX() < BALL_SIZE/2) {

			_v2Pos.set(BALL_SIZE/2,_v2Pos.getY());
			_v2Vel.set(-(1- _fEdgesFriction)*_v2Vel.getX(),_v2Vel.getY());

		} else if (_v2Pos.getX() > CANVAS_WIDTH - BALL_SIZE/2) {

			_v2Pos.set(CANVAS_WIDTH - BALL_SIZE/2,_v2Pos.getY());
			_v2Vel.set(-(1- _fEdgesFriction)*_v2Vel.getX(),_v2Vel.getY());

		}; 

		if (_v2Pos.getY() > CANVAS_HEIGHT - BALL_SIZE/2 - BALL_BOUNCE_YOFFSET) { 

			_v2Pos.set(_v2Pos.getX(),CANVAS_HEIGHT - BALL_SIZE/2 - BALL_BOUNCE_YOFFSET);
			_v2Vel.set(_v2Vel.getX(),-(1- _fEdgesFriction)*_v2Vel.getY());

			return true;
		};
	};

	this.applyForce = function(v2Force){
		var f = new CVector2(v2Force.getX(),v2Force.getY());
		f.scalarDivision(_fMass);
		_v2Acc.addV(f);
	};

	this.clicked = function(evt){
                if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
                    createjs.Sound.play("tap");
                }
		_refCGame.increaseScore();
		_refCGame.playerAnim(_v2Pos.getX(),_v2Pos.getY());

		// "bounce" preserved force
		_v2Vel.set(-(_fBounceKickForce)*_v2Vel.getX(),
				   -(_fBounceKickForce)*_v2Vel.getY());
		
		// computing and applying kick force
		var _v2ClickDiff = new CVector2( - evt.rawX + _v2Pos.getX(), - 1 * (evt.rawY - (_v2Pos.getY() - BALL_SIZE/2)));
		_v2ClickDiff.normalize();
		var _v2KickForce = new CVector2(_v2ClickDiff.getX()*_fMaxXKickForce,
										_v2ClickDiff.getY()*_fMaxYKickForce - 0);
		this.applyForce(_v2KickForce);

		// click tween
		if(_bFrozen === false){
			_bFrozen = true;
            createjs.Tween.get(_oSprite)
                .to({scaleX:1.15,scaleY:0.85}, 100,createjs.Ease.cubicIn)
                .call(function(){
                    createjs.Tween.get(_oSprite).
                    to({scaleX:1,scaleY:1}, 100,createjs.Ease.cubicOut).
                    call(function(){
                        //_bFrozen = false;
                    }); 
                }); 
            createjs.Tween.get(_oHitSprite)
	            .to({scaleX:1.15,scaleY:0.85,alpha: 0.4}, 100,createjs.Ease.cubicIn)
	            .call(function(){
	                createjs.Tween.get(_oHitSprite).
	                to({scaleX:1,scaleY:1,alpha: 0}, 100,createjs.Ease.cubicOut).
	                call(function(){
	                    _bFrozen = false;
	                }); 
            }); 
		};
	};

	this._friction = function(){
		var v2Friction = new CVector2(_v2Vel.getX(),_v2Vel.getY());
		v2Friction.scalarProduct(-1);
		v2Friction.normalize();
		v2Friction.scalarProduct(_fFriction);
		this.applyForce(v2Friction);
	};

	this._v2Limit = function(v2,fLimit){
		if (v2.length() >= fLimit) {
			v2.normalize();
			v2.scalarProduct(fLimit);
		};
	};

	this._init(CGameRef);
}