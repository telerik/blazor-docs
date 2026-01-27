---
title: Pre-Select Items
page_title: MultiSelect - Pre-Select Items
description: Learn how to pre-select items for the user by exploring a practical example.
slug: multiselect-pre-select-items
tags: telerik,blazor,multiselect,pre-select
published: True
position: 8
components: ["multiselect"]
---
# Pre-Select MultiSelect Items

This article provides an example that shows how to pre-select MultiSelect items for the user. The approach allows you to pre-select a single item or a set of items if they exist in the data source.

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
