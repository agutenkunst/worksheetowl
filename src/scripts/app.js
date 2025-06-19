// This file contains the JavaScript logic for generating random arithmetic tasks.

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('task-form');
    const maxResultInput = document.getElementById('max-result');
    const tasksContainer = document.getElementById('tasks');

    form.addEventListener('submit', (event) => {
        event.preventDefault();


        // Get the seed from the URL or generate a random one
        const urlParams = new URLSearchParams(window.location.search);
        let seed = urlParams.get('seed');
        if (!seed) {
            seed = Math.floor(Math.random() * 1000000).toString();
            urlParams.set('seed', seed);
        }

        // Initialize the seeded random generator
        const rng = new Math.seedrandom(seed);

        const maxResult = parseInt(maxResultInput.value);
        if (isNaN(maxResult) || maxResult <= 0) {
            alert('Please enter a valid maximum result.');
            return;
        }
        generateTasks(maxResult, rng);
        addFooter(seed);
    });

    function addFooter(seed) {
        const footer = document.getElementById('footer'); 
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('seed', seed);
        footer.textContent = `Regenerate with: https://agutenkunst.github.io/worksheetowl/?seed=${seed}`;
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