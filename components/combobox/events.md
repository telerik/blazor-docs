---
title: Events
page_title: ComboBox - Events
description: Events in the ComboBox for Blazor.
slug: components/combobox/events
tags: telerik,blazor,combobox,combo,events
published: true
position: 20
---

# ComboBox Events

This article explains the events available in the Telerik ComboBox for Blazor:

* [ValueChanged](#valuechanged)
* [OnChange](#onchange)
* [OnRead](#onread)
* [OnBlur](#onblur)

## ValueChanged

The `ValueChanged` event fires upon every change of the user selection. When [custom values]({%slug components/combobox/custom-value%}) are enabled, it fires upon every keystroke, like in a regular `<input>` element.

The examples below use binding to primitive types for brevity, you can use [full models]({%slug components/combobox/databind%}) as well. Make sure to review the [Data Binding - Missing Value or Data]({%slug components/combobox/databind%}#missing-value-or-data) section to provide all necessary parameters to the component if you do so. The type of the argument in the lambda expression must match the type of the `Value` of the component.

>caption Handle ValueChanged

````CSHTML
@result
<br />
<TelerikComboBox Data="@MyList" ValueChanged="@( (string v) => MyValueChangeHandler(v) )">
</TelerikComboBox>

@code {
    string result;

    private void MyValueChangeHandler(string theUserChoice)
    {
        result = string.Format("The user chose: {0}", theUserChoice);
    }

    protected List<string> MyList = new List<string>() { "first", "second", "third" };
}
````

>caption Handle ValueChanged with custom values - the event fires on every keystroke

````CSHTML
@result
<br />
<TelerikComboBox Data="@MyList" AllowCustom="true" ValueChanged="@( (string v) => MyValueChangeHandler(v) )">
</TelerikComboBox>

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

>caption Handle ValueChanged and provide initial value (it is *not* required to enable custom values)

````CSHTML
@result
<br />
from model: @MyItem
<br />
<br />
<TelerikComboBox Data="@MyList" Value="@MyItem" AllowCustom="true" ValueChanged="@( (string v) => MyValueChangeHandler(v) )">
</TelerikComboBox>

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

>caption Get selected item - check if the new value is present in the data source

````CSHTML
@result
<br />
Is selection from dropdown: @isLastSelectionInData
<br />
from model: @MyItem
<br />
<br />
<TelerikComboBox Data="@MyList" Value="@MyItem" AllowCustom="true" ValueChanged="@( (string v) => MyValueChangeHandler(v) )">
</TelerikComboBox>

@code {
    string result;
    bool isLastSelectionInData { get; set; } = true;//default to true as the default in this sample is from the predefined data

    private void MyValueChangeHandler(string theUserChoice)
    {
        isLastSelectionInData = MyList.Contains(theUserChoice); //adapt to your actual data source

        result = string.Format("The user chose: {0}", theUserChoice);

        MyItem = theUserChoice;
    }

    protected List<string> MyList = new List<string>() { "first", "second", "third" };

    protected string MyItem { get; set; } = "second";
}
````


## OnChange

The `OnChange` event represents a user action - confirmation of the current value/item. It is suitable for handling custom values the user can enter as if the combo box were an input. The key differences with `ValueChanged` are:

* `OnChange` does not prevent two-way binding (the `@bind-Value` syntax)
* `OnChange` fires when the user presses `Enter` in the input, or blurs the input (for example, clicks outside of the combo box). It does not fire on every keystroke, even when `AllowCustom="true"`, but it fires when an item is selected from the dropdown. To get the selected item, you can check if the new value is present in the data source.

See the [ComboBox Overview - Selected Item]({%slug components/combobox/overview%}#selected-item) article for details on when the event fires and how item selection and `Value` work.

>caption Handle OnChange without custom values - to get a value from the list, you must write text that will match the text of an item (e.g, "item 5").

````CSHTML
@result
<br />
@selectedValue
<br /><br />
<TelerikComboBox Data="@myComboData" TextField="MyTextField" ValueField="MyValueField"
                 @bind-Value="@selectedValue" OnChange="@MyOnChangeHandler">
</TelerikComboBox>

@code {
    string result;
    int selectedValue { get; set; } = 3;

    private void MyOnChangeHandler(object theUserInput)
    {
        // the handler receives an object that you may need to cast to the type of the component
        // if you do not provide a Value, you must provide the Type parameter to the component
        result = string.Format("The user entered: {0}", (int)theUserInput);
    }

    public class MyComboModel
    {
        public int MyValueField { get; set; }
        public string MyTextField { get; set; }
    }

    IEnumerable<MyComboModel> myComboData = Enumerable.Range(1, 20).Select(x => new MyComboModel { MyTextField = "item " + x, MyValueField = x });
}
````

>caption Handle OnChange with custom values - the event fires on blur or enter

````CSHTML
@result
<br />
@selectedValue
<br /><br />
<TelerikComboBox Data="@myComboData" TextField="MyTextField" ValueField="MyValueField"
                 @bind-Value="@selectedValue" OnChange="@MyOnChangeHandler" AllowCustom="true">
</TelerikComboBox>

@code {
    string result;
    string selectedValue { get; set; } = "3";

    private void MyOnChangeHandler(object theUserInput)
    {
        // the handler receives an object that you may need to cast to the type of the component
        // if you do not provide a Value, you must provide the Type parameter to the component
        result = string.Format("The user entered: {0}", (string)theUserInput);
    }

    public class MyComboModel
    {
        public string MyValueField { get; set; }
        public string MyTextField { get; set; }
    }

    IEnumerable<MyComboModel> myComboData = Enumerable.Range(1, 20).Select(x => new MyComboModel { MyTextField = "item " + x, MyValueField = x.ToString() });
}
````


## OnRead

You can use the `OnRead` event to provide data to the component according to some custom logic and according to the current user input and/or scroll position (for [virtualization]({%slug combobox-virtualization%})). The event fires when:

* the component initializes
* the user [filters]({%slug components/combobox/filter%})
* the user scrolls with [virtualization]({%slug combobox-virtualization%}) enabled

You can also call remote data through `async` operations.

>caption Custom Data according to the user input in the ComboBox

>tip You can also [debounce the service calls and implement minimum filter length]({%slug combo-kb-debounce-onread%}).

>important You should **change** **only** the `Data` of the ComboBox in the `OnRead` handler. You should **not** change other parameters such as `Value`, because this can lead to issues with the asynchronous nature of the event - the ComboBox cannot know whether the change of those parameters comes from somewhere external, and race conditions can occur with the arrival of the new data. Moreover, such a change is likely to be unwanted and unexpected for the end user and cause bad UX.

````CSHTML
@SelectedValue
<br />
<TelerikComboBox Data="@Options"
                     OnRead="@ReadItems"
                     Filterable="true"
                     Placeholder="Find what you seek by typing"
                     @bind-Value="@SelectedValue">
</TelerikComboBox>

@code{
    public string SelectedValue { get; set; }
    List<string> Options { get; set; } = new List<string>();

    async Task ReadItems(ComboBoxReadEventArgs args)
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

>tip This example uses plain strings for brevity, you can use full models - see the [data binding](data-bind) article for examples. You can also use [custom values](custom-value).


>caption Filter large local data through the Telerik DataSource extensions

````CSHTML
@using Telerik.DataSource.Extensions

@SelectedValue
<br />
<TelerikComboBox Data="@CurrentOptions"
                     OnRead=@ReadItems
                     Filterable="true"
                     Placeholder="Find a car by typing part of its make"
                     @bind-Value="@SelectedValue" ValueField="Id" TextField="Make">
</TelerikComboBox>

@code {
    public int? SelectedValue { get; set; }
    List<Car> AllOptions { get; set; }

    List<Car> CurrentOptions { get; set; }

    protected async Task ReadItems(ComboBoxReadEventArgs args)
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

<TelerikComboBox @bind-Value="@TheValue" Data="@Suggestions"
                     OnBlur="@OnBlurHandler">
</TelerikComboBox>

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

