!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.MasterTab=e()}(this,function(){var t,e=new(function(t){var e=function(){this.$listeners={}};e.prototype.on=function(t,e){this.$listeners[t]||(this.$listeners[t]=[]),this.$listeners[t].push(e)},e.prototype.off=function(t,e){if(this.$listeners[t]){if(e instanceof Function){var n=this.$listeners[t].indexOf(e);this.$listeners[t].splice(n,1)}this.$listeners[t].length&&e||delete this.$listeners[t]}},e.prototype.emit=function(t,e){this.$listeners[t]&&this.$listeners[t].forEach(function(t){return t(e)})},t.exports=e}(t={exports:{}},t.exports),t.exports),n=e.STORAGE_KEY||"mastertab",i=e.INSTANCE_ID||Math.floor(65536*Math.random()).toString(16),o="a",s="p",r="h",a=function(t,e){for(var n=t.length-1;n>=0;n--){var i=t[n].split(":");if(i[1]===e)return i[0]}return null},l=function(t){for(var n=t?t.split(";"):[],l=0,f=[o,s,r];l<f.length;l+=1){var u=a(n,f[l]);if(u)return e.emit("change",u===i)}};return["pageshow","pagehide","focus","blur","visibilitychange"].forEach(function(t){window.addEventListener(t,function(){var t=localStorage.getItem(n),e=t?t.split(";"):[],a=e.findIndex(function(t){return t.split(":")[0]===i});a<0&&(a=e.length);var f="hidden"===document.visibilityState?r:document.hasFocus()?o:s;e[a]=[i,f].join(":"),f===o&&(e.push(e[a]),e.splice(a,1));var u=e.join(";");localStorage.setItem(n,u),l(u)})}),window.addEventListener("unload",function(){var t=localStorage.getItem(n),e=t?t.split(";"):[],o=e.findIndex(function(t){return t.split(":")[0]===i});o>=0&&e.splice(o,1);var s=e.join(";");localStorage.setItem(n,s)}),window.addEventListener("storage",function(t){t.key===n&&l(t.newValue)}),e});
//# sourceMappingURL=master-tab.umd.js.map