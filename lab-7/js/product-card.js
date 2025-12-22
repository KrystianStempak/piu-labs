import loadTemplate from './loader.js';

class ProductCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._data = null;
    }

    async connectedCallback() {
        if (!this.shadowRoot.innerHTML) {
            const template = await loadTemplate('js/product-card.html');
            this.shadowRoot.appendChild(template.content.cloneNode(true));

            this.shadowRoot.getElementById('btn-add').addEventListener('click', () => {
                this.addToCart();
            });

            if (this._data) this.render();
        }
    }

    set data(value) {
        this._data = value;
        if (this.shadowRoot.innerHTML) {
            this.render();
        }
    }

    get data() {
        return this._data;
    }

    render() {
        const { title, price, image } = this._data;
        
        this.shadowRoot.getElementById('title').textContent = title;
        this.shadowRoot.getElementById('price').textContent = `${price.toFixed(2)} PLN`;
        this.shadowRoot.getElementById('img').src = image;
        this.shadowRoot.getElementById('img').alt = title;
    }

    addToCart() {
        const event = new CustomEvent('add-to-cart', {
            bubbles: true,    
            composed: true,   
            detail: this._data 
        });
        this.dispatchEvent(event);
    }
}

customElements.define('product-card', ProductCard);