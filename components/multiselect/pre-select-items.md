---
title: Item Selection
page_title: MultiSelect - Item Selection
description: Learn how to pre-select items for the user or enable Select All with practical examples.
slug: multiselect-item-selection
tags: telerik,blazor,multiselect,select
published: True
position: 8
components: ["multiselect"]
---

# MultiSelect Item Selection

This article discusses how to pre-select existing MultiSelect items and how to enable users to select all items with a single action.

## Pre-Select Items

On page load, the MultiSelect will render the selected items in the order in which these items appear in the `Data` collection. To preserve the order of the initially selected items, [sort the data to match the selected items order](slug:multiselect-kb-selected-items-order).

>caption Pre-select MultiSelect items for the user

````RAZOR
Select IDs
<TelerikNumericTextBox @bind-Value="@Id1" Min="1" Max="10" Width="70px" />
and
<TelerikNumericTextBox @bind-Value="@Id2" Min="1" Max="10" Width="70px" />

<TelerikButton OnClick="@SelectItems">Apply</TelerikButton>
<TelerikButton OnClick="@ClearSelection">Clear Selection</TelerikButton>

<br />

<TelerikMultiSelect Data="@Products"
                    Value="@SelectedProductIDs"
                    ValueField="@nameof(Product.Id)"
                    TextField="@nameof(Product.Name)"
                    ShowClearButton="true"
                    Placeholder="Select Products">
</TelerikMultiSelect>

@if (SelectedProductIDs.Count > 0)
{
    <p>Selected Product IDs:</p>
    <ul>
        @foreach (var id in SelectedProductIDs)
        {
            <li>@id</li>
        }
    </ul>
}

@code {
    private List<Product> Products { get; set; }
    private List<int> SelectedProductIDs = new() { 2 };

    private int Id1 { get; set; } = 3;
    private int Id2 { get; set; } = 5;

    private void SelectItems()
    {
        // reset object reference to trigger re-render
        SelectedProductIDs = new List<int>() { Id1, Id2 };
    }

    private void ClearSelection()
    {
        SelectedProductIDs = new List<int>();
    }

    protected override void OnInitialized()
    {
        Products = new List<Product>();

        for (int i = 1; i <= 10; i++)
        {
            Products.Add(new Product()
            {
                Id = i,
                Name = "Product " + i
            });
        }

        base.OnInitialized();
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
````

## Select All Items

Telerik UI for Blazor 14.1.0 and newer versions allow users to select or deselect all rendered items through a ToggleButton in the dropdown. To enable the feature, set the `EnableSelectAll` parameter to `true`:

````RAZOR.skip-repl
<TelerikMultiSelect EnableSelectAll="true" />
````

In this case, the MultiSelect appearance and behavior also depend on the [`TagMode`](slug:multiselect-tag-mode) and [`MaxAllowedTags`](slug:multiselect-tag-mode#summarized-tags-based-on-the-number-of-selections)  settings.

Clicking the **Select All** toggle button fires the [`OnSelectAll` event](slug:multiselect-events#onselectall).

The Select All functionality applies only to the currently rendered items, which means:

* The state of the **Select All** toggle button depends on whether all currently rendered items are selected.
* If [MultiSelect filtering](slug:multiselect-filter) is active, users select or deselect only the filtered items. The selection state of all other items remains unchanged.
* If [MultiSelect virtual scrolling](slug:multiselect-virtualization) is enabled, users select or deselect the currently rendered chunk of items. Their number depends on the `PageSize`. Scrolling does not affect the selected items. To select all items in the data source in virtual scenarios, use the [`OnSelectAll` event](slug:multiselect-events#onselectall).

>caption Using MultiSelect SelectAll parameter and OnSelectAll event

````RAZOR
<div style="display: flex; align-items: flex-start; gap: 2em;">
    <TelerikMultiSelect Data="@ListItems"
                    @bind-Value="@MultiSelectValues"
                    AutoClose="false"
                    EnableSelectAll="true"
                    Filterable="true"
                    FilterOperator="@StringFilterOperator.Contains"
                    MaxAllowedTags="@MultiSelectMaxAllowedTags"
                    ShowArrowButton="true"
                    TagMode="@MultiSelectTagMode" />

    <div style="flex: 0 0 180px">
        <p>
            <code>TagMode</code>:
            <TelerikRadioGroup Data="@MultiSelectTagModes"
                            @bind-Value="@MultiSelectTagMode"
                            Layout="@RadioGroupLayout.Horizontal" />

            <label>
                <code>MaxAllowedTags</code>
                <TelerikNumericTextBox @bind-Value="@MultiSelectMaxAllowedTags"
                                    Min="1"
                                    Max="@ListItems.Count" />
            </label>
        </p>

        <p><code>Value</code> count: @MultiSelectValues.Count</p>

        <p>
            Last <code>OnSelectAll</code> event: @OnSelectAllLog
        </p>
    </div>
</div>

@code {
    private List<ListItem> ListItems { get; set; } = new();

    private List<int> MultiSelectValues { get; set; } = new() { 1, 3 };

    private string OnSelectAllLog { get; set; } = string.Empty;

    private readonly MultiSelectTagMode[] MultiSelectTagModes = new MultiSelectTagMode[]
    {
        MultiSelectTagMode.Single,
        MultiSelectTagMode.Multiple
    };

    private MultiSelectTagMode MultiSelectTagMode { get; set; } = MultiSelectTagMode.Multiple;
    private int MultiSelectMaxAllowedTags { get; set; } = 3;

    protected override void OnInitialized()
    {
        ListItems = new List<ListItem>();

        for (int i = 1; i <= 32; i++)
        {
            ListItems.Add(new ListItem()
            {
                Value = i,
                Text = $"{i} {GetRandomChars(3)}"
            });
        }

        base.OnInitialized();
    }

    private string GetRandomChars(int? length = 1)
    {
        string result = string.Empty;

        for (int i = 0; i < length; i++)
        {
            result += (char)Random.Shared.Next(65, 91);
        }

        return result;
    }

    public class ListItem
    {
        public int Value { get; set; }
        public string Text { get; set; } = string.Empty;
    }
}
````

## See Also

* [MultiSelect Tag Mode](slug:multiselect-tag-mode)
* [MultiSelect CheckBoxes](slug:multiselect-kb-checkbox-in-dropdown)
