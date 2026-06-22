---
title: Preventing Value Clearing on Focus in DateInput with AutoCorrectParts Set to False
description: Learn how to prevent the value from clearing on focus in the UI for Blazor DateInput when AutoCorrectParts is set to false and the value is initialized in OnInitializedAsync.
type: how-to
page_title: Value Clears on Focus in DateInput When AutoCorrectParts is False
meta_title: Value Clears on Focus in DateInput When AutoCorrectParts is False
slug: value-clears-on-focus-dateinput-autocorrectparts-false
tags: ui-for-blazor, dateinput, autocorrectparts, oninitializedasync
res_type: kb
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>UI for Blazor DateInput</td>
</tr>
<tr>
<td>Version</td>
<td>Current</td>
</tr>
</tbody>
</table>

## Description

When using the [UI for Blazor DateInput](https://docs.telerik.com/blazor-ui/components/dateinput/overview) with the `AutoCorrectParts` property set to `false`, the value clears on focus if the value is initialized in the `OnInitializedAsync` lifecycle method. This happens because the component's internal initialization logic and value binding may conflict.

This knowledge base article also answers the following questions:
- Why does my DateInput value clear on focus when AutoCorrectParts is false?
- How can I prevent value clearing in DateInput on focus?
- What causes value clearing in DateInput when setting value in OnInitializedAsync?

## Solution

To resolve the issue, ensure that the value binding and component initialization do not conflict. Use proper data-binding to set the initial value and avoid manual value assignment directly in `OnInitializedAsync`. 

Follow these steps to ensure the value persists on focus:

1. Use the `Value` parameter to bind the initial value to the component.
2. Avoid assigning a value directly in `OnInitializedAsync` if it conflicts with the `Value` parameter.

Example:

```razor
@page "/dateinput-example"

<TelerikDateInput @bind-Value="DateValue" AutoCorrectParts="false" />

@code {
    private DateTime DateValue { get; set; }

    protected override async Task OnInitializedAsync()
    {
        // Set the initial value to avoid conflicts
        DateValue = new DateTime(2023, 1, 1);
        await base.OnInitializedAsync();
    }
}
```

This ensures the value persists and does not clear when the input gains focus.

## See Also

- [UI for Blazor DateInput Overview](https://docs.telerik.com/blazor-ui/components/dateinput/overview)
- [UI for Blazor DateInput API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikDateInput)
- [AutoCorrectParts Property Documentation](https://docs.telerik.com/blazor-ui/components/dateinput/autocorrect-parts)
