<script lang="ts">
  import Card from "./components/Card/Card.svelte";
  import Mustache from "mustache";
  import jsYaml from "js-yaml";
  import type { WidgetConfig } from "./types";

  async function getWidgetsConfig(): Promise<WidgetConfig[]> {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(["widgetsConfig"], function (result) {
        if (result.widgetsConfig && result.widgetsConfig.widgets) {
          const widgetsYAML: string = result.widgetsConfig.widgets;
          const widgetsConfig = jsYaml.load(widgetsYAML) as WidgetConfig[];
          resolve(widgetsConfig);
        } else {
          reject("No widgetsConfig found");
        }
      });
    });
  }

  let getJson = async (url: string, options: object) => {
    const response = await fetch(url, options);
    return await response.json();
  };

  let widgetConfig = getWidgetsConfig();
</script>

<main id="widget-container">
  {#await widgetConfig}
    <div>Loading...</div>
  {:then config}
    {#each config as widgetConfig}
      {#if widgetConfig.display}
        <Card styles={widgetConfig.style}>
          <div slot="header">
            {#if widgetConfig.header.display}
              {Mustache.render(widgetConfig.header.displayTemplate, { name: widgetConfig.name })}
            {:else}
              <h3>{widgetConfig.name}</h3>
            {/if}
          </div>
          <div slot="body">
            {#if widgetConfig.body.display}
              {#if widgetConfig.apiCall}
                {#await getJson(widgetConfig.apiCall.url, { method: widgetConfig.apiCall.method, headers: new Headers(widgetConfig.apiCall.headers) })}
                  Loading...
                {:then data}
                  {Mustache.render(widgetConfig.body.displayTemplate, { description: widgetConfig.description, data: data })}
                {:catch error}
                  {error}
                {/await}
              {:else}
                {Mustache.render(widgetConfig.body.displayTemplate, { description: widgetConfig.description })}
              {/if}
            {/if}
          </div>
          <div slot="footer">
            {#if widgetConfig.footer.display}
              {Mustache.render(widgetConfig.footer.displayTemplate, { name: widgetConfig.name })}
            {/if}
          </div>
        </Card>
      {/if}
    {/each}
  {:catch error}
    <div>{error}</div>
  {/await}
</main>

<style lang="scss">
  main {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 1rem;
    margin: 0;
    height: 100%;
    width: 100%;
  }

  .container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    font-family: sans-serif;
    text-align: center;
    max-width: 280px;
    height: 100%;
    > * {
      width: 100%;
    }
    .header-wrapper {
      flex: 1;
    }
    .timer-wrapper {
      flex: 3;
    }
    .task-wrapper {
      flex: 3;
    }
  }

  .header-wrapper {
    display: flex;
    padding: 0 1rem;
    justify-content: space-between;
    align-items: center;
  }

  .header {
    box-shadow:
      rgba(0, 0, 0, 0.16) 0px 3px 6px,
      rgba(0, 0, 0, 0.23) 0px 3px 6px;
    border-radius: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .scroll-container {
    height: 250px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
</style>
