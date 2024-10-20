<script lang="ts">
  import Button from "./components/Button.svelte";
  import { roll } from "./utils";
  import type { RollResultType } from "./types";
  import RollResult from "./components/RollResult.svelte";

  let results: RollResultType[] = [];

  const handleRoll = (difficulty: number) => {
    results = [...results, roll(5, difficulty)];
  };

</script>

<main>
  <div class="flex flex-col items-center justify-center">
    <div class="mb-3">
      <Button onClick={()=>{handleRoll(5)}}>Сложность 5</Button>
      <Button onClick={()=>{handleRoll(6)}}>Сложность 6</Button>
      <Button onClick={()=>{handleRoll(7)}}>Сложность 7</Button>
      <Button onClick={()=>{handleRoll(8)}}>Сложность 8</Button>
      <Button onClick={()=>{handleRoll(9)}}>Сложность 9</Button>
      <Button onClick={()=>{handleRoll(10)}}>Сложность 10</Button>
    </div>

    {#each results as result}
      <RollResult result={result} />
    {/each}
  </div>


</main>
