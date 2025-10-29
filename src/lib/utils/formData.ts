export function jsonToFormData<T>(data: T) {
	const formData = new FormData();
	if (data) {
		const entries = Object.entries(data);
		for (const [key, value] of entries) {
			formData.append(key, value as any);
		}
	}
	return formData;
}
