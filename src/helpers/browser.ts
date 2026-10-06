export const isSafari = () =>
	/^((?!chrome|android).)*safari/.test(navigator.userAgent.toLowerCase());
