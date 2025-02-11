---
title: Overview
page_title: Treeview Data Binding Overview
description: Data Binding basics in the Treeview for Blazor.
slug: components/treeview/data-binding/overview
tags: telerik,blazor,treeview,data,bind,databind,databinding,basics
published: True
position: 0
---

# Treeview Data Binding

This article explains how to relate TreeView item features to properties of the data model. This is a prerequisite for successful data binding of the TreeView:

* What are the [features of a TreeView item](#item-features).
* How to [match model properties with TreeView item features](#treeview-bindings).


## Item Features

The TreeView items have features that map to properties in the model. The following model uses property names that will [work automatically, with no additional TreeView configuration](slug:treeview-overview#creating-blazor-treeview):

<div class="skip-repl"></div>

````CSHARP
public class TreeItem
{
    public int Id { get; set; }
    public string Text { get; set; }
    public bool HasChildren { get; set; }

    // ParenId for flat data
    public int? ParentId { get; set; }
    // OR
    // Items for hierarchical data
    public IEnumerable<TreeItem> Items { get; set; }

    public ISvgIcon Icon { get; set; }
    public string Url { get; set; }
}
````

The above model properties have the following meaning for the TreeView:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

<style>
    style + table td {
        vertical-align: top;
    }
</style>

| Property | Description |
| --- | --- |
| `Id` | A unique identifier. Required for [binding to **flat data**](slug:components/treeview/data-binding/flat-data). |
| `Text` | Sets the item content as plain text. For rich content and nested components, use an [item template](slug:components/treeview/templates) |
| **Item relations** | |
| `HasChildren` | Determines whether the item has children, no matter if they are loaded or not. Required for binding to **flat data** and for [**load on demand**](slug:components/treeview/data-binding/load-on-demand). If `true`, the item will show an expand arrow. With **hierarchical data**, the TreeView renders expand icons based on `Items`, but `HasChildren` will take precedence. |
| `ParentId` | Identifies the item's parent. Required for binding to **flat data**. Set to `null` for root items. **Do not use `ParentId` with hierarchical data.** |
| `Items` | Defines the item's children. Required for [binding to **hierarchical data**](slug:components/treeview/data-binding/hierarchical-data). The children's type can be different from the parent item type. The TreeView will render an expand arrow on the parent node if its child `Items` collection is not `null`. Also see `HasChildren`. |
| [**Graphics**](slug:treeview-icons) | |
| `Icon` | Defines a [Telerik Font and Svg icon](slug:common-features-icons) |
| [**Navigation**](slug:treeview-navigation) | |
| `Url` | If set, the TreeView will generate a link to another page in the app, or an external page. |

## TreeView Bindings

All [TreeView item features](#item-features) map to model properties. The model properties can have different names in every application. That is why, the mappings between the model and the TreeView depend on `TreeViewBinding` tags.

Each `TreeViewBinding` tag exposes the following parameters that refer to model property names:

| TreeViewBinding Parameter | Default Value |
| --- | --- |
| `IdField` | `"Id"` |
| `TextField` | `"Text"` |
| **Item relations** | |
| `HasChildrenField` | `"HasChildren"` |
| `ParentIdField` (flat data) | `"ParentId"` |
| `ItemsField` (hierarchical data) | `"Items"` |
| [**Graphics**](slug:treeview-icons) | |
| `IconField` | `"Icon"` |
| [**Navigation**](slug:treeview-navigation) | |
| `UrlField` | `"Url"` |

It is possible to [configure different bindings for different item levels](#multiple-level-bindings). Usually one binding configuration is enough. For example, if the model properties are...

<div class="skip-repl"></div>

````CSHARP
public class TreeItem
{
    public int UniqueID { get; set; }
    public string Description { get; set; }
    public bool HasChildren { get; set; }
    public IEnumerable<TreeItem> Children { get; set; }
}
````

... then the binding configuration should look like this:

<div class="skip-repl"></div>

````HTML
<TelerikTreeView>
    <TreeViewBindings>
        <TreeViewBinding IdField="UniqueID" TextField="Description" ItemsField="Children" />
    </TreeViewBindings>
</TelerikTreeView>
````

>tip If some model property names match the default ones in the table above, then there is no need to configure them in a `TreeViewBinding`.

@[template](/_contentTemplates/common/navigation-components.md#default-fields-match-issues)

> Do not use `ParentId` with hierarhical data. This will confuse the TreeView that it is bound to flat data and the component may not render any items. If the model must have a `ParentId` property, set `ParentIdField` in the `TreeViewBinding` to a non-existent property.


### Multiple Level Bindings

The `TreeViewBinding` tag has one more parameter - **`Level`**. It allows you to define different model properties for different TreeView levels.

Multiple level bindings can make the application more flexible. If you use [hierarchical data binding](slug:components/treeview/data-binding/hierarchical-data), the children can even use a different model type from their parent.

`Level` also allows you to define a different [`ItemTemplate`](slug:components/treeview/templates) for different levels.

To define multiple bindings, add multiple `TreeViewBinding` tags and set their `Level`. **Levels are zero-based.**

`Level` defines a binding for a specific level of depth. If no `Level` is set, the bindings will apply to any level that does not have explicit settings. TreeViews with unknown item depth should have one `TreeViewBinding` without a `Level`.

>caption How to use different model fields and binding settings for different levels

````RAZOR
The third level will use the main data bindings settings that do not have a level specified

<TelerikTreeView Data="@FlatData" @bind-ExpandedItems="@ExpandedItems">
    <TreeViewBindings>
        <TreeViewBinding ParentIdField="Parent" />
        <TreeViewBinding Level="1" TextField="SecondText" ParentIdField="Parent" />
    </TreeViewBindings>
</TelerikTreeView>

@code {
    public IEnumerable<TreeItem> FlatData { get; set; }
    public IEnumerable<object> ExpandedItems { get; set; } = new List<TreeItem>();

    public class TreeItem
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string SecondText { get; set; }
        public int? Parent { get; set; }
        public bool HasChildren { get; set; }
    }

    protected override void OnInitialized()
    {
        LoadFlat();
        ExpandedItems = FlatData.Where(x => x.HasChildren == true).ToList();
    }

    private void LoadFlat()
    {
        List<TreeItem> items = new List<TreeItem>();

        for (int i = 1; i <= 4; i++)
        {
            items.Add(new TreeItem()
            {
                Id = i,
                Text = "Parent " + i,
                Parent = null,
                HasChildren = i < 3
            });
        }

        for (int i = 5; i < 15; i++)
        {
            items.Add(new TreeItem()
            {
                Id = i,
                SecondText = "Child " + i, //this is the field used at level 1 - it is a different field than at levels 0 and 2
                Parent = i < 10 ? 1 : 2,
                HasChildren = i == 5
            });
        }

        for (int i = 16; i < 20; i++)
        {
            items.Add(new TreeItem()
            {
                Id = i,
                Text = "Second Child " + i,
                Parent = 5
            });
        }

        FlatData = items;
    }
}
````

>note For better performance, define the same `ParentIdField` for all levels, when using flat data.


## Next Steps

Learn the three different ways to provide data to a TreeView:

* [Use flat data](slug:components/treeview/data-binding/flat-data) - a collection of self-referencing items with parent-child relationships
* [Use hierarchical data](slug:components/treeview/data-binding/hierarchical-data) - each item holds its children in a nested property
* [Load child items on demand](slug:components/treeview/data-binding/load-on-demand) (lazy loading) - load children when the parent node expands. Applies to both types of data.


## See Also

* [Live Demo: Multiple Level Bindings](https://demos.telerik.com/blazor-ui/treeview/bindings)
