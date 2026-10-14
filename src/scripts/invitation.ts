// Interacciones de las invitaciones demo: cuenta regresiva, música y confirmación de asistencia.

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* === Cuenta regresiva === */
document.querySelectorAll<HTMLElement>('[data-countdown]').forEach((root) => {
	const target = new Date(root.dataset.countdown!).getTime();
	const units = {
		days: root.querySelector<HTMLElement>('[data-unit="days"]'),
		hours: root.querySelector<HTMLElement>('[data-unit="hours"]'),
		minutes: root.querySelector<HTMLElement>('[data-unit="minutes"]'),
		seconds: root.querySelector<HTMLElement>('[data-unit="seconds"]'),
	};
	const done = root.querySelector<HTMLElement>('[data-countdown-done]');

	const tick = () => {
		const diff = Math.max(0, target - Date.now());
		const values = {
			days: Math.floor(diff / 86_400_000),
			hours: Math.floor(diff / 3_600_000) % 24,
			minutes: Math.floor(diff / 60_000) % 60,
			seconds: Math.floor(diff / 1000) % 60,
		};
		for (const [key, el] of Object.entries(units)) {
			if (el) el.textContent = String(values[key as keyof typeof values]).padStart(2, '0');
		}
		if (diff === 0 && done) {
			done.hidden = false;
			clearInterval(timer);
		}
	};
	const timer = setInterval(tick, 1000);
	tick();
});

/* === Música: una caja musical generada con Web Audio (sin archivos de audio) === */
const progressions: Record<string, { root: number; wave: OscillatorType; step: number }> = {
	boda: { root: 261.63, wave: 'sine', step: 0.3 }, // Do mayor, vals tranquilo
	xv: { root: 293.66, wave: 'triangle', step: 0.24 }, // Re mayor, más brillante
};
// I – V – vi – IV, como semitonos desde la tónica
const chords = [
	[0, 4, 7],
	[7, 11, 14],
	[9, 12, 16],
	[5, 9, 12],
];
// Arpegio de 6 notas por compás (3/4): [índice del acorde, octava]
const pattern: [number, number][] = [
	[0, -1],
	[1, 0],
	[2, 0],
	[0, 1],
	[2, 0],
	[1, 0],
];

function createMusicBox(style: string) {
	const { root, wave, step } = progressions[style] ?? progressions.boda;
	const ctx = new AudioContext();
	const master = ctx.createGain();
	master.gain.value = 0.16;
	// Eco suave para dar ambiente
	const delay = ctx.createDelay();
	delay.delayTime.value = step * 1.5;
	const feedback = ctx.createGain();
	feedback.gain.value = 0.28;
	delay.connect(feedback).connect(delay);
	delay.connect(master);
	master.connect(ctx.destination);

	let noteIndex = 0;
	let nextTime = 0;
	let timer = 0;

	const playNote = (freq: number, time: number) => {
		for (const [type, mult, vol] of [
			[wave, 1, 0.5],
			['sine', 2, 0.12],
		] as const) {
			const osc = ctx.createOscillator();
			const gain = ctx.createGain();
			osc.type = type;
			osc.frequency.value = freq * mult;
			gain.gain.setValueAtTime(0.0001, time);
			gain.gain.exponentialRampToValueAtTime(vol, time + 0.01);
			gain.gain.exponentialRampToValueAtTime(0.0001, time + 1.4);
			osc.connect(gain);
			gain.connect(master);
			gain.connect(delay);
			osc.start(time);
			osc.stop(time + 1.5);
		}
	};

	const schedule = () => {
		while (nextTime < ctx.currentTime + 0.3) {
			const chord = chords[Math.floor(noteIndex / pattern.length) % chords.length];
			const [tone, octave] = pattern[noteIndex % pattern.length];
			playNote(root * 2 ** ((chord[tone] + octave * 12) / 12), nextTime);
			nextTime += step;
			noteIndex++;
		}
	};

	return {
		play() {
			ctx.resume();
			nextTime = ctx.currentTime + 0.05;
			timer = window.setInterval(schedule, 100);
			schedule();
		},
		pause() {
			clearInterval(timer);
			ctx.suspend();
		},
	};
}

document.querySelectorAll<HTMLButtonElement>('[data-music]').forEach((button) => {
	let box: ReturnType<typeof createMusicBox> | undefined;
	let playing = false;
	button.addEventListener('click', () => {
		box ??= createMusicBox(button.dataset.music ?? 'boda');
		playing = !playing;
		if (playing) box.play();
		else box.pause();
		button.setAttribute('aria-pressed', String(playing));
		button.classList.toggle('is-playing', playing && !reduceMotion);
	});
});

/* === Confirmación de asistencia (demo: muestra el mensaje en vez de enviarlo) === */
document.querySelectorAll<HTMLFormElement>('[data-rsvp]').forEach((form) => {
	const result = form.parentElement?.querySelector<HTMLElement>('[data-rsvp-result]');
	const preview = result?.querySelector<HTMLElement>('[data-rsvp-message]');

	form.addEventListener('submit', (event) => {
		event.preventDefault();
		const data = new FormData(form);
		const name = String(data.get('name') ?? '').trim();
		const guests = Number(data.get('guests') ?? 1);
		const attending = data.get('attending') === 'si';
		const eventName = form.dataset.rsvp ?? 'el evento';

		const message = attending
			? `¡Hola! Soy ${name}. Confirmo mi asistencia a ${eventName}. ${guests === 1 ? 'Asistiré yo.' : `Seremos ${guests} personas.`} 🎉`
			: `¡Hola! Soy ${name}. Muchas gracias por la invitación a ${eventName}, lamentablemente no podré asistir. ¡Les deseo un día increíble!`;

		if (result && preview) {
			preview.textContent = message;
			form.hidden = true;
			result.hidden = false;
			result.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
		}
	});

	result?.querySelector('[data-rsvp-reset]')?.addEventListener('click', () => {
		form.reset();
		form.hidden = false;
		result.hidden = true;
	});
});
