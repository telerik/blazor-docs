---
title: Restrict the Number of Selected Items in the MultiSelect
description: Learn how to restrict the number of selectable items in the Telerik Blazor MultiSelect component.
type: how-to
page_title: How to Restrict the Number of Selected Items in MultiSelect for Blazor
slug: multiselect-kb-limit-selection
tags: multiselect, blazor, selection limit
res_type: kb
ticketid: 1670731
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>MultiSelect for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

When using the [MultiSelect]({%slug multiselect-overview%}) component, it might be necessary to limit the number of items a user can select. For example, restricting selection to a maximum of three items. This KB article also answers the following questions:
- How to set a selection limit on MultiSelect in Blazor?
- How to prevent additional selections in MultiSelect after reaching a defined limit?
- How to notify users they've reached the maximum number of selectable items in MultiSelect?

## Solution

To restrict the number of selectable items in a MultiSelect component, use one-way binding with the `Value` parameter and the `ValueChanged`({%slug multiselect-events%}#valuechanged) event. This approach allows you to manually update the selected items collection and enforce a maximum selection limit.

Below is a demonstration of how to implement a selection limit. This example restricts the user to a maximum of three selections and informs them when they have reached this limit.

````RAZOR
@if (MultiValues.Count == 3)
{
    <p style="color:red;">You've reached the maximum selected count</p>
}

<TelerikMultiSelect Data="@MultiData"
                    Value="@MultiValues"
                    ValueChanged="@( (List<string> newValues) => OnMultiValueChanged(newValues) )">
</TelerikMultiSelect>

@code {
    private List<string> MultiData { get; set; } = new List<string> {
        "Manager", "Developer", "QA", "Technical Writer", "Support Engineer"
    };

    private List<string> MultiValues { get; set; } = new List<string>() { "Developer" };

    private void OnMultiValueChanged(List<string> newValues)
    {
        if (newValues.Count <= 3)
        {
            MultiValues = newValues;
        }
    }
}
````

## See Also

- [MultiSelect Overview]({%slug multiselect-overview%})
- [MultiSelect Events]({%slug multiselect-events%})
