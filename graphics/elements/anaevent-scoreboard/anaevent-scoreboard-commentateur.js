(function () {
	'use strict';

	const scoreboardShowing = nodecg.Replicant('scoreboardShowing');
	const scores = nodecg.Replicant('scores');

	Polymer({
		is: 'anaevent-scoreboard',

		properties: {
			redScore: {
				type: Number,
				value: 0,
				observer: 'redScoreChanged'
			},
			bluScore: {
				type: Number,
				value: 0,
				observer: 'bluScoreChanged'
			},
			redTag: {
				type: String,
				value: 'RED',
				observer: 'redTagChanged'
			},
			bluTag: {
				type: String,
				value: 'BLU',
				observer: 'bluTagChanged'
			},
			_initialized: {
				type: Boolean,
				value: false
			},
			_showing: {
				type: Boolean,
				value: false
			}
		},

		redScoreChanged(newVal) {
			this.changeScore(this.$$('div[team="red"] .score'), newVal);
		},

		bluScoreChanged(newVal) {
			this.changeScore(this.$$('div[team="blu"] .score'), newVal);
		},

		redTagChanged(newVal) {
			this.changeTag(this.$$('div[team="red"] .tag'), newVal);
		},

		bluTagChanged(newVal) {
			this.changeTag(this.$$('div[team="blu"] .tag'), newVal);
		},

		ready() {

		},

		attached() {
			scores.on('change', newVal => {
				this.redScore = newVal.red.score;
				this.bluScore = newVal.blu.score;
				this.redTag = newVal.red.tag;
				this.bluTag = newVal.blu.tag;
			});

			scoreboardShowing.on('change', newVal => {
				if (newVal) {
					this.show();
				} else {
					this.hide();
				}
			});
		},

		show() {
			if (this._showing) {
				return;
			}

			this._showing = true;

			const wrappers = this.getElementsByClassName('wrapper');
			const tagWrappers = this.getElementsByClassName('tagWrapper');
			const scores = this.getElementsByClassName('score');
			const cull = this.getElementsByClassName('cull');
			const self = this;
			const tl = new TimelineLite();


		},

		hide() {
			if (!this._showing) {
				return;
			}

			this._showing = false;

			const wrappers = this.getElementsByClassName('wrapper');
			const tagWrappers = this.getElementsByClassName('tagWrapper');
			const scores = this.getElementsByClassName('score');
			const cull = this.getElementsByClassName('cull');
			const self = this;
			const tl = new TimelineLite();

			//nodecg.playSound('scoreboard_out');
		},

		changeTag(tagEl, newValue) {
			tagEl.innerHTML = newValue;

			const bluTag = this.$$('div[team="blu"] .tag');
			const redTag = this.$$('div[team="red"] .tag');

			// Reset width of tag wrappers. We'll set it after the tags themselves are sorted
			const bluTagWrapper = bluTag.parentNode;
			const redTagWrapper = redTag.parentNode;
			bluTagWrapper.style.width = '';
			redTagWrapper.style.width = '';

			// If tag is wider than 200px, scale it down
			const maxWidth = 200;
			bluTag.style.transform = '';
			redTag.style.transform = '';

			if (bluTag.scrollWidth > bluTag.offsetWidth) {
				bluTag.style.transform = `scaleX(${bluTag.offsetWidth / bluTag.scrollWidth})`;
			}

			if (redTag.scrollWidth > redTag.offsetWidth) {
				redTag.style.transform = `scaleX(${redTag.offsetWidth / redTag.scrollWidth})`;
			}

			// Make both tag wrappers the same width
			let width = Math.max(bluTag.offsetWidth, redTag.offsetWidth);
			if (width > maxWidth) {
				width = maxWidth;
			}
			bluTagWrapper.style.width = `${width}px`;
			redTagWrapper.style.width = `${width}px`;
		},

		changeScore(scoreEl, newValue) {
			scoreEl.innerHTML = newValue;
		}
	});
})();
