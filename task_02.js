let stopwatchInterval;
let startTime;
let elapsedTime = 0;
let laps = [];

function formatTime(milliseconds) {
    let date = new Date(milliseconds);
    let minutes = date.getUTCMinutes().toString().padStart(2, '0');
    let seconds = date.getUTCSeconds().toString().padStart(2, '0');
    let ms = date.getUTCMilliseconds().toString().padStart(3, '0');
    return `${minutes}:${seconds}:${ms}`;
}

function updateDisplay() {
    let formattedTime = formatTime(elapsedTime);
    document.getElementById('minutes').textContent = formattedTime.substr(0, 2);
    document.getElementById('seconds').textContent = formattedTime.substr(3, 2);
    document.getElementById('milliseconds').textContent = formattedTime.substr(6, 3);
}

function startStop() {
    let startStopButton = document.getElementById('startStopButton');
    let stopButton = document.getElementById('stopButton');
    let resetButton = document.getElementById('resetButton');

    if (startStopButton.textContent === 'Start') {
        startStopButton.textContent = 'Stop';
        stopButton.disabled = false;
        resetButton.disabled = true;
        startTime = Date.now() - elapsedTime;
        stopwatchInterval = setInterval(function() {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);
    } else {
        startStopButton.textContent = 'Start';
        stopButton.disabled = true;
        resetButton.disabled = false;
        clearInterval(stopwatchInterval);
    }
}

function stop() {
    let startStopButton = document.getElementById('startStopButton');
    let stopButton = document.getElementById('stopButton');
    let resetButton = document.getElementById('resetButton');

    startStopButton.textContent = 'Start';
    stopButton.disabled = true;
    resetButton.disabled = false;
    clearInterval(stopwatchInterval);
}

function lapReset() {
    let lapResetButton = document.getElementById('lapResetButton');
    let resetButton = document.getElementById('resetButton');

    if (lapResetButton.textContent === 'Lap') {
        laps.push(elapsedTime);
        let lapsList = document.getElementById('laps');
        let lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${laps.length}: ${formatTime(elapsedTime)}`;
        lapItem.classList.add('lap-item');
        lapsList.appendChild(lapItem);
    } else {
        clearInterval(stopwatchInterval);
        elapsedTime = 0;
        laps = [];
        updateDisplay();
        let lapsList = document.getElementById('laps');
        lapsList.innerHTML = '';
        resetButton.disabled = true;
    }
}

function reset() {
    let startStopButton = document.getElementById('startStopButton');
    let stopButton = document.getElementById('stopButton');
    let resetButton = document.getElementById('resetButton');

    startStopButton.textContent = 'Start';
    stopButton.disabled = true;
    resetButton.disabled = true;
    clearInterval(stopwatchInterval);
    elapsedTime = 0;
    laps = [];
    updateDisplay();
    let lapsList = document.getElementById('laps');
    lapsList.innerHTML = '';
}
