/*
	The provided code uses Chaport as the chat fallback. If you would like to use
		another service, simply replace the default export with the function your
		service provider suggests as an "embed code". Then replace the triggerChat
		function with a function that opens the chat to a new conversation.
*/
import { variables } from '$lib/variables';

export function triggerChat() {
	window.chaport.on('ready', function () {
		window.chaport.open();
	});
}

export function init(w, d, v3) {
	w.chaportConfig = {
			appId: variables.chaport_appId, // Provided by your environment variables
			launcher: {
					show: false
			}
	};

	if (variables.chaport_show_onload) { // Provided by your environment variables
			w.chaportConfig.launcher.show = true
	}

	if (w.chaport) return;
	v3 = w.chaport = {};
	v3._q = [];
	v3._l = {};
	v3.q = function () {
			v3._q.push(arguments);
	};
	v3.on = function (e, fn) {
			if (!v3._l[e]) v3._l[e] = [];
			v3._l[e].push(fn);
	};
	var s = d.createElement('script');
	s.type = 'text/javascript';
	s.async = true;
	s.src = 'https://app.chaport.com/javascripts/insert.js';
	var ss = d.getElementsByTagName('script')[0];
	ss.parentNode.insertBefore(s, ss);
}(window, document);