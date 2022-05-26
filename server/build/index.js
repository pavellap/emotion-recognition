(()=>{"use strict";var e={24:function(e,t,n){var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var o=Object.getOwnPropertyDescriptor(t,n);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,o)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t},u=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function u(e){try{s(r.next(e))}catch(e){i(e)}}function a(e){try{s(r.throw(e))}catch(e){i(e)}}function s(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(u,a)}s((r=r.apply(e,t||[])).next())}))},a=this&&this.__generator||function(e,t){var n,r,o,i,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;u;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return u.label++,{value:i[1],done:!1};case 5:u.label++,r=i[1],i=[0];continue;case 7:i=u.ops.pop(),u.trys.pop();continue;default:if(!((o=(o=u.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){u=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){u.label=i[1];break}if(6===i[0]&&u.label<o[1]){u.label=o[1],o=i;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(i);break}o[2]&&u.ops.pop(),u.trys.pop();continue}i=t.call(e,u)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}};t.__esModule=!0;var s=i(n(661)),c=n(254);t.default=function(){var e=this;this.connect=function(){return u(e,void 0,void 0,(function(){var e;return a(this,(function(t){switch(t.label){case 0:return e=this,[4,(0,c.open)({filename:"./database.db",driver:s.Database})];case 1:return e.db=t.sent(),[2]}}))}))},this.createTable=function(){return u(e,void 0,void 0,(function(){return a(this,(function(e){switch(e.label){case 0:return[4,this.db.exec("CREATE TABLE IF NOT EXISTS RECORDS\n                      (\n                          id       integer PRIMARY KEY AUTOINCREMENT,\n                          fileHash text unique not null,\n                          length   integer default 0,\n                          emotion  text,\n                          gender text not null default 'male'\n                      )")];case 1:return e.sent(),[2]}}))}))},this.insertUnprocessedEntry=function(t,n){return u(e,void 0,void 0,(function(){return a(this,(function(e){switch(e.label){case 0:return[4,this.db.run("\n            INSERT INTO RECORDS\n            VALUES (NULL, '".concat(t,"', '").concat(n,"', NULL, NULL)\n        "))];case 1:return e.sent(),[2]}}))}))},this.updateResult=function(t,n){var r=n.emotion,o=n.gender;return u(e,void 0,void 0,(function(){return a(this,(function(e){switch(e.label){case 0:return[4,this.db.run("\n            UPDATE RECORDS\n            SET emotion = '".concat(r,"',\n            gender = '").concat(o,"'\n            WHERE fileHash = '").concat(t,"';\n        "))];case 1:return e.sent(),[2]}}))}))}}},492:function(e,t,n){var r=this&&this.__assign||function(){return r=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},r.apply(this,arguments)},o=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var o=Object.getOwnPropertyDescriptor(t,n);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,o)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),i=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),u=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&o(t,e,n);return i(t,e),t},a=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function u(e){try{s(r.next(e))}catch(e){i(e)}}function a(e){try{s(r.throw(e))}catch(e){i(e)}}function s(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(u,a)}s((r=r.apply(e,t||[])).next())}))},s=this&&this.__generator||function(e,t){var n,r,o,i,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;u;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return u.label++,{value:i[1],done:!1};case 5:u.label++,r=i[1],i=[0];continue;case 7:i=u.ops.pop(),u.trys.pop();continue;default:if(!((o=(o=u.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){u=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){u.label=i[1];break}if(6===i[0]&&u.label<o[1]){u.label=o[1],o=i;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(i);break}o[2]&&u.ops.pop(),u.trys.pop();continue}i=t.call(e,u)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}},c=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};t.__esModule=!0,t.Genders=t.Emotions=void 0;var l=c(n(986)),f=c(n(738)),d=u(n(147)),p=c(n(582)),h=n(918),b=c(n(24)),v=c(n(860)),y=n(108),_=u(n(17)),w=process.env.PORT||15e3,g=(0,v.default)(),x=n(81),m=new h;g.use(v.default.static(__dirname+"/public")),g.use(l.default.json()),g.use((0,p.default)()),g.use(l.default.urlencoded({extended:!0})),g.use((function(e,t,n){t.header("Access-Control-Allow-Origin","*"),t.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept"),n()}));var O,E,S=new b.default,T=(0,f.default)();(E=t.Emotions||(t.Emotions={})).angry="angry",E.sad="sad",E.neutral="neutral",E.happy="happy",(O=t.Genders||(t.Genders={})).male="male",O.female="female",g.post("/audio",T.any(),(function(e,t){return a(void 0,void 0,void 0,(function(){var n,o,i,u,a;return s(this,(function(s){switch(s.label){case 0:return n=m.generate(),o="audios/".concat(n,".wav"),d.writeFileSync(o,e.files[0].buffer),[4,(0,y.getAudioDurationInSeconds)(o)];case 1:return i=s.sent(),[4,S.insertUnprocessedEntry(n,i)];case 2:return s.sent(),u=_.resolve(__dirname,"../".concat(o)),a=_.resolve(__dirname,"../audios/processed.wav"),x.exec("python3 ./network/main.py ".concat(u," ").concat(a),(function(e,o){try{console.log("stdout: ",o);var i=JSON.parse(o.replaceAll("'",'"'));i.success||t.send({error:!0}),S.updateResult(n,{emotion:i.emotion,gender:i.gender}),t.send(r(r({},i),{error:!1}))}catch(e){console.log("err parsed: ",e),t.send({error:!0})}})),[2]}}))}))})),g.listen(w,(function(){return a(void 0,void 0,void 0,(function(){return s(this,(function(e){switch(e.label){case 0:return[4,S.connect()];case 1:return e.sent(),[4,S.createTable()];case 2:return e.sent(),console.log("Test server is running on port:",w),[2]}}))}))}))},986:e=>{e.exports=require("body-parser")},582:e=>{e.exports=require("cors")},860:e=>{e.exports=require("express")},108:e=>{e.exports=require("get-audio-duration")},738:e=>{e.exports=require("multer")},254:e=>{e.exports=require("sqlite")},661:e=>{e.exports=require("sqlite3")},918:e=>{e.exports=require("uuid-token-generator")},81:e=>{e.exports=require("child_process")},147:e=>{e.exports=require("fs")},17:e=>{e.exports=require("path")}},t={};!function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={exports:{}};return e[r].call(i.exports,i,i.exports,n),i.exports}(492)})();