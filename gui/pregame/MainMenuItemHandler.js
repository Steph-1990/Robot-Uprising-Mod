/**
 * This class sets up the main menu buttons, animates submenu that opens when
 * clicking on category buttons, assigns the defined actions and hotkeys to every button.
 */
class MainMenuItemHandler
{
	constructor(menuItems)
	{
		this.menuItems = menuItems;
		this.lastTickTime = Date.now();

		this.lastOpenItem = undefined;

		this.mainMenu = Engine.GetGUIObjectByName("mainMenu");
		this.mainMenuButtons = Engine.GetGUIObjectByName("mainMenuButtons");
		this.submenu = Engine.GetGUIObjectByName("submenu");
		this.submenuButtons = Engine.GetGUIObjectByName("submenuButtons");
		this.MainMenuPanelRightBorderTop = Engine.GetGUIObjectByName("MainMenuPanelRightBorderTop");
		this.MainMenuPanelRightBorderBottom = Engine.GetGUIObjectByName("MainMenuPanelRightBorderBottom");
		this.MainMenuPanelRightBorderMiddle = Engine.GetGUIObjectByName("MainMenuPanelRightBorderMiddle");
		this.screen = this.mainMenu.parent.getComputedSize();


		this.setupMenuButtons(this.mainMenuButtons.children, this.menuItems);
		this.setupHotkeys(this.menuItems);
		Engine.GetGUIObjectByName("closeMenuButton").onPress = this.closeSubmenu.bind(this);
	}

	setupMenuButtons(buttons, menuItems)
	{
		buttons.forEach((button, i) => {
			let item = menuItems[i];
			button.hidden = !item;
			if (button.hidden)
				return;

			button.size = new GUISize(0, (this.ButtonHeight + this.Margin) * i, 0 , (this.ButtonHeight + this.Margin) * i + this.ButtonHeight, 0, 0, 100, 0);
			button.caption = item.caption;
			button.tooltip = item.tooltip;
			button.enabled = item.enabled === undefined || item.enabled();
			button.onPress = this.pressButton.bind(this, item, i);
			button.hidden = false;
		});

		if (buttons.length < menuItems.length)
			error("GUI page has space for " + buttons.length + " menu buttons, but " + menuItems.length + " items are provided!");
	}

	/**
	 * Expand selected submenu, or collapse if it already is expanded.
	 */
	pressButton(item, i)
	{
		if (this.submenu.hidden)
		{
			this.performButtonAction(item, i);
		}
		else
		{
			this.closeSubmenu();
			if (this.lastOpenItem && this.lastOpenItem != item)
				this.performButtonAction(item, i);
			else
				this.lastOpenItem = undefined;
		}
	}

	/**
	 * Expand submenu or perform action specified by the button object.
	 */
	performButtonAction(item, i)
	{
		this.lastOpenItem = item;

		if (item.onPress)
			item.onPress();
		else
			this.openSubmenu(i);
	}

	setupHotkeys(menuItems)
	{
		for (let i in menuItems)
		{
			let item = menuItems[i];
			if (item.onPress && item.hotkey)
				Engine.SetGlobalHotkey(item.hotkey, "Press", () => {
					this.closeSubmenu();
					item.onPress();
				});

			if (item.submenu)
				this.setupHotkeys(item.submenu);
		}
	}

	openSubmenu(i)
	{
		this.setupMenuButtons(this.submenuButtons.children, this.menuItems[i].submenu);
		
		this.submenu.z = 0;

		let top = this.mainMenuButtons.size.top + this.mainMenuButtons.children[i].size.top;

		this.submenu.size = new GUISize(
			this.submenu.size.left, top,
			this.submenu.size.right, top + (this.ButtonHeight + this.Margin) * this.menuItems[i].submenu.length);

		// warn(this.submenu.size.left);
		// warn(this.submenu.size.top);
		// warn(this.submenu.size.right);
		// warn(this.submenu.size.bottom);

		this.submenu.hidden = false;

		// Start animation
		this.lastTickTime = Date.now();
		this.mainMenu.onTick = this.onTick.bind(this);
	}

	closeSubmenu()
	{
		this.submenu.hidden = true;
		this.submenu.size = this.mainMenu.size;
		this.MainMenuPanelRightBorderMiddle.hidden = false;
		this.MainMenuPanelRightBorderTop.hidden = true;
		this.MainMenuPanelRightBorderBottom.hidden = true;
	}

	onTick()
	{

		let now = Date.now();
		if (now == this.lastTickTime)
		{
			return;
		}

		let maxOffset = this.mainMenu.size.right - this.submenu.size.left;
		let offset = Math.min(this.MenuSpeed * (now - this.lastTickTime), maxOffset);

		this.lastTickTime = now;

		if (this.submenu.hidden || !offset)
		{
			this.MainMenuPanelRightBorderMiddle.hidden = true;
			this.MainMenuPanelRightBorderTop.hidden = false;
			this.MainMenuPanelRightBorderBottom.hidden = false;

			

			{
				let size = this.MainMenuPanelRightBorderTop.size;
				size.bottom = -this.screen.bottom + this.submenu.size.top -15;
				this.MainMenuPanelRightBorderTop.size = size;
			}

			{
				let size = this.MainMenuPanelRightBorderBottom.size;
				size.top = this.submenu.size.bottom-15;
				this.MainMenuPanelRightBorderBottom.size = size;
			}
			
			this.submenu.z = 100;
			delete this.mainMenu.onTick;
			return;
		}

		let size = this.submenu.size;
		size.left += offset;
		size.right += offset;
		this.submenu.size = size;
	}
}

/**
 * Vertical size per button.
 */
MainMenuItemHandler.prototype.ButtonHeight = 45;

/**
 * Distance between consecutive buttons.
 */
MainMenuItemHandler.prototype.Margin = 30;

/**
 * Collapse / expansion speed in pixels per milliseconds used when animating the button menu size.
 */
MainMenuItemHandler.prototype.MenuSpeed = 1.2;
