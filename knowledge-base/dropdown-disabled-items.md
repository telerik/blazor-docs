---
title: Disable Dropdown Item for Selection
description: Learn how to use disabled items in a ComboBox or DropDownList that are visible, but cannot be selected by the user.
type: how-to
page_title: How to Disable ComboBox or DropDownList Item for Selection
slug: dropdown-kb-disabled-items
tags: telerik, blazor, combobox, dropdownlist, multiselect
ticketid: 1474264, 1593235, 1683944, 1695111
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>
                ComboBox for Blazor, <br />
                DropDownList for Blazor, <br />
                MultiSelect for Blazor
            </td>
        </tr>
    </tbody>
</table>

## Description

This KB also answers the following questions:

* How to disable certain items in the ComboBox dropdown (popup)?
* How to denote if a DropDownList or MultiSelect item is selectable or disabled?
* How to flag data items in the Blazor ComboBox that are disabled and no longer available and selectable?

## Solution

The following algorithm applies to the Telerik Blazor ComboBox, DropDownList, and MultiSelect. Review the examples below for some minor implementation differences.

1. Use the component's `OnItemRender` event to apply a `k-disabled` CSS class to non-selectable items. This prevents selection disabled items with a click or tap.
1. Use the component's `ValueChanged` event to track the user selection and override it. This applies especially to ComboBox and DropDownList keyboard navigation, where you should select the next or previous enabled item in the list.

### ComboBox

Reset the ComboBox value to default and then `Rebind()` the component after overriding the user selection.

>caption Use disabled unselectable items in a ComboBox

````RAZOR
<TelerikComboBox @ref="@ComboBoxRef"
                 Data="@Products"
                 Value="@ComboBoxValue"
                 ValueChanged="@( (int? newValue) => ComboBoxValueChanged(newValue) )"
                 TextField="@nameof(Product.Name)"
                 ValueField="@nameof(Product.Id)"
                 Placeholder="Select Product..."
                 OnItemRender="@OnComboBoxItemRender"
                 Width="200px">
</TelerikComboBox>

@code {
    private TelerikComboBox<Product, int?>? ComboBoxRef { get; set; }

    private List<Product> Products { get; set; } = new();

    private int? ComboBoxValue { get; set; }

    private void OnComboBoxItemRender(ComboBoxItemRenderEventArgs<Product> args)
    {
        if (!args.Item.Enabled)
        {
            args.Class = "k-disabled";
        }
    }

    private async Task ComboBoxValueChanged(int? newValue)
    {
        var newProduct = Products.FirstOrDefault(x => x.Id == newValue);

        // Select only enabled items or null
        if (newProduct?.Enabled == true || !newValue.HasValue)
        {
            ComboBoxValue = newValue;
        }
        else
        {
            // Skip disabled items during keyboard navigation
            // For simplicity, this logic does not handle adjacent disabled items
            int oldProductIndex = Products.FindIndex(x => x.Id == ComboBoxValue);
            int newProductIndex = Products.FindIndex(x => x.Id == newValue);

            ComboBoxValue = default;
            await Task.Delay(1);

            if (newProductIndex > oldProductIndex && Products.Count > newProductIndex + 1)
            {
                ComboBoxValue = Products[++newProductIndex].Id;
            }
            else if (newProductIndex > 0)
            {
                ComboBoxValue = Products[--newProductIndex].Id;
            }
            else
            {
                ComboBoxValue = default;
            }

            ComboBoxRef?.Rebind();
        }
    }

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 10; i++)
        {
            var enabled = i % 3 != 0;

            Products.Add(new Product()
            {
                Id = i,
                Name = $"{(enabled ? "" : "Disabled ")}Product {i}",
                Enabled = enabled
            });
        }

        base.OnInitialized();
    }

    public class Product
    {
        public int? Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public bool Enabled { get; set; } = true;
    }
}
````

### DropDownList

