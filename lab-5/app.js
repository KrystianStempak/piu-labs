import Store from './store.js';
import { UI } from './ui.js';
import { generateId, getRandomColor } from './helpers.js';

const store = new Store();

store.subscribe(UI.render);

UI.render(store.state);


document.getElementById('add-square').addEventListener('click', () => {
    const newShape = {
        id: generateId(),
        type: 'square',
        color: getRandomColor()
    };
    store.addShape(newShape);
});

document.getElementById('add-circle').addEventListener('click', () => {
    const newShape = {
        id: generateId(),
        type: 'circle',
        color: getRandomColor()
    };
    store.addShape(newShape);
});

document.getElementById('recolor-squares').addEventListener('click', () => {
    store.recolorShapes('square', getRandomColor);
});

document.getElementById('recolor-circles').addEventListener('click', () => {
    store.recolorShapes('circle', getRandomColor);
});

document.getElementById('shapes-container').addEventListener('click', (event) => {
    if (event.target.classList.contains('shape')) {
        const idToRemove = event.target.dataset.id;
        store.removeShape(idToRemove);
    }
});