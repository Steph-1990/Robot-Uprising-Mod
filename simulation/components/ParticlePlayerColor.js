class ParticlePlayerColor
{
	Init()
	{
		const refreshInterval = 1000; // 1s
		const cmpTimer = Engine.QueryInterface(SYSTEM_ENTITY, IID_Timer);
		this.timer = cmpTimer.SetInterval(this.entity, IID_ParticlePlayerColor, "TimerTick", refreshInterval, refreshInterval, undefined);
	}

	UpdateColor()
	{
		const cmpVisual = Engine.QueryInterface(this.entity, IID_Visual);
		if (!cmpVisual)
			return;

		const cmpPlayer = QueryOwnerInterface(this.entity, IID_Player);
		if (!cmpPlayer)
			return;

		const color = cmpPlayer.GetColor();
		cmpVisual.SetVariable("colorr", color.r);
		cmpVisual.SetVariable("colorg", color.g);
		cmpVisual.SetVariable("colorb", color.b);
	}

	TimerTick()
	{
		this.UpdateColor();
	};

}

ParticlePlayerColor.prototype.Schema = "<empty/>";

Engine.RegisterComponentType(IID_ParticlePlayerColor, "ParticlePlayerColor", ParticlePlayerColor);
