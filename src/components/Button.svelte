<script lang="ts">
  export let onClick: VoidFunction = () => {
  };
  export let className: string | undefined = undefined;
</script>

<button
  class={`bg-gray-200 shadow text-gray-800 rounded cursor-pointer box-border p-2 flex content-center justify-center hover:bg-gray-400 active:bg-gray-500 font-bold duration-100 ${className ? className : ''}`}
  on:click={onClick}>
  <slot />
</button>
