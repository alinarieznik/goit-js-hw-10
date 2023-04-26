Task - country search
Create a front-end part of the application to search for information about countries by their partial or full names. Check out the demo video of the app.

HTTP requests
Use the public API Rest Countries, namely resource name, which returns an array of country objects that match the search criteria. Add at least some decoration to the interface elements.

Write a function, fetchCountries(name), that makes an HTTP request to resource name and returns a promise with an array of countries - the result of your request. Move it to a separate file called fetchCountries.js and make a named export.

Field filtering
The back-end returns objects with some properties most of which you do not need. To reduce the amount of data transferred, add a string of request parameters - this is how this back-end implements field filtering. Check out the filter syntax documentation.

You only need the following properties:

name.official - full name of the country
capital - capital
population - population
flags.svg - link to flag images
languages - array of languages
Search box
The user enters the name of the country to search for in the input#search-box text field. HTTP requests are made by typing the country name, that is, on the input event. However, you cannot make a request every time a key is pressed, since many requests will be made at the same time, and they will be executed in an unpredictable order.

It is necessary to use the Debounce technique on the event handler and make an HTTP request 300ms after the user has stopped typing text. Use the lodash.debounce package.

If the user clears the search box completely, the HTTP request is not executed, and the country list markup or country information disappears.

Sanitize the entered line using the trim() method, which will solve the problem when there are only spaces in the input field or at the beginning/end of the line.

Interface
If the back-end returns more than 10 countries, a notification appears in the interface saying that the name should be more specific. For notifications, use the notiflix library and display this line: "Too many matches found. Please enter a more specific name.".

Too many matches alert

If the back-end returns from 2 to 10 countries, a list of found countries is displayed under the text field. Each list item consists of a flag and country name.

Country list UI

If the request results in an array with one country, the interface displays the card markup with information about the country: flag, name, capital, population and languages.

Country info UI

ATTENTION
It is enough for the app to work for most countries. Some countries, such as Sudan, can be problematic because the name of the country is part of the name of another country, South Sudan. Do not worry about these exceptions.

Error handling
If the user enters the name of a country that does not exist, the back-end will return not an empty array, but an error with the status code 404 - not found. If you do not handle this, the user will never know that the search has not returned any results. Add a notification, "Oops, there is no country with that name"`, in case of an error using the notiflix library.

Error alert

ATTENTION
Remember that fetch does not treat 404 as an error, so you need to explicitly reject the promise in order to catch and handle the error.


# Parcel template

Этот проект был создан при помощи Parcel. Для знакомства и настройки
дополнительных возможностей [обратись к документации](https://parceljs.org/).

## Подготовка нового проекта

1. Убедись что на компьютере установлена LTS-версия Node.js.
   [Скачай и установи](https://nodejs.org/en/) её если необходимо.
2. Склонируй этот репозиторий.
3. Измени имя папки с `parcel-project-template` на имя своего проекта.
4. Создай новый пустой репозиторий на GitHub.
5. Открой проект в VSCode, запусти терминал и свяжи проект с GitHub-репозиторием
   [по инструкции](https://docs.github.com/en/get-started/getting-started-with-git/managing-remote-repositories#changing-a-remote-repositorys-url).
6. Установи зависимости проекта в терминале командой `npm install` .
7. Запусти режим разработки, выполнив команду `npm start`.
8. Перейди в браузере по адресу [http://localhost:1234](http://localhost:1234).
   Эта страница будет автоматически перезагружаться после сохранения изменений в
   файлах проекта.

## Файлы и папки

- Все паршалы файлов стилей должны лежать в папке `src/sass` и импортироваться в
  файлы стилей страниц. Например, для `index.html` файл стилей называется
  `index.scss`.
- Изображения добавляй в папку `src/images`. Сборщик оптимизирует их, но только
  при деплое продакшн версии проекта. Все это происходит в облаке, чтобы не
  нагружать твой компьютер, так как на слабых машинах это может занять много
  времени.

## Деплой

Для настройки деплоя проекта необходимо выполнить несколько дополнительных шагов
по настройке твоего репозитория. Зайди во вкладку `Settings` и в подсекции
`Actions` выбери выбери пункт `General`.

![GitHub actions settings](./assets/actions-config-step-1.png)

Пролистай страницу до последней секции, в которой убедись что выбраны опции как
на следующем изображении и нажми `Save`. Без этих настроек у сборки будет
недостаточно прав для автоматизации процесса деплоя.

![GitHub actions settings](./assets/actions-config-step-2.png)

Продакшн версия проекта будет автоматически собираться и деплоиться на GitHub
Pages, в ветку `gh-pages`, каждый раз когда обновляется ветка `main`. Например,
после прямого пуша или принятого пул-реквеста. Для этого необходимо в файле
`package.json` отредактировать поле `homepage` и скрипт `build`, заменив
`your_username` и `your_repo_name` на свои, и отправить изменения на GitHub.

```json
"homepage": "https://your_username.github.io/your_repo_name/",
"scripts": {
  "build": "parcel build src/*.html --public-url /your_repo_name/"
},
```

Далее необходимо зайти в настройки GitHub-репозитория (`Settings` > `Pages`) и
выставить раздачу продакшн версии файлов из папки `/root` ветки `gh-pages`, если
это небыло сделано автоматически.

![GitHub Pages settings](./assets/repo-settings.png)

### Статус деплоя

Статус деплоя крайнего коммита отображается иконкой возле его идентификатора.

- **Желтый цвет** - выполняется сборка и деплой проекта.
- **Зеленый цвет** - деплой завершился успешно.
- **Красный цвет** - во время линтинга, сборки или деплоя произошла ошибка.

Более детальную информацию о статусе можно посмотреть кликнув по иконке, и в
выпадающем окне перейти по ссылке `Details`.

![Deployment status](./assets/status.png)

### Живая страница

Через какое-то время, обычно пару минут, живую страницу можно будет посмотреть
по адресу указанному в отредактированном свойстве `homepage`. Например, вот
ссылка на живую версию для этого репозитория
[https://goitacademy.github.io/parcel-project-template](https://goitacademy.github.io/parcel-project-template).

Если открывается пустая страница, убедись что во вкладке `Console` нет ошибок
связанных с неправильными путями к CSS и JS файлам проекта (**404**). Скорее
всего у тебя неправильное значение свойства `homepage` или скрипта `build` в
файле `package.json`.

## Как это работает

![How it works](./assets/how-it-works.png)

1. После каждого пуша в ветку `main` GitHub-репозитория, запускается специальный
   скрипт (GitHub Action) из файла `.github/workflows/deploy.yml`.
2. Все файлы репозитория копируются на сервер, где проект инициализируется и
   проходит сборку перед деплоем.
3. Если все шаги прошли успешно, собранная продакшн версия файлов проекта
   отправляется в ветку `gh-pages`. В противном случае, в логе выполнения
   скрипта будет указано в чем проблема.
