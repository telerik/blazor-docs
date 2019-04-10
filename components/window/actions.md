---
title: Actions
page_title: Window for Blazor | Actions
description: Action buttons in Window for Blazor
slug: components/window/actions
tags: telerik,blazor,window,actions
published: True
position: 3
---

# Window Actions

The Window offers action buttons in its titlebar:

* built-in actions
    * `Maximize`
    * `Minimize`
    * `Close`
* custom action buttons

To define action buttons, populate the `TelerikWindowActions` tag of the Window with `TelerikWindowAction` instances.

Action buttons expose the following properties:

* `Name` - the name of the action. Can be one of the built-in actions (see above), or a custom action name.
* `Hidden` - a boolean property indicating whether the action button is rendered.
* `OnClick` - event handler so you can respond to custom action clicks.
* `Icon` - the CSS class name of the icon that will be rendered. You can use the [Kendo UI Web Font Icons Library](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web) without the `k-i-` prefix, or your own font icon font.


>caption The built-in actions of a Window

````CSHTML
<TelerikWindow Visible="true">
	<TelerikWindowActions>
		<TelerikWindowAction Name="Minimize"></TelerikWindowAction>
		<TelerikWindowAction Name="Maximize"></TelerikWindowAction>
		<TelerikWindowAction Name="Close"></TelerikWindowAction>
	</TelerikWindowActions>
	<TelerikWindowTitle>
	    Optional title
	</TelerikWindowTitle>
	<TelerikWindowContent>
		I have action buttons. Try using them, but if you close me, you can't reopen me without a few lines of code, so try that last.
		<br />
		The titlebar will now render even if you don't define a title, because it will show the action buttons.
	</TelerikWindowContent>
</TelerikWindow>
````

>caption The result from the code snippet above

![](images/built-in-actions.png)

You can create a custom action icon and you must provide its `OnClick` handler.

>caption Handling a custom action

````CSHTML
@using Telerik.Blazor

<TelerikWindow Visible="true">
	<TelerikWindowActions>
		<TelerikWindowAction Name="MyAction" Icon="gear" OnClick="@MyCustomActionHandler"></TelerikWindowAction>
	</TelerikWindowActions>
	<TelerikWindowContent>
		@result
		<br />
		Even if you do not define a title, the titlebar will render so you can get to the actions.
	</TelerikWindowContent>
</TelerikWindow>

@functions {
	string result;
	public void MyCustomActionHandler()
	{
		result = "custom action button clicked on: " + DateTime.Now.ToString();

		StateHasChanged();
	}
}
````

>caption The result from the code snippet above

![](images/custom-action.png)

You can mix custom actions with built-in actions, and you do not have to define all of the available ones.

>caption Mixing built-in actions with custom actions

````CSHTML
@using Telerik.Blazor

<TelerikWindow Visible="true">
	<TelerikWindowActions>
		<TelerikWindowAction Name="Minimize"></TelerikWindowAction>
		<TelerikWindowAction Name="MyAction" Icon="info" OnClick="@MyCustomActionHandler"></TelerikWindowAction>
		<TelerikWindowAction Name="Maximize"></TelerikWindowAction>
	</TelerikWindowActions>
	<TelerikWindowContent>
		@result
		<br />
		You can mix custom actions with the built-in ones in any order. If a custom action is used, its OnClick handler is mandatory.
	</TelerikWindowContent>
</TelerikWindow>

@functions {
	string result;
	public void MyCustomActionHandler()
	{
		result = "custom action button clicked on: " + DateTime.Now.ToString();

		StateHasChanged();
	}
}
````

>caption The result from the code snippet above

![](images/mixed-actions.png)


## See Also

  * [Live Demo: Window Actions](https://demos.telerik.com/blazor/window/actions)