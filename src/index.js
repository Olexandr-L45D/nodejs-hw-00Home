const message = 'Hello world';

console.log(message);
import path from 'node:path';
// path.basename('C:\\temp\\myfile.html');
// path.posix.basename('/tmp/myfile.html');
// Returns: 'myfile.html'

// приклад для побудови шляху з його частин
const somePath = path.join('some_folder', 'some_file.txt');
// somePath буде 'some_folder/some_file.txt' на MacOs

// somePath буде 'some_folder\\some_file.txt' на Windows
// метод cwd() із глобальною змінною process виведе абсолютний шлях до папки, де він запущений.
// приклад для побудови шляху із його частин
const pathToWorkDir = path.join(process.cwd()); // отримуємо шлях до кореневої директорії викликом метода process.cwd()
const pathToFile = path.join(pathToWorkDir, 'some_folder', 'some_file.txt'); // розширюємо шлях додатковими елементами

// pathToFile на Windows буде __шлях до папки, де запущений процес__\\some_folder\\some_file.txt'
// path.parse(path) Дозволяє отримати інформацію по шляху, який був переданий аргументом
path.parse('C:\\\\path\\\\dir\\\\file.txt');
// { root: 'C:\\\\',
//   dir: 'C:\\\\path\\\\dir',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file' }
path.format({
    dir: 'C:\\path\\dir',
    base: 'file.txt',
});
// Returns: 'C:\\path\\dir\\file.txt'
path.isAbsolute('//server');    // true
path.isAbsolute('\\\\server');  // true
path.isAbsolute('C:/foo/..');   // true
path.isAbsolute('C:\\foo\\..'); // true
// The path.normalize() method normalizes the given path, resolving '..' and '.' segments.
path.normalize('C:\\temp\\\\foo\\bar\\..\\');
// Returns: 'C:\\temp\\foo\\'
// синхронна функція потрібна щоб разово !!! зчитати конфігурацію перед запуском додатка
//  і вона звичпайна не колбек і має допис в назві функції - Sync (тормозить виконання всих інших)
import fs from 'node:fs';

const fileConten = fs.readFileSync('path_to_file');
// асинхронна функція має колбек-функцію, вона не буде блокуючою і швидкодію додатка знижувати не буде.
// Методи в Node.js мають контракт error first - callback last. !!!!
// Цей варіант буде працювати в декілька разів швидше, ніж варіант із промісами (дивіться нижче).
fs.readFile('path_to_file', (err, fileContent) => {
    /* ваш код */
});
// варіант із промісами (дивіться нижче)
// fs.readFile('path_to_file', (err, fileContent) => {
//     someOtherFunctionWithCallback(fileContent, (err, data) => {
//         anotherFunctionWithCallback(data, () => {....})
// }
// });
// Модуль fs дає можливості для роботи з файловою системою
import fs from 'node:fs/promises';

const fileContents = await fs.readFile('path_to_file');
// A am write to name bot das not to be lihgt!
//Attantions!!! - promises у шляху - 'node:fs/promises'. Цей варіант використовується найбільш часто в написанні продуктового коду,
// оскільки він дає читабельність на рівні синхронного коду, але не є блокуючим!
//NEXT MODULE - To Buffer
// Біт — це 1 або 0
// Байт — це набір із 8 бітів
// Розуміючи це, ми тепер можемо сказати, що Buffer — це такий собі масив байтів (array of bytes).
const buffer = await fs.readFile('hello.txt');
// припустимо, що в файлі hello.txt був текст Hello World!

console.log(buffer);
///<Buffer 48 65 6c 6c 6f 20 57 6f 72 6c 64 21>
// Для кодування тексту найпоширенішим форматом є UTF - 8
// Тому щоб потім при зчитуванні привести буфер до рядка, ми можемо викликати у нього метод toString(),
// вказавши у дужках кодування: ("utf-8")
console.log(buffer.toString("utf-8"));
/// Hello World!
