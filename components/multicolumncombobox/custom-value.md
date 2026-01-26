---
title: Custom Value
page_title: MultiColumnComboBox - Custom Value
description: Custom values and user input in the MultiColumnComboBox for Blazor.
slug: multicolumncombobox-custom-value
tags: telerik,blazor,multicolumncombobox,combobox,custom,value,input
published: True
position: 20
components: ["multicolumncombobox"]
---
# MultiColumnComboBox Custom Values

The MultiColumnComboBox component allows the user to type in their own value that is not a part of the predefined set of options that the developer provided.

The text entered by the user can still go into the field the combo box is bound to through two-way binding.

To enable custom user input set the `AllowCustom` parameter to `true`.

> When custom values are enabled, the `TextField`, `ValueField` and the `Value` must be of type `string`. Otherwise an exception will be thrown. Strings are required because the user input can take any form and may not be parsable to other types (such as numbers or GUID).

When custom input is allowed, the [ValueChanged event](slug:multicolumncombobox-events) fires on every keystroke, and not when an item is selected, because the MultiColumnComboBox component acts as a text input.

When custom values are typed in, there may be no selected item. See [Value and Selected Item](slug:multicolumncombobox-data-binding#value-and-selected-item) for details on how item selection and `Value` work together.

>caption Allow custom user input in the combo box

````RAZOR
Selected value: @selectedValue
<br />

<TelerikMultiColumnComboBox Data="@myComboData" TextField="MyTextField" ValueField="MyValueField" @bind-Value="selectedValue"
                 AllowCustom="true"
                 Placeholder="select an item or type your own">
                 <MultiColumnComboBoxColumns>
                     <MultiColumnComboBoxColumn Field="@nameof(MyDdlModel.MyValueField)" Title="Unique Identifier"></MultiColumnComboBoxColumn>
                     <MultiColumnComboBoxColumn Field="@nameof(MyDdlModel.MyTextField)" Title="Human-readable text"></MultiColumnComboBoxColumn>
                 </MultiColumnComboBoxColumns>
</TelerikMultiColumnComboBox>

@code {
    IEnumerable<MyDdlModel> myComboData = Enumerable.Range(1, 20).Select(x => new MyDdlModel { MyTextField = "item " + x, MyValueField = x.ToString() });

    string selectedValue { get; set; } = "lorem ipsum";

    public class MyDdlModel
    {
        public string MyValueField { get; set; } // the ValueField must be a string
        public string MyTextField { get; set; }
    }
}
````

>caption How to add custom user values into the data source so they are available as items immediately

````RAZOR
@*Type a custom value, press enter or click outside. Then, open the combo again and you will see the new custom item in the list*@

@ComboValue
<br />
<TelerikMultiColumnComboBox Data="@Data" @bind-Value="@ComboValue"
                    OnChange="@((object value) => AddItem(value))"
                    TextField="ProductName" ValueField="ProductName"
                    AllowCustom="true" Filterable="true" Placeholder="SELECT A PRODUCT">
                    <MultiColumnComboBoxColumns>
                        <MultiColumnComboBoxColumn Field="@nameof(Product.ProductId)"></MultiColumnComboBoxColumn>
                        <MultiColumnComboBoxColumn Field="@nameof(Product.ProductName)"></MultiColumnComboBoxColumn>
                    </MultiColumnComboBoxColumns>
</TelerikMultiColumnComboBox>

@code {
    public List<Product> Data { get; set; }
    public string ComboValue { get; set; } = "Product 3";

    protected override void OnInitialized()
    {
        List<Product> products = new List<Product>();
        for (int i = 0; i < 20; i++)
        {
            products.Add(new Product()
            {
                ProductId = i,
                ProductName = $"Product {i}"
            });
        }

        Data = products;

        base.OnInitialized();
    }

    protected void AddItem(object value)
    {
        if (Data.FirstOrDefault(item => item.ProductName == value.ToString()) == null)
        {
            Data.Insert(0, new Product()
            {
                ProductId = Data.Count + 1,
                ProductName = value.ToString()
            });
        }
    }

    public class Product
    {
        // only the Name field is used in the combo, so the Id can be a number
        public int ProductId { get; set; } 
        public string ProductName { get; set; }
    }
}
````

## Limitations

* `AllowCustom` is not compatible with [Adaptive rendering](slug:adaptive-rendering).

## See Also

* [Live Demo: MultiColumnComboBox Custom Values](https://demos.telerik.com/blazor-ui/multicolumncombobox/custom-values)
