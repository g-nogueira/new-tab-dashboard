window.onload = function() {
    chrome.storage.local.get(['widgetsConfig'], function(result) {
        const widgets = jsyaml.load(result.widgetsConfig.widgets);
        const widgetList = document.getElementById('widget-list');
        const configEditor = document.getElementById('widget-config-editor');
        const saveButton = document.getElementById('save-config');

        widgets.forEach((widget, index) => {
            const widgetListItem = document.createElement('div');
            widgetListItem.textContent = widget.name;
            widgetListItem.addEventListener('click', function() {
                configEditor.value = jsyaml.dump(widgets[index]);
            });
            widgetList.appendChild(widgetListItem);
        });

        saveButton.addEventListener('click', function() {
            const updatedConfig = jsyaml.load(configEditor.value);
            chrome.storage.local.set({widgetsConfig: updatedConfig}, function() {
                alert('Configuration saved!');
            });
        });
    });
};