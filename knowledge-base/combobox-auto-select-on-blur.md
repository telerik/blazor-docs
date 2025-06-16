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

* How can I configure the ComboBox to automatically select the first matching item when the input loses focus (e.g., when the user tabs away or clicks outside)?
* How do I auto-select a ComboBox item based on user input when focus is lost?
* Can the ComboBox select a suggested item on blur without pressing Enter?
* How to set the ComboBox value when the user leaves the input field?

## Solution
To automatically select the first matching item in the ComboBox when the input loses focus (on blur), follow these steps:

1. Handle the [`OnBlur` event](slug:components/combobox/events#onblur) of the ComboBox to detect when the input loses focus.
2. Retrieve the currently highlighted or filtered item using a JavaScript helper function via `JS interop`.
3. Check for a matching item in the ComboBox data based on the user's input.
4. Set the matching item as the selected value programmatically.

>caption Auto-select the first matching item on blur

````RAZOR
@inject IJSRuntime js

<p>Selected value: @ComboBoxValue</p>
<p>First Filtered value: @FirstFilteredItem</p>


<span onkeyup="@GetFirstFilteredItem">
    <TelerikComboBox Data="@ComboBoxData"
                     @bind-Value="@ComboBoxValue"
                     TextField="@nameof(ListItem.Text)"
                     ValueField="@nameof(ListItem.Value)"
                     Filterable="true"
                     OnBlur="@SelectItemOnTab"
                     OnOpen="@( () => IsComboBoxOpen = true )"
                     OnClose="@( () => IsComboBoxOpen = false )"
                     Width="200px">
        <ComboBoxSettings>
            <ComboBoxPopupSettings Class="select-on-tab" />
        </ComboBoxSettings>
    </TelerikComboBox>
</span>
<br />
<br />
<TelerikTextBox Width="200px" Placeholder="another element" />

<script suppress-error="BL9992">
    function getHighligtedComboItem() {
    var focusedItem = document.querySelector(".select-on-tab .k-list-item.k-focus");
        if (focusedItem) {
            return focusedItem.innerText;
        }
    }
</script>

@code {
    private IEnumerable<ListItem> ComboBoxData = Enumerable.Range(1, 123).Select(x => new ListItem { Text = "Item " + x, Value = x });
    private int ComboBoxValue { get; set; }
    private string FirstFilteredItem { get; set; } = string.Empty;
    private bool IsComboBoxOpen { get; set; }

    private async Task GetFirstFilteredItem()
    {
        FirstFilteredItem = await js.InvokeAsync<string>("getHighligtedComboItem");
    }

    private void SelectItemOnTab()
    {
        if (!string.IsNullOrEmpty(FirstFilteredItem))
        {
            var matchingItem = ComboBoxData.FirstOrDefault(x => x.Text.ToLowerInvariant().Contains(FirstFilteredItem.Trim().ToLowerInvariant()));
            if (matchingItem != null)
            {
                ComboBoxValue = matchingItem.Value;
                FirstFilteredItem = string.Empty;
            }
        }
    }

    public class ListItem
    {
        public int Value { get; set; }
        public string Text { get; set; } = string.Empty;
    }
}
````
## See Also

- [ComboBox Events in Telerik UI for Blazor](slug:components/combobox/events)