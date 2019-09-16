---
title: Overview
page_title: Window for Blazor Overview
description: Overview of the Window for Blazor
slug: components/window/overview
tags: telerik,blazor,window,overview
published: True
position: 0
---

# Window Overview

This article provides basic information about the Window component.

To create a Telerik Window:

1. use the `TelerikWindow` tag
1. set its `Visible` property to `true` to see it immediately
1. add some content to its `WindowContent` inner tag
1. optionally, add a title text in its `WindowTitle` tag
1. optionally, add the built-in [actions]({%slug components/window/actions%}) to its titlebar

>caption Basic example of showing content in a Window popup and allowing built-in actions

````CSHTML
<TelerikWindow Visible="true">
	<WindowTitle>
		<strong>The Title</strong>
	</WindowTitle>
	<WindowContent>
		This is my window <strong>popup</strong> content.
	</WindowContent>
	<WindowActions>
        <WindowAction Name="Minimize"></WindowAction>
        <WindowAction Name="Maximize"></WindowAction>
        <WindowAction Name="Close"></WindowAction>
    </WindowActions>
</TelerikWindow>
````

>caption The result from the code snippet above

![](images/window-overview.png)

>caption Component namespace and reference

````CSHTML
@using Telerik.Blazor.Components

<TelerikWindow Visible="true" Centered="true" @ref="@myWindowRef">
	<WindowTitle>
		<strong>The Title</strong>
	</WindowTitle>
	<WindowContent>
		This is my window <strong>popup</strong> content.
	</WindowContent>
</TelerikWindow>

@code {
    Telerik.Blazor.Components.TelerikWindow myWindowRef { get;set; }
}
````

## Show and Close

The `Visible` property lets you control whether the window component is shown (and rendered).

>caption Bind the visibility of the window

````CSHTML
@*Use property binding to control the state of the window programmatically*@

<button @onclick="ShowWindow">Show the Window</button>
<button @onclick="CloseWindow">Close the Window</button>

<TelerikWindow @bind-Visible="@isVisible">
    <WindowTitle>
        <strong>The Title</strong>
    </WindowTitle>
    <WindowContent>
        This is my window <strong>popup</strong> content.
    </WindowContent>
    <WindowActions>
        <WindowAction Name="Minimize"></WindowAction>
        <WindowAction Name="Maximize"></WindowAction>
        <WindowAction Name="Close"></WindowAction>
    </WindowActions>
</TelerikWindow>

@code {
    bool isVisible { get; set; }

    public void ShowWindow()
    {
        isVisible = true;
    }

    public void CloseWindow()
    {
        isVisible = false;
    }
}
````

The `Visible` parameter also exposes an event - `VisibleChanged`. You can use it to get notifications when the user tries to close the window. You can effectively cancel the event by not propagating the new visibility state to the variable the `Visible` property is bound to.

>caption React to the user closing the window

````CSHTML
@result

<button @onclick="ToggleWindow">Toggle the Window</button>

<TelerikWindow Visible="@isVisible" VisibleChanged="@VisibleChangedHandler">
    <WindowTitle>
        <strong>The Title</strong>
    </WindowTitle>
    <WindowContent>
        This is my window <strong>popup</strong> content.
    </WindowContent>
    <WindowActions>
        <WindowAction Name="Close" />
    </WindowActions>
</TelerikWindow>

@code {
    bool isVisible { get; set; }
    string result { get; set; }

    void VisibleChangedHandler(bool currVisible)
    {
        isVisible = currVisible; // if you don't do this, the window won't close because of the user action

        result = $"the window is now visible: {isVisible}";
    }

    public void ToggleWindow()
    {
        isVisible = !isVisible;

        result = $"the window is now visible: {isVisible}";
    }
}
````

>tip You may also find useful handling the `StateChanged` event - it provides similar functionality for the minimized/maximized/standard state of the window.

## Styling

The `Class` property lets you define a CSS class that will be rendered on the popup element so you can cascade through it in order to change the appearane of both the content, and the built-in elements of the Window.

>caption Use a Class to change the appearance and style of the Window

````CSHTML
<TelerikWindow Class="MyClass" Visible="true">
	<WindowTitle>
		<strong>The Title</strong>
	</WindowTitle>
	<WindowContent>
		This is my window <strong>popup</strong> content.
	</WindowContent>
</TelerikWindow>

<style>
	.MyClass { /* targets the entire popup element */
		border: 5px solid red;
	}

	.MyClass .k-window-content { /* targets the content element */
		background: yellow;
	}

	.MyClass .k-window-title { /* targets the title container */
		color: blue;
	}

	.MyClass .k-window-titlebar { /* targets the entire titlebar */
		background: gold;
	}
</style>
````

>caption The result from the code snippet above

![](images/window-custom-styling.png)

## See Also

  * [Live Demos: Window](https://demos.telerik.com/blazor-ui/window/index)
