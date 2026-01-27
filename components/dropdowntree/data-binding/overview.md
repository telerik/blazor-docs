---
title: Overview
page_title: DropDownTree Data Binding Overview
description: Overview of the Telerik DropDownTree for Blazor
slug: dropdowntree-databinding-overview
tags: blazor,dropdowntree,dropdown
published: True
position: 0
---

# Blazor DropDownTree Data Binding

This article explains how bind the DropDownTree to data and how to relate item features to properties of the model class. This is a prerequisite for successful data binding of the DropDownTree:

* What are the [features of a DropDownTree item](#item-features).
* How to [match model properties with DropDownTree item features](#treeview-bindings).

## Item Features

The DropDownTree items have features that map to properties in the model. The following class uses property names that will [work automatically, with no additional DropDownTree configuration](slug:dropdowntree-overview#creating-blazor-dropdowntree):

````CSHARP.skip-repl
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
}
````

The above model properties have the following meaning for the DropDownTree:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

<style>
    style + table td {
        vertical-align: top;
    }
</style>

| Property | Description |
| --- | --- |
| `Id` | A unique identifier. Required for [binding to flat data](slug:dropdowntree-data-binding-flat-data). |
| `Text` | Sets the item content as plain text. For rich content and nested components, use an [item template](slug:dropdowntree-templates) |
| `HasChildren` | Determines whether the item has children, no matter if they are loaded or not. Required for binding to flat data and for [load on demand](slug:dropdowntree-data-binding-load-on-demand). If `true`, the item will show an expand arrow. With hierarchical data, the DropDownTree renders expand icons based on `Items`, but `HasChildren` will take precedence. |
| `ParentId` | Identifies the item's parent. Required for binding to flat data. Set to `null` for root items. Do not use `ParentId` with hierarchical data. |
| `Items` | Defines the item's children. Required for [binding to hierarchical data](slug:components/treeview/data-binding/hierarchical-data). The children's type can be different from the parent item type. The DropDownTree will render an expand arrow on the parent node if its child `Items` collection is not `null`. Also see `HasChildren`. |

## DropDownTree Bindings

All [DropDownTree item features](#item-features) map to model properties. The model properties can have different names in every application. That is why, the mappings between the model and the DropDownTree depend on `DropDownTreeBinding` tags.

Each `DropDownTreeBinding` tag exposes the following parameters that refer to model property names:

| DropDownTreeBinding Parameter | Default Value |
| --- | --- |
| `IdField` | `"Id"` |
| `TextField` | `"Text"` |
| `HasChildrenField` | `"HasChildren"` |
| `ParentIdField` (flat data) | `"ParentId"` |
| `ItemsField` (hierarchical data) | `"Items"` |

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
<TelerikDropDownTree>
    <DropDownTreeBindings>
        <DropDownTreeBinding IdField="@nameof(TreeItem.UniqueID)"
                             ItemsField="@nameof(TreeItem.Children)"
                             TextField="@nameof(TreeItem.Description)" />
    </DropDownTreeBindings>
</TelerikDropDownTree>
````

>tip If some model property names match the default ones in the table above, then there is no need to configure them in a `DropDownTreeBinding`.

@[template](/_contentTemplates/common/navigation-components.md#default-fields-match-issues)

> Do not use `ParentId` with hierarhical data. This will confuse the DropDownTree that it is bound to flat data and the component may not render any items. If the model must have a `ParentId` property, set `ParentIdField` in the `DropDownTreeBinding` to a non-existent property.


### Multiple Level Bindings

The `DropDownTreeBinding` tag has a `Level` parameter that allows you to define different model properties for different DropDownTree levels.

Multiple level bindings can make the application more flexible. If you use [hierarchical data binding](slug:dropdowntree-data-binding-hierarchical-data), the children can even use a different model type from their parent.

`Level` also allows you to define a different [`ItemTemplate`](slug:dropdowntree-templates) for different levels.

To define multiple bindings, add multiple `DropDownTreeBinding` tags and set their `Level`. Levels are zero-based.

`Level` defines a binding for a specific level of depth. If no `Level` is set, the bindings will apply to any level that does not have explicit settings. DropDownTrees with unknown item depth should have one `DropDownTreeBinding` without a `Level`.

>caption How to use different model fields and binding settings for different levels

````RAZOR
The third level will use the main data bindings settings that do not have a level specified

<TelerikDropDownTree Data="@DropDownTreeData"
                     @bind-Value="@DropDownTreeValue"
                     @bind-ExpandedItems="@ExpandedItems">
    <DropDownTreeBindings>
        <DropDownTreeBinding ParentIdField="@nameof(TreeItem.Parent)" />
        <DropDownTreeBinding Level="1" ParentIdField="@nameof(TreeItem.Parent)" TextField="@nameof(TreeItem.SecondText)" />
    </DropDownTreeBindings>
</TelerikDropDownTree>

@code {
    public IEnumerable<TreeItem> DropDownTreeData { get; set; } = new List<TreeItem>();
    public IEnumerable<object> ExpandedItems { get; set; } = new List<TreeItem>();

    private object DropDownTreeValue { get; set; }

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
        ExpandedItems = DropDownTreeData.Where(x => x.HasChildren == true).ToList();
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

        DropDownTreeData = items;
    }
}
````

>note For better performance, define the same `ParentIdField` for all levels, when using flat data.


## Next Steps

Learn the three different ways to provide data to a DropDownTree:

* [Use flat data](slug:components/treeview/data-binding/flat-data) - a collection of self-referencing items with parent-child relationships
* [Use hierarchical data](slug:components/treeview/data-binding/hierarchical-data) - each item holds its children in a nested property
* [Load child items on demand](slug:components/treeview/data-binding/load-on-demand) (lazy loading) - load children when the parent node expands. Applies to both types of data.


## See Also

* [Live Demo: Multiple Level Bindings](https://demos.telerik.com/blazor-ui/treeview/bindings)
