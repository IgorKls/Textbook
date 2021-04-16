// menu-burger

let menuToggle = document.querySelector('#chapter-toggle');
let menu = document.querySelector('.outgoing--list');
let arrow = document.querySelector('.arrow');
menuToggle.addEventListener('click', function (event) {
    event.preventDefault();
    menu.classList.toggle('visible');
    menuToggle.classList.toggle('active');
    arrow.classList.toggle('active');
});


// quiz

let counterValid = 0;

const DATA = [
    {
        question: 'Что такое число?',
        answers: [
            {
                id: '1',
                value: 'Наименьшая единица памяти компьютера',
                correct: false,
            },
            {
                id: '2',
                value: 'Основное понятие математики, которое обычно означает либо количество, размер, вес и т. д., либо порядковый номер, расположение в последовательности, код, шифр и т. д.',
                correct: true,
            },
            {
                id: '3',
                value: 'Условный знак для обозначения чисел',
                correct: false,
            },
        ]
    },
    {
        question: 'Что такое цифра?',
        answers: [
            {
                id: '4',
                value: 'Условный знак для обозначения чисел',
                correct: true,
            },
            {
                id: '5',
                value: 'Основное понятие математики, которое обычно означает либо количество, размер, вес и т. д., либо порядковый номер, расположение в последовательности, код, шифр и т. д.',
                correct: false,
            },
            {
                id: '6',
                value: 'Наименьшая единица памяти компьютера',
                correct: false,
            },
        ]
    },
    {
        question: 'Где правильно написано число 12 в римской системе счисления?',
        answers: [
            {
                id: '7',
                value: 'XII',
                correct: true,
            },
            {
                id: '8',
                value: 'VII',
                correct: false,
            },
            {
                id: '9',
                value: 'IX',
                correct: false,
            },
        ]
    },
    {
        question: 'Какая система счисления не является позиционной?',
        answers: [
            {
                id: '10',
                value: 'римская',
                correct: true,
            },
            {
                id: '11',
                value: 'двоичная',
                correct: false,
            },
            {
                id: '12',
                value: 'десятичная',
                correct: false,
            },
        ]
    },
    {
        question: 'Главной характеристикой процессора является:',
        answers: [
            {
                id: '13',
                value: 'объём памяти',
                correct: false,
            },
            {
                id: '14',
                value: 'частота',
                correct: true,
            },
            {
                id: '15',
                value: 'разрешение',
                correct: false,
            },
        ]
    },
    {
        question: 'Дайте определение программам-автоматам:',
        answers: [
            {
                id: '16',
                value: 'это последовательность команд, которую выполняет компьютер в процессе обработки данных',
                correct: false,
            },
            {
                id: '17',
                value: 'это прикладные программы, где пользователь эксплуатирует алгоритмы и данные, а также способы классификации данных и их просмотра, созданные другими людьми.',
                correct: true,
            },
            {
                id: '18',
                value: 'это комплект программ, которые совместно управляют ресурсами системы и процессами, использующими эти ресурсы',
                correct: false,
            },
        ]
    },
    {
        question: 'Что такое система счисления?',
        answers: [
            {
                id: '19',
                value: 'цифры 1,2,3,4,5,6,7,8,9',
                correct: false,
            },
            {
                id: '20',
                value: 'правила арифметических действий',
                correct: false,
            },
            {
                id: '21',
                value: 'это знаковая система, в которой числа записываются по определенным правилам, с помощью знаков некоторого алфавита, называемых цифрами.',
                correct: true,
            },
        ]
    },
    {
        question: 'Какие системы счисления не используются специалистами для общения с ЭВМ?',
        answers: [
            {
                id: '22',
                value: 'десятичная',
                correct: false,
            },
            {
                id: '23',
                value: 'троичная',
                correct: false,
            },
            {
                id: '24',
                value: 'шестнадцатеричная',
                correct: true,
            },
        ]
    },
    {
        question: 'Переведите число 11012 из двоичной системы счисления в десятичную систему счисления.',
        answers: [
            {
                id: '25',
                value: '11',
                correct: true,
            },
            {
                id: '26',
                value: '52',
                correct: false,
            },
            {
                id: '27',
                value: '4',
                correct: false,
            },
        ]
    },
    {
        question: 'Числовой разряд – это:',
        answers: [
            {
                id: '28',
                value: 'цифра в изображении числа',
                correct: false,
            },
            {
                id: '29',
                value: 'позиция цифры в числе',
                correct: true,
            },
            {
                id: '30',
                value: 'показатель степени основания',
                correct: false,
            },
        ]
    },
];

