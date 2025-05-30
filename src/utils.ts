import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localeData from 'dayjs/plugin/localeData';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.locale('ru');
dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);
dayjs.extend(localeData);

export function pluralize(
	count: number,
	words: [string, string, string],
	withCount = false
) {
	const cases = [2, 0, 1, 1, 1, 2];
	const word =
		words[
			count % 100 > 4 && count % 100 < 20 ? 2 : cases[Math.min(count % 10, 5)]
		];
	return withCount ? `${count} ${word}` : word;
}

export const age = (value: number) =>
	pluralize(value, ['год', 'года', 'лет'], true);

export const convertURL = (url: string) => {
	const a = document.createElement('a');
	a.href = url;
	return new URL(a.href);
};

export function chunk<T>(arr: T[], chunkSize: number) {
	const res: T[][] = [];
	for (let i = 0; i < arr.length; i += chunkSize) {
		const row = arr.slice(i, i + chunkSize);
		res.push(row);
	}
	return res;
}

export function capitalizeString(s: string) {
	return s.slice(0, 1).toUpperCase() + s.slice(1);
}

// сбор данных с полей форм
export function processFormData<T>(formData: FormData): T {
	const formValues: Record<string, string | string[]> = {};
	const processedKeys = new Set<string>();

	// Сначала обрабатываем все ключи
	formData.forEach((_, key) => {
		if (processedKeys.has(key)) return;
		processedKeys.add(key);

		const allValues = formData.getAll(key);

		if (allValues.length > 1) {
			// Если несколько значений - сохраняем как массив
			formValues[key] = allValues.map(String);
		} else {
			// Одиночное значение
			const value = allValues[0];
			formValues[key] =
				typeof value === 'object' ? JSON.stringify(value) : String(value);
		}
	});

	return formValues as unknown as T;
}
