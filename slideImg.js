function base(){};
base.prototype = {

}

var slideImg = function(){};
slideImg.prototype = {
	ul:null,
	outerWrap:null,
	picsWrap:null,
	controllerWrap:null,
	pic_lis:null,
    pointer_spans:null,
    toPrevSpan:null,
    toNextSpan:null,
    current_num: 0,
    last_num:0,
    slideLength: 0,
    timer:null,
	data:{},
	animate: function(obj,json,fn,speed){
		var $this = this;
		clearInterval(obj.timer);
	    obj.timer = setInterval(function() {
	        var flag = true;  
	        for(var attr in json){   
	            var current = 0;
	            if(attr == "opacity"){
	                current = Math.round(parseInt($this.getStyle(obj,attr)*100)) || 0;
	            }else{
	                current = parseInt($this.getStyle(obj,attr)); 
	            }
	            var step = ( json[attr] - current) / 10;  
	            step = step > 0 ? Math.ceil(step) : Math.floor(step);
	            if(attr == "opacity"){
	                if("opacity" in obj.style){
	                    obj.style.opacity = (current + step) /100;
	                }else{  
	                    obj.style.filter = "alpha(opacity = "+(current + step)* 10+")";
	                }
	            }else if(attr == "zIndex"){
	                obj.style.zIndex = json[attr];
	            }else{
	                obj.style[attr] = current  + step + "px" ;
	            }
	            if(current != json[attr]){
	                flag =  false;
	            }
	        }
	        if(flag){
	            clearInterval(obj.timer);
	            if(fn){
	              fn(); 
	            }
	        }
	    },speed)
	},
	getStyle: function(obj,attr){
		if(obj.currentStyle){
	        return obj.currentStyle[attr];
	    }
	    else{
	        return window.getComputedStyle(obj,null)[attr];  
	    }
	},
	cleanSelection: function(){
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
    },
    setDefauleParam:function(){
    	if(!this.data.picSrc || this.data.picSrc.length == 0){
    		alert('请设置图片链接');
    	}
    	this.data.playSpeed = this.data.playSpeed?this.data.playSpeed:2000;
    },
	createDoms: function(id){
		var module = document.getElementById(id);
		var template = '';
		template += '<div class="slideImg-outerwarp">';
		template += '<div class="slideImg-picswrap">';  	
		template += '<ul></ul>'; 
		template += '</div>'; 
		template += '<div class="slideImg-controllerwrap">'; 
		template += '</div>';
		template += '</div>';
		module.innerHTML = template;  
	},
	createPic_li:function(obj){	
		for (var i = 0; i < this.data.picSrc.length; i++){
			var li = document.createElement('li');
			var str = '';
			if(this.data.picHref[i]){
				str += '<a href="'+this.data.picHref[i]+'" target="_blank">';
			}
			else{
				str += '<a href="javascript:;">';
			}
			str += '<img src="'+this.data.picSrc[i]+'" alt="">';
			str += '</a>';
			li.innerHTML = str;
			obj.appendChild(li);
		}
	},
	createPic_pointer(obj){	
		for (var i = 0; i <= this.data.picSrc.length + 1; i++){
			var span = document.createElement('span');
			if(i == 0){
				span.className = 'sliderImg-toprev';
				span.innerHTML =  '<';
				this.toPrevSpan = span;
			}
			else if(i == this.data.picSrc.length + 1){
				span.className = 'sliderImg-tonext';
				span.innerHTML =  '>';
				this.toNextSpan = span;
			}
			else{
				span.className = i==1?'sliderImg-dot dot-active':'sliderImg-dot';
			    span.innerHTML = i - 1;
			}
			obj.appendChild(span);
		}
	},
	setDomsSize:function(){
		var imgs = this.ul.getElementsByTagName('img');
		for (var i = 0; i < imgs.length; i++) {
			imgs[i].style.width = this.data.picWidth + 'px';
    		imgs[i].style.height = this.data.picHeight + 'px';
		}
		this.outerWrap.style.width = this.data.picWidth + 'px';
    	this.outerWrap.style.Height = this.data.picHeight +'px';
    	this.picsWrap.style.width = this.data.picWidth + 'px';
    	this.picsWrap.style.height = this.data.picHeight + 'px';
    	this.pic_lis[0].style.left = 0;
	},
	init:function(id){
		this.createDoms(id);
		this.setDefauleParam();
		this.ul = document.getElementById(id).getElementsByTagName('ul')[0];	
		this.createPic_li(this.ul);
		this.picsWrap = this.ul.parentNode;
		this.outerWrap = this.picsWrap.parentNode;
		this.controllerWrap = this.outerWrap.children[1];
		this.createPic_pointer(this.controllerWrap);
		this.pic_lis = this.ul.children;
		this.pointer_spans = this.controllerWrap.children;
		this.setDomsSize();	
		this.slideLength = this.outerWrap.clientWidth;
		this.last_num = this.pointer_spans.length - 3;
	},
	autoplay:function(){
		var $ = this;
        $.timer = setInterval(function(){
        	!$.toNext()();
        }, $.data.playSpeed); 
        $.pointerChange();
	},
	toPrev:function(){
		var $ = this;
		$.animate($.pic_lis[$.current_num],{left:$.slideLength},null,10);
		$.current_num--;
		$.current_num < 0 ?$.current_num = $.last_num : $.current_num;
		$.pic_lis[$.current_num].style.left = -$.slideLength + "px";
		$.animate($.pic_lis[$.current_num],{left:0},null,10);
		$.pointerChange();
	},
	toNext:function(){
		var $ = this;
		return function(){
			$.animate($.pic_lis[$.current_num],{left:-$.slideLength},null,10);
			$.current_num++;
			$.current_num > $.last_num?$.current_num = 0:$.current_num;
			$.pic_lis[$.current_num].style.left = $.slideLength+"px";
			$.animate($.pic_lis[$.current_num],{left:0},null,10);
			$.pointerChange();
		}
	},
	toClickTarget:function(num){
		var $ = this;
		if(num > $.current_num){
			$.animate($.pic_lis[$.current_num],{left:-$.slideLength},null,10);
			$.pic_lis[num].style.left = $.slideLength + "px";
		}
		else{
			$.animate($.pic_lis[$.current_num],{left:$.slideLength},null,10);
			$.pic_lis[num].style.left = -$.slideLength + "px";		
		}
			$.current_num = num;
			$.animate($.pic_lis[$.current_num],{left:0},null,10);
			$.pointerChange();
	},
	showToPN:function(){
		var $ = this;
		$.animate($.toPrevSpan,{opacity:80},null,50);
		$.animate($.toNextSpan,{opacity:80},null,50);
	},
	hideToPN:function(){
		var $ = this;
		$.animate($.toPrevSpan,{opacity:0},null,50);
		$.animate($.toNextSpan,{opacity:0},null,50);
	},
	pointerChange:function(){
		var $ = this;
		for(var i = 1;i < $.pointer_spans.length - 1; i++){
			$.pointer_spans[i].className = "sliderImg-dot";
		};
		$.pointer_spans[$.current_num+1].className = "sliderImg-dot dot-active";
	},
	clickEvent:function(){
		var $ = this;
		for(var k in $.pointer_spans){
			$.pointer_spans[k].onclick = function(){ 
			    $.cleanSelection() 
			    clearInterval($.timer);
				var that = parseInt(this.innerHTML);
				if(this.className == "sliderImg-tonext"){
					!$.toNext()();
				}
				else if(this.className == "sliderImg-toprev"){
					$.toPrev();
				}
				else{
					$.toClickTarget(that);
				}
			}
		}
	},
	mouseEvent:function(){
		var $ = this;
		$.outerWrap.onmouseover=function(){
			clearInterval($.timer);
			$.showToPN();
		}
		$.outerWrap.onmouseout=function(){
			$.autoplay();
			$.hideToPN();
		}
	},
	action:function(){
		this.autoplay();
		this.clickEvent();
		this.mouseEvent();
	}

};

