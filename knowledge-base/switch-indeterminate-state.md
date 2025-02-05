---
title: Add Indeterminate Switch State
description: Learn how to customize the Telerik Switch for Blazor and add an indeterminate state when the component Value is null.
type: how-to
page_title: How to Add Indeterminate State to the Telerik Switch for Blazor
slug: switch-kb-indeterminate-state
tags: blazor, switch, css, styling
ticketid: 1677869, 1587745
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Switch for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

This KB answers the following questions:

* How to implement an indeterminate state feature for the Switch component with CSS?
* How to use a Switch component with an undetermined state for nullable boolean values?
* How to enable inteterminate Switch state when the value is null?

## Solution

1. Use a specific `Class` parameter value to toggle the indeterminate UI state of the Switch.
1. [Apply custom CSS styles to override](slug:themes-override) the default Switch appearance.

> Indeterminate Switches are uncommon and users may not identify or distinguish them easily. Also evaluate other options, such as [indeterminate checkboxes](slug:checkbox-indeterminate-state) or a [RadioGroup](slug:radiogroup-overview) with three visible options.

>caption Switch with indeterminate state for null values

````RAZOR
<p>Switch <code>Value</code>: <code>@( SwitchValue?.ToString().ToLowerInvariant() ?? "null" )</code></p>

<TelerikSwitch @bind-Value="@SwitchValue"
               Class="@( SwitchValue.HasValue ? string.Empty : IndeterminateClass )" />

<TelerikButton OnClick="@( () => SwitchValue = default )">Reset Switch</TelerikButton>

<style>
    /* Set a custom Switch background in indeterminate state. */
    span.switch-indeterminate .k-switch-track {
        background-color: var(--kendo-color-warning);
    }

    /* Hide Switch labels */
    span.switch-indeterminate .k-switch-label-on,
    span.switch-indeterminate .k-switch-label-off {
        display: none;
    }

        /* Center the Switch thumb */
        span.switch-indeterminate .k-switch-thumb {
            transform: translate(0, -50%);
        }
</style>

@code {
    private bool? SwitchValue { get; set; }

    private const string IndeterminateClass = "switch-indeterminate";
}
````

## See Also

* [CheckBox Indeterminate State](slug:checkbox-indeterminate-state)
