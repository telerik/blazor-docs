---
title: Overview
page_title: DropDownTree Data Binding Overview
description: Learn the fundamentals of Telerik Blazor DropDownTree data binding and model class properties.
slug: dropdowntree-data-binding-overview
tags: blazor,dropdowntree,dropdown
published: True
position: 0
---

# DropDownTree Data Binding

This article explains how to bind the DropDownTree to data and how to relate component features to properties of the model class. This is a prerequisite for successful data binding of the DropDownTree:

* What are the [default property names](#default-property-names) that the DropDownTree expects.
* How to match model properties to [DropDownTree item text and component `Value`](#text-and-value-fields).
* How to match model properties to [DropDownTree parent-child relation-ships](#treeview-bindings).

## Default Property Names

The DropDownTree have features that map to properties in the model. The following class uses property names that will [work automatically, with no additional DropDownTree configuration](slug:dropdowntree-overview#creating-blazor-dropdowntree):

````C#.skip-repl
public class TreeItem
{
    public int Id { get; set; }

    // Flat data only
    public int? ParentId { get; set; }
    // Hierarchical data only
    public IEnumerable<TreeItem> Items { get; set; }

    public bool HasChildren { get; set; }

    public string Text { get; set; }
    public int Value { get; set; }
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
| `ParentId` | Identifies the item's parent. Required for [binding to flat data](slug:dropdowntree-data-binding-flat-data). Set to `null` for root items. Do not use `ParentId` with hierarchical data. |
| `Items` | Defines the item's children. Required for [binding to hierarchical data](slug:components/treeview/data-binding/hierarchical-data). The children's type can be different from the parent item type. The DropDownTree will render an expand arrow on the parent node if its child `Items` collection is not `null`. Also see `HasChildren`. |
| `HasChildren` | Determines whether the item has children, no matter if they are loaded or not. Required for binding to flat data and for [loading on demand](slug:dropdowntree-data-binding-load-on-demand). If `true`, the item will show an expand arrow. With hierarchical data, the DropDownTree renders expand icons based on `Items`, but `HasChildren` takes precedence. |
| `Text` | Sets the TreeView item content and the visible component value as plain text. For rich content and nested components, use an [item template](slug:dropdowntree-templates#itemtemplate) or a [value template](slug:dropdowntree-templates#valuetemplate). The DropDownTree also uses the `Text` contents for [filtering](slug:dropdowntree-filtering). |
| `Value` | Sets the underlying component value when the user selects the respective data item. |

## Text and Value Fields

Use the `TextField` and `ValueField` parameters of the DropDownTree component to define which model properties hold the data item text and value. You can skip setting these parameters if your model class uses the [default expected property names](#default-property-names):

| DropDownTree Parameter | Default Value |
| --- | --- |
| `TextField` | `"Text"` |
| `ValueField` | `"Value"` |

## DropDownTree Bindings

The parent-child relationships between the DropDownTree items depend on `DropDownTreeBinding` tags. Each tag exposes the following parameters that refer to model property names:

| DropDownTreeBinding Parameter | Default Value |
| --- | --- |
| `IdField` | `"Id"` |
| `ParentIdField` (flat data) | `"ParentId"` |
| `ItemsField` (hierarchical data) | `"Items"` |
| `HasChildrenField` | `"HasChildren"` |

It is possible to [configure different bindings for different item levels](#multiple-level-bindings) with the `Level` parameter of `DropDownTreeBinding`. Usually one binding configuration is enough. For example, the following model class requires the binding configuration below:

>caption DropDownTree Model Class

````C#.skip-repl
public class TreeItem
{
    public int UniqueID { get; set; }
    public string Description { get; set; }
    public bool HasChildren { get; set; }
    public IEnumerable<TreeItem> Children { get; set; }
}
````

>caption DropDownTreeBinding Configuration

````RAZOR.skip-repl
<TelerikDropDownTree TextField="@nameof(TreeItem.Description)">
    <DropDownTreeBindings>
        <DropDownTreeBinding IdField="@nameof(TreeItem.UniqueID)"
                             ItemsField="@nameof(TreeItem.Children)" />
    </DropDownTreeBindings>
</TelerikDropDownTree>
````

> Do not use `ParentId` with hierarhical data. This will confuse the DropDownTree that it is bound to flat data and the component may not render any items. If the model must have a `ParentId` property, set `ParentIdField` in the `DropDownTreeBinding` to a non-existent property.

## Multiple Level Bindings

The `DropDownTreeBinding` tag has a `Level` parameter that allows you to define different model properties for different DropDownTree levels.

Multiple level bindings can make the application more flexible. If you use [hierarchical data binding](slug:dropdowntree-data-binding-hierarchical-data), the items at different levels can even use different model types.

`Level` also allows you to define a different [`ItemTemplate`](slug:dropdowntree-templates#itemtemplate) for different levels.

To define multiple bindings, add several `DropDownTreeBinding` tags and set their zero-based `Level`. If no `Level` is set to a specific binding, the settings apply to any level that does not have explicit settings. DropDownTrees with unknown item depth should have one `DropDownTreeBinding` without a `Level`.

For better performance, define the same `ParentIdField` for all levels when using flat data.

>caption Using different property names and bindings for different levels

````C#
<TelerikDropDownTree Data="@DropDownTreeData"
                     @bind-Value="@DropDownTreeValue"
                     @bind-ExpandedItems="@DropDownTreeExpandedItems"
                     Width="300px">
    <DropDownTreeBindings>
        <DropDownTreeBinding ParentIdField="@nameof(TreeItem.Parent)" />
        <DropDownTreeBinding Level="1"
                             IdField="@nameof(TreeItem.ChildId)"
                             ParentIdField="@nameof(TreeItem.Parent)" />
    </DropDownTreeBindings>
</TelerikDropDownTree>

@code {
    private List<TreeItem> DropDownTreeData { get; set; } = new();

    private int DropDownTreeValue { get; set; } = 3;

    private IEnumerable<object> DropDownTreeExpandedItems { get; set; } = new List<TreeItem>();

    private int IdCounter { get; set; }

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 3; i++)
        {
            DropDownTreeData.Add(new TreeItem()
            {
                Id = ++IdCounter,
                Text = $"Root Item {i}",
                Value = IdCounter,
                HasChildren = true
            });

            int parentId = IdCounter;

            for (int j = 1; j <= 2; j++)
            {
                DropDownTreeData.Add(new TreeItem()
                {
                    ChildId = ++IdCounter,
                    Parent = parentId,
                    Value = IdCounter,
                    Text = $"Child Item {i}-{j}",
                    HasChildren = true
                });

                int level1ParentId = IdCounter;

                for (int k = 1; k <= 2; k++)
                {
                    DropDownTreeData.Add(new TreeItem()
                    {
                        Id = ++IdCounter,
                        Parent = level1ParentId,
                        Value = IdCounter,
                        Text = $"Grandchild Item {i}-{j}-{k}"
                    });
                }
            }
        }

        DropDownTreeExpandedItems = DropDownTreeData.Where(x => x.Id == 1 || x.ChildId == 2);
    }

    public class TreeItem
    {
        public int Id { get; set; }
        public int? ChildId { get; set; }
        public int? Parent { get; set; }
        public bool HasChildren { get; set; }
        public string Text { get; set; } = string.Empty;
        public int Value { get; set; }
    }
}
````

## Next Steps

* [Bind the DropDownTree to flat data](slug:dropdowntree-data-binding-flat-data)
* [Bind the DropDownTree to hierarchical data](slug:dropdowntree-data-binding-hierarchical-data)
* [Lazy load DropDownTree items on demand](slug:dropdowntree-data-binding-load-on-demand)

## See Also

* [Live Demo: DropDownTree](https://demos.telerik.com/blazor-ui/dropdowntree/overview)
