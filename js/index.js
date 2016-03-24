var MonkeyAnimate = {

	hou : {},
	jingu : {},
	endTop : 0,
	olds : 0,
	nav : {},
	navbut : {},
	page2Top : 0,
	page3Top : 0,
	divM : {},
	secp1 : {},
	topl : {},
	workBut : {},
	bottom1 : {},
	bottom2 : {},
	eyes1 : {},
	eyes2 : {},
	canvas : {},
	getScrollTop : function(ele){
		var scrollPos;  
		if(ele)
		{
			scrollPos = ele.offsetTop;
		}
        else if (window.pageYOffset) {  
       		scrollPos = window.pageYOffset; 
       	}  
        else if (document.compatMode && document.compatMode != 'BackCompat')  
        { 
        	scrollPos = document.documentElement.scrollTop; 
        }  
        else if (document.body) 
        {
        	scrollPos = document.body.scrollTop;
        }   
        return scrollPos;   
	},
	bindNavButClick : function(){
		this.navbut[2].onclick = function(){
			this.divM.style.left = "0rem";
		}.bind(MonkeyAnimate);
		this.navbut[1].onclick = function(){
			this.divM.style.left = "5rem";
		}.bind(MonkeyAnimate);
		this.navbut[0].onclick = function(){
			this.divM.style.left = "10rem";
		}.bind(MonkeyAnimate);
	},
	init : function(){
		// this.hou = document.getElementById('hou');
		// this.jingu = document.getElementById('jingu');
		// this.endTop = this.getScrollTop(document.getElementById('monkey'));
		this.endTop = this.getScrollTop(document.getElementById('mycanvas'));
		this.nav = document.getElementById('nav');
		this.navbut = this.nav.getElementsByTagName('li');
		this.page2Top = this.getScrollTop(document.getElementById('page2'));
		this.page3Top = this.getScrollTop(document.getElementById('page3'));
		this.divM = document.getElementById('border');
		this.secp1 = document.getElementById('secp1').getElementsByTagName('li');
		this.topl = document.getElementById('topl');
		this.workBut = document.getElementById('top').getElementsByTagName('li');
		this.bottom1 = document.getElementById('bottom1');
		this.bottom2 = document.getElementById('bottom2');
		this.eyes1 = document.getElementById('eyes1');
		this.eyes2 = document.getElementById('eyes2');
		this.canvas = document.getElementById('mycanvas');
		this.bindNavButClick();
		
		this.workButClick();
		window.onscroll = this.scroll.bind(MonkeyAnimate);
		Canvas.init();
		this.scroll();
		document.getElementById('page1').onmousemove = function(e)
		{
			e = e || window.event;
			this.fixedEyes(e.clientX,e.clientY);
		}.bind(this);

	},
	workButClick : function(){
		this.workBut[0].onclick = function(){
			MonkeyAnimate.topl.style.left = "5%";
			MonkeyAnimate.bottom1.style.marginTop = "0";
			MonkeyAnimate.bottom2.style.marginTop = "0";
		};
		this.workBut[1].onclick = function(){
			MonkeyAnimate.topl.style.left = "40%";
			MonkeyAnimate.bottom1.style.marginTop = "-100%";
			MonkeyAnimate.bottom2.style.marginTop = "0";
		};
		this.workBut[2].onclick = function(){
			MonkeyAnimate.topl.style.left = "75%";
			MonkeyAnimate.bottom1.style.marginTop = "-200%";
			MonkeyAnimate.bottom2.style.marginTop = "-100%";
		};
	},
	changeNavColor : function(grey)
	{
		if(grey && this.nav.style.color != "rgb(153, 153, 153)")
		{
			this.divM.style.borderColor = "#666";
			this.nav.style.color = "#666";
			
			for(var i = 0; i < 3; i++)
				this.navbut[i].style.color = "#666";
		}else if(!grey && this.nav.style.color != "rgb(255, 255, 255)")
		{
			this.divM.style.borderColor = "#fff";
			this.nav.style.color = "#fff";
			
			for(var i = 0; i < 3; i++)
				this.navbut[i].style.color = "#fff";
		}

	},
	navShowBorder : function(show){
		if(show)
		{
			this.nav.style.borderBottom = "1rem solid #F8F8F8";
			this.nav.style.backgroundColor = "#fff";
		}

		else
		{
			this.nav.style.borderBottom = "none";
			this.nav.style.backgroundColor = "";
		}
	},
	scroll : function(e){

		var s = this.getScrollTop();

		if(!(s < this.page2Top - 100 || s > this.page3Top + 100))
			this.changeNavColor(true);
		else
			this.changeNavColor(false);
		if(!(s < this.page2Top || s > this.page3Top ))
			this.navShowBorder(true);
		else
			this.navShowBorder(false);
		if(s < this.page2Top && this.divM.style.left != '0rem')
			this.divM.style.left = '0rem';
		else if(s > this.page2Top && s < this.page3Top && this.divM.style.left != '5rem')
			this.divM.style.left = '5rem';
		else if(s > this.page3Top &&  this.divM.style.left != '10rem')
			this.divM.style.left = '10rem';
		if(s > this.page2Top - 200 && s < this.page2Top * 2 - 300 && this.secp1[0].style.marginRight != '0rem')
		{

			for(var i = 0; i < 3; i++)
				this.secp1[i].style.marginRight = '0rem';
			for(var i = 3; i < 5; i++)
		        this.secp1[i].style.marginLeft = '0rem';
		}else if(!(s > this.page2Top - 200 && s < this.page2Top * 2 - 300) && this.secp1[0].style.marginRight === '0rem')
		{
			for(var i = 0; i < 3; i++)
				this.secp1[i].style.marginRight = '100rem';
			for(var i = 3; i < 5; i++)
				this.secp1[i].style.marginLeft = '100rem';
		}
		if(s - this.olds >= 10 || this.olds - s >= 10)
		{
			this.fixedEyes();
			if(s <= this.endTop)
			{
				// this.hou.style.top = -130 + s * (130 / this.endTop) + 'px';
				// this.jingu.style.top = -180 + s * (180 / this.endTop) + 'px';
				// this.eyes1.style.top = 128 + s * (130 / this.endTop) + 'px';
				// this.eyes2.style.top = 128 + s * (130 / this.endTop) + 'px';
				Canvas.draw([
				{
					boardName : "hou",
					y : 50 + s * (130 / this.endTop)
				},
				{
					boardName : "jingu",
					y : 20 + s * (180 / this.endTop)
				}
				]);
			
				
			}
			else
			{
				// this.hou.style.top = '0px';
				// this.jingu.style.top = '0px';
				// this.eyes1.style.top = '258px';
				// this.eyes2.style.top = '258px';
				Canvas.draw([
				{
					boardName : "hou",
					y : 180
				},
				{
					boardName : "jingu",
					y : 200
				}
				]);
		
			}
			if(s > this.olds)
				this.nav.style.marginTop = "-3rem";
			else
				this.nav.style.marginTop = "0rem";


			this.olds = s;
		}

	},
	eyesC : function(s,rl){
		var eye = {};
		if(rl)
			eye.cx = 63;
		else
			eye.cx = 134;
		eye.cy = s <= this.endTop ? 128+s*(130/this.endTop) : 258;
		eye.x = eye.cx + this.canvas.offsetLeft;
		eye.y = this.canvas.offsetTop-s + eye.cy;
		return eye;
	},
	inC : function(mx,my,cx,cy)
	{
		if((mx - cx)*(mx - cx) + (my - cy) * (my - cy) <= 15*15)
			return true;
		else
			return false;
	},
	setEyes : function(eye,mx,my){
		var x,y;
		if(this.inC(mx,my,eye.x,eye.y))
		{
			x = mx - eye.x + eye.cx;
			y = my - eye.y + eye.cy;
		}
		else
		{
			var math = (Math.sqrt((mx - eye.x)*(mx - eye.x)+(my - eye.y) * (my - eye.y)))
			x = eye.x + 15 * ((mx - eye.x) / math);
			y = eye.y + 15 * ((my - eye.y) / math);
			x = x - eye.x + eye.cx;
			y = y - eye.y + eye.cy;
		}
		return {x : x, y : y};
	},
	fixedEyes : function(mx,my){
		var s = this.getScrollTop();
		if(!mx || !my)
		{
			Canvas.draw([
			{
				boardName : "eye1",
				y : s <= this.endTop ? 128 + s * (130 / this.endTop) : 258
			},
			{
				boardName : "eye2",
				y : s <= this.endTop ? 128 + s * (130 / this.endTop) : 258
			}
			]);
			return;
		}
		var eyeL = this.eyesC(s,true);
		var eyeR = this.eyesC(s,false);
		var setL = this.setEyes(eyeL,mx,my);
		var setR = this.setEyes(eyeR,mx,my);
		Canvas.draw([
		{
			boardName : "eye1",
			x : setL.x,
			y : setL.y
		},
		{
			boardName : "eye2",
			x : setR.x,
			y : setR.y
		}
		]);
			
	}



}

window.onload = MonkeyAnimate.init.bind(MonkeyAnimate);





// document.getElementById('page1').onmousemove = function(e)
// {
// 	e = e || window.event;
// 	console.log('x : ' + e.clientX + ' ; y : ' + e.clientY);
// }

// console.log('canvas x : ' + (this.canvas.offsetLeft+63) + ' ; y : ' + (this.canvas.offsetTop-s + 128+s * (130 / this.endTop)));

