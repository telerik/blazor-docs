---
title: How to Refresh Filter Menu After Programmatic Changes
description: Learn how to refresh filter menu context after programmatic changes with a custom component
type: how-to
page_title: How to Refresh Filter Menu After Programmatic Changes
slug: grid-kb-custom-filter-menu
tags: blazor, grid, filter, filtermenu
res_type: kb
ticketid: 1669381
components: ["grid"]
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

When using the TelerikGrid in Blazor applications, it's common to implement a custom `FilterMenu` for enhanced filtering capabilities. However, integrating a Telerik UI for Blazor component that is responsible for the dynamic Grid filtering based on user input does not work as expected. For example, the [AutoComplete](slug:autocomplete-overview) component does not consider the selection from the dropdown list of `StringOperators` within the [`FilterMenuTemplate`](slug:grid-templates-filter#filter-menu-template). 

This knowledge base article also answers the following questions:
- How to integrate AutoComplete with `StringOperators` in a TelerikGrid `FilterMenuTemplate`?
- How to refresh the contents of  `FilterMenuTemplate` in a TelerikGrid?
- How to refresh a `FilterMenuTemplate` after programmatic changes?

## Solution

To achieve the desired behavior, encapsulate the content of the `FilterMenuTemplate` in a separate Razor component and refresh this component upon selection change in the dropdown list. Below is an example demonstrating this approach:

<div class="skip-repl"></div>
````RAZOR Home.razor
@using Telerik.DataSource

<TelerikGrid Data="@Countries"
             FilterMode="GridFilterMode.FilterMenu"
             PageSize="25">
    <GridColumns>
        <GridColumn Field="@(nameof(Country.CountryName))">
            <FilterMenuTemplate>
                <CustomFilterMenu @bind-FilterOperator="@FilterOperator"
                                  @bind-SelectedCountry="@SelectedCountry"
                                  Countries="@Countries"
                                  FilterOperators="@FilterOperators" />
            </FilterMenuTemplate>
            <FilterMenuButtonsTemplate Context="filterContext">
                <TelerikButton OnClick="@(async _ => await FilterAsync(filterContext))" Class="k-button-solid-primary">Filter</TelerikButton>
                <TelerikButton OnClick="@(async _ => await ClearFilterAsync(filterContext))">Clear</TelerikButton>
            </FilterMenuButtonsTemplate>
        </GridColumn>
    </GridColumns>
</TelerikGrid>

@code {
    private IEnumerable<StringFilterOperator> FilterOperators { get; set; } = Enum.GetValues(typeof(StringFilterOperator)).Cast<StringFilterOperator>().ToList();
    private StringFilterOperator FilterOperator { get; set; } = StringFilterOperator.StartsWith;

    private string SelectedCountry { get; set; } = null!;

    private async Task FilterAsync(FilterMenuTemplateContext filterContext)
    {
        AddFilterDescriptor(filterContext.FilterDescriptor);
        await filterContext.FilterAsync();
    }

    private async Task ClearFilterAsync(FilterMenuTemplateContext filterContext)
    {
        SelectedCountry = string.Empty;

        AddFilterDescriptor(filterContext.FilterDescriptor);
        filterContext.FilterDescriptor.FilterDescriptors.Clear();
        await filterContext.ClearFilterAsync();
    }
    private void AddFilterDescriptor(CompositeFilterDescriptor filterDescriptor)
    {
        var model = string.Empty;
        object? value = null;

        value = SelectedCountry;
        model = nameof(Country.CountryName);

        filterDescriptor.FilterDescriptors.Clear();
        filterDescriptor.FilterDescriptors.Add(new FilterDescriptor(model, Telerik.DataSource.FilterOperator.IsEqualTo, value));
    }

    private List<Country> Countries { get; set; } = new List<Country>() {
    new Country { Id = 1, CountryName = "Albania" },
    new Country { Id = 2, CountryName = "Andorra" },
    new Country { Id = 3, CountryName = "Armenia" },
    new Country { Id = 4, CountryName = "Austria" },
    new Country { Id = 5, CountryName = "Azerbaijan" },
    new Country { Id = 6, CountryName = "Belarus" },
    new Country { Id = 7, CountryName = "Belgium" },
    new Country { Id = 8, CountryName = "Bosnia & Herzegovina" },
    new Country { Id = 9, CountryName = "Bulgaria" },
    new Country { Id = 10, CountryName = "Croatia" },
    new Country { Id = 11, CountryName = "Cyprus" },
    new Country { Id = 12, CountryName = "Czech Republic" },
    new Country { Id = 13, CountryName = "Denmark" },
    new Country { Id = 14, CountryName = "Estonia" },
    new Country { Id = 15, CountryName = "Finland" },
    new Country { Id = 16, CountryName = "France" },
    new Country { Id = 17, CountryName = "Georgia" },
    new Country { Id = 18, CountryName = "Germany" },
    new Country { Id = 19, CountryName = "Greece" },
    new Country { Id = 20, CountryName = "Hungary" },
    new Country { Id = 21, CountryName = "Iceland" },
    new Country { Id = 22, CountryName = "Ireland" },
    new Country { Id = 23, CountryName = "Italy" },
    new Country { Id = 24, CountryName = "Kosovo" },
    new Country { Id = 25, CountryName = "Latvia" },
    new Country { Id = 26, CountryName = "Liechtenstein" },
    new Country { Id = 27, CountryName = "Lithuania" },
    new Country { Id = 28, CountryName = "Luxembourg" },
    new Country { Id = 29, CountryName = "Macedonia" },
    new Country { Id = 30, CountryName = "Malta" },
    new Country { Id = 31, CountryName = "Moldova" },
    new Country { Id = 32, CountryName = "Monaco" },
    new Country { Id = 33, CountryName = "Montenegro" },
    new Country { Id = 34, CountryName = "Netherlands" },
    new Country { Id = 35, CountryName = "Norway" },
    new Country { Id = 36, CountryName = "Poland" },
    new Country { Id = 37, CountryName = "Portugal" },
    new Country { Id = 38, CountryName = "Romania" },
    new Country { Id = 39, CountryName = "Russia" },
    new Country { Id = 40, CountryName = "San Marino" },
    new Country { Id = 41, CountryName = "Serbia" },
    new Country { Id = 42, CountryName = "Slovakia" },
    new Country { Id = 43, CountryName = "Slovenia" },
    new Country { Id = 44, CountryName = "Spain" },
    new Country { Id = 45, CountryName = "Sweden" },
    new Country { Id = 46, CountryName = "Switzerland" },
    new Country { Id = 47, CountryName = "Turkey" },
    new Country { Id = 48, CountryName = "Ukraine" },
    new Country { Id = 49, CountryName = "United Kingdom" },
    new Country { Id = 50, CountryName = "Vatican City" }
};
    public class Country
    {
        public int Id { get; set; }
        public string CountryName { get; set; } = null!;
    }
}
````
````RAZOR CustomFilterMenu.razor
@using Telerik.DataSource
@using Microsoft.AspNetCore.Components
@using static Home

<label for="filterOperator"><strong>Select Filter Operator for the AutoComplete:</strong></label>
<TelerikDropDownList Value="@FilterOperator"
                     ValueChanged="@( (StringFilterOperator newValue) => OnFilterOperatorChanged(newValue) )"
                     Id="filterOperator"
                     Data="@FilterOperators"
                     Width="200px">
    <DropDownListSettings>
        <DropDownListPopupSettings Height="auto"></DropDownListPopupSettings>
    </DropDownListSettings>
</TelerikDropDownList>

<label for="autocomplete"><strong>Filter the Grid by Country:</strong></label>
<TelerikAutoComplete ScrollMode="@DropDownScrollMode.Virtual"
                     Value="@SelectedCountry"
                     ValueChanged="@( (string selectedCountry) => HandleSelectedCountryChange(selectedCountry) )"
                     TItem="Country"
                     Data="@Countries"
                     ValueField="CountryName"
                     Width="200px"
                     PageSize="20"
                     Filterable="true"
                     ItemHeight="35"
                     FilterOperator="@FilterOperator">
    <AutoCompleteSettings>
        <AutoCompletePopupSettings Height="auto" MaxHeight="200px" MinHeight="75px" />
    </AutoCompleteSettings>
</TelerikAutoComplete>

@code {
    [Parameter] public EventCallback<StringFilterOperator> FilterOperatorChanged { get; set; }
    [Parameter] public EventCallback<string> SelectedCountryChanged { get; set; }
    [Parameter] public StringFilterOperator FilterOperator { get; set; }
    [Parameter] public string SelectedCountry { get; set; } = string.Empty;
    [Parameter] public IEnumerable<Country> Countries { get; set; } = Enumerable.Empty<Country>();
    [Parameter] public IEnumerable<StringFilterOperator> FilterOperators { get; set; } = null!;

    private async Task OnFilterOperatorChanged(StringFilterOperator newValue)
    {
        FilterOperator = newValue;
        await FilterOperatorChanged.InvokeAsync(newValue);
    }

    private async Task HandleSelectedCountryChange(string newValue)
    {
        SelectedCountry = newValue;
        await SelectedCountryChanged.InvokeAsync(newValue);
    }
}
````

## See Also

- [DropDownList Overview](slug:components/dropdownlist/overview)
- [Grid FilterMenu Documentation](slug:grid-filter-menu)
- [Feedback Portal - Expose a Method to Refresh the FilterMenu](https://feedback.telerik.com/blazor/1584289-expose-a-method-to-refresh-the-filtermenu-from-the-code)
