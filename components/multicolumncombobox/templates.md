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

>caption In this article:

* [Row Template](#row-template)
* [Header Template](#header-template)
* [Footer Template](#footer-template)
* [No Data Template](#no-data-template)
* [Example](#example)

## Row Template

The `RowTemplate` allows you to control the rendering of each whole row in the dropdown. Use a row template if separate [column templates](slug:multicolumncombobox-columns-templates) do not allow enough customization.

You can access the `context` object and cast it to the bound model to employ some custom business logic. The `contenxt` represents the current data item for the row.

> The MultiColumnComboBox items render as a list (`<ul>`), not a `<table>`. Using table cells inside the row template is possible only if you render a complete table for each item. To mimic the default component appearance, use two sibling containers inside the `<RowTemplate>` with a `k-table-td` CSS class.

## Header Template

@[template](/_contentTemplates/dropdowns/templates.md#header-template)

## Footer Template

@[template](/_contentTemplates/dropdowns/templates.md#footer-template)

## No Data Template

@[template](/_contentTemplates/dropdowns/templates.md#no-data-template)

## Example

>caption Using MultiColumnComboBox Templates

````RAZOR
@* MultiColumnComboBox component with RowTemplate, HeaderTemplate, ItemTemplate, FooterTemplate and NoDataTemplate *@

<p>
    <TelerikCheckBox @bind-Value="@IsDataAvailable" OnChange="@OnCheckBoxChangeHandler" />
    MultiColumnComboBox has data
</p>


<TelerikMultiColumnComboBox Data="@MultiComboData"
                            @bind-Value="@SelectedProduct"
                            ValueField="@nameof(Product.Id)"
                            TextField="@nameof(Product.Name)"
                            Width="300px">
    <HeaderTemplate>
        <div style="text-align: center; padding: .3em;"><strong>Select one of the following:</strong></div>
    </HeaderTemplate>   
    <RowTemplate Context="row">
        <div class="k-table-td">
            <em>@row.Name</em>
        </div>
        <div class="k-table-td" style="text-align: right;">
            <strong>@row.Quantity</strong>
        </div>
    </RowTemplate>
    <FooterTemplate>
        <strong>Total items: @MultiComboData.Count()</strong>
    </FooterTemplate>
    <NoDataTemplate>
        <div class="no-data-template">
            <TelerikSvgIcon Size="@ThemeConstants.SvgIcon.Size.Large" Icon="@SvgIcon.FilesError"></TelerikSvgIcon>
            <p>No items available</p>
        </div>
    </NoDataTemplate>
    <MultiColumnComboBoxColumns>
        <MultiColumnComboBoxColumn Field="@nameof(Product.Name)" Title="Product Name"></MultiColumnComboBoxColumn>
        <MultiColumnComboBoxColumn Field="@nameof(Product.Quantity)" Title="In Stock"></MultiColumnComboBoxColumn>
    </MultiColumnComboBoxColumns>
</TelerikMultiColumnComboBox>

@code {
    private int SelectedProduct { get; set; }

    private bool IsDataAvailable { get; set; } = true;

    private List<Product> MultiComboData { get; set; }

    private List<Product> SourceData { get; set; }

    protected override void OnInitialized()
    {
        var rnd = new Random();

        SourceData = Enumerable.Range(1, 30).Select(x => new Product()
            {
                Id = x,
                Name = $"Product {x}",
                Quantity = rnd.Next(0, 30)
            }).ToList();

        MultiComboData = new List<Product>(SourceData);

        base.OnInitialized();
    }

    private void OnCheckBoxChangeHandler()
    {
        if (IsDataAvailable)
        {
            MultiComboData = new List<Product>(SourceData);
        }
        else
        {
            MultiComboData = new List<Product>();
        }
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
