function initializeWidgetConfigs() {
    const defaultConfigs = {
        widgets: `
        - id: "githubPRs"
          name: "GitHub Pull Requests"
          description: "Displays open pull requests from a specified repository."
          display: true
          header:
            display: true
            style:
              card-background-color: "#fff"
            displayTemplate: "<h3>{{ name }}</h3>"
          
          width: "500px" # Specify width here
          style:
            card-background-color: "#fff"
          apiCall:
            url: "https://api.github.com/repos/octokit/octokit.js/pulls?state=open"
            method: "GET"
            headers:
              Authorization: "Bearer YOUR_GITHUB_TOKEN"
              Accept: "application/vnd.github+json"
              X-GitHub-Api-Version: "2022-11-28"
          body:
            display: true
            displayTemplate: |
              <div>
                <p>{{ description }}</p>
                <ul>
                  {{#data}}
                    <li>
                      <a href="{{ html_url }}" target="_blank">{{ title }}</a>
                      - Created at: {{ created_at }}
                    </li>
                  {{/data}}
                  {{^data}}
                    <li>No open pull requests.</li>
                  {{/data}}
                </ul>
              </div>
          footer:
            display: false
        `
    };

    // Store the YAML in Chrome's local storage
    chrome.storage.local.set({widgetsConfig: defaultConfigs}, () => {
        console.log("Default widget configurations initialized.");
    });
}

// Call this function when the extension is installed/updated
chrome.runtime.onInstalled.addListener(initializeWidgetConfigs);
