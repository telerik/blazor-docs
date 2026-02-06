---
title: Filtering
page_title: DropDownList - Filtering
description: Enable user searching (filtering) in the Telerik DropDownTree for Blazor.
slug: dropdowntree-filtering
tags: telerik,blazor,drop,down,list,dropdownlist,filter
published: True
position: 10
---

# DropDownTree Filtering

The DropDownTree can render a filter textbox in its popup. The textbox allows users to filter the available TreeView items by their `TextField` value and find the one they need faster.

To enable filtering, set the `Filterable` parameter to `true`. The filtering is case insensitive and resets when the dropdown closes.

## Filter Operator

The default filter operator is "starts with". You can choose a different operator through the `FilterOperator` parameter that takes a member of the `Telerik.Blazor.StringFilterOperator` enum.

## Performance

By default, the filtering is debounced with 150ms. To balance between performance and efficiency, set the `FilterDebounceDelay` parameter of the component to an `int` value.

## Placeholder

By default, the filter input in the popup is empty. Set the desired hint in it through the `FilterPlaceholder` parameter.

## Example

>caption DropDownTree Filtering

````RAZOR
<TelerikDropDownTree Data="@DropDownTreeData"
                     @bind-Value="@DropDownTreeValue"
                     TextField="@nameof(TreeItem.Text)"
                     ValueField="@nameof(TreeItem.Id)"
                     Filterable="true"
                     FilterOperator="@StringFilterOperator.Contains"
                     FilterDebounceDelay="100"
                     FilterPlaceholder="Type a number..."
                     Width="300px">
</TelerikDropDownTree>

@code {
    private List<TreeItem> DropDownTreeData { get; set; } = new();

    private int DropDownTreeValue { get; set; } = 3;

    private int IdCounter { get; set; } = 100;

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 15; i++)
        {
            DropDownTreeData.Add(new TreeItem()
            {
                Id = ++IdCounter,
                Text = $"Tree Item {IdCounter}",
                HasChildren = true
            });

            int parentId = IdCounter;

            for (int j = 1; j <= 5; j++)
            {
                DropDownTreeData.Add(new TreeItem()
                {
                    Id = ++IdCounter,
                    ParentId = parentId,
                    Text = $"Tree Item {IdCounter}"
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

## See Also

* [Live Demo: DropDownList Filtering](https://demos.telerik.com/blazor-ui/dropdowntree/filtering)
