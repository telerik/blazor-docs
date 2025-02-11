---
title: Events
page_title: MultiColumnComboBox - Events
description: Events in the ComboBox for Blazor.
slug: multicolumncombobox-events
tags: telerik,blazor,multicolumncombobox,combobox,combo,events
published: true
position: 50
---

# MultiColumnComboBox Events

This article describes the events of the Telerik MultiColumnComboBox for Blazor.

* [ValueChanged](#valuechanged)
* [OnChange](#onchange)
* [OnRead](#onread)
* [OnOpen](#onopen)
* [OnClose](#onclose)
* [OnBlur](#onblur)


## ValueChanged

The `ValueChanged` event fires upon every change of the user selection. When [custom values](slug:multicolumncombobox-custom-value) are enabled, it fires upon every keystroke, like in a regular `<input>` element.

The type of the argument in the lambda expression must match the `Value` type of the component, and the `ValueField` type (if `ValueField` is set).

>caption Handle ValueChanged

````RAZOR
<TelerikMultiColumnComboBox Data="@MultiComboData"
                            Value="@BoundValue"
                            ValueChanged="@((int value) => ValueChangedHandler(value))"
                            ValueField="@nameof(SampleData.Id)"
                            TextField="@nameof(SampleData.Name)">
    <MultiColumnComboBoxColumns>
        <MultiColumnComboBoxColumn Field="@nameof(SampleData.Id)" Title="The id" ></MultiColumnComboBoxColumn>
        <MultiColumnComboBoxColumn Field="@nameof(SampleData.Name)" Title="The name"></MultiColumnComboBoxColumn>
    </MultiColumnComboBoxColumns>
</TelerikMultiColumnComboBox>

@code {
    private void ValueChangedHandler(int value)
    {
        BoundValue = value;
    }

    public int BoundValue { get; set; }

    public List<SampleData> MultiComboData { get; set; } = Enumerable.Range(0, 30).Select(x => new SampleData()
    {
        Id = x,
        Name = "Name " + x
    }).ToList();

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
````

>caption Handle ValueChanged with custom values - the event fires on every keystroke

````RAZOR
<TelerikMultiColumnComboBox Data="@MultiComboData"
                            AllowCustom="true"
                            Value="@BoundValue"
                            ValueChanged="@((string value) => ValueChangedHandler(value))"
                            ValueField="@nameof(SampleData.Id)"
                            TextField="@nameof(SampleData.Name)">
    <MultiColumnComboBoxColumns>
        <MultiColumnComboBoxColumn Field="@nameof(SampleData.Id)" Title="The id"></MultiColumnComboBoxColumn>
        <MultiColumnComboBoxColumn Field="@nameof(SampleData.Name)" Title="The name"></MultiColumnComboBoxColumn>
    </MultiColumnComboBoxColumns>
</TelerikMultiColumnComboBox>

@code {
    private void ValueChangedHandler(string value)
    {
        BoundValue = value;
    }

    public string BoundValue { get; set; }

    public List<SampleData> MultiComboData { get; set; } = Enumerable.Range(0, 30).Select(x => new SampleData()
        {
            Id = x.ToString(),
            Name = "Name " + x
        }).ToList();

    public class SampleData
    {
        public string Id { get; set; }
        public string Name { get; set; }
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

@[template](/_contentTemplates/common/issues-and-warnings.md#valuechanged-lambda-required)

## OnChange

The `OnChange` event represents a user action - confirmation of the current value/item. It is suitable for handling custom values the user can enter as if the MultiColumnComboBox was an input. The key differences with `ValueChanged` are:

* `OnChange` does not prevent two-way binding (the `@bind-Value` syntax)
* `OnChange` fires when the user presses `Enter` in the input, or blurs the input (for example, clicks outside of the combo box). It does not fire on every keystroke, even when `AllowCustom="true"`, but it fires when an item is selected from the dropdown. To get the selected item, you can check if the new value is present in the data source.

>caption Handle OnChange without custom values - to get a value from the list, you must write text that will match the text of an item (e.g, "item 5").

````RAZOR
@result

<TelerikMultiColumnComboBox Data="@MultiComboData"
                            @bind-Value="@BoundValue"
                            OnChange="@OnChangeHandler"
                            ValueField="@nameof(SampleData.Id)"
                            TextField="@nameof(SampleData.Name)">
    <MultiColumnComboBoxColumns>
        <MultiColumnComboBoxColumn Field="@nameof(SampleData.Id)" Title="The id"></MultiColumnComboBoxColumn>
        <MultiColumnComboBoxColumn Field="@nameof(SampleData.Name)" Title="The name"></MultiColumnComboBoxColumn>
    </MultiColumnComboBoxColumns>
</TelerikMultiColumnComboBox>

@code {
    private string result;

    private void OnChangeHandler(object theUserInput)
    {
        result = $"The user entered: {(int)theUserInput}";
    }

    public int BoundValue { get; set; }

    public List<SampleData> MultiComboData { get; set; } = Enumerable.Range(0, 30).Select(x => new SampleData()
        {
            Id = x,
            Name = "Name " + x
        }).ToList();

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
````

>caption Handle OnChange with custom values - the event fires on blur or enter

````RAZOR
@result

<TelerikMultiColumnComboBox Data="@MultiComboData"
                            AllowCustom="true"
                            @bind-Value="@BoundValue"
                            OnChange="@OnChangeHandler"
                            ValueField="@nameof(SampleData.Id)"
                            TextField="@nameof(SampleData.Name)">
    <MultiColumnComboBoxColumns>
        <MultiColumnComboBoxColumn Field="@nameof(SampleData.Id)" Title="The id"></MultiColumnComboBoxColumn>
        <MultiColumnComboBoxColumn Field="@nameof(SampleData.Name)" Title="The name"></MultiColumnComboBoxColumn>
    </MultiColumnComboBoxColumns>
</TelerikMultiColumnComboBox>

@code {
    private string result;

    private void OnChangeHandler(object theUserInput)
    {
        result = $"The user entered: {(string)theUserInput}";
    }

    public string BoundValue { get; set; }

    public List<SampleData> MultiComboData { get; set; } = Enumerable.Range(0, 30).Select(x => new SampleData()
        {
            Id = x.ToString(),
            Name = "Name " + x
        }).ToList();

    public class SampleData
    {
        public string Id { get; set; }
        public string Name { get; set; }
    }
}
````


## OnRead

>tip Get familiar with the [common `OnRead` event documentation](slug:common-features-data-binding-onread) first.

You can use the `OnRead` event to provide data to the component according to some custom logic, the user input, or the current [virtual scroll](slug:multicolumncombobox-virtualization) position. The event fires when:

* The component initializes.
* The user [filters](slug:multicolumncombobox-filter).
* The user scrolls with [virtualization](slug:multicolumncombobox-virtualization) enabled.

You can also call remote data through `async` operations.

Find out how to [get the applied by filtering and grouping criteria](slug:common-features-descriptors).

When using `OnRead`, make sure to set `TItem` and `TValue`.

>tip You can also [debounce the service calls and implement minimum filter length](slug:combo-kb-debounce-onread).

>caption Custom Data according to the user input in the ComboBox

@[template](/_contentTemplates/common/dropdowns-virtualization.md#value-in-onread)

````RAZOR
<p>@SelectedValue</p>

<TelerikMultiColumnComboBox TItem="@SuggestionsModel" TValue="int"
                            OnRead="@ReadItems"
                            ValueField="@nameof(SuggestionsModel.SuggestionId)"
                            TextField="@nameof(SuggestionsModel.SuggestionText)"
                            @bind-Value="@SelectedValue"
                            Filterable="true"
                            Placeholder="Type anything">
    <MultiColumnComboBoxColumns>
        <MultiColumnComboBoxColumn Field="@nameof(SuggestionsModel.SuggestionId)"></MultiColumnComboBoxColumn>
        <MultiColumnComboBoxColumn Field="@nameof(SuggestionsModel.SuggestionText)"></MultiColumnComboBoxColumn>
    </MultiColumnComboBoxColumns>
</TelerikMultiColumnComboBox>

@code {
    public int SelectedValue { get; set; }

    async Task ReadItems(MultiColumnComboBoxReadEventArgs args)
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
            args.Data = new List<SuggestionsModel>()
            {
                new SuggestionsModel()
                {
                    SuggestionId = 1,
                    SuggestionText = "option 1"
                },
                new SuggestionsModel()
                {
                    SuggestionId = 2,
                    SuggestionText = "option 2"
                },
                new SuggestionsModel()
                {
                    SuggestionId = 3,
                    SuggestionText = "option 3"
                },

            };
        }
    }

    async Task<List<SuggestionsModel>> GetOptions(string userInput, string filterOperator)
    {
        await Task.Delay(500); // simulate network delay, remove it for a real app

        //dummy suggestions
        //for brevity, this example does not use the filter operator, but your actual service can
        List<SuggestionsModel> optionsData = new List<SuggestionsModel>();
        for (int i = 1; i <= 5; i++)
        {
            optionsData.Add(new SuggestionsModel()
            {
                SuggestionId = i,
                SuggestionText = $"Option for user input {userInput}"
            });
        }

        return optionsData;
    }

    public class SuggestionsModel
    {
        public int SuggestionId { get; set; }
        public string SuggestionText { get; set; }
    }
}
````


>caption Custom sort of grouped data with OnRead

````RAZOR
@using Telerik.DataSource.Extensions
@using Telerik.DataSource

<TelerikMultiColumnComboBox TItem="Car" TValue="int"
                            TextField="Model"
                            ValueField="Id"
                            GroupField="Make"
                            Filterable="true"
                            @bind-Value="@Value"
                            OnRead="@ReadItems">
    <MultiColumnComboBoxColumns>
        <MultiColumnComboBoxColumn Field="@nameof(Car.Id)" Width="200px" />
        <MultiColumnComboBoxColumn Field="@nameof(Car.Model)" Width="200px" />
        <MultiColumnComboBoxColumn Field="@nameof(Car.Make)" Title="Manufacturer" Width="200px" />
    </MultiColumnComboBoxColumns>
</TelerikMultiColumnComboBox>


@code {
    int Value { get; set; }
    List<Car> SourceData { get; set; } = new List<Car>
    {
        new Car { Id = 1, Make = "Audi", Model="A1" },
        new Car { Id = 2, Make = "Audi", Model="A2" },
        new Car { Id = 3, Make = "Audi", Model="A3" },
        new Car { Id = 4, Make = "Audi", Model="A4" },
        new Car { Id = 5, Make = "Audi", Model="A5" },
        new Car { Id = 6, Make = "Audi", Model="A6" },
        new Car { Id = 7, Make = "BMW", Model="1" },
        new Car { Id = 8, Make = "BMW", Model="2" },
        new Car { Id = 9, Make = "BMW", Model="3" },
        new Car { Id = 10, Make = "BMW", Model="5" },
        new Car { Id = 11, Make = "Mercedes", Model="A" },
        new Car { Id = 12, Make = "Mercedes", Model="C" },
        new Car { Id = 13, Make = "Mercedes", Model="S" },
        new Car { Id = 14, Make = "Mercedes", Model="E" },
        new Car { Id = 15, Make = "Mercedes", Model="AMG" },
        new Car { Id = 16, Make = "Mercedes", Model="CLA" }
    };

    protected async Task ReadItems(MultiColumnComboBoxReadEventArgs args)
    {
        await Task.Delay(200);

        var datasourceResult = SourceData.ToDataSourceResult(args.Request);

        //custom sorting section
        var sortedData = datasourceResult.Data.Cast<AggregateFunctionsGroup>().ToList();

        sortedData.Sort((a, b) =>
        {
            if (a.Key.ToString() == "Audi" && b.Key.ToString() == "BMW")
            {
                return 1;
            }
            else
            {
                return 0;
            }
        });

        args.Data = sortedData;
    }

    public class Car
    {
        public int Id { get; set; }
        public string Make { get; set; }
        public string Model { get; set; }
    }
}
````

## OnOpen

The `OnOpen` event fires before the MultiColumnComboBox popup renders. 

The event handler receives as an argument an `MultiColumnComboBoxOpenEventArgs` object that contains:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Description |
| --- | --- |
| `IsCancelled` | Set the `IsCancelled` property to `true` to cancel the opening of the popup. |

````RAZOR
<TelerikMultiColumnComboBox Data="@Items"
                            OnOpen="@OnMultiColumnComboBoxPopupOpen"
                            ValueField="@nameof(ItemDescriptor.ItemId)"
                            TextField="@nameof(ItemDescriptor.ItemText)"
                            @bind-Value="@MultiColumnComboBoxValue">
    <MultiColumnComboBoxColumns>
        <MultiColumnComboBoxColumn Field="@nameof(ItemDescriptor.ItemId)" Title="Item Id"></MultiColumnComboBoxColumn>
        <MultiColumnComboBoxColumn Field="@nameof(ItemDescriptor.ItemText)" Title="Text"></MultiColumnComboBoxColumn>
    </MultiColumnComboBoxColumns>
</TelerikMultiColumnComboBox>

@code {
    private int MultiColumnComboBoxValue { get; set; } = new();

    private void OnMultiColumnComboBoxPopupOpen(MultiColumnComboBoxOpenEventArgs args)
    {
        //set the IsCancelled to true to cancel the OnOpen event
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

The `OnClose` event fires before the MultiColumnComboBox popup closes.

The event handler receives as an argument an `MultiColumnComboBoxCloseEventArgs` object that contains:

| Property | Description |
| --- | --- |
| `IsCancelled` | Set the `IsCancelled` property to `true` to cancel the closing of the popup. |

````RAZOR
@* Cancel the OnClose event based on a condition *@

<TelerikMultiColumnComboBox Data="@Items"
                            OnClose="@OnMultiColumnComboBoxPopupClose"
                            ValueField="@nameof(ItemDescriptor.ItemId)"
                            TextField="@nameof(ItemDescriptor.ItemText)"
                            @bind-Value="@MultiColumnComboBoxValue">
    <MultiColumnComboBoxColumns>
        <MultiColumnComboBoxColumn Field="@nameof(ItemDescriptor.ItemId)" Title="Item Id"></MultiColumnComboBoxColumn>
        <MultiColumnComboBoxColumn Field="@nameof(ItemDescriptor.ItemText)" Title="Text"></MultiColumnComboBoxColumn>
    </MultiColumnComboBoxColumns>
</TelerikMultiColumnComboBox>

@code {
    private int MultiColumnComboBoxValue { get; set; } = new();

    private void OnMultiColumnComboBoxPopupClose(MultiColumnComboBoxCloseEventArgs args)
    {
        //cancel the OnClose event based on a condition
        if (MultiColumnComboBoxValue == 2)
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

## OnBlur

The `OnBlur` event fires when the component loses focus.

>caption Handle the OnBlur event

````RAZOR
@result

<TelerikMultiColumnComboBox Data="@MultiComboData"
                            @bind-Value="@BoundValue"
                            OnBlur="@OnBlurHandler"
                            ValueField="@nameof(SampleData.Id)"
                            TextField="@nameof(SampleData.Name)">
    <MultiColumnComboBoxColumns>
        <MultiColumnComboBoxColumn Field="@nameof(SampleData.Id)" Title="The id"></MultiColumnComboBoxColumn>
        <MultiColumnComboBoxColumn Field="@nameof(SampleData.Name)" Title="The name"></MultiColumnComboBoxColumn>
    </MultiColumnComboBoxColumns>
</TelerikMultiColumnComboBox>

@code {
    private string result;

    private void OnBlurHandler()
    {
        result = $"The user entered: {(int)BoundValue}";
    }

    public int BoundValue { get; set; }

    public List<SampleData> MultiComboData { get; set; } = Enumerable.Range(0, 30).Select(x => new SampleData()
        {
            Id = x,
            Name = "Name " + x
        }).ToList();

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
````


## See Also

* [ValueChanged and Validation](slug:value-changed-validation-model)
* [Fire OnChange Only Once](slug:ddl-kb-onchange-fires-twice)

