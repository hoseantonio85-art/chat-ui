import MobileDetect from 'mobile-detect';
import { useMemo } from 'react';

export const useMobileDetect = () => {
	return useMemo(() => {
		if (typeof window === 'undefined') {
			return {
				isPhone: false,
			};
		}

		const md = new MobileDetect(window.navigator.userAgent);

		return {
			isPhone: !!md.phone(),
		};
	}, []);
};
