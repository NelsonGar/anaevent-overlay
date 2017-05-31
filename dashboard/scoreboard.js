(function () {
	'use strict';

	const show = document.getElementById('show');
	const update = document.getElementById('update');
	const hide = document.getElementById('hide');
	const swap = document.getElementById('swap');
	const reset = document.getElementById('reset');
	const bluScore = document.querySelectorAll('paper-input[label="Score"]')[0];
	const bluTag = document.querySelectorAll('paper-input[label="Tag"]')[0];
	const bluTeam = document.querySelectorAll('paper-input[label="Team"]')[0];
	const redScore = document.querySelectorAll('paper-input[label="Score"]')[1];
	const redTag = document.querySelectorAll('paper-input[label="Tag"]')[1];
	const redTeam = document.querySelectorAll('paper-input[label="Team"]')[1];
	const tournamentHashtag = document.querySelectorAll('paper-input[label="Hashtag"]')[0];
	const tournamentMomentum = document.querySelectorAll('paper-input[label="Momentum"]')[0];
	const scoreboardShowing = nodecg.Replicant('scoreboardShowing');
	const scores = nodecg.Replicant('scores');

	scores.on('change', newVal => {
		bluScore.value = newVal.blu.score;
		bluTag.value = newVal.blu.tag;
		bluTeam.value = newVal.blu.team;
		redScore.value = newVal.red.score;
		redTag.value = newVal.red.tag;
		redTeam.value = newVal.red.team;
		tournamentMomentum.value = newVal.tmt.momentum;
		tournamentHashtag.value = newVal.tmt.hashtag;
	});

	function displayImage(elem) {
	    var image = document.getElementById("canvas");
	    image.src = elem.value;        
	}

	scoreboardShowing.on('change', newVal => {
		if (newVal) {
			show.setAttribute('hidden', 'true');
			update.removeAttribute('hidden');
			hide.removeAttribute('disabled');
		} else {
			show.removeAttribute('hidden');
			update.setAttribute('hidden', 'true');
			hide.setAttribute('disabled', 'true');
		}
	});

	show.addEventListener('click', () => {
		doUpdate();
		scoreboardShowing.value = true;
	});
	
	update.addEventListener('click', doUpdate);

	hide.addEventListener('click', () => {
		scoreboardShowing.value = false;
	});

	swap.addEventListener('click', () => {
		scores.value = {
			red: {
				score: scores.value.blu.score,
				tag: scores.value.blu.tag,
				team: scores.value.blu.team,
			},
			blu: {
				score: scores.value.red.score,
				tag: scores.value.red.tag,
				team: scores.value.red.team,
			},
			tmt: {
				hashtag: scores.value.tmt.hashtag,
				momentum: scores.value.tmt.momentum
			}
		};
	});

	reset.addEventListener('click', () => {
		scores.value = {
			red: {
				score: 0,
				tag: '',
				team: ''
			},
			blu: {
				score: 0,
				tag: '',
				team: ''
			},
			tmt: {
				hashtag: '',
				momentum: ''
			}
		};
	});

	function doUpdate() {
		scores.value = {
			red: {
				score: redScore.value,
				tag: redTag.value,
				team: redTeam.value,
			},
			blu: {
				score: bluScore.value,
				tag: bluTag.value,
				team: bluTeam.value,
			},
			tmt: {
				hashtag: tournamentHashtag.value,
				momentum: tournamentMomentum.value
			}
		};
	}

})();
