---
title: How to Restrict Numeric Input in ComboBox
description: Learn how to prevent users from typing numbers in a Telerik UI for Blazor ComboBox.
type: how-to
page_title: How to Prevent Numeric Input in Blazor ComboBox
slug: combobox-kb-prevent-numeric
tags: combobox, blazor, input, numeric
res_type: kb
ticketid: 1682510
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

I want to restrict typing numbers in the [`ComboBox`](slug:components/combobox/overview) component.

## Solution

To prevent users from entering numbers in the ComboBox: 

1. Wrap the component in an HTML element and use the [`onkeydown` event](https://www.w3schools.com/jsref/event_onkeydown.asp) to capture every keystroke.
2. Implement a JavaScript function that prevents the numbers.

Below is the implementation:

`````RAZOR
<div onkeydown="preventNumbers(event)">
    <TelerikComboBox Data="@ComboData"
                     Value="@ComboValue"
                     ValueChanged="@( (string newValue) => OnComboValueChanged(newValue) )"
                     Width="300px">
    </TelerikComboBox>
</div>

<script suppress-error="BL9992">
    function preventNumbers(event) {
        if (event.key >= '0' && event.key <= '9') {
            event.preventDefault();
        }
    }
</script>

@code {
    private string? ComboValue { get; set; }

    private List<string> ComboData { get; set; } = new List<string> {
        "Manager", "Developer", "QA", "Technical Writer", "Support Engineer"
    };

    private void OnComboValueChanged(string newValue)
    {
        ComboValue = newValue;
    }
}
`````
