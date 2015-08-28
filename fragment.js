
	var web;
	
	function onCreateView(){
			Fragment.setHasOptionsMenu(true);
			Fragment.getMainActivity().getSupportActionBar().show();
			return web = Fragment.asWebPanel();
	}
	
	function onViewCreated(){
		Fragment.browsable(true);
		web.loadUrl("http://google.com");
	}
	
	function onBrowseSubmit(query){
		web.loadUrl(query);
	}
	
	function onRefresh(webview, url){
		web.reload();
		Fragment.openFragment("/a");
	}
	
	function onWebPageFinished(webview, url){
		var js = "(function(){															\
			function getScript(url, success) {	 										\
				if(window.jQuery != null){												\
					success();															\
					return;																\
				}																		\
				if( typeof url === 'string' ) {											\
					url = [ url ];														\
				}																		\
				var script, 															\
					head = document.getElementsByTagName('head')[0];					\
				for(var i = 0;i < url.length; i++){										\
					script = document.createElement('script');							\
					script.src = url[i];												\
					head.appendChild(script);											\
				}																		\
				var done = false;														\
				script.onload = script.onreadystatechange = function() {				\
					if (!done && (!this.readyState || this.readyState == 'loaded' 		\
								 || this.readyState == 'complete')) {					\
						done = true;													\
						success();														\
						script.onload = script.onreadystatechange = null;				\
						head.removeChild(script);										\
					}																	\
				};																		\
			}																			\
																						\
			getScript([	'http://code.jquery.com/jquery-latest.min.js', 					\
						'https://raw.githubusercontent.com/cowboy/jquery-replacetext/master/jquery.ba-replacetext.min.js'],\
						function() {													\
																						\
					Fragment.onWebCallback('jQuery ready');								\
					var regex = /a/gi;													\
					$('body *').contents()												\
						.filter(function(){												\
							return this.nodeType === 3;									\
						})																\
						.each(function(){												\
							$(this).html($(this).text().replace(regex, '<b>a</b>'));	\
						});																\
																						\
			});																			\
			return 'js executed';														\
		})()";
		
		Fragment.log(js);
		web.evaluateJavascript(js, function(s){Fragment.log(s)});
	}
