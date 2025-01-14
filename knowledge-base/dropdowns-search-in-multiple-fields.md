---
title: Dropdown Search in Multiple Fields
description: Implement custom fitlering by multiple properties in Blazor AutoComplete, ComboBox, DropDownList and MultiSelect. Search in several data fields.
type: how-to
page_title: Dropdown Custom Filtering in Multiple Fields
slug: dropdowns-kb-search-in-multiple-fields
position: 
tags: search, filter
ticketid: 1550307, 1554601
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>
                AutoComplete for Blazor, <br />
                ComboBox for Blazor, <br />
                DropDownList for Blazor, <br />
                MultiColumnComboBox for Blazor, <br />
                MultiSelect for Blazor
            </td>
        </tr>
    </tbody>
</table>

## Description

My dropdown data model has one numeric property in `ValueField` and two string properties (one of them is the `TextField`). I want to search (filter) for text from both string fields and get filtered results. After the user makes a selection, the component value should be the value from `ValueField`.

## Solution

* [Bind the component with the `OnRead` event](slug://common-features-data-binding-onread). This will allow programmatic changes to the data request filter.
* Create a new [`DataSourceRequest`](/blazor-ui/api/Telerik.DataSource.DataSourceRequest) object in the `OnRead` handler. Set its `Filters` collection to include one [`CompositeFilterDescriptor`](/blazor-ui/api/Telerik.DataSource.CompositeFilterDescriptor) instead of the default [`FilterDescriptor`](/blazor-ui/api/Telerik.DataSource.FilterDescriptor) (see note below).
* The `CompositeFilterDescriptor` object should have its `LogicalOperator` set to `FilterCompositionLogicalOperator.Or` (unless you want **all** searchable fields to contain the search string).
* The `CompositeFilterDescriptor` object should have its `FilterDescriptors` collection contain one `FilterDescriptor` for each searchable field in the data.
* (optional) The new `DataSourceRequest` should copy the `PageSize` and `Skip` property values of the original `OnRead` event argument. This applies to **virtual scrolling** scenarios.
* The `FilterOperator` of the component should be the same as the one in the custom filter descriptors.
* Configure the component `ValueField`, according to the application and business requirements. The dropdown items can display any `string` field via `TextField`. The `TextField` should be a `string` property, because the built-in filtering uses string filter operators. (Note that the AutoComplete does not have a `TextField` parameter and its `ValueField` should be a `string`.)
* (optional) Use an `ItemTemplate` to display multiple fields in the dropdown, including non-string fields.

> Each `FilterDescriptor` defines **one** filtering criterion for one data field (`Member`). The `CompositeFilterDescriptor` contains a [**collection** of `FilterDescriptor`s](/blazor-ui/api/Telerik.DataSource.FilterDescriptorCollection), which can target the same field or different fields. All descriptors in the collection are applied with an *AND* or an *OR* `LogicalOperator`.

>tip The `OnRead` handler below uses a `ReadEventArgs` event argument type. This is to reuse the `OnRead` handler for all components and prevent code duplication. Use the **correct event argument type** in the production application, depending on the component (`AutoCompleteReadEventArgs`, `ComboBoxReadEventArgs`, etc.).

>caption Search in multiple data fields - custom filtering

````RAZOR
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<p>Search (filter) by typing numbers (0 - 99) or pairs of letters (aa - zz)</p>

<p>AutoComplete value: @AutoCompleteValue</p>

<TelerikAutoComplete TItem="@Product" OnRead="@GetItems"
                     @bind-Value="@AutoCompleteValue"
                     ValueField="@nameof(Product.Name)"
                     Filterable="true"
                     FilterOperator="@((StringFilterOperator)ReusableFilterOperator)"
                     Width="300px">
    <ItemTemplate>
        @context.Code - @context.Name
    </ItemTemplate>
</TelerikAutoComplete>

<p>ComboBox value: @ComboBoxValue</p>

<TelerikComboBox TItem="@Product" TValue="@(int?)" OnRead="@GetItems"
                 @bind-Value="@ComboBoxValue"
                 ValueField="@nameof(Product.Id)"
                 TextField="@nameof(Product.Name)"
                 Filterable="true"
                 FilterOperator="@((StringFilterOperator)ReusableFilterOperator)"
                 Width="300px">
    <ItemTemplate>
        @context.Code - @context.Name
    </ItemTemplate>
</TelerikComboBox>

<p>DropDownList value: @DropDownListValue</p>

<TelerikDropDownList TItem="@Product" TValue="@(int?)" OnRead="@GetItems"
                     @bind-Value="@DropDownListValue"
                     ValueField="@nameof(Product.Id)"
                     TextField="@nameof(Product.Name)"
                     Filterable="true"
                     FilterOperator="@((StringFilterOperator)ReusableFilterOperator)"
                     Width="300px">
    <ItemTemplate>
        @context.Code - @context.Name
    </ItemTemplate>
</TelerikDropDownList>

<p>MultiSelect selected items: @MultiSelectValues.Count</p>

<TelerikMultiSelect TItem="@Product" TValue="@(int)" OnRead="@GetItems"
                    @bind-Value="@MultiSelectValues"
                    ValueField="@nameof(Product.Id)"
                    TextField="@nameof(Product.Name)"
                    Filterable="true"
                    FilterOperator="@((StringFilterOperator)ReusableFilterOperator)"
                    Width="300px">
    <ItemTemplate>
        @context.Code - @context.Name
    </ItemTemplate>
</TelerikMultiSelect>

@code {
    string AutoCompleteValue { get; set; }
    int? ComboBoxValue { get; set; }
    int? DropDownListValue { get; set; }
    List<int> MultiSelectValues { get; set; } = new List<int>();

    List<Product> Products { get; set; }

    FilterOperator ReusableFilterOperator { get; set; } = FilterOperator.Contains;

    // !!! use the correct OnRead event argument type in your app !!!
    // AutoCompleteReadEventArgs
    // ComboBoxReadEventArgs
    // DropDownListReadEventArgs
    // MultiSelectReadEventArgs

    // ReadEventArgs here prevents handler duplication
    async Task GetItems(ReadEventArgs args)
    {
        DataSourceRequest newRequest = GenerateCustomFilterRequest(args.Request);

        // simulate network delay
        await Task.Delay(200);

        var result = Products.ToDataSourceResult(newRequest);

        args.Data = result.Data;
        // args.Total is required for virtual scrolling
        //args.Total = result.Total;
    }

    DataSourceRequest GenerateCustomFilterRequest(DataSourceRequest oldRequest)
    {
        var filter = (FilterDescriptor)oldRequest.Filters.FirstOrDefault();
        string searchString = "";

        if (filter != null)
        {
            // extract the search string for the custom FilterDescriptor
            searchString = filter.Value.ToString();
        }
        else
        {
            // no search string, no need to create a FilterDescriptor
            return oldRequest;
        }

        var newRequest = new DataSourceRequest()
        {
            // PageSize and Skip are needed for virtual scrolling
            //PageSize = oldRequest.PageSize,
            //Skip = oldRequest.Skip,
            Filters = new List<IFilterDescriptor>()
        };

        newRequest.Filters.Add(new CompositeFilterDescriptor()
        {
            LogicalOperator = FilterCompositionLogicalOperator.Or,
            FilterDescriptors = new FilterDescriptorCollection() {
                new FilterDescriptor() {
                    Member = nameof(Product.Code),
                    Operator = ReusableFilterOperator,
                    Value = searchString
                },
                new FilterDescriptor() {
                    Member = nameof(Product.Name),
                    Operator = ReusableFilterOperator,
                    Value = searchString
                }
            }
        });

        return newRequest;
    }

    protected override void OnInitialized()
    {
        Products = new List<Product>();
        for (int i = 1; i <= 99; i++)
        {
            Products.Add(new Product()
            {
                Id = i,
                Code = i.ToString("00"),
                Name = $"Product {((char)(i % 27 + 64)).ToString()}{((char)(i % 27 + 64)).ToString()}"
            });
        }

        base.OnInitialized();
    }

    public class Product
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
    }
}
````
