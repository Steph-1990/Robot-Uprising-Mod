/**
 * Horizontal size of a tab button.
 */
var g_TabButtonWidth = 150;

/**
 * Horizontal space between two tab buttons.
 */
var g_TabButtonDist = 6;

var getScorePanelsData = () => [
	{
		"label": translate("Score"),
		"headings": [
			{ "identifier": "playername", "caption": translate("Player name"), "yStart": 34, "width": 200 },
			{ "identifier": "totalScore", "caption": translate("Total score"), "yStart": 34, "width": 200 },
			{ "identifier": "economyScore", "caption": translate("Economy score"), "yStart": 34, "width": 200 },
			{ "identifier": "militaryScore", "caption": translate("Military score"), "yStart": 34, "width": 200 },
			{ "identifier": "explorationScore", "caption": translate("Exploration score"), "yStart": 34, "width": 200 }
		],
		"titleHeadings": [],
		"counters": [
			{ "width": 200, "fn": calculateScoreTotal, "verticalOffset": 12 },
			{ "width": 200, "fn": calculateEconomyScore, "verticalOffset": 12 },
			{ "width": 200, "fn": calculateMilitaryScore, "verticalOffset": 12 },
			{ "width": 200, "fn": calculateExplorationScore, "verticalOffset": 12 }
		],
		"teamCounterFn": calculateScoreTeam
	},
	{
		"label": translate("Structures"),
		"headings": [
			{ "identifier": "playername", "caption": translate("Player name"), "yStart": 34, "width": 200 },
			{ "identifier": "total", "caption": translate("Total"), "yStart": 34, "width": 105 },
			{ "identifier": "House", "caption": translate("Houses"), "yStart": 34, "width": 100 },
			{ "identifier": "Economic", "caption": translate("Economic"), "yStart": 34, "width": 150 },
			{ "identifier": "Outpost", "caption": translate("Outposts"), "yStart": 34, "width": 170 },
			{ "identifier": "Military", "caption": translate("Military"), "yStart": 34, "width": 150 },
			{ "identifier": "Fortress", "caption": translate("Fortresses"), "yStart": 34, "width": 150 },
			{ "identifier": "CivCentre", "caption": translate("Civ centers"), "yStart": 34, "width": 150 },
			{ "identifier": "Wonder", "caption": translate("Wonders"), "yStart": 34, "width": 150 }
		],
		"titleHeadings": [
			{
				"caption": sprintf(translate("Structure Statistics (%(constructed)s / %(destroyed)s / %(captured)s / %(lost)s)"),
					{
						"constructed": getColoredTypeTranslation("constructed"),
						"destroyed": getColoredTypeTranslation("destroyed"),
						"captured": getColoredTypeTranslation("captured"),
						"lost": getColoredTypeTranslation("lost")
					}),
				"yStart": 5,
				"width": 750
			},	// width = 700
		],
		"counters": [
			{ "width": 105, "fn": calculateBuildings, "verticalOffset": 3 },
			{ "width": 100, "fn": calculateBuildings, "verticalOffset": 3 },
			{ "width": 150, "fn": calculateBuildings, "verticalOffset": 3 },
			{ "width": 170, "fn": calculateBuildings, "verticalOffset": 3 },
			{ "width": 150, "fn": calculateBuildings, "verticalOffset": 3 },
			{ "width": 150, "fn": calculateBuildings, "verticalOffset": 3 },
			{ "width": 150, "fn": calculateBuildings, "verticalOffset": 3 },
			{ "width": 150, "fn": calculateBuildings, "verticalOffset": 3 }
		],
		"teamCounterFn": calculateBuildingsTeam
	},
	{
		"label": translate("Units"),
		"headings": [
			{ "identifier": "playername", "caption": translate("Player name"), "yStart": 34, "width": 200 },
			{ "identifier": "total", "caption": translate("Total"), "yStart": 34, "width": 105 },
			{ "identifier": "Infantry", "caption": translate("Infantry"), "yStart": 34, "width": 130 },
			{ "identifier": "Worker", "caption": translate("Worker"), "yStart": 34, "width": 130 },
			{ "identifier": "Cavalry", "caption": translate("Cavalry"), "yStart": 34, "width": 130 },
			{ "identifier": "Champion", "caption": translate("Champion"), "yStart": 34, "width": 130 },
			{ "identifier": "Hero", "caption": translate("Heroes"), "yStart": 34, "width": 130 },
			{ "identifier": "Siege", "caption": translate("Siege"), "yStart": 34, "width": 130 },
			{ "identifier": "Ship", "caption": translate("Navy"), "yStart": 34, "width": 130 },
			{ "identifier": "Trader", "caption": translate("Traders"), "yStart": 34, "width": 140 }
		],
		"titleHeadings": [
			{
				"caption": sprintf(translate("Unit Statistics (%(trained)s / %(killed)s / %(lost)s)"),
					{
						"trained": getColoredTypeTranslation("trained"),
						"killed": getColoredTypeTranslation("killed"),
						"lost": getColoredTypeTranslation("lost")
					}),
				"yStart": 5,
				"width": 600
			},	// width = 785
		],
		"counters": [
			{ "width": 105, "fn": calculateUnits, "verticalOffset": 3 },
			{ "width": 130, "fn": calculateUnits, "verticalOffset": 3 },
			{ "width": 130, "fn": calculateUnits, "verticalOffset": 3 },
			{ "width": 130, "fn": calculateUnits, "verticalOffset": 3 },
			{ "width": 130, "fn": calculateUnits, "verticalOffset": 3 },
			{ "width": 130, "fn": calculateUnits, "verticalOffset": 3 },
			{ "width": 130, "fn": calculateUnits, "verticalOffset": 3 },
			{ "width": 130, "fn": calculateUnits, "verticalOffset": 3 },
			{ "width": 140, "fn": calculateUnits, "verticalOffset": 3 }
		],
		"teamCounterFn": calculateUnitsTeam
	},
	{
		"label": translate("Resources"),
		"headings": [
			{ "identifier": "playername", "caption": translate("Player name"), "yStart": 34, "width": 200 },
			{ "identifier": "total", "caption": translate("Total"), "yStart": 34, "width": 110 },
			...g_ResourceData.GetResources().map(res => ({
				"identifier": res.code,
				"caption": resourceNameFirstWord(res.code),
				"yStart": 34,
				"width": 100
			})),
			{
				"identifier": "tributes",
				"caption": translate("Tributes"),
				"headerCaption": sprintf(translate("Tributes \n(%(sent)s / %(received)s)"),
					{
						"sent": getColoredTypeTranslation("sent"),
						"received": getColoredTypeTranslation("received")
					}),
				"yStart": 18,
				"width": 230
			},
			{ "identifier": "treasuresCollected", "caption": translate("Treasures collected"), "yStart": 18, "width": 150 },
			{ "identifier": "loot", "caption": translate("Loot"), "yStart": 34, "width": 150 },
			{ "identifier": "livestock", "caption": translate("Livestock bred"), "yStart": 34, "width": 150 }
		],
		"titleHeadings": [
			{
				"caption": sprintf(translate("Resource Statistics (%(gathered)s / %(used)s)"),
					{
						"gathered": getColoredTypeTranslation("gathered"),
						"used": getColoredTypeTranslation("used")
					}),
				"yStart": 5,
				"width": 100 * g_ResourceData.GetCodes().length + 170
			},
		],
		"counters": [
			{ "width": 110, "fn": calculateTotalResources, "verticalOffset": 12 },
			...g_ResourceData.GetCodes().map(code => ({
				"fn": calculateResources,
				"verticalOffset": 12,
				"width": 100
			})),
			{ "width": 230, "fn": calculateTributeSent, "verticalOffset": 12 },
			{ "width": 150, "fn": calculateTreasureCollected, "verticalOffset": 12 },
			{ "width": 150, "fn": calculateLootCollected, "verticalOffset": 12 },
			{ "width": 150, "fn": calculateLivestockTrained, "verticalOffset": 12 }
		],
		"teamCounterFn": calculateResourcesTeam
	},
	{
		"label": translate("Market"),
		"headings": [
			{ "identifier": "playername", "caption": translate("Player name"), "yStart": 34, "width": 200 },
			{ "identifier": "tradeIncome", "caption": translate("Trade income"), "yStart": 18, "width":200 },
			{ "identifier": "barterEfficency", "caption": translate("Barter efficiency"), "yStart": 34, "width": 200, "format": "PERCENTAGE" },
			...g_ResourceData.GetResources().map(res => {
				return {
					"identifier": res.code,
					"caption":
						// Translation: use %(resourceWithinSentence)s if needed
						sprintf(translate("%(resourceFirstWord)s exchanged"), {
							"resourceFirstWord": resourceNameFirstWord(res.code),
							"resourceWithinSentence": resourceNameWithinSentence(res.code)
						}),
					"yStart": 34,
					"width": 200
				};
			})
		],
		"titleHeadings": [],
		"counters": [
			{ "width": 200, "fn": calculateTradeIncome, "verticalOffset": 12 },
			{ "width": 200, "fn": calculateBarterEfficiency, "verticalOffset": 12 },
			...g_ResourceData.GetCodes().map(code => ({
				"width": 200,
				"fn": calculateResourceExchanged,
				"verticalOffset": 12
			}))
		],
		"teamCounterFn": calculateMarketTeam
	},
	{
		"label": translate("Miscellaneous"),
		"headings": [
			{ "identifier": "playername", "caption": translate("Player name"), "yStart": 34, "width": 200 },
			{ "identifier": "killDeath", "caption": translate("Kill / Death ratio"), "yStart": 18, "width": 170, "format": "DECIMAL2" },
			{ "identifier": "population", "caption": translate("Population"), "yStart": 18, "width": 170, "hideInSummary": true },
			{ "identifier": "mapControlPeak", "caption": translate("Map control (peak)"), "yStart": 18, "width": 170, "format": "PERCENTAGE" },
			{ "identifier": "mapControl", "caption": translate("Map control (finish)"), "yStart": 10, "width": 170, "format": "PERCENTAGE" },
			{ "identifier": "mapExploration", "caption": translate("Map exploration"), "yStart": 18, "width": 170, "format": "PERCENTAGE" },
			{ "identifier": "vegetarianRatio", "caption": translate("Vegetarian ratio"), "yStart": 34, "width": 170, "format": "PERCENTAGE" },
			{ "identifier": "feminization", "caption": translate("Feminization"), "yStart": 34, "width": 170, "format": "PERCENTAGE" },
			{
				"identifier": "bribes",
				"caption": translate("Bribes"),
				"headerCaption": sprintf(translate("Bribes\n(%(succeeded)s / %(failed)s)"),
					{
						"succeeded": getColoredTypeTranslation("succeeded"),
						"failed": getColoredTypeTranslation("failed")
					}),
				"yStart": 10,
				"width": 139
			}
		],
		"titleHeadings": [],
		"counters": [
			{ "width": 170, "fn": calculateKillDeathRatio, "verticalOffset": 12 },
			{ "width": 170, "fn": calculatePopulationCount, "verticalOffset": 12, "hideInSummary": true },
			{ "width": 170, "fn": calculateMapPeakControl, "verticalOffset": 12 },
			{ "width": 170, "fn": calculateMapFinalControl, "verticalOffset": 12 },
			{ "width": 170, "fn": calculateMapExploration, "verticalOffset": 12 },
			{ "width": 170, "fn": calculateVegetarianRatio, "verticalOffset": 12 },
			{ "width": 170, "fn": calculateFeminization, "verticalOffset": 12 },
			{ "width": 139, "fn": calculateBribes, "verticalOffset": 12 }
		],
		"teamCounterFn": calculateMiscellaneousTeam
	}
];

