---
title: Events
page_title: AutoComplete - Events
description: Events in the AutoComplete for Blazor.
slug: autocomplete-events
tags: telerik,blazor,autocomplete,events
published: true
position: 35
---

# AutoComplete Events

This article explains the events available in the Telerik AutoComplete for Blazor:

* [ValueChanged](#valuechanged)
* [OnChange](#onchange)
* [OnRead](#onread)
* [OnBlur](#onblur)

## ValueChanged

The `ValueChanged` event fires on every user keystroke that changes the textbox value.

>caption Handle AutoComplete ValueChanged

````CSHTML
AutoComplete Value: @AutoCompleteValue <br />

<TelerikAutoComplete Data="@AutoCompleteData"
                     Value="@AutoCompleteValue"
                     ValueChanged="@( (string newValue) => OnAutoCompleteValueChanged(newValue) )">
</TelerikAutoComplete>

@code{
    private List<string> AutoCompleteData { get; set; } = new List<string> {
        "Manager", "Developer", "QA", "Technical Writer", "Support Engineer"
    };

    private string AutoCompleteValue { get; set; }

    private void OnAutoCompleteValueChanged(string newValue)
    {
        AutoCompleteValue = newValue;
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

@[template](/_contentTemplates/common/issues-and-warnings.md#valuechanged-lambda-required)

>caption Handle ValueChanged and provide initial value

````CSHTML
@result
<br />
from model: @Role
<br />
<TelerikAutoComplete Data="@Suggestions" Value="@Role" ValueChanged="@( (string v) => MyValueChangeHandler(v) )">
</TelerikAutoComplete>

@code{
    string result;

    private void MyValueChangeHandler(string theUserChoice)
    {
        result = string.Format("The user wrote: {0}", theUserChoice);

        //you have to update the model manually because handling the ValueChanged event does not let you use @bind-Value
        Role = theUserChoice;
    }

    string Role { get; set; } = "Intern";

    List<string> Suggestions { get; set; } = new List<string> {
        "Manager", "Developer", "QA", "Technical Writer", "Support Engineer", "Sales Agent", "Architect", "Designer"
    };
}
````

## OnChange

The `OnChange` event represents a user action - confirmation of the current value/item. The key differences with `ValueChanged` are:

* `OnChange` does not prevent two-way binding (the `@bind-Value` syntax)
* `OnChange` fires when the user presses `Enter` in the input, or blurs the input (for example, clicks outside of the input or dropdown). It does not fire on every keystroke, but it fires when an item is selected from the dropdown.

>caption Handle OnChange

````CSHTML
@result
<br />
from model: @Role
<br />
<TelerikAutoComplete Data="@Suggestions" @bind-Value="@Role" OnChange="@MyOnChangeHandler" >
</TelerikAutoComplete>

@code{
    string result;

    private void MyOnChangeHandler(object theUserChoice)
    {
        result = string.Format("The user confirmed: {0}", (string)theUserChoice);
    }

    string Role { get; set; }

    List<string> Suggestions { get; set; } = new List<string> {
        "Manager", "Developer", "QA", "Technical Writer", "Support Engineer", "Sales Agent", "Architect", "Designer"
    };
}
````

## OnRead

You can use the he [`OnRead` event]({%slug common-features-data-binding-onread%}) to provide data to the component according to some custom logic and according to the current user input and/or scroll position (for [virtualization]({%slug autocomplete-virtualization%})). The event fires when:

* the component initializes
* the user [filters]({%slug autocomplete-filter%})
* the user scrolls with [virtualization]({%slug autocomplete-virtualization%}) enabled

You can also call remote data through async operations.

When using `OnRead`, make sure to set `TItem` and `TValue`.

>caption Custom Data according to the user input in the AutoComplete

````CSHTML
<p>@AutoCompleteValue</p>

<TelerikAutoComplete TItem="@String"
                     OnRead="@ReadItems"
                     @bind-Value="@AutoCompleteValue"
                     Filterable="true"
                     Placeholder="Type anything">
</TelerikAutoComplete>

@code {
    public string AutoCompleteValue { get; set; }
    List<string> Suggestions { get; set; } = new List<string>();

    async Task ReadItems(AutoCompleteReadEventArgs args)
    {
        if (args.Request.Filters.Count > 0) // wait for user filter input
        {
            Telerik.DataSource.FilterDescriptor filter = args.Request.Filters[0] as Telerik.DataSource.FilterDescriptor;
            string userInput = filter.Value.ToString();
            string method = filter.Operator.ToString();

            //new data collection comes down from the service
            args.Data = await GetSuggestionsData(userInput, method);
        }
    }

    async Task<List<string>> GetSuggestionsData(string userInput, string filterOperator)
    {
        await Task.Delay(500); // simulate network delay, remove it for a real app

        //sample logic for getting suggestions - here they are generated, you can call a remote service
        //for brevity, this example does not use the filter operator, but your actual service can
        List<string> suggestionsData = new List<string>();
        for (int i = 1; i <= 5; i++)
        {
            suggestionsData.Add($"suggestion {i} for input {userInput}");
        }

        return suggestionsData;
    }
}
````

>caption Filter large local data through the Telerik DataSource extensions

````CSHTML
@using Telerik.DataSource.Extensions

<p>@AutoCompleteValue</p>

<TelerikAutoComplete TItem="@Car"
                     OnRead="@ReadItems"
                     @bind-Value="@AutoCompleteValue"
                     ValueField="@nameof(Car.Make)"
                     Filterable="true"
                     Placeholder="Type a car brand">
</TelerikAutoComplete>

@code {
    public string AutoCompleteValue { get; set; }
    List<Car> AllSuggestions { get; set; }

    protected async Task ReadItems(AutoCompleteReadEventArgs args)
    {
        //using Telerik extension methods to filter the data
        var datasourceResult = AllSuggestions.ToDataSourceResult(args.Request);
        args.Data = datasourceResult.Data;
    }

    protected override void OnInitialized()
    {
        AllSuggestions = new List<Car> {
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

        base.OnInitialized();
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

<TelerikAutoComplete @bind-Value="@TheValue" Data="@Suggestions"
                     OnBlur="@OnBlurHandler">
</TelerikAutoComplete>

@code{
    async Task OnBlurHandler()
    {
        Console.WriteLine($"BLUR fired, current value is {TheValue}.");
    }

    string TheValue { get; set; }
    List<string> Suggestions { get; set; } = new List<string> { "one", "two", "three" };
}
````


## See Also

* [ValueChanged and Validation]({%slug value-changed-validation-model%})
* [Fire OnChange Only Once]({%slug ddl-kb-onchange-fires-twice%})
* [Filter AutoComplete Items]({%slug autocomplete-filter%})
* [Refresh AutoComplete Data]({%slug autocomplete-refresh-data%})
