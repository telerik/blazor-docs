---
title: Custom Value
page_title: MultiSelect - Custom Value
description: Custom values and user input in the MultiColumnComboBox for Blazor.
slug: multiselect-custom-value
tags: telerik,blazor,multiselect,custom,value,input
published: True
position: 16
---

# MultiSelect Custom Values

The MultiSelect component allows the user to type in their own value that is not a part of the predefined set of options that the developer provided.

The text entered by the user can still go into the field the combo box is bound to through two-way binding.

To enable custom user input, set the `AllowCustom` parameter to `true`. When the user types a custom value, it will appear as the first item in the list with the label: `Use"typed value"`. Refer to the example below to see it in action.

> When MultiSelect is bound to a model, the `TextField`, `ValueField` and the `Value` must be of type `string`. Otherwise an exception will be thrown. Strings are required because the user input can take any form and may not be parsable to other types (such as numbers or GUID).

When custom input is allowed, the [ValueChanged event](slug:multiselect-events#valuechanged) fires on every keystroke, and not when an item is selected, because the MultiSelect component acts as a text input.

>caption Allow custom user input in the MultiSelect component

````RAZOR
<TelerikMultiSelect Data="@Cities"
                    @bind-Value="@SelectedCities"
                    TextField="@nameof(City.CityName)" ValueField="@nameof(City.CityName)"
                    AllowCustom="true"
                    Placeholder="Select city for the list or type a custom one"
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

* `AllowCustom` is not compatible with [Adaptive rendering](slug:adaptive-rendering).

## See Also

* [MultiSelect Overview](slug:multiselect-overview)