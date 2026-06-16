---
title: Keyboard Navigation
page_title: Window - Keyboard Navigation
description: Find the default keyboard shortcuts of the Window for Blazor. Learn how to customize the Window keyboard navigation keys and key combinations.
slug: window-keyboard-navigation
tags: telerik,blazor,window,keyboard
published: True
tag: new
position: 19
components: ["window"]
---

# Window Keyboard Navigation

This article describes how the Window keyboard navigation works and how to [customize](#using-custom-keys) it. The article extends the general information about [keyboard navigation in Telerik UI for Blazor](slug:accessibility-overview#keyboard-navigation).

The Window's keyboard navigation is active while the component is visible and focused.

## Default Keys

The following sections list the default built-in keyboard shortcuts and the actions that they perform when a specific Window area or cell is focused. Also check the [Window Keyboard Navigation demo](https://demos.telerik.com/blazor-ui/window/keyboard-navigation).

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Key Combination | Description |
| --- | --- |
| `Alt` + `ArrowDown` | Minimizes a Window in the default state and restores it if maximized. |
| `Alt` + `ArrowUp` | Maximizes a Window in the default state and restores it if minimized. |
| `Escape` | Closes the Window. |

## Using Custom Keys

The Window supports replacing the default built-in keyboard shortcuts or adding new ones that perform the same actions.

To override the built-in Window keyboard shortcuts, you need to create a `Dictionary<string, WindowKeyboardCommand?>>` that defines:

* Key names as `string` values. Use the same key names as in the [`KeyboardEventArgs.Key`](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.web.keyboardeventargs.key) property, for example, `"B"`, `"Enter"`, or `"ArrowDown"`.
* Keyboard commands to execute as [`WindowKeyboardCommand`](#keyboard-command) values.

Set the `Dictionary` to the Window `CustomKeyboardShortcuts` parameter.

>caption Setting custom WindowKeyboardCommand keyboard shortcuts

````RAZOR.skip-repl
<TelerikWindow CustomKeyboardShortcuts="@WindowCustomShortcuts" />

@code {
    private Dictionary<string, WindowKeyboardCommand?> WindowCustomShortcuts = new()
    {
        ["w"] = WindowKeyboardCommand.NavigateUp,
        ["s"] = WindowKeyboardCommand.NavigateDown,
        ["d"] = WindowKeyboardCommand.OpenSubmenu,
        ["a"] = WindowKeyboardCommand.NavigateToParent
    };
}
````

### Keyboard Command

The [`WindowKeyboardCommand`](slug:Telerik.Blazor.WindowKeyboardCommand) enum represents a user action, for example, `NavigateDown`, `ActivateItem`, `OpenSubmenu`, and others.

You can define multiple keyboard shortcuts that execute the same keyboard command. If a Window keyboard command has no custom key, the component uses the default key. To disable a built-in keyboard command for a specific key, use `null`.

### Example

The following sample shows how to:

* Disable closing the Window with the `Escape` key.
* Minimize, restore, and maximize the Window with a custom key.

````RAZOR
<TelerikButton OnClick="@( () => WindowVisible = !WindowVisible )">Toggle Window</TelerikButton>

<TelerikWindow @bind-Visible="@WindowVisible"
               CustomKeyboardShortcuts="@WindowCustomKeyboardShortcuts">
    <WindowActions>
        <WindowAction Name="Minimize" />
        <WindowAction Name="Maximize" />
        <WindowAction Name="Close" />
    </WindowActions>
    <WindowTitle>
        Window Title
    </WindowTitle>
    <WindowContent>
        Window Content
    </WindowContent>
</TelerikWindow>

@code {
    private bool WindowVisible { get; set; }

    private Dictionary<string, WindowKeyboardCommand?> WindowCustomKeyboardShortcuts { get; set; } = new Dictionary<string, WindowKeyboardCommand?>
    {
        { "Escape", null },
        { "m", WindowKeyboardCommand.Minimize },
        { "r", WindowKeyboardCommand.Maximize }
    };
}
````

## See Also

* [Online Demo: Window Keyboard Navigation](https://demos.telerik.com/blazor-ui/window/keyboard-navigation)
* [Keyboard navigation in Telerik UI for Blazor](slug:accessibility-overview#keyboard-navigation)
* [Telerik UI for Blazor Accessibility Overview](slug:accessibility-overview)
