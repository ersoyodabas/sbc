var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;$jscomp.ISOLATE_POLYFILLS=!1;$jscomp.FORCE_POLYFILL_PROMISE=!1;$jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){if(a==Array.prototype||a==Object.prototype)return a;a[b]=c.value;return a};
$jscomp.getGlobal=function(a){a=["object"==typeof globalThis&&globalThis,a,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var b=0;b<a.length;++b){var c=a[b];if(c&&c.Math==Math)return c}throw Error("Cannot find global object");};$jscomp.global=$jscomp.getGlobal(this);$jscomp.IS_SYMBOL_NATIVE="function"===typeof Symbol&&"symbol"===typeof Symbol("x");$jscomp.TRUST_ES6_POLYFILLS=!$jscomp.ISOLATE_POLYFILLS||$jscomp.IS_SYMBOL_NATIVE;$jscomp.polyfills={};
$jscomp.propertyToPolyfillSymbol={};$jscomp.POLYFILL_PREFIX="$jscp$";var $jscomp$lookupPolyfilledValue=function(a,b,c){if(!c||null!=a){c=$jscomp.propertyToPolyfillSymbol[b];if(null==c)return a[b];c=a[c];return void 0!==c?c:a[b]}};$jscomp.polyfill=function(a,b,c,d){b&&($jscomp.ISOLATE_POLYFILLS?$jscomp.polyfillIsolated(a,b,c,d):$jscomp.polyfillUnisolated(a,b,c,d))};
$jscomp.polyfillUnisolated=function(a,b,c,d){c=$jscomp.global;a=a.split(".");for(d=0;d<a.length-1;d++){var e=a[d];if(!(e in c))return;c=c[e]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&$jscomp.defineProperty(c,a,{configurable:!0,writable:!0,value:b})};
$jscomp.polyfillIsolated=function(a,b,c,d){var e=a.split(".");a=1===e.length;d=e[0];d=!a&&d in $jscomp.polyfills?$jscomp.polyfills:$jscomp.global;for(var f=0;f<e.length-1;f++){var g=e[f];if(!(g in d))return;d=d[g]}e=e[e.length-1];c=$jscomp.IS_SYMBOL_NATIVE&&"es6"===c?d[e]:null;b=b(c);null!=b&&(a?$jscomp.defineProperty($jscomp.polyfills,e,{configurable:!0,writable:!0,value:b}):b!==c&&(void 0===$jscomp.propertyToPolyfillSymbol[e]&&(c=1E9*Math.random()>>>0,$jscomp.propertyToPolyfillSymbol[e]=$jscomp.IS_SYMBOL_NATIVE?
$jscomp.global.Symbol(e):$jscomp.POLYFILL_PREFIX+c+"$"+e),$jscomp.defineProperty(d,$jscomp.propertyToPolyfillSymbol[e],{configurable:!0,writable:!0,value:b})))};$jscomp.underscoreProtoCanBeSet=function(){var a={a:!0},b={};try{return b.__proto__=a,b.a}catch(c){}return!1};
$jscomp.setPrototypeOf=$jscomp.TRUST_ES6_POLYFILLS&&"function"==typeof Object.setPrototypeOf?Object.setPrototypeOf:$jscomp.underscoreProtoCanBeSet()?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+" is not extensible");return a}:null;$jscomp.arrayIteratorImpl=function(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}};$jscomp.arrayIterator=function(a){return{next:$jscomp.arrayIteratorImpl(a)}};
$jscomp.makeIterator=function(a){var b="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];if(b)return b.call(a);if("number"==typeof a.length)return $jscomp.arrayIterator(a);throw Error(String(a)+" is not an iterable or ArrayLike");};$jscomp.generator={};$jscomp.generator.ensureIteratorResultIsObject_=function(a){if(!(a instanceof Object))throw new TypeError("Iterator result "+a+" is not an object");};
$jscomp.generator.Context=function(){this.isRunning_=!1;this.yieldAllIterator_=null;this.yieldResult=void 0;this.nextAddress=1;this.finallyAddress_=this.catchAddress_=0;this.finallyContexts_=this.abruptCompletion_=null};$jscomp.generator.Context.prototype.start_=function(){if(this.isRunning_)throw new TypeError("Generator is already running");this.isRunning_=!0};$jscomp.generator.Context.prototype.stop_=function(){this.isRunning_=!1};
$jscomp.generator.Context.prototype.jumpToErrorHandler_=function(){this.nextAddress=this.catchAddress_||this.finallyAddress_};$jscomp.generator.Context.prototype.next_=function(a){this.yieldResult=a};$jscomp.generator.Context.prototype.throw_=function(a){this.abruptCompletion_={exception:a,isException:!0};this.jumpToErrorHandler_()};$jscomp.generator.Context.prototype["return"]=function(a){this.abruptCompletion_={"return":a};this.nextAddress=this.finallyAddress_};
$jscomp.generator.Context.prototype.jumpThroughFinallyBlocks=function(a){this.abruptCompletion_={jumpTo:a};this.nextAddress=this.finallyAddress_};$jscomp.generator.Context.prototype.yield=function(a,b){this.nextAddress=b;return{value:a}};$jscomp.generator.Context.prototype.yieldAll=function(a,b){var c=$jscomp.makeIterator(a),d=c.next();$jscomp.generator.ensureIteratorResultIsObject_(d);if(d.done)this.yieldResult=d.value,this.nextAddress=b;else return this.yieldAllIterator_=c,this.yield(d.value,b)};
$jscomp.generator.Context.prototype.jumpTo=function(a){this.nextAddress=a};$jscomp.generator.Context.prototype.jumpToEnd=function(){this.nextAddress=0};$jscomp.generator.Context.prototype.setCatchFinallyBlocks=function(a,b){this.catchAddress_=a;void 0!=b&&(this.finallyAddress_=b)};$jscomp.generator.Context.prototype.setFinallyBlock=function(a){this.catchAddress_=0;this.finallyAddress_=a||0};$jscomp.generator.Context.prototype.leaveTryBlock=function(a,b){this.nextAddress=a;this.catchAddress_=b||0};
$jscomp.generator.Context.prototype.enterCatchBlock=function(a){this.catchAddress_=a||0;a=this.abruptCompletion_.exception;this.abruptCompletion_=null;return a};$jscomp.generator.Context.prototype.enterFinallyBlock=function(a,b,c){c?this.finallyContexts_[c]=this.abruptCompletion_:this.finallyContexts_=[this.abruptCompletion_];this.catchAddress_=a||0;this.finallyAddress_=b||0};
$jscomp.generator.Context.prototype.leaveFinallyBlock=function(a,b){var c=this.finallyContexts_.splice(b||0)[0];if(c=this.abruptCompletion_=this.abruptCompletion_||c){if(c.isException)return this.jumpToErrorHandler_();void 0!=c.jumpTo&&this.finallyAddress_<c.jumpTo?(this.nextAddress=c.jumpTo,this.abruptCompletion_=null):this.nextAddress=this.finallyAddress_}else this.nextAddress=a};$jscomp.generator.Context.prototype.forIn=function(a){return new $jscomp.generator.Context.PropertyIterator(a)};
$jscomp.generator.Context.PropertyIterator=function(a){this.object_=a;this.properties_=[];for(var b in a)this.properties_.push(b);this.properties_.reverse()};$jscomp.generator.Context.PropertyIterator.prototype.getNext=function(){for(;0<this.properties_.length;){var a=this.properties_.pop();if(a in this.object_)return a}return null};$jscomp.generator.Engine_=function(a){this.context_=new $jscomp.generator.Context;this.program_=a};
$jscomp.generator.Engine_.prototype.next_=function(a){this.context_.start_();if(this.context_.yieldAllIterator_)return this.yieldAllStep_(this.context_.yieldAllIterator_.next,a,this.context_.next_);this.context_.next_(a);return this.nextStep_()};
$jscomp.generator.Engine_.prototype.return_=function(a){this.context_.start_();var b=this.context_.yieldAllIterator_;if(b)return this.yieldAllStep_("return"in b?b["return"]:function(c){return{value:c,done:!0}},a,this.context_["return"]);this.context_["return"](a);return this.nextStep_()};
$jscomp.generator.Engine_.prototype.throw_=function(a){this.context_.start_();if(this.context_.yieldAllIterator_)return this.yieldAllStep_(this.context_.yieldAllIterator_["throw"],a,this.context_.next_);this.context_.throw_(a);return this.nextStep_()};
$jscomp.generator.Engine_.prototype.yieldAllStep_=function(a,b,c){try{var d=a.call(this.context_.yieldAllIterator_,b);$jscomp.generator.ensureIteratorResultIsObject_(d);if(!d.done)return this.context_.stop_(),d;var e=d.value}catch(f){return this.context_.yieldAllIterator_=null,this.context_.throw_(f),this.nextStep_()}this.context_.yieldAllIterator_=null;c.call(this.context_,e);return this.nextStep_()};
$jscomp.generator.Engine_.prototype.nextStep_=function(){for(;this.context_.nextAddress;)try{var a=this.program_(this.context_);if(a)return this.context_.stop_(),{value:a.value,done:!1}}catch(b){this.context_.yieldResult=void 0,this.context_.throw_(b)}this.context_.stop_();if(this.context_.abruptCompletion_){a=this.context_.abruptCompletion_;this.context_.abruptCompletion_=null;if(a.isException)throw a.exception;return{value:a["return"],done:!0}}return{value:void 0,done:!0}};
$jscomp.generator.Generator_=function(a){this.next=function(b){return a.next_(b)};this["throw"]=function(b){return a.throw_(b)};this["return"]=function(b){return a.return_(b)};this[Symbol.iterator]=function(){return this}};$jscomp.generator.createGenerator=function(a,b){var c=new $jscomp.generator.Generator_(new $jscomp.generator.Engine_(b));$jscomp.setPrototypeOf&&a.prototype&&$jscomp.setPrototypeOf(c,a.prototype);return c};
$jscomp.asyncExecutePromiseGenerator=function(a){function b(d){return a.next(d)}function c(d){return a["throw"](d)}return new Promise(function(d,e){function f(g){g.done?d(g.value):Promise.resolve(g.value).then(b,c).then(f,e)}f(a.next())})};$jscomp.asyncExecutePromiseGeneratorFunction=function(a){return $jscomp.asyncExecutePromiseGenerator(a())};$jscomp.asyncExecutePromiseGeneratorProgram=function(a){return $jscomp.asyncExecutePromiseGenerator(new $jscomp.generator.Generator_(new $jscomp.generator.Engine_(a)))};
var popup={data:{api_url:"https://api.sbcsolverapp.com",email:"",password:"",login_model:{email:"",password:"",lang:"en",version:"24"},ls:{},loc:{}},methods:{loaderShow:function(){document.getElementById("loading").hidden=!1},loaderHide:function(){document.getElementById("loading").hidden=!0},getPopupHtml:function(){var a=this,b,c,d;return $jscomp.asyncExecutePromiseGeneratorProgram(function(e){if(1==e.nextAddress)return b=a,console.log(23,popup.data.ls),console.log(23,popup.data.user),c=popup.data.api_url+
"/api/staticData/popup?email="+(popup.data.ls.user?popup.data.ls.user.email:""),e.yield(b.getData(c),2);d=e.yieldResult;console.log(28,d);if(!d)return e["return"]();try{document.getElementById("default_bg").hidden=!0,console.log(27,JSON.stringify(d)),document.querySelector("#popUpBody")&&(document.querySelector("#popUpBody").innerHTML=d.content.html,document.querySelector("#popUpBody").insertAdjacentHTML("beforeend","<style>"+d.content.css[0]+"</style>"),popup.data.loc=JSON.parse(d.content.js_loc),
document.getElementById("lblLogin").innerHTML=popup.data.loc.login.login,console.log(43,popup.data.loc.login),document.getElementById("lblDownloadNewVersion").innerHTML=popup.data.loc.login.download_new_version,$("#closeIcon").click(function(){$("#errorBox").attr("hidden",!0)}),$("#aLogin").click(function(){b.login()}),a.setSocials(d.socials),document.getElementById("userEmail").value=void 0==popup.data.ls.email?"":popup.data.ls.email,document.getElementById("userPassword").value=void 0==popup.data.ls.password?
"":popup.data.ls.password,userEmail.addEventListener("keyup",function(f){13===f.keyCode&&(f.preventDefault(),b.login())}),userPassword.addEventListener("keyup",function(f){13===f.keyCode&&(f.preventDefault(),b.login())}))}catch(f){document.getElementById("default_bg").hidden=!1,document.getElementById("connecting_desc").innerHTML=f}e.jumpToEnd()})},setSocials:function(a){a&&(a.social_logo&&(document.getElementById("divLogo").hidden=!1,document.getElementById("imgLogoCompany").src=a.social_logo,document.getElementById("imgLogoCompany").alt=
"logo"),a.social_facebook||a.social_instagram||a.social_telegram||a.social_twitter||a.social_discord||a.social_whatsapp||a.social_youtube)&&(document.getElementById("socialDiv").hidden=!1,a.social_instagram&&(document.getElementById("social_instagram").hidden=!1,document.getElementById("social_instagram").href=a.social_instagram),a.social_twitter&&(document.getElementById("social_twitter").hidden=!1,document.getElementById("social_twitter").href=a.social_twitter),a.social_telegram&&(document.getElementById("social_telegram").hidden=
!1,document.getElementById("social_telegram").href=a.social_telegram),a.social_discord&&(document.getElementById("social_discord").hidden=!1,document.getElementById("social_discord").href=a.social_discord),a.social_whatsapp&&(document.getElementById("social_whatsapp").hidden=!1,document.getElementById("social_whatsapp").href=document.getElementById("social_whatsapp").href.replace("xxxxx",a.social_whatsapp.replace("+",""))),a.social_youtube&&(document.getElementById("social_youtube").hidden=!1,document.getElementById("social_youtube").href=
a.social_youtube),a.social_facebook&&(document.getElementById("social_facebook").hidden=!1,document.getElementById("social_facebook").href=a.social_facebook),a.website_link&&(document.getElementById("websiteLink").href=a.website_link))},login:function(){var a=this,b,c;return $jscomp.asyncExecutePromiseGeneratorProgram(function(d){if(1==d.nextAddress){b=a;popup.data.login_model.email=document.getElementById("userEmail").value;popup.data.login_model.password=document.getElementById("userPassword").value;
if(!popup.data.login_model.email||!popup.data.login_model.password)return document.querySelector("#errorBox > span").innerHTML="Enter All Informations",$("#errorBox").attr("hidden",!1),setTimeout(function(){$("#errorBox").attr("hidden",!0)},3E3),d.jumpTo(2);b.loaderShow();return d.yield(b.postData(popup.data.api_url+"/api/user/loginbot",popup.data.login_model),3)}2!=d.nextAddress&&(c=d.yieldResult,c.require_new_version?(c&&(c.require_new_version?(c.message=popup.data.loc.login.alert_old_version,$("#aDownloadVersion").attr("hidden",
!1),$("#aDownloadVersion").attr("href",c.app_download_link),$("#aLogin").attr("hidden",!0)):($("#aDownloadVersion").attr("hidden",!0),$("#aLogin").attr("hidden",!1))),document.querySelector("#errorBox > span").innerHTML=c.message,$("#errorBox").attr("hidden",!1),setTimeout(function(){$("#errorBox").attr("hidden",!0)},3E3)):(popup.data.ls.email=popup.data.login_model.email,popup.data.ls.password=popup.data.login_model.password,popup.data.ls.token=c.token,popup.data.ls.user=c.user,popup.data.ls.menu=
c.menu,popup.data.ls.payment=c.payment,chrome.storage.local.set({sbcsolver24:popup.data.ls},function(){}),chrome.tabs.executeScript(null,{file:"background.js"}),window.close()),b.loaderHide());d.jumpToEnd()})},postData:function(a,b){a=void 0===a?"":a;b=void 0===b?{}:b;return $jscomp.asyncExecutePromiseGeneratorProgram(function(c){return c["return"](new Promise(function(d,e){fetch(a,{method:"POST",mode:"cors",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json",Authorization:"Bearer "+
popup.data.ls.token},redirect:"follow",referrerPolicy:"no-referrer",body:JSON.stringify(b)}).then(function(f){200!==f.status?f.text().then(function(g){console.log("post error",g);g&&alert(g);d({})}):f.text().then(function(g){d(JSON.parse(g))})})}))})},getData:function(a){return $jscomp.asyncExecutePromiseGeneratorProgram(function(b){return b["return"](new Promise(function(c,d){var e=new Headers({"Content-Type":"text/json",Authorization:"Bearer "+popup.data.ls.token});e=new Request(a,{method:"GET",
headers:e,mode:"cors",cache:"default"});fetch(e).then(function(f){200!==f.status?f.text().then(function(g){console.log("get error",g);g&&alert(g);c(g)}):f.text().then(function(g){c(JSON.parse(g))})})["catch"](function(f){console.log(323,f)})}))})}},mounted:function(){return $jscomp.asyncExecutePromiseGeneratorProgram(function(a){chrome.storage.local.get(["sbcsolver24"],function(b){return $jscomp.asyncExecutePromiseGeneratorProgram(function(c){b.sbcsolver24?popup.data.ls=b.sbcsolver24:(popup.data.ls.lang=
"en",popup.data.ls.api_url=popup.data.api_url,chrome.storage.local.set({sbcsolver24:popup.data.ls},function(){}));"tr"===popup.data.ls.lang?(document.getElementById("connecting").innerHTML="Ba\u011flan\u0131yor ... ",document.getElementById("connecting_desc").innerHTML="E\u011fer ba\u011flanma i\u015flemi uzun s\u00fcrerse, l\u00fctfe daha sonra tekrar deneyiniz..."):(document.getElementById("connecting").innerHTML="Connecting ... ",document.getElementById("connecting_desc").innerHTML="If it takes a long time to connect, please try again later.");
return c.yield(popup.methods.getPopupHtml(),0)})});a.jumpToEnd()})}};popup.mounted();