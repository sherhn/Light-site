const copy = {
  ru: {
    more:'Подробнее',less:'Свернуть',skip:'К содержимому',title:'Light — открытая IDE',description:'Light — открытая IDE с языковыми модулями, встроенным Git и Linux через WSL.',navFeatures:'Возможности',getLight:'Получить Light',heroLine1:'Открытая IDE',heroLine2:'Гибкость в модулях',heroText:'Языковые модули, Git и Linux<br>в одной среде.',explore:'Посмотреть ближе',featuresLabel:'Возможности',modulesTitle:'Модули',modulesShort:'Языки под задачу.',modulesText:'Подключайте языки, команды запуска и шаблоны прямо в IDE.',gitTitle:'Git',gitShort:'История без переключений.',gitText:'Ветки, diff и коммиты внутри Light. Локальные снимки — даже без Git.',linuxTitle:'Linux',linuxShort:'Прямо в Windows.',linuxText:'Терминал, сборка и запуск через WSL. В контексте вашего проекта.',workbenchLabel:'Рабочая среда',editorTab:'Редактор',modulesTab:'Модули',lightTab:'Светлая тема',documentation:'Документация',downloadLabel:'Скачать Light',downloadTitle:'Скачать Light',architecture:'Процессор',downloadSoon:'Ссылки на скачивание появятся позже.',downloadFor:'Скачать для',feedback:'Обратная связь',backTop:'Наверх',editorAlt:'Light: редактор и встроенный терминал',modulesAlt:'Каталог языковых модулей Light',lightAlt:'Светлая тема Light',navLabel:'Навигация',langLabel:'Язык',platformLabel:'Платформа',screensLabel:'Скриншоты IDE'
  },
  en: {
    more:'Details',less:'Close',skip:'Skip to content',title:'Light — an open-source IDE',description:'Light is an open-source IDE with language modules, built-in Git and Linux through WSL.',navFeatures:'Features',getLight:'Get Light',heroLine1:'An open-source IDE',heroLine2:'Modular by design',heroText:'Language modules, Git and Linux<br>in one workspace.',explore:'Take a closer look',featuresLabel:'Features',modulesTitle:'Modules',modulesShort:'Languages for your work.',modulesText:'Add languages, run commands and project templates right in the IDE.',gitTitle:'Git',gitShort:'History without switching.',gitText:'Branches, diffs and commits inside Light. Local snapshots work without Git, too.',linuxTitle:'Linux',linuxShort:'Right inside Windows.',linuxText:'Terminal, builds and runs through WSL. In your project’s context.',workbenchLabel:'Workspace',editorTab:'Editor',modulesTab:'Modules',lightTab:'Light theme',documentation:'Documentation',downloadLabel:'Get Light',downloadTitle:'Get Light',architecture:'Processor',downloadSoon:'Download links will be added later.',downloadFor:'Download for',feedback:'Feedback',backTop:'Back to top',editorAlt:'Light editor and built-in terminal',modulesAlt:'Light language module catalog',lightAlt:'Light in the light theme',navLabel:'Navigation',langLabel:'Language',platformLabel:'Platform',screensLabel:'IDE screenshots'
  }
};
let language = document.documentElement.lang === 'en' ? 'en' : 'ru';
let platform = /mac/i.test(navigator.platform) ? 'macos' : /linux/i.test(navigator.platform) && !/android/i.test(navigator.userAgent) ? 'linux' : 'windows';
function renderPlatform() {
  const names={windows:'Windows 10 / 11',macos:'macOS 15+',linux:'Ubuntu 22.04+ / Debian 12+'};
  const labels={windows:'Windows',macos:'macOS',linux:'Linux'};
  const architecture=document.querySelector('#architecture').value;
  document.querySelector('#platform-name').textContent=names[platform];
  document.querySelector('#platform-format').textContent=platform==='windows'?'x64 · .exe':platform==='macos'?(architecture==='arm64'?'Apple Silicon':'Intel')+' · .dmg':'x64 · .deb';
  document.querySelector('#architecture-label').hidden=platform!=='macos';
  document.querySelector('#download-button-text').textContent=copy[language].downloadFor+' '+labels[platform];
  document.querySelector('.download-button').title=copy[language].downloadSoon;
  document.querySelectorAll('[data-platform]').forEach(button=>{const active=button.dataset.platform===platform;button.setAttribute('aria-selected',String(active));button.tabIndex=active?0:-1;});
  document.querySelector('#platform-details').setAttribute('aria-labelledby','tab-'+platform);
}
function setLanguage(next) {
  language=next;const t=copy[next];
  document.querySelectorAll('[data-i18n]').forEach(element=>{element.innerHTML=t[element.dataset.i18n];});
  document.querySelectorAll('[data-alt]').forEach(element=>{element.alt=t[element.dataset.alt];});
  document.querySelectorAll('[data-lang]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.lang===next)));
  document.querySelector('nav').setAttribute('aria-label',t.navLabel);
  document.querySelector('.language').setAttribute('aria-label',t.langLabel);
  document.querySelector('.platform-tabs').setAttribute('aria-label',t.platformLabel);
  document.querySelector('.view-tabs').setAttribute('aria-label',t.screensLabel);
  try {localStorage.setItem('light-language',next);} catch {}
  document.querySelectorAll('.feature').forEach(feature=>{feature.querySelector('.feature-toggle').textContent=t[feature.classList.contains('active')?'less':'more'];});
  renderPlatform();
}
document.querySelectorAll('[data-lang]').forEach(button=>button.addEventListener('click',()=>setLanguage(button.dataset.lang)));
document.querySelectorAll('[data-platform]').forEach(button=>button.addEventListener('click',()=>{platform=button.dataset.platform;renderPlatform();}));
document.querySelector('#architecture').addEventListener('change',renderPlatform);
function arrowTabs(container,selector) {
  container.addEventListener('keydown',event=>{
    const tabs=[...container.querySelectorAll(selector)];let index=tabs.indexOf(document.activeElement);
    if(event.key==='ArrowRight')index=(index+1)%tabs.length;else if(event.key==='ArrowLeft')index=(index+tabs.length-1)%tabs.length;else if(event.key==='Home')index=0;else if(event.key==='End')index=tabs.length-1;else return;
    event.preventDefault();tabs[index].click();tabs[index].focus();
  });
}
arrowTabs(document.querySelector('.platform-tabs'),'[data-platform]');
arrowTabs(document.querySelector('.view-tabs'),'[data-view]');
document.querySelectorAll('[data-view]').forEach(button=>button.addEventListener('click',()=>{
  const view=button.dataset.view;
  const stage=document.querySelector('.view-stage');
  stage.classList.remove('is-charging');
  if(!reducedMotion.matches) requestAnimationFrame(()=>requestAnimationFrame(()=>stage.classList.add('is-charging')));
  document.querySelectorAll('[data-view]').forEach(tab=>{const active=tab===button;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;});
  document.querySelectorAll('[data-screen]').forEach(image=>{const active=image.dataset.screen===view;image.classList.toggle('active',active);image.setAttribute('aria-hidden',String(!active));});
  document.querySelector('#view-panel').setAttribute('aria-labelledby',button.id);
}));
document.querySelectorAll('.feature h2>button').forEach(button=>button.addEventListener('click',()=>{
  const selected=button.closest('.feature');const opening=!selected.classList.contains('active');
  document.querySelectorAll('.feature').forEach(feature=>{
    const active=feature===selected&&opening;feature.classList.toggle('active',active);
    feature.querySelector('h2>button').setAttribute('aria-expanded',String(active));
    feature.querySelector('.feature-toggle').textContent=copy[language][active?'less':'more'];
    const panel=feature.querySelector('.feature-panel');panel.setAttribute('aria-hidden',String(!active));panel.inert=!active;
  });
}));
document.querySelector('.view-stage').addEventListener('animationend',event=>{if(event.animationName==='lightning-echo')event.currentTarget.classList.remove('is-charging');});
setLanguage(language);
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
let revealObserver;
if('IntersectionObserver' in window) {
  revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}}),{threshold:.08,rootMargin:'0px 0px -24px 0px'});
  document.querySelectorAll('.reveal').forEach(element=>revealObserver.observe(element));
  document.documentElement.dataset.motion='on';
}
let scrollQueued=false;
function updateScroll() {
  scrollQueued=false;
  const root=document.documentElement;
  root.style.setProperty('--shot-shift',reducedMotion.matches?'0px':Math.min(scrollY*.045,30)+'px');
}
addEventListener('scroll',()=>{if(!scrollQueued){scrollQueued=true;requestAnimationFrame(updateScroll);}},{passive:true});
addEventListener('resize',updateScroll);
reducedMotion.addEventListener('change',updateScroll);
updateScroll();
