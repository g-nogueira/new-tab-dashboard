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
    // Create widget container
    const widgetContainer = document.createElement('div');
    widgetContainer.setAttribute('id', config.id);
    Object.assign(widgetContainer.style, config.style);

    if (config.apiCall) {
        // API call is specified, fetch data
        fetch(config.apiCall.url, {
            method: config.apiCall.method || 'GET',
            headers: new Headers(config.apiCall.headers)
        })
        .then(response => response.json())
        .then(data => {
            // Render the template with the fetched data
            const renderedContent = nunjucks.renderString(config.displayTemplate, {data: data});
            widgetContainer.innerHTML = renderedContent;
        })
        .catch(error => console.error('Error fetching or rendering widget data:', error));
    } else {
        // Static content, render template directly
        const renderedContent = nunjucks.renderString(config.displayTemplate, {});
        widgetContainer.innerHTML = renderedContent;
    }

    document.body.appendChild(widgetContainer);
}