>caption Use disabled unselectable items in a DropDownList

````RAZOR
<TelerikDropDownList Data="@Products"
                     Value="@DropDownListValue"
                     ValueChanged="@( (int? newValue) => DropDownListValueChanged(newValue) )"
                     TextField="@nameof(Product.Name)"
                     ValueField="@nameof(Product.Id)"
                     DefaultText="Select Product..."
                     OnItemRender="@OnDropDownListItemRender"
                     Width="200px">
</TelerikDropDownList>

@code {
    private List<Product> Products { get; set; } = new();

    private int? DropDownListValue { get; set; }

    private void OnDropDownListItemRender(DropDownListItemRenderEventArgs<Product> args)
    {
        // args.Item is null for the DefaultText item
        if (args.Item != null && !args.Item.Enabled)
        {
            args.Class = "k-disabled";
        }
    }

    private void DropDownListValueChanged(int? newValue)
    {
        var newProduct = Products.FirstOrDefault(x => x.Id == newValue);

        // Select only enabled items or DefaultText
        if (newProduct?.Enabled == true || !newValue.HasValue)
        {
            DropDownListValue = newValue;
        }
        else
        {
            // Skip disabled items during keyboard navigation
            // For simplicity, this logic does not handle adjacent disabled items
            int oldProductIndex = Products.FindIndex(x => x.Id == DropDownListValue);
            int newProductIndex = Products.FindIndex(x => x.Id == newValue);

            if (newProductIndex > oldProductIndex && Products.Count > newProductIndex + 1)
            {
                DropDownListValue = Products[++newProductIndex].Id;
            }
            else if (newProductIndex > 0)
            {
                DropDownListValue = Products[--newProductIndex].Id;
            }
            else
            {
                DropDownListValue = default;
            }
        }
    }

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 10; i++)
        {
            var enabled = i % 3 != 0;

            Products.Add(new Product()
            {
                Id = i,
                Name = $"{(enabled ? "" : "Disabled ")}Product {i}",
                Enabled = enabled
            });
        }

        base.OnInitialized();
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public bool Enabled { get; set; } = true;
    }
}
````

### MultiSelect

````RAZOR
<TelerikMultiSelect Data="@Products"
                    Value="@MultiSelectValues"
                    ValueChanged="@( (List<int> newValues) => MultiSelectValueChanged(newValues) )"
                    TextField="@nameof(Product.Name)"
                    ValueField="@nameof(Product.Id)"
                    AutoClose="false"
                    Placeholder="Select Products..."
                    ShowArrowButton="true"
                    OnItemRender="@OnMultiSelectItemRender"
                    Width="600px" />

@code {
    private List<Product> Products { get; set; } = new();
    private List<int> EnabledProductIds { get; set; } = new();

    private int? SelectedValue { get; set; }

    private List<int> MultiSelectValues { get; set; } = new();

    private void OnMultiSelectItemRender(MultiSelectItemRenderEventArgs<Product> args)
    {
        if (!args.Item.Enabled)
        {
            args.Class = "k-disabled";
        }
    }

    private void MultiSelectValueChanged(List<int> newValues)
    {
        MultiSelectValues = newValues.Where(x => EnabledProductIds.Contains(x)).ToList();
    }

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 10; i++)
        {
            var enabled = i % 3 != 0;

            Products.Add(new Product()
            {
                Id = i,
                Name = $"{(enabled ? "" : "Disabled ")}Product {i}",
                Enabled = enabled
            });
        }

        EnabledProductIds = Products.Where(x => x.Enabled).Select(x => x.Id).ToList();

        base.OnInitialized();
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public bool Enabled { get; set; } = true;
    }
}
````

## See Also

* [ComboBox Events](slug:components/combobox/events)
* [DropDownList Events](slug:components/dropdownlist/events)
* [MultiColumnComboBox Events](slug:multicolumncombobox-events)
* [MultiSelect Events](slug:multiselect-events)
