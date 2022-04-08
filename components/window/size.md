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

The Window offers different ways for you to control its size:

* [Set Width and Height](#set-width-and-height)
* [Maximize and Minimize](#maximize-and-minimize)
* [Resizing](#resizing)


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

## Resizing

By default, the Window is resizable. To disable resizing, set the `Resizable` parameter to `false`.

>caption Window Resizing

````CSHTML
@* Toggle the resizable parameter through a button *@

<TelerikButton OnClick="@(() => WindowResizable = !WindowResizable)">Toggle Resizable</TelerikButton>

<TelerikWindow @bind-Visible="@WindowVisible"
               Resizable="@WindowResizable">
    <WindowTitle>
        <strong>Lorem ipsum</strong>
    </WindowTitle>
    <WindowActions>
        <WindowAction Name="Minimize"></WindowAction>
        <WindowAction Name="Maximize"></WindowAction>
        <WindowAction Name="Close"></WindowAction>
    </WindowActions>
    <WindowContent>
        This is my window <strong>popup</strong> content.
    </WindowContent>
</TelerikWindow>

@code {
    public bool WindowResizable { get; set; } = true;
    public bool WindowVisible { get; set; } = true;
}
````

>tip With a maximized window you may want to ensure all other content stays "behind" it. To do that, see the [Block all content with a Window]({%slug window-kb-block-all-content%}) article on ensuring that the CSS rules in the project can enable that.

## See Also

* [Live Demo: Window Size](https://demos.telerik.com/blazor-ui/window/dimensions)
