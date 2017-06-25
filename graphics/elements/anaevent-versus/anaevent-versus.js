(function () {
	'use strict';

	const scores = nodecg.Replicant('scores');

	Polymer({
		is: 'anaevent-versus',
		properties: {	
			redTag: {
					type: String,
					value: 'RED',
					observer: 'redTagChanged'
				},
			bluTag: {
					type: String,
					value: 'BLU',
					observer: 'bluTagChanged'
				}
		},

		bluTagChanged(newVal) {
			this.changeTag(this.$$('.tagLeft'), newVal);
		},

		redTagChanged(newVal) {
			this.changeTag(this.$$('.tagRight'), newVal);
		},

		attached() {
			scores.on('change', newVal => {
				this.redTag = newVal.red.tag;
				this.bluTag = newVal.blu.tag;
			});
		},

		ready() {
			
		},

		changeTag(tagEl, newValue) {
			const tl = new TimelineLite();

			tl.add('start');
			tl.to(tagEl, 0, {
				opacity: '0',
				ease: Power3.easeIn
			}, 'start');

			tagEl.innerHTML = newValue;

			tl.to(tagEl, 0.5, {
				opacity: '1',
				ease: Power3.easeIn
			}, 0);
		}

	});
})();
