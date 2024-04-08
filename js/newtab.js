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
    const widgetContainer = document.createElement('div');
    widgetContainer.setAttribute('id', config.id);
    Object.assign(widgetContainer.style, config.style);

    if (config.apiCall) {
        fetch(config.apiCall.url, {
            method: config.apiCall.method,
            headers: new Headers(config.apiCall.headers)
        })
            .then(response => response.json())
            .then(data => {
                const renderedContent = Mustache.render(config.displayTemplate, { name: config.name, description: config.description, data: data });
                widgetContainer.innerHTML = renderedContent;
            })
            .catch(error => console.error('Error fetching or rendering widget data:', error));
    } else {
        const renderedContent = Mustache.render(config.displayTemplate, { name: config.name, description: config.description });
        widgetContainer.innerHTML = renderedContent;
    }

    document.body.appendChild(widgetContainer);
}




