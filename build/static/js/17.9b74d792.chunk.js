(this.webpackJsonpfolioplay=this.webpackJsonpfolioplay||[]).push([[17],{1760:function(t,e,n){"use strict";n.d(e,"a",(function(){return x}));var r=n(47),i=n.n(r),a=n(60),o=n.n(a),c=n(61),s=n.n(c),u=n(45),h=n.n(u),d=n(68),l=n.n(d),p=n(155),f=n.n(p),v=n(93),w=n.n(v),k=n(26),b=n.n(k),g=n(3),y=n.n(g),m=n(19);function C(t){var e=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=w()(t);if(e){var i=w()(this).constructor;n=Reflect.construct(r,arguments,i)}else n=r.apply(this,arguments);return f()(this,n)}}var x=function(t){l()(n,t);var e=C(n);function n(){var t,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return o()(this,n),t=e.call(this),b()(h()(t),"clientId",void 0),t.clientId=r.clientId,t}return s()(n,[{key:"authenticateUser",value:function(){var t=i()(y.a.mark((function t(){var e,n,r,i,a,o,c,s,u,h;return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(this.provider&&null!==(e=this.chainConfig)&&void 0!==e&&e.chainId){t.next=2;break}throw m.l.notConnectedError();case 2:if(n=this.chainConfig,r=n.chainNamespace,i=n.chainId,this.status===m.d.CONNECTED){t.next=5;break}throw m.l.notConnectedError("Not connected with wallet, Please login/connect first");case 5:return t.next=7,this.provider.request({method:"eth_accounts"});case 7:if(!((a=t.sent)&&a.length>0)){t.next=26;break}if(!(o=Object(m.q)(a[0],this.name))){t.next=14;break}if(Object(m.n)(o)){t.next=14;break}return t.abrupt("return",{idToken:o});case 14:return c={domain:window.location.origin,uri:window.location.href,address:a[0],chainId:parseInt(i,16),version:"1",nonce:Math.random().toString(36).slice(2),issuedAt:(new Date).toISOString()},t.next=17,Object(m.u)(c,r);case 17:return s=t.sent,t.next=20,this.provider.request({method:"personal_sign",params:[s,a[0]]});case 20:return u=t.sent,t.next=23,Object(m.w)(r,u,s,this.name,this.sessionTime,this.clientId);case 23:return h=t.sent,Object(m.t)(a[0],this.name,h),t.abrupt("return",{idToken:h});case 26:throw m.l.notConnectedError("Not connected with wallet, Please login/connect first");case 27:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"disconnect",value:function(){var t=i()(y.a.mark((function t(){var e;return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(this.status===m.d.CONNECTED){t.next=2;break}throw m.l.disconnectionError("Not connected with wallet");case 2:return t.next=4,this.provider.request({method:"eth_accounts"});case 4:(e=t.sent)&&e.length>0&&Object(m.o)(e[0],this.name);case 6:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()}]),n}(m.e)},2005:function(t,e,n){"use strict";n.r(e),n.d(e,"WalletConnectV1Adapter",(function(){return S}));var r=n(47),i=n.n(r),a=n(60),o=n.n(a),c=n(61),s=n.n(c),u=n(45),h=n.n(u),d=n(364),l=n.n(d),p=n(68),f=n.n(p),v=n(155),w=n.n(v),k=n(93),b=n.n(k),g=n(26),y=n.n(g),m=n(3),C=n.n(m),x=n(785),E=n(19),O=n(1760),N=n(1836),R=[{name:"Rainbow",chains:[E.g.EIP155],logo:"https://images.web3auth.io/login-rainbow.svg",mobile:{native:"rainbow:",universal:"https://rnbwapp.com"},desktop:{native:"",universal:""}},{name:"MetaMask",chains:[E.g.EIP155],logo:"https://images.web3auth.io/login-metamask.svg",mobile:{native:"metamask:",universal:"https://metamask.app.link"},desktop:{native:"",universal:""}}];function I(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function P(t){var e=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=b()(t);if(e){var i=b()(this).constructor;n=Reflect.construct(r,arguments,i)}else n=r.apply(this,arguments);return w()(this,n)}}var S=function(t){f()(n,t);var e=P(n);function n(t){var r;return o()(this,n),r=e.call(this,t),y()(h()(r),"name",E.j.WALLET_CONNECT_V1),y()(h()(r),"adapterNamespace",E.c.EIP155),y()(h()(r),"currentChainNamespace",E.g.EIP155),y()(h()(r),"type",E.a.EXTERNAL),y()(h()(r),"adapterOptions",void 0),y()(h()(r),"status",E.d.NOT_READY),y()(h()(r),"adapterData",{uri:"",extensionAdapters:R}),y()(h()(r),"connector",null),y()(h()(r),"wcProvider",null),y()(h()(r),"rehydrated",!1),r.adapterOptions=function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?I(Object(n),!0).forEach((function(e){y()(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):I(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}({},t),r.chainConfig=t.chainConfig||null,r.sessionTime=t.sessionTime||86400,r}return s()(n,[{key:"connected",get:function(){var t;return!(null===(t=this.connector)||void 0===t||!t.connected)}},{key:"provider",get:function(){var t;return(null===(t=this.wcProvider)||void 0===t?void 0:t.provider)||null},set:function(t){throw new Error("Not implemented")}},{key:"init",value:function(){var t=i()(C.a.mark((function t(){return C.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(l()(b()(n.prototype),"checkInitializationRequirements",this).call(this),this.chainConfig||(this.chainConfig=Object(E.p)(E.g.EIP155,1)),this.connector=this.getWalletConnectInstance(),this.wcProvider=new N.WalletConnectProvider({config:{chainConfig:this.chainConfig},connector:this.connector}),this.emit(E.b.READY,E.j.WALLET_CONNECT_V1),this.status=E.d.READY,E.s.debug("initializing wallet connect v1 adapter"),!this.connector.connected){t.next=11;break}return this.rehydrated=!0,t.next=11,this.onConnectHandler({accounts:this.connector.accounts,chainId:this.connector.chainId});case 11:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"connect",value:function(){var t=i()(C.a.mark((function t(){var e,r,a=this;return C.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(l()(b()(n.prototype),"checkConnectionRequirements",this).call(this),this.connector){t.next=3;break}throw E.k.notReady("Wallet adapter is not ready yet");case 3:if(!this.connected){t.next=7;break}return t.next=6,this.onConnectHandler({accounts:this.connector.accounts,chainId:this.connector.chainId});case 6:return t.abrupt("return",this.provider);case 7:if(this.status===E.d.CONNECTING){t.next=13;break}return null!==(e=this.adapterOptions.adapterSettings)&&void 0!==e&&e.qrcodeModal&&(this.connector=this.getWalletConnectInstance(),this.wcProvider=new N.WalletConnectProvider({config:{chainConfig:this.chainConfig,skipLookupNetwork:null===(r=this.adapterOptions.adapterSettings)||void 0===r?void 0:r.skipNetworkSwitching},connector:this.connector})),t.next=11,this.createNewSession();case 11:this.status=E.d.CONNECTING,this.emit(E.b.CONNECTING,{adapter:E.j.WALLET_CONNECT_V1});case 13:return t.abrupt("return",new Promise((function(t,e){if(!a.connector)return e(E.k.notReady("Wallet adapter is not ready yet"));a.connector.on("modal_closed",i()(C.a.mark((function t(){return C.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.status=E.d.READY,a.emit(E.b.READY,E.j.WALLET_CONNECT_V1),t.abrupt("return",e(new Error("User closed modal")));case 3:case"end":return t.stop()}}),t)}))));try{a.connector.on("connect",function(){var e=i()(C.a.mark((function e(n,r){return C.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n&&a.emit(E.b.ERRORED,n),E.s.debug("connected event emitted by web3auth"),e.next=4,a.onConnectHandler(r.params[0]);case 4:return e.abrupt("return",t(a.provider));case 5:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}())}catch(n){E.s.error("Wallet connect v1 adapter error while connecting",n),a.status=E.d.READY,a.rehydrated=!0,a.emit(E.b.ERRORED,n),e(n instanceof E.m?n:E.l.connectionError("Failed to login with wallet connect: ".concat((null===n||void 0===n?void 0:n.message)||"")))}})));case 14:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"setAdapterSettings",value:function(t){this.status!==E.d.READY&&(null!==t&&void 0!==t&&t.sessionTime&&(this.sessionTime=t.sessionTime),null!==t&&void 0!==t&&t.clientId&&(this.clientId=t.clientId))}},{key:"getUserInfo",value:function(){var t=i()(C.a.mark((function t(){return C.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(this.connected){t.next=2;break}throw E.l.notConnectedError("Not connected with wallet, Please login/connect first");case 2:return t.abrupt("return",{});case 3:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"disconnect",value:function(){var t=i()(C.a.mark((function t(){var e,r,i=arguments;return C.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e=i.length>0&&void 0!==i[0]?i[0]:{cleanup:!1},r=e.cleanup,this.connector&&this.connected){t.next=4;break}throw E.l.notConnectedError("Not connected with wallet");case 4:return t.next=6,l()(b()(n.prototype),"disconnect",this).call(this);case 6:return t.next=8,this.connector.killSession();case 8:this.rehydrated=!1,r?(this.connector=null,this.status=E.d.NOT_READY,this.wcProvider=null):this.status=E.d.READY,this.emit(E.b.DISCONNECTED);case 11:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"addChain",value:function(){var t=i()(C.a.mark((function t(e){var n,r;return C.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,this.wcProvider){t.next=3;break}throw E.k.notReady("Wallet adapter is not ready yet");case 3:if(!(r=null===(n=this.adapterOptions.adapterSettings)||void 0===n?void 0:n.networkSwitchModal)){t.next=7;break}return t.next=7,r.addNetwork({chainConfig:e,appOrigin:window.location.hostname});case 7:return t.next=9,this.wcProvider.addChain(e);case 9:t.next=14;break;case 11:t.prev=11,t.t0=t.catch(0),E.s.error(t.t0);case 14:case"end":return t.stop()}}),t,this,[[0,11]])})));return function(e){return t.apply(this,arguments)}}()},{key:"switchChain",value:function(){var t=i()(C.a.mark((function t(e,n){var r,i;return C.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(this.wcProvider){t.next=2;break}throw E.k.notReady("Wallet adapter is not ready yet");case 2:if(!(i=null===(r=this.adapterOptions.adapterSettings)||void 0===r?void 0:r.networkSwitchModal)){t.next=6;break}return t.next=6,i.switchNetwork({currentChainConfig:n,newChainConfig:e,appOrigin:window.location.hostname});case 6:return t.next=8,this.wcProvider.switchChain({chainId:n.chainId,lookup:!1,addChain:!1});case 8:case"end":return t.stop()}}),t,this)})));return function(e,n){return t.apply(this,arguments)}}()},{key:"createNewSession",value:function(){var t=i()(C.a.mark((function t(){var e,n,r,a,o=this,c=arguments;return C.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r=c.length>0&&void 0!==c[0]?c[0]:{forceNewSession:!1},this.connector){t.next=3;break}throw E.k.notReady("Wallet adapter is not ready yet");case 3:if(!r.forceNewSession||!this.connector.pending){t.next=6;break}return t.next=6,this.connector.killSession();case 6:if(null===(e=this.adapterOptions)||void 0===e||null===(n=e.adapterSettings)||void 0===n||!n.qrcodeModal){t.next=10;break}return t.next=9,this.connector.createSession({chainId:parseInt((null===(a=this.chainConfig)||void 0===a?void 0:a.chainId)||"0x1",16)});case 9:return t.abrupt("return");case 10:return t.abrupt("return",new Promise((function(t,e){var n;if(!o.connector)return e(E.k.notReady("Wallet adapter is not ready yet"));E.s.debug("creating new session for web3auth wallet connect"),o.connector.on("display_uri",function(){var n=i()(C.a.mark((function n(r,i){var a,c;return C.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!r){n.next=3;break}return o.emit(E.b.ERRORED,E.l.connectionError("Failed to display wallet connect qr code")),n.abrupt("return",e(r));case 3:return c=i.params[0],o.updateAdapterData({uri:c,extensionAdapters:R}),null===(a=o.connector)||void 0===a||a.off("display_uri"),n.abrupt("return",t());case 7:case"end":return n.stop()}}),n)})));return function(t,e){return n.apply(this,arguments)}}()),o.connector.createSession({chainId:parseInt((null===(n=o.chainConfig)||void 0===n?void 0:n.chainId)||"0x1",16)}).catch((function(t){return E.s.error("error while creating new wallet connect session",t),o.emit(E.b.ERRORED,t),e(t)}))})));case 11:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"onConnectHandler",value:function(){var t=i()(C.a.mark((function t(e){var n,r,i,a,o,c;return C.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(this.connector&&this.wcProvider){t.next=2;break}throw E.k.notReady("Wallet adapter is not ready yet");case 2:if(this.chainConfig){t.next=4;break}throw E.k.invalidParams("Chain config is not set");case 4:if(n=e.chainId,E.s.debug("connected chainId in hex"),n===parseInt(this.chainConfig.chainId,16)){t.next=27;break}if(o=Object(E.p)(E.g.EIP155,n)||{chainId:"0x".concat(n.toString(16)),displayName:"Unknown Network"},(c=null===(r=this.adapterOptions.adapterSettings)||void 0===r?void 0:r.qrcodeModal)&&(!c||null!==(i=this.adapterOptions)&&void 0!==i&&null!==(a=i.adapterSettings)&&void 0!==a&&a.skipNetworkSwitching)){t.next=27;break}return t.prev=10,t.next=13,this.addChain(this.chainConfig);case 13:return t.next=15,this.switchChain(o,this.chainConfig);case 15:this.connector=this.getWalletConnectInstance(),t.next=27;break;case 18:return t.prev=18,t.t0=t.catch(10),E.s.error("error while chain switching",t.t0),t.next=23,this.createNewSession({forceNewSession:!0});case 23:return this.emit(E.b.ERRORED,E.k.fromCode(5e3,"Not connected to correct network. Expected: ".concat(this.chainConfig.displayName,", Current: ").concat((null===o||void 0===o?void 0:o.displayName)||n,", Please switch to correct network from wallet"))),this.status=E.d.READY,this.rehydrated=!0,t.abrupt("return");case 27:return t.next=29,this.wcProvider.setupProvider(this.connector);case 29:this.subscribeEvents(this.connector),this.status=E.d.CONNECTED,this.emit(E.b.CONNECTED,{adapter:E.j.WALLET_CONNECT_V1,reconnected:this.rehydrated});case 32:case"end":return t.stop()}}),t,this,[[10,18]])})));return function(e){return t.apply(this,arguments)}}()},{key:"subscribeEvents",value:function(t){var e=this;t.on("session_update",function(){var t=i()(C.a.mark((function t(n){return C.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n&&e.emit(E.b.ERRORED,n);case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}},{key:"getWalletConnectInstance",value:function(){var t=this.adapterOptions.adapterSettings||{};return t.bridge=t.bridge||"https://bridge.walletconnect.org",new x.a(t)}}]),n}(O.a)}}]);
//# sourceMappingURL=17.9b74d792.chunk.js.map