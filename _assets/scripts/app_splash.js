var splash = {
	loaded : function() {
		++splash.doneStages;
		
		bar.style.width = splash.doneStages / splash.stages * 100 + '%';
		
		if (splash.doneStages === splash.stages) {
			document.body.insertAdjacentHTML('beforeend', splash.body);
			
			componentHandler.upgradeDom();
			launchApp();
			window.onerror = '';
			
			setTimeout(function(){
				document.body.removeChild(splash.element);
				delete splash;
			}, 200);
		}
	},
	failed : function() {
		var fail = document.getElementById('fail');
		
		fail.style.display = 'none';
		fail.style.display = 'block';
	},
	element : document.getElementById('splash'),
	doneStages : 0,
	stages : 2,
	bar : document.getElementById('bar'),
},
cb = function(){
	var bodyReq, load = document.getElementById('load'),
	old = document.getElementById('old');
	
	try {
		eval('[].forEach.__proto__;class foo {}; fetch.__proto__;');
	} catch (e) {
		load.style.display = 'none';
		old.style.display = 'block';
		return;
	}
	
	var bodyReq = new XMLHttpRequest();
	
	bodyReq.onreadystatechange = function() {
		if (bodyReq.readyState === 4 && bodyReq.status === 200) {
			splash.body = bodyReq.responseText;
			splash.loaded();
		}
	}
	
	bodyReq.open("GET","/assets/app-body.html", true);
	bodyReq.send();
},
raf = requestAnimationFrame || mozRequestAnimationFrame || webkitRequestAnimationFrame || msRequestAnimationFrame;
window.onerror = splash.failed;
if (raf) raf(cb);
else window.addEventListener('load', cb);
