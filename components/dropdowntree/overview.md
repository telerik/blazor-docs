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

The [Blazor DropDownTree component](https://www.telerik.com/blazor-ui/dropdowntree) combines features of the [DropDownList](slug:components/dropdownlist/overview) and the [TreeView](slug:treeview-overview). The DropDownTree component allows users to select a single value from a dropdown list of items that are displayed as a hierachy.

## Creating Blazor DropDownTree

1. Add the `TelerikDropDownTree` tag to your Razor page.
1. Populate its `Data` parameter with an `IEnumerable<T>` collection of items you want to appear in the dropdown list. The DropDownTree automatically recognizes property names like `Id`, `ParentId`, `Text` and a few others. Otherwise, [use bindings to configure custom property names](slug:dropdowntree-data-binding-overview).
1. Set the `TextField` and `ValueField` parameters to point to the corresponding property names in the model.
1. [Bind the Value parameter](slug:get-started-value-vs-data-binding#value-binding) to a variable of the same type as the type defined in the `ValueField` parameter.
1. (optional) Set the `Value` parameter to an initial default value.
1. (optional) Set the [`ExpandedItems`](slug:dropdowntree-expanded-items) parameter to a non-null `IEnumerable<object>`. Use it to expand items in the dropdown programmatically.

>caption Basic DropDownTree

````RAZOR
<TelerikDropDownTree Data="@DropDownTreeData"
                     @bind-Value="DropDownTreeValue"
                     TextField="@nameof(TreeItem.Text)"
                     ValueField="@nameof(TreeItem.Id)"
                     Width="300px" />

@code {
    private List<TreeItem> DropDownTreeData { get; set; } = new();

    private int DropDownTreeValue { get; set; } = 3;

    private IEnumerable<object> DropDownTreeExpandedItems { get; set; } = new List<TreeItem>();

    private int LastId { get; set; }

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 5; i++)
        {
            DropDownTreeValue.Add(new TreeItem()
            {
                Id = ++LastId,
                Text = $"Root Item {i}",
                HasChildren = true
            });

            int parentId = LastId;

            for (int j = 1; j <= 3; j++)
            {
                DropDownTreeValue.Add(new TreeItem()
                {
                    Id = ++LastId,
                    ParentId = parentId,
                    Text = $"Child Item {i}-{j}"
                });
            }
        }

        ExpandedItems = DropDownTreeData.Where(x => x.HasChildren == true).ToList();
    }

    public class TreeItem
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string Text { get; set; } = string.Empty;
        public bool HasChildren { get; set; }
        public ISvgIcon Icon { get; set; }
    }

}
````

<!-- <demo metaUrl="client/dropdowntree/overview/" height="380"></demo> -->

## Data Binding

@[template](/_contentTemplates/common/get-model-from-dropdowns.md#get-model-from-dropdowns)

## Filtering

## Templates

## Adaptive Rendering

@[template](/_contentTemplates/dropdowns/adaptive-rendering.md#intro)

## DropDownTree API

### Popup Settings

The DropDownList exposes settings for its dropdown (popup). To configure the options, declare a  `<DropDownTreePopupSettings>` tag inside a `<DropDownTreeSettings>` tag:

````RAZOR
````

## DropDownTree Reference and Methods

Add a reference to the component instance to use the [DropDownList's methods](slug:Telerik.Blazor.Components.TelerikDropDownList-2). Note that the [DropDownList is a generic component](slug:common-features-data-binding-overview#component-type).


@[template](/_contentTemplates/dropdowns/methods.md#methods-list)

````RAZOR
````

## Next Steps

* [Bind the DropDownTree to Data]()

## See Also

* [DropDownTree API Reference](slug:telerik.blazor.components.telerikdropdowntree-2)
* [Live Demo: DropDownTree](https://demos.telerik.com/blazor-ui/dropdowntree/overview)
