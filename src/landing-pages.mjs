export const landingPages = ['modular', 'editor', 'workspace'];
const content = {
  ru: {
    modular: {
      meta: ['Модульная IDE Light — подключайте нужные языки и инструменты', 'Соберите Light под свой проект: модули Python, C/C++, Lisp, веба и документов. Подключайте языки, команды запуска и шаблоны в одной IDE.'],
      label: 'Модульная IDE', title: ['Ваш проект.', 'Ваш набор.'], intro: 'Подключайте то, с чем работаете. Языки, команды и шаблоны приходят вместе с модулем.',
      image: 'modules', alt: 'Каталог языковых модулей в Light', caption: 'Модули внутри Light',
      points: [['Язык — целиком', 'Подсветка, структура файла и команды запуска в одном модуле.'], ['Включайте по делу', 'Устанавливайте, обновляйте и отключайте модули прямо в IDE.'], ['Основа уже есть', 'Редактор, проекты, Git и терминал работают независимо от языковых модулей.']],
      end: 'С чего начнёте?', action: 'Выбрать модули', target: 'modules', motif: ['Python', 'C / C++', 'Lisp', 'Web', 'Markdown']
    },
    editor: {
      meta: ['Редактор кода Light — навигация, структура и предпросмотр', 'Редактируйте код в Light: поиск по проекту, переход к определению, структура файла, сворачивание блоков и предпросмотр Markdown и reStructuredText.'],
      label: 'Редактор кода', title: ['Место', 'для мысли.'], intro: 'Код в центре. Структура, поиск и навигация помогают удерживать контекст.',
      image: 'light', alt: 'Светлая тема редактора Light с реальным проектом', caption: 'Редактор Light · светлая тема',
      points: [['Найдите нужное', 'Поиск по проекту, переход к определению и поиск использований.'], ['Держите структуру', 'Контур файла и сворачивание блоков помогают ориентироваться в коде.'], ['Смотрите результат', 'Markdown и reStructuredText с предпросмотром рядом с исходным текстом.']],
      end: 'Настройтесь на работу.', action: 'Получить Light', target: '#download', motif: ['Ctrl + B', 'К определению', 'Ctrl + Space', 'Дополнение кода']
    },
    workspace: {
      meta: ['Light IDE — Git, терминал и Linux через WSL в одной среде', 'От редактирования до коммита в Light: встроенный Git, терминал, локальные снимки, сценарии запуска и Linux через WSL на Windows.'],
      label: 'Рабочая среда', title: ['Меньше', 'переключений.'], intro: 'Редактор, терминал и история проекта рядом. От первого изменения до следующего коммита.',
      image: 'dark', alt: 'Редактор и встроенный терминал в тёмной теме Light', caption: 'Настоящий интерфейс Light · редактор и терминал',
      points: [['Код и запуск рядом', 'Встроенный терминал, команды модулей и собственные сценарии проекта.'], ['Изменения под рукой', 'Ветки, diff и коммиты. Локальные снимки позволяют вернуться к сохранённому состоянию даже без Git.'], ['Linux из Windows', 'Сборка, запуск и инструменты Linux в рабочей среде через WSL.']],
      end: 'Останьтесь в потоке.', action: 'Получить Light', target: '#download', motif: ['Код', 'Запуск', 'Diff', 'Коммит']
    }
  },
  en: {
    modular: {
      meta: ['Light modular IDE — add the languages and tools you need', 'Shape Light around your project with Python, C/C++, Lisp, web and document modules. Add languages, run commands and templates in one IDE.'],
      label: 'Modular IDE', title: ['Your project.', 'Your toolkit.'], intro: 'Add what you work with. Languages, commands and templates come together in a module.',
      image: 'modules', alt: 'Language module catalog inside Light', caption: 'Modules inside Light',
      points: [['A complete language module', 'Highlighting, file outlines and run commands in one module.'], ['Choose what you need', 'Install, update and disable modules inside the IDE.'], ['The essentials stay', 'The editor, projects, Git and terminal work independently of language modules.']],
      end: 'Where will you start?', action: 'Choose your modules', target: 'modules', motif: ['Python', 'C / C++', 'Lisp', 'Web', 'Markdown']
    },
    editor: {
      meta: ['Light code editor — navigation, outlines and document preview', 'Edit code in Light with project search, go to definition, file outlines, block folding and side-by-side Markdown and reStructuredText preview.'],
      label: 'Code editor', title: ['Space', 'to think.'], intro: 'Keep code at the center. Outlines, search and navigation help you hold the context.',
      image: 'light', alt: 'Light editor in the light theme with a real project', caption: 'Light editor · light theme',
      points: [['Find your place', 'Project search, go to definition and find usages.'], ['See the structure', 'File outlines and block folding help you navigate your code.'], ['See the result', 'Markdown and reStructuredText previews alongside the source.']],
      end: 'Settle into your work.', action: 'Get Light', target: '#download', motif: ['Ctrl + B', 'Go to definition', 'Ctrl + Space', 'Code completion']
    },
    workspace: {
      meta: ['Light IDE — Git, terminal and Linux through WSL in one workspace', 'From editing to commits in Light: integrated Git, terminal, local snapshots, run scenarios and Linux through WSL on Windows.'],
      label: 'Workspace', title: ['Fewer', 'switches.'], intro: 'Your editor, terminal and project history together. From the first change to the next commit.',
      image: 'dark', alt: 'Code editor and integrated terminal in the Light dark theme', caption: 'The real Light interface · editor and terminal',
      points: [['Write and run', 'An integrated terminal, module commands and your own project run scenarios.'], ['Keep changes close', 'Branches, diffs and commits. Local snapshots restore saved states even without Git.'], ['Linux on Windows', 'Build, run and use Linux tools in your workspace through WSL.']],
      end: 'Stay in your flow.', action: 'Get Light', target: '#download', motif: ['Code', 'Run', 'Diff', 'Commit']
    }
  }
};
export function addLandingMeta(meta) {
  for (const lang of ['ru', 'en']) for (const page of landingPages) meta[lang][page] = content[lang][page].meta;
}
export function landingTitles(lang, page) { return content[lang][page].title; }
export function landingLinks(lang, url) {
  return `<div class="landing-links" aria-label="${lang==='ru'?'Подробнее о Light':'Explore Light'}">${landingPages.map(p=>`<a href="${url(lang,p)}">${content[lang][p].label}</a>`).join('')}</div>`;
}
export function landing(lang, page, url) {
  const c=content[lang][page];
  const href=c.target==='#download'?url(lang)+'#download':url(lang,c.target);
  return `<main id="main" class="landing landing-${page}"><section class="wrap landing-hero"><p class="eyebrow">Light / ${c.label}</p><h1><span>${c.title[0]}</span><em>${c.title[1]}</em></h1><div class="landing-baseline"><p>${c.intro}</p><a class="landing-cta" href="${href}">${c.action}</a></div></section><div class="wrap landing-motif" aria-hidden="true">${c.motif.map(t=>`<span>${t}</span>`).join('')}</div><figure class="wrap landing-screen"><div><img src="/assets/light-studio-${c.image}.png" alt="${c.alt}" width="1440" height="900" fetchpriority="high"></div><figcaption>${c.caption}</figcaption></figure><section class="wrap landing-benefits" aria-label="${lang==='ru'?'Преимущества':'Benefits'}">${c.points.map(([title,text])=>`<article><h2>${title}</h2><p>${text}</p></article>`).join('')}</section><section class="wrap landing-end"><h2>${c.end}</h2><a class="landing-cta" href="${href}">${c.action}</a><p>${lang==='ru'?'Открытый код. Лицензия MIT.':'Open source. MIT licensed.'}</p></section><aside class="wrap landing-related"><p class="eyebrow">${lang==='ru'?'Ещё о Light':'More about Light'}</p><div>${landingPages.filter(p=>p!==page).map(p=>`<a href="${url(lang,p)}">${content[lang][p].label}</a>`).join('')}<a href="${url(lang,'features')}">${lang==='ru'?'Все возможности':'All features'}</a></div></aside></main>`;
}
