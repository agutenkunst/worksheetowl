// This file contains the JavaScript logic for generating random arithmetic tasks.

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('task-form');
    const maxResultInput = document.getElementById('max-result');
    const tasksContainer = document.getElementById('tasks');

    // Get the seed from the URL or generate a random one
    const urlParams = new URLSearchParams(window.location.search);
    let seed = urlParams.get('seed');
    if (!seed) {
        seed = generateRandomSeed();
        updateUrl(seed)
    }
    generateTasks(getMaxResult(), new Math.seedrandom(seed));
    addFooter(seed);

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        let seed = generateRandomSeed();

        generateTasks(getMaxResult(), new Math.seedrandom(seed));
        updateUrl(seed);
        addFooter(seed);
    });

    function getMaxResult() {
        const maxResult = parseInt(maxResultInput.value);
        if (isNaN(maxResult) || maxResult <= 0) {
            alert('Please enter a valid maximum result.');
            return null;
        }
        return maxResult;
    }

    function generateRandomSeed() {
        return Math.floor(Math.random() * 1000000).toString();
    }

    function addFooter(seed) {
        const footer = document.getElementById('footer'); 
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('seed', seed);
        footer.textContent = `Regenerate with: https://agutenkunst.github.io/worksheetowl/?seed=${seed}`;
    }

    function updateUrl(seed) {
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('seed', seed);
        window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`);
    }

    function generateTasks(maxResult, rng) {
        tasksContainer.innerHTML = '';
        for (let i = 0; i < 12; i++) {
            const task = createRandomTask(maxResult, rng);
            const taskElement = document.createElement('div');
            taskElement.textContent = task;
            taskElement.className = 'task';
            tasksContainer.appendChild(taskElement);
        }
    }

    function createRandomTask(maxResult, rng) {
        const result = Math.floor(rng() * (maxResult + 1));
        const num1 = Math.floor(rng() * (result + 1));
        const num2 = result - num1;
        return `${num1} + ${num2} =`;
    }
});