<script lang="ts">
	import OptionButton from "$lib/components/OptionButton.svelte";
	import SettingsSwitch from "$lib/components/SettingsSwitch.svelte";
	import { isActionFailure } from "@sveltejs/kit";
	import { pushNotificationsOff, pushNotificationsOn } from "./data.remote";
	import { onMount } from "svelte";
	import { PUBLIC_PUSH_KEY } from "$env/static/public";
	import { notificationSchema } from "./notification-schema";
	import { browser } from "$app/environment";
	import OptionButtonLabel from "$lib/components/OptionButtonLabel.svelte";

	let subscribed = $state(false);
	let subscription: PushSubscription | null = $state(null);
	let registration: ServiceWorkerRegistration | null = $state(null);
	let loading = $state(false);
	let error: null | string = $state(null);

	onMount(() => {
		if (typeof window !== "undefined" && "serviceWorker" in navigator) {
			navigator.serviceWorker.ready.then((reg) => {
				if ("getSubscription" in reg.pushManager) {
					reg.pushManager.getSubscription().then((sub) => {
						if (sub && !(sub.expirationTime && Date.now() > sub.expirationTime - 5 * 60 * 1000)) {
							subscription = sub;
							subscribed = true;
						}
					});
					registration = reg;
				}
			});
		}
	});
	const handleSubscribe = async () => {
		error = null;
		if (registration === null) {
			return;
		}
		loading = true;
		try {
			const sub = await registration.pushManager.subscribe({
				userVisibleOnly: true,
				applicationServerKey: PUBLIC_PUSH_KEY,
			});
			const subData = sub.toJSON();
			const req = await pushNotificationsOn(notificationSchema.parse(subData));
			if (isActionFailure(req)) {
				throw new Error(req.data);
			}
			subscription = sub;
			subscribed = true;
		} catch (e) {
			console.error(e);
			if (e instanceof Error && e.name === "NotAllowedError") {
				error = "not_allowed";
			} else {
				error = "unknown_subscribe";
			}
		} finally {
			loading = false;
		}
	};

	const handleUnsubscribe = async () => {
		error = null;
		if (registration === null || subscription === null) return;
		loading = true;
		try {
			await subscription.unsubscribe();

			await pushNotificationsOff(subscription.endpoint);
			subscription = null;
			subscribed = false;
		} catch (e) {
			console.error(e);
			error = "unknown_subscribe";
		} finally {
			loading = false;
		}
	};
</script>

{#if error}
	<div>
		{#if error === "not_allowed"}
			Your browser does not allow push-notifications. Try enabling them in the browser or site
			settings.
		{:else if error === "unknown_subscribe"}
			An error occurred while subscribing to push-notifications.
		{:else if error === "unknown_unsubscribe"}
			An error occurred while unsubscribing from push-notifications.
		{/if}
	</div>
{/if}

<OptionButton tag="div">
	Уведомления от браузера
	{#if browser && registration}
		<SettingsSwitch
			disabled={loading}
			value={subscribed}
			onChange={subscribed ? handleUnsubscribe : handleSubscribe}
		/>
	{:else}
		<OptionButtonLabel>Ошибка</OptionButtonLabel>
	{/if}
</OptionButton>
