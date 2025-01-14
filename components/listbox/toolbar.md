---
title: Toolbar
page_title: ListBox - Toolbar
description: Configure and use the Blazor ListBox toolbar and its built-in buttons. How to change the toolbar position or define custom toolbar buttons.
slug: listbox-toolbar
tags: telerik,blazor,listbox
published: True
position: 10
---

# ListBox Toolbar

The ListBox toolbar can render built-in and custom tools. The built-in tools are buttons that reorder and remove items or transfer items from and to another ListBox component. This article describes the built-in tools and shows how to add custom tools or customize the toolbar.


## Built-in Tools

By default, the ListBox displays all its built-in tools in the order below. Use the respective tool tag if you need to define a tool explicitly in a [custom toolbar configuration](#toolbar-configuration).

Each button becomes enabled when it can be used, for example, when the user selects items. Each built-in button fires an event and the app must implement the required data source operation.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Tool Name | Tool Tag | Event On Click | Description |
| --- | --- | --- | --- |
| Move Up | `<ListBoxToolBarMoveUpTool />` | [`OnReorder`](slug://listbox-events#onreorder) | Moves the selected item(s) down by one position. |
| Move Down | `<ListBoxToolBarMoveDownTool />` | [`OnReorder`](slug://listbox-events#onreorder) | Moves the selected items up by one position. |
| Transfer To | `<ListBoxToolBarTransferToTool />` | [`OnTransfer`](slug://listbox-events#ontransfer) | Moves the selected items to a connected ListBox component. |
| Transfer From | `<ListBoxToolBarTransferFromTool />` | [`OnTransfer`](slug://listbox-events#ontransfer) | Moves the selected items from a connected ListBox component to the current one. |
| Transfer All To | `<ListBoxToolBarTransferAllToTool />` | [`OnTransfer`](slug://listbox-events#ontransfer) | Moves all items to a connected ListBox component. |
| Transfer All From | `<ListBoxToolBarTransferAllFromTool />` | [`OnTransfer`](slug://listbox-events#ontransfer) | Moves all items from the connected ListBox component to the current one. |
| Remove | `<ListBoxToolBarRemoveTool />` | [`OnRemove`](slug://listbox-events#onremove) | Removes the selected item(s). |

The descriptions above mention the typical user operation that each button implies. However, the exact operation depends entirely on the business requirements and event handler implementation. For example:

* Clicking on the Remove button can apply custom disabled styling to an item, instead of removing it. The app may also prevent selection of this item through the [ListBox `SelectedItemsChanged` event](slug://listbox-events#selecteditemschanged).
* Transferred items can be copied to another ListBox component, rather than moved.
* Reordered non-adjacent items can be moved with or without the gap between them.


## Custom Tools

In addition to built-in tools, the ListBox also supports custom tools. Use the `<ListBoxToolBarCustomTool>` tag, which is a standard Blazor `RenderFragment`. See the example under [Toolbar Configuration](#toolbar-configuration).


## Toolbar Configuration

The following example demonstrates how to:

* Define a custom ListBox toolbar configuration with the desired tools in a specific order.
* Mimic the default toolbar configuration, except for the custom tool.
* Enable or disable a custom toolbar button, depending on the current ListBox selection.

The example below omits all required event handlers for brevity. Consult the [ListBox Events article](slug://listbox-events) for more information and complete examples.

>caption Setting up the ListBox Toolbar

````RAZOR
@* ListBox and Button handlers are not defined for brevity. *@

<h2>Select ListBox toolbar position</h2>

<TelerikRadioGroup Data="@RadioGroupData"
                   @bind-Value="@CurrentToolBarPosition">
</TelerikRadioGroup>

<br />
<br />

<TelerikListBox Data="@ListBoxData"
                TextField="@nameof(ListBoxModel.Name)"
                SelectionMode="@ListBoxSelectionMode.Multiple"
                @bind-SelectedItems="@ListBoxSelectedItems"
                ToolBarPosition="@CurrentToolBarPosition"
                Width="max-content"
                Height="auto">
    <ListBoxToolBarSettings>
        <ListBoxToolBar Visible="true">
            <ListBoxToolBarMoveUpTool />
            <ListBoxToolBarMoveDownTool />
            <ListBoxToolBarTransferToTool />
            <ListBoxToolBarTransferFromTool />
            <ListBoxToolBarTransferAllToTool />
            <ListBoxToolBarTransferAllFromTool />
            <ListBoxToolBarRemoveTool />
            <ListBoxToolBarCustomTool>
                <TelerikButton Icon="@SvgIcon.Gear"
                               Enabled="@( ListBoxSelectedItems.Count() > 0 )" />
            </ListBoxToolBarCustomTool>
        </ListBoxToolBar>
    </ListBoxToolBarSettings>
</TelerikListBox>

@code {
    private List<ListBoxModel> ListBoxData { get; set; } = new List<ListBoxModel>();

    private IEnumerable<ListBoxModel> ListBoxSelectedItems { get; set; } = new List<ListBoxModel>();

    private ListBoxToolBarPosition CurrentToolBarPosition { get; set; } = ListBoxToolBarPosition.Right;

    private List<ListBoxToolBarPosition> RadioGroupData { get; set; } = new List<ListBoxToolBarPosition>() {
        ListBoxToolBarPosition.Top,
        ListBoxToolBarPosition.Right,
        ListBoxToolBarPosition.Bottom,
        ListBoxToolBarPosition.Left
    };

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 7; i++)
        {
            ListBoxData.Add(new ListBoxModel()
            {
                Id = i,
                Name = $"ListBox Item {i}",
            });
        }

        base.OnInitialized();
    }

    public class ListBoxModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
    }
}
````

> The `<ListBoxToolBar>` tag exposes `ChildContent` as a Blazor `RenderFragment`.
>
* If you add this tag just to toggle its `Visible` parameter at runtime, you must also define the toolbar buttons explicitly. Otherwise the `RenderFragment` will remain empty (but not `null`) and no buttons will show.
* `RenderFragment` allows any child content (yet), however, the ListBox expects only built-in or custom tools.


## Next Steps

* [Choose the ListBox selection mode](slug://listbox-selection)
* [Connect Multiple ListBoxes](slug://listbox-connect)
* [Enable ListBox drag-and-drop](slug://listbox-dragdrop)
* [Implement ListBox templates](slug://listbox-templates)
* [Handle ListBox events](slug://listbox-events)

## See Also

* [Live Demo: ListBox Toolbar](https://demos.telerik.com/blazor-ui/listbox/toolbar)
