---
title: Disable Typing in DatePicker Input and Always Use the Calendar 
description: How to disable typing in the Blazor date/time pickers and force users to always use the popup Calendar and TimeView.
type: how-to
page_title: Hide or Disable Typing in the DatePicker Textbox
slug: pickers-kb-readonly-dateinput
position: 
tags: telerik, blazor, datepicker, datetimepicker, timepicker, readonly
ticketid: 1597101, 1619245
res_type: kb
components: ["datepicker", "datetimepicker", "timepicker"]
---
## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>
                DatePicker for Blazor, <br />
                DateTimePicker for Blazor, <br />
                TimePicker for Blazor
            </td>
        </tr>
    </tbody>
</table>


## Description

This how-to article answers the following questions:

* How to disable direct typing in the DatePicker and TimePicker components? I want to restrict users to use only the Calendar and TimeView popups.

* How to force users to pick date and time only from the component popups?

* How to hide the DateTimePicker input textbox and display the selected date on another label?

## Solution

1. Set the `Class` parameter of the DateTimePickers that should be readonly or hidden.
1. Subscribe to the `OnAfterRenderAsync` event of the Razor component, which holds the DateTimePickers.
1. Use `JSInterop` to apply a `readOnly` attribute to the `<input>` elements that are children of an element with the custom CSS class above. Make sure to execute the JavaScript only once, when `firstRender` is `true`. Use a small `Task.Delay()` before making the `JSInterop` call.
1. To hide the DateInput textbox, apply custom CSS styles that reduce its `width` and side `padding` to zero. Set the `opacity` to zero as well.
1. Set the `Width` of the DateTimePickers with a hidden DateInput to `"min-content"`.

>caption Hide the DatePicker DateInput or make it readonly

````RAZOR
@inject IJSRuntime js

<h2>Hidden + ReadOnly DateInput</h2>

<TelerikDatePicker @bind-Value="@DateValue"
                   Format="yyyy-MM-dd"
                   Width="min-content"
                   Class="hidden-dateinput readonly-dateinput" />

@DateValue?.ToShortDateString()

<style>
    .hidden-dateinput input.k-input-inner {
        width: 0;
        opacity: 0;
        padding-left: 0;
        padding-right: 0;
    }
</style>

<h2>ReadOnly DateInputs</h2>

<TelerikDatePicker @bind-Value="@DateValue"
                   Format="yyyy-MM-dd"
                   Width="200px"
                   Class="readonly-dateinput" />

<TelerikTimePicker @bind-Value="@DateValue"
                   Format="HH:mm"
                   Width="200px"
                   Class="readonly-dateinput" />

<TelerikDateTimePicker @bind-Value="@DateValue"
                       Format="yyyy-MM-dd HH:mm"
                       Width="200px"
                       Class="readonly-dateinput" />

@* Move JavaScript to a separate JS file in production *@
<script suppress-error="BL9992">
function makeDateInputsReadOnly() {
    var inputs = document.querySelectorAll(".readonly-dateinput input");
    inputs.forEach( (input) => {
        input.setAttribute("readOnly", true);
    } );
}
</script>

@code {
    DateTime? DateValue { get; set; } = DateTime.Now;

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            // The delay ensures the DateInputs are rendered.
            // The exact duration doesn't matter.
            await Task.Delay(1);

            await js.InvokeVoidAsync("makeDateInputsReadOnly");
        }

        await base.OnAfterRenderAsync(firstRender);
    }
}
````

## Notes

* The picker textbox must be `readonly` and not `disabled` in order to receive focus after date selection. Otherwise the popup Calendar will not close.
* A possible negative side effect is that users will still be able to change the DateInput value through the `Up` and `Down` arrow keys.
* Even though the DateInput textbox is read-only, it will accept programmatic value changes.

## See Also

* [DatePicker Overview](slug:components/datepicker/overview)
* [TimePicker Overview](slug:components/timepicker/overview)
* [DateTimePicker Overview](slug:components/datetimepicker/overview)
