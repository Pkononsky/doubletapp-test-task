# doubletapp-test-task

https://doubletapp-pkononsky.herokuapp.com/

для запуска:
создать базу данных PostgreSQL (например облачную ElephantSQL) и изменить соответствующие значения sequelizeOptions в файлах папки config,
добавить переменную окружения TAP_PASSWORD со значением пароля от бд

для запуска локально:

выполнить команды:

npm i

npm run dev


для запуска на heroku:

заменить doubletapp-pkononsky в package.json на другое желаемое название

выполнить команды:

npm i

npm run build

npm run heroku-init

npm run heroku
