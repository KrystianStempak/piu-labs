import loadTemplate from './loader.js';

class ProductCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        const template = await loadTemplate('js/product-card.html');

        const clone = template.content.cloneNode(true);

        this.shadowRoot.appendChild(clone);
    }
}

customElements.define('product-card', ProductCard);