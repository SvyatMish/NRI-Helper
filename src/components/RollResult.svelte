<script lang="ts">
  import type { RollResultType } from "../types";

  export let result: RollResultType;

  const successTextClass = "text-lime-500";
  const failTextClass = "text-red-700";
</script>

<div class="flex space-x-2">
  <div class="flex space-x-1">
    <div>Сложность: {result.difficulty}</div>
    <div class="flex space-x-1">
      (
      {#each result.rolls as roll}
        {#if roll.isCriticalFail}
          <div class={failTextClass}>{roll.number}</div>
        {:else if roll.isCancelledSuccess}
          <div class="text-amber-400 line-through">{roll.number}</div>
        {:else if roll.isSuccess}
          <div class={successTextClass}>{roll.number}</div>
        {:else}
          <div>{roll.number}</div>
        {/if}
      {/each}
      )
    </div>
  </div>
  {#if result.isCriticalFailure}
    <div class={failTextClass}>Провал! &#128128;</div>
  {:else if result.isSuccess}
    <div class="flex space-x-1">
      <div>
        Успехов
      </div>
      :<span class={successTextClass}>{result.finalSuccesses}</span>
    </div>
  {:else }
    <div class={failTextClass}>Неудача</div>
  {/if}
</div>

