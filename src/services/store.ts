import { ctx } from '@/stores/ctx';
import type { Ctx } from '@reatom/framework';

export class ChatStore {
	protected store: Ctx;

	constructor() {
		this.store = ctx;
	}
}
