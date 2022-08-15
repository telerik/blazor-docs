---
title: Good Styling Practices
page_title: Good Styling Practices
description: Good practices when styling the Telerik UI for Blazor components
slug: good-styling-practices
tags: telerik,blazor,good,styling,practices
published: True
position: 6
---

# Good Styling Practices

@[template](/_contentTemplates/common/good-styling-practices.md#good-styling-practices)

## Examples

This section show to use the good styling practices to customize the appearance of the Telerik UI for Blazor components.

````Grid
@* Customize the appearance of the Grid header using the HeaderClass. *@

<style>
    .custom-header-style {
        font-weight: bold;
        color: red;
        font-style: italic;
    }</style>

<TelerikGrid Data="@GridData"
             Pageable="true"
             Sortable="true"
             FilterMode="@GridFilterMode.FilterRow">
    <GridColumns>
        <GridColumn Field="Name" Title="Product Name" HeaderClass="custom-header-style" />
        <GridColumn Field="Price" />
        <GridColumn Field="@(nameof(Product.Released))" />
        <GridColumn Field="@(nameof(Product.Discontinued))" />
    </GridColumns>
</TelerikGrid>

@code {
    List<Product> GridData { get; set; }

    protected override void OnInitialized()
    {
        GridData = Enumerable.Range(1, 30).Select(x => new Product
        {
            Id = x,
            Name = "Product name " + x,
            Price = (decimal)(x * 3.14),
            Released = DateTime.Now.AddMonths(-x).Date,
            Discontinued = x % 5 == 0
        }).ToList();

        base.OnInitialized();
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public DateTime Released { get; set; }
        public bool Discontinued { get; set; }
    }
}
````
````ComboBox
<style>
    .custom-text-styling {
        font-size: 8px;
        color: blue;
        font-weight: bold;
    }
</style>

Selected value: @selectedValue
<br />

<TelerikComboBox Data="@myComboData" Class="custom-text-styling" TextField="MyTextField" ValueField="MyValueField" @bind-Value="selectedValue"
                 ClearButton="true" Filterable="true">
</TelerikComboBox>

@code {
    IEnumerable<MyDdlModel> myComboData = Enumerable.Range(1, 20).Select(x => new MyDdlModel { MyTextField = "item " + x, MyValueField = x });

    int selectedValue { get; set; } = 2;  

    public class MyDdlModel
    {
        public int MyValueField { get; set; }
        public string MyTextField { get; set; }
    }
}
````



