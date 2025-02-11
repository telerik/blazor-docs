---
title: Events
page_title: TreeView - Events
description: Events of the TreeView for Blazor.
slug: treeview-events
tags: telerik,blazor,treeview,events
published: True
position: 20
---

# TreeView Events

This article explains the events available in the Telerik TreeView for Blazor:

* [CheckedItemsChanged](#checkeditemschanged)
* [ExpandedItemsChanged](#expandeditemschanged)
* [OnExpand](#onexpand)
* [OnItemClick](#onitemclick)
* [OnItemContextMenu](#onitemcontextmenu)
* [OnItemDoubleClick](#onitemdoubleclick)
* [OnItemRender](#onitemrender)
* [SelectedItemsChanged](#selecteditemschanged)
* [Drag Events](#drag-events)

## CheckedItemsChanged

The `CheckedItemsChanged` event fires every time the user uses a [checkbox](slug:treeview-checkboxes-overview) to select a new item.

## ExpandedItemsChanged

The `ExpandedItemsChanged` event fires every time the user expands or collapses a TreeView item.

## OnExpand

The `OnExpand` event fires when the user expands or collapses a node (either with the mouse, or with the keyboard). You can use it to know that the user performed that action, and/or to implement [load on demand](slug:components/treeview/data-binding/load-on-demand).

@[template](/_contentTemplates/common/general-info.md#rerender-after-event)

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

## OnItemClick

The `OnItemClick` event fires when the user clicks, taps or presses `Enter` on a TreeView node (item). For example, use this event to react to user actions and load data on demand for another component.

The `OnItemClick` event handler receives a `TreeViewItemClickEventArgs` argument, which has the following properties.

@[template](/_contentTemplates/common/click-events.md#clickeventargs)

## OnItemContextMenu

The `OnItemContextMenu` event fires when the user right-clicks on a TreeView node, presses the context menu keyboard button, or taps-and-holds on a touch device.

The event handler receives a `TreeViewItemContextMenuEventArgs` argument, which has the following properties.

@[template](/_contentTemplates/common/click-events.md#clickeventargs)

The `OnItemContextMenu` is used to [integrate the Context menu](slug:contextmenu-integration#context-menu-for-a-treeview-node) to the TreeView node.

## OnItemDoubleClick

The `OnItemDoubleClick` event fires when the user double-clicks or double-taps a TreeView node.

The event handler receives a `TreeViewItemDoubleClickEventArgs` argument, which has the following properties.

@[template](/_contentTemplates/common/click-events.md#clickeventargs)

## OnItemRender

The `OnItemRender` event fires when each node in the TreeView renders. 

The event handler receives as an argument an `TreeViewItemRenderEventArgs` object that contains:

| Property | Description |
| --- | --- |
| `Item`   | The current item that renders in the TreeView. |
| `Class`  | The custom CSS class that will be added to the item. Renders on the `<div>` element that wraps the current `Item`. |

## SelectedItemsChanged

The `SelectedItemsChanged` event fires when the [selection](slug:treeview-selection-overview) is enabled and the user clicks on a new item.

## Drag Events

The TreeView implements the Drag and Drop functionality through the following drag events:

* The `OnDragStart` event fires when the user starts dragging a node.
* The `OnDrag` event fires continuously while a node is being dragged by the user.
* The `OnDrop` event fires when the user drops a node into a new location. The event fires only if the new location is a Telerik component.
* The `OnDragEnd` event fires when a drag operation ends. Unlike the `OnDrop` event, `OnDragEnd` will fire even if the new location is not a Telerik component.   

For more details and examples, see the [Treeview Drag and Drop](slug:treeview-drag-drop-overview) article.

## Example

>caption Handle Blazor TreeView Events

````RAZOR
<TelerikTreeView Data="@TreeViewData"
                 CheckBoxMode="@TreeViewCheckBoxMode.Single"
                 SelectionMode="@TreeViewSelectionMode.Single"
                 CheckedItems="@TreeViewCheckedItems"
                 CheckedItemsChanged="@((IEnumerable<object> items) => TreeViewCheckedItemsChanged(items))"
                 ExpandedItems="@TreeViewExpandedItems"
                 ExpandedItemsChanged="@TreeViewExpandedItemsChanged"
                 OnExpand="@OnTreeViewExpand"
                 OnItemClick="@OnTreeViewItemClick"
                 OnItemContextMenu="OnTreeViewItemContextMenu"
                 OnItemDoubleClick="@OnTreeViewItemDoubleClick"
                 OnItemRender="@OnTreeViewItemRender"
                 SelectedItems="@TreeViewSelectedItems"
                 SelectedItemsChanged="@((IEnumerable<object> item) => TreeViewSelectedItemsChanged(item))">
</TelerikTreeView>

@{
    <div>
                <span>Console</span>
                <span>
                    <TelerikButton OnClick="@OnClearClick" Icon="@SvgIcon.X">Clear</TelerikButton>
                </span>
                <div>
                    @(new MarkupString(EventLog))
                </div>
    </div>
}

<style>
    .bold-text-parent-items {
        font-weight: bold;
    }
</style>

@code {
    private string EventLog { get; set; } = string.Empty;
    private List<TreeItem> TreeViewData { get; set; }
    private IEnumerable<object> TreeViewCheckedItems { get; set; } = new List<object>();
    private IEnumerable<object> TreeViewExpandedItems { get; set; } = new List<TreeItem>();
    private IEnumerable<object> TreeViewSelectedItems { get; set; } = new List<object>();

    private void TreeViewCheckedItemsChanged(IEnumerable<object> items)
    {
        EventLog += "<div><strong>The CheckedItemsChanged event fired.</strong</div>";

        TreeViewCheckedItems = items;
    }

    private async Task TreeViewExpandedItemsChanged(IEnumerable<object> items)
    {
        EventLog += "<div>The <strong>ExpandedItemsChanged</strong> event fired.</div>";

        TreeViewExpandedItems = items;
    }

    private async Task OnTreeViewExpand(TreeViewExpandEventArgs args)
    {
        EventLog += "<div>The <strong>OnExpand</strong> event fired.</div>";

        TreeItem node = args.Item as TreeItem;
    }

    private async Task OnTreeViewItemClick(TreeViewItemClickEventArgs args)
    {
        EventLog += "<div><span>The <strong>OnItemClick</strong> event fired.</span>";

        TreeItem node = args.Item as TreeItem;

        if (args.EventArgs is KeyboardEventArgs keyboardEventArgs)
        {
            EventLog += $"<span>The user clicked {keyboardEventArgs.Key} on node {node.Text}</span></div>";
        }
        else if (args.EventArgs is MouseEventArgs mouseEventArgs)
        {
            EventLog += $"<span>The user clicked {mouseEventArgs.ClientX} {mouseEventArgs.ClientY} on node {node.Text}</span></div>";
        }
    }

    private void OnTreeViewItemContextMenu(TreeViewItemContextMenuEventArgs args)
    {
        EventLog += "<div><span>The <strong>OnItemContextMenu</strong> event fired.</span>";

        TreeItem node = args.Item as TreeItem;

        if (args.EventArgs is KeyboardEventArgs keyboardEventArgs)
        {
            EventLog += $"<span>The user clicked {keyboardEventArgs.Key} on node {node.Text}</span></div>";
        }
        else if (args.EventArgs is MouseEventArgs mouseEventArgs)
        {
            EventLog += $"<span>The user clicked {mouseEventArgs.ClientX} {mouseEventArgs.ClientY} on node {node.Text}</span></div>";
        }
    }

    private async Task OnTreeViewItemDoubleClick(TreeViewItemDoubleClickEventArgs args)
    {
        EventLog += "<div><span>The <strong>OnItemDoubleClick</strong> event fired.</span>";

        TreeItem node = args.Item as TreeItem;

        if (args.EventArgs is KeyboardEventArgs keyboardEventArgs)
        {
            EventLog += $"<span>The user clicked {keyboardEventArgs.Key} on node {node.Text}</span></div>";
        }
        else if (args.EventArgs is MouseEventArgs mouseEventArgs)
        {
            EventLog += $"<span>The user clicked {mouseEventArgs.ClientX} {mouseEventArgs.ClientY} on node {node.Text}</span></div>";
        }
    }

    private void OnTreeViewItemRender(TreeViewItemRenderEventArgs args)
    {
        EventLog += "<div>The <strong>OnItemRender</strong> event fired.</div>";

        TreeItem node = args.Item as TreeItem;

        if (node.ParentId == null && node.HasChildren)
        {
            args.Class = "bold-text-parent-items";
        }
    }

    private void TreeViewSelectedItemsChanged(IEnumerable<object> items)
    {
        EventLog += "<div>The <strong>SelectedItemsChanged</strong> event fired.</div>";

        TreeViewSelectedItems = items;
    }

    private void OnClearClick()
    {
        EventLog = string.Empty;
    }

    protected override void OnInitialized()
    {
        LoadFlatData();

        //provide initial checked item when the page is loaded
        var precheckedItem = TreeViewData.Where(x => x.Id == 3);

        TreeViewCheckedItems = new List<object>(precheckedItem);
    }

    #region Data Model

    public class TreeItem
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public int? ParentId { get; set; }
        public bool HasChildren { get; set; }
        public ISvgIcon Icon { get; set; }
    }
    #endregion

    #region Data Generation

    private void LoadFlatData()
    {
        List<TreeItem> items = new List<TreeItem>();

        items.Add(new TreeItem()
            {
                Id = 1,
                Text = "Project",
                ParentId = null,
                HasChildren = true,
                Icon = SvgIcon.Folder
            });

        items.Add(new TreeItem()
            {
                Id = 2,
                Text = "Design",
                ParentId = 1,
                HasChildren = true,
                Icon = SvgIcon.Brush
            });
        items.Add(new TreeItem()
            {
                Id = 3,
                Text = "Implementation",
                ParentId = 1,
                HasChildren = true,
                Icon = SvgIcon.Folder
            });

        items.Add(new TreeItem()
            {
                Id = 4,
                Text = "site.psd",
                ParentId = 2,
                HasChildren = false,
                Icon = SvgIcon.FilePsd
            });
        items.Add(new TreeItem()
            {
                Id = 5,
                Text = "index.js",
                ParentId = 3,
                HasChildren = false,
                Icon = SvgIcon.Js
            });
        items.Add(new TreeItem()
            {
                Id = 6,
                Text = "index.html",
                ParentId = 3,
                HasChildren = false,
                Icon = SvgIcon.Html5
            });
        items.Add(new TreeItem()
            {
                Id = 7,
                Text = "styles.css",
                ParentId = 3,
                HasChildren = false,
                Icon = SvgIcon.Css
            });

        TreeViewData = items;
    }
    #endregion
}
````

## See Also

  * [TreeView Overview](slug:treeview-overview)
  * [TreeView Selection](slug:treeview-selection-overview)
  * [TreeView CheckBoxes](slug:treeview-checkboxes-overview)
