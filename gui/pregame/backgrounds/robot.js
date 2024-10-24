g_BackgroundLayerData.push(
	[
		{
			"offset": (time, width) => 0.02 * width * Math.cos(0.1 * time),
			"sprite": "background-robot1-1",
			"tiling": true,
		},
		{
			"offset": (time, width) => 0.3 * width * Math.cos(0.05 * time),
			"sprite": "background-robot1-2",
			"tiling": false,
		},
		{
			"offset": (time, width) => 0.03 * width * Math.cos(0.1* time),
			"sprite": "background-robot1-3",
			"tiling": false,
		},
		{
			"offset": (time, width) => 0.01 * width * Math.cos(0.3 * time),
			"sprite": "background-robot1-4",
			"tiling": false,
		},
		{
			"offset": (time, width) => 0 * width * Math.cos(0.1 * time),
			"sprite": "background-robot1-5",
			"tiling": false,
		},
		{
			"offset": (time, width) => 0.03 * width * Math.cos(0.1 * time),
			"sprite": "background-robot1-6",
			"tiling": false,
		},
		{
			"offset": (time, width) => 0 * width * Math.cos(0.1 * time),
			"sprite": "background-robot1-7",
			"tiling": false,
		},
	]);