var g_ChartPanelsData = [
	{
		"label": translate("Charts")
	}
];

function getColoredTypeTranslation(type)
{
	return g_SummaryTypes[type].color ?
		coloredText(g_SummaryTypes[type].caption, g_SummaryTypes[type].color) :
		g_SummaryTypes[type].caption;
}

function resetGeneralPanel()
{
	for (let h = 0; h < g_MaxHeadingTitle; ++h)
	{
		Engine.GetGUIObjectByName("titleHeading[" + h + "]").hidden = true;
		Engine.GetGUIObjectByName("Heading[" + h + "]").hidden = true;
		for (let p = 0; p < g_MaxPlayers; ++p)
		{
			Engine.GetGUIObjectByName("valueData[" + p + "][" + h + "]").hidden = true;
			for (let t = 0; t < g_MaxTeams; ++t)
			{
				Engine.GetGUIObjectByName("valueDataTeam[" + t + "][" + p + "][" + h + "]").hidden = true;
				Engine.GetGUIObjectByName("valueDataTeam[" + t + "][" + h + "]").hidden = true;
			}
		}
	}
}

function updateGeneralPanelHeadings(allHeadings)
{
	let headings = allHeadings.filter(heading => !heading.hideInSummary);

	let left = 50;
	for (let h in headings)
	{
		let headerGUIName = "playerNameHeading";
		if (h > 0)
			headerGUIName = "Heading[" + (h - 1) + "]";

		let headerGUI = Engine.GetGUIObjectByName(headerGUIName);
		headerGUI.caption = headings[h].headerCaption || headings[h].caption;
		headerGUI.size = left + " " + headings[h].yStart + " " + (left + headings[h].width) + " 100%";
		headerGUI.hidden = false;

		if (headings[h].width < g_LongHeadingWidth)
			left += headings[h].width;
	}
}

