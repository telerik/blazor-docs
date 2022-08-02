---
title: Templates
page_title: MultiColumnComboBox - Templates
description: Templates in the ComboBox for Blazor.
slug: multicolumncombobox-templates
tags: telerik,blazor,combo,combobox,templates
published: True
position: 25
---

# MultiColumnComboBox Templates

The MultiColumnComboBox component allows you to change what is rendered in its header and footer through templates.

The available templates are:

* [`Header`](#header)
* [`Footer`](#footer)
* [`Row`](#row)


## Header

The header is content that you can place above the list of items inside the dropdown. It is always visible when the MultiColumnComboBox is expanded. By default it is empty.


## Footer

The footer is content that you can place below the list of items inside the dropdownlist element. It is always visible when the dropdown is expanded. By default it is empty.


## Row

The `RowTemplate` allows you to control the rendering of each whole row in the dropdown. Use a row template if separate [column templates]({%slug multicolumncombobox-columns-templates%}) do not allow enough customization.

You can access the `context` object and cast it to the bound model to employ some custom business logic. The `contenxt` represents the current data item for the row.

> The MultiColumnComboBox items render as a list (`<ul>`), not a `<table>`. Using table cells inside the row template is possible only if you render a complete table for each item. To mimic the default component appearance, use two sibling containers inside the `<RowTemplate>` with a `k-table-td` CSS class.


## Example

>caption Using MultiColumnComboBox Templates

````CSHTML
<TelerikMultiColumnComboBox Data="@MultiComboData"
                            @bind-Value="@SelectedProduct"
                            ValueField="@nameof(Product.Id)"
                            TextField="@nameof(Product.Name)"
                            Width="300px">
    <HeaderTemplate>
        <div style="text-align: center; padding: .3em;"><strong>Custom Header</strong></div>
    </HeaderTemplate>
    <FooterTemplate>
        <div style="text-align: center; padding: .3em;"><strong>Custom Footer</strong></div>
    </FooterTemplate>
    <RowTemplate Context="row">
        <div class="k-table-td">
            <em>@row.Name</em>
        </div>
        <div class="k-table-td" style="text-align: right;">
            <strong>@row.Quantity</strong>
        </div>
    </RowTemplate>
    <MultiColumnComboBoxColumns>
        <MultiColumnComboBoxColumn Field="@nameof(Product.Name)" Title="Product Name"></MultiColumnComboBoxColumn>
        <MultiColumnComboBoxColumn Field="@nameof(Product.Quantity)" Title="In Stock"></MultiColumnComboBoxColumn>
    </MultiColumnComboBoxColumns>
</TelerikMultiColumnComboBox>

@code {
    private List<Product> MultiComboData { get; set; }

    private int SelectedProduct { get; set; }

    protected override void OnInitialized()
    {
        var rnd = new Random();

        MultiComboData = Enumerable.Range(1, 30).Select(x => new Product()
        {
            Id = x,
            Name = $"Product {x}",
            Quantity = rnd.Next(0, 30)
        }).ToList();

        base.OnInitialized();
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Quantity { get; set; }
    }
}
````

## See Also

* [Live Demo: MultiColumnComboBox Templates](https://demos.telerik.com/blazor-ui/multicolumncombobox/templates)
