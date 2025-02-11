---
title: All Items in Dropdown Are Selected
description: How to fix all items in a Blazor dropdown are selected. Applies to AutoComplete, ComboBox and DropDownList
type: troubleshooting
page_title: All Items in Dropdown Are Selected
slug: dropdown-kb-all-items-are-selected
position: 
tags: autocomplete,combobox,dropdownlist
ticketid: 1574582
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>
                ComboBox for Blazor, <br />
                DropDownList for Blazor
            </td>
        </tr>
    </tbody>
</table>


## Description

I have a DropDownList with a programmatically preselected `Value`. On initial page load, the component doesn't display the expected selected value. When the user selects an item from the dropdown, then all items show as selected.

A manually selected initial ComboBox value doesn't display, and then no matter which item I select, all values are selected.

Why the component matches all items to the selected one?


## Possible Cause

Such unexpected behavior may occur if the ComboBox or DropDownList component are bound to a collection of objects. The possible reasons are related to incorrect configuration:

* There is no `ValueField` set. Without it, the component cannot compare items.
* `Value` and `TValue` are not strings or value types, while they should be (for example, `int`, `string`, `Guid`).
* The `ValueField` points to a model property, which is not unique for all items.
* The `ValueField` points to a model property, which is equal to the default value for its type (for example, `null`, `0`, `String.Empty`).


## Solution

When the ComboBox or DropDownList are data bound to a collection of complex objects, make sure that:

* The component `Value` is a `string` or [value type](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/value-types).
* `ValueField` is set and points to a string property or a value-type property of the model class.
* The `Value` and `ValueField` property types match.
* The `ValueField` property value should be unique for each item.
* If `TItem` is set, it must match the model type.
* If `TValue` is set, it must match the `Value` and `ValueField` type.


## Example

The test page below demonstrates several incorrect and correct configurations for comparison.

>caption Bind ComboBox and DropDownList to a Model

````RAZOR
<div id="dropdown-container">
    <div>
        Incorrect (no ValueField, Value is a not a string or value type): <br />
        <TelerikDropDownList @ref="@DropDownRef1"
                                Data="@ListItems"
                                @bind-Value="@SelectedListItem1"
                                TextField="@nameof(ListItem.Text)" />
    </div>

    <div>
        Incorrect (ValueField not unique): <br />
        <TelerikDropDownList @ref="@DropDownRef2"
                                Data="@ListItems"
                                @bind-Value="@SelectedIntValue2"
                                TextField="@nameof(ListItem.Text)"
                                ValueField="@nameof(ListItem.SameId)" />
    </div>

    <div>
        Incorrect (ValueField no values): <br />
        <TelerikDropDownList @ref="@DropDownRef3"
                                Data="@ListItems"
                                @bind-Value="@SelectedIntValue3"
                                TextField="@nameof(ListItem.Text)"
                                ValueField="@nameof(ListItem.EmptyId)" />
    </div>

    <div class="correct">
        <strong>Correct (ValueField is unique and value type):</strong> <br />
        <TelerikDropDownList @ref="@DropDownRef4"
                                Data="@ListItems"
                                @bind-Value="@SelectedIntValue4"
                                TextField="@nameof(ListItem.Text)"
                                ValueField="@nameof(ListItem.Id)" />
    </div>
</div>

<style>
    #dropdown-container > div {
        display: inline-block;
        width: 300px;
        height: 300px;
        padding: 1em;
        background: #fdd;
        vertical-align: top;
    }
    #dropdown-container > .correct {
        background: #dfd;
    }
</style>

@code {
    TelerikDropDownList<ListItem, ListItem> DropDownRef1 { get; set; }
    TelerikDropDownList<ListItem, int> DropDownRef2 { get; set; }
    TelerikDropDownList<ListItem, int> DropDownRef3 { get; set; }
    TelerikDropDownList<ListItem, int> DropDownRef4 { get; set; }

    private List<ListItem> ListItems { get; set; }

    private ListItem SelectedListItem1 { get; set; }
    private int SelectedIntValue2 { get; set; } = 2;
    private int SelectedIntValue3 { get; set; } = 2;
    private int SelectedIntValue4 { get; set; } = 2;

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            await Task.Delay(300);

            DropDownRef1.Open();
            DropDownRef2.Open();
            DropDownRef3.Open();
            DropDownRef4.Open();
        }
    }

    protected override void OnInitialized()
    {
        ListItems = new List<ListItem>();

        for (int i = 1; i < 5; i++)
        {
            ListItems.Add(new ListItem()
            {
                Id = i,
                SameId = 2,
                Text = "Item " + i
            });
        }

        base.OnInitialized();
    }

    public class ListItem
    {
        public int Id { get; set; }
        public int EmptyId { get; set; }
        public int SameId { get; set; }
        public string Text { get; set; }
    }
}
````

# See Also

* [ComboBox data binding to model](slug:components/combobox/databind#bind-to-a-model)
* [DropDownList data binding to model](slug:components/dropdownlist/databind#bind-to-a-model)
