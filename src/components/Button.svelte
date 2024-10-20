<script lang="ts">
  export let onClick: VoidFunction = () => {
  };
</script>

<button on:click={onClick}>
  <slot />
</button>
