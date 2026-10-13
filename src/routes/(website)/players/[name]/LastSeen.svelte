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
		Loading...
	{:then value}
		{#if "online" in value}
			Сейчас играет
		{:else if "isBanned" in value}
			{@const { pronouns } = value}
			{#if pronouns === "он/его"}
				Blocked
			{:else if pronouns === "она/её"}
				Blocked
			{:else}
				Blocked
			{/if}
		{:else if "isSelf" in value}
			That's you!
		{:else}
			{@const { pronouns, lastSeen } = value}
			{#if pronouns === "он/его"}
				Last played
			{:else if pronouns === "она/её"}
				Last played
			{:else}
				Last played
			{/if}
			{#if lastSeen !== null}
				{formatDistanceToNowStrict(lastSeen, { addSuffix: true })}
			{:else}
				a long time ago
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
