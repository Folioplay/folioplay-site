(this.webpackJsonpfolioplay=this.webpackJsonpfolioplay||[]).push([[16],{1626:function(e,n){},1937:function(e,n,t){"use strict";t.r(n),t.d(n,"OpenloginAdapter",(function(){return w})),t.d(n,"getOpenloginDefaultOptions",(function(){return N}));var i=t(9),r=t(6),a=t(7),o=t(12),c=t(45),s=t(40),p=t(10),h=t(11),l=t(1),u=t.n(l),g=t(261),d=t(14),f=t(20),v=t.n(f),O=t(1664),b=t(187),C=t.n(b),N=function(e,n){return{adapterSettings:{network:g.b.MAINNET,clientId:"",uxMode:g.d.POPUP},chainConfig:e?Object(d.n)(e,n):null,loginSettings:{}}};function y(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,i)}return t}function k(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?y(Object(t),!0).forEach((function(n){v()(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):y(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}var w=function(e){Object(p.a)(l,e);var n=Object(h.a)(l);function l(e){var t,i,a,c;Object(r.a)(this,l),t=n.call(this),v()(Object(o.a)(t),"name",d.j.OPENLOGIN),v()(Object(o.a)(t),"adapterNamespace",d.c.MULTICHAIN),v()(Object(o.a)(t),"type",d.a.IN_APP),v()(Object(o.a)(t),"openloginInstance",null),v()(Object(o.a)(t),"status",d.d.NOT_READY),v()(Object(o.a)(t),"currentChainNamespace",d.g.EIP155),v()(Object(o.a)(t),"openloginOptions",void 0),v()(Object(o.a)(t),"loginSettings",{}),v()(Object(o.a)(t),"privKeyProvider",null),d.p.debug("const openlogin adapter",e);var s=N(null===(i=e.chainConfig)||void 0===i?void 0:i.chainNamespace,null===(a=e.chainConfig)||void 0===a?void 0:a.chainId);if(t.openloginOptions=k(k({clientId:"",network:g.b.MAINNET},s.adapterSettings),e.adapterSettings||{}),t.loginSettings=k(k({},s.loginSettings),e.loginSettings),null!==(c=e.chainConfig)&&void 0!==c&&c.chainNamespace&&e.chainConfig.chainNamespace!==d.g.OTHER){var p;t.currentChainNamespace=null===(p=e.chainConfig)||void 0===p?void 0:p.chainNamespace;var h=s.chainConfig?s.chainConfig:{};if(t.chainConfig=k(k({},h),null===e||void 0===e?void 0:e.chainConfig),d.p.debug("const openlogin chainConfig",t.chainConfig),!t.chainConfig.rpcTarget)throw d.k.invalidParams("rpcTarget is required in chainConfig")}return t}return Object(a.a)(l,[{key:"chainConfigProxy",get:function(){return this.chainConfig?k({},this.chainConfig):null}},{key:"provider",get:function(){var e;return(null===(e=this.privKeyProvider)||void 0===e?void 0:e.provider)||null},set:function(e){throw new Error("Not implemented")}},{key:"init",value:function(){var e=Object(i.a)(u.a.mark((function e(n){var t,i,r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(Object(c.a)(Object(s.a)(l.prototype),"checkInitializationRequirements",this).call(this),null!==(t=this.openloginOptions)&&void 0!==t&&t.clientId){e.next=3;break}throw d.k.invalidParams("clientId is required before openlogin's initialization");case 3:if(this.chainConfig||this.currentChainNamespace===d.g.OTHER){e.next=5;break}throw d.k.invalidParams("chainConfig is required before initialization");case 5:return i=!1,this.openloginOptions.uxMode===g.d.REDIRECT&&(r=Object(g.f)(),Object.keys(r).length>0&&r._pid&&(i=!0)),this.openloginOptions=k(k({},this.openloginOptions),{},{replaceUrlOnRedirect:i}),this.openloginInstance=new g.e(this.openloginOptions),d.p.debug("initializing openlogin adapter init"),e.next=12,this.openloginInstance.init();case 12:if(this.status=d.d.READY,this.emit(d.b.READY,d.j.OPENLOGIN),e.prev=14,d.p.debug("initializing openlogin adapter"),!this.openloginInstance.privKey||!n.autoConnect&&!i){e.next=19;break}return e.next=19,this.connect();case 19:e.next=25;break;case 21:e.prev=21,e.t0=e.catch(14),d.p.error("Failed to connect with cached openlogin provider",e.t0),this.emit("ERRORED",e.t0);case 25:case"end":return e.stop()}}),e,this,[[14,21]])})));return function(n){return e.apply(this,arguments)}}()},{key:"connect",value:function(){var e=Object(i.a)(u.a.mark((function e(n){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return Object(c.a)(Object(s.a)(l.prototype),"checkConnectionRequirements",this).call(this),this.status=d.d.CONNECTING,this.emit(d.b.CONNECTING,k(k({},n),{},{adapter:d.j.OPENLOGIN})),e.prev=3,e.next=6,this.connectWithProvider(n);case 6:return e.abrupt("return",this.provider);case 9:if(e.prev=9,e.t0=e.catch(3),d.p.error("Failed to connect with openlogin provider",e.t0),this.status=d.d.READY,this.emit(d.b.ERRORED,e.t0),null===e.t0||void 0===e.t0||!e.t0.message.includes("user closed popup")){e.next=16;break}throw d.l.popupClosed();case 16:throw d.l.connectionError("Failed to login with openlogin");case 17:case"end":return e.stop()}}),e,this,[[3,9]])})));return function(n){return e.apply(this,arguments)}}()},{key:"disconnect",value:function(){var e=Object(i.a)(u.a.mark((function e(){var n,t=arguments;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.length>0&&void 0!==t[0]?t[0]:{cleanup:!1},this.status===d.d.CONNECTED){e.next=3;break}throw d.l.notConnectedError("Not connected with wallet");case 3:if(this.openloginInstance){e.next=5;break}throw d.k.notReady("openloginInstance is not ready");case 5:return e.next=7,this.openloginInstance.logout();case 7:n.cleanup?(this.status=d.d.NOT_READY,this.openloginInstance=null,this.privKeyProvider=null):this.status=d.d.READY,this.emit(d.b.DISCONNECTED);case 9:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"getUserInfo",value:function(){var e=Object(i.a)(u.a.mark((function e(){var n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this.status===d.d.CONNECTED){e.next=2;break}throw d.l.notConnectedError("Not connected with wallet");case 2:if(this.openloginInstance){e.next=4;break}throw d.k.notReady("openloginInstance is not ready");case 4:return e.next=6,this.openloginInstance.getUserInfo();case 6:return n=e.sent,e.abrupt("return",n);case 8:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"setAdapterSettings",value:function(e){if(this.status!==d.d.READY){var n=N();this.openloginOptions=k(k(k({},n.adapterSettings),this.openloginOptions||{}),e)}}},{key:"setChainConfig",value:function(e){Object(c.a)(Object(s.a)(l.prototype),"setChainConfig",this).call(this,e),this.currentChainNamespace=e.chainNamespace}},{key:"connectWithProvider",value:function(){var e=Object(i.a)(u.a.mark((function e(n){var i,r,a,o,c,s,p,h;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this.chainConfig){e.next=2;break}throw d.k.invalidParams("chainConfig is required before initialization");case 2:if(this.openloginInstance){e.next=4;break}throw d.k.notReady("openloginInstance is not ready");case 4:if(this.currentChainNamespace!==d.g.SOLANA){e.next=12;break}return e.next=7,Promise.all([t.e(1),t.e(2),t.e(14)]).then(t.bind(null,1663));case 7:i=e.sent,r=i.SolanaPrivateKeyProvider,this.privKeyProvider=new r({config:{chainConfig:this.chainConfig}}),e.next=25;break;case 12:if(this.currentChainNamespace!==d.g.EIP155){e.next=20;break}return e.next=15,Promise.all([t.e(3),t.e(13)]).then(t.bind(null,1715));case 15:a=e.sent,o=a.EthereumPrivateKeyProvider,this.privKeyProvider=new o({config:{chainConfig:this.chainConfig}}),e.next=25;break;case 20:if(this.currentChainNamespace!==d.g.OTHER){e.next=24;break}this.privKeyProvider=new O.b,e.next=25;break;case 24:throw new Error("Invalid chainNamespace: ".concat(this.currentChainNamespace," found while connecting to wallet"));case 25:if(this.openloginInstance.privKey||!n){e.next=29;break}return this.loginSettings.curve||(this.loginSettings.curve=this.currentChainNamespace===d.g.SOLANA?g.c.ED25519:g.c.SECP256K1),e.next=29,this.openloginInstance.login(C()(this.loginSettings,{loginProvider:n.loginProvider},{extraLoginOptions:k(k({},n.extraLoginOptions||{}),{},{login_hint:n.login_hint||(null===(c=n.extraLoginOptions)||void 0===c?void 0:c.login_hint)})}));case 29:if(!(s=this.openloginInstance.privKey)){e.next=41;break}if(this.currentChainNamespace!==d.g.SOLANA){e.next=37;break}return e.next=34,Promise.all([t.e(1),t.e(15)]).then(t.bind(null,1926));case 34:p=e.sent,h=p.getED25519Key,s=h(s).sk.toString("hex");case 37:return e.next=39,this.privKeyProvider.setupProvider(s);case 39:this.status=d.d.CONNECTED,this.emit(d.b.CONNECTED,{adapter:d.j.OPENLOGIN,reconnected:!n});case 41:case"end":return e.stop()}}),e,this)})));return function(n){return e.apply(this,arguments)}}()}]),l}(d.e)}}]);
//# sourceMappingURL=16.20b6a80e.chunk.js.map