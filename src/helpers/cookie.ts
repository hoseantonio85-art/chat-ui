export function getCookie(name: string) {
	const matches = document.cookie.match(
		new RegExp(
			'(?:^|; )' +
				name.replaceAll(/([$()*+./?[\\\]^{|}])/g, String.raw`\$1`) +
				'=([^;]*)',
		),
	);

	return matches ? decodeURIComponent(matches[1]) : undefined;
}
