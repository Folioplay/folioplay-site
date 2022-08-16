(this.webpackJsonpfolioplay=this.webpackJsonpfolioplay||[]).push([[9,12],{1737:function(t,e){},1794:function(t,e){},1798:function(t,e){},1800:function(t,e){},1802:function(t,e){},1975:function(t,e,n){"use strict";n.r(e),n.d(e,"WalletConnectV1Adapter",(function(){return g}));var r=n(0),a=n(12),i=n(5),c=n(6),o=n(11),s=n(41),u=n(35),h=n(9),d=n(10),p=n(21),l=n.n(p),f=n(751),b=n(15),v=n(1791),w=[{name:"Rainbow",chains:[b.g.EIP155],logo:"https://images.web3auth.io/login-rainbow.svg",mobile:{native:"rainbow:",universal:"https://rnbwapp.com"},desktop:{native:"",universal:""}},{name:"MetaMask",chains:[b.g.EIP155],logo:"https://images.web3auth.io/login-metamask.svg",mobile:{native:"metamask:",universal:"https://metamask.app.link"},desktop:{native:"",universal:""}}];function O(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function k(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?O(Object(n),!0).forEach((function(e){l()(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):O(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var g=function(t){Object(h.a)(n,t);var e=Object(d.a)(n);function n(){var t;Object(i.a)(this,n);var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return t=e.call(this),l()(Object(o.a)(t),"name",b.j.WALLET_CONNECT_V1),l()(Object(o.a)(t),"adapterNamespace",b.c.EIP155),l()(Object(o.a)(t),"currentChainNamespace",b.g.EIP155),l()(Object(o.a)(t),"type",b.a.EXTERNAL),l()(Object(o.a)(t),"adapterOptions",void 0),l()(Object(o.a)(t),"status",b.d.NOT_READY),l()(Object(o.a)(t),"adapterData",{uri:"",extensionAdapters:w}),l()(Object(o.a)(t),"connector",null),l()(Object(o.a)(t),"wcProvider",null),l()(Object(o.a)(t),"rehydrated",!1),t.adapterOptions=k({},r),t.chainConfig=r.chainConfig||null,t}return Object(c.a)(n,[{key:"connected",get:function(){var t;return!(null===(t=this.connector)||void 0===t||!t.connected)}},{key:"provider",get:function(){var t;return(null===(t=this.wcProvider)||void 0===t?void 0:t.provider)||null},set:function(t){throw new Error("Not implemented")}},{key:"init",value:function(){var t=Object(a.a)(Object(r.a)().mark((function t(){return Object(r.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(Object(s.a)(Object(u.a)(n.prototype),"checkInitializationRequirements",this).call(this),this.chainConfig||(this.chainConfig=Object(b.n)(b.g.EIP155,1)),this.connector=this.getWalletConnectInstance(),this.wcProvider=new v.WalletConnectProvider({config:{chainConfig:this.chainConfig},connector:this.connector}),this.emit(b.b.READY,b.j.WALLET_CONNECT_V1),this.status=b.d.READY,b.p.debug("initializing wallet connect v1 adapter"),!this.connector.connected){t.next=11;break}return this.rehydrated=!0,t.next=11,this.onConnectHandler({accounts:this.connector.accounts,chainId:this.connector.chainId});case 11:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"connect",value:function(){var t=Object(a.a)(Object(r.a)().mark((function t(){var e,i,c=this;return Object(r.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(Object(s.a)(Object(u.a)(n.prototype),"checkConnectionRequirements",this).call(this),this.connector){t.next=3;break}throw b.k.notReady("Wallet adapter is not ready yet");case 3:if(!this.connected){t.next=7;break}return t.next=6,this.onConnectHandler({accounts:this.connector.accounts,chainId:this.connector.chainId});case 6:return t.abrupt("return",this.provider);case 7:if(this.status===b.d.CONNECTING){t.next=13;break}return null!==(e=this.adapterOptions.adapterSettings)&&void 0!==e&&e.qrcodeModal&&(this.connector=this.getWalletConnectInstance(),this.wcProvider=new v.WalletConnectProvider({config:{chainConfig:this.chainConfig,skipLookupNetwork:null===(i=this.adapterOptions.adapterSettings)||void 0===i?void 0:i.skipNetworkSwitching},connector:this.connector})),t.next=11,this.createNewSession();case 11:this.status=b.d.CONNECTING,this.emit(b.b.CONNECTING,{adapter:b.j.WALLET_CONNECT_V1});case 13:return t.abrupt("return",new Promise((function(t,e){if(!c.connector)return e(b.k.notReady("Wallet adapter is not ready yet"));c.connector.on("modal_closed",Object(a.a)(Object(r.a)().mark((function t(){return Object(r.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return c.status=b.d.READY,c.emit(b.b.READY,b.j.WALLET_CONNECT_V1),t.abrupt("return",e(new Error("User closed modal")));case 3:case"end":return t.stop()}}),t)}))));try{c.connector.on("connect",function(){var e=Object(a.a)(Object(r.a)().mark((function e(n,a){return Object(r.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n&&c.emit(b.b.ERRORED,n),b.p.debug("connected event emitted by web3auth"),e.next=4,c.onConnectHandler(a.params[0]);case 4:return e.abrupt("return",t(c.provider));case 5:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}())}catch(n){b.p.error("Wallet connect v1 adapter error while connecting",n),c.status=b.d.READY,c.rehydrated=!0,c.emit(b.b.ERRORED,n),e(n instanceof b.m?n:b.l.connectionError("Failed to login with wallet connect: ".concat((null===n||void 0===n?void 0:n.message)||"")))}})));case 14:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"getUserInfo",value:function(){var t=Object(a.a)(Object(r.a)().mark((function t(){return Object(r.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(this.connected){t.next=2;break}throw b.l.notConnectedError("Not connected with wallet, Please login/connect first");case 2:return t.abrupt("return",{});case 3:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"disconnect",value:function(){var t=Object(a.a)(Object(r.a)().mark((function t(){var e,n,a=arguments;return Object(r.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e=a.length>0&&void 0!==a[0]?a[0]:{cleanup:!1},n=e.cleanup,this.connector&&this.connected){t.next=4;break}throw b.l.notConnectedError("Not connected with wallet");case 4:return t.next=6,this.connector.killSession();case 6:this.rehydrated=!1,n?(this.connector=null,this.status=b.d.NOT_READY,this.wcProvider=null):this.status=b.d.READY,this.emit(b.b.DISCONNECTED);case 9:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"addChain",value:function(){var t=Object(a.a)(Object(r.a)().mark((function t(e){var n,a;return Object(r.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,this.wcProvider){t.next=3;break}throw b.k.notReady("Wallet adapter is not ready yet");case 3:if(!(a=null===(n=this.adapterOptions.adapterSettings)||void 0===n?void 0:n.networkSwitchModal)){t.next=7;break}return t.next=7,a.addNetwork({chainConfig:e,appOrigin:window.location.hostname});case 7:return t.next=9,this.wcProvider.addChain(e);case 9:t.next=14;break;case 11:t.prev=11,t.t0=t.catch(0),b.p.error(t.t0);case 14:case"end":return t.stop()}}),t,this,[[0,11]])})));return function(e){return t.apply(this,arguments)}}()},{key:"switchChain",value:function(){var t=Object(a.a)(Object(r.a)().mark((function t(e,n){var a,i;return Object(r.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(this.wcProvider){t.next=2;break}throw b.k.notReady("Wallet adapter is not ready yet");case 2:if(!(i=null===(a=this.adapterOptions.adapterSettings)||void 0===a?void 0:a.networkSwitchModal)){t.next=6;break}return t.next=6,i.switchNetwork({currentChainConfig:n,newChainConfig:e,appOrigin:window.location.hostname});case 6:return t.next=8,this.wcProvider.switchChain({chainId:n.chainId,lookup:!1,addChain:!1});case 8:case"end":return t.stop()}}),t,this)})));return function(e,n){return t.apply(this,arguments)}}()},{key:"createNewSession",value:function(){var t=Object(a.a)(Object(r.a)().mark((function t(){var e,n,i,c,o=this,s=arguments;return Object(r.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(i=s.length>0&&void 0!==s[0]?s[0]:{forceNewSession:!1},this.connector){t.next=3;break}throw b.k.notReady("Wallet adapter is not ready yet");case 3:if(!i.forceNewSession||!this.connector.pending){t.next=6;break}return t.next=6,this.connector.killSession();case 6:if(null===(e=this.adapterOptions)||void 0===e||null===(n=e.adapterSettings)||void 0===n||!n.qrcodeModal){t.next=10;break}return t.next=9,this.connector.createSession({chainId:parseInt((null===(c=this.chainConfig)||void 0===c?void 0:c.chainId)||"0x1",16)});case 9:return t.abrupt("return");case 10:return t.abrupt("return",new Promise((function(t,e){var n;if(!o.connector)return e(b.k.notReady("Wallet adapter is not ready yet"));b.p.debug("creating new session for web3auth wallet connect"),o.connector.on("display_uri",function(){var n=Object(a.a)(Object(r.a)().mark((function n(a,i){var c,s;return Object(r.a)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!a){n.next=3;break}return o.emit(b.b.ERRORED,b.l.connectionError("Failed to display wallet connect qr code")),n.abrupt("return",e(a));case 3:return s=i.params[0],o.updateAdapterData({uri:s,extensionAdapters:w}),null===(c=o.connector)||void 0===c||c.off("display_uri"),n.abrupt("return",t());case 7:case"end":return n.stop()}}),n)})));return function(t,e){return n.apply(this,arguments)}}()),o.connector.createSession({chainId:parseInt((null===(n=o.chainConfig)||void 0===n?void 0:n.chainId)||"0x1",16)}).catch((function(t){return b.p.error("error while creating new wallet connect session",t),o.emit(b.b.ERRORED,t),e(t)}))})));case 11:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"onConnectHandler",value:function(){var t=Object(a.a)(Object(r.a)().mark((function t(e){var n,a,i,c,o,s;return Object(r.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(this.connector&&this.wcProvider){t.next=2;break}throw b.k.notReady("Wallet adapter is not ready yet");case 2:if(this.chainConfig){t.next=4;break}throw b.k.invalidParams("Chain config is not set");case 4:if(n=e.chainId,b.p.debug("connected chainId in hex"),n===parseInt(this.chainConfig.chainId,16)){t.next=27;break}if(o=Object(b.n)(b.g.EIP155,n)||{chainId:"0x".concat(n.toString(16)),displayName:"Unknown Network"},(s=null===(a=this.adapterOptions.adapterSettings)||void 0===a?void 0:a.qrcodeModal)&&(!s||null!==(i=this.adapterOptions)&&void 0!==i&&null!==(c=i.adapterSettings)&&void 0!==c&&c.skipNetworkSwitching)){t.next=27;break}return t.prev=10,t.next=13,this.addChain(this.chainConfig);case 13:return t.next=15,this.switchChain(o,this.chainConfig);case 15:this.connector=this.getWalletConnectInstance(),t.next=27;break;case 18:return t.prev=18,t.t0=t.catch(10),b.p.error("error while chain switching",t.t0),t.next=23,this.createNewSession({forceNewSession:!0});case 23:return this.emit(b.b.ERRORED,b.k.fromCode(5e3,"Not connected to correct network. Expected: ".concat(this.chainConfig.displayName,", Current: ").concat((null===o||void 0===o?void 0:o.displayName)||n,", Please switch to correct network from wallet"))),this.status=b.d.READY,this.rehydrated=!0,t.abrupt("return");case 27:return t.next=29,this.wcProvider.setupProvider(this.connector);case 29:this.subscribeEvents(this.connector),this.status=b.d.CONNECTED,this.emit(b.b.CONNECTED,{adapter:b.j.WALLET_CONNECT_V1,reconnected:this.rehydrated});case 32:case"end":return t.stop()}}),t,this,[[10,18]])})));return function(e){return t.apply(this,arguments)}}()},{key:"subscribeEvents",value:function(t){var e=this;t.on("session_update",function(){var t=Object(a.a)(Object(r.a)().mark((function t(n){return Object(r.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n&&e.emit(b.b.ERRORED,n);case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}},{key:"getWalletConnectInstance",value:function(){var t=this.adapterOptions.adapterSettings||{};return t.bridge=t.bridge||"https://bridge.walletconnect.org",new f.a(t)}}]),n}(b.e)}}]);
//# sourceMappingURL=9.c0697e45.chunk.js.map