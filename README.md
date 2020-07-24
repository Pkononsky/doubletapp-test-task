# doubletapp-test-task

https://doubletapp-pkononsky.herokuapp.com/

для запуска:
создать базу данных PostgreSQL (например облачную ElephantSQL) и изменить соответствующие значения sequelizeOptions в файлах папки config,
добавить переменную окружения TAP_PASSWORD со значением пароля от БД

для запуска локально:

выполнить команды:

npm i

npm run dev

для запуска на heroku:

установить и запустить - VirtualBox и Docker ToolBox 

заменить doubletapp-pkononsky в package.json на другое желаемое название

выполнить команды:

npm i

heroku config:set TAP_PASSWORD=*пароль от БД*

npm run build

npm run heroku-init

npm run heroku
