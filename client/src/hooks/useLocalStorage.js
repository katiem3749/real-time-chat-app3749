import { useEffect, useState } from "react";

// set up prefix to avoid confusion from values saved on localhost from different projects
const PREFIX = "chatRoom-";

export default function useLocalStorage(key, initialValue) {
	const prefixedKey = PREFIX + key;
	const [value, setValue] = useState(() => {
		const jsonValue = localStorage.getItem(prefixedKey);
		if (jsonValue !== "undefined" && jsonValue !== null)
			return JSON.parse(jsonValue);
		if (typeof initialValue === "function") {
			return initialValue();
		} else {
			return initialValue;
		}
	});

	useEffect(() => {
		localStorage.setItem(prefixedKey, JSON.stringify(value));
	}, [prefixedKey, value]);

	return [value, setValue];
}
