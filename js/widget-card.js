class WidgetCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const cardStyle = document.createElement('style');
    cardStyle.textContent = `
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
        `;

    this.shadowRoot.append(cardStyle);

    const card = document.createElement('div');
    card.classList.add('card');

    const header = document.createElement('header');
    header.classList.add('header');
    header.innerHTML = `<slot name="header"></slot>`;

    const body = document.createElement('section');
    body.classList.add('body');
    body.innerHTML = `<slot name="body"></slot>`;

    const footer = document.createElement('footer');
    footer.classList.add('footer');
    footer.innerHTML = `<slot name="footer"></slot>`;

    card.append(header, body, footer);
    this.shadowRoot.append(card);
  }
}

customElements.define('widget-card', WidgetCard);
