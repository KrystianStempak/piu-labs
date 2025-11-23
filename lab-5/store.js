export default class Store {
    constructor() {
        this.observers = [];
        
        this.state = {
            shapes: []
        };

        this.loadFromStorage();
    }


    /**
     * @param {Function} fn 
     */
    subscribe(fn) {
        this.observers.push(fn);
    }

    notify() {
        this.saveToStorage();

        this.observers.forEach(observerFn => observerFn(this.state));
    }


    /**
     * @param {Object} shape
     */
    addShape(shape) {
        this.state.shapes.push(shape);
        this.notify(); 
    }

    /**
     * @param {string} id 
     */
    removeShape(id) {
        this.state.shapes = this.state.shapes.filter(shape => shape.id !== id);
        this.notify();
    }

    /**
     * @param {string} type
     * @param {Function} colorProvider
     */
    recolorShapes(type, colorProvider) {
        this.state.shapes = this.state.shapes.map(shape => {
            if (shape.type === type) {
                return { ...shape, color: colorProvider() };
            }
            return shape;
        });
        this.notify();
    }


    get countSquares() {
        return this.state.shapes.filter(s => s.type === 'square').length;
    }

    get countCircles() {
        return this.state.shapes.filter(s => s.type === 'circle').length;
    }


    saveToStorage() {
        localStorage.setItem('shapes-app-data', JSON.stringify(this.state.shapes));
    }

    loadFromStorage() {
        const data = localStorage.getItem('shapes-app-data');
        if (data) {
            this.state.shapes = JSON.parse(data);
        }
    }
}