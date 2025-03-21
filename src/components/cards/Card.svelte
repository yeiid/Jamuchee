<script>
  /**
   * @typedef {Object} Props
   * @property {string} title - Título de la tarjeta
   * @property {string} [subtitle] - Subtítulo opcional de la tarjeta
   * @property {string} [imageUrl] - URL de la imagen opcional
   */

  /** @type {string} */
  export let title = '';
  
  /** @type {string | undefined} */
  export let subtitle = undefined;
  
  /** @type {string | undefined} */
  export let imageUrl = undefined;
</script>

<div class="card p-4">
  <div class="card-header mb-4">
    <h2 class="card-title text-xl font-bold">{title}</h2>
    {#if subtitle}
      <h3 class="card-subtitle text-gray-600 dark:text-gray-400">{subtitle}</h3>
    {/if}
  </div>
  
  {#if imageUrl}
    <div class="card-image mb-4">
      <img src={imageUrl} alt={title} class="w-full rounded-md" />
    </div>
  {/if}
  
  <div class="card-content">
    <slot />
  </div>
</div> 