---
title: Search Grid in numeric and date fields
description: How to use the Grid SearchBox to search in integer, numeric, date and enum fields (data types).
type: how-to
page_title: Search Grid in numeric and date fields
slug: grid-kb-search-numeric-fields
position: 
tags: grid, search, gridsearchbox
ticketid: 1485012, 1488627, 1440872, 1488627, 1551397, 1546489, 1520936
res_type: kb
category: knowledge-base
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Grid for Blazor</td>
        </tr>
    </tbody>
</table>


## Description

How to allow users search the Blazor Grid in numeric, date and enum fields?

How to use the toolbar GridSearchBox to search values in number columns?

How to search integers or float numbers from the Grid toolbar?

How to make the Grid SearchBox search with multiple data types?


## Solution

The Blazor Grid search works with `string` data types, because it uses a `contains` string filter operator.

It is possible to search by other data types with some additional coding that will use non-string filter operators.

The following sections discuss how to implement the desired behavior, what are the limitations, and provide an example.


## Prerequisites

The solution below requires familiarity with:

* [How to use Grid filter descriptors]({%slug components/grid/filtering%}#filter-descriptors)
* [How to change the Grid state]({%slug grid-state%})
* [How to invoke Razor component events from a child component](https://docs.microsoft.com/en-us/aspnet/core/blazor/components/event-handling?view=aspnetcore-6.0#eventcallback).


## Steps

Here is an overview of the major steps in the example:

1. Add a search textbox to the [Grid toolbar]({%slug components/grid/features/toolbar%}) or outside the Grid. Do not use the default [`GridSearchBox` component]({%slug grid-searchbox%}), as it searches inside string only.
1. Handle the `oninput` event of the search textbox. Alternatively, use a search button with an `onclick` handler.
1. Use the event handler to:
    * Create a new `CompositeFilterDescriptor`.
    * Iterate all searchable fields of the Grid.
    * For each searchable field, parse the search string and convert it the field's data type. Create a child `FilterDescriptor` object, depending on the data field type and the parsed search value.
1. Apply the filter descriptors via the Grid state.


## How it works

* A search value `"8"` will return:
    * *string* results that *contain* the string "8"
    * *numeric* results that are *equal to* 8
    * *enums* results that are *equal to* `int` 8
* Date search values *must fully match* date values in the Grid to return results. The example also shows how to search by year only.
* If the search value cannot be parsed to a certain type, it won't add filters for columns of this type. For example, a search value of `"8 asd"` won't return any numeric, date and boolean results

>tip It is possible to achieve different behavior, or to work around the above limitations, by using different business logic in the filter descriptor creation.

> The example is incompatible with [regular Grid filtering]({%slug components/grid/filtering%}). The `SetGridSearchBoxFilters` method always removes all existing filter descriptors, because the Grid and its API does not distinguish programmatic filters and filters set by the user. In addition, the total number of programmatic and user filters will exceed the abilities of the Grid filtering UI.


## Example

<div class="skip-repl"></div>

````Grid.razor
@* How to use a custom search textbox in the Grid, which supports multiple data types.
    The example shows how to build FilterDescriptors programmatically for all searchable fields in the Grid model.
*@

@using Telerik.DataSource;

<TelerikGrid Data="@MyData" @ref="@Grid" Pageable="true" Height="400px">
    <GridToolBar>
        <GridUniversalSearchBox OnSearch="@OnSearch" T="SampleData" Fields="@SearchBoxFields" />
    </GridToolBar>
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.Id))" Width="100px" />
        <GridColumn Field="@(nameof(SampleData.Byte))" Width="100px" />
        <GridColumn Field="@(nameof(SampleData.Short))" Width="100px" />
        <GridColumn Field="@(nameof(SampleData.Long))" Width="100px" />
        <GridColumn Field="@(nameof(SampleData.Float))" Width="100px" />
        <GridColumn Field="@(nameof(SampleData.Double))" Width="100px" />
        <GridColumn Field="@(nameof(SampleData.Enum))" Width="120px" />
        <GridColumn Field="@(nameof(SampleData.String))" Width="100px" />
        <GridColumn Field="@(nameof(SampleData.Bool))" Width="100px" />
        <GridColumn Field="@(nameof(SampleData.DateTime))" />
    </GridColumns>
</TelerikGrid>

@code {
    public TelerikGrid<SampleData> Grid { get; set; }
    public string SearchBoxValue { get; set; }
    public List<string> SearchBoxFields { get; set; } = new List<string>
    { "Id", "Byte", "Short", "Long", "Float", "Double", "DateTime", "Bool", "Enum", "String" };

    public async Task SetGridSearchBoxFilters(CompositeFilterDescriptor searchDescriptors)
    {
        var state = Grid.GetState();

        state.FilterDescriptors.Clear();
        state.FilterDescriptors.Add(searchDescriptors);

        await Grid.SetState(state);
    }

    private async Task OnSearch(CompositeFilterDescriptor value)
    {
        await SetGridSearchBoxFilters(value);
    }

    public IEnumerable<SampleData> MyData = Enumerable.Range(1, 30).Select(x => new SampleData
    {
        Id = x,
        Byte = (byte)(x + 2),
        Short = (short)(x + 3),
        Long = (long)(x + 4),
        Float = ((float)x) + 5.5f,
        Double = ((double)x) + 6.5,
        String = "Name " + x + 2,
        DateTime = DateTime.Now.Date.AddMonths(-x),
        Bool = x % 2 == 0,
        Enum = (EnumType)(x % 3),
    });

    public class SampleData
    {
        public int Id { get; set; }
        public string String { get; set; }
        public DateTime DateTime { get; set; }
        public bool Bool { get; set; }
        public byte Byte { get; set; }
        public short Short { get; set; }
        public long Long { get; set; }
        public float Float { get; set; }
        public double Double { get; set; }
        public EnumType Enum { get; set; }
    }

    public enum EnumType
    {
        EnumValue1,
        EnumValue2,
        EnumValue3
    }
}
````
````GridUniversalSearchBox.razor
@using System.ComponentModel.DataAnnotations
@using System.Globalization
@using System.Reflection
@using Telerik.DataSource

@typeparam T

<span class="k-grid-search k-textbox k-input k-input-solid k-rounded-md k-input-md">
    <span class="k-icon k-input-icon k-i-search"></span>
    <input @oninput="@OnInput"
           value="@SearchBoxValue"
           type="text" class="k-input-inner" />
    @if (!string.IsNullOrEmpty(SearchBoxValue))
    {
        <span @onclick="@ClearSearch"
              class="k-clear-value"><span class="k-icon k-i-x"></span></span>
    }
</span>

@code {
    [Parameter]
    public EventCallback<CompositeFilterDescriptor> OnSearch { get; set; }

    [Parameter]
    public List<string> Fields { get; set; }

    public string SearchBoxValue { get; set; }

    private protected async Task ClearSearch()
    {
        SearchBoxValue = string.Empty;

        await OnSearch.InvokeAsync(new CompositeFilterDescriptor());
    }

    private async Task OnInput(ChangeEventArgs args)
    {
        var value = args.Value.ToString();
        SearchBoxValue = value;

        var newDescriptor = new CompositeFilterDescriptor() { LogicalOperator = FilterCompositionLogicalOperator.Or };
        if (!string.IsNullOrEmpty(value))
        {
            foreach (var field in Fields)
            {
                var type = typeof(T).GetProperty(field).PropertyType;

                // you can specify the unsigned numbers too (uint, ulong...)
                if (type == typeof(int) || type == typeof(int?) ||
                type == typeof(short) || type == typeof(short?) ||
                type == typeof(byte) || type == typeof(byte?) ||
                type == typeof(long) || type == typeof(long?))
                {
                    if (long.TryParse(value.ToString(), out var longValue))
                    {
                        var filter = CreateFilterDescriptor(field, FilterOperator.IsEqualTo, longValue);
                        newDescriptor.FilterDescriptors.Add(filter);
                    }
                }
                else if (type == typeof(float) || type == typeof(float?) ||
                    type == typeof(double) || type == typeof(double?))
                {
                    if (double.TryParse(value.ToString(), out var doubleValue))
                    {
                        var filter = CreateFilterDescriptor(field, FilterOperator.IsEqualTo, doubleValue);
                        newDescriptor.FilterDescriptors.Add(filter);
                    }
                }
                else if (type.IsEnum)
                {
                    if (int.TryParse(value.ToString(), out var intValue))
                    {
                        var filter = CreateFilterDescriptor<int>(field, FilterOperator.IsEqualTo, intValue);
                        newDescriptor.FilterDescriptors.Add(filter);
                    }
                    else
                    {
                        foreach (var item in Enum.GetValues(type))
                        {
                            var text = item.ToString();
                            var fieldInfo = type.GetField(text);
                            var displayNameAttribute = fieldInfo.GetCustomAttribute<DisplayAttribute>()?.GetName();
                            if ((displayNameAttribute?.Contains(value.ToString()) ?? false) || text.Contains(value.ToString()))
                            {
                                var filter = CreateFilterDescriptor<int>(field, FilterOperator.IsEqualTo, (int)item);
                                newDescriptor.FilterDescriptors.Add(filter);
                            }
                        }
                    }
                }
                else if (type == typeof(DateTime) || type == typeof(DateTime?))
                {
                    // search by exact DateTime
                    var culture = CultureInfo.CurrentUICulture;
                    var styles = DateTimeStyles.None;

                    if (DateTime.TryParse(value.ToString(), culture, styles, out var dateValue))
                    {
                        var filter = CreateFilterDescriptor(field, FilterOperator.IsEqualTo, dateValue);
                        newDescriptor.FilterDescriptors.Add(filter);
                    }

                    // search by year only
                    if (short.TryParse(value.ToString(), out var yearValue))
                    {
                        if (yearValue > 1000 && yearValue < 2100)
                        {
                            var yearFilterDescriptor = new CompositeFilterDescriptor() { LogicalOperator = FilterCompositionLogicalOperator.And };
                            var filter1 = CreateFilterDescriptor(field, FilterOperator.IsGreaterThanOrEqualTo, new DateTime(yearValue, 1, 1));
                            yearFilterDescriptor.FilterDescriptors.Add(filter1);
                            var filter2 = CreateFilterDescriptor(field, FilterOperator.IsLessThan, new DateTime(yearValue + 1, 1, 1));
                            yearFilterDescriptor.FilterDescriptors.Add(filter2);

                            newDescriptor.FilterDescriptors.Add(yearFilterDescriptor);
                        }
                    }
                }
                else if (type == typeof(bool) || type == typeof(bool?))
                {
                    if (bool.TryParse(value.ToString(), out var boolValue))
                    {
                        var filter = CreateFilterDescriptor(field, FilterOperator.IsEqualTo, boolValue);
                        newDescriptor.FilterDescriptors.Add(filter);
                    }
                }
                else if (type == typeof(string))
                {
                    var filter = CreateFilterDescriptor(field, FilterOperator.Contains, value);
                    newDescriptor.FilterDescriptors.Add(filter);
                }
            }
        }

        await OnSearch.InvokeAsync(newDescriptor);
    }

    private FilterDescriptor CreateFilterDescriptor<TMember>(string member, FilterOperator filterOperator, TMember value)
    {
        var filter = new FilterDescriptor(member, filterOperator, value);
        filter.MemberType = typeof(TMember);

        return filter;
    }
}
````
