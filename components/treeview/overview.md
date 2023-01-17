---
title: Overview
page_title: Treeview Overview
description: Overview of the Treeview for Blazor, with feature description.
slug: treeview-overview
tags: telerik,blazor,treeview,overview
published: True
position: 0
---

# Blazor Treeview Overview

The <a href="https://www.telerik.com/blazor-ui/treeview" target="_blank">Blazor Treeview component</a> displays data in a traditional tree-like structure. The data itself can be flat or hierarchical. In addition to built-in navigation capabilities, you can navigate through the items and their children, define [templates]({%slug components/treeview/templates%}) for the individual nodes, render text, checkboxes and icons, and respond to events.

## Creating Blazor TreeView

1. Use the `TelerikTreeView` tag.
1. Set the TreeView `Data` attribute to an `IEnumerable<T>`. The TreeView will automatically recognize property names like `Id`, `ParentId`, `Text` and a few others. Otherwise, [use bindings to configure custom property names]({%slug components/treeview/data-binding/overview%}#treeview-bindings).
1. (optional) Set the [`ExpandedItems`]({%slug treeview-expand-items%}) attribute to a **non-null** `IEnumerable<object>`. Use it to [expand or collapse items programmatically]({%slug treeview-expand-items%}#programmatically-expand-and-collapse-items).

>caption TreeView with flat self-referencing data and icons

````CSHTML
<TelerikTreeView Data="@FlatData"
                 @bind-ExpandedItems="@ExpandedItems" />

@code {
    IEnumerable<TreeItem> FlatData { get; set; }
    IEnumerable<object> ExpandedItems { get; set; } = new List<TreeItem>();

    protected override void OnInitialized()
    {
        FlatData = GetFlatData();

        ExpandedItems = FlatData.Where(x => x.HasChildren == true).ToList();
    }

    List<TreeItem> GetFlatData()
    {
        List<TreeItem> items = new List<TreeItem>();

        items.Add(new TreeItem()
        {
            Id = 1,
            Text = "wwwroot",
            ParentId = null,
            HasChildren = true,
            Icon = FontIcon.Folder
        });
        items.Add(new TreeItem()
        {
            Id = 2,
            Text = "css",
            ParentId = 1,
            HasChildren = true,
            Icon = FontIcon.Folder
        });
        items.Add(new TreeItem()
        {
            Id = 3,
            Text = "js",
            ParentId = 1,
            HasChildren = true,
            Icon = FontIcon.Folder
        });
        items.Add(new TreeItem()
        {
            Id = 4,
            Text = "site.css",
            ParentId = 2,
            Icon = FontIcon.Css
        });
        items.Add(new TreeItem()
        {
            Id = 5,
            Text = "scripts.js",
            ParentId = 3,
            Icon = FontIcon.Js
        });

        return items;
    }

    public class TreeItem
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public int? ParentId { get; set; }
        public bool HasChildren { get; set; }
        public FontIcon? Icon { get; set; }
    }
}
````

## Data Binding

The [TreeView provides flexible data binding]({%slug components/treeview/data-binding/overview%}) with the following capabilities:

* [Binding to flat data]({%slug components/treeview/data-binding/flat-data%}) (self-referencing data)
* [Binding to hierarchical data]({%slug components/treeview/data-binding/hierarchical-data%}). It is possible to use different types for the items at different levels.
* [Loading child items on demand]({%slug components/treeview/data-binding/load-on-demand%}) to improve performance
* [Setting property names]({%slug components/treeview/data-binding/overview%}#treeview-bindings) for item IDs, text, parent IDs, icons, links, etc.


## Selection

The TreeView supports two selection modes:

* [Standard selection]({%slug treeview-selection-overview%}) via item clicks
* [Checkbox selection]({%slug treeview-checkboxes-overview%}) that allows selecting all child items at once


## Templates

Use [templates to customize the TreeView item rendering]({%slug components/treeview/templates%}). Define a single template for all levels, or a [different template for each level]({%slug components/treeview/templates%}#different-templates-for-different-node-levels).


## Drag and Drop

Users can [drag and drop TreeView items]({%slug treeview-drag-drop-overview%}) within the same TreeView or between different ones.


## Navigate Views

The TreeView can [display links to app views and external pages]({%slug treeview-navigation%}).


## TreeView Parameters

The following table lists TreeView parameters, which are not related to other features on this page. Check the [TreeView API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikTreeView) for a full list of properties, methods and events.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `Class` | `string` | The additional CSS class that will be rendered on the `div.k-treeview` element. Use it to apply custom styles or [override the theme]({%slug themes-override%}). |
| `Size` | `string` <br /> `"md"` | Affects the TreeView layout, for example the amount of space between items. The possible valid values are `"lg"` (large), `"md"` (medium) and `"sm"` (small). For easier setting, use the predefined string properties in class [`Telerik.Blazor.ThemeConstants.TreeView.Size`](/blazor-ui/api/Telerik.Blazor.ThemeConstants.TreeView.Size). |


## TreeView Reference and Methods

To execute TreeView methods, obtain reference to the component instance via `@ref`.

The TreeView is a generic component. Its type depends on the type of its model and the type of its `Value`. In case you cannot provide either the `Value` or `Data` initially, you need to [set the corresponding types to the `TItem` and `TValue` parameters]({%slug common-features-data-binding-overview%}#component-type).

The table below lists the TreeView methods. Also consult the [TreeView API](/blazor-ui/api/Telerik.Blazor.Components.TelerikTreeView).

| Method | Description |
| --- | --- |
| `Rebind` | [Refreshes the component data]({%slug treeview-refresh-data%}#rebind-method). |
| `GetItemFromDropIndex` <br /> `(string index)` | gets the corresponding `TItem` of the destination TreeView from the passed [`DestinationIndex`]({%slug grid-drag-drop-overview%}#event-arguments) |

````CSHTML
<TelerikTreeView @ref="@TreeViewRef" .../>

@code{
    private TelerikTreeView TreeViewRef;
}
````

## Next Steps

* [Review TreeView data binding]({%slug components/treeview/data-binding/overview%})
* [Experiment with TreeView Checkboxes]({%slug treeview-checkboxes-overview%})


## See Also

* [Live TreeView Demos](https://demos.telerik.com/blazor-ui/treeview/index)
* [TreeVew API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikTreeView)
* [Enable TreeView Scrolling]({%slug treeview-kb-horizontal-scrollbar%})
