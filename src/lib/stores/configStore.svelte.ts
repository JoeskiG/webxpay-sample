import { DEFAULT_CHECKOUT_ACTION_URL } from '$lib/constants/payment';

export type ConfigState = {
	secret_key: string;
	publicKey: string | null;
	checkoutUrl: string | null;
};

type ConfigStore = {
	state: ConfigState;
};

const initialState: ConfigStore = {
	state: {
		secret_key: '',
		publicKey: null,
		checkoutUrl: DEFAULT_CHECKOUT_ACTION_URL
	}
};

export const configStore = $state<ConfigStore>(initialState);

export function initConfigStore(initialState?: ConfigState) {
	if (initialState) {
		configStore.state = initialState;
	}
}

export function setConfig(newConfig: ConfigState) {
	configStore.state = { ...newConfig };
	updateCookies(configStore.state);
	return configStore.state;
}

export function clearConfig() {
	configStore.state = { ...initialState.state };
	updateCookies(configStore.state);
	return configStore.state;
}

async function updateCookies(configState: ConfigState) {
	const formData = new FormData();
	formData.append('config', JSON.stringify(configState));
	return fetch('/config', {
		method: 'POST',
		credentials: 'include',
		body: formData
	});
}
