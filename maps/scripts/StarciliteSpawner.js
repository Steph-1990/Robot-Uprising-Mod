var potentialSpawnPoints = TriggerHelper.GetLandSpawnPoints();
var validSpawnPoint = [];

var cmpTemplateManager = Engine.QueryInterface(SYSTEM_ENTITY, IID_TemplateManager);
var OreTemplates = shuffleArray(cmpTemplateManager.FindAllTemplates(false).filter(
	name => GetIdentityClasses(cmpTemplateManager.GetTemplate(name).Identity || {}).indexOf("Starcilite") != -1)); // ("Starcilite") ==> datatype="tokens"

var TimerID = 0;
var StarciliteSpawnInterval = 300000;
	
Trigger.prototype.OnGlobalInitGame = function(msg)
{
	let cmpTrigger = Engine.QueryInterface(SYSTEM_ENTITY, IID_Trigger);
	let validPointIndex = 0;

	// On stocke les points de spawn possedant la classe "TriggerPoint" dans un nouveau tableau
	for (let i = 0; i < potentialSpawnPoints.length; i++) 
		{
			let cmpIdentity = Engine.QueryInterface(potentialSpawnPoints[i], IID_Identity);
			if (cmpIdentity.HasClass("TriggerPoint"))
			{
				validSpawnPoint[validPointIndex] = potentialSpawnPoints[i];
				validPointIndex++;
			}
		}

	// On melange les valeurs a l'interieur du tableau pour que les cristaux n'apparaissent pas toujours au meme endroit
	validSpawnPoint = shuffleArray(validSpawnPoint);

	TimerID = cmpTrigger.DoRepeatedly(StarciliteSpawnInterval, "SpawnStarcilite", {}, StarciliteSpawnInterval);
};

Trigger.prototype.shuffleArray = function(array) 
{
    for (let i = array.length - 1; i > 0; i--) {
        let validPointIndex = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[validPointIndex];
        array[validPointIndex] = temp;
    }
}

Trigger.prototype.DisplayMessage = function(orePosition) 
{
	let cmpGUIInterface = Engine.QueryInterface(SYSTEM_ENTITY, IID_GuiInterface);
   
	cmpGUIInterface.PushNotification({
		"players": [1, 2], 
		"message": markForTranslation("A Meteorite crashed on the map and some Starcilite crystals can now be gathered!"),
		translateMessage: true
	});

	cmpGUIInterface.PushNotification({
		"type": "map-flare",
		"players": [1, 2],
		"target": orePosition
	});

}

Trigger.prototype.SpawnStarcilite = function()
{
	let OreInstance = [];
	let numSpawnedOre = 1;
	let cmpTrigger = Engine.QueryInterface(SYSTEM_ENTITY, IID_Trigger);


	if (!potentialSpawnPoints.length)
	{
		error("No trigger points found on this map that could be used as spawn points!");
		return;
	}
	else if (validSpawnPoint.length == 0)
	{		
		let cmpTimer = Engine.QueryInterface(SYSTEM_ENTITY, IID_Timer);
		cmpTimer.CancelTimer(TimerID);
	}
	else
	{
		for (let i = 0; i < numSpawnedOre; i++)
		{	
				OreInstance[i] = TriggerHelper.SpawnUnits(validSpawnPoint[validSpawnPoint.length-1], OreTemplates[i], 1, 0)[0];
				validSpawnPoint.pop(); // On supprime le point de spawn une fois qu'un cristal est apparu a son emplacement
				let cmpPositionOre = Engine.QueryInterface(OreInstance[i], IID_Position);
				cmpPositionOre.SetYRotation(randomAngle());
				this.DisplayMessage(cmpPositionOre.GetPosition());
		}	
	}	
};






