CPlayer = function(){
	
	var _bBusy = false;

	var _oSprite;

	this.display = function(posx,posy){
		if(!_bBusy){
			_bBusy = true;
			var iX, iY, iToX, iToY;

			if (posy >= 8*CANVAS_HEIGHT/10) { // was 6
				_oSprite = new createjs.Bitmap(s_oSpriteLibrary.getSprite("player_1"));
				_oSprite.regX = 16;
				_oSprite.regY = 720;
				_oSprite.alpha = 0;				

				iY = posy;
				iToY = posy - BALL_SIZE/4;
				if (posx >= CANVAS_WIDTH/2) {
					iX = posx;
					iToX = posx;
					_oSprite.scaleX = -1;
				} else {
					iX = posx;
					iToX = posx;
				};	
			} else if (posy >= 7*CANVAS_HEIGHT/10) { // was 5
				_oSprite = new createjs.Bitmap(s_oSpriteLibrary.getSprite("player_2"));
				_oSprite.regX = 28;
				_oSprite.regY = 675;
				_oSprite.alpha = 0;

				iY = posy;
				iToY = posy - BALL_SIZE/4;
				if (posx >= CANVAS_WIDTH/2) {
					iX = posx;
					iToX = posx;
					_oSprite.scaleX = -1;
				} else {
					iX = posx;
					iToX = posx;
				};	
			} else if (posy >= 6*CANVAS_HEIGHT/10) {
				_oSprite = new createjs.Bitmap(s_oSpriteLibrary.getSprite("player_4"));
				_oSprite.regX = 440;
				_oSprite.regY = 410;
				_oSprite.alpha = 0;

				iY = posy;
				iToY = posy - BALL_SIZE/2;				
				if (posx >= CANVAS_WIDTH/2) {
					iX = posx;
					iToX = posx;
				} else {
					iX = posx;
					iToX = posx;
					_oSprite.scaleX = -1;
				};	
			} else if (posy >= 4*CANVAS_HEIGHT/10) {
				_oSprite = new createjs.Bitmap(s_oSpriteLibrary.getSprite("player_3"));
				_oSprite.regX = 51;
				_oSprite.regY = 358;
				_oSprite.alpha = 0;

				iY = posy;
				iToY = posy - BALL_SIZE/2;				
				if (posx >= CANVAS_WIDTH/2) {
					iX = posx;
					iToX = posx;
					_oSprite.scaleX = -1;
				} else {
					iX = posx;
					iToX = posx;
				};	
			} else if (posy >= 3*CANVAS_HEIGHT/10) {
				_oSprite = new createjs.Bitmap(s_oSpriteLibrary.getSprite("player_5"));
				_oSprite.regX = 196;
				_oSprite.regY = 132;
				_oSprite.alpha = 0;

				iY = posy;
				iToY = posy - BALL_SIZE/2;					
				if (posx >= CANVAS_WIDTH/2) {
					iX = posx;
					iToX = posx;
				} else {
					iX = posx;
					iToX = posx;
					_oSprite.scaleX = -1;
				};	
			} else if (posy >= 0*3*CANVAS_HEIGHT/10) { // posy >= 0*CANVAS_HEIGHT/6
				_oSprite = new createjs.Bitmap(s_oSpriteLibrary.getSprite("player_7"));
				_oSprite.regX = 229;
				_oSprite.regY = 3;
				_oSprite.alpha = 0;

				iY = posy;
				iToY = posy - BALL_SIZE/2;				
				if (posx >= CANVAS_WIDTH/2) {
					iX = posx;
					iToX = posx;
				} else {
					iX = posx;
					iToX = posx;
					_oSprite.scaleX = -1;
				};	
				
			};

			_oSprite.x = iX;
			_oSprite.y = iY;
			s_oStage.addChildAt(_oSprite,s_oStage.children.length - 2);			

	        createjs.Tween.get(_oSprite)
		        .to({x: iToX, y: iToY, alpha:1}, 100,createjs.Ease.cubicIn)
		        .wait(25)
		        .call(function(){
	            	createjs.Tween.get(_oSprite)
	            	.to({x: iX, y: iY, alpha:0}, 375,createjs.Ease.circIn)
	            	.call(function(){
		            	_bBusy = false;
	            		s_oStage.removeChild(_oSprite);
	            	});
	        	});
			};
		};

};