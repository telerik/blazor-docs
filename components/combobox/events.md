---
title: Events
page_title: ComboBox - Events
description: Events in the ComboBox for Blazor.
slug: components/combobox/events
tags: telerik,blazor,combobox,combo,events
published: true
position: 40
---

# ComboBox Events

This article explains the events available in the Telerik ComboBox for Blazor:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

* [ValueChanged](#valuechanged)
* [OnChange](#onchange)
* [OnRead](#onread)
* [OnOpen](#onopen)
* [OnClose](#onclose)
* [OnItemRender](#onitemrender)
* [OnBlur](#onblur)

## ValueChanged

The `ValueChanged` event fires upon every change of the user selection. When [custom values](slug:components/combobox/custom-value) are enabled, it fires upon every keystroke, like in a regular `<input>` element.

The examples below use binding to string data for simplicity, but you can use [full models](slug:components/combobox/databind) as well. Make sure to review the [Data Binding - Missing Value or Data](slug:components/combobox/databind#missing-value-or-data) section to provide all necessary parameters to the component if you do so. The type of the argument in the lambda expression must match the `Value` type of the component, and the `ValueField` type (if `ValueField` is set).

>caption Handle ValueChanged with list values

````RAZOR
<ul>
    <li>ComboBox Value: @ComboValue</li>
    <li>Event Log: @EventLog</li>
</ul>

<TelerikComboBox Data="@ComboData"
                 Value="@ComboValue"
                 ValueChanged="@( (string newValue) => OnComboValueChanged(newValue) )">
</TelerikComboBox>

@code{
    private List<string> ComboData { get; set; } = new List<string> {
        "Manager", "Developer", "QA", "Technical Writer", "Support Engineer"
    };

    private string ComboValue { get; set; }

    private string EventLog { get; set; }

    private void OnComboValueChanged(string newValue)
    {
        ComboValue = newValue;

        EventLog = string.Format("The user selected: {0}", newValue);
    }
}
````

>caption Handle ValueChanged with custom values - the event fires on every keystroke

````RAZOR
<ul>
    <li>ComboBox Value: @ComboValue</li>
    <li>Event Log: @EventLog</li>
    <li>Value is in the Data: @IsInDataSource</li>
</ul>

<TelerikComboBox Data="@ComboData"
                 AllowCustom="true"
                 Value="@ComboValue"
                 ValueChanged="@( (string newValue) => OnComboValueChanged(newValue) )">
</TelerikComboBox>

@code{
    private List<string> ComboData { get; set; } = new List<string> {
        "Manager", "Developer", "QA", "Technical Writer", "Support Engineer", "Sales Agent", "Architect", "Designer"
    };

    private string ComboValue { get; set; } = "Developer";

    private string EventLog { get; set; }

    private bool IsInDataSource { get; set; } = true;

    private void OnComboValueChanged(string newValue)
    {
        ComboValue = newValue;

        IsInDataSource = ComboData.Contains(newValue);

        EventLog = string.Format("The user typed or selected: {0}", newValue);
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

@[template](/_contentTemplates/common/issues-and-warnings.md#valuechanged-lambda-required)

## OnChange

The `OnChange` event represents a user action - confirmation of the current value/item. It is suitable for handling custom values the user can enter as if the combo box were an input. The key differences with `ValueChanged` are:

* `OnChange` does not prevent two-way binding (the `@bind-Value` syntax)
* `OnChange` fires when the user presses `Enter` in the input, or blurs the input (for example, clicks outside of the combo box). It does not fire on every keystroke, even when `AllowCustom="true"`, but it fires when an item is selected from the dropdown. To get the selected item, you can check if the new value is present in the data source.

See the [ComboBox Overview - Selected Item](slug:components/combobox/overview#selected-item) article for details on when the event fires and how item selection and `Value` work.

>caption Handle OnChange without custom values - to get a value from the list, you must write text that will match the text of an item (e.g, "item 5").

````RAZOR
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

````RAZOR
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

You can use the [`OnRead` event](slug:common-features-data-binding-onread) to provide data to the component based on custom logic and the current user input and/or scroll position (when using [virtualization](slug:combobox-virtualization)). The event fires when:

* The component initializes.
* The user [filters](slug:components/combobox/filter).
* The user scrolls with [virtualization](slug:combobox-virtualization) enabled.

You can also call remote data through `async` operations.

Find out how to [get the applied filtering and grouping criteria](slug:common-features-descriptors).

When using `OnRead`, make sure to set `TItem` and `TValue`.

>caption Custom Data according to the user input in the ComboBox

>tip You can also [debounce the service calls and implement minimum filter length](slug:combo-kb-debounce-onread).

@[template](/_contentTemplates/common/dropdowns-virtualization.md#value-in-onread)


````RAZOR
<p>@SelectedValue</p>

<TelerikComboBox TItem="@String" TValue="@String"
                     OnRead="@ReadItems"
                     @bind-Value="@SelectedValue"
                     Filterable="true"
                     Placeholder="Type anything">
</TelerikComboBox>

@code {
    public string SelectedValue { get; set; }

    async Task ReadItems(ComboBoxReadEventArgs args)
    {
        if (args.Request.Filters.Count > 0) // wait for user input to load data
        {
            Telerik.DataSource.FilterDescriptor filter = args.Request.Filters[0] as Telerik.DataSource.FilterDescriptor;
            string userInput = filter.Value.ToString();
            string method = filter.Operator.ToString();

            //new data collection comes down from the service
            args.Data = await GetOptions(userInput, method);
        }
        else
        {
            // when there is no user input you may still want to provide data
            // in this example we just hardcode a few items, you can either fetch all the data
            // or you can provide some subset of most common items, or something based on the business logic
            args.Data = new List<string>() { "one", "two", "three" }; 
        }
    }

    async Task<List<string>> GetOptions(string userInput, string filterOperator)
    {
        await Task.Delay(500); // simulate network delay, remove it for a real app

        //dummy suggestions
        //for brevity, this example does not use the filter operator, but your actual service can
        List<string> optionsData = new List<string>();
        for (int i = 1; i <= 5; i++)
        {
            optionsData.Add($"option {i} for input {userInput}");
        }

        return optionsData;
    }
}
````

>tip This example uses plain strings for brevity, you can use full models - see the [data binding](slug:components/combobox/databind) article for examples. You can also use [custom values](slug:components/combobox/custom-value).


>caption Filter large local data through the Telerik DataSource extensions

````RAZOR
@using Telerik.DataSource.Extensions

<p>Selected Id: @SelectedValue</p>

<TelerikComboBox TItem="@Car" TValue="@(int?)"
                 OnRead="@ReadItems"
                 ValueField="@nameof(Car.Id)"
                 TextField="@nameof(Car.Make)"
                 @bind-Value="@SelectedValue"
                 Filterable="true"
                 Placeholder="Type a car brand">
</TelerikComboBox>

@code {
    public int? SelectedValue { get; set; }
    List<Car> AllOptions { get; set; }

    protected async Task ReadItems(ComboBoxReadEventArgs args)
    {
        //using Telerik extension methods to filter the data
        var datasourceResult = AllOptions.ToDataSourceResult(args.Request);
        args.Data = (datasourceResult.Data as IEnumerable<Car>).ToList();
    }

    protected override void OnInitialized()
    {
        AllOptions = new List<Car> {
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

## OnOpen

The `OnOpen` event fires before the ComboBox popup renders. 

The event handler receives as an argument an `ComboBoxOpenEventArgs` object that contains:

| Property | Description |
| --- | --- |
| `IsCancelled` | Set the `IsCancelled` property to `true` to cancel the opening of the popup. |

````RAZOR
<TelerikComboBox Data="@Items"
                 OnOpen="@OnComboBoxPopupOpen"
                 ValueField="@nameof(ItemDescriptor.ItemId)"
                 TextField="@nameof(ItemDescriptor.ItemText)"
                 @bind-Value="@ComboBoxValue">
</TelerikComboBox>

@code {
    private int ComboBoxValue { get; set; }

    private void OnComboBoxPopupOpen(ComboBoxOpenEventArgs args)
    {
        // cancel the OnOpen event by setting IsCancelled to true
        args.IsCancelled = false;
    }

    private List<ItemDescriptor> Items { get; set; } = Enumerable.Range(1, 50).Select(x => new ItemDescriptor()
        {
            ItemId = x,
            ItemText = $"Item {x}"
        }).ToList();

    public class ItemDescriptor
    {
        public int ItemId { get; set; }
        public string ItemText { get; set; }
    }
}
````

## OnClose

The `OnClose` event fires before the ComboBox popup closes.

The event handler receives as an argument an `ComboBoxCloseEventArgs` object that contains:

| Property | Description |
| --- | --- |
| `IsCancelled` | Set the `IsCancelled` property to `true` to cancel the closing of the popup. |

````RAZOR
@* Cancel the OnClose event based on a condition *@

<TelerikComboBox Data="@Items"
                 OnClose="@OnComboBoxPopupClose"
                 ValueField="@nameof(ItemDescriptor.ItemId)"
                 TextField="@nameof(ItemDescriptor.ItemText)"
                 @bind-Value="@ComboBoxValue">
</TelerikComboBox>

@code {
    private int ComboBoxValue { get; set; }

    private void OnComboBoxPopupClose(ComboBoxCloseEventArgs args)
    {
        // cancel the OnClose event based on a condition
        if (ComboBoxValue == 2)
        {
            args.IsCancelled = false;
        }
    }

    private List<ItemDescriptor> Items { get; set; } = Enumerable.Range(1, 50).Select(x => new ItemDescriptor()
        {
            ItemId = x,
            ItemText = $"Item {x}"
        }).ToList();

    public class ItemDescriptor
    {
        public int ItemId { get; set; }
        public string ItemText { get; set; }
    }
}
````

## OnItemRender

The `OnItemRender` event fires when each item in the ComboBox dropdown renders.

The event handler receives as an argument an `ComboBoxItemRenderEventArgs<TItem>` object that contains:

| Property | Description |
| --- | --- |
| `Item` | The current item that renders in the ComboBox. |
| `Class` | The custom CSS class that will be added to the item. |

````RAZOR
@* Customize an item in the ComboBox *@

<style>
    .customized-item {
        font-weight:bold;
        color: white;
        background-color: blue;
    }
</style>

<TelerikComboBox Data="@ComboBoxData"
                 OnItemRender="@OnItemRenderHandler"
                 TextField="ItemText"
                 ValueField="ItemId"
                 @bind-Value="ComboBoxValue">
</TelerikComboBox>

@code {
    private int ComboBoxValue { get; set; }

    public void OnItemRenderHandler(ComboBoxItemRenderEventArgs<ItemDescriptor> args)
    {
        ItemDescriptor currentItem = args.Item;

        if (currentItem.ItemText == "item 2" && currentItem.ItemId == 2)
        {
            args.Class = "customized-item";
        }
    }

    private IEnumerable<ItemDescriptor> ComboBoxData = Enumerable.Range(1, 20).Select(x => new ItemDescriptor { ItemText = "item " + x, ItemId = x });

    public class ItemDescriptor
    {
        public int ItemId { get; set; }
        public string ItemText { get; set; }
    }
}
````

## OnBlur

The `OnBlur` event fires when the component loses focus.

>caption Handle the OnBlur event

````RAZOR
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

* [ValueChanged and Validation](slug:value-changed-validation-model)
* [Fire OnChange Only Once](slug:ddl-kb-onchange-fires-twice)

