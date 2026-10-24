# Light website

Самостоятельный статический сайт. Папка E:/Projects/Light-site. Публикация владельцем на GitHub Pages; интеграций хостинга и авторизации в проекте нет.

## Готовые файлы

Готовый сайт хранится в dist/: index.html, assets/, modules/, features/, en/, designs/, sitemap.xml, robots.txt, CNAME и .nojekyll. Для этого репозитория выберите Settings > Pages > Source: GitHub Actions. Затем вручную запустите workflow Publish website manually. Он публикует только dist/, без исходников и документов проекта. Настройка домена — DOMAIN.md.

## Локальная работа

- npm install — установить sharp для экспорта OG.
- npm run build — создать 8 локализованных HTML-страниц и OG PNG.
- npm run check — проверить SEO, изображения, ссылки и данные модулей.
- npm run dev — открыть http://127.0.0.1:4173/.

Публикация не запускается автоматически. Сайт можно просматривать без сборки, сервер раздаёт готовую папку dist/.

## Содержание

Главная, каталог с поиском и фильтрами, 10 основных преимуществ: на русском и английском, отдельные адреса. /designs/ — сравнение вариантов карточек (noindex, вне sitemap). Основной вид — цельные карточки с фоновым знаком языка, совпадающим с обложками IDE. Действия и описание доступны в раскрываемом блоке; установка выполняется внутри Light. Ссылки на установщики не заданы по запросу владельца.

Данные 9 модулей взяты из реестра IDE. Обновить: node sync-registry.mjs E:/Projects/Cds/registry, затем npm run build. Графика и символы модулей хранятся локально; источники и лицензии — dist/assets/modules/README.md. Новые обложки создаёт tools/module-covers.mjs в репозитории IDE.

Макет главной — src/home.html, словари — dist/app.js, остальные страницы — build.mjs. Полный текст обеих локализаций включён в HTML до JS. Язык определяется адресом.

SEO: отдельные title/description, canonical, hreflang, OG и Twitter PNG 1200×630, JSON-LD, sitemap, robots. Домен https://getlight.sherhn.space, контакт sherhn.inc@gmail.com. Реальные снимки Light — assets/light-studio-*.png; пересъёмка: python tools/capture_landing.py --site E:/Projects/Light-site из репозитория IDE.
