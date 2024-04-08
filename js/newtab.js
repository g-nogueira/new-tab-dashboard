document.addEventListener('DOMContentLoaded', () => {
    loadAndDisplayWidgets();
});

async function loadAndDisplayWidgets() {
    chrome.storage.local.get(['widgetsConfig'], function (result) {
        if (result.widgetsConfig && result.widgetsConfig.widgets) {
            const widgetsYAML = result.widgetsConfig.widgets;
            const widgetsConfig = jsyaml.load(widgetsYAML);
            widgetsConfig.forEach(widgetConfig => {
                displayWidget(widgetConfig);
            });
        }
    });
}

function displayWidget(config) {
    const widgetContainer = document.createElement('widget-card');

    if (config.width) {
        widgetContainer.style.setProperty('--card-width', config.width);
    }

    // Header
    if (config.header && config.header.display) {
        let headerContent = document.createElement('div');
        headerContent.setAttribute('slot', 'header');
        headerContent.innerHTML = config.header.displayTemplate ? Mustache.render(config.header.displayTemplate, { name: config.name }) : `<h3>${config.name}</h3>`;
        widgetContainer.appendChild(headerContent); // This line needs correction.
    }

    // Body
    if (config.apiCall) {
        fetch(config.apiCall.url, {
            method: config.apiCall.method,
            headers: new Headers(config.apiCall.headers)
        })
            .then(response => response.json())
            .then(data => {
                let bodyContent = document.createElement('div');
                bodyContent.setAttribute('slot', 'body');
                bodyContent.innerHTML = Mustache.render(config.body.displayTemplate, { description: config.description, data: data });
                widgetContainer.appendChild(bodyContent); // This line needs correction.
            })
            .catch(error => console.error('Error fetching or rendering widget data:', error));
    }

    // Footer
    if (config.footer && config.footer.display) {
        let footerContent = document.createElement('div');
        footerContent.setAttribute('slot', 'footer');
        footerContent.innerHTML = config.footer.displayTemplate ? Mustache.render(config.footer.displayTemplate, { name: config.name }) : `<h3>${config.name}</h3>`;
        widgetContainer.appendChild(footerContent); // This line needs correction.
    }

    document.getElementById('widget-container').appendChild(widgetContainer);
}
