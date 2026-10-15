// Registra un evento en Umami (analítica sin cookies). Si el script no cargó (local, bloqueador), no hace nada.
type Umami = { track: (event: string, data?: Record<string, string | number>) => void };

export function track(event: string, data?: Record<string, string | number>) {
	(window as unknown as { umami?: Umami }).umami?.track(event, data);
}
