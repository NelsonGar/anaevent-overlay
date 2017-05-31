(function () {
	'use strict';

	const playerOneCountry = nodecg.Replicant('playerOneCountry');
	const playerTwoCountry = nodecg.Replicant('playerTwoCountry');

	// Used to programmatically access any of the above 8 replicants, via `REPLICANTS[name]`.
	const REPLICANTS = {
		playerOneCountry,
		playerTwoCountry
	};

	Polymer({
		is: 'anaevent-flag-control',

		ready() {
			playerone.on('change', newVal => {
				this.playerOneCountry = {};
				this.playerOneCountry = newVal;
			});

			playertwo.on('change', newVal => {
				this.playerTwoCountry = {};
				this.playerTwoCountry = newVal;
			});
		},

		_handleSelectedItemChanged(e) {
			if (this.isDebouncerActive('_handleSelectedItemChanged')) {
				return;
			}

			const target = e.target;
			const slot = target.getAttribute('data-slot');
			const replicant = REPLICANTS[slot];

			if (!e.detail.value || !replicant) {
				return;
			}

			// Copy the values out individually, to avoid object reference problems down the line.
			const selectedItem = {
				name: e.detail.value.name,
				code: e.detail.value.code
			};

			// Clear out the target's selected item once we have it.

			this.debounce('_handleSelectedItemChanged', () => {
				replicant.value = selectedItem;
			});
		}
	});
})();
