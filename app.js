const modal=document.querySelector('#modal');
const openModal=()=>{modal.classList.add('show');modal.setAttribute('aria-hidden','false')};
const closeModal=()=>{modal.classList.remove('show');modal.setAttribute('aria-hidden','true')};
document.querySelectorAll('[data-modal]').forEach(el=>el.addEventListener('click',e=>{e.preventDefault();openModal()}));
document.querySelector('.close').addEventListener('click',closeModal);
modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
document.querySelectorAll('[data-action]').forEach(btn=>btn.addEventListener('click',()=>{alert('شكرًا لثقتكِ في نور — هذه نسخة الواجهة الأولى، وسيتم تجهيز الخطوة التالية قريبًا.');closeModal()}));
document.querySelector('.menu').addEventListener('click',()=>{document.querySelector('.topbar nav').classList.toggle('mobile-nav')});
