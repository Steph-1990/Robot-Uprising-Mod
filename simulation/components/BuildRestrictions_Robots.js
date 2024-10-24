/**
 * ToDo: Translate the Distance to print the correct warning.
 * @param {Player} cmpPlayer the owner's player component.
 * @returns {Number[]} - The list of the affect player ids.
 */
BuildRestrictions.prototype.GetAffectedPlayers = function(cmpPlayer)
{
	const playerId = cmpPlayer.GetPlayerID();
	let appliesTo;

	if (!this.template.Distance || !this.template.Distance.AppliesTo)
		appliesTo = "own";

	switch(this.template.Distance.AppliesTo)
	{
		case "all":
			return Engine.QueryInterface(SYSTEM_ENTITY, IID_PlayerManager)?.GetAllPlayers();
		case "ally":
			return [playerId].concat(cmpPlayer.GetAllies());
		case "gaia":
			return [0];
		case "enemy":
			return cmpPlayer.GetEnemies();
		case "own":
		default:
			return [playerId];
	}
};

