//Угадай число
function guessNumber() {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    console.log("Загаданное число:", randomNumber);
    let guess;
    let attempts = 0;
    while (true) {
        guess = prompt("Угадай число от 1 до 100 :");
        if (guess === null) {
        alert("Игра завершена. Приходи еще!");
        break;
        }
        guess = parseInt(guess);
        if (isNaN(guess)) {
            alert("Введи число и поймай удачу за хвост!");
            continue;
        }
        attempts++;
        
        if (guess < randomNumber) {
            alert("Не угадал. Загаданное число больше. Не отчаивайся, попробуй еще раз!");
        }
        else if (guess > randomNumber) {
            alert("Не угадал. Загаданное число меньше. Не отчаивайся, попробуй еще раз!");
        }
        else {
            alert(`Ура! Ты супер! Угадал число с ${attempts} раза.`);
            break;
        }
    }
}

//Простая арифметика
function simpleArithmetic() {
    const operators = ['+', '-', '*', '/'];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    // Генерация случайных чисел для задачи
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;

    // Формируем задачу
    let issue = `${num1} ${operator} ${num2}`;
    let correctResponse;

    switch (operator) {
        case '+':
            correctResponse = num1 + num2;
            break;
        case '-':
            correctResponse = num1 - num2;
            break;
        case '*':
            correctResponse = num1 * num2;
            break;
        case '/':
            // Убедимся, что результат деления будет целым числом
            if (num2 === 0) {  // Проверка на деление на ноль
                correctResponse = 0;  // Поставим ответ 0, если деление на ноль
            } else {
                correctResponse = Math.floor(num1 / num2); // Округляем вниз
            }
            break;
    }

    // Запрос ответа у пользователя
    const userResponse = prompt(`Решите задачу: ${issue}`);

    // Если пользователь нажал "Отмена", userResponse будет равно null
    if (userResponse === null) {
        alert("Игра завершена. Приходи еще!");
        return;  
    }

    // Преобразуем введённый ответ в число
    const userAnswer = parseFloat(userResponse);

    // Проверка на корректность ответа
    if (userAnswer === correctResponse) {
        alert("Молодец! Ты правильно решил задачу.");
    } else {
        alert(`Упс, ошибка. Правильный ответ: ${correctResponse}`);
    }
}

//Переверни текст
function reverseText() {
    let userInput = prompt("Введи текст, который хочешь перевернуть:");

    if (userInput === null) {
        alert("Игра завершена. Приходи еще!");
        return;  // Завершаем выполнение функции
    }
    if (userInput === null || userInput === "") {
        alert("Упс! Ты не ввел текст, попробуй снова!");
        return;
    }
        let reversedText = userInput.split('').reverse().join('');

        alert("Перевернутый текст: " + reversedText);
}


//Викторина
function simpleQuiz() {
    alert("Выбери вариант ответа на следующий вопрос:");
    const quiz = [
        {
            question: "Какого цвета небо?",
            options: ["1. Красного", "2. Синего", "3. Зеленого"],
            trueAnswer: 2 
        },
        {
            question: "Сколько дней в неделе?",
            options: ["1. Шесть", "2. Семь", "3. Восемь"],
            trueAnswer: 2
        },
        {
            question: "Сколько у человека пальцев на одной руке?",
            options: ["1. Четыре", "2. Пять", "3. Шесть"],
            trueAnswer: 2
        }
    ];

    let trueCount = 0; // Счётчик правильных ответов

    for (let i = 0; i < quiz.length; i++) {
        const currentQuestion = quiz[i];
        
        // Формируем текст вопроса и вариантов ответа
        const questionText = `${currentQuestion.question}\n${currentQuestion.options.join("\n")}`;

        // Запрашиваем ответ у пользователя
        const userAnswer = prompt(questionText);

        // Если пользователь нажал "Отмена", завершаем викторину
        if (userAnswer === null) {
            alert("Игра завершена. Приходи еще!");
            return;  // Завершаем выполнение функции
        }

        // Преобразуем ответ в число и проверяем его
        const userAnswerNumber = parseInt(userAnswer, 10);

        // Если ответ правильный, увеличиваем счётчик
        if (userAnswerNumber === currentQuestion.trueAnswer) {
            trueCount++;
        }
    }

    // В конце показываем результат викторины
    alert(`Количество правильных ответов: ${trueCount} из ${quiz.length}`);
}


//Камень, ножницы, бумага

function rockscissorsPaper() {
    const choices = ["камень", "ножницы", "бумага"];

    // Запрос выбора пользователя
    let userChoice = prompt("Камень, ножницы, бумага? (или нажмите 'Отмена' для выхода)").toLowerCase();

    // Если пользователь нажал "Отмена", завершить игру
    if (userChoice === null) {
        alert("Игра завершена. Приходи еще!");
        return;  // Завершаем выполнение функции
    }

    // Проверяем, что введённый выбор корректен
    if (!choices.includes(userChoice)) {
        alert("Упс, ты ошибся! Выбери камень, ножницы или бумагу.");
        return;  // Завершаем выполнение функции, если выбор неверный
    }

    // Генерируем случайный выбор компьютера
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    // Показываем выборы пользователя и компьютера
    alert(`Твой выбор: ${userChoice}\nВыбор компьютера: ${computerChoice}`);

    // Определяем победителя
    if (userChoice === computerChoice) {
        alert("Ничья!");
    } else if (
        (userChoice === "камень" && computerChoice === "ножницы") ||
        (userChoice === "ножницы" && computerChoice === "бумага") ||
        (userChoice === "бумага" && computerChoice === "камень")
    ) {
        alert("Ура! Ты победил!");
    } else {
        alert("Компьютер победил, не отчаивайся, попробуй еще раз!");
    }
}


//Генератор случайных цветов
function randomcolorGenerator() {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * (100 - 65) + 65);
    const lightness = Math.floor(Math.random() * (100 - 50) + 50);
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
function changeColor() {
    const playElement = document.querySelector('.play');
    playElement.style.backgroundColor = randomcolorGenerator();
}


