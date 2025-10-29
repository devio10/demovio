<script lang="ts">
	import Dialog from "./components/Dialog.svelte";
	import DialogButton from "./components/DialogButton.svelte";
	import EnvelopeWait from "./components/icons/IconEnvelopeWait.svelte";
	import IconExclamationMark from "./components/icons/IconExclamationMark.svelte";
	import { isActionFailure } from "@sveltejs/kit";
	import { pushNotificationsOn } from "../routes/profile/notifications/data.remote";
	import { onMount } from "svelte";
	import { PUBLIC_PUSH_KEY } from "$env/static/public";
	import { notificationSchema } from "../routes/profile/notifications/notification-schema";
	import { browser } from "$app/environment";

	let { profile } = $props();

	let subscribed = $state(false);
	let registration: ServiceWorkerRegistration | null = $state(null);
	let error: null | string = $state(null);

	let opened = $state(false);

	onMount(() => {
		if (
			profile &&
			!profile.isActivated &&
			localStorage.getItem("not-activated-dialog") !== "true"
		) {
			opened = true;
		}
		if (typeof window !== "undefined" && "serviceWorker" in navigator) {
			navigator.serviceWorker.ready.then((reg) => {
				if ("getSubscription" in reg.pushManager) {
					reg.pushManager.getSubscription().then((sub) => {
						if (sub && !(sub.expirationTime && Date.now() > sub.expirationTime - 5 * 60 * 1000)) {
							subscribed = true;
						}
					});
					registration = reg;
				}
			});
		}
	});
	const handleSubscribe = async () => {
		if (subscribed) {
			return true;
		}
		error = null;
		if (registration === null) {
			return;
		}
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
			subscribed = true;
		} catch (e) {
			console.error(e);
			if (e instanceof Error && e.name === "NotAllowedError") {
				error = "not_allowed";
			} else {
				error = "unknown_subscribe";
			}
		}
	};
</script>

{#if profile && !profile.isActivated}
	<Dialog
		title="Добро Пожаловать в Demovio"
		description="Ваш заявка в процессе рассмотрения, обычно это занимает до двух дней. Мы можем прислать вам уведомление о готовности аккаунта."
		{opened}
	>
		{#snippet icon()}
			<EnvelopeWait />
		{/snippet}
		{#if browser && registration}
			<DialogButton
				accent
				onclick={() => {
					handleSubscribe();
					opened = false;
				}}
			>
				Включить уведомления
			</DialogButton>
		{:else}
			<DialogButton
				disabled
				accent
				onclick={() => {
					handleSubscribe();
					opened = false;
					localStorage.setItem("not-activated-dialog", "true");
				}}
			>
				Включить уведомления
			</DialogButton>
		{/if}
		<DialogButton
			onclick={() => {
				localStorage.setItem("not-activated-dialog", "true");
				opened = false;
			}}
		>
			Нет, спасибо
		</DialogButton>
	</Dialog>
{/if}

{#if error}
	<Dialog
		title="Не Удалось Включить Уведомления"
		description={error === "not_allowed"
			? "Ваш браузер не поддерживает уведомления. Попробуйте включить их в настройках браузера или сайта."
			: "Произошла ошибка при включении уведомлений от браузера."}
		opened={error !== null}
	>
		{#snippet icon()}
			<div style="padding: 6px">
				<IconExclamationMark />
			</div>
		{/snippet}
		<DialogButton onclick={() => (error = null)} />
	</Dialog>
{/if}
