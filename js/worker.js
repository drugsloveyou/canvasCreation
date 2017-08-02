function renderCanvasDiffScale(fn, context) {
	fn.call(context);
	postMessage();
}