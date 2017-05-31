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
			bluTeam: {
				type: String,
				value: 'TEAM1',
				observer: 'bluTeamChanged'
			},
			redTeam: {
				type: String,
				value: 'TEAM2',
				observer: 'redTeamChanged'
			},
			tournamentHashtag: {
				type: String,
				value: '',
				observer: 'tournamentHashtagChanged'
			},
			tournamentMomentum: {
				type: String,
				value: '',
				observer: 'tournamentMomentumChanged'
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

		redTeamChanged(newVal) {
			this.changeTeam(this.$$('div[team="red"] .team'), newVal);
		},

		bluTeamChanged(newVal) {
			this.changeTeam(this.$$('div[team="blu"] .team'), newVal);
		},

		ready() {

		},

		attached() {
			scores.on('change', newVal => {
				this.redScore = newVal.red.score;
				this.bluScore = newVal.blu.score;
				this.redTag = newVal.red.tag;
				this.bluTag = newVal.blu.tag;
				this.redTeam = newVal.red.team;
				this.bluTeam = newVal.blu.team;
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
			const teamName = this.getElementsByClassName('teamName');
			const pastilla = this.getElementsByClassName('pastilla');
			const cull = this.getElementsByClassName('cull');
			const self = this;
			const tl = new TimelineLite();

			//nodecg.playSound('scoreboard_in');

			tl.add('start');

			tl.to(cull, 0, {opacity:'1'});

			//Opacity
			tl.to(pastilla, 0.2, {
				opacity: '1',
				y: '0%',
				ease: Power3.easeIn
			}, 'start');momentum			


			tl.from(teamName, 1.5, {
				y: '-120%',
				ease: Power3.easeIn
			}, 'start');


			tl.from(tagWrappers, 1.5, {
				opacity: '0',
				ease: Power3.easeIn
			}, 'start');
			tl.from(scores, 1.5, {
				opacity: '0',
				ease: Power3.easeIn
			}, 'start');

		},

		hide() {
			if (!this._showing) {
				return;
			}

			this._showing = false;

			const wrappers = this.getElementsByClassName('wrapper');
			const tagWrappers = this.getElementsByClassName('tagWrapper');
			const scores = this.getElementsByClassName('score');
			const teamName = this.getElementsByClassName('teamName');
			const pastilla = this.getElementsByClassName('pastilla');
			const cull = this.getElementsByClassName('cull');
			const self = this;
			const tl = new TimelineLite();

			//nodecg.playSound('scoreboard_out');

			tl.add('start');


			//Opacity
			tl.to(pastilla, 1.5, {
				opacity: '0',
				y: '120%',
				ease: Power3.easeIn
			}, 'start');

			tl.to(teamName, 0.2, {
				y: '-120%',
				ease: Power3.easeIn
			}, 'start');


			tl.to(tagWrappers, 0.2, {
				opacity: '0',
				ease: Power3.easeIn
			}, 'start');
			tl.to(scores, 0.2, {
				opacity: '0',
				ease: Power3.easeIn
			}, 'start');

			tl.set([tagWrappers, scores, teamName, pastilla], {
				clearProps: 'all',
				onComplete() {
					tl.to(cull, 0, {opacity:'0'});		
				}
			});
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
		},

		changeTeam(teamEl, newValue) {
			teamEl.innerHTML = newValue;
		},

		changeMomentum(momEl, newValue) {
			momEl.innerHTML = newValue;
		},

		changeHashtag(hashEl, newValue) {
			hashEl.innerHTML = newValue;
		},

		changeFlag(flagEl, newValue) {
			flagEl.innerHTML = newValue;
		}
	});
})();
