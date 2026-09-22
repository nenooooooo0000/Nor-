const modal = document.querySelector('#modal');
const openModal = () => { modal.classList.add('show'); modal.setAttribute('aria-hidden', 'false'); };
const closeModal = () => { modal.classList.remove('show'); modal.setAttribute('aria-hidden', 'true'); };

document.querySelectorAll('[data-modal]').forEach((el) => el.addEventListener('click', (e) => {
  e.preventDefault();
  openModal();
}));
document.querySelector('.close')?.addEventListener('click', closeModal);
modal?.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
document.querySelectorAll('[data-action]').forEach((btn) => btn.addEventListener('click', () => {
  alert('شكرًا لثقتكِ في نور — سيتم تجهيز الخطوة التالية قريبًا.');
  closeModal();
}));
document.querySelector('.menu')?.addEventListener('click', () => {
  document.querySelector('.topbar nav')?.classList.toggle('mobile-nav');
});

/* تنقّل التطبيق السفلي: الرئيسية، البحث، الدردشة، صفحتك */
const style = document.createElement('style');
style.textContent = `
  .app-nav{position:fixed;bottom:0;left:0;right:0;height:74px;background:rgba(255,253,249,.96);backdrop-filter:blur(18px);border-top:1px solid var(--line);display:flex;justify-content:center;gap:clamp(20px,7vw,72px);align-items:center;z-index:15;direction:rtl}
  .app-nav button{background:none;color:var(--muted);font-size:10px;font-weight:700;display:flex;flex-direction:column;align-items:center;gap:3px;min-width:55px}
  .app-nav button span{font-size:22px;line-height:1}.app-nav button.active{color:var(--orange)}
  .app-view{display:none;position:fixed;inset:0 0 74px;background:var(--paper);z-index:14;overflow:auto;padding:34px 22px}.app-view.show{display:block}
  .app-view-inner{width:min(720px,100%);margin:auto}.app-view h1{font-size:34px;margin:10px 0}.app-view p{color:var(--muted);font-size:13px}
  .search-box{display:flex;gap:10px;margin:25px 0}.search-box input,.chat-input input{flex:1;border:1px solid var(--line);border-radius:10px;padding:14px;background:#fff;font:inherit;outline:none}.search-box button,.chat-input button{background:var(--orange);color:#fff;border-radius:10px;padding:0 20px;font-weight:800}
  .search-results{display:grid;gap:12px}.search-result,.chat-card,.profile-card{background:#fff;border:1px solid var(--line);border-radius:12px;padding:17px}.search-result b{display:block;margin-bottom:4px}.search-result span{color:var(--muted);font-size:12px}
  .chat-card{background:var(--cream);min-height:300px}.bubble{width:fit-content;max-width:80%;padding:11px 15px;border-radius:15px;margin:10px 0;font-size:12px}.bubble.bot{background:#fff}.bubble.me{background:var(--orange);color:#fff;margin-right:auto}.chat-input{display:flex;gap:8px;margin-top:15px;height:48px}.chat-input button{border:0}
  .profile-card{display:flex;align-items:center;gap:14px;margin:24px 0}.profile-avatar{width:55px;height:55px;border-radius:16px;background:var(--ink);color:#fff;display:grid;place-items:center;font-size:25px;font-weight:900}.profile-links{display:grid;gap:10px}.profile-links button{background:#fff;border:1px solid var(--line);border-radius:10px;padding:14px;text-align:right;font:inherit;font-size:12px}
  body{padding-bottom:74px}.mobile-nav{display:flex!important;position:absolute;top:82px;right:0;left:0;background:var(--paper);padding:20px;flex-direction:column;gap:12px;border-bottom:1px solid var(--line)}
  @media(min-width:801px){.app-nav{width:520px;left:50%;right:auto;transform:translateX(-50%);border:1px solid var(--line);border-bottom:0;border-radius:18px 18px 0 0}}
`;
document.head.appendChild(style);

const nav = document.createElement('nav');
nav.className = 'app-nav';
nav.setAttribute('aria-label', 'التنقل الرئيسي');
nav.innerHTML = `
  <button class="active" data-view="home"><span>⌂</span>الرئيسية</button>
  <button data-view="search"><span>⌕</span>البحث</button>
  <button data-view="chat"><span>◌</span>الشات</button>
  <button data-view="profile"><span>♙</span>صفحتك</button>`;
document.body.appendChild(nav);

const views = document.createElement('div');
views.innerHTML = `
  <section class="app-view" id="view-search"><div class="app-view-inner"><span class="kicker">اكتشفي محتوى نور</span><h1>إنتِ بتدوري على إيه؟</h1><p>ابحثي عن تمارين، مقالات، أو موضوع يساعدك اليوم.</p><div class="search-box"><input id="site-search" placeholder="اكتبي كلمة مثل: القلق أو النوم"><button id="search-btn">بحث</button></div><div class="search-results"><div class="search-result"><b>تمرين تنفّس في دقيقتين</b><span>أداة سريعة لتهدئة التوتر واستعادة التركيز.</span></div><div class="search-result"><b>كيف نضع حدودًا صحية؟</b><span>خطوات عملية لعلاقات أكثر اتزانًا.</span></div><div class="search-result"><b>روتين هادئ قبل النوم</b><span>نصائح بسيطة تساعد جسمك على الاسترخاء.</span></div></div></div></section>
  <section class="app-view" id="view-chat"><div class="app-view-inner"><span class="kicker">مساحتك الآمنة</span><h1>اتكلمي مع نور</h1><p>محادثة إرشادية أولية — لا تستبدل المختص أو خدمات الطوارئ.</p><div class="chat-card"><div class="bubble bot">أهلًا بيكي 🤍 أنا هنا أسمعك. حابة تبدأي بإيه؟</div><div id="chat-messages"></div></div><div class="chat-input"><input id="chat-text" placeholder="اكتبي رسالتك..."><button id="chat-send">إرسال</button></div></div></section>
  <section class="app-view" id="view-profile"><div class="app-view-inner"><span class="kicker">مساحتك الشخصية</span><h1>صفحتك</h1><p>تابعي رحلتك واحفظي الأدوات المناسبة ليكي.</p><div class="profile-card"><div class="profile-avatar">ن</div><div><b>أهلًا بيكي في نور</b><small style="display:block;color:var(--muted)">أنشئي حسابك لبدء رحلتك</small></div></div><div class="profile-links"><button data-modal="start">♡ ابدئي الاستبيان الأول</button><button data-modal="start">◷ احجزي جلسة تعريفية</button><button>⚙ إعدادات الخصوصية</button></div></div></section>`;
document.body.appendChild(views);

const showView = (name) => {
  document.querySelectorAll('.app-view').forEach((v) => v.classList.remove('show'));
  document.querySelectorAll('.app-nav button').forEach((b) => b.classList.toggle('active', b.dataset.view === name));
  if (name !== 'home') document.querySelector(`#view-${name}`)?.classList.add('show');
};
document.querySelectorAll('.app-nav button').forEach((button) => button.addEventListener('click', () => showView(button.dataset.view)));
document.querySelectorAll('#view-profile [data-modal]').forEach((el) => el.addEventListener('click', openModal));

document.querySelector('#search-btn')?.addEventListener('click', () => {
  const value = document.querySelector('#site-search').value.trim();
  if (value) alert(`هنعرض لكِ نتائج عن: ${value}`);
});
document.querySelector('#chat-send')?.addEventListener('click', () => {
  const input = document.querySelector('#chat-text');
  const text = input.value.trim();
  if (!text) return;
  document.querySelector('#chat-messages').innerHTML += `<div class="bubble me">${text.replace(/[<>]/g, '')}</div><div class="bubble bot">سمعتكِ. خدي نفسًا عميقًا، ويمكنكِ اختيار جلسة مع مختص من صفحة نور.</div>`;
  input.value = '';
});
