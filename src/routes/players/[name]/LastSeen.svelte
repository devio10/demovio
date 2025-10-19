<script>
	import { formatDistanceToNowStrict } from "date-fns";
	import { ru } from "date-fns/locale/ru";
	let { query, online, profile } = $props();
</script>

<span class="last-seen-online">
	{#await query}
		Загрузка...
	{:then player}
		{#if online}
			Сейчас играет
		{:else if profile === undefined || name !== profile.name}
			{#if player?.pronouns === "он/его"}Играл
			{:else if player?.pronouns === "она/её"}Играла
			{:else}Играли
			{/if}
			{#if player?.lastOnline !== null && player?.lastOnline}
				{formatDistanceToNowStrict(player?.lastOnline, { locale: ru, addSuffix: true })}
			{:else}
				давно
			{/if}
		{:else}
			Это вы!
		{/if}
	{/await}
</span>

<style>
	.last-seen-online {
		color: rgba(230, 230, 230, 0.75);
		margin: 0;
	}
</style>
