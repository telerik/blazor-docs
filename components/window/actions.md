---
title: Actions
page_title: Window - Actions
description: Action buttons in Window for Blazor.
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

To define action buttons, populate the `WindowActions` tag of the Window with `WindowAction` instances.


## Action Parameters

Action buttons expose the following properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `Name` | `string` | The name of the action. Can be one of the built-in actions (see above), or a custom action name. |
| `Hidden` | `bool` | Sets if the action button is rendered. Do not use for `Minimize` and `Maximize` actions - the Window manages their visibility internally, based on the component state. Check the example below for a possible alternative. |
| `OnClick` | `EventCallback<MouseEventArgs>` | An event handler to respond to custom action clicks. |
| `Icon` | `string` | The CSS class of the icon to be rendered. Use with the [Telerik font icons]({%slug general-information/font-icons%}), or set your own font icon class. |
| `Title` | `string` | The `title` HTML attribute of the action button. |


## Built-in Actions

>caption The built-in actions of a Window

````CSHTML
<TelerikWindow Visible="true">
	<WindowActions>
		@if (!HideMinMax)
		{
			<WindowAction Name="Minimize" />
			<WindowAction Name="Maximize" />
		}
		<WindowAction Name="Close" Hidden="false" />
	</WindowActions>
	<WindowTitle>
	    Optional title
	</WindowTitle>
	<WindowContent>
		I have action buttons. Try using them, but if you close me, you can't reopen me without a few lines of code, so try that last.
		<br />
		The titlebar will now render even if you don't define a title, because it will show the action buttons.
	</WindowContent>
</TelerikWindow>

@code {
	bool HideMinMax { get; set; } = false;
}
````


## Custom Actions

You can create a custom action icon and you must provide its `OnClick` handler.

>caption Handling a custom action

````CSHTML
Custom actions can call C# directly

<TelerikWindow Visible="true">
	<WindowActions>
		<WindowAction Name="MyAction" Icon="@FontIcon.Gear" OnClick="@MyCustomActionHandler" />
	</WindowActions>
	<WindowContent>
		@result
		<br />
		Even if you do not define a title, the titlebar will render so you can get to the actions.
	</WindowContent>
</TelerikWindow>

@code {
	string result;
	public void MyCustomActionHandler()
	{
		result = "custom action button clicked on: " + DateTime.Now.ToString();

		StateHasChanged();
	}
}
````


## Using Both Action Types

You can mix custom actions with built-in actions, and you do not have to define all of the available ones.

>caption Mixing built-in actions with custom actions

````CSHTML
@* You can define any collection of actions. The second custom action shows all its features. *@

<TelerikWindow Visible="true">
    <WindowActions>
        <WindowAction Name="Minimize" />
        <WindowAction Name="MyAction" Icon="@FontIcon.InfoCircle" OnClick="@MyCustomActionHandler" />
        <WindowAction Name="Maximize" />
        <WindowAction Hidden="@( string.IsNullOrEmpty(result) )"
                      Icon="@FontIcon.ClearCss"
                      Name="CustomActionWithAllParameters"
                      Title="my custom title attribute that is a tooltip when you hover the action"
                      OnClick="@( () => result = string.Empty )" />
    </WindowActions>
    <WindowContent>
        @result
        <br />
        You can mix custom actions with the built-in ones in any order. If a custom action is used, its OnClick handler is mandatory.
    </WindowContent>
    <WindowTitle>Lorem ipsum</WindowTitle>
</TelerikWindow>

@code {
    string result;
    public void MyCustomActionHandler()
    {
        result = "custom action button clicked on: " + DateTime.Now.ToString();

        StateHasChanged();
    }
}
````


## See Also

* [(Demo) Window Actions](https://demos.telerik.com/blazor-ui/window/actions)
* [(KB) Keep Content in the DOM When the Window Is Closed]({%slug window-kb-keep-content-when-closed%})
