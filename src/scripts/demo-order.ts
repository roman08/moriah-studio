// Carrito de los demos de menú y catálogo. No envía nada: arma el mensaje de WhatsApp y lo muestra.
//
// Marcado esperado en la página:
//   [data-product data-id data-name data-price]  con  [data-add]  y  [data-stepper] > [data-dec] [data-count] [data-inc]
// y el componente OrderCart ([data-order]).

const root = document.querySelector<HTMLElement>('[data-order]');

if (root) {
	const business = root.dataset.business ?? 'el negocio';
	const modeLabel = root.dataset.modeLabel ?? 'Entrega';
	const sheet = root.querySelector<HTMLDialogElement>('[data-cart-sheet]')!;
	const bar = root.querySelector<HTMLButtonElement>('[data-cart-open]')!;
	const list = root.querySelector<HTMLElement>('[data-cart-list]')!;
	const form = root.querySelector<HTMLFormElement>('[data-order-form]')!;
	const stepCart = root.querySelector<HTMLElement>('[data-cart-step="cart"]')!;
	const stepSent = root.querySelector<HTMLElement>('[data-cart-step="sent"]')!;
	const preview = root.querySelector<HTMLElement>('[data-order-message]')!;

	const money = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });
	const cart = new Map<string, { name: string; price: number; qty: number }>();

	const products = new Map(
		[...document.querySelectorAll<HTMLElement>('[data-product]')].map((el) => [
			el.dataset.id!,
			{ el, name: el.dataset.name!, price: Number(el.dataset.price) },
		]),
	);

	const setQty = (id: string, qty: number) => {
		const product = products.get(id);
		if (!product) return;
		if (qty <= 0) cart.delete(id);
		else cart.set(id, { name: product.name, price: product.price, qty });
		render();
	};

	const totals = () => {
		let count = 0;
		let total = 0;
		for (const item of cart.values()) {
			count += item.qty;
			total += item.qty * item.price;
		}
		return { count, total };
	};

	const stepperHtml = (id: string, qty: number) =>
		`<span class="d-stepper"><button type="button" data-dec data-id="${id}" aria-label="Quitar uno">−</button><span>${qty}</span><button type="button" data-inc data-id="${id}" aria-label="Agregar uno">+</button></span>`;

	const render = () => {
		for (const [id, { el }] of products) {
			const qty = cart.get(id)?.qty ?? 0;
			el.querySelector<HTMLElement>('[data-add]')!.hidden = qty > 0;
			const stepper = el.querySelector<HTMLElement>('[data-stepper]')!;
			stepper.hidden = qty === 0;
			stepper.querySelector('[data-count]')!.textContent = String(qty);
			el.classList.toggle('in-cart', qty > 0);
		}

		const { count, total } = totals();
		bar.hidden = count === 0;
		root.querySelectorAll('[data-cart-count]').forEach((el) => (el.textContent = String(count)));
		root.querySelectorAll('[data-cart-total]').forEach((el) => (el.textContent = money.format(total)));

		list.innerHTML = [...cart.entries()]
			.map(
				([id, item]) =>
					`<li><span class="d-line-name">${item.name}<small>${money.format(item.price)} c/u</small></span>${stepperHtml(id, item.qty)}<span class="d-line-total">${money.format(item.qty * item.price)}</span></li>`,
			)
			.join('');

		// Si el carrito se vacía mientras se revisa, se cierra el panel
		if (count === 0 && sheet.open && stepSent.hidden) sheet.close();
	};

	// Botones de agregar / + / − en tarjetas y en el carrito
	document.addEventListener('click', (event) => {
		const target = (event.target as HTMLElement).closest<HTMLElement>('[data-add], [data-inc], [data-dec]');
		if (!target) return;
		const id = target.dataset.id ?? target.closest<HTMLElement>('[data-product]')?.dataset.id;
		if (!id) return;
		const qty = cart.get(id)?.qty ?? 0;
		setQty(id, target.hasAttribute('data-dec') ? qty - 1 : qty + 1);
	});

	bar.addEventListener('click', () => {
		stepCart.hidden = false;
		stepSent.hidden = true;
		sheet.showModal();
	});
	root.querySelector('[data-cart-close]')!.addEventListener('click', () => sheet.close());
	// Cerrar al tocar fuera del panel
	sheet.addEventListener('click', (event) => {
		if (event.target === sheet) sheet.close();
	});

	form.addEventListener('submit', (event) => {
		event.preventDefault();
		const data = new FormData(form);
		const name = String(data.get('name') ?? '').trim();
		const mode = String(data.get('mode') ?? '');
		const notes = String(data.get('notes') ?? '').trim();
		const { total } = totals();
		const lines = [...cart.values()].map((item) => `• ${item.qty} × ${item.name} (${money.format(item.qty * item.price)})`);

		preview.textContent = [
			`¡Hola ${business}! Quiero hacer un pedido:`,
			...lines,
			`Total: ${money.format(total)}`,
			`A nombre de: ${name}`,
			`${modeLabel}: ${mode}`,
			notes && `Notas: ${notes}`,
		]
			.filter(Boolean)
			.join('\n');

		stepCart.hidden = true;
		stepSent.hidden = false;
	});

	root.querySelector('[data-order-reset]')!.addEventListener('click', () => {
		cart.clear();
		form.reset();
		sheet.close();
		render();
	});

	render();
}
