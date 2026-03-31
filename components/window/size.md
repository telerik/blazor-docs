---
title: Size
page_title: Window Size
description: How to control size of the Window for Blazor.
slug: components/window/size
tags: telerik,blazor,window,size
published: True
position: 1
components: ["window"]
---

# Window Size

The Window offers different features to control its size:

* [Width and Height](#width-and-height), together with min/max parameters
* [Maximize and Minimize](#maximize-and-minimize)
* [User resizing](#resizing)

## Width and Height

If you know the size you need, just set the `Width` or `Height` parameters. They can take valid CSS values (see the [Dimensions](slug:common-features/dimensions) article).

The Window also provides parameters that control its dimensions in a more flexible way:

* `MinHeight`
* `MaxHeight`
* `MinWidth`
* `MaxWidth`

Min/max dimensions take precedence over [user resizing](#resizing) and `Width` / `Height` settings.

If no dimensions are set, the Window will expand, according to its contents, like any other `<div>` element. This may affect the [Window's positioning](slug:components/window/position).

If you set dimensions and the Window content does not fit, scrollbars will show.

>caption Configure Window Width and Height, and min/max dimensions

````RAZOR
<TelerikWindow @bind-Height="@WindowHeight"
               MaxHeight="400px"
               MinHeight="200px"
               @bind-Width="@WindowWidth"
               MaxWidth="800px"
               MinWidth="400px"
               @bind-Visible="@WindowVisible">
    <WindowTitle>Window Title</WindowTitle>
    <WindowContent>
        <p>The default width is 600px. The user can resize from 400px to 800px.</p>
        <p>The default height is 300px. The user can resize from 200px to 400px.</p>
    </WindowContent>
</TelerikWindow>

@code {
    private bool WindowVisible { get; set; } = true;

    private string WindowHeight { get; set; } = "300px";
    private string WindowWidth { get; set; } = "600px";
}
````

## Maximize and Minimize

The user can maximize and minimize the Window through [action buttons in its titlebar](slug:components/window/actions).

You can invoke those actions by setting the `State` parameter. It takes a member of the `Telerik.Blazor.WindowState` enum:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| `WindowState`&nbsp;Value | Description |
| --- | --- |
| `Default` | The size and position will depend on the `Top`, `Left`, `Centered`, `Width`, `Height`, `Size` parameters. |
| `Minimized` | The Window will show its titlebar only. The component will dispose its content and remove it from the page DOM. If you prefer to just hide the Window content with CSS, [set `PersistContent` to `true`](slug:window-overview#window-parameters). |
| `Maximized` | The Window will take up the entire viewport. |

>caption Maximize, Minimize and Restore the Window programmatically

````RAZOR
<TelerikWindow @bind-State="@WindowState"
               Height="200px"
               Width="400px"
               Resizable="false"
               Visible="true">
    <WindowTitle>Window Title</WindowTitle>
    <WindowActions>
        <WindowAction Name="Minimize"></WindowAction>
        <WindowAction Name="Maximize"></WindowAction>
    </WindowActions>
    <WindowContent>
        <select @bind=@WindowState>
            <option value="@WindowState.Default">Default</option>
            <option value="@WindowState.Maximized">Maximized</option>
            <option value="@WindowState.Minimized">Minimized</option>
        </select>
    </WindowContent>
</TelerikWindow>

<select @bind="@WindowState">
    <option value="@WindowState.Default">Default</option>
    <option value="@WindowState.Maximized">Maximized</option>
    <option value="@WindowState.Minimized">Minimized</option>
</select>

@code {
    private WindowState WindowState { get; set; } = WindowState.Default;
}
````

>tip With a maximized window you may want to ensure all other content stays "behind" it. To do that, see the [Block all content with a Window](slug:window-kb-block-all-content) article on ensuring that the CSS rules in the project can enable that.


## Resizing

By default, the Window is resizable. Window resizing can be controlled with [min/max Window dimensions](#width-and-height).

To disable resizing, set the `Resizable` parameter to `false`.

>caption Window Resizing

````RAZOR
<TelerikWindow @bind-Visible="@WindowVisible"
               @bind-Height="@WindowHeight"
               @bind-Width="@WindowWidth"
               Resizable="@WindowResizable">
    <WindowTitle>Window Title</WindowTitle>
    <WindowActions>
        <WindowAction Name="Minimize"></WindowAction>
        <WindowAction Name="Maximize"></WindowAction>
        <WindowAction Name="Close"></WindowAction>
    </WindowActions>
    <WindowContent>
        <TelerikButton OnClick="@(() => WindowResizable = !WindowResizable)">Toggle Resizable</TelerikButton>
    </WindowContent>
</TelerikWindow>

<TelerikButton OnClick="@(() => WindowVisible = !WindowVisible)">Toggle Visible</TelerikButton>

@code {
    private string WindowHeight { get; set; } = "200px";
    private string WindowWidth { get; set; } = "400px";
    private bool WindowResizable { get; set; } = true;
    private bool WindowVisible { get; set; } = true;
}
````

## See Also

* [Live Demo: Window Size](https://demos.telerik.com/blazor-ui/window/dimensions)
