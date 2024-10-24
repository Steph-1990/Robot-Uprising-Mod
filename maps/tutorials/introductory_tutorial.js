
Trigger.prototype.tutorialGoals = [
	{
		"instructions": markForTranslation("Welcome to the 0 A.D. : Robot Uprising tutorial!\n\n"),	
	},
	{
		"instructions": markForTranslation("To begin, left-click on a Buildobot."),
		"Init": function()
		{
			this.SpawnEntity("units/robot/worker", "trigger/tutorial_trigger_B", 1, 1, false, true);
		},
		"OnEntitiesSelected": function(msg)
		{
			let cmpIdentity = Engine.QueryInterface(msg.data.entity, IID_Identity);
			if	(cmpIdentity.HasClass("Worker") && msg.data.size == 1)
			{
				let entityID = this.GetMarkerEntity("trigger/tutorial_trigger_B");

				for (let entity of entityID )
				{
					this.DisableArrowDisplay(entity);
					Engine.DestroyEntity(entity);
				}
				this.NextGoal();
			}
		}
	},
	{
		"instructions": markForTranslation("Buildobots are the only units that can build structures. Structures are symbolized by green background icons.\nClick on the copper drill icon then place it on a copper deposit. Then left-click to build the drill."),
		"OnPlayerCommand": function(msg)
		{
			if (msg.cmd.type == "repair" && TriggerHelper.EntityMatchesClassList(msg.cmd.target, "CopperDrill"))
				this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("Once the Drill will be build, The Buildobot will automatically gather copper and bring it back to the Power Station.\nEach drill can only be built on the deposit corresponding to its type. For example, the copper drill must be placed on a copper deposit to operate. Think about it the next time you want to gather ore."),
		"OnStructureBuilt": function(msg)
		{
			if (TriggerHelper.EntityMatchesClassList(msg.building, "CopperDrill"))
				this.NextGoal();
		}
	},	
	{
		"instructions": markForTranslation("Good, your first Drill is now operational and your copper supply starting to fill up progressively. Most units and buildings also require titanium, so we'll need to build a new drill.\nThis time, select the four inactive Buildobots near your Power Station. To do this, hold down left mouse click and draw a rectangle around them before to release mouse button."),
		"OnEntitiesSelected": function(msg)
		{
			
			let cmpIdentity = Engine.QueryInterface(msg.data.entity, IID_Identity);
			if	(cmpIdentity.HasClass("Worker") && msg.data.size == 4)
				this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("By using several Buildobots to build a structure, you reduce the time needed to construct it. Let's try to build a titanium drill with your four Buildobots."),
		"OnStructureBuilt": function(msg)
		{
			if (TriggerHelper.EntityMatchesClassList(msg.building, "TitaniumDrill"))
				this.NextGoal();
		}
	 },
	{
		"instructions": markForTranslation("Perfect! Your two new drills are running at full speed but copper gathering rate is a bit slow against titanium one right? Let's try to fix this by training additional Buildobots.\nClick on the power station, then click on the Buildobot icon while holding down the batch production hotkey (shift key by default) to train 5 units at once."),
		"OnTrainingQueued": function(msg)
		{
			if (msg.unitTemplate != "units/robot/worker" || +msg.count == 1)
			{
				let cmpTrigger = Engine.QueryInterface(SYSTEM_ENTITY, IID_Trigger);
				cmpTrigger.DoAfterDelay(1, "RemoveTrainingQueue",  { "entity": msg.trainerEntity });
				let txt = msg.unitTemplate != "units/robot/worker" ?
					markForTranslation("Left-clik on the Buildobot icon."):
					markForTranslation("Do not forget to press the batch production hotkey (shift key by default) while clicking to produce multiple units.");
				this.WarningMessage(txt);
				return;
			}
			this.NextGoal();
		},
	},
	{
		"instructions": markForTranslation("Training units takes time, but you can take advantage of it to carry out other actions in parallel. Start by clicking on the copper drill."),
		"OnTrainingFinished": function(msg)
		{
			let cmpIdentity = Engine.QueryInterface(msg.entities[0], IID_Identity);
 			if(cmpIdentity.HasClass("Worker") && msg.entities.length == 5)
			this.trainingDone = true;
		},
		"OnEntitiesSelected": function(msg)
		{
			
			let cmpIdentity = Engine.QueryInterface(msg.data.entity, IID_Identity);
			if	(cmpIdentity.HasClass("CopperDrill"))
				this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("The yellow background icon visible on the right panel means that it is a technology. Technologies allow you to make various improvements to your units or buildings. If you place cursor on the icon, you will see this technology allows to increase the speed of resource recovery. Click this icon to search for this technology."),
		"OnTrainingFinished": function(msg)
		{
			if (this.researchDone)
				this.NextGoal();
			else
				this.trainingDone = true;
		},
		"OnResearchQueued": function(msg)
		{
			if (msg.technologyTemplate && TriggerHelper.EntityMatchesClassList(msg.researcherEntity, "CopperDrill") && this.trainingDone)
				this.NextGoal();
			else
				this.researchDone = true;
		},
	},
	{
		"instructions": markForTranslation("Alright, your new Buildobots are ready and waiting for your orders. But first, let's start by training additional Buildobots to prepare for the next step. Select the Power Station then click on the Buildobot icon twice by holding down the batch production hotkey."),
		"OnTrainingQueued": function(msg)
		{
			if (msg.unitTemplate != "units/robot/worker" || msg.count != 10)
			{
				let cmpTrigger = Engine.QueryInterface(SYSTEM_ENTITY, IID_Trigger);
				cmpTrigger.DoAfterDelay(1, "RemoveTrainingQueue",  { "entity": msg.trainerEntity });
				let txt = msg.unitTemplate != "units/robot/worker" ?
					markForTranslation("Left-clik on the Buildobot icon."):
					markForTranslation("Do not forget to press the batch production hotkey (shift key by default) while clicking to produce multiple units.");
				this.WarningMessage(txt);
				return;
			}
			this.NextGoal();
		},
	},
	{
		"instructions": markForTranslation("Take advantage to fairly spread your inactive Buildobots between the two drills while waiting for your new units to be trained. A drill can dispense resources to five Buildobots simultaneously, so don't hesitate to place as many units as possible on a drill in order to optimize gathering speed."),
		"OnTrainingFinished": function(msg)
		{
			this.NextGoal();
		},
	},
	{
		"instructions": markForTranslation("Quartz is a useful resource for researching technologies to improve units or buildings. Select five Buildobots and build a Quartz Drill."),
		"OnPlayerCommand": function(msg)
		{
			if (msg.cmd.type == "repair" && TriggerHelper.EntityMatchesClassList(msg.cmd.target, "QuartzDrill"))
				this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("It is time to train your first infantry units. Use your remaining Buildobots to build an Infantry Factory."),
		"OnStructureBuilt": function(msg)
		{
			if (TriggerHelper.EntityMatchesClassList(msg.building, "InfantryFactory"))
				this.NextGoal();
		},
	},
	{
		"instructions": markForTranslation("Select the Infantry Factory and train five Boombots. The Boombot is a kamikaze unit. It explodes on contact with a unit, structure or enemy fire causing area damage around it."),
		"OnTrainingQueued": function(msg)
		{
			if (msg.unitTemplate != "units/robot/infantry_area" || msg.count != 5)
			{
				let cmpTrigger = Engine.QueryInterface(SYSTEM_ENTITY, IID_Trigger);
				cmpTrigger.DoAfterDelay(1, "RemoveTrainingQueue",  { "entity": msg.trainerEntity });
				let txt = msg.unitTemplate != "units/robot/infantry_area" ?
					markForTranslation("Left-clik on the Boombot icon."):
					markForTranslation("Do not forget to press the batch production hotkey (shift key by default) while clicking to produce multiple units.");
				this.WarningMessage(txt);
				return;
			}
			this.NextGoal();
		},
	},
	{
		"instructions": markForTranslation("Look at the lightning bolt icon at the top of the screen. This icon represents your available energy level. Units and buildings require energy to operate and your current energy level is no longer sufficient to produce five additional units. To increase your energy level you need to create a generator. Use your idle Buildobots to create a generator."),
		"OnStructureBuilt": function(msg)
		{
			if (TriggerHelper.EntityMatchesClassList(msg.building, "Generator"))
				this.NextGoal();
		},
	},
	{
		"instructions": markForTranslation("Good, you now have enough energy to produce more units. Remember to build generators when your available energy level is deficient. Let's wait for the units training to be finished."),
		"OnTrainingFinished": function(msg)
		{
			this.SpawnEntity("trigger/trigger_point_B", "units/robot/infantry_melee", 5, 2);
			this.LaunchAttack("InfantryFactory", "InfantryMelee");
			this.NextGoal();
		},
	 },
	{
		"instructions": markForTranslation("Enemy is attacking us! Select your Boombots and right-click on enemy units to attack them."),
		"OnOwnershipChanged": function(msg)
		{
			if (msg.to != INVALID_PLAYER)
				return;
			if (this.IsAttackRepelled())
				this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("Well done, you repelled the enemy attack! As you can see, Boombots are quite effective against melee type units. Other enemy attacks could come, it would be wise to prepare for them. Click on the Power Station and train a Spybot."),
		"OnTrainingQueued": function(msg)
		{
			if (msg.unitTemplate != "units/robot/explorer" || msg.count != 1)
			{
				let cmpTrigger = Engine.QueryInterface(SYSTEM_ENTITY, IID_Trigger);
				cmpTrigger.DoAfterDelay(1, "RemoveTrainingQueue",  { "entity": msg.trainerEntity });
				let txt = markForTranslation("Left-clik on the Spybot icon.");
				this.WarningMessage(txt);
				return;
			}
		},
		"OnTrainingFinished": function(msg)
		{
			this.NextGoal();
		},
	},
	{
		"instructions": markForTranslation("Spybots are vulnerable units but they require few resources to train. They are also very useful to explore the map. Select your Spybot."),
		"OnEntitiesSelected": function(msg)
		{
			let cmpIdentity = Engine.QueryInterface(msg.data.entity, IID_Identity);
			if (cmpIdentity.HasClass("Explorer"))
			{
				let cmpUnitAI = Engine.QueryInterface(msg.data.entity, IID_UnitAI);
				cmpUnitAI.RequestFromTutorialScript();
				this.SpawnEntity("trigger/trigger_point_A", "trigger/tutorial_trigger_A", 1, 1, true, true);
				this.SpawnEntity("trigger/trigger_point_D", "units/robot/infantry_ranged", 10, 2);
				this.SpawnEntity("trigger/trigger_point_E", "units/robot/infantry_area", 5, 2);
				this.NextGoal();
			}	
		},
	},
	{
		"instructions": markForTranslation("Now move it to the indicated location by right-clicking near the marker."),
		"OnEntityReachedTarget": function(msg)
		{
			if (this.CheckDistance(msg.entity, "trigger/tutorial_trigger_A") < 1000)
			{
				let cmpUnitAI = Engine.QueryInterface(msg.entity, IID_UnitAI);
				cmpUnitAI.CancelRequest();
				let entityID = this.GetMarkerEntity("trigger/tutorial_trigger_A");
				for (let entity of entityID)
				{
					this.DisableArrowDisplay(entity);
 					Engine.DestroyEntity(entity);
				}
				this.NextGoal();
			}
		},
	},
	{
		"instructions": markForTranslation("It would appears that enemy is preparing troops for another attack. It is time to riposte! Select your infantry factory and train 5 Predabots and 5 Stingerbots."),
		"OnTrainingQueued": function(msg)
		{
			if (msg.unitTemplate == "units/robot/infantry_area" || msg.count != 5)
			{
				let cmpTrigger = Engine.QueryInterface(SYSTEM_ENTITY, IID_Trigger);
				cmpTrigger.DoAfterDelay(1, "RemoveTrainingQueue",  { "entity": msg.trainerEntity });
				let txt = msg.unitTemplate == "units/robot/infantry_area" ?
					markForTranslation("Left-clik on the Predabot or the Stingerbot icon."):
					markForTranslation("Do not forget to press the batch production hotkey (shift key by default) while clicking to produce multiple units.");
				this.WarningMessage(txt);
				return;
			}
		},
		"OnTrainingFinished": function(msg)
			{
				this.counter++;
				if(this.counter == 2)
				{
					this.counter = 0;
					this.GetEntitiesByClasses("CitizenSoldier");
					this.NextGoal();
				}
			},
	},
	{
		"instructions": markForTranslation("Each type of infantry unit is effective against a certain type but weak against another.\n- The Predabot is strong against the Stingerbot but weak against the Boombot.\n- The Stingerbot is strong against Boombot but weak against the Predabot.\n- The Boombot is strong against the Predabot but weak against the Stingerbot.\nTry to eliminate enemy units considering this rule."),
		"OnOwnershipChanged": function(msg)
			{
				if (msg.to != INVALID_PLAYER)
					return;
				if (this.IsAttackRepelled())
					this.NextGoal();
			}
	},
	{
		"instructions": markForTranslation("Great, that should save us some time. Let's take this opportunity to strengthen the defenses of our base. Select your Buildobots then click on the energy barrier icon. To build the barrier, click a first time to choose a starting point, then move your cursor to the desired location before clicking a second time to validate the construction."),
		"OnPlayerCommand": function(msg)
		{
			if (msg.cmd.type == "repair" && TriggerHelper.EntityMatchesClassList(msg.cmd.target, "Palisade"))
				this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("Land defense turrets are also very effective in repelling enemy attacks. Try to build at least two defense turrets behind your energy barrier. This way the turrets and barrier will protect each other."),
		"OnStructureBuilt": function(msg)
			{
				if (TriggerHelper.EntityMatchesClassList(msg.building, "LandTurret"))
					this.counter++;
				if(this.counter == 2)
				{
					this.counter = 0;
					this.NextGoal();
				}
			},
	},
	{
		"instructions": markForTranslation("As you may have noticed, your units can freely cross the energy barrier. Enemies, on the other hand, will find themselves blocked and will be forced to destroy the barrier to pass. Now that our defenses are in place, it is time to move on to the next phase. Select your Power Station."),
		"OnEntitiesSelected": function(msg)
			{
				
				let cmpIdentity = Engine.QueryInterface(msg.data.entity, IID_Identity);
				if	(cmpIdentity.HasClass("CivilCentre"))
					this.NextGoal();
			}
	},
	{
		"instructions": markForTranslation("Moving to the next phase unlocks new buildings and technologies. Click on the icon with the number 2."),
		"OnResearchQueued": function(msg)
		{
			if (msg.technologyTemplate == "phase_town_robot")
			{
				this.SpawnEntity("trigger/trigger_point_C", "units/robot/infantry_melee", 5, 2);
				this.SpawnEntity("trigger/trigger_point_C", "units/robot/infantry_ranged", 5, 2);
	 			this.LaunchAttack("InfantryFactory", "InfantryMelee");
	 			this.LaunchAttack("InfantryFactory", "InfantryRanged");
				this.NextGoal();
			}
		}	
	},
	{
		"instructions": markForTranslation("The enemy attacks again, try to repel the attack while you move on to the next phase. Do not hesitate to bring your units back to the base to defend it or to train others if necessary."),
		"Init": function()
		{
			this.researchDone = false;
			this.AttackRepelled = false;
		},
		"OnResearchFinished": function(msg)
		{
			if (msg.tech == "phase_town_robot" && this.AttackRepelled)
				this.NextGoal();
			else
				this.researchDone = true;
		},
		"OnOwnershipChanged": function(msg)
		{
			if (msg.to != INVALID_PLAYER)
				return;
			if (this.IsAttackRepelled() && this.researchDone)
				this.NextGoal();
			else 
				this.AttackRepelled = true;
		}
	},
	{
		"instructions": markForTranslation("The attack has been repelled and you have now moved to phase 2. New buildings are available, select a Buildobot and build a repair center."),
		"OnStructureBuilt": function(msg)
		{
			if (TriggerHelper.EntityMatchesClassList(msg.building, "TechnicalCenter"))
				this.NextGoal();
		},
	},
	{
		"instructions": markForTranslation("The repair center allows you to repair your damaged units. Select your infantry units and place them inside the repair center. To do this, first click on the 'Garrison' icon then click on the repair center. Only injured units will enter the structure, others stay outside."),
		"OnPlayerCommand": function(msg)
		{
			let cmpIdentity = Engine.QueryInterface(msg.cmd.target, IID_Identity);

			if (msg.cmd.type == "garrison" && cmpIdentity.HasClass("TechnicalCenter"))
				this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("Once the units are fully repaired, they will leave the repair center on their own. You can create a rally point so that they automatically head to the designated location once repaired. To do this, select the Repair Center."),
		"OnEntitiesSelected": function(msg)
			{
				
				let cmpIdentity = Engine.QueryInterface(msg.data.entity, IID_Identity);
				if	(cmpIdentity.HasClass("TechnicalCenter"))
					this.NextGoal();
			}
	},
	{
		"instructions": markForTranslation("To create a rally point, right-click where you want your units to automatically go once repaired."),
		"OnPlayerCommand": function(msg)
		{
			if (msg.cmd.type == "set-rallypoint")
			{
				this.NextGoal();
			}
		}
	},
	{
		"instructions": markForTranslation("If you want to delete a rally point, simply execute the same action, this time by clicking on the building concerned. Try deleting your previous rally point."),
		"OnPlayerCommand": function(msg)
		{
			if (msg.cmd.type == "unset-rallypoint")
			{
				this.NextGoal();
			}
		}
	},
	{
		"instructions": markForTranslation("It appears that resources sites near your base are all exhausted. Other resource sites are present on the map. Try to explore the map with your Spybot to find them then build a Spacedock."),
		"OnStructureBuilt": function(msg)
		{
			if (TriggerHelper.EntityMatchesClassList(msg.building, "Spacedock"))
				this.NextGoal();
		},
	},
	{
		"instructions": markForTranslation("As you have noticed, the remaining resource sites are not accessible on foot. You're going to need a transport spaceship to get there. Select your Spacedock, then click on the Bumblebot icon."),
		"OnTrainingQueued": function(msg)
		{
			if (msg.unitTemplate != "units/robot/spaceship_units_transporter")
			{
				let cmpTrigger = Engine.QueryInterface(SYSTEM_ENTITY, IID_Trigger);
				cmpTrigger.DoAfterDelay(1, "RemoveTrainingQueue",  { "entity": msg.trainerEntity });
				let txt = markForTranslation("Click on the Bumblebot icon.");
				this.WarningMessage(txt);
				return;
			}
		},
		"OnTrainingFinished": function(msg)
		{
			this.NextGoal();
		},
	},
	{
		"instructions": markForTranslation("Load your Buildobots into the transport spaceship. To do this, select them then click on the 'Garrison' icon present in the central panel under the unit name. Then left-click on the spaceship for the units to board."),
		"OnPlayerCommand": function(msg)
		{
			let cmpIdentity = Engine.QueryInterface(msg.cmd.target, IID_Identity);

			if (msg.cmd.type == "garrison" && cmpIdentity.HasClass("SpaceshipUnitsTransporter"))
				this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("Now select your ship and click on the 'Drop here' icon represented by a white arrow in the central panel. Finally click near a resource site so that the ship moves to the indicated location to deposit the units there."),
		"OnPlayerCommand": function(msg)
		{
			if (msg.cmd.type == "drop-units")
			{
				this.NextGoal();
			}
		}
	},
	{
		"instructions": markForTranslation("Build a drill with your Buildobots at one of the remaining resource sites."),
		"OnStructureBuilt": function(msg)
			{
				if (TriggerHelper.EntityMatchesClassList(msg.building, "Drill"))
					this.NextGoal();
			},
	},
	{
		"instructions": markForTranslation("Your Buildobots cannot reach the Power Station on foot, and even if they could, the flow of resources would be slowed down due to the distance between the Power Station and the drill. This is where the Ladybot comes in. Select your Spacedock and train a Ladybot."),
		"OnTrainingQueued": function(msg)
		{
			if (msg.unitTemplate != "units/robot/spaceship_resources_transporter")
			{
				let cmpTrigger = Engine.QueryInterface(SYSTEM_ENTITY, IID_Trigger);
				cmpTrigger.DoAfterDelay(1, "RemoveTrainingQueue",  { "entity": msg.trainerEntity });
				let txt = markForTranslation("Click on the Ladybot icon.");
				this.WarningMessage(txt);
				return;
			}
		},
		"OnTrainingFinished": function(msg)
		{
			this.NextGoal();
		},
	},
	{
		"instructions": markForTranslation("The Ladybot is a resource transport spaceship. Just like the Buildobot, it can transport ressources from the drill to the Power Station but unlike the latter, its storage capacity is higher and it can cover great distances very quickly. Try to use your Ladybot to gather resources from your new drill."),
		"OnPlayerCommand": function(msg)
		{
			if (msg.cmd.entities.length == 1)
			{
				let cmpIdentity = Engine.QueryInterface(msg.cmd.entities[0], IID_Identity);

				if (msg.cmd.type == "gather" && cmpIdentity.HasClass("SpaceshipResourcesTransporter"))
				 this.NextGoal();
			}
		}
	},
	{
		"instructions": markForTranslation("The Ladybot allows you to amass large amounts of resources quickly, but it is unarmed and therefore cannot defend itself against enemy attacks. Select your Spacedock and train 5 Falcobots."),
		"OnTrainingQueued": function(msg)
			{
				if (msg.unitTemplate != "units/robot/spaceship_hunter" || msg.count != 5)
				{
					let cmpTrigger = Engine.QueryInterface(SYSTEM_ENTITY, IID_Trigger);
					cmpTrigger.DoAfterDelay(1, "RemoveTrainingQueue",  { "entity": msg.trainerEntity });
					let txt = msg.unitTemplate != "units/robot/spaceship_hunter" ?
						markForTranslation("Click on the Falcobot icon."):
						markForTranslation("Do not forget to press the batch training hotkey while clicking to produce multiple units.");
					this.WarningMessage(txt);
					return;
				}
			},
			"OnTrainingFinished": function(msg)
				{
					this.NextGoal();
				},
	},
	{
		"instructions": markForTranslation("Select your 5 Falcobots and click on the guard icon symbolized by a blue shield. Then click on the Ladybot so that your fighter spaceships protect your resource transport spaceship."),
		"OnPlayerCommand": function(msg)
		{
			if (msg.cmd.target)
			{
				let cmpIdentity = Engine.QueryInterface(msg.cmd.target, IID_Identity);

				if (msg.cmd.type == "guard" && cmpIdentity.HasClass("SpaceshipResourcesTransporter"))
				{
	 				this.SpawnEntity("trigger/trigger_point_F", "units/robot/spaceship_hunter", 1, 2);
					this.LaunchAttack("SpaceshipResourcesTransporter", "Hunter");
					this.NextGoal();
				}
			}
		}
	},
	{
		"instructions": markForTranslation("An enemy Falcobot is attacking our resource transport spaceship! Look at your fighter spaceships automatically defend your Ladybot."),
		"OnOwnershipChanged": function(msg)
		{
			if (msg.to != INVALID_PLAYER)
				return;
			if (this.IsAttackRepelled())
				this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("Targeting enemy resources transport spaceships and thus depriving the enemy of their resource supply is a great way to take advantage during a game. Select your 5 Falcobots and launch an assault on the enemy base to destroy the enemy resources transport spaceships."),
		"OnOwnershipChanged": function(msg)
		{
			this.GetEntitiesByClasses("SpaceshipResourcesTransporter");
			if (msg.to != INVALID_PLAYER)
				return;
			if (this.IsAttackRepelled())
				this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("Perfect, the enemy is now in a weak position. It's time to prepare for the final assault! Select your central unit and move on to phase 3."),
		"OnResearchQueued": function(msg)
		{
			if (msg.technologyTemplate == "phase_city_robot")
				this.NextGoal();
		},
	},
	{
		"instructions": markForTranslation("In the meantime, take the opportunity to check that all your Buildobots and Ladybots are active. You can use the lower right button on the minimap to find inactive units. You can also build new drills if your resources are deplated."),
		"OnResearchFinished": function(msg)
		{
			if (msg.tech == "phase_city_robot")
				this.NextGoal();
		},
	},
	{
		"instructions": markForTranslation("In phase 3 you have access to two new types of infantry units. Start by building an armored infantry factory."),
		"OnStructureBuilt": function(msg)
		{
			if (TriggerHelper.EntityMatchesClassList(msg.building, "ArmoredInfantryFactory"))
	 			this.NextGoal();
		},
	},
	{
		"instructions": markForTranslation("Select your Armored Infantry Factory and train 10 Scarabots. Scarabots are not very effective against other infantry units, but they are very resistant and have a damage bonus against buildings."),
		"Init": function()
		{
			this.infantryMeleeTrained = 0;
		},
		"OnTrainingQueued": function(msg)
		{
			if (msg.unitTemplate != "units/robot/armored_infantry_melee")
			{
				let cmpTrigger = Engine.QueryInterface(SYSTEM_ENTITY, IID_Trigger);
				cmpTrigger.DoAfterDelay(1, "RemoveTrainingQueue",  { "entity": msg.trainerEntity });
				let txt = markForTranslation("Click on the Scarabot icon.");
				this.WarningMessage(txt);
				return;
			}
			this.infantryMeleeTrained+= msg.count;
		},
		"OnTrainingFinished": function(msg)
		{
			if(this.infantryMeleeTrained >= 10)
			{
				this.NextGoal();
			}
		},
	},
	{
		"instructions": markForTranslation("Arachnobots on the other hand, are more powerful than basic infantry units but they are expensive to produce and their armor is not as thick as Scarabots one. Train 10 Arachnobots too."),
		"Init": function()
		{
			this.infantryRangedTrained = 0;
		},
		"OnTrainingQueued": function(msg)
		{
			if (msg.unitTemplate != "units/robot/armored_infantry_ranged")
			{
				let cmpTrigger = Engine.QueryInterface(SYSTEM_ENTITY, IID_Trigger);
				cmpTrigger.DoAfterDelay(1, "RemoveTrainingQueue",  { "entity": msg.trainerEntity });
				let txt = markForTranslation("Click on the Arachnobot icon.");
				this.WarningMessage(txt);
				return;
			}
			this.infantryRangedTrained+= msg.count;
		},
		"OnTrainingFinished": function(msg)
		{
			if(this.infantryRangedTrained >= 10)
			{
				this.NextGoal();
			}
		},
	},
	{
		"instructions": markForTranslation("The Research Center allows you to make various improvements to buildings. For example, it allows them to increase their number of health points or their field of vision. Build an Research Center."),
		"OnStructureBuilt": function(msg)
		{
			if (TriggerHelper.EntityMatchesClassList(msg.building, "ResearchCenter"))
	 			this.NextGoal();
		},
	},
	{
		"instructions": markForTranslation("Each technology has three levels, one available for each phase. Since you have already progressed to phase three, you have access to all three upgrade levels directly. Click on the Research Center then click on the technology called Titanium Coating AMK1 to increase the number of hit points of each building."),
		"OnResearchQueued": function(msg)
		{
			if (msg.technologyTemplate == "robot/add_health_AMK1")
				this.NextGoal();
		},
	},
	{
		"instructions": markForTranslation("So far we have trained several types of infantry units, each with their own particularities. But there is last one, much more powerful than all the others, the Behebot. Start by building a Behebot factory."),
		"OnStructureBuilt": function(msg)
		{
			if (TriggerHelper.EntityMatchesClassList(msg.building, "MekaEliteFactory"))
			{
				// Apparition de la Starcilite
				let cmpGuiInterface = Engine.QueryInterface(SYSTEM_ENTITY, IID_GuiInterface);
				cmpGuiInterface.PlaySoundForPlayer(1, "starcilite_crash");
				this.SpawnStarcilite("trigger/trigger_point_G");
				this.SpawnStarcilite("trigger/trigger_point_H");
				this.SpawnStarcilite("trigger/trigger_point_I");
				this.NextGoal();
			}
		},
	},
	{
		"instructions": markForTranslation("Did you heard it? This sound indicates that a meteorite has crashed on the map. Meteorites contain Starcilite ore, required to train a Behebot. The location of meteorites is marked on your map, select some Buildobots and right-click on one of meteorites."),
		"OnPlayerCommand": function(msg)
		{
			if (msg.cmd.type == "gather" && Engine.QueryInterface(msg.cmd.target, IID_Identity).HasClass("Starcilite"))
			{
				this.entityID = msg.cmd.entities[0];
				let cmpPlayer = QueryOwnerInterface(this.entityID);
				cmpPlayer.RequestFromTutorialScript();
				let entityID = this.GetMarkerEntity("trigger/tutorial_trigger_B");
				for (let entity of entityID)
					this.DisableArrowDisplay(entity);

				this.NextGoal();
			}
		},
	},
	{
		"instructions": markForTranslation("As you can see, you don't need drills to gather Starcilite ore, Buildobots can collect it directly but they are the only ones who can do it. In addition to the usual resources, the Behebot requires 900 Starcilite crystals to be trained. Collect enough Starcilite to train a Behebot."),
		"OnResourceCountUpdated": function(msg)
		{
			if (msg.resourceType == "metal" && msg.resourceCount + msg.amount == 900)
			{
				let cmpPlayer = QueryOwnerInterface(this.entityID);
				cmpPlayer.CancelRequest();
				let entityID = this.GetMarkerEntity("trigger/tutorial_trigger_B");
				for (let entity of entityID)
					Engine.DestroyEntity(entity);	

				this.NextGoal();
			}	
		},
	},
	{
		"instructions": markForTranslation("Perfect, you now have enough Starcilite Ore to train a Behebot. Select your Behebot Factory then click on the Behebot icon."),
		"OnTrainingFinished": function(msg)
		{
	 		let cmpIdentity = Engine.QueryInterface(msg.entities[0], IID_Identity);
			if(cmpIdentity.HasClass("MekaElite"))
				this.NextGoal();
		},
	},
	{
		"instructions": markForTranslation("We are coming to the end of this tutorial. It is time to launch our final assault and definitively destroy the enemy base. You can train a few additional units if necessary and upgrade them using technologies to ensure victory. When you will be ready, head to the enemy base and destroy it!"),
		"OnOwnershipChanged": function(msg)
		{
			if (msg.from != this.enemyID)
				return;
			if (TriggerHelper.EntityMatchesClassList(msg.entity, "CivCentre"))
				this.NextGoal();
		}
	},
	{
		"instructions": markForTranslation("Fantastic! You have managed to destroy the enemy base! This tutorial is now complete, thank you for playing!"),	
	},
];

Trigger.prototype.RemoveTrainingQueue = function(data)
{
	let cmpProductionQueue = Engine.QueryInterface(data.entity, IID_ProductionQueue);
	cmpProductionQueue.ResetQueue();
};

Trigger.prototype.LaunchAttack = function(targets, unitType)
{
	let cmpRangeManager = Engine.QueryInterface(SYSTEM_ENTITY, IID_RangeManager);
	let entities = cmpRangeManager.GetEntitiesByPlayer(this.playerID);
	let target =
		entities.find(e => {
			let cmpIdentity = Engine.QueryInterface(e, IID_Identity);
			return cmpIdentity && cmpIdentity.HasClass(targets) && Engine.QueryInterface(e, IID_Position);
		});

	let position = Engine.QueryInterface(target, IID_Position).GetPosition2D();

	this.attackers = cmpRangeManager.GetEntitiesByPlayer(this.enemyID).filter(e => {
		let cmpIdentity = Engine.QueryInterface(e, IID_Identity);
		return Engine.QueryInterface(e, IID_UnitAI) && cmpIdentity && cmpIdentity.HasClass(unitType);
	});

	ProcessCommand(this.enemyID, {
		"type": "attack-walk",
		"entities": this.attackers,
		"x": position.x,
		"z": position.y,
		"targetClasses": { "attack": ["Unit"] },
		"allowCapture": false,
		"queued": false
	});
};

Trigger.prototype.GetEntitiesByClasses = function(unitType)
{
	let cmpRangeManager = Engine.QueryInterface(SYSTEM_ENTITY, IID_RangeManager);
	this.attackers = cmpRangeManager.GetEntitiesByPlayer(this.enemyID).filter(e => {
		let cmpIdentity = Engine.QueryInterface(e, IID_Identity);
		return Engine.QueryInterface(e, IID_UnitAI) && cmpIdentity && cmpIdentity.HasClass(unitType);
	});
};

Trigger.prototype.IsAttackRepelled = function()
{
	return !this.attackers.some(e => Engine.QueryInterface(e, IID_Health) && Engine.QueryInterface(e, IID_Health).GetHitpoints() > 0);
};

Trigger.prototype.CheckDistance = function(entity, targetTemplate)
{
	let cmpTemplateManager = Engine.QueryInterface(SYSTEM_ENTITY, IID_TemplateManager);
	let target = cmpTemplateManager.GetEntitiesUsingTemplate(targetTemplate);
	let cmpEntityPosition = Engine.QueryInterface(entity, IID_Position);
	let cmpTargetPosition = Engine.QueryInterface(target[0], IID_Position);

	let entityPositionX = cmpEntityPosition.GetPosition2D().x;
	let entityPositionZ = cmpEntityPosition.GetPosition2D().y;
	let entityTargetX = cmpTargetPosition.GetPosition2D().x;
	let entityTargetZ = cmpTargetPosition.GetPosition2D().y;

	let distanceToTargetSquared = Math.euclidDistance2DSquared(entityPositionX, entityPositionZ, entityTargetX, entityTargetZ);

	return distanceToTargetSquared;
};

Trigger.prototype.GetMarkerEntity = function(template)
{
	let cmpTemplateManager = Engine.QueryInterface(SYSTEM_ENTITY, IID_TemplateManager);
	let MarkerID = cmpTemplateManager.GetEntitiesUsingTemplate(template);

	return MarkerID;
};

/**
 * Can be used to "force" a building/unit to spawn a group of entities.
 * entityTemplate : Name of the template
 * entityNumber : Number of units to spawn
 * triggerTemplate : Name of the template of the point where they will be spawned from
 * moveCamera : The camera will automaticaly move to the position of the spawned unit if true
 */

Trigger.prototype.SpawnEntity = function(triggerTemplate, entityTemplate, entityNumber, owner, moveCamera = false, displayArrow = false)
{
	let UnitInstance = [];
	let numSpawnedUnit = 1;
	let cmpTemplateManager = Engine.QueryInterface(SYSTEM_ENTITY, IID_TemplateManager);
	let entities = cmpTemplateManager.GetEntitiesUsingTemplate(triggerTemplate);

	for (let i = 0; i < numSpawnedUnit; i++)
		{	
			UnitInstance[i] = TriggerHelper.SpawnUnits(entities[0], entityTemplate, entityNumber, owner)[0];
			entities.pop(); 

			if (displayArrow)
				Engine.QueryInterface(UnitInstance[i], IID_Visual).SelectAnimation("click", false, 1.0);
			
			if (moveCamera)
			{
				let cmpPosition = Engine.QueryInterface(UnitInstance[i], IID_Position);
				this.MoveCameraTo(cmpPosition.GetPosition2D().x, cmpPosition.GetPosition2D().y)					
			}
		}
};

Trigger.prototype.SpawnStarcilite = function(triggerTemplate)
{
	let cmpTemplateManager = Engine.QueryInterface(SYSTEM_ENTITY, IID_TemplateManager);
	let starciliteEntity = cmpTemplateManager.GetEntitiesUsingTemplate(triggerTemplate);

	let starciliteInstance = TriggerHelper.SpawnUnits(starciliteEntity[0], "gaia/ore/starcilite", 1, 0);
	let markerInstance = TriggerHelper.SpawnUnits(starciliteEntity[0], "trigger/tutorial_trigger_B", 1, 1);

	Engine.QueryInterface(markerInstance[0], IID_Visual).SelectAnimation("click", false, 1.0);


	let cmpGUIInterface = Engine.QueryInterface(SYSTEM_ENTITY, IID_GuiInterface);
	let cmpPositionOre = Engine.QueryInterface(starciliteInstance[0], IID_Position);
   
	cmpGUIInterface.PushNotification({
		"type": "map-flare",
		"players": [1],
		"target": cmpPositionOre.GetPosition()
	});
};

Trigger.prototype.DisableArrowDisplay = function(unitID)
{
	Engine.QueryInterface(unitID, IID_Visual).SelectAnimation("idle", false, 1.0);
};

Trigger.prototype.MoveCameraTo = function(posX, posZ)
{
	Engine.QueryInterface(SYSTEM_ENTITY, IID_GuiInterface).PushNotification({
		"type": "move-camera",
		"players": [1],
		"x" : posX,
		"z" : posZ,
	});	
};
{
	let cmpTrigger = Engine.QueryInterface(SYSTEM_ENTITY, IID_Trigger);
	let cmpGuiInterface = Engine.QueryInterface(SYSTEM_ENTITY, IID_GuiInterface);
	cmpGuiInterface.SetTutorialIsLaunched(true);
	cmpTrigger.playerID = 1;
	cmpTrigger.enemyID = 2;
	cmpTrigger.counter = 0;
	cmpTrigger.entityID = 0;
	cmpTrigger.researchDone = false;
	cmpTrigger.trainingDone = false;
	cmpTrigger.RegisterTrigger("OnInitGame", "InitTutorial", { "enabled": true });
}


