(this.webpackJsonpfolioplay=this.webpackJsonpfolioplay||[]).push([[16],{1716:function(t,e,n){"use strict";n.d(e,"a",(function(){return b}));var r=n(47),i=n.n(r),a=n(60),s=n.n(a),c=n(61),o=n.n(c),u=n(45),h=n.n(u),l=n(68),d=n.n(l),f=n(155),p=n.n(f),v=n(93),m=n.n(v),k=n(26),w=n.n(k),E=n(3),y=n.n(E),C=n(19);function x(t){var e=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=m()(t);if(e){var i=m()(this).constructor;n=Reflect.construct(r,arguments,i)}else n=r.apply(this,arguments);return p()(this,n)}}var b=function(t){d()(n,t);var e=x(n);function n(){var t,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return s()(this,n),t=e.call(this),w()(h()(t),"clientId",void 0),t.clientId=r.clientId,t}return o()(n,[{key:"authenticateUser",value:function(){var t=i()(y.a.mark((function t(){var e,n,r,i,a,s,c,o,u,h;return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(this.provider&&null!==(e=this.chainConfig)&&void 0!==e&&e.chainId){t.next=2;break}throw C.l.notConnectedError();case 2:if(n=this.chainConfig,r=n.chainNamespace,i=n.chainId,this.status===C.d.CONNECTED){t.next=5;break}throw C.l.notConnectedError("Not connected with wallet, Please login/connect first");case 5:return t.next=7,this.provider.request({method:"eth_accounts"});case 7:if(!((a=t.sent)&&a.length>0)){t.next=26;break}if(!(s=Object(C.q)(a[0],this.name))){t.next=14;break}if(Object(C.n)(s)){t.next=14;break}return t.abrupt("return",{idToken:s});case 14:return c={domain:window.location.origin,uri:window.location.href,address:a[0],chainId:parseInt(i,16),version:"1",nonce:Math.random().toString(36).slice(2),issuedAt:(new Date).toISOString()},t.next=17,Object(C.u)(c,r);case 17:return o=t.sent,t.next=20,this.provider.request({method:"personal_sign",params:[o,a[0]]});case 20:return u=t.sent,t.next=23,Object(C.w)(r,u,o,this.name,this.sessionTime,this.clientId);case 23:return h=t.sent,Object(C.t)(a[0],this.name,h),t.abrupt("return",{idToken:h});case 26:throw C.l.notConnectedError("Not connected with wallet, Please login/connect first");case 27:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"disconnect",value:function(){var t=i()(y.a.mark((function t(){var e;return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(this.status===C.d.CONNECTED){t.next=2;break}throw C.l.disconnectionError("Not connected with wallet");case 2:return t.next=4,this.provider.request({method:"eth_accounts"});case 4:(e=t.sent)&&e.length>0&&Object(C.o)(e[0],this.name);case 6:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()}]),n}(C.e)},1959:function(t,e,n){"use strict";n.r(e),n.d(e,"MetamaskAdapter",(function(){return R}));var r=n(47),i=n.n(r),a=n(60),s=n.n(a),c=n(61),o=n.n(c),u=n(45),h=n.n(u),l=n(362),d=n.n(l),f=n(68),p=n.n(f),v=n(155),m=n.n(v),k=n(93),w=n.n(k),E=n(26),y=n.n(E),C=n(3),x=n.n(C),b=n(835),N=n.n(b),g=n(19);function I(t){var e=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=w()(t);if(e){var i=w()(this).constructor;n=Reflect.construct(r,arguments,i)}else n=r.apply(this,arguments);return m()(this,n)}}var R=function(t){p()(n,t);var e=I(n);function n(t){var r;return s()(this,n),r=e.call(this,t),y()(h()(r),"adapterNamespace",g.c.EIP155),y()(h()(r),"currentChainNamespace",g.g.EIP155),y()(h()(r),"type",g.a.EXTERNAL),y()(h()(r),"name",g.j.METAMASK),y()(h()(r),"status",g.d.NOT_READY),y()(h()(r),"rehydrated",!1),y()(h()(r),"metamaskProvider",null),r.chainConfig=(null===t||void 0===t?void 0:t.chainConfig)||null,r.sessionTime=(null===t||void 0===t?void 0:t.sessionTime)||86400,r}return o()(n,[{key:"provider",get:function(){return this.status===g.d.CONNECTED&&this.metamaskProvider?this.metamaskProvider:null},set:function(t){throw new Error("Not implemented")}},{key:"init",value:function(){var t=i()(x.a.mark((function t(e){return x.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return d()(w()(n.prototype),"checkInitializationRequirements",this).call(this),t.next=3,N()({mustBeMetaMask:!0});case 3:if(this.metamaskProvider=t.sent,this.metamaskProvider){t.next=6;break}throw g.k.notInstalled("Metamask extension is not installed");case 6:if(this.status=g.d.READY,this.emit(g.b.READY,g.j.METAMASK),t.prev=8,g.s.debug("initializing metamask adapter"),!e.autoConnect){t.next=14;break}return this.rehydrated=!0,t.next=14,this.connect();case 14:t.next=19;break;case 16:t.prev=16,t.t0=t.catch(8),this.emit(g.b.ERRORED,t.t0);case 19:case"end":return t.stop()}}),t,this,[[8,16]])})));return function(e){return t.apply(this,arguments)}}()},{key:"setAdapterSettings",value:function(t){this.status!==g.d.READY&&(null!==t&&void 0!==t&&t.sessionTime&&(this.sessionTime=t.sessionTime),null!==t&&void 0!==t&&t.clientId&&(this.clientId=t.clientId))}},{key:"connect",value:function(){var t=i()(x.a.mark((function t(){var e=this;return x.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(d()(w()(n.prototype),"checkConnectionRequirements",this).call(this),this.chainConfig||(this.chainConfig=Object(g.p)(g.g.EIP155,1)),this.status=g.d.CONNECTING,this.emit(g.b.CONNECTING,{adapter:g.j.METAMASK}),this.metamaskProvider){t.next=6;break}throw g.l.notConnectedError("Not able to connect with metamask");case 6:return t.prev=6,t.next=9,this.metamaskProvider.request({method:"eth_requestAccounts"});case 9:if(this.metamaskProvider.chainId===this.chainConfig.chainId){t.next=13;break}return t.next=13,this.switchChain(this.chainConfig);case 13:if(this.status=g.d.CONNECTED,this.provider){t.next=16;break}throw g.l.notConnectedError("Failed to connect with provider");case 16:return this.provider.once("disconnect",(function(){e.disconnect()})),this.emit(g.b.CONNECTED,{adapter:g.j.METAMASK,reconnected:this.rehydrated}),t.abrupt("return",this.provider);case 21:throw t.prev=21,t.t0=t.catch(6),this.status=g.d.READY,this.rehydrated=!1,this.emit(g.b.ERRORED,t.t0),g.l.connectionError("Failed to login with metamask wallet");case 27:case"end":return t.stop()}}),t,this,[[6,21]])})));return function(){return t.apply(this,arguments)}}()},{key:"disconnect",value:function(){var t=i()(x.a.mark((function t(){var e,r,i=arguments;return x.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=i.length>0&&void 0!==i[0]?i[0]:{cleanup:!1},t.next=3,d()(w()(n.prototype),"disconnect",this).call(this);case 3:null===(e=this.provider)||void 0===e||e.removeAllListeners(),r.cleanup?(this.status=g.d.NOT_READY,this.metamaskProvider=null):this.status=g.d.READY,this.rehydrated=!1,this.emit(g.b.DISCONNECTED);case 7:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"getUserInfo",value:function(){var t=i()(x.a.mark((function t(){return x.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(this.status===g.d.CONNECTED){t.next=2;break}throw g.l.notConnectedError("Not connected with wallet, Please login/connect first");case 2:return t.abrupt("return",{});case 3:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"switchChain",value:function(){var t=i()(x.a.mark((function t(e){return x.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(this.metamaskProvider){t.next=2;break}throw g.l.notConnectedError("Not connected with wallet");case 2:return t.prev=2,t.next=5,this.metamaskProvider.request({method:"wallet_switchEthereumChain",params:[{chainId:e.chainId}]});case 5:case 12:t.next=15;break;case 7:if(t.prev=7,t.t0=t.catch(2),4902!==t.t0.code){t.next=14;break}return t.next=12,this.metamaskProvider.request({method:"wallet_addEthereumChain",params:[{chainId:e.chainId,chainName:e.displayName,rpcUrls:[e.rpcTarget]}]});case 14:throw t.t0;case 15:case"end":return t.stop()}}),t,this,[[2,7]])})));return function(e){return t.apply(this,arguments)}}()}]),n}(n(1716).a)}}]);
//# sourceMappingURL=16.dc69640f.chunk.js.map