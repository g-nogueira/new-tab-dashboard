class WidgetCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: ${this.getAttribute('width') || '400px'};
                    margin: 10px auto;
                    background-color: #ffffff;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    border-radius: 10px;
                    border: 1px solid #e1e4e8;
                    overflow: hidden;
                }
                .header, .body, .footer {
                    padding: 20px;
                }
                .header { background-color: var(--header-bg-color, #e8e8e8); }
                .body { background-color: var(--body-bg-color, transparent); }
                .footer { background-color: var(--footer-bg-color, #dddddd); }
            </style>
            <div class="header"><slot name="header"></slot></div>
            <div class="body"><slot name="body">Default body content</slot></div>
            <div class="footer"><slot name="footer"></slot></div>
        `;
  }
}
customElements.define('widget-card', WidgetCard);