---
title: How to Automatically Select Preselected Item on Blur
description: Learn how to configure the Telerik ComboBox for Blazor to automatically select the first matching item when the input loses focus.
type: how-to
page_title: How to Automatically Select Preselected Item on Blur
slug: combobox-kb-autoselect-on-blur
tags: telerik, blazor, combobox, blur, auto-select
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>ComboBox for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

The article asnwers to the following question:

* How to configure the ComboBox to automatically select the first matching item when the input loses focus (e.g., when the user tabs away or clicks outside)?
* How to auto-select a ComboBox item based on user input when focus is lost?
* Can the ComboBox select a suggested item on blur without pressing Enter?
* How to set the ComboBox value when the user leaves the input field?

## Solution
To automatically select the first matching item in the ComboBox when the input loses focus, use a combination of the ComboBox [`OnRead` event](slug:components/combobox/events#onread) and JavaScript interop. The provided example demonstrates how to:

1. Use the `OnRead` event to filter data and store the first matching item.
2. Attach a JavaScript event handler to detect when the user blurs the ComboBox input.
3. Invoke a .NET method from JavaScript to set the ComboBox value to the first matching item when focus is lost.
4. Update the ComboBox selection programmatically and refresh the UI.

>caption Auto-select the first matching item on blur

````RAZOR
@using Telerik.DataSource.Extensions

@implements IDisposable

@inject IJSRuntime js

<p>ComboBoxFirstItem: @ComboBoxFirstItem?.Text</p>

<p>Selected value: @ComboBoxValue</p>

<TelerikComboBox OnRead="@OnComboBoxRead"
                 TItem="@ListItem"
                 TValue="@int"
                 Value="@ComboBoxValue"
                 ValueChanged="@( (int newValue) => ComboBoxValueChanged(newValue) )"
                 TextField="@nameof(ListItem.Text)"
                 ValueField="@nameof(ListItem.Id)"
                 Filterable="true"
                 FilterOperator="@StringFilterOperator.Contains"
                 Placeholder="Select an item..."
                 ShowClearButton="true"
                 Width="200px"
                 Id="combo-1">
    <ComboBoxSettings>
        <ComboBoxPopupSettings Class="select-on-tab" />
    </ComboBoxSettings>
</TelerikComboBox>
<br />
<br />
<TelerikTextBox Placeholder="Next form item" Width="200px" />

@* Move JavaScript to a separate JS file *@
<script suppress-error="BL9992">
    function attachComboKeyDown(selector) {
            var comboInput = document.querySelector(selector);
            if (comboInput) {
                comboInput.addEventListener("keydown", onComboInputKeyDown);
            }
        }

        function detachComboKeyDown(selector) {
            var comboInput = document.querySelector(selector);
            if (comboInput) {
                comboInput.removeEventListener("keydown", onComboInputKeyDown);
            }
        }

        function onComboInputKeyDown(e) {
            if (e.key == "Tab") {
                dotNet.invokeMethodAsync("OnComboBoxTab", e.target.value);
            }
        }

        var dotNet;

        function saveDotNetRef(dotNetRef) {
            dotNet = dotNetRef;
        }
</script>

@code {
    private DotNetObjectReference<__Main>? DotNetRef { get; set; }

    private List<ListItem> ComboBoxData { get; set; } = new();
    private int ComboBoxValue { get; set; }
    private ListItem? ComboBoxFirstItem { get; set; }

    [JSInvokable("OnComboBoxTab")]
    public void OnComboBoxTab(string newStringValue)
    {
        if (ComboBoxFirstItem is not null && ComboBoxFirstItem.Text.ToLowerInvariant().Contains(newStringValue.ToLowerInvariant()))
        {
            ComboBoxValue = ComboBoxFirstItem.Id;
            ComboBoxFirstItem = default;

            StateHasChanged();
        }
    }

    private void ComboBoxValueChanged(int newValue)
    {
        ComboBoxValue = newValue;
        ComboBoxFirstItem = default;
    }

    private async Task OnComboBoxRead(ReadEventArgs args)
    {
        var result = await ComboBoxData.ToDataSourceResultAsync(args.Request);

        args.Data = result.Data;
        args.Total = result.Total;

        if (args.Request.Filters.Count > 0 && result.Data.Cast<ListItem>().Count() > 0)
        {
            ComboBoxFirstItem = args.Data.Cast<ListItem>().First();
        }
        else
        {
            ComboBoxFirstItem = default;
        }
    }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            await Task.Delay(1); // ensure HTML is ready
            await js.InvokeVoidAsync("saveDotNetRef", DotNetRef);
            await js.InvokeVoidAsync("attachComboKeyDown", "#combo-1");
        }

        await base.OnAfterRenderAsync(firstRender);
    }

    protected override void OnInitialized()
    {
        DotNetRef = DotNetObjectReference.Create(this);

        for (int i = 1; i <= 24; i++)
        {
            ComboBoxData.Add(new ListItem()
            {
                Id = i,
                Text = $"Item {i}"
            });
        }
    }

    public void Dispose()
    {
        DotNetRef?.Dispose();
        _ = js.InvokeVoidAsync("detachComboKeyDown", "#combo-1");
    }

    public class ListItem
    {
        public int Id { get; set; }
        public string Text { get; set; } = string.Empty;
    }
}
````
## See Also

- [ComboBox Events](slug:components/combobox/events)
