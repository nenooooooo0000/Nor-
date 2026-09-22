const modal = document.querySelector('#modal');
const openModal = () => { modal?.classList.add('show'); modal?.setAttribute('aria-hidden', 'false'); };
const closeModal = () => { modal?.classList.remove('show'); modal?.setAttribute('aria-hidden', 'true'); };

document.querySelectorAll('[data-modal]').forEach((el) => el.addEventListener('click', (e) => { e.preventDefault(); openModal(); }));
document.querySelector('.close')?.addEventListener('click', closeModal);
modal?.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
document.querySelectorAll('[data-action]').forEach((btn) => btn.addEventListener('click', () => {
  alert('شكرًا لثقتكِ في فضفه — سيتم تجهيز الخطوة التالية قريبًا.');
  closeModal();
}));
document.querySelector('.menu')?.addEventListener('click', () => document.querySelector('.topbar nav')?.classList.toggle('mobile-nav'));

/* تنقّل التطبيق السفلي */
const style = document.createElement('style');
style.textContent = `
.app-nav{position:fixed;bottom:0;left:0;right:0;height:74px;background:#fff;backdrop-filter:blur(18px);border-top:2px solid #111;display:flex;justify-content:center;gap:clamp(20px,7vw,72px);align-items:center;z-index:15;direction:rtl}
.app-nav button{background:none;color:#111;font-size:10px;font-weight:700;display:flex;flex-direction:column;align-items:center;gap:3px;min-width:55px;padding:8px 10px;border:2px solid transparent;border-radius:12px;transition:.2s}.app-nav button span{font-size:22px;line-height:1}.app-nav button.active{color:#fff;background:#111;border-color:#111}
.app-view{display:none;position:fixed;inset:0 0 74px;background:#fff;z-index:14;overflow:auto;padding:34px 22px}.app-view.show{display:block}.app-view-inner{width:min(720px,100%);margin:auto}.app-view h1{font-size:34px;margin:10px 0}.app-view p{color:#5f6368;font-size:13px}.search-box{display:flex;gap:10px;margin:25px 0}.search-box input,.chat-input input{flex:1;border:2px solid #111;border-radius:12px;padding:14px 16px;background:#fff;font:inherit;outline:none}.search-box button,.chat-input button{background:#111;color:#fff;border:2px solid #111;border-radius:12px;padding:0 20px;font-weight:800}.search-results{display:grid;gap:12px}.search-result,.chat-card,.profile-card{background:#fff;border:2px solid #111;border-radius:12px;padding:17px;box-shadow:4px 4px 0 #f3a06d}.search-result b{display:block;margin-bottom:4px}.search-result span{color:#5f6368;font-size:12px}.chat-card{background:#f5f5f5;min-height:300px;padding:18px}.bubble{width:fit-content;max-width:80%;padding:11px 15px;border:2px solid #111;border-radius:15px;margin:10px 0;font-size:12px}.bubble.bot{background:#fff}.bubble.me{background:#111;color:#fff;margin-right:auto}.chat-input{display:flex;gap:8px;margin-top:15px;height:48px}.profile-card{display:flex;align-items:center;gap:14px;margin:24px 0}.profile-avatar{width:55px;height:55px;border-radius:16px;background:#111;color:#fff;border:2px solid #111;display:grid;place-items:center;font-size:25px;font-weight:900}.profile-links{display:grid;gap:10px}.profile-links button{background:#fff;border:2px solid #111;border-radius:10px;padding:14px;text-align:right;font:inherit;font-size:12px}.mobile-nav{display:flex!important;position:absolute;top:82px;right:0;left:0;background:#fff;padding:20px;flex-direction:column;gap:12px;border-bottom:2px solid #111}body{padding-bottom:74px}@media(min-width:801px){.app-nav{width:520px;left:50%;right:auto;transform:translateX(-50%);border-radius:18px 18px 0 0}}
`;
document.head.appendChild(style);

const nav = document.createElement('nav');
nav.className = 'app-nav';
nav.setAttribute('aria-label', 'التنقل الرئيسي');
nav.innerHTML = `<button class="active" data-view="home"><span>⌂</span>الرئيسية</button><button data-view="search"><span>⌕</span>البحث</button><button data-view="chat"><span>◌</span>الشات</button><button data-view="profile"><span>♙</span>صفحتك</button>`;
document.body.appendChild(nav);

