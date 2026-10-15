(function () {
	'use strict';

	var root = document.documentElement;

	var toggle = document.getElementById('theme-toggle');
	if (toggle) {
		var paint = function (dark) {
			root.dataset.theme = dark ? 'dark' : 'light';
			toggle.textContent = dark ? 'Light' : 'Dark';
			toggle.setAttribute('aria-pressed', String(dark));
		};
		paint(root.dataset.theme === 'dark');
		toggle.hidden = false;
		toggle.addEventListener('click', function () {
			var dark = root.dataset.theme !== 'dark';
			paint(dark);
			try {
				localStorage.setItem('theme', dark ? 'dark' : 'light');
			} catch (e) {}
		});
	}

	var filters = document.getElementById('filters');
	var status = document.getElementById('filter-status');
	if (filters) {
		filters.hidden = false;
		filters.addEventListener('click', function (event) {
			var target = event.target;
			var button = target instanceof Element ? target.closest('button[data-tag]') : null;
			if (!button || !filters.contains(button)) return;

			var tag = button.dataset.tag;
			var buttons = filters.querySelectorAll('button[data-tag]');
			for (var i = 0; i < buttons.length; i++) {
				buttons[i].setAttribute('aria-pressed', String(buttons[i] === button));
			}

			var cards = document.querySelectorAll('[data-tags]');
			var shown = 0;
			for (var j = 0; j < cards.length; j++) {
				var tags = (cards[j].dataset.tags || '').split('|');
				var hide = tag !== 'All' && tags.indexOf(tag) === -1;
				cards[j].hidden = hide;
				if (!hide) shown++;
			}

			if (status) {
				status.textContent =
					tag === 'All'
						? shown + ' projects'
						: shown + ' of ' + cards.length + ' projects tagged ' + tag;
			}
		});
	}
})();
