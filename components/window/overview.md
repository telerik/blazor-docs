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
1. add some content to its `TelerikWindowContent` inner tag
1. optionally, add a title text in its `TelerikWindowTitle` tag

>caption Basic example of showing content in a Window popup

````CSHTML
@using Telerik.Blazor.Components.Window

<TelerikWindow Visible="true">
	<TelerikWindowTitle>
		<strong>The Title</strong>
	</TelerikWindowTitle>
	<TelerikWindowContent>
		This is my window <strong>popup</strong> content.
	</TelerikWindowContent>
</TelerikWindow>
````

>caption The result from the code snippet above

![](images/window-overview.png)

## Reference, Show, Close

The Window component is of type `Telerik.Blazor.Components.Window.TelerikWindow` and exposes several properties and methods that let you control its state. The most important ones are the `Visible` property that lets you control whether it is shown on the initial view render, and the `Show` and `Close` methods that control its visibility programmatically.

>caption Store a reference to a Telerik Window, open and close it programmatically through methods

````CSHTML
@using Telerik.Blazor.Components.Window

<button @onclick="ShowWindow">Show the Window</button>
<button @onclick="CloseWindow">Close the Window</button>

<TelerikWindow @ref="myFirstWindow">
	<TelerikWindowTitle>
		<strong>The Title</strong>
	</TelerikWindowTitle>
	<TelerikWindowContent>
		This is my window <strong>popup</strong> content.
	</TelerikWindowContent>
</TelerikWindow>

@code {
	Telerik.Blazor.Components.Window.TelerikWindow myFirstWindow;

	public void ShowWindow()
	{
		myFirstWindow.Open();
	}

	public void CloseWindow()
	{
		myFirstWindow.Close();
	}

}
````

>caption Show and close a Window by toggling a single variable

````CSHTML
@using Telerik.Blazor.Components.Window

<button @onclick="ToggleWindow">Toggle the Window</button>

<TelerikWindow Visible="@isWindowShown">
	<TelerikWindowTitle>
		<strong>The Title</strong>
	</TelerikWindowTitle>
	<TelerikWindowContent>
		This is my window <strong>popup</strong> content.
	</TelerikWindowContent>
</TelerikWindow>

@code {
	bool isWindowShown { get; set; }

	public void ToggleWindow()
	{
		isWindowShown = !isWindowShown;
	}
}
````

## Styling

The `Class` property lets you define a CSS class that will be rendered on the popup element so you can cascade through it in order to change the appearane of both the content, and the built-in elements of the Window.

>caption Use a Class to change the appearance and style of the Window

````CSHTML
@using Telerik.Blazor.Components.Window

<TelerikWindow Class="MyClass" Visible="true">
	<TelerikWindowTitle>
		<strong>The Title</strong>
	</TelerikWindowTitle>
	<TelerikWindowContent>
		This is my window <strong>popup</strong> content.
	</TelerikWindowContent>
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
