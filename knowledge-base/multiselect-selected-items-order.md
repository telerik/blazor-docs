---
title: MultiSelect Reorders and Sorts Selected Items
description: How to disable automatic sorting of Blazor MultiSelect selected items? How to override any reordering of selected MultiSelect values?
type: troubleshooting
page_title: Blazor MultiSelect Reorders and Sorts Selected Items
slug: multiselect-kb-selected-items-order
position: 
tags: multiselect
ticketid: 1540543, 1557872
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>MultiSelect for Blazor</td>
        </tr>
    </tbody>
</table>


## Description

The MultiSelect selected items order changes. The component sorts the list of numbers that represent the selected values. This causes the selected items (tags, chips) to show up in the wrong order. How to override this behavior?

The MultiSelect reorders selected items alphabetically. The items in the initial `Value` collection are in the correct order, but the MultiSelect sorts them. Is there any way to preserve selection order and disable automatic self sorting?


## Possible Cause

The selected items' order in the MultiSelect `Value` matches the order of these items in the `Data`. This applies to initial page load and when the MultiSelect `Value` changes programmatically.

The MultiSelect creates a collection of its selected items internally, based on `Value` and `Data`. Then, the component uses this internal collection for rendering. That's why the rendered selected items always match the order of the data items. This behavior is related to performance.


## Solution

Sort the MultiSelect `Data`, according to the selected items' order in `Value`. For example, move the selected items to the beginning of the `Data` collection.

Optionally, use the [MultiSelect `OnChange` or `ValueChanged` events](slug://multiselect-events) to reorder the MultiSelect `Data` every time when users select or deselect items. [`Rebind()`](slug://common-features-data-binding-overview#refresh-data) the MultiSelect afterwards to re-render the dropdown.

>caption Reorder MultiSelect Data to match the selected items order in Value

````RAZOR
@* Match the Data order to the Value order *@

<TelerikMultiSelect @ref="@MultiSelectRef"
                    Data="@Products"
                    Value="@SelectedProductIDs"
                    ValueChanged="@( (List<int> newValues) => OnMultiValueChanged(newValues) )"
                    ValueField="@nameof(Product.Id)"
                    TextField="@nameof(Product.Name)"
                    Placeholder="Select Products"
                    AutoClose="false"
                    Width="600px">
</TelerikMultiSelect>

@code {
    private TelerikMultiSelect<Product, int> MultiSelectRef { get; set; }

    private List<Product> Products { get; set; }

    private List<int> SelectedProductIDs = new() { 3, 7, 1 };

    private async Task OnMultiValueChanged(List<int> newValues)
    {
        SelectedProductIDs = newValues;

        // Optionally, reorder the dropdown items after selection change and rebind.
        ReorderItems(Products, newValues);
        MultiSelectRef.Rebind();
    }

    private void ReorderItems(List<Product> products, List<int> selectedIds)
    {
        var selectedProducts = new List<Product>();

        // Obtain the selected Products in the correct order.
        foreach (var id in SelectedProductIDs)
        {
            selectedProducts.Add(Products.Find(x => x.Id == id));
        }

        Products = Products.Except(selectedProducts).ToList();
        // Sort the non-selected Products, otherwise
        // the unselected items will remain at the top of the dropdown.
        Products.Sort(CompareProducts);
        Products.InsertRange(0, selectedProducts);
    }

    private int CompareProducts(Product x, Product y)
    {
        return x.Id - y.Id;
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

        ReorderItems(Products, SelectedProductIDs);

        base.OnInitialized();
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
````

## See Also

* [Data binding a MultiSelect](slug://multiselect-databind)
* [Pre-select MultiSelect items](slug://multiselect-pre-select-items)
