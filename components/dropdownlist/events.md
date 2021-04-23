---
title: Events
page_title: DropDownList - Events
description: Events in the DropDownList for Blazor.
slug: components/dropdownlist/events
tags: telerik,blazor,dropdown,list,dropdownlist,events
published: true
position: 20
---

# Events

This article explains the events available in the Telerik DropDownList for Blazor:

* [OnChange](#onchange)
* [ValueChanged](#valuechanged)
* [OnRead](#onread)
* [OnBlur](#onblur)

The examples in this article use `string` values and simple data sources for brevity. You can use full models, see the [data binding]({%slug components/dropdownlist/databind%}) article for more details.


## OnChange

The `OnChange` event represents a user action - confirmation of the current value. In inputs, it fires when the user presses `Enter` in the input, or when the input loses focus. In the DropDownList, it fires when the user selects an item as well. See [here]({%slug ddl-kb-onchange-fires-twice%}) for sample logic on executing it only once per value selection.

>tip The `OnChange` event is a custom event and does not interfere with bindings, so you can use it together with models and forms.

>caption Handle the OnChange event and use two-way binding

````CSHTML
@result
<br />
from the model: @MySelectedItem
<br />
<TelerikDropDownList Data="@MyList" OnChange="@MyOnChangeHandler" @bind-Value="@MySelectedItem">
</TelerikDropDownList>

@code {
    string result;
    string MySelectedItem { get; set; } = "second";

    void MyOnChangeHandler(object theUserInput)
    {
        // the handler receives an object that you may need to cast to the type of the component
        // if you do not provide a Value, you must provide the Type parameter to the component
        result = string.Format("The user selected: {0}", (theUserInput as string));
    }

    protected List<string> MyList = new List<string>() { "first", "second", "third" };
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)


## ValueChanged

The `ValueChanged` event fires upon every change of the user selection.

The examples below use [binding]({%slug components/dropdownlist/databind%}) to primitive types for brevity, you can use full models as well.

>caption Handle ValueChanged

````CSHTML
@result
<br />
<TelerikDropDownList Data="@MyList" ValueChanged="@( (string v) => MyValueChangeHandler(v) )">
</TelerikDropDownList>

@code {
    string result;

    private void MyValueChangeHandler(string theUserChoice)
    {
        result = string.Format("The user chose: {0}", theUserChoice);
    }

    protected List<string> MyList = new List<string>() { "first", "second", "third" };
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

@[template](/_contentTemplates/common/issues-and-warnings.md#valuechanged-lambda-required)

>caption Handle ValueChanged and provide initial value

````CSHTML
from the handler: @result
<br />
from model: @MyItem
<br />
<br />
<TelerikDropDownList Data="@MyList" Value="@MyItem" ValueChanged="@( (string v) => MyValueChangeHandler(v) )">
</TelerikDropDownList>

@code {
    string result;

    private void MyValueChangeHandler(string theUserChoice)
    {
        result = string.Format("The user chose: {0}", theUserChoice);

        //you have to update the model manually because handling the ValueChanged event does not let you use @bind-Value
        MyItem = theUserChoice;
    }

    protected List<string> MyList = new List<string>() { "first", "second", "third" };

    protected string MyItem { get; set; } = "second";
}
````


## OnRead

You can use the `OnRead` event to provide data to the component according to some custom logic and according to the current user input. The event fires when:

* the component initializes
* the user [filters]({%slug components/dropdownlist/filter%})

You can also call remote data through `async` operations.

>caption Custom Data according to the user input in the DropDownList

>tip You can also debounce the service calls and implement minimum filter length. An example of such approach is available in [this knowledge base article for the ComboBox]({%slug combo-kb-debounce-onread%}). The same approach is applicable for the DropDownList.

>important You should **change** **only** the `Data` of the DropDownList in the `OnRead` handler. You should **not** change other parameters such as `Value`, because this can lead to issues with the asynchronous nature of the event - the DropDownList cannot know whether the change of those parameters comes from somewhere external, and race conditions can occur with the arrival of the new data. Moreover, such a change is likely to be unwanted and unexpected for the end user and cause bad UX.

````CSHTML
@SelectedValue
<br />
<TelerikDropDownList Data="@Options"
                 OnRead="@ReadItems"
                 Filterable="true"
                 DefaultText="Find what you seek by typing"
                 @bind-Value="@SelectedValue">
</TelerikDropDownList>

@code{
    public string SelectedValue { get; set; }
    List<string> Options { get; set; } = new List<string>();

    async Task ReadItems(DropDownListReadEventArgs args)
    {
        if (args.Request.Filters.Count > 0) // there is user filter input, skips providing data on initialization
        {
            Telerik.DataSource.FilterDescriptor filter = args.Request.Filters[0] as Telerik.DataSource.FilterDescriptor;
            string userInput = filter.Value.ToString();
            string method = filter.Operator.ToString();

            //new data collection comes down from the service
            Options = await GetOptions(userInput, method);
        }
        else
        {
            // when there is no user input you may still want to provide data
            // in this example we just hardcode a few items, you can either fetch all the data
            // or you can provide some subset of most common items, or something based on the business logic
            Options = new List<string>() { "one", "two", "three" };
        }
    }

    async Task<List<string>> GetOptions(string userInput, string filterOperator)
    {
        await Task.Delay(500); // simulate network delay, remove it for a real app

        //sample logic for getting suggestions - here they are generated, you can call a remote service
        //for brevity, this example does not use the filter operator, but your actual service can
        List<string> optionsData = new List<string>();
        for (int i = 0; i < 5; i++)
        {
            optionsData.Add($"option {i} for input {userInput}");
        }

        return optionsData;
    }
}
````

>tip This example uses plain strings for brevity, you can use full models - see the [data binding](data-bind) article for examples.


>caption Filter large local data through the Telerik DataSource extensions

````CSHTML
@using Telerik.DataSource.Extensions

@SelectedValue
<br />
<TelerikDropDownList Data="@CurrentOptions"
                 OnRead="@ReadItems"
                 Filterable="true"
                 DefaultText="Find a car by typing part of its make"
                 @bind-Value="@SelectedValue" ValueField="Id" TextField="Make">
</TelerikDropDownList>

@code {
    public int? SelectedValue { get; set; }
    List<Car> AllOptions { get; set; }

    List<Car> CurrentOptions { get; set; }

    protected async Task ReadItems(DropDownListReadEventArgs args)
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

<TelerikDropDownList @bind-Value="@TheValue" Data="@Suggestions"
                     OnBlur="@OnBlurHandler">
</TelerikDropDownList>

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
