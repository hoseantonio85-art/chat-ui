export {};

declare global {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface Window {
		SBERORM_CHAT_WEBSOCKET_URL: string;
		SBERORM_CHAT_LOAD_LIMIT: number;
		readonly STAND_TYPE: string;
		readonly SBERNORM_CLICKSTREAM_KEY: string;
		readonly SBERNORM_CLICKSTREAM_URL: string;
		readonly SBERNORM_CLICKSTREAM_ENABLED: number;
		readonly FF_CHAT_ATTACHMENTS_ENABLED: number;
		readonly FF_UNIVERSAL_AGENT_ENABLED?: number;
		readonly FF_CHAT_THREADS_ENABLED?: number;
		readonly FF_CHAT_ASSISTANT_SKILLS_ENABLED?: number;
	}
}