let localResults = {};

const quiz = document.getElementById("quiz");
const questions = document.getElementById("questions");
const indicator = document.getElementById("indicator");
const results = document.getElementById("results");
const btnNext = document.getElementById("btn-next");
const btnRestart = document.getElementById("btn-restart");

const renderQuestions = (index) => {
    renderIndicator(index + 1);

    questions.dataset.currentStep = index;

    const renderAnswers = () => DATA[index].answers
        .map((answer) => `
            <li>
                <label>
                    <input class="answer-input" type="radio" name=${index} value=${answer.id}>
                    ${answer.value}
                </label>
            </li>
        `)
        .join('');

    questions.innerHTML = `
        <div class="quiz-questions-item">
            <div class="quiz-questions-item__question">${DATA[index].question}</div>
            <ul class="quiz-questions-item__answers">${renderAnswers()}</ul>
        </div>
    `;
};

const renderResults = () => {
    let content = '';

    const getClassname = (answer, questionIndex) => {
        let classname = '';

        if (!answer.correct && answer.id === localResults[questionIndex]) {
            classname = 'answer--invalid';
            invalid = invalid + 1;
        } else if (answer.correct) {
            classname = 'answer--valid';
            valid = valid + 1;
        }

        return classname;
    };

    const getAnswers = (questionIndex) => DATA[questionIndex].answers
        .map((answer) => `<li class=${getClassname(answer, questionIndex)}>${answer.value}</li>`)
        .join('');

    DATA.forEach((question, index) =>{
        content += `
            <div class="quiz-results-item">
                <div class="quiz-results-item__question">${question.question}</div>
                <ul class="quiz-results-item__answers">${getAnswers(index)}</ul>
            </div>
        `;
    });
    
    results.innerHTML = content;

};

const renderIndicator = (currentStep) => {
    indicator.innerHTML = `${currentStep}/${DATA.length}`;
};

quiz.addEventListener('change', (event) => {
    // логика ответа

    if (event.target.classList.contains('answer-input')) {
        localResults[event.target.name] = event.target.value;
        btnNext.disabled = false;
    }
});

quiz.addEventListener('click', (event) => {
    // вперед или сначала

    if (event.target.classList.contains('btn-next')) {
        const nextQuestionIndex = Number(questions.dataset.currentStep) + 1;

        if (DATA.length === nextQuestionIndex) {
            questions.classList.add('questions--hidden');
            indicator.classList.add('indicator--hidden');
            results.classList.add('results--visible');
            btnNext.classList.add('btn-next--hidden');
            btnRestart.classList.add('btn-restart--visible');
            renderResults();
        } else {
            renderQuestions(nextQuestionIndex);
        }
        
        btnNext.disabled = true;
    }

    if (event.target.classList.contains('btn-restart')) {
        localResults = {};
        results.innerHTML = '';

        questions.classList.remove('questions--hidden');
        indicator.classList.remove('indicator--hidden');
        results.classList.remove('results--visible');
        btnNext.classList.remove('btn-next--hidden');
        btnRestart.classList.remove('btn-restart--visible');
        
        valid = 0;
        invalid = 0;

        renderQuestions(0);
    }
});

renderQuestions(0);
valid = 0;
invalid = 0;