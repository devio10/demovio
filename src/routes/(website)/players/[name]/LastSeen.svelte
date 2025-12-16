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
					isBanned: true;
					pronouns?: string;
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
		{:else if "isBanned" in value}
			{@const { pronouns } = value}
			{#if pronouns === "он/его"}
				Заблокирован
			{:else if pronouns === "она/её"}
				Заблокирована
			{:else}
				Заблокированы
			{/if}
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

<style lang="scss">
	.last-seen-online {
		color: rgba(230, 230, 230, 0.75);
		margin: 0;
		font-size: 16px;
	}
	:global([data-prefers-contrast]) {
		.last-seen-online {
			color: var(--general-light-text);
		}
	}
</style>
