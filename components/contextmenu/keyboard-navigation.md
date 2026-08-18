---
title: Keyboard Navigation
page_title: ContextMenu - Keyboard Navigation
description: Find the default keyboard shortcuts of the ContextMenu for Blazor. Learn how to customize the ContextMenu keyboard navigation keys and key combinations.
slug: contextmenu-keyboard-navigation
tags: telerik,blazor,contextmenu,keyboard
published: True
position: 90
components: ["contextmenu"]
---

# ContextMenu Keyboard Navigation

This article describes how the ContextMenu keyboard navigation [works](#default-keys) and how to [customize](#using-custom-keys) it. The article extends the general information about [keyboard navigation in Telerik UI for Blazor](slug:accessibility-overview#keyboard-navigation).

The ContextMenu is a single tab stop component and it focuses the first item on open. The keyboard navigation is active while the ContextMenu is visible and focused.

## Default Keys

The following table lists the default built-in keyboard shortcuts and the actions that they perform when the ContextMenu is focused. Also check the [ContextMenu Keyboard Navigation demo](https://demos.telerik.com/blazor-ui/contextmenu/keyboard-navigation).

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Key Combination | Description |
| --- | --- |
| `Down Arrow` | Moves focus one item down. |
| `Up Arrow` | Moves focus one item. |
| `Right Arrow` | Opens the submenu and moves focus to the first child item. |
| `Left Arrow` | Closes the submenu and moves focus to the parent item. |
| `Home` | Moves focus to the first item in the current list. |
| `End` | Moves focus to the last item in the current list. |
| `Enter`, `Space` | Activates the focused item. Equivalent to a click. |
| `Escape` | Closes the ContextMenu. |

## Using Custom Keys

The ContextMenu supports replacing the default built-in keyboard shortcuts or adding new ones that perform the same actions.

To override the built-in ContextMenu keyboard shortcuts, you need to create a `Dictionary<string, ContextMenuKeyboardCommand?>>` that defines:

* Key names as `string` values. Use the same key names as in the [`KeyboardEventArgs.Key`](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.web.keyboardeventargs.key) property, for example, `"B"`, `"Enter"`, or `"ArrowDown"`.
* Keyboard commands to execute as [`ContextMenuKeyboardCommand`](#keyboard-command) values.

Set the `Dictionary` to the ContextMenu `CustomKeyboardShortcuts` parameter.

>caption Setting custom ContextMenuKeyboardCommand keyboard shortcuts

````RAZOR.skip-repl
<TelerikContextMenu CustomKeyboardShortcuts="@ContextMenuCustomShortcuts" />

@code {
    private Dictionary<string, ContextMenuKeyboardCommand?> ContextMenuCustomShortcuts = new()
    {
        ["w"] = ContextMenuKeyboardCommand.NavigateUp,
        ["s"] = ContextMenuKeyboardCommand.NavigateDown,
        ["d"] = ContextMenuKeyboardCommand.OpenSubmenu,
        ["a"] = ContextMenuKeyboardCommand.NavigateToParent
    };
}
````

### Keyboard Command

The [`ContextMenuKeyboardCommand`](slug:Telerik.Blazor.ContextMenuKeyboardCommand) enum represents a user action, for example, `NavigateDown`, `ActivateItem`, `OpenSubmenu`, and others.

You can define multiple keyboard shortcuts that execute the same keyboard command. If a ContextMenu keyboard command has no custom key, the component uses the default key. To disable a built-in keyboard command for a specific key, use `null`.

### Example

<demo metaUrl="client/contextmenu/keyboard-navigation/" height="400"></demo>

## See Also

* [Online Demo: ContextMenu Keyboard Navigation](https://demos.telerik.com/blazor-ui/contextmenu/keyboard-navigation)
* [Keyboard navigation in Telerik UI for Blazor](slug:accessibility-overview#keyboard-navigation)
* [Telerik UI for Blazor Accessibility Overview](slug:accessibility-overview)
