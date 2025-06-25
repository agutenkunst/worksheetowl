// This file contains the JavaScript logic for generating random arithmetic tasks.

document.addEventListener('DOMContentLoaded', () => {
    const generateTasksBtn = document.getElementById('generate-tasks');
    const maxResultInput = document.getElementById('max-result');
    const tasksContainer = document.getElementById('tasks');

    // Get the seed and types from the URL or set defaults
    const urlParams = new URLSearchParams(window.location.search);
    let seed = urlParams.get('seed') || generateRandomSeed();
    const typesFromUrl = urlParams.get('types') ? urlParams.get('types').split('-') : ['add'];

    // Activate buttons based on URL types
    activateCalculationTypes(typesFromUrl);

    generateTasks(getMaxResult(), new Math.seedrandom(seed), getCalculationTypes());
    updateUrl(seed);

    generateTasksBtn.addEventListener('click', (event) => {
        event.preventDefault();

        let seed = generateRandomSeed();

        generateTasks(getMaxResult(), new Math.seedrandom(seed), getCalculationTypes());
        updateUrl(seed);
    });

    document.getElementById('enable-minus').addEventListener('click', function () {
        this.classList.toggle('active');
        updateUrl(seed);
    });

    document.getElementById('enable-add').addEventListener('click', function () {
        this.classList.toggle('active');
        console.log('Add button clicked');
        updateUrl(seed);
    });

    function activateCalculationTypes(types) {
        if (types.includes('add')) {
            document.getElementById('enable-add').classList.add('active');
        }
        if (types.includes('minus')) {
            document.getElementById('enable-minus').classList.add('active');
        }
    }

    function getCalculationTypes() {
        const calculationTypes = [];
        if (document.getElementById('enable-add').classList.contains('active')) {
            calculationTypes.push('add');
        }
        if (document.getElementById('enable-minus').classList.contains('active')) {
            calculationTypes.push('minus');
        }
        return calculationTypes;
    }

    function randomizeList(list) {
        for (let i = list.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [list[i], list[j]] = [list[j], list[i]];
        }
        return list;
    }

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

    function addFooter(urlParams) {
        const footer = document.getElementById('footer'); 
        footer.textContent = `Regenerate with: https://agutenkunst.github.io/worksheetowl/?${urlParams.toString()}`;
    }

    function updateUrl(seed) {
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('seed', seed);

        // Add calculation types to the URL
        const calculationTypes = getCalculationTypes();
        urlParams.set('types', calculationTypes.join('-')); // Use '-' as the separator

        // Logging the URL for debugging
        console.log(`Updated URL: ${window.location.pathname}?${urlParams}`);
        window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`);

        addFooter(urlParams);
    }

    function generateTasks(maxResult, rng, calculationTypes) {
        let nTasks = 12; // Default number of tasks
        if (!calculationTypes || calculationTypes.length === 0) {
            alert('Please select at least one calculation type.');
            return;
        }

        // Generate a list of tasks based on the selected calculation types
        let calculationTypeRandomList = [];
        for (let i = 0; i < nTasks / calculationTypes.length; i++) {
            calculationTypeRandomList.push(...calculationTypes);
        }
        calculationTypeRandomList = randomizeList(calculationTypeRandomList);

        tasksContainer.innerHTML = '';
        for (let i = 0; i < nTasks; i++) {
            const task = createRandomTask(maxResult, rng, calculationTypeRandomList[i % calculationTypeRandomList.length]);
            const taskElement = document.createElement('div');
            taskElement.textContent = task;
            taskElement.className = 'task';
            tasksContainer.appendChild(taskElement);
        }
    }

    function createRandomTask(maxResult, rng, calculationType) {
        switch (calculationType) {
            case 'add': {
                const result = Math.floor(rng() * (maxResult + 1));
                const num1 = Math.floor(rng() * (result + 1));
                const num2 = result - num1;
                return `${num1} + ${num2} =`;
            }
            case 'minus': {
                const num1 = Math.floor(rng() * (maxResult + 1));
                const num2 = Math.floor(rng() * (num1 + 1));
                return `${num1} - ${num2} =`;
            }
            default:
                throw new Error(`Unsupported calculation type: ${calculationType}`);
        }
    }
});