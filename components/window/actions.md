---
title: Actions
page_title: Window - Actions
description: Action buttons in Window for Blazor.
slug: components/window/actions
tags: telerik,blazor,window,actions
published: True
position: 3
components: ["window"]
---

# Window Actions

The Window offers action buttons in its titlebar:

* [Built-in actions](#built-in-actions)
    * `Maximize`
    * `Minimize`
    * `Close`
* [Custom action buttons](#custom-actions)

To define action buttons, populate the `WindowActions` tag of the Window with `WindowAction` instances.

## Action Parameters

Action buttons expose the following properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `Name` | `string` | The name of the action. Can be one of the built-in actions (see above), or a custom action name. |
| `Hidden` | `bool` | Sets if the action button is rendered. Do not use for the `Minimize` and `Maximize` actions, because the Window manages their visibility internally, based on the component state. |
| `OnClick` | `EventCallback<MouseEventArgs>` | An event handler to respond to custom action clicks. |
| `Icon` | `string` | The CSS class of the icon to be rendered. Use with the [Telerik font icons](slug:common-features-icons), or set your own font icon class. |
| `Title` | `string` | The `title` HTML attribute of the action button. |

## Built-in Actions

>caption The built-in actions of a Window

````RAZOR
<TelerikWindow @bind-Visible="@WindowVisible"
               Width="400px"
               Height="200px"
               Resizable="false">
    <WindowTitle>Window Title</WindowTitle>
    <WindowActions>
        <WindowAction Name="Minimize" />
        <WindowAction Name="Maximize" />
        <WindowAction Name="Close" Hidden="@HideClose" />
    </WindowActions>
    <WindowContent>
        <label class="k-checkbox-label">
            <TelerikCheckBox @bind-Value="@HideClose" /> Hide Close Action
        </label>
    </WindowContent>
</TelerikWindow>

<TelerikButton OnClick="@(() => WindowVisible = !WindowVisible)">Toggle Window</TelerikButton>

@code {
    private bool WindowVisible { get; set; } = true;

    private bool HideClose { get; set; }
}
````

>Setting custom icons for the built-in actions is not supported. If you need to specify a custom icon for a built-in action, use a [custom action](#custom-actions) instead. 

## Custom Actions

You can create a custom action icon and you must provide its `OnClick` handler.

>caption Handling a custom action

````RAZOR
<TelerikWindow @bind-Visible="@WindowVisible"
               Width="400px"
               Height="200px"
               Resizable="false">
    <WindowTitle>Window Title</WindowTitle>
    <WindowActions>
        <WindowAction Name="Minimize" />
        <WindowAction Icon="@SvgIcon.InfoCircle" OnClick="@OnCustomActionClick" />
        <WindowAction Icon="@("fa-solid fa-circle-user")" OnClick="@OnCustomActionClick" />
        <WindowAction Name="Maximize" />
        <WindowAction Icon="@SvgIcon.XCircle" OnClick="@(() => WindowVisible = false)" />
    </WindowActions>
    <WindowContent>
        <p>Last custom action click at: @CustomActionLog</p>
    </WindowContent>
</TelerikWindow>

<TelerikButton OnClick="@(() => WindowVisible = !WindowVisible)">Toggle Window</TelerikButton>

<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" rel="stylesheet" />

@code {
    private bool WindowVisible { get; set; }

    private string CustomActionLog { get; set; } = string.Empty;

    private async Task OnCustomActionClick()
    {
        CustomActionLog = DateTime.Now.ToString("HH:mm:ss.fff");
    }
}
````

## See Also

* [(Demo) Window Actions](https://demos.telerik.com/blazor-ui/window/actions)
* [(KB) Keep Content in the DOM When the Window Is Closed](slug:window-kb-keep-content-when-closed)
