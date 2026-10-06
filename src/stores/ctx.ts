import { connectLogger, createCtx } from '@reatom/framework';

// create context in the app root and use it to start all computations
// for tests or SSR you will want to create a different context
// eslint-disable-next-line unicorn/prevent-abbreviations
export const ctx = createCtx();

if (import.meta.env.DEV) {
	connectLogger(ctx);
}