function updateGeneralPanelTitles(titleHeadings)
{
	let left = 250;
	for (let th in titleHeadings)
	{
		if (th >= g_MaxHeadingTitle)
			break;

		if (titleHeadings[th].xOffset)
			left += titleHeadings[th].xOffset;

		let headerGUI = Engine.GetGUIObjectByName("titleHeading[" + th + "]");
		headerGUI.caption = titleHeadings[th].caption;
		headerGUI.size = left + " " + titleHeadings[th].yStart + " " + (left + titleHeadings[th].width) + " 100%";
		headerGUI.hidden = false;

		if (titleHeadings[th].width < g_LongHeadingWidth)
			left += titleHeadings[th].width;
	}
}

function updateGeneralPanelCounter(allCounters)
{
	let counters = allCounters.filter(counter => !counter.hideInSummary);
	let rowPlayerObjectWidth = 0;
	let left = 0;

	for (let p = 0; p < g_MaxPlayers; ++p)
	{
		left = 240;
		let counterObject;

		for (let w in counters)
		{
			counterObject = Engine.GetGUIObjectByName("valueData[" + p + "][" + w + "]");
			counterObject.size = left + " " + counters[w].verticalOffset + " " + (left + counters[w].width) + " 100%";
			counterObject.hidden = false;
			left += counters[w].width;
		}

		if (rowPlayerObjectWidth == 0)
			rowPlayerObjectWidth = left;

		let counterTotalObject;
		for (let t = 0; t < g_MaxTeams; ++t)
		{
			left = 240;
			for (let w in counters)
			{
				counterObject = Engine.GetGUIObjectByName("valueDataTeam[" + t + "][" + p + "][" + w + "]");
				counterObject.size = left + " " + counters[w].verticalOffset + " " + (left + counters[w].width) + " 100%";
				counterObject.hidden = false;

				if (g_Teams[t])
				{
					let yStart = 25 + g_Teams[t].length * (g_PlayerBoxYSize + g_PlayerBoxGap) + 3 + counters[w].verticalOffset;
					counterTotalObject = Engine.GetGUIObjectByName("valueDataTeam[" + t + "][" + w + "]");
					counterTotalObject.size = (left + 20) + " " + yStart + " " + (left + counters[w].width) + " 100%";
					counterTotalObject.hidden = false;
				}

				left += counters[w].width;
			}
		}
	}
	return rowPlayerObjectWidth;
}

function updateGeneralPanelTeams()
{
	let withoutTeam = !g_Teams[-1] ? 0 : g_Teams[-1].length;

	if (!g_Teams || withoutTeam > 0)
		Engine.GetGUIObjectByName("noTeamsBox").hidden = false;

	if (!g_Teams)
		return;

	let yStart = g_TeamsBoxYStart + withoutTeam * (g_PlayerBoxYSize + g_PlayerBoxGap) + (withoutTeam ? 30 : 0);
	for (let i in g_Teams)
	{
		if (i == -1)
			continue;

		let teamBox = Engine.GetGUIObjectByName("teamBoxt["+i+"]");
		teamBox.hidden = false;
		let teamBoxSize = teamBox.size;
		teamBoxSize.top = yStart;
		teamBox.size = teamBoxSize;

		yStart += 30 + g_Teams[i].length * (g_PlayerBoxYSize + g_PlayerBoxGap) + 32;

		Engine.GetGUIObjectByName("teamNameHeadingt[" + i + "]").caption = "Team " + (+i + 1);

		let teamHeading = Engine.GetGUIObjectByName("teamHeadingt[" + i + "]");
		let yStartTotal = 30 + g_Teams[i].length * (g_PlayerBoxYSize + g_PlayerBoxGap) + 10;
		teamHeading.size = "50 " + yStartTotal + " 100% " + (yStartTotal + 20);
		teamHeading.caption = translate("Team total");
	}

	// If there are no players without team, hide "player name" heading
	if (!withoutTeam)
		Engine.GetGUIObjectByName("playerNameHeading").caption = "";
}

function initPlayerBoxPositions()
{
	for (let h = 0; h < g_MaxPlayers; ++h)
	{
		let playerBox = Engine.GetGUIObjectByName("playerBox[" + h + "]");
		let boxSize = playerBox.size;
		boxSize.top += h * (g_PlayerBoxYSize + g_PlayerBoxGap);
		boxSize.bottom = boxSize.top + g_PlayerBoxYSize;
		playerBox.size = boxSize;

		for (let i = 0; i < g_MaxTeams; ++i)
		{
			let playerBoxt = Engine.GetGUIObjectByName("playerBoxt[" + i + "][" + h + "]");
			boxSize = playerBoxt.size;
			boxSize.top += h * (g_PlayerBoxYSize + g_PlayerBoxGap);
			boxSize.bottom = boxSize.top + g_PlayerBoxYSize;
			playerBoxt.size = boxSize;
		}
	}
}
