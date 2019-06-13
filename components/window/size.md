---
title: Size
page_title: Window for Blazor | Size
description: How to control size of the Window for Blazor
slug: components/window/size
tags: telerik,blazor,window,size
published: True
position: 1
---

# Window Size

The Window offers two ways for you to control its size:

* the [`Width` and `Height` properties]({%slug common-features/dimensions%})
* predefined dimensions through the `Size` property

>caption Set Width and Height to a Window

````CSHTML
@using Telerik.Blazor.Components.Window

<TelerikWindow Width="600px" Height="400px" Visible="true">
	<TelerikWindowTitle>
		<strong>The Title</strong>
	</TelerikWindowTitle>
	<TelerikWindowContent>
		I am <strong>600px</strong> wide and <strong>400px</strong> tall because my developer told me so.
	</TelerikWindowContent>
</TelerikWindow>
````

The `Size` property takes a member of the `Telerik.Blazor.Size` enum. It renders as a class that sets only the width of the dialog, and the height is rendered by the browser based on the contents. The `Width` and `Height` properties take precedence, because they are rendered as inline `style` rules.

The `Telerik.Blazor.Size` enum provides the following options:

* `Small` - `300px` width
* `Medium` - `800px` width
* `Large` - `1200px` width

>caption Set predefined size to the Window

````CSHTML
@using Telerik.Blazor.Components.Window

<TelerikWindow Visible="true" Size="@Telerik.Blazor.Size.Small">
	<TelerikWindowTitle>
		<strong>The Title</strong>
	</TelerikWindowTitle>
	<TelerikWindowContent>
		I am <strong>300px</strong> wide and my height is determined by the content my developer adds.
	</TelerikWindowContent>
</TelerikWindow>
````

>tip If you want to resize the window dynamically through data binding its `Size` property, you may want to data bind the `Width` and `Height` properties as well, so you can reset them to `null` when you want to change the size.

>note If you do not set dimensions, the browser will render the Window element with dimensions according to its contents, like any other `<div>` element. This may adversely affect [positioning](position).

## Maximize and Minimize

The user can maximize and minimize the Window through [action buttons in its titlebar]({%slug components/window/actions%}).

The developer can invoke those actions through its `Maximize`, `Minimize` and `Restore` methods, and/or through the `Maximized` and `Minimized` properties.

>caption Maximize, Minimze and Restore the Window programmatically

````Methods
@using Telerik.Blazor.Components.Window

<button onclick="@MaximizeWindow">Change Maximize state of the Window</button>
<button onclick="@MinimizeWindow">Change Minimize state of the Window</button>

<TelerikWindow ref="myWindow" Visible="true">
    <TelerikWindowTitle>
        <strong>The Title</strong>
    </TelerikWindowTitle>
    <TelerikWindowContent>
        <button onclick="@MaximizeWindow">Change Maximize state of the Window</button>
        <button onclick="@MinimizeWindow">Change Minimize state of the Window</button>
    </TelerikWindowContent>
</TelerikWindow>

@code {
    Telerik.Blazor.Components.Window.TelerikWindow myWindow;

    public void MaximizeWindow()
    {
        if (myWindow.Maximized)
        {
            myWindow.Restore();
        }
        else
        {
            myWindow.Maximize();
        }
    }

    public void MinimizeWindow()
    {
        if (myWindow.Minimized)
        {
            myWindow.Restore();
        }
        else
        {
            myWindow.Minimize();
        }
    }
}
````
````Properties
@using Telerik.Blazor.Components.Window

<button onclick="@MaximizeWindow">Change Maximize state of the Window</button>
<button onclick="@MinimizeWindow">Change Minimize state of the Window</button>

<TelerikWindow ref="myWindow" Visible="true">
	<TelerikWindowTitle>
		<strong>The Title</strong>
	</TelerikWindowTitle>
	<TelerikWindowContent>
		<button onclick="@MaximizeWindow">Change Maximize state of the Window</button>
		<button onclick="@MinimizeWindow">Change Minimize state of the Window</button>
	</TelerikWindowContent>
</TelerikWindow>

@code {
	Telerik.Blazor.Components.Window.TelerikWindow myWindow;

	public void MaximizeWindow()
	{
		myWindow.Maximized = !myWindow.Maximized;
	}

	public void MinimizeWindow()
	{
		myWindow.Minimized = !myWindow.Minimized;
	}
}
````

>tip You can bind the `Maximized` and `Minimized` properties in the markup to set initial state.


## See Also

  * [Live Demo: Window Size](https://demos.telerik.com/blazor-ui/window/dimensions)