// 🎨 Глобальная палитра
export const COLORS_ARRAY = [
	'#B2DDFF',
	'#E9D6FFF5',
	'#FFCCC9F7',
	'#FFDF86F7',
	'#7FFFD799',
	'#FFD1AC',

	'#C8E6C9F5',
	'#FFCCBCF5',
	'#D1C4E9F5',
	'#B3E5FCF5',
	'#FFF59DF5',
	'#A5D6A7F5',
];

export const getColorByIndex = (index: number): string =>
	COLORS_ARRAY[Math.abs(index) % COLORS_ARRAY.length]; // Math.abs — на случай -1
