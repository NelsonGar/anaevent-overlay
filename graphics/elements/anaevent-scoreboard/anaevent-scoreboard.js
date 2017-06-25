(function () {
	'use strict';

	const scoreboardShowing = nodecg.Replicant('scoreboardShowing');
	const scores = nodecg.Replicant('scores');
	const playerOneCountry = nodecg.Replicant('playerOneCountry');
	const playerTwoCountry = nodecg.Replicant('playerTwoCountry');

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
			bluCountry: {
				type: String,
				value: 'flags/France.png',
				observer: 'bluCountryChanged'
			},
			redCountry: {
				type: String,
				value: 'flags/France.png',
				observer: 'redCountryChanged'
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

		tournamentHashtagChanged(newVal) {
			this.changeHashtag(this.$$('div[team="tournament"] .hashtag'), newVal);
		},

		tournamentMomentumChanged(newVal) {
			this.changeMomentum(this.$$('div[team="tournament"] .momentum'), newVal);
		},

		bluCountryChanged(newVal) {
			this.changeBluCountry(this.$$('img[id="playerOneCountry"]'), newVal);
		},

		redCountryChanged(newVal) {
			this.changeRedCountry(this.$$('img[id="playerTwoCountry"]'), newVal);
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
				this.tournamentMomentum = newVal.tmt.momentum;
				this.tournamentHashtag = newVal.tmt.hashtag;
			});

			playerOneCountry.on('change', newVal => {
				this.bluCountry = 'elements/anaevent-scoreboard/flags/'+newVal.name+'.png';
			});

			playerTwoCountry.on('change', newVal => {
				this.redCountry = 'elements/anaevent-scoreboard/flags/'+newVal.name+'.png';
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
			const team = this.getElementsByClassName('team');
			const momentum = this.getElementsByClassName('momentum');
			const barresJoueurs = this.getElementsByClassName('barresjoueurs');
			const cull = this.getElementsByClassName('cull');
			const triangleTop = this.getElementsByClassName('triangleTop');
			const self = this;
			const tl = new TimelineLite();

			nodecg.playSound('scoreboard_in');

			tl.add('start');

			tl.to(cull, 0, {opacity:'1'});

			tl.to(momentum, 2, {
				opacity: '1',
				ease: Power3.easeIn
			}, 1);

			tl.to(barresJoueurs, 1, {
				ease: Back.easeInOut.config(1.7),
				y: '0%'
			}, 'start');

			tl.to(triangleTop, 2, {
				ease: Power1.easeInOut,
				y: '0%'
			}, 'start');

			tl.from(team, 2.2, {
				opacity: '0',
				ease: Power3.easeIn
			}, 'start');

			tl.from(tagWrappers, 2.5, {
				opacity: '0',
				ease: Power3.easeIn
			}, 'start');

			tl.to(scores, 2.8, {
				opacity: '1',
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
			const team = this.getElementsByClassName('team');
			const barresJoueurs = this.getElementsByClassName('barresjoueurs');
			const momentum = this.getElementsByClassName('momentum');
			const cull = this.getElementsByClassName('cull');
			const triangleTop = this.getElementsByClassName('triangleTop');
			const self = this;
			const tl = new TimelineLite();

			nodecg.playSound('scoreboard_out');

			tl.add('start');
			
			tl.to(momentum, 1, {
				opacity: '0',
				ease: Power3.easeIn
			}, 'start');

			tl.to(barresJoueurs, 2, {
				y: '-100%',
				ease: Back.easeIn
			}, 'start');

			tl.to(triangleTop, 1, {
				ease: Power1.easeInOut,
				y: '-100%'
			}, 'start');

			tl.to(team, 0.2, {
				opacity: '0',
				ease: Power3.easeIn
			}, 'start');

			tl.to(tagWrappers, 0.5, {
				opacity: '0',
				ease: Power3.easeIn
			}, 'start');

			tl.to(scores, 0.8, {
				opacity: '0',
				ease: Power3.easeIn
			}, 'start');

			tl.set([tagWrappers, scores, team], {
				clearProps: 'all',
				onComplete() {
					tl.to(cull, 0, {opacity:'0'});		
				}
			});
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
		},

		changeScore(scoreEl, newValue) {
			const tl = new TimelineLite();
			
			if (newValue != 0)
				nodecg.playSound('score_plus');

			tl.add('start');
			tl.to(scoreEl, 0, {
				opacity: '0',
				ease: Power3.easeIn
			}, 'start');

			scoreEl.innerHTML = newValue;

			tl.to(scoreEl, 0.5, {
				opacity: '1',
				ease: Power3.easeIn
			}, 0);
		},

		changeTeam(teamEl, newValue) {
			const tl = new TimelineLite();

			tl.add('start');
			tl.to(teamEl, 0, {
				opacity: '0',
				ease: Power3.easeIn
			}, 'start');

			teamEl.innerHTML = newValue;

			tl.to(teamEl, 0.5, {
				opacity: '1',
				ease: Power3.easeIn
			}, 0);
		},

		changeMomentum(momEl, newValue) {
			const tl = new TimelineLite();

			tl.add('start');
			tl.to(momEl, 0, {
				opacity: '0',
				ease: Power3.easeIn
			}, 'start');

			momEl.innerHTML = newValue;

			tl.to(momEl, 0.5, {
				opacity: '1',
				ease: Power3.easeIn
			}, 0);
		},

		changeHashtag(hashEl, newValue) {
			const tl = new TimelineLite();

			tl.add('start');
			tl.to(hashEl, 0, {
				opacity: '0',
				ease: Power3.easeIn
			}, 'start');

			hashEl.innerHTML = newValue;

			tl.to(hashEl, 0.5, {
				opacity: '1',
				ease: Power3.easeIn
			}, 0);
		},

		changeBluCountry(countryOneEl, newValue) {
			const tl = new TimelineLite();

			tl.add('start');
			tl.to(countryOneEl, 0, {
				opacity: '0',
				ease: Power3.easeIn
			}, 'start');

			countryOneEl.src = newValue;

			tl.to(countryOneEl, 0.5, {
				opacity: '0',
				ease: Power3.easeIn
			}, 0);
		},

		changeRedCountry(countryTwoEl, newValue) {
			const tl = new TimelineLite();

			tl.add('start');
			tl.to(countryTwoEl, 0, {
				opacity: '0',
				ease: Power3.easeIn
			}, 'start');

			countryTwoEl.src = newValue;

			tl.to(countryTwoEl, 0.5, {
				opacity: '0',
				ease: Power3.easeIn
			}, 0);
		}
	});
})();
