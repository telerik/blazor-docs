---
title: Size
page_title: Window - Size
description: How to control size of the Window for Blazor.
slug: components/window/size
tags: telerik,blazor,window,size
published: True
position: 1
---

# Window Size

The Window offers three ways for you to control its size:

* [Set Width and Height](#set-width-and-height)
* [Predefined Size Options](#predefined-size)
* [Maximize and Minimize](#maximize-and-minimize)


## Set Width and Height

If you know the size you need, just set it to the `Width` and/or `Height` parameters. They can take valid CSS values (see the [Dimensions]({%slug common-features/dimensions%}) article).

>note If you do not set dimensions, no `width` and `height` CSS rules will be set, and the browser will render the Window element with dimensions according to its contents, like any other `<div>` element. This may adversely affect [positioning](position).
>
> When you set dimensions, content larger than those dimensions will produce scrollbars in the window.

>caption Set Width and Height to a Window

````CSHTML
<TelerikWindow Width="600px" Height="400px" Visible="true">
	<WindowTitle>
		<strong>The Title</strong>
	</WindowTitle>
	<WindowContent>
		I am <strong>600px</strong> wide and <strong>400px</strong> tall because my developer told me so.
	</WindowContent>
</TelerikWindow>
````

## Predefined Size

The `Size` parameter takes a member of the `Telerik.Blazor.WindowSize` enum. It renders as a class that sets only the width of the dialog, and the height is rendered by the browser based on the contents. The `Width` and `Height` properties take precedence, because they are rendered as inline `style` rules.

The `Telerik.Blazor.WindowSize` enum provides the following options:

* `Small` - `300px` width
* `Medium` - `800px` width
* `Large` - `1200px` width

>caption Set predefined size to the Window

````CSHTML
<TelerikWindow Visible="true" Size="@WindowSize.Small">
	<WindowTitle>
		<strong>The Title</strong>
	</WindowTitle>
	<WindowContent>
		I am <strong>300px</strong> wide and my height is determined by the content my developer adds.
	</WindowContent>
</TelerikWindow>
````

>tip If you want to resize the window dynamically through data binding its `Size` property, you may want to data bind the `Width` and `Height` properties as well, so you can reset them to `null` when you want to change the size.

## Maximize and Minimize

The user can maximize and minimize the Window through [action buttons in its titlebar]({%slug components/window/actions%}).

The developer can invoke those actions through binding the `State` parameter. It takes a member of the `Telerik.Blazor.WindowState` enum:
* `Default` - the size and position as defined by the `Top`, `Left`, `Centered`, `Width`, `Height`, `Size` parameters.
* `Minimized` - the window is just a narrow titlebar and does not render its content.
* `Maximized` - the window takes up the entire viewport.

>caption Maximize, Minimze and Restore the Window programmatically

````CSHTML
@* The user actions also change the state when two-way binding is used *@

<select @bind=@State>
    <option value=@WindowState.Default>Default</option>
    <option value=@WindowState.Minimized>Minimized</option>
    <option value=@WindowState.Maximized>Maximized</option>
</select>

<TelerikWindow @bind-State="@State" Width="500px" Height="300px" Visible="true"
               Top="500px" Left="600px">
    <WindowTitle>
        <strong>Lorem ipsum</strong>
    </WindowTitle>
    <WindowActions>
        <WindowAction Name="Minimize"></WindowAction>
        <WindowAction Name="Maximize"></WindowAction>
        <WindowAction Name="Close"></WindowAction>
    </WindowActions>
    <WindowContent>
        <select @bind=@State>
            <option value=@WindowState.Default>Default</option>
            <option value=@WindowState.Minimized>Minimized</option>
            <option value=@WindowState.Maximized>Maximized</option>
        </select>
    </WindowContent>
</TelerikWindow>

@code {
    public WindowState State { get; set; } = WindowState.Default;
}
````

>tip With a maximized window you may want to ensure all other content stays "behind" it. To do that, see the [Block all content with a Window]({%slug window-kb-block-all-content%}) article on ensuring that the CSS rules in the project can enable that.

## See Also

  * [Live Demo: Window Size](https://demos.telerik.com/blazor-ui/window/dimensions)
