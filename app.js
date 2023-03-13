//  обяъвления переменный и объекта контроля состояний 
let canvas = document.querySelector("canvas");
let ctx = canvas.getContext('2d');
let timer;
let parameter = {
    freq: 0,
    amplitude: 1,   
    generator: false,
    oscilograph: false,
    time: 3,
    start: 0,
    end: 300,
}

// Создания сетки осцилографа 

function createOscilographhGreed() {
    for (let x = 0; x <= canvas.width; x += 30) {
        ctx.beginPath();
        ctx.strokeStyle = "white"
        x === canvas.width / 2 ? ctx.lineWidth = 2 : ctx.lineWidth = 1
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();

    }
    for (let y = 0; y <= 240; y += 30) {
        ctx.beginPath();
        y === canvas.height / 2 ? ctx.lineWidth = 2 : ctx.lineWidth = 1
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

function clear() {
    clearTimeout(timer);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    createOscilographhGreed();
}

// Функия отрисовки сигнала заданой формулы
function print(from, to) {
    let curent = from;
    let f = Number(parameter.freq);
    let a = Number(parameter.amplitude);
    let x1 = 0;
    let tp = parameter.time;
    let tx = 300 / (f * tp);
    ctx.beginPath();
    ctx.moveTo(0, 0)
    console.log(tx);

    setTimeout(function go() {
        if (curent < to) {
            x = curent
            t = (tp / 300) * x
            y = 120 - Math.abs(a * (Math.sin((2 * Math.PI/720 * 20 / 300 * f) * (x - x1))));
            console.log(y);
            ctx.lineTo(x, y);
            ctx.lineWidth = 2;
            ctx.strokeStyle = "white";
            ctx.stroke();
            timer = setTimeout(go, (tp * 1000) / 300)
        }
        if (curent === to) {
            clear()
            curent = from;
            x0 = from
            print(from, to);
        }
        curent++
        x1 += tx
    }, 4)

}

// Отрисовка сетки осцилографа при первой загрузке страницы 
window.addEventListener("load", () => {
    createOscilographhGreed();
    info();
})


document.querySelector('.oscilographh__toogle-group').addEventListener('click', (e) => {
    clear()
    clearTimeout(timer)
    let off = document.querySelector('#oscilographhOff');
    let on = document.querySelector('#oscilographhOn');
    let oscilographhIndicator = document.querySelector('.oscilographh__toogle-indicator')
    console.log(e.target.id);
    if (e.target.id === 'oscilographhOn') {
        parameter.oscilograph = true
        on.checked = true
        off.checked = false
        oscilographhIndicator.style.backgroundColor = 'green'
    }
    if (e.target.id === 'oscilographhOff') {
        parameter.oscilograph = false
        on.checked = false
        off.checked = true
        oscilographhIndicator.style.backgroundColor = 'red'
    }

    console.log(parameter.oscilograph);

    if (parameter.oscilograph) {
        if (parameter.generator) {
            print(parameter.start, parameter.end)
        } else {
            clearTimeout(timer);
            print(parameter.start, parameter.end)
        }
    }
    if (!parameter.oscilograph) {
        clearTimeout(timer)
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        createOscilographhGreed()
    }

})



document.querySelector('.signal-generator__toogle-group').addEventListener('click', (e) => {
    clear()
    let frequency = document.querySelector('.signal-generator__frequency')
    let amplitude = document.querySelector('.signal-generator__amplitude')
    let off = document.querySelector('#generatorOff');
    let on = document.querySelector('#generatorOn');
    let generatorIndicator = document.querySelector('.signal-generator__toogle-indicator');
    console.log(frequency, amplitude);



    if (!Number(frequency.value) || !Number(amplitude.value)) {
        alert("Введите число")
        frequency.value = '';
        amplitude.value = '';
        parameter.generator = false
        off.checked = true
        on.checked = false
        generatorIndicator.style.backgroundColor = 'red'
    }
    if (e.target.id === 'generatorOff') {
        frequency.value = '';
        amplitude.value = '';
        parameter.generator = false
        off.checked = true
        on.checked = false
        generatorIndicator.style.backgroundColor = 'red';
        parameter.freq = 0;
        parameter.amplitude = 1;
    }
    if (Number(frequency.value) || Number(amplitude.value)) {
        parameter.freq = Number(frequency.value)
        parameter.amplitude = Number(amplitude.value)
        parameter.generator = true
        off.checked = false
        on.checked = true
        generatorIndicator.style.backgroundColor = 'green'
    }
    if (parameter.oscilograph) {
        print(parameter.start, parameter.end)
    }
    if (parameter.oscilograph) {
        if (parameter.generator) {
            print(parameter.start, parameter.end, parameter.freq, parameter.amplitude)
        } else {
            clearTimeout(timer);
            print(parameter.start, parameter.end)
        }
    }
    if (!parameter.oscilograph) {
        clearTimeout(timer)
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        createOscilographhGreed()
    }
})

document.querySelector('#sweep__group').addEventListener('click', (e) => {
    let sweep6 = document.querySelector('#sweep-6')
    let sweep3 = document.querySelector('#sweep-3')
    let sweep1 = document.querySelector('#sweep-1')

    if (e.target.id === 'sweep-6') {
        clear()
        sweep3.checked = false
        sweep1.checked = false
        sweep6.checked = true
        parameter.time = 6
        if (parameter.oscilograph) {
            print(parameter.start, parameter.end)
        }
    }
    if (e.target.id === 'sweep-3') {
        clear()
        sweep3.checked = true
        sweep1.checked = false
        sweep6.checked = false
        parameter.time = 3
        if (parameter.oscilograph) {
            print(parameter.start, parameter.end)
        }
    }
    if (e.target.id === 'sweep-1') {
        clear()
        sweep3.checked = false
        sweep1.checked = true
        sweep6.checked = false
        parameter.time = 1.5
        if (parameter.oscilograph) {
            print(parameter.start, parameter.end)
        }
    }
})


function info() {
    let info = document.querySelector('.info');

    info.innerHTML = `Программа забезпечує розгортку осцилографа 6,3 і 1,5. 
    За замовчуванням встановленна розгортка осцилографа 
    в 3 секундию Частоту сигналу в діапазоні 0 - 20 Гц увести як число з
    фіксованою або плаваючою крапкоюю Амплітуду сигналу увести як
    ціле число N, Значення N в полі "Амплітуда" визначає амплітуду сигналу, 
    яка дорівнює N пікселів. Висота полотна 240 пікселів а ширина 300 пікселів`
}

function checkIndicator () {

}








