(this.webpackJsonpfolioplay=this.webpackJsonpfolioplay||[]).push([[15],{1641:function(r,n){},1936:function(r,n,t){"use strict";t.r(n),function(r){t.d(n,"getED25519Key",(function(){return f}));var a=t(35),e=t(1724),o=t.n(e).a.lowlevel;function f(n){var t;t="string"===typeof n?r.from(n,"hex"):n;var e=new Uint8Array(64),f=[o.gf(),o.gf(),o.gf(),o.gf()],i=new Uint8Array([].concat(Object(a.a)(new Uint8Array(t)),Object(a.a)(new Uint8Array(32)))),c=new Uint8Array(32);o.crypto_hash(e,i,32),e[0]&=248,e[31]&=127,e[31]|=64,o.scalarbase(f,e),o.pack(c,f);for(var s=0;s<32;s+=1)i[s+32]=c[s];return{sk:r.from(i),pk:r.from(c)}}}.call(this,t(39).Buffer)}}]);
//# sourceMappingURL=15.dd2be39e.chunk.js.map