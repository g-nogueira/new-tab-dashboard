<script lang="ts">
  import type { WidgetStyle } from "../../types";

  export let styles: WidgetStyle;

  $: cssVarStyles = Object.entries(styles)
    .map(([key, value]) => `--${key}:${value}`)
    .join(";");
</script>

<div class="card" style={cssVarStyles}>
  <slot name="header" />
  <slot name="body" />
  <slot name="footer" />
</div>

<style lang="scss">
  .card {
    width: var(--card-width, 400px);
    background-color: var(--card-background-color, #ffffff);
    border-radius: var(--card-border-radius, 10px);
    padding: var(--card-padding, 5px);
    box-shadow: var(--card-box-shadow, 0 2px 5px rgba(0, 0, 0, 0.1));
    margin: var(--card-margin, 20px);
    display: flex;
    flex-direction: column;
    gap: var(--card-gap, 5px);
  }
  .header,
  .footer {
    background: var(--section-background-color, #ffffff);
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
</style>
