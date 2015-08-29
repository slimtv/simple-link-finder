
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
					var $ = jQuery;														\
					Fragment.onWebCallback('jQuery ready');								\
					var regex = /a/gi, replacer = '<b>a</b>';							\
																						\
					jQuery.fn.depth = function() {										\
    					var children = jQuery(this).children();							\
					    if (children.length === 0){										\
					        return 0;													\
					    }else{															\
					        var maxLength = 0;											\
					        children.each(function(){									\
					            maxLength = Math.max(jQuery(this).depth(), maxLength);	\
					        });															\
					        return 1 + maxLength;										\
					    }																\
					};																	\
																						\
					function inspect($node){											\
						if($node.nodeType && $node.nodeType === 3){						\
							var newVal = $node.nodeValue.replace(regex, replacer);		\
							$($node).before(newVal);									\
							$node.parentNode.removeChild($node);						\
						}																\
						else if($node[0].nodeType === 3){								\
							var newVal = $node[0].nodeValue.replace(regex, replacer);	\
							$node.before(newVal);										\
							$node.remove();												\
						}																\
						else{															\
							var newHtml = $node.html().replace(regex, replacer);		\
							$node.html(newHtml);										\
						}																\
					}																	\
																						\
					function crawl($node){												\
						var tag = $node.prop('tagName');								\
						if(['SCRIPT','STYLE'].indexOf(tag) != -1) return;				\
						/*if(tag == 'A') inspect($node);*/								\
						if($node[0].nodeType === 3) inspect($node);						\
						if($node.depth() == 0){ 										\
							inspect($node); 											\
							var nextSibling = $node[0].nextSibling;						\
							if(nextSibling && nextSibling.nodeType === 3)				\
								inspect(nextSibling);									\
							return;														\
						}																\
						$node.contents().each(function(){ crawl($(this)); });			\
					}																	\
					crawl($('body'));													\																						\
			});																			\
			return 'js executed';														\
		})()";
		
		Fragment.log(js);
		web.evaluateJavascript(js, function(s){Fragment.log(s)});
	}
