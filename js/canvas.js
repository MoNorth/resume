var a = new function(){
	var i = 0;
	var bodyShow = function(){
		document.getElementById('css3Animate').style.display = "none";
		document.body.style.overflow = "visible";
	}
	this.add = function(){
		i++;
		if(i >= 4)
			bodyShow();
	}
}




var ImageBoard = function(src,w,h,x,y){
	this.src = src;
	this.w = w;
	this.h = h;
	this.x = x;
	this.y = y;
	this.img = {};
	this.oldx = x;
	this.oldy = y;
}
ImageBoard.prototype.draw = function(ctx,x,y,canDraw)
{
	// console.log("draw " + x + "  " + y);
	var xy;
	if(!canDraw || !(xy = canDraw(x,y)))
	{
		ctx.drawImage(this.img, x || this.oldx, y || this.oldy, this.w,this.h);
	}
	else
		ctx.drawImage(this.img, xy.x, xy.y, this.w,this.h);
};
ImageBoard.prototype.init = function(ctx)
{
	this.load(function(){
		a.add();
		this.draw(ctx);
	}.bind(this));
};
ImageBoard.prototype.load = function(callback){
	this.img = new Image();
	this.img.onload = callback;
	this.img.src = this.src;
};




var Canvas = {
	canvas : {},
	ctx : {},
	height : "",
	width : "",
	ctx : {},
	img : {},
	canDrawFuns : {},
	init : function(){
		this.canvas = document.getElementById('mycanvas');
		this.width = this.canvas.width;
		this.height = this.canvas.height;
		this.ctx = this.canvas.getContext && this.canvas.getContext('2d');
		if(!this.ctx)
			return alert("动画不支持");//加载图片
		for(var i in this.img)
		{
			this.img[i].init(this.ctx);
		}
	},
	add : function(boardName,board,canDrawFun){
		this.img[boardName] = board;
		this.canDrawFuns[boardName] = canDrawFun;
	},
	canClear : function(boardName){
		var clear = false;
		for(var i in boardName)
		{
			if(boardName[i].x)
				if(boardName[i].x != this.img[boardName[i].boardName].oldx)
				{
					clear = true;
					this.img[boardName[i].boardName].oldx = boardName[i].x;
				}
			if(boardName[i].y)
				if(boardName[i].y != this.img[boardName[i].boardName].oldy)
				{
					clear = true;
					this.img[boardName[i].boardName].oldy = boardName[i].y;
				}
		}
		return clear;
	},
	draw : function(boardName){
		if(this.canClear(boardName))
		{
			this.ctx.clearRect(0,0,this.width,this.height);
			for(var i in this.img)
			{
				this.img[i].draw(this.ctx,this.img[i].oldx,this.img[i].oldy,this.canDrawFuns[i]);
			}
		}	
	}
}

Canvas.add("hou", new ImageBoard("img/hou1.png",200,274,0,50), function(x,y){
	return null
});
Canvas.add("jingu", new ImageBoard("img/jingu.png",113,16,43.5,20), function(x,y){
	return null
});
Canvas.add("eye1", new ImageBoard("img/eyes.png",7,11,63,128), function(x,y){
	return null
});
Canvas.add("eye2", new ImageBoard("img/eyes.png",7,11,134,128), function(x,y){
	return null
});

