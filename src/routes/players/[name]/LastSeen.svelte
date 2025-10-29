<script lang="ts">
	import { formatDistanceToNowStrict } from "date-fns";
	import { ru } from "date-fns/locale/ru";

	let {
		value,
	}: {
		value: Promise<
			| {
					online: true;
			  }
			| {
					lastSeen: Date | null;
					pronouns?: string;
			  }
			| {
					isSelf: true;
			  }
		>;
	} = $props();
</script>

<span class="last-seen-online">
	{#await value}
		Загрузка...
	{:then value}
		{#if "online" in value}
			Сейчас играет
		{:else if "isSelf" in value}
			Это вы!
		{:else}
			{@const { pronouns, lastSeen } = value}
			{#if pronouns === "он/его"}
				Играл
			{:else if pronouns === "она/её"}
				Играла
			{:else}
				Играли
			{/if}
			{#if lastSeen !== null}
				{formatDistanceToNowStrict(lastSeen, { locale: ru, addSuffix: true })}
			{:else}
				давно
			{/if}
		{/if}
	{/await}
</span>

<style>
	.last-seen-online {
		color: rgba(230, 230, 230, 0.75);
		margin: 0;
	}
</style>
