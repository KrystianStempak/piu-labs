class ShoppingCart extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.items = [];
    }

    connectedCallback() {
        this.render();
    }

    addItem(product) {
        this.items.push(product);
        this.render();
    }

    removeItem(index) {
        this.items.splice(index, 1);
        this.render();
    }

    getTotal() {
        return this.items.reduce((sum, item) => sum + item.price, 0).toFixed(2);
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host { display: block; border: 2px solid #333; padding: 15px; border-radius: 8px; background: #fff; width: 300px; height: fit-content; }
                h2 { margin-top: 0; border-bottom: 1px solid #ccc; padding-bottom: 10px; }
                ul { list-style: none; padding: 0; margin: 0; }
                li { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #eee; }
                .remove-btn { color: red; cursor: pointer; font-weight: bold; margin-left: 10px; border: none; background: none; font-size: 1.2em; }
                .total { margin-top: 15px; font-weight: bold; font-size: 1.2em; text-align: right; }
                .empty-msg { font-style: italic; color: #777; }
            </style>
            
            <h2>Twój Koszyk</h2>
            
            ${this.items.length === 0 ? '<div class="empty-msg">Koszyk jest pusty</div>' : ''}
            
            <ul>
                </ul>
            
            <div class="total">Suma: ${this.getTotal()} PLN</div>
        `;

        const ul = this.shadowRoot.querySelector('ul');
        this.items.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${item.title}</span>
                <div>
                    <span>${item.price.toFixed(2)} zł</span>
                    <button class="remove-btn">×</button>
                </div>
            `;
            
            li.querySelector('.remove-btn').addEventListener('click', () => {
                this.removeItem(index);
            });
            
            ul.appendChild(li);
        });
    }
}

customElements.define('shopping-cart', ShoppingCart);