---
title: Preventing Value Clearing on Focus in DateInput When AutoCorrectParts Is False
description: Learn how to prevent the value from clearing on focus in the DateInput component when AutoCorrectParts is set to false and the value is initialized in OnInitializedAsync.
type: how-to
page_title: Value Clears in DateInput on Focus When AutoCorrectParts Is False
meta_title: Prevent Clearing Value in DateInput When AutoCorrectParts Is False
slug: prevent-value-clearing-dateinput-autocorrectparts-false
tags: blazor, dateinput, autocorrectparts, value-clearing
res_type: kb
---

## Environment

<table>
<tbody>
<tr>
<td> Product </td>
<td> UI for Blazor DateInput </td>
</tr>
<tr>
<td> Version </td>
<td> Current </td>
</tr>
</tbody>
</table>

## Description

When `AutoCorrectParts` is set to `false` in the [UI for Blazor DateInput](https://docs.telerik.com/blazor-ui/components/dateinput/overview) component and the value is set in the `OnInitializedAsync` lifecycle method, the value may clear when the component receives focus. This behavior occurs because the component initializes before the value is fully set.

This knowledge base article also answers the following questions:

- Why does my DateInput clear its value when focused?
- How do I prevent value clearing in DateInput when AutoCorrectParts is false?
- How do I properly initialize the DateInput value in Blazor?

## Solution

To prevent the value from clearing when the DateInput gains focus:

1. Ensure that the `Value` property is set in the `OnInitializedAsync` method and use a `StateHasChanged` call to notify the component of the updated value.

2. Use the following code example to properly initialize the value:

```csharp
@page "/dateinput-example"
@using Telerik.Blazor.Components

<TelerikDateInput @bind-Value="@DateValue" AutoCorrectParts="false" Format="MM/dd/yyyy" />

@code {
    private DateTime? DateValue;

    protected override async Task OnInitializedAsync()
    {
        await Task.Delay(10); // Simulate data loading or asynchronous operation
        DateValue = new DateTime(2023, 1, 1);
        StateHasChanged(); // Notify component of value update
    }
}
```

The critical part is ensuring the `StateHasChanged` method is called after setting the `Value` property to update the component state.

## See Also

- [DateInput Documentation](https://docs.telerik.com/blazor-ui/components/dateinput/overview)
- [DateInput API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikDateInput)
- [Troubleshooting Common Issues with DateInput](https://docs.telerik.com/blazor-ui/components/dateinput/troubleshooting)