const views = document.createElement('div');
views.innerHTML = `
<section class="app-view" id="view-search"><div class="app-view-inner"><span class="kicker">اكتشفي محتوى فضفه</span><h1>إنتِ بتدوري على إيه؟</h1><p>ابحثي عن تمارين أو معلومات تساعدك اليوم.</p><div class="search-box"><input id="site-search" placeholder="اكتبي كلمة مثل: القلق أو النوم"><button id="search-btn">بحث</button></div><div class="search-results"><div class="search-result"><b>تمرين تنفّس في دقيقتين</b><span>أداة بسيطة لتهدئة التوتر واستعادة التركيز.</span></div><div class="search-result"><b>كيف نضع حدودًا صحية؟</b><span>خطوات عملية لعلاقات أكثر اتزانًا.</span></div><div class="search-result"><b>روتين هادئ قبل النوم</b><span>معلومات عامة تساعد على الاسترخاء.</span></div></div></div></section>
<section class="app-view" id="view-chat"><div class="app-view-inner"><span class="kicker">مساحتك الآمنة</span><h1>اتكلمي مع فضفه</h1><p>مساعد تثقيفي أولي، لا يشخّص ولا يستبدل المختص أو خدمات الطوارئ.</p><div class="chat-card"><div class="bubble bot">أهلًا بيكي 🤍 أنا هنا أسمعك وأساعدك تفهمي اللي بتمري به. تحبي تحكيلي إيه اللي مضايقك؟</div><div id="chat-messages"></div></div><div class="chat-input"><input id="chat-text" placeholder="اكتبي رسالتك..."><button id="chat-send">إرسال</button></div></div></section>
<section class="app-view" id="view-profile"><div class="app-view-inner"><span class="kicker">مساحتك الشخصية</span><h1>صفحتك</h1><p>تابعي رحلتك واحفظي الأدوات المناسبة ليكي.</p><div class="profile-card"><div class="profile-avatar">ف</div><div><b>أهلًا بيكي في فضفه</b><small style="display:block;color:#5f6368">أنشئي حسابك لبدء رحلتك</small></div></div><div class="profile-links"><button data-modal="start">♡ ابدئي الاستبيان الأول</button><button data-modal="start">◷ احجزي جلسة تعريفية</button><button>⚙ إعدادات الخصوصية</button></div></div></section>`;
document.body.appendChild(views);

const showView = (name) => { document.querySelectorAll('.app-view').forEach((v) => v.classList.remove('show')); document.querySelectorAll('.app-nav button').forEach((b) => b.classList.toggle('active', b.dataset.view === name)); if (name !== 'home') document.querySelector(`#view-${name}`)?.classList.add('show'); };
document.querySelectorAll('.app-nav button').forEach((button) => button.addEventListener('click', () => showView(button.dataset.view)));
document.querySelectorAll('#view-profile [data-modal]').forEach((el) => el.addEventListener('click', (e) => { e.preventDefault(); openModal(); }));

document.querySelector('#search-btn')?.addEventListener('click', () => { const value = document.querySelector('#site-search').value.trim(); if (value) alert(`ابحثي في المحتوى عن: ${value}`); });

/* ردود تثقيفية محلية: ليست تشخيصًا ولا بديلًا عن نظام ذكاء اصطناعي أو مختص */
const crisisPattern = /(انتحار|أنتحر|اقتل نفسي|أقتل نفسي|إيذاء نفسي|أأذي نفسي|أذى نفسي|مش عايز أعيش|مش عايزة أعيش|أموت|قتل شخص|أؤذي حد|أذي حد)/i;
const getSupportReply = (text) => {
  const t = text.toLowerCase();
  if (crisisPattern.test(t)) return 'أنا آسفة إنك بتمري بألم شديد. سلامتك أهم شيء الآن: ابعدي عن أي وسيلة ممكن تؤذيك، وما تفضليش لوحدك—كلمي شخصًا بالغًا أو شخصًا تثقين به فورًا. لو الخطر قريب أو لا تستطيعين ضمان سلامتك، اتصلي بالطوارئ المحلية أو توجهي لأقرب قسم طوارئ الآن. هل أنتِ في خطر فوري حاليًا؟';
  if (/قلق|متوتر|توتر|خوف|قلقان/.test(t)) return 'القلق هو استجابة تنبيه طبيعية، لكنه قد يصبح مرهقًا عندما يستمر أو يعطل يومك. جرّبي الآن زفيرًا أطول من الشهيق لخمس مرات، وسمّي 5 أشياء ترينها حولك. الأعراض قد تشبه حالات أخرى، لذلك لا أستطيع التشخيص من الدردشة. منذ متى تشعرين بهذا، وهل يؤثر على نومك أو دراستك؟';
  if (/اكتئاب|حزين|حزن|فقدت الشغف|مش مبسوط|يأس/.test(t)) return 'الحزن وفقدان الطاقة قد يحدثان مع ضغوط أو فقد أو اكتئاب، ولا يكفيان وحدهما للتشخيص. لو استمر الشعور أسبوعين أو أكثر، أو أثّر على نومك وأكلك وعلاقاتك، من الأفضل التحدث مع مختص. إلى جانب ذلك، اختاري خطوة صغيرة اليوم: وجبة، ضوء شمس، أو رسالة لشخص موثوق. إيه أكثر شيء تغيّر عندك مؤخرًا؟';
  if (/نوم|مش بنام|أرق|نومي/.test(t)) return 'اضطراب النوم قد يرتبط بالتوتر أو عادات النوم أو أسباب صحية أخرى. حاولي تثبيت وقت الاستيقاظ، تقليل الكافيين مساءً، وإبعاد الشاشة قبل النوم بقليل. إذا استمر أو أثّر في يومك، استشيري طبيبًا أو مختصًا. كم ساعة تنامين عادة؟';
  if (/هل أنا|عندي|اضطراب|تشخيص|مصاب|مصابة/.test(t)) return 'أفهم رغبتك في معرفة السبب، لكن لا يمكن تأكيد تشخيص من خلال الدردشة. الأعراض قد تتشابه بين أكثر من حالة، ويحتاج الأمر تقييمًا من مختص يسأل عن المدة والتأثير والسياق. ما الأعراض الأساسية، ومنذ متى بدأت؟';
  if (/دواء|حبوب|مضاد|جرعة|أوقف/.test(t)) return 'أقدر أشرح معلومات عامة عن الدواء، لكن لا أصف جرعة ولا أنصح بإيقافه أو تغييره دون الطبيب أو الصيدلي. اكتبي اسم المادة أو الدواء وسأوضح استخداماته العامة وآثاره الشائعة والتحذيرات المعروفة.';
  if (/علاقة|أهلي|أسرتي|صديقي|وحدة|لوحدي/.test(t)) return 'مشاعرك مفهومة، والمشكلات الاجتماعية قد تكون مرهقة فعلًا. من المفيد تحديد ما تحتاجينه بوضوح واختيار شخص آمن للكلام معه، مع وضع حد صغير قابل للتنفيذ. ما الموقف الذي حدث، وما الذي تتمنين أن يتغير؟';
  if (text.length < 12) return 'أنا معاكي. ممكن تحكيلي شوية أكتر عن شعورك، إمتى بيظهر، وبيأثر على يومك إزاي؟';
  return 'شكرًا إنك شاركتيني. أقدر أساعدك نفهم المشاعر والمعلومات المرتبطة بها، لكن لا أستطيع التشخيص أو استبدال المختص. ما أكثر جزء يضغط عليك الآن، وهل يوجد خطر فوري على سلامتك؟';
};

document.querySelector('#chat-send')?.addEventListener('click', () => {
  const input = document.querySelector('#chat-text'); const text = input.value.trim(); if (!text) return;
  const safe = text.replace(/[<>]/g, ''); const reply = getSupportReply(text).replace(/[<>]/g, '');
  document.querySelector('#chat-messages').innerHTML += `<div class="bubble me">${safe}</div><div class="bubble bot">${reply}</div>`;
  input.value = ''; document.querySelector('.chat-card').scrollTop = document.querySelector('.chat-card').scrollHeight;
});
document.querySelector('#chat-text')?.addEventListener('keydown', (e) => { if (e.key === 'Enter') document.querySelector('#chat-send').click(); });
