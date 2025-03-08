<script lang="ts">
  import * as Card from "$lib/components/ui/card";

  export let imageUrl: string;
  export let commonName: string;
  export let latinName: string;
</script>

<Card.Root class="w-[300px] overflow-hidden">
  <Card.Content class="p-0">
    <div class="relative w-full aspect-[3/2]">
      <img 
        src={imageUrl} 
        alt={commonName}
        class="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  </Card.Content>
  <Card.Header>
    <Card.Title class="text-xl font-bold">{commonName}</Card.Title>
    <Card.Description class="italic text-sm text-muted-foreground">{latinName}</Card.Description>
  </Card.Header>
</Card.Root> 