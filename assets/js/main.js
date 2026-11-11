(()=>{
 'use strict';
 const $=(s,p=document)=>p.querySelector(s), $$=(s,p=document)=>Array.from(p.querySelectorAll(s));
 const config=window.LUCIA_CONFIG||{}, T=window.LUCIA_TEXT||{};
 const head=$('#site-header'),toggle=$('#menu-toggle'), menu=$('#mobile-menu');
 if(head){const onscroll=()=>head.classList.toggle('scrolled',window.scrollY>20);onscroll();addEventListener('scroll',onscroll,{passive:true});}
 if(toggle&&menu){
   const close=()=>{menu.classList.remove('open');toggle.setAttribute('aria-expanded','false');};
   toggle.addEventListener('click',()=>{const open=menu.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});
   $$('#mobile-menu a').forEach(a=>a.addEventListener('click',close));
   addEventListener('keydown',e=>{if(e.key==='Escape')close();});
   addEventListener('resize',()=>{if(innerWidth>1120)close();});
 }
 const elements=$$('.reveal');
 if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
  const ob=new IntersectionObserver(entries=>{for(const e of entries)if(e.isIntersecting){e.target.classList.add('visible');ob.unobserve(e.target);}}, {rootMargin:'0px 0px -35px 0px',threshold:.08});
  elements.forEach(e=>ob.observe(e));
 } else elements.forEach(e=>e.classList.add('visible'));
 // Gallery lightbox, keyboard arrows, click-outside and focus restoration.
 const photos=$$('.gallery-item'),box=$('#lightbox'),lightImg=box&&$('img',box),caption=box&&$('figcaption',box);
 if(photos.length&&box){let index=0,lastFocus=null;
  const view=(idx)=>{index=(idx+photos.length)%photos.length;const p=photos[index],original=$('img',p);lightImg.src=original.currentSrc||original.src;lightImg.alt=original.alt;caption.textContent=original.alt;};
  const close=()=>{box.hidden=true;document.body.style.overflow='';lightImg.src='';lastFocus?.focus();};
  photos.forEach((p,i)=>p.addEventListener('click',()=>{lastFocus=document.activeElement;view(i);box.hidden=false;document.body.style.overflow='hidden';$('.lightbox-close',box).focus();}));
  $('.lightbox-close',box).addEventListener('click',close);
  $('.lightbox-prev',box).addEventListener('click',()=>view(index-1));
  $('.lightbox-next',box).addEventListener('click',()=>view(index+1));
  box.addEventListener('click',e=>{if(e.target===box)close();});
  addEventListener('keydown',e=>{if(box.hidden)return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')view(index-1);if(e.key==='ArrowRight')view(index+1);});
 }
 // Inquiry: Web3Forms when access key is set; otherwise a transparent mailto fallback.
 const form=$('#inquiry-form');
 if(form){
  const status=$('#form-status'),arr=$('[name=arrival]',form),dep=$('[name=departure]',form);
  const today=new Date(Date.now()-new Date().getTimezoneOffset()*60000).toISOString().slice(0,10);
  arr.min=today;dep.min=today;
  arr.addEventListener('change',()=>{dep.min=arr.value||today;if(dep.value&&dep.value<=arr.value)dep.value='';});
  const pick=new URLSearchParams(location.search).get('apartman');
  if(pick&&/^A-[1-4]$/.test(pick))$('[name=apartment]',form).value=pick;
  const show=(msg,type='')=>{status.textContent=msg;status.className='form-status'+(type?' is-'+type:'');};
  form.addEventListener('submit',async e=>{e.preventDefault();show('');
   if(!form.reportValidity())return show(T.required||'Please complete all required fields.','error');
   if(dep.value<=arr.value){dep.focus();return show(T.invalid_dates||'Invalid dates.','error');}
   const f=new FormData(form);
   if((f.get('botcheck')||'').trim())return;
   const vals=Object.fromEntries(f.entries());
   const detail=[`Name: ${vals.name}`,`Email: ${vals.email}`,`Phone: ${vals.phone||'-'}`,`Apartment: ${vals.apartment==='any'?(T.any||'Any'):vals.apartment}`,`Arrival: ${vals.arrival}`,`Departure: ${vals.departure}`,`Guests: ${vals.guests}`,`Message: ${vals.message||'-'}`].join('\n');
   if(!config.web3formsAccessKey){
    show(T.form_mailto||'Your email app will open.');
    const subject=encodeURIComponent(config.formSubject||'Lucia Apartments inquiry');
    window.location.href=`mailto:${config.recipientEmail||'apartmenthouse.lucia@gmail.com'}?subject=${subject}&body=${encodeURIComponent(detail)}`;
    return;
   }
   const submit=$('button[type=submit]',form);submit.disabled=true;show(T.form_sending||'Sending...');
   try{
    const payload={access_key:config.web3formsAccessKey,subject:config.formSubject||'Lucia inquiry',from_name:'Lucia Apartments website',name:vals.name,email:vals.email,phone:vals.phone||'',apartment:vals.apartment,arrival:vals.arrival,departure:vals.departure,guests:vals.guests,message:vals.message||'',botcheck:''};
    const response=await fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(payload)});
    const result=await response.json();
    if(!response.ok||!result.success)throw new Error(result.message||'Failed');
    form.reset();show(T.form_success||'Inquiry sent.','success');
   }catch(error){show(T.form_error||'Could not send.','error');}finally{submit.disabled=false;}
  });
 }
})();
