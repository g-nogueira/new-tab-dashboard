class ButtonComponent extends HTMLElement {
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
                button {
                    background-color: var(--primary-color);
                    color: var(--text-color);
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 1em;
                }
            </style>
            <button>
                <slot></slot>
            </button>
        `;
    }
}

customElements.define('button-component', ButtonComponent);