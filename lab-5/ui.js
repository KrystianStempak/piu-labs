const elements = {
    container: document.getElementById('shapes-container'),
    squareCount: document.getElementById('count-squares'),
    circleCount: document.getElementById('count-circles')
};

export const UI = {

    /**
     * @param {Object} state 
     */
    render(state) {
        const shapes = state.shapes;

        shapes.forEach(shapeData => {
            const existingElement = document.querySelector(`[data-id="${shapeData.id}"]`);

            if (existingElement) {
                if (existingElement.style.backgroundColor !== shapeData.color) {
                    existingElement.style.backgroundColor = shapeData.color;
                }
            } else {
                const newElement = createShapeElement(shapeData);
                elements.container.appendChild(newElement);
            }
        });

        const currentDomElements = Array.from(elements.container.children);
        
        currentDomElements.forEach(domElement => {
            const domId = domElement.dataset.id;
            const existsInState = shapes.find(shape => shape.id === domId);

            if (!existsInState) {
                domElement.remove();
            }
        });
        updateCounters(shapes);
    }
};

/**
 * @param {Object} shape {id, type, color}
 * @returns {HTMLElement} div
 */
function createShapeElement(shape) {
    const div = document.createElement('div');
    
    div.classList.add('shape', shape.type);
    
    div.style.backgroundColor = shape.color;
    
    div.setAttribute('data-id', shape.id);
    
    return div;
}

/**
 * @param {Array} shapes 
 */
function updateCounters(shapes) {
    const squares = shapes.filter(s => s.type === 'square').length;
    const circles = shapes.filter(s => s.type === 'circle').length;

    elements.squareCount.textContent = squares;
    elements.circleCount.textContent = circles;
}