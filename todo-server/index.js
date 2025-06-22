/* eslint-disable no-console */
// импорт стандартных библиотек Node.js

// const { existsSync, readFileSync, writeFileSync } = require('fs');
const { createServer } = require('http');
const sqlite3 = require('sqlite3');
// const { AsyncDatabase } = require('promised-sqlite3');

// файл для базы данных дел
// const DB_FILE = 'C:/ProgSqLite/clients1.db';
// const DB_FILE = './db.json';
// import { DatabaseSync } from 'node:sqlite';
// const DB = new DatabaseSync('C:/ProgSqLite/clients1.db');
// const DB = new sqlite3.Database('C:/ProgSqLite/clients1.db');
// const DB_FILE = getBase();
// префикс URI для всех методов приложения
const URI_PREFIX = '/api/todos';
// номер порта, на котором будет запущен сервер
const PORT = 5500;

/**
 * Класс ошибки, используется для отправки ответа с определённым кодом и описанием ошибки
 */
class TodoApiError extends Error {
  constructor(statusCode, data) {
    super();
    this.statusCode = statusCode;
    this.data = data;
  }
}

/**
 * Асинхронно считывает тело запроса и разбирает его как JSON
 * @param {Object} req - Объект HTTP запроса
 * @throws {TodoApiError} Некорректные данные в аргументе
 * @returns {Object} Объект, созданный из тела запроса
 */
function drainJson(req) {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
      // console.log('req', req);
    });
    req.on('end', () => {
      resolve(JSON.parse(data));
      // console.log('req', req);
      console.log('JSON.parse(data)', JSON.parse(data));
    });
  });
}

/**
 * Проверяет входные данные и создаёт из них корректный объект дела
 * @param {Object} data - Объект с входными данными
 * @throws {TodoApiError} Некорректные данные в аргументе (statusCode 422)
 * @returns {{ name: string, tel: string, owner: string, date: string }} Объект дела
 */
function makeTodoItemFromData(data) {
  const errors = [];

  // составляем объект, где есть только необходимые поля
  const todoItem = {
    owner: data.owner && String(data.owner),
    name: data.name && String(data.name),
    tel: data.tel && String(data.tel),
    date: data.date && String(data.date)
  };

  // проверяем, все ли данные корректные и заполняем объект ошибок, которые нужно отдать клиенту
  if (!todoItem.owner) errors.push({ field: 'owner', message: 'Не указан ответственный' });
  if (!todoItem.name) errors.push({ field: 'name', message: 'Не указан заголовок задачи' });
  // if (!todoItem.done) todoItem.done = false;

  // если есть ошибки, то кидаем ошибку с их списком и 422 статусом
  if (errors.length) throw new TodoApiError(422, { errors });

  return todoItem;
}

function getBase() {

  return new Promise((resolve, reject) => {
    const DB = new sqlite3.Database('C:/ProgSqLite/clients1.db');
    DB.all('SELECT * FROM clientele', (err, rows) => {  
      
      if (err) {  
        reject(err.message);  
      };

      resolve(rows); 
          
    }); 
    DB.close();
  });

};
// const getBaseAll = getBase();

function setInBase(data) {
  console.log('data', data);
  console.log('data', data.owner);
  const insertQuery = `INSERT INTO clientele (owner, name, tel, date, id) VALUES (?, ?, ?, ?, ?)`  
  const owner = data.owner;  
  const name = data.name;  
  const tel = data.tel;
  const date = JSON.stringify(data.date);
  const id = (Date.now() % 1000000).toString();
  return new Promise((resolve, reject) => {
    const DB = new sqlite3.Database('C:/ProgSqLite/clients1.db');
    DB.run(insertQuery, [owner, name, tel, date, id], function (err) {  
        if (err) {  
          reject(err.message);  
        } else {  
          DB.close();
          resolve(id);  
        }  
    }); 
    
  });

};


function getBaseFilter(col, field) {
  const DB = new sqlite3.Database('C:/ProgSqLite/clients1.db');
  return new Promise((resolve, reject) => {
    DB.each(`SELECT * FROM clientele WHERE ${col} = ?`, `${field}`,  function(err, row) {  
      if (err) {  
        reject(err.message);  
      };    
      
      resolve(row); 
    });
    DB.close();
  });
};

function pachDataBase(searchId, data) {
  
    
  const owner = data.owner;  
  const name = data.name;  
  const tel = data.tel;
  const date = JSON.stringify(data.date);
  const id = searchId;
  if (data.date.length !== 0) {
    const sql = 'UPDATE clientele SET owner = ?, name = ?, tel = ?, date = ? WHERE id = ?'
    return new Promise((resolve, reject) => {
      const DB = new sqlite3.Database('C:/ProgSqLite/clients1.db');
      DB.run(sql, [owner, name, tel, date, id], function(err) {  
        if (err) {  
          reject(err.message);  
        }; 
        console.log('Запись успешно')
        DB.close();
        resolve(id);  
      });
      
    });
  };
 
};

function deleteDataOfBase(id) {
  const sql = `DELETE FROM clientele WHERE id = ?`;  

  const value = id;
  const DB = new sqlite3.Database('C:/ProgSqLite/clients1.db');
  DB.run(sql, value, function(err) {  
    if (err) {  
      console.log(err.message);  
    };
    console.log('удаление успешно');
  });
  DB.close(); 
};


/**
 * Возвращает список дел из базы данных
 * @param {{ owner: string }} [params] - Фильтр по владельцу дела
 * @returns {{ name: string, tel: string, owner: string, date: string }[]} Массив дел
 */
function getTodoList(allDB, params = {}) {
  // console.log('allDB', allDB);
  let todoList = allDB || '[]';
  // console.log('todoList', todoList);
  // todoList = todoList.filter(({ owner }) => owner === params.owner);
  // console.log('todoList', todoList);
  if (params.owner) return todoList.filter(({ owner }) => owner === params.owner);
  
  console.log('todoList 105', todoList);
  return todoList;
}

/**
 * Создаёт и сохраняет дело в базу данных
 * @throws {TodoApiError} Некорректные данные в аргументе, дело не создано (statusCode 422)
 * @param {Object} data - Данные из тела запроса
 * @returns {{ name: string, tel: string, owner: string, date: string }} Объект дела
 */
async function createTodoItem(data) {
  const id = await setInBase(data);
  const newItem = await getBaseFilter('id', id)
  // newItem.id = (Date.now() % 1000000).toString();
  // setInBase(JSON.stringify(data));
  return newItem;
}

/**
 * Возвращает объект дела по его ID
 * @param {string} itemId - ID дела
 * @throws {TodoApiError} Дело с таким ID не найдено (statusCode 404)
 * @returns {{ name: string, tel: string, owner: string, date: string }} Объект дела
 */
function getTodoItem(itemId) {
  const todoItem = getTodoList().find(({ id }) => id === itemId);
  if (!todoItem) throw new TodoApiError(404, { message: 'TODO Item Not Found' });
  return todoItem;
}

/**
 * Изменяет дело с указанным ID и сохраняет изменения в базу данных
 * @param {string} itemId - ID изменяемого дела
 * @param {{ name: string, tel: string, owner: string, date: string }} data - Объект с изменяемыми данными
 * @throws {TodoApiError} Дело с таким ID не найдено (statusCode 404)
 * @throws {TodoApiError} Некорректные данные в аргументе (statusCode 422)
 * @returns {{ name: string, tel: string, owner: string, date: string }} Объект дела
 */
async function updateTodoItem(itemId, data) {
  // const todoItems = getTodoList();
  // const itemIndex = todoItems.findIndex(({ id }) => id === itemId);
  // if (itemIndex === -1) throw new TodoApiError(404, { message: 'TODO Item Not Found' });
  // Object.assign(todoItems[itemIndex], makeTodoItemFromData({ ...todoItems[itemIndex], ...data }));
  // writeFileSync(DB_FILE, JSON.stringify(todoItems), { encoding: 'utf8' });
  // return todoItems[itemIndex];
  const id = await pachDataBase(itemId, data);
  const newItem = await getBaseFilter('id', id);
  return newItem;
}

/**
 * Удаляет дело из базы данных
 * @param {string} itemId - ID дела
 * @returns {{}}
 */
function deleteTodoItem(itemId) {
  deleteDataOfBase(itemId);
  // const todoItems = getTodoList();
  // const itemIndex = todoItems.findIndex(({ id }) => id === itemId);
  // if (itemIndex === -1) throw new TodoApiError(404, { message: 'TODO Item Not Found' });
  // todoItems.splice(itemIndex, 1);
  // writeFileSync(DB_FILE, JSON.stringify(todoItems), { encoding: 'utf8' });
  return {};
}

// создаём новый файл с базой данных, если он не существует
// if (!existsSync(DB_FILE)) writeFileSync(DB_FILE, '[]', { encoding: 'utf8' });

// создаём HTTP сервер, переданная функция будет реагировать на все запросы к нему
// DB.all('SELECT * FROM clientele', (err, rows) => { 
//   if (err) {  
//     console.error(err.message);  
//   } else {  
//       // console.log(rows); 
//       // rows; 
      
//   } 
createServer(async (req, res) => {
  // req - объект с информацией о запросе, res - объект для управления отправляемым ответом
  // этот заголовок ответа указывает, что тело ответа будет в JSON формате
  res.setHeader('Content-Type', 'application/json');

  // CORS заголовки ответа для поддержки кросс-доменных запросов из браузера
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // запрос с методом OPTIONS может отправлять браузер автоматически для проверки CORS заголовков
  // в этом случае достаточно ответить с пустым телом и этими заголовками
  if (req.method === 'OPTIONS') {
    // end = закончить формировать ответ и отправить его клиенту
    res.end();
    return;
  }

  // если URI не начинается с нужного префикса - можем сразу отдать 404
  if (!req.url || !req.url.startsWith(URI_PREFIX)) {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'Not Found' }));
    return;
  }

  // убираем из запроса префикс URI, разбиваем его на путь и параметры
  const [uri, query] = req.url.substr(URI_PREFIX.length).split('?');
  const queryParams = {};

  // параметры могут отсутствовать вообще или иметь вид a=b&b=c
  // во втором случае наполняем объект queryParams { a: 'b', b: 'c' }
  if (query) {
    for (const piece of query.split('&')) {
      const [key, value] = piece.split('=');
      queryParams[key] = value ? decodeURIComponent(value) : '';
    }
  }

  try {
    // обрабатываем запрос и формируем тело ответа
    const body = await (async () => {
      // console.log('uri', uri);
      if (uri === '' || uri === '/') {
        // /api/todos
        // console.log('newTodoItem');
        if (req.method === 'GET') {
          // let blin = getTodoList(queryParams);
          // 
          let allDB = await getBase();
          console.log('rows', allDB);
          let filterDB = getTodoList(allDB, queryParams)
          return filterDB;
        };
        // if (req.method === 'GET') return getTodoList(queryParams);
        if (req.method === 'POST') {
          const newTodoItem = createTodoItem(await drainJson(req));
          console.log('newTodoItem', newTodoItem);
          res.statusCode = 201;
          res.setHeader('Location', `${URI_PREFIX}/${newTodoItem.id}`);
          return newTodoItem;
        }
      } else {
        // /api/todos/{id}
        // параметр {id} из URI запроса
        const itemId = uri.substr(1);
        if (req.method === 'GET') return getTodoItem(itemId);
        if (req.method === 'PATCH') return updateTodoItem(itemId, await drainJson(req));
        if (req.method === 'DELETE') return deleteTodoItem(itemId);
      }
      return null;
    })();
    res.end(JSON.stringify(body));
  } catch (err) {
    // обрабатываем сгенерированную нами же ошибку
    if (err instanceof TodoApiError) {
      res.writeHead(err.statusCode);
      res.end(JSON.stringify(err.data));
    } else {
      // если что-то пошло не так - пишем об этом в консоль и возвращаем 500 ошибку сервера
      res.statusCode = 500;
      res.end(JSON.stringify({ message: 'Server Error' }));
      console.error(err);
    }
  }
})
// выводим инструкцию, как только сервер запустился...
  .on('listening', () => {
    console.log(`Сервер TODO запущен. Вы можете использовать его по адресу http://localhost:${PORT}`);
    console.log('Нажмите CTRL+C, чтобы остановить сервер');
    console.log('Доступные методы:');
    console.log(`GET ${URI_PREFIX} - получить список дел, query параметр owner фильтрует по владельцу`);
    console.log(`POST ${URI_PREFIX} - создать дело, в теле запроса нужно передать объект { name: string, owner: string, done?: boolean }`);
    console.log(`GET ${URI_PREFIX}/{id} - получить дело по его ID`);
    console.log(`PATCH ${URI_PREFIX}/{id} - изменить дело с ID, в теле запроса нужно передать объект { name?: string, owner?: string, done?: boolean }`);
    console.log(`DELETE ${URI_PREFIX}/{id} - удалить дело по ID`);
  })
// ...и вызываем запуск сервера на указанном порту
  .listen(PORT);
// });
