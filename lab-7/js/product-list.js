import productsData from '../data/products.json' with { type: 'json' };

class ProductList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; }
            </style>
        `;

        productsData.forEach(product => {
            const card = document.createElement('product-card');
            card.data = product;
            
            this.shadowRoot.appendChild(card);
        });
    }
}

customElements.define('product-list', ProductList);