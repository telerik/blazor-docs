---
title: Events
page_title: MultiSelect - Events
description: Events in the MultiSelect for Blazor.
slug: multiselect-events
tags: telerik,blazor,multiselect,events
published: true
position: 20
---

# MultiSelect Events

This article explains the events available in the Telerik MultiSelect for Blazor:

* [ValueChanged](#valuechanged)
* [OnChange](#onchange)
* [OnRead](#onread)
* [OnBlur](#onblur)

## ValueChanged

The `ValueChanged` event fires when the user selection changes (the user adds or removes items).

>caption Handle ValueChanged

````CSHTML
@result
<br />
<TelerikMultiSelect Data="@Roles" ValueChanged="@( (List<string> v) => MyValueChangeHandler(v) )" />

@code{
    string result { get; set; }
    void MyValueChangeHandler(List<string> values)
    {
        result = $"there are now {values.Count} items selected";
    }
    
    List<string> Roles { get; set; } = new List<string> {
        "Manager", "Developer", "QA", "Technical Writer", "Support Engineer", "Sales Agent", "Architect", "Designer"
    };
}
````


@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

@[template](/_contentTemplates/common/issues-and-warnings.md#valuechanged-lambda-required)

>caption Handle ValueChanged and provide initial value

````CSHTML
@result
<br />
<TelerikMultiSelect Data="@Roles" Value="@TheValues" ValueChanged="@( (List<string> v) => MyValueChangeHandler(v) )" />
<br />
from the model:
<ul>
    @foreach (var item in TheValues)
    {
        <li>@item</li>
    }
</ul>

@code{
    string result { get; set; }
    void MyValueChangeHandler(List<string> values)
    {
        result = $"there are now {values.Count} items selected";

        //you have to update the model manually because handling the ValueChanged event does not let you use @bind-Value
        TheValues = values;
    }

    List<string> TheValues { get; set; } = new List<string>();

    List<string> Roles { get; set; } = new List<string> {
        "Manager", "Developer", "QA", "Technical Writer", "Support Engineer", "Sales Agent", "Architect", "Designer"
    };
}
````


## OnChange

The `OnChange` event represents a user action - confirmation of the current value/item. The key differences with `ValueChanged` are:

* `OnChange` does not prevent two-way binding (the `@bind-Value` syntax)
* `OnChange` fires when the user presses `Enter` in the input, or blurs the input (for example, clicks outside of the input or dropdown).

`OnChange` fires when an item is selected from the dropdown, an item is removed from the selected list, or all items are removed from the selected list, just like `ValueChanged`.

>caption Handle OnChange

````CSHTML
@result
<br />
<TelerikMultiSelect Data="@Roles" @bind-Value="@TheValues" OnChange="@MyOnChangeHandler" />
<br />
from the model:
<ul>
    @foreach (var item in TheValues)
    {
        <li>@item</li>
    }
</ul>

@code{
    string result { get; set; }
    void MyOnChangeHandler(object theUserChoice)
    {
        List<string> theData = theUserChoice as List<string>;
        result = $"there are now {theData.Count} items selected";
    }

    List<string> TheValues { get; set; } = new List<string>();

    List<string> Roles { get; set; } = new List<string> {
        "Manager", "Developer", "QA", "Technical Writer", "Support Engineer", "Sales Agent", "Architect", "Designer"
    };
}
````

## OnRead

You can use the he `OnRead` event to provide data to the component according to some custom logic and according to the current user input and/or scroll position (for [virtualization]({%slug multiselect-virtualization%})). The event fires when:

* the component initializes
* the user [filters]({%slug multiselect-filter%})
* the user scrolls with [virtualization]({%slug dropdownlist-virtualization%}) enabled

You can also call remote data through async operations.

>caption Custom Data according to the user input in the MultiSelect

````CSHTML
@* this sample simulates fetching options based on the user input *@

<TelerikMultiSelect Data="@Options" @bind-Value="@TheValues" OnRead="@ReadItems"
                    Filterable="true" />
<br />
selected values
<ul>
    @foreach (var item in TheValues)
    {
        <li>@item</li>
    }
</ul>

@code{
    List<string> TheValues { get; set; } = new List<string>();
    List<string> Options { get; set; } = new List<string>();

    async Task ReadItems(MultiSelectReadEventArgs args)
    {
        if (args.Request.Filters.Count > 0) // there is user filter input, skips providing data on initialization
        {
            Telerik.DataSource.FilterDescriptor filter = args.Request.Filters[0] as Telerik.DataSource.FilterDescriptor;
            string userInput = filter.Value.ToString();
            string method = filter.Operator.ToString();

            //new data collection comes down from the service
            Options = await GetSuggestionsData(userInput, method);
        }
    }

    async Task<List<string>> GetSuggestionsData(string userInput, string filterOperator)
    {
        await Task.Delay(500); // simulate network delay, remove it for a real app

        //sample logic for getting options - here they are generated, you can call a remote service
        //for brevity, this example does not use the filter operator, but your actual service can
        List<string> optionssData = new List<string>();
        for (int i = 0; i < 5; i++)
        {
            optionssData.Add($"suggestion {i} for input {userInput}");
        }

        return optionssData;
    }
}
````

>caption Filter large local data through the Telerik DataSource extensions

````CSHTML
@using Telerik.DataSource.Extensions

<TelerikMultiSelect Data="@CurrentOptions" @bind-Value="@TheValues" OnRead="@ReadItems"
                    Filterable="true" ValueField="Id" TextField="Make" />
<br />
selected values
<ul>
    @foreach (var item in TheValues)
    {
        <li>@item</li>
    }
</ul>

@code{
    List<int> TheValues { get; set; } = new List<int>();
    List<Car> AllOptions { get; set; }

    List<Car> CurrentOptions { get; set; } = new List<Car>();

    async Task ReadItems(MultiSelectReadEventArgs args)
    {
        //generate the big data source that we want to narrow down for the user
        //in a real case you would probably have fetched it in OnInitializedAsync
        if (AllOptions == null)
        {
            AllOptions = new List<Car>
            {
                new Car { Id = 1, Make = "Honda" },
                new Car { Id = 2, Make = "Opel" },
                new Car { Id = 3, Make = "Audi" },
                new Car { Id = 4, Make = "Lancia" },
                new Car { Id = 5, Make = "BMW" },
                new Car { Id = 6, Make = "Mercedes" },
                new Car { Id = 7, Make = "Tesla" },
                new Car { Id = 8, Make = "Vw" },
                new Car { Id = 9, Make = "Alpha Romeo" },
                new Car { Id = 10, Make = "Chevrolet" },
                new Car { Id = 11, Make = "Ford" },
                new Car { Id = 12, Make = "Cadillac" },
                new Car { Id = 13, Make = "Dodge" },
                new Car { Id = 14, Make = "Jeep" },
                new Car { Id = 15, Make = "Chrysler" },
                new Car { Id = 16, Make = "Lincoln" }
            };
        }

        //use Telerik extension methods to filter the data source based on the request from the component
        var datasourceResult = AllOptions.ToDataSourceResult(args.Request);
        CurrentOptions = (datasourceResult.Data as IEnumerable<Car>).ToList();
    }

    public class Car
    {
        public int Id { get; set; }
        public string Make { get; set; }
    }
}
````



## OnBlur

The `OnBlur` event fires when the component loses focus.

>caption Handle the OnBlur event

````CSHTML
@* You do not have to use OnChange to react to loss of focus *@

<TelerikMultiSelect @bind-Value="@TheValues" Data="@Options"
                    OnBlur="@OnBlurHandler">
</TelerikMultiSelect>

@code{
    async Task OnBlurHandler()
    {
        Console.WriteLine($"BLUR fired, current selections count is {TheValues.Count}.");
    }

    List<string> TheValues { get; set; } = new List<string>();
    List<string> Options { get; set; } = new List<string> { "one", "two", "three" };
}
````


## See Also

* [ValueChanged and Validation]({%slug value-changed-validation-model%})
* [Fire OnChange Only Once]({%slug ddl-kb-onchange-fires-twice%})
