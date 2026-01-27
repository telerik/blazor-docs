---
title: Use Filter Operator Drop-Down in Filter Template
description: Learn how to implement and reuse a filter operator selector in a filter row template, as well as a button that clears the current column filter.
type: how-to
page_title: How to Use Filter Operator Drop-Down in Filter Template
slug: grid-kb-filter-operator-dropdown
position: 
tags: telerik, blazor, grid, treelist, filter
ticketid: 
res_type: kb
components: ["grid"]
---
## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Grid for Blazor, <br /> TreeList for Blazor</td>
        </tr>
    </tbody>
</table>


## Description

This KB article answers the following questions:

* How to implement a filter operator dropdown list in a [Grid filter row template (`FilterCellTemplate`)](slug:grid-templates-filter)?
* How to reuse the filter operator logic and the clear filter button logic across multiple filter cell templates?


## Solution

The example below shows how to mimic the following built-in features, which exist in the `FilterRow` `FilterMode` of the Grid and TreeList:

* Operator DropDownList, which allows users to select filter operators like "equal to", "starts with", etc.
* Clear Button, which allows users to clear the column's filter.

The sample also shows a few additional optional features:

* Highlight the Filter Operator DropDownList when the column is filtered. See the `IsFilterActive` parameter of `FilterOperatorList`.
* Choose the available options in the Filter Operator DropDownList. See the `FilterOperators` parameter of `FilterOperatorList`.

`FilterOperatorList` and `FilterClearButton` are custom Razor components. The implementation is just an example and subject to customization, according to the specific scenario and business requirements. Refer to the [Grid Filtering](slug:components/grid/filtering) and [Grid Filter Templates](slug:grid-templates-filter) documentation for more information about how filtering works.

>caption Using Filter Operators and Clear Button in FilterCellTemplate

<div class="skip-repl"></div>

````RAZOR Index.razor
@using Telerik.DataSource

<TelerikGrid Data="@GridData"
             Pageable="true"
             Sortable="true"
             FilterMode="GridFilterMode.FilterRow">
    <GridColumns>
        <GridColumn Field="@nameof(SampleModel.Name)">
            <FilterCellTemplate>
                <TelerikTextBox Value="@NameFilterValue"
                                ValueChanged="@( async (string newValue) => await NameFilterValueChanged(newValue, context) )" />

                <FilterOperatorList FilterValue="@NameFilterValue" @bind-FilterContext="@context"
                                    FilterOperators="@( new List<FilterOperator> { FilterOperator.Contains, FilterOperator.StartsWith })" />
                <FilterClearButton @bind-FilterValue="@NameFilterValue" FilterContext="@context" />
            </FilterCellTemplate>
        </GridColumn>
        <GridColumn Field="@nameof(SampleModel.Price)">
            <FilterCellTemplate>
                <TelerikNumericTextBox Value="@PriceFilterValue"
                                       ValueChanged="@( async (decimal? newValue) => await PriceFilterValueChanged(newValue, context) )" />

                <FilterOperatorList FilterValue="@PriceFilterValue" @bind-FilterContext="@context" />
                <FilterClearButton @bind-FilterValue="@PriceFilterValue" FilterContext="@context" />
            </FilterCellTemplate>
        </GridColumn>
        <GridColumn Field="@nameof(SampleModel.Quantity)">
            <FilterCellTemplate>
                <TelerikNumericTextBox Value="@QuantityFilterValue"
                                       ValueChanged="@( async (int? newValue) => await QuantityFilterValueChanged(newValue, context) )" />

                <FilterOperatorList FilterValue="@QuantityFilterValue" @bind-FilterContext="@context" />
                <FilterClearButton @bind-FilterValue="@QuantityFilterValue" FilterContext="@context" />
            </FilterCellTemplate>
        </GridColumn>
        <GridColumn Field="@nameof(SampleModel.StartDate)">
            <FilterCellTemplate>
                <TelerikDatePicker Value="@StartDateFilterValue"
                                   ValueChanged="@( async (DateOnly? newValue) => await StartDateFilterValueChanged(newValue, context) )" />

                <FilterOperatorList FilterValue="@StartDateFilterValue" @bind-FilterContext="@context" />
                <FilterClearButton @bind-FilterValue="@StartDateFilterValue" FilterContext="@context" />
            </FilterCellTemplate>
        </GridColumn>
    </GridColumns>
</TelerikGrid>

@code {
    private List<SampleModel> GridData { get; set; } = new();

    #region Filter Templates

    private string NameFilterValue { get; set; } = string.Empty;
    private decimal? PriceFilterValue { get; set; }
    private int? QuantityFilterValue { get; set; }
    private DateOnly? StartDateFilterValue { get; set; }

    private async Task NameFilterValueChanged(string newValue, FilterCellTemplateContext context)
    {
        NameFilterValue = newValue;
        await FilterValueChanged(newValue, context);
    }
    private async Task PriceFilterValueChanged(decimal? newValue, FilterCellTemplateContext context)
    {
        PriceFilterValue = newValue;
        await FilterValueChanged(newValue, context);
    }
    private async Task QuantityFilterValueChanged(int? newValue, FilterCellTemplateContext context)
    {
        QuantityFilterValue = newValue;
        await FilterValueChanged(newValue, context);
    }
    private async Task StartDateFilterValueChanged(DateOnly? newValue, FilterCellTemplateContext context)
    {
        StartDateFilterValue = newValue;
        await FilterValueChanged(newValue, context);
    }

    private async Task FilterValueChanged(object? newValue, FilterCellTemplateContext context)
    {
        if (newValue == null)
        {
            await context.ClearFilterAsync();
        }
        else
        {
            context.FilterDescriptor.FilterDescriptors.OfType<FilterDescriptor>().First().Value = newValue;
            await context.FilterAsync();
        }
    }

    #endregion Filter Templates

    protected override void OnInitialized()
    {
        var rnd = new Random();

        for (int i = 1; i <= 100; i++)
        {
            GridData.Add(new SampleModel()
            {
                Id = i,
                Name = $"Name {i} {(char)rnd.Next(65, 91)}{(char)rnd.Next(65, 91)}{(char)rnd.Next(65, 91)}",
                Price = rnd.Next(1, 100) * 1.23m,
                Quantity = rnd.Next(0, 1000),
                StartDate = DateOnly.FromDateTime(DateTime.Now.AddDays(-rnd.Next(60, 1000)))
            });
        }
    }

    public class SampleModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public DateOnly StartDate { get; set; }
    }
}
````
````RAZOR FilterOperatorList.razor
@using Telerik.DataSource

@typeparam T

<TelerikDropDownList Data="@DropDownListData"
                     Value="@DropDownListValue"
                     ValueChanged="@DropDownListValueChanged"
                     TItem="@FilterOperatorModel"
                     TValue="@FilterOperator"
                     ValueField="@nameof(FilterOperatorModel.Operator)"
                     TextField="@nameof(FilterOperatorModel.Text)"
                     Width="30px"
                     Class="filter-dropdownlist">
    <ValueTemplate>
        <TelerikButton Class="@DropDownListClass" Icon="@SvgIcon.Filter" TabIndex="-1" />
    </ValueTemplate>
    <DropDownListSettings>
        <DropDownListPopupSettings Width="150px" Height="auto" MaxHeight="170px" />
    </DropDownListSettings>
</TelerikDropDownList>

<style>
    /* This CSS code makes the DropDownList component look like a Button. */

    .filter-dropdownlist {
        border-width: 0;
        flex: 0 0 30px;
    }

        .filter-dropdownlist .k-input-inner {
            padding: 0;
        }

        .filter-dropdownlist .k-input-button {
            display: none;
        }
</style>

@code {
    /// <summary>
    /// Sets the value by which the column is filtered. Used to determine if the column filter is active.
    /// </summary>
    [Parameter]
    public T FilterValue { get; set; } = default(T)!;

    /// <summary>
    /// Sets the <c>context</c> of the column's <see cref="Telerik.Blazor.Common.Columns.IBoundColumn.FilterCellTemplate"/>
    /// </summary>
    [Parameter]
    public FilterCellTemplateContext? FilterContext { get; set; }

    /// <summary>
    /// Fires when the Filter Operator DropDownList value changes,
    /// so that the parent component can update the column filter descriptors.
    /// </summary>
    [Parameter]
    public EventCallback<FilterCellTemplateContext> FilterContextChanged { get; set; }

    /// <summary>
    /// Sets the available filter operators. Optional.
    /// </summary>
    [Parameter]
    public List<FilterOperator>? FilterOperators { get; set; }

    public bool IsFilterActive => !string.IsNullOrEmpty(FilterValue?.ToString());

    private FilterOperator DropDownListValue { get; set; }

    private List<FilterOperatorModel> DropDownListData { get; set; } = new();

    private string DropDownListClass => IsFilterActive ? "k-button-solid-primary" : string.Empty;

    private async Task DropDownListValueChanged(FilterOperator newValue)
    {
        DropDownListValue = newValue;
        FilterContext!.FilterDescriptor.FilterDescriptors.OfType<FilterDescriptor>().First().Operator = DropDownListValue;

        if (FilterContextChanged.HasDelegate)
        {
            await FilterContextChanged.InvokeAsync(FilterContext);
        }

        if (IsFilterActive)
        {
            await FilterContext.FilterAsync();
        }
    }

    protected override void OnParametersSet()
    {
        if (FilterContext == null)
        {
            throw new ArgumentNullException("FilterContext");
        }
        else
        {
            DropDownListValue = FilterContext!.FilterDescriptor.FilterDescriptors.OfType<FilterDescriptor>().First().Operator;
        }

        base.OnParametersSet();
    }

    protected override void OnInitialized()
    {
        if (FilterOperators != null && FilterOperators.Any())
        {
            DropDownListData = FilterOperators.Select(x => GetFilterOperatorModel(x)).ToList();
        }
        else
        {
            // This code obtains the correct filter operators, depending on the column data type.
            // Feel free to add more data types or change the operator collections below.

            var propertyType = typeof(T);

            var underlyingType = Nullable.GetUnderlyingType(propertyType);

            if (underlyingType != null)
            {
                propertyType = underlyingType;
            }

            if (propertyType == typeof(int) || propertyType == typeof(float) || propertyType == typeof(double) || propertyType == typeof(decimal))
            {
                DropDownListData = NumericFilterOperators;
            }
            else if (propertyType == typeof(DateTime) || propertyType == typeof(DateOnly) || propertyType == typeof(TimeOnly))
            {
                DropDownListData = DateTimeFilterOperators;
            }
            else
            {
                DropDownListData = StringFilterOperators;
            }
        }

        base.OnInitialized();
    }

    public class FilterOperatorModel
    {
        public FilterOperator Operator { get; set; }

        public string Text { get; set; }

        public FilterOperatorModel(FilterOperator filterOperator, string text)
        {
            Operator = filterOperator;
            Text = text;
        }
    }

    private FilterOperatorModel GetFilterOperatorModel(FilterOperator filterOperator)
    {
        return new FilterOperatorModel(filterOperator, FilterOperatorMap[filterOperator]);
    }

    private Dictionary<FilterOperator, string> FilterOperatorMap => new Dictionary<FilterOperator, string>()
    {
        { FilterOperator.Contains, "Contains" },
        { FilterOperator.DoesNotContain, "Does not contain" },
        { FilterOperator.EndsWith, "Ends With" },
        { FilterOperator.IsContainedIn, "Is contained in" },
        { FilterOperator.IsEmpty, "Is empty" },
        { FilterOperator.IsEqualTo, "Is equal to" },
        { FilterOperator.IsGreaterThan, "Is greater than" },
        { FilterOperator.IsGreaterThanOrEqualTo, "Is greater than or equal to" },
        { FilterOperator.IsLessThan, "Is less than" },
        { FilterOperator.IsLessThanOrEqualTo, "Is less than or equal to" },
        { FilterOperator.IsNotEmpty, "Is not empty" },
        { FilterOperator.IsNotEqualTo, "Is not equal to" },
        { FilterOperator.IsNotNull, "Is not null" },
        { FilterOperator.IsNotNullOrEmpty, "Is not null or empty" },
        { FilterOperator.IsNull, "Is null" },
        { FilterOperator.IsNullOrEmpty, "Is null or empty" },
        { FilterOperator.StartsWith, "Starts with" }
    };

    private List<FilterOperatorModel> StringFilterOperators => new List<FilterOperatorModel>()
    {
        GetFilterOperatorModel(FilterOperator.IsEqualTo),
        GetFilterOperatorModel(FilterOperator.IsNotEqualTo),
        GetFilterOperatorModel(FilterOperator.Contains),
        GetFilterOperatorModel(FilterOperator.DoesNotContain),
        GetFilterOperatorModel(FilterOperator.IsContainedIn),
        GetFilterOperatorModel(FilterOperator.StartsWith),
        GetFilterOperatorModel(FilterOperator.EndsWith)
    };

    private List<FilterOperatorModel> NumericFilterOperators => new List<FilterOperatorModel>()
    {
        GetFilterOperatorModel(FilterOperator.IsEqualTo),
        GetFilterOperatorModel(FilterOperator.IsNotEqualTo),
        GetFilterOperatorModel(FilterOperator.IsGreaterThan),
        GetFilterOperatorModel(FilterOperator.IsGreaterThanOrEqualTo),
        GetFilterOperatorModel(FilterOperator.IsLessThan),
        GetFilterOperatorModel(FilterOperator.IsLessThanOrEqualTo)
    };

    private List<FilterOperatorModel> DateTimeFilterOperators => new List<FilterOperatorModel>()
    {
        GetFilterOperatorModel(FilterOperator.IsEqualTo),
        GetFilterOperatorModel(FilterOperator.IsNotEqualTo),
        GetFilterOperatorModel(FilterOperator.IsGreaterThan),
        GetFilterOperatorModel(FilterOperator.IsGreaterThanOrEqualTo),
        GetFilterOperatorModel(FilterOperator.IsLessThan),
        GetFilterOperatorModel(FilterOperator.IsLessThanOrEqualTo)
    };
}
````
````RAZOR FilterClearButton.razor
@typeparam T

<TelerikButton Icon="@SvgIcon.FilterClear"
               Enabled="@ButtonEnabled"
               OnClick="@ClearFilter" />

@code {
    /// <summary>
    /// Sets the value by which the column is filtered. Used to determine if the Button should be enabled.
    /// </summary>
    [Parameter]
    public T FilterValue { get; set; } = default(T)!;

    /// <summary>
    /// Fires when the Clear button is clicked, so that the parent component can clear the filter value
    /// in the <see cref="Telerik.Blazor.Common.Columns.IBoundColumn.FilterCellTemplate"/>.
    /// </summary>
    [Parameter]
    public EventCallback<T> FilterValueChanged { get; set; }

    /// <summary>
    /// Sets the <c>context</c> of the column's <see cref="Telerik.Blazor.Common.Columns.IBoundColumn.FilterCellTemplate"/>
    /// </summary>
    [Parameter]
    public FilterCellTemplateContext? FilterContext { get; set; }

    private bool ButtonEnabled
    {
        get
        {
            if (typeof(T) == typeof(string))
            {
                return !string.IsNullOrEmpty(FilterValue?.ToString());
            }
            else if (FilterValue != null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }

    private async Task ClearFilter()
    {
        FilterValue = default!;

        if (FilterValueChanged.HasDelegate)
        {
            await FilterValueChanged.InvokeAsync(FilterValue);
        }

        await FilterContext!.ClearFilterAsync();
    }

    protected override void OnParametersSet()
    {
        if (FilterContext == null)
        {
            throw new ArgumentNullException("FilterContext");
        }

        base.OnParametersSet();
    }
}
````


## See Also

* [Grid Filtering](slug:components/grid/filtering)
* [Grid Filter Templates](slug:grid-templates-filter)
