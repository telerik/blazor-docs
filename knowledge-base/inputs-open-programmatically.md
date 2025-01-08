---
title: Open Input Dropdown on Focus
description: How to open the component dropdown (popup) programmatically or when the user focuses the textbox.
type: how-to
page_title: Open Input Dropdown Programmatically on Focus
slug: inputs-kb-open-programmatically
position: 
tags: autocomplete,combobox,datepicker,datetimepicker,dropdown,dropdownlist,multicolumncombobox,multiselect,timepicker,focus,open
ticketid: 1526273, 1539587, 1547004, 1562064, 1475760
res_type: kb
---

## Environment
<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>
                AutoComplete for Blazor,<br />
                ComboBox for Blazor,<br />
                DatePicker for Blazor,<br />
                DateTimePicker for Blazor,<br />
                DropDownList for Blazor,<br />
                MultiColumnComboBox for Blazor,<br />
                MultiSelect for Blazor,<br />
                TimePicker for Blazor
            </td>
        </tr>
        <tr>
            <td>Product Version</td>
            <td><strong>3.5.0</strong> and later</td>
        </tr>
    </tbody>
</table>

## Description

This Knowledge Base article covers multiple scenarios:

* How to show the AutoComplete dropdown automatically when the user clicks inside the input?
* How to open the ComboBox dropdown on component focus via click?
* How to expand the item list when the ComboBox input is focused via tab?
* How to open the MultiSelect popup from code?
* How to open the MultiSelect list during keyboard navigation tabbing?
* How to show the Calendar or Time popup immediately when the user focuses the Date/Time Picker textbox?

## Solution

To begin with, all Telerik inputs and dropdowns have an `Open` method.

The DropDownList and MultiSelect open automatically on click. They need JavaScript code only to open on focus.

The AutoComplete, ComboBox and Date/Time Pickers do not open automatically and need JavaScript for all use cases - focus and click.

Review the `attachFocusHandler` JavaScript function below. It is called in `OnAfterRenderAsync` and attaches a focus handler to each component textbox. The handler simulates an *Alt + Down* keyboard shortcut, which opens the dropdowns as a standard accessibility and usability feature.

Note that the Date/Time Pickers move focus to their popup once it is opened. This enables keyboard navigation in the popup, but prevents immediate move to another component via tabbing. You need to hit Enter to close the popup and return focus to the DateInput textbox. Then tab.

>caption Focus Component and Open Dropdown Programmatically

````RAZOR
@inject IJSRuntime js
@* Open dropdown on click or focus *@

<!-- suppress-error allows the script tag to be in the Razor file for this example -->
<!-- move this script to a JS file in a production app -->
<script suppress-error="BL9992">

    var dotNet;

    function saveDotNetRef(dotNetRef) {
        dotNet = dotNetRef;
    }

    function attachFocusHandler(id) {
        var element = document.getElementById(id);
        if (element) {
            element.addEventListener("focus", (event) => {
                dotNet.invokeMethodAsync("OpenComponent", id);
            });
        }
    }
</script>

<br />
<br />
AutoComplete:
<TelerikAutoComplete @ref="@AutoCompleteRef"
                     Id="AC1"
                     Data="@ValueCollection"
                     ValueField="@nameof(Product.Name)"
                     @bind-Value="@StringValue"
                     Width="300px" />
<br />
<br />
ComboBox:
<TelerikComboBox @ref="@ComboBoxRef"
                 Id="CB1"
                 Data="@ValueCollection"
                 TextField="@nameof(Product.Name)"
                 ValueField="@nameof(Product.ID)"
                 @bind-Value="@IntValue"
                 Width="300px" />
<br />
<br />
MultiColumnComboBox:
<TelerikMultiColumnComboBox @ref="@MultiComboBoxRef"
                            Id="MCCB1"
                            Data="@ValueCollection"
                            TextField="@nameof(Product.Name)"
                            ValueField="@nameof(Product.ID)"
                            @bind-Value="@IntValue"
                            Width="300px">
    <MultiColumnComboBoxColumns>
        <MultiColumnComboBoxColumn Field="@nameof(Product.ID)" />
        <MultiColumnComboBoxColumn Field="@nameof(Product.Name)" />
    </MultiColumnComboBoxColumns>
</TelerikMultiColumnComboBox>
<br />
<br />
DropDownList:
<TelerikDropDownList @ref="@DropDownListRef"
                     Id="DDL1"
                     Data="@ValueCollection"
                     TextField="@nameof(Product.Name)"
                     ValueField="@nameof(Product.ID)"
                     @bind-Value="@IntValue"
                     Width="300px" />
<br />
<br />
MultiSelect:
<TelerikMultiSelect @ref="@MultiSelectRef"
                    Id="MS1"
                    Data="@ValueCollection"
                    TextField="@nameof(Product.Name)"
                    ValueField="@nameof(Product.ID)"
                    @bind-Value="@MultiValues"
                    Width="350px" />
<br />
<br />
DatePicker:
<TelerikDatePicker @ref="@DatePickerRef"
                   Id="DP1"
                   @bind-Value="@DateValue"
                   Width="300px" />
<br />
<br />
TimePicker:
<TelerikTimePicker @ref="@TimePickerRef"
                   Id="TP1"
                   @bind-Value="@DateValue"
                   Width="300px" />

@code {
    private DotNetObjectReference<OnFocusKB>? DotNetRef { get; set; }

    private List<Product> ValueCollection { get; set; } = new();
    private List<int> MultiValues { get; set; } = new();
    private int IntValue { get; set; }
    private string StringValue { get; set; }
    private DateTime DateValue { get; set; } = DateTime.Now;

    private Dictionary<string, Action> ComponentRefs { get; set; } = new();

    private TelerikMultiSelect<Product, int>? MultiSelectRef { get; set; }
    private TelerikAutoComplete<Product>? AutoCompleteRef { get; set; }
    private TelerikComboBox<Product, int>? ComboBoxRef { get; set; }
    private TelerikMultiColumnComboBox<Product, int>? MultiComboBoxRef { get; set; }
    private TelerikDropDownList<Product, int>? DropDownListRef { get; set; }
    private TelerikDatePicker<DateTime>? DatePickerRef { get; set; }
    private TelerikTimePicker<DateTime>? TimePickerRef { get; set; }

    [JSInvokable("OpenComponent")]
    public void OpenComponent(string id)
    {
        Action action = ComponentRefs[id];

        action.Invoke();
    }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            await Task.Delay(1); // ensure HTML is ready
            await js.InvokeVoidAsync("saveDotNetRef", DotNetRef);

            await js.InvokeVoidAsync("attachFocusHandler", AutoCompleteRef.Id);
            await js.InvokeVoidAsync("attachFocusHandler", ComboBoxRef.Id);
            await js.InvokeVoidAsync("attachFocusHandler", MultiComboBoxRef.Id);
            await js.InvokeVoidAsync("attachFocusHandler", DatePickerRef.Id);
            await js.InvokeVoidAsync("attachFocusHandler", TimePickerRef.Id);
            await js.InvokeVoidAsync("attachFocusHandler", DropDownListRef.Id);
            await js.InvokeVoidAsync("attachFocusHandler", MultiSelectRef.Id);
        }

        await base.OnAfterRenderAsync(firstRender);
    }

    protected override void OnInitialized()
    {
        ComponentRefs = new Dictionary<string, Action>()
        {
            { "AC1", () => AutoCompleteRef.Open() },
            { "CB1", () => ComboBoxRef.Open() },
            { "MCCB1", () => MultiComboBoxRef.Open() },
            { "DDL1", () => DropDownListRef.Open() },
            { "MS1", () => MultiSelectRef.Open() },
            { "DP1", () => DatePickerRef.Open() },
            { "TP1", () => TimePickerRef.Open() },
        };

        for (int i = 1; i <= 10; i++)
        {
            ValueCollection.Add(new Product()
            {
                ID = i,
                Name = "Product Name " + i.ToString()
            });
        }

        DotNetRef = DotNetObjectReference.Create(this);

        base.OnInitialized();
    }

    public class Product
    {
        public int ID { get; set; }
        public string Name { get; set; }
    }
}
````

## Versions Before 3.0

[UI for Blazor versions 2.25 - 2.30 have different HTML rendering for the input components](slug://changes-in-3-0-0). Use this `attachFocusHandler` code instead:

````JS
function attachFocusHandler(id, componentClass) {
    var element = document.getElementById(id);
    if (element) {
        element.addEventListener("focus", (event) => {
            var keyEvent = new KeyboardEvent("keydown", {
                "altKey": true,
                "code": "ArrowDown",
                "key": "ArrowDown",
                "keyCode": 40
            });
            if ((componentClass == ".k-multiselect" && (!event.relatedTarget || event.relatedTarget != element.parentNode.parentNode))
                || (componentClass != undefined && componentClass != ".k-multiselect")) {
                // AutoComplete, ComboBox, DatePicker, TimePicker - tab, click, FocusAsync
                // MultiSelect - tab, FocusAsync
                // element is an input, so we go up the DOM tree to find the component root
                element.closest(componentClass).dispatchEvent(keyEvent);
            } else {
                // DropDownList - tab, FocusAsync
                // element is a span and this is the component root
                element.dispatchEvent(keyEvent);
            }
        });
    }
}
````
