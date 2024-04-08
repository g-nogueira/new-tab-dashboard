class WidgetCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {

  }

  render() {
    this.shadowRoot.innerHTML = `
            <style>
              .card {
                  width: var(--card-width, 400px);
                  background-color: var(--card-background-color, #FFFFFF);
                  border-radius: var(--card-border-radius, 10px);
                  padding: var(--card-padding, 5px);
                  box-shadow: var(--card-box-shadow, 0 2px 5px rgba(0, 0, 0, 0.1));
                  margin: var(--card-margin, 20px);
                  display: flex;
                  flex-direction: column;
                  gap: var(--card-gap, 5px);
              }
              .header, .footer {
                  background: var(--section-background-color, #FFFFFF);
                  color: var(--section-color, #000000);
              }
              .body {
                line-height: 1.5;
              }
              @media (max-width: 600px) {
                .card {
                  width: var(--card-width-mobile, 100%);
                }
              }
                /* Add your modern styles here */
            </style>
            <div class="card">
                <slot name="header"></slot>
                <slot name="body"></slot>
                <slot name="footer"></slot>
            </div>
        `;
  }
}

customElements.define('widget-card', WidgetCard);
