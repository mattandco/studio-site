// The opening from the design: the logo draws itself on a white sheet, then flies to
// the header as the sheet lifts. It runs from a small inline script, so it never waits
// for the site's code on a slow connection, and it skips reduced motion and visitors
// already on the site (a language switch, for example).
export const introScript = `(function(){try{
var d=document,w=window;
if(w.matchMedia('(prefers-reduced-motion: reduce)').matches||!Element.prototype.animate)return;
if(d.referrer&&new URL(d.referrer).origin===location.origin)return;
w.__nvCovered=true;
var EO='cubic-bezier(.16,1,.3,1)',EIO='cubic-bezier(.76,0,.24,1)';
var cols=["#D9480F","#2457D6","#138A55","#B57A00","#7B3FE4","#D6246E"];
var pos=[[-3.6,-7.2],[-3.6,0],[-3.6,7.2],[3.6,-7.2],[3.6,0],[3.6,7.2]];
var root=d.createElement('div');root.setAttribute('aria-hidden','true');root.setAttribute('data-nv-intro','');
root.style.cssText='position:fixed;inset:0;z-index:100';
var dots=pos.map(function(p,i){return '<circle cx="'+p[0]+'" cy="'+p[1]+'" r="2.88" style="fill:'+cols[i]+';transform-box:fill-box;transform-origin:center;transform:scale(0)"></circle>'}).join('');
var chars='Nestvested'.split('').map(function(c){return '<span style="display:inline-block;overflow:hidden;vertical-align:top;padding:.1em 0 .18em;margin:-.1em 0 -.18em"><span data-c style="display:inline-block;transform:translateY(112%)">'+c+'</span></span>'}).join('');
root.innerHTML='<div data-s style="position:absolute;inset:0;background:#fff"><div data-t style="position:absolute;left:0;right:0;bottom:0;height:1px;background:#242126;transform-origin:left center;transform:scaleX(0)"></div></div><div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none"><span data-l style="display:inline-flex;align-items:baseline;gap:.24em;font-size:clamp(48px,8vw,128px);font-weight:500;letter-spacing:-0.02em;line-height:1.6;color:#242126;white-space:nowrap;transform-origin:0 0"><svg viewBox="-7 -10.5 14 21" style="flex:none;width:.493em;height:.74em;position:relative;top:.04em;overflow:visible">'+dots+'</svg><span style="display:inline-block;white-space:nowrap">'+chars+'</span></span></div>';
d.body.appendChild(root);
var q=function(s){return root.querySelector(s)},sheet=q('[data-s]'),lock=q('[data-l]');
var done=false,uncover=function(){if(w.__nvCovered){w.__nvCovered=false;w.dispatchEvent(new Event('nv-uncover'))}};
var end=function(){if(done)return;done=true;uncover();root.remove();var h=d.querySelector('.logo');if(h)h.style.opacity=''};
root.querySelectorAll('circle').forEach(function(c,i){c.animate([{transform:'scale(0)'},{transform:'scale(1)'}],{duration:800,delay:100+i*95,easing:EO,fill:'both'})});
root.querySelectorAll('[data-c]').forEach(function(c,i){c.animate([{transform:'translateY(112%)'},{transform:'none'}],{duration:1100,delay:380+i*42,easing:EO,fill:'both'})});
q('[data-t]').animate([{transform:'scaleX(0)'},{transform:'scaleX(1)'}],{duration:700,delay:1500,easing:EIO,fill:'both'});
setTimeout(function(){
var D=1200,hs=d.querySelector('.logo svg'),ls=lock.querySelector('svg'),flew=false;
if(hs&&ls){var hr=hs.getBoundingClientRect(),lr=ls.getBoundingClientRect(),o=lock.getBoundingClientRect();
if(hr.width&&lr.width&&hr.bottom>0&&hr.top<innerHeight){var s=hr.width/lr.width;
lock.animate([{transform:'none'},{transform:'translate('+(hr.left-o.left-s*(lr.left-o.left))+'px,'+(hr.top-o.top-s*(lr.top-o.top))+'px) scale('+s+')'}],{duration:D,easing:EIO,fill:'forwards'});flew=true}}
if(!flew)lock.animate([{opacity:1},{opacity:0}],{duration:500,easing:'ease',fill:'forwards'});
sheet.animate([{transform:'none'},{transform:'translateY(-100%)'}],{duration:D,easing:EIO,fill:'forwards'});
setTimeout(uncover,520);
setTimeout(function(){lock.animate([{opacity:1},{opacity:0}],{duration:280,easing:'ease',fill:'forwards'});setTimeout(end,290)},D);
},2100);
setTimeout(end,6000);
}catch(e){}})();`;
