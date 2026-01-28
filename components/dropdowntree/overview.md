---
title: Overview
page_title: DropDownTree Overview
description: The Blazor DropDownTree
slug: dropdowntree-overview
tags: blazor,dropdowntree,dropdown
published: True
position: 0
---

# Blazor DropDownTree Overview

The [Blazor DropDownTree component](https://www.telerik.com/blazor-ui/dropdowntree) allows users to select a single value from a dropdown list of items that are displayed as a hierachy. The DropDownTree combines features of the [DropDownList](slug:components/dropdownlist/overview) and the [TreeView](slug:treeview-overview) components. Familiarity with the API of the two originating components is highly recommended.

## Creating Blazor DropDownTree

1. Add the `TelerikDropDownTree` tag to your Razor page.
1. Populate its `Data` parameter with an `IEnumerable<T>` with the items that you want to appear in the dropdown list. The DropDownTree automatically recognizes property names like `Id`, `ParentId`, `Text`, and a few others. Otherwise, [use bindings to configure custom property names](slug:dropdowntree-data-binding-overview).
1. Set the `TextField` and `ValueField` parameters to point to the corresponding property names in the model.
1. [Bind the `Value` parameter](slug:get-started-value-vs-data-binding#value-binding) to a variable of the same type as the `ValueField` property.
1. (optional) Set the [`ExpandedItems`](slug:dropdowntree-expanded-items) parameter to a non-null `IEnumerable<object>`. Use it to expand items in the dropdown programmatically.

>caption Basic Blazor DropDownTree

````RAZOR
<TelerikDropDownTree Data="@DropDownTreeData"
                     @bind-Value="@DropDownTreeValue"
                     @bind-ExpandedItems="@DropDownTreeExpandedItems"
                     TextField="@nameof(TreeItem.Text)"
                     ValueField="@nameof(TreeItem.Id)"
                     Width="300px">
</TelerikDropDownTree>

@code {
    private List<TreeItem> DropDownTreeData { get; set; } = new();

    private int DropDownTreeValue { get; set; } = 3;

    private IEnumerable<object> DropDownTreeExpandedItems { get; set; } = new List<TreeItem>();

    private int LastId { get; set; }

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 5; i++)
        {
            DropDownTreeData.Add(new TreeItem()
            {
                Id = ++LastId,
                Text = $"Root Item {i}",
                HasChildren = true
            });

            int parentId = LastId;

            for (int j = 1; j <= 3; j++)
            {
                DropDownTreeData.Add(new TreeItem()
                {
                    Id = ++LastId,
                    ParentId = parentId,
                    Text = $"Child Item {i}-{j}"
                });
            }
        }

        DropDownTreeExpandedItems = DropDownTreeData.Where(x => x.ParentId is null).ToList();
    }

    public class TreeItem
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public bool HasChildren { get; set; }
        public string Text { get; set; } = string.Empty;
    }
}
````

<!-- <demo metaUrl="client/dropdowntree/overview/" height="380"></demo> -->

## Data Binding

The Blazor DropDownTree requires a data source to populate its dropdown with items. Set the `Data` parameter to a generic `IEnumerable<T>`. The model class can have [properties with predefined names or custom names](slug:dropdowntree-databinding-overview#item-features). The data collection can have [flat](slug:dropdowntree-data-binding-flat-data) or [hierarchical](slug:dropdowntree-data-binding-hierarchical-data) structure.

## Filtering

The Blazor DropDownTree can reduce the number of visible items in the dropdown as the user types. To configure [DropDownTree filtering], use the `Filterable` and `FilterOperator` parameters. Additionally, you can customize the filter operator and set the minimum required number of typed characters.

## Templates

The [DropDownTree provides templates](slug:dropdowntree-templates) that allow you to customize the rendering and appearance of the component value, dropdown header, dropdown footer, TreeView items, and the popup content when there is no data.

## Adaptive Rendering

@[template](/_contentTemplates/dropdowns/adaptive-rendering.md#intro)

## DropDownTree API

Get familiar with all DropDownTree parameters, methods, events, and nested tags in the [DropDownTree API Reference](slug:Telerik.Blazor.Components.TelerikDropDownTree-2).

### Popup Settings

The TelerikDropDownTree exposes [settings for its dropdown (popup)](slug:Telerik.Blazor.Components.DropDownTreePopupSettings). To configure these options, declare a `<DropDownTreePopupSettings>` tag inside `<DropDownTreeSettings>`:

>caption Using DropDownTree popup settings

````RAZOR.skip-repl
<TelerikDropDownTree>
    <DropDownTreeSettings>
        <DropDownTreePopupSettings Class="dropdowntree-popup-class"
                                   Height="50vh"
                                   MaxHeight="400px" />
    </DropDownTreeSettings>
</TelerikDropDownTree>
````

## DropDownTree Reference and Methods

Add a reference to the component instance to use the [DropDownTree's methods](slug:Telerik.Blazor.Components.TelerikDropDownTree-2). Note that the [DropDownTree is a generic component](slug:common-features-data-binding-overview#component-type).

@[template](/_contentTemplates/dropdowns/methods.md#methods-list)

````RAZOR
<TelerikDropDownTree @ref="@DropDownTreeRef"
                     Data="@DropDownTreeData"
                     @bind-Value="@DropDownTreeValue"
                     TextField="@nameof(TreeItem.Text)"
                     ValueField="@nameof(TreeItem.Id)"
                     Width="300px">
</TelerikDropDownTree>

<TelerikButton OnClick="@OpenDropDownTree">Open DropDownTree</TelerikButton>

@code {
    private TelerikDropDownTree<TreeItem, int>? DropDownTreeRef;

    private List<TreeItem> DropDownTreeData { get; set; } = new();

    private int DropDownTreeValue { get; set; } = 3;

    private int LastId { get; set; }

    private void OpenDropDownTree()
    {
        DropDownTreeRef?.Open();
    }

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 5; i++)
        {
            DropDownTreeData.Add(new TreeItem()
            {
                Id = ++LastId,
                Text = $"Root Item {i}",
                HasChildren = true
            });

            int parentId = LastId;

            for (int j = 1; j <= 3; j++)
            {
                DropDownTreeData.Add(new TreeItem()
                {
                    Id = ++LastId,
                    ParentId = parentId,
                    Text = $"Child Item {i}-{j}"
                });
            }
        }
    }

    public class TreeItem
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public bool HasChildren { get; set; }
        public string Text { get; set; } = string.Empty;
    }
}
````

## Next Steps

* [Bind the DropDownTree to Data](slug:dropdowntree-databinding-overview)

## See Also

* [DropDownTree API Reference](slug:telerik.blazor.components.telerikdropdowntree-2)
* [Live Demo: DropDownTree](https://demos.telerik.com/blazor-ui/dropdowntree/overview)
