/**
 * This class is concerned with playing an ambient track, birds chirping etc.
 */
class Ambient
{
	constructor()
	{
		Engine.PlayAmbientSound(pickRandom(this.Tracks), false);
	}
}

/**
 * TODO: Let the map decide the tracks.
 */
Ambient.prototype.Tracks = [
	""
];
