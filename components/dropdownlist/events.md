---
title: Events
page_title: DropDownList - Events
description: Events in the DropDownList for Blazor.
slug: components/dropdownlist/events
tags: telerik,blazor,dropdown,list,dropdownlist,events
published: true
position: 35
---

# Events

This article explains the events available in the Telerik DropDownList for Blazor:

* [ValueChanged](#valuechanged)
* [OnChange](#onchange)
* [OnRead](#onread)
* [OnOpen](#onopen)
* [OnClose](#onclose)
* [OnItemRender](#onitemrender)
* [OnBlur](#onblur)

The examples in this article use `string` values and simple data sources for brevity. You can use full models, see the [data binding](slug://components/dropdownlist/databind) article for more details.

## ValueChanged

The `ValueChanged` event fires upon every change of the user selection.

The example below uses [binding](slug://components/dropdownlist/databind) to string data for brevity. You can use full models as well. The type of the argument in the lambda expression must match the `Value` type of the component, and the `ValueField` type (if `ValueField` is set).

>caption Handle DropDownList ValueChanged

````RAZOR
<ul>
    <li>DropDownList Value: @DropDownValue</li>
    <li>Event Log: @EventLog</li>
</ul>

<TelerikDropDownList Data="@DropDownData"
                     Value="@DropDownValue"
                     ValueChanged="@( (string newValue) => OnDropDownValueChanged(newValue) )">
</TelerikDropDownList>

@code{
    private List<string> DropDownData { get; set; } = new List<string> {
        "Manager", "Developer", "QA", "Technical Writer", "Support Engineer"
    };

    private string DropDownValue { get; set; } = "Developer";

    private string EventLog { get; set; }

    private void OnDropDownValueChanged(string newValue)
    {
        //one-way binding requires manual component Value update
        DropDownValue = newValue;

        EventLog = string.Format("The user selected: {0}", newValue);
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

@[template](/_contentTemplates/common/issues-and-warnings.md#valuechanged-lambda-required)

## OnChange

The `OnChange` event represents a user action - confirmation of the current value. In inputs, it fires when the user presses `Enter` in the input, or when the input loses focus. In the DropDownList, it fires when the user selects an item as well. See [here](slug://ddl-kb-onchange-fires-twice) for sample logic on executing it only once per value selection.

>tip The `OnChange` event is a custom event and does not interfere with bindings, so you can use it together with models and forms.

>caption Handle the OnChange event and use two-way binding

````RAZOR
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

## OnRead

You can use the [`OnRead` event](slug://common-features-data-binding-onread) to provide data to the component based on custom logic and the current user input and/or scroll position (when using [virtualization](slug://dropdownlist-virtualization)). The event fires when:

* The component initializes.
* The user [filters](slug://components/dropdownlist/filter).
* The user scrolls with [virtualization](slug://dropdownlist-virtualization) enabled.

Find out how to [get the applied filtering and grouping criteria](slug://common-features-descriptors).

You can also call remote data through `async` operations.

>caption Custom Data according to the user input in the DropDownList

>tip You can also debounce the service calls and implement minimum filter length. An example of such approach is available in [this knowledge base article for the ComboBox](slug://combo-kb-debounce-onread). The same approach is applicable for the DropDownList.

@[template](/_contentTemplates/common/dropdowns-virtualization.md#value-in-onread)


````RAZOR
<p>@SelectedValue</p>

<TelerikDropDownList TItem="@String" TValue="@String"
                     OnRead="@ReadItems"
                     @bind-Value="@SelectedValue"
                     Filterable="true"
                     DefaultText="Filter by anything">
</TelerikDropDownList>

@code{
    public string SelectedValue { get; set; }
    List<string> Options { get; set; } = new List<string>();

    async Task ReadItems(DropDownListReadEventArgs args)
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

>tip This example uses plain strings for brevity, you can use full models - see the [data binding](slug://components/dropdownlist/databind) article for examples.


>caption Filter large local data through the Telerik DataSource extensions

````RAZOR
@using Telerik.DataSource.Extensions

<p>Selected Id: @SelectedValue</p>

<TelerikDropDownList TItem="@Car" TValue="@(int?)"
                     OnRead="@ReadItems"
                     @bind-Value="@SelectedValue"
                     ValueField="@nameof(Car.Id)"
                     TextField="@nameof(Car.Make)"
                     Filterable="true"
                     DefaultText="Select a car brand">
</TelerikDropDownList>

@code {
    public int? SelectedValue { get; set; }
    List<Car> AllOptions { get; set; }

    protected async Task ReadItems(DropDownListReadEventArgs args)
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

The `OnOpen` event fires before the DropDownList popup renders. 

The event handler receives as an argument an `DropDownListOpenEventArgs` object that contains:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Description |
| --- | --- |
| `IsCancelled` | Set the `IsCancelled` property to `true` to cancel the opening of the popup. |

````RAZOR
<TelerikDropDownList Data="@Items"
                     OnOpen="OnDropDownListPopupOpen"
                     ValueField="@nameof(ItemDescriptor.ItemId)"
                     TextField="@nameof(ItemDescriptor.ItemText)"
                     @bind-Value="@DropDownListValue">
</TelerikDropDownList>

@code {
    private int DropDownListValue { get; set; }

    private void OnDropDownListPopupOpen(DropDownListOpenEventArgs args)
    {
        // set the IsCancelled to true to cancel the OnOpenEvent

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

The `OnClose` event fires before the DropDownList popup closes.

The event handler receives as an argument an `DropDownListCloseEventArgs` object that contains:

| Property | Description |
| --- | --- |
| `IsCancelled` | Set the `IsCancelled` property to `true` to cancel the closing of the popup. |

````RAZOR
@* Cancel the OnClose event based on a condition *@

<TelerikDropDownList Data="@Items"
                     OnClose="@OnDropDownListPopupClose"
                     ValueField="@nameof(ItemDescriptor.ItemId)"
                     TextField="@nameof(ItemDescriptor.ItemText)"
                     @bind-Value="@DropDownListValue">
</TelerikDropDownList>

@code {
    private int DropDownListValue { get; set; }

    private void OnDropDownListPopupClose(DropDownListCloseEventArgs args)
    {
        // cancel the OnClose event based on a condition
        if (DropDownListValue == 2)
        {
            args.IsCancelled = true;
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

The `OnItemRender` event fires when each item in the DropDownList popup renders.

The event handler receives as an argument an `DropDownListItemRenderEventArgs<TItem>` object that contains:

| Property | Description |
| --- | --- |
| `Item` | The current item that renders in the DropDownList. |
| `Class` | The custom CSS class that will be added to the item.     |

````RAZOR
@* Customize an item in the DropDownList *@

<style>
    .customized-item {
        font-weight:bold;
        color: white;
        background-color: blue;
    }
</style>

<TelerikDropDownList Data="@DropDownListData"
                     OnItemRender="@OnItemRenderHandler"
                     TextField="ItemText"
                     ValueField="ItemId"
                     @bind-Value="DropDownListValue">
</TelerikDropDownList>

@code {
    private int DropDownListValue { get; set; }

    private void OnItemRenderHandler(DropDownListItemRenderEventArgs<ItemDescriptor> args)
    {
        ItemDescriptor currentItem = args.Item;

        if (currentItem.ItemText == "item 4" && currentItem.ItemId == 4)
        {
            args.Class = "customized-item";
        }
    }

    private IEnumerable<ItemDescriptor> DropDownListData = Enumerable.Range(1, 20).Select(x => new ItemDescriptor { ItemText = "item " + x, ItemId = x });

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

<TelerikDropDownList @bind-Value="@TheValue" Data="@Suggestions"
                     OnBlur="@OnBlurHandler">
</TelerikDropDownList>

@code {
    async Task OnBlurHandler()
    {
        Console.WriteLine($"BLUR fired, current value is {TheValue}.");
    }

    string TheValue { get; set; }
    List<string> Suggestions { get; set; } = new List<string> { "one", "two", "three" };
}
````

## See Also

* [ValueChanged and Validation](slug://value-changed-validation-model)
* [Fire OnChange Only Once](slug://ddl-kb-onchange-fires-twice)
* [Blazor DropDownList](slug://components/dropdownlist/overview)