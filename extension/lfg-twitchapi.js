'use strict';

module.exports = function(nodecg) {
	const twitchApi = nodecg.extensions['lfg-twitchapi'];

	// Gets the 25 most recent subs
	// {{username}} will be automatically replaced by the username specified in lfg-twitchapi.json
	twitchApi.get('/channels/{{username}}/follows', {
		limit: 25, 
		direction: 'desc'
	}).then(response => {
		if (response.statusCode !== 200) {
			return nodecg.log.error(response.body.error, response.body.message);
		}
		console.log("NIQUE TA MERE LA PUTE");
		// Go through subs in reverse, from oldest to newest
		response.body.follows.reverse().forEach(follows => {
			const username = follows.user.display_name;
			console.log('%s subscribed to channel %s', username, twitchApi.channel);
		});
	}).catch(err => {
		nodecg.log.error(err);
	});
};