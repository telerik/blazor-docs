---
title: Custom Values
page_title: MultiSelect - Custom Values
description: Learn how to use custom values and user input in the MultiSelect for Blazor.
slug: multiselect-custom-values
tags: telerik,blazor,multiselect,custom,value,input
published: True
position: 16
---

# MultiSelect Custom Values

The MultiSelect component lets users type their own values that are not part of the options predefined by the developer.

The text entered by the user can still go into the collection that MultiSelect component is bound to through two-way binding.

To enable custom user input, set the `AllowCustom` parameter to `true`. When the user types a custom value, it appears as the first item in the list with the label: `Use "typed value"`. The user must select (click) the value, to actually add it the collection of values that MultiSelect is bound to. Refer to the example below to see the feature in action.

> When custom values are enabled, the `TextField`, `ValueField` and the `Value` must be of type `string`. Otherwise an exception will be thrown. Strings are required because the user input can take any form and may not be parsable to other types (such as numbers or GUID).

When custom input is allowed, the [`ValueChanged` event](slug:multiselect-events#valuechanged) fires on every keystroke, instead of when an item is selected. This happens because the MultiSelect component behaves like a text input.

>caption Allow custom user input in the MultiSelect component

````RAZOR
<TelerikMultiSelect Data="@Cities"
                    @bind-Value="@SelectedCities"
                    TextField="@nameof(City.CityName)" 
                    ValueField="@nameof(City.CityName)"
                    AllowCustom="true"
                    Placeholder="Select a city for the list or type a custom one"
                    Width="400px">
</TelerikMultiSelect>

@code {
    private List<City> Cities { get; set; } = new();
    private List<string> SelectedCities { get; set; } = new();

    protected override void OnInitialized()
    {
        Cities = new List<City>
        {
            new City { CityId = 1, CityName = "New York"},
            new City { CityId = 2, CityName = "London"},
            new City { CityId = 3, CityName = "Tokyo"},
            new City { CityId = 4, CityName = "Paris"},
            new City { CityId = 5, CityName = "Sydney"}
        };

        base.OnInitialized();
    }

    public class City
    {
        public int CityId { get; set; }
        public string CityName { get; set; } = string.Empty;
    }
}
````

## Limitations

* `AllowCustom` is not compatible with [adaptive rendering](slug:adaptive-rendering).

## See Also

* [MultiSelect Overview](slug:multiselect-overview)