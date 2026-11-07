export function forgetMemoryFact(facts: string[], fact: string): string[] {
	return facts.filter(item => item !== fact);
}

export function clearMemoryFacts(): string[] {
	return [];
}

export function resetThreads<T>(freshThread: T): T[] {
	return [freshThread];
}
