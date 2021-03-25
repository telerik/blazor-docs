---
title: Select AM/PM by pressing A or P on keyboard
description: How to select AM/PM by pressing A or P on keyboard in TimePicker, DateTimePicker and DateInput
type: how-to
page_title: Select AM/PM by pressing A or P on keyboard
slug: date-input-kb-select-am-pm-on-keypress
position:
tags:
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>TimePicker for Blazor, DateTimePicker for Blazor, DateInput for Blazor</td>
		</tr>
	</tbody>
</table>


## Description

When typing in time in the TimePicker/DateTimePicker (enter hours,enter mins, arrow up/down for AM/PM) it would be nice if I could select AM or PM by pressing A or P on the keyboard also.

When using the DateInput component and using format "hh:mm:ss tt" the UI part allows me to edit the hour minute seconds correctly, but the AM / PM is not editable by typing A or P.  Only changes the AM/PM by using up arrow and down arrow on keyboard.  

Any way to make the AM/PM change the way the hh mm ss does by directly entering A or P?


## Solution

While A and P might be very common symbols, there are many other symbols that might be used in different countries and cultures. Thus, the component cannot track all such possible combinations, and it exposes the Up and Down Arrows as options to change the time segments, including the AM/PM indicator.

In order to change AM/PM by pressing A or P on keyboard you can get the input events such as keydown. They are not built-in in the component, because exposing so many events like that will be a major performance hit for a small percentage of people who need them. However, you can capture them as they bubble up the DOM in a parent element, as described in this article - [Capture input keyboard events]({%slug inputs-kb-handle-keyboard-events%}).

If you detect an A or P key you could change the Value as desired (e.g., add or subtract 12 hours depending on the current hours).


>caption TimePicker - Select AM/PM by pressing A or P on keyboard

````CSHTML
@* Press A or P on keyboard to select AM or PM*@

@TheTime
<br />

<span @onkeydown="@OnKeyDownHandler">
    <TelerikTimePicker Format="hh:mm:ss tt" @bind-Value="@TheTime"></TelerikTimePicker>
</span>
@code{
    DateTime TheTime { get; set; } = DateTime.Now;

    async Task OnKeyDownHandler(KeyboardEventArgs e)
    {
        if (e.Key.ToLowerInvariant() == "p" && TheTime.Hour < 12)
        {
            await Task.Delay(20);
            TheTime = TheTime.AddHours(12);
        }
        if (e.Key.ToLowerInvariant() == "a" && TheTime.Hour > 12)
        {
            await Task.Delay(20);
            TheTime = TheTime.AddHours(-12);
        }
    }
}
````



>caption DateTimePicker - Select AM/PM by pressing A or P on keyboard

````CSHTML
@* Press A or P on keyboard to select AM or PM*@

@TheDateTime
<br />

<span @onkeydown="@OnKeyDownHandler">
    <TelerikDateTimePicker Width="210px" Format="dd MMM yyyy hh:mm:ss tt" @bind-Value="@TheDateTime"></TelerikDateTimePicker>
</span>
@code{
    DateTime TheDateTime { get; set; } = DateTime.Now;

    async Task OnKeyDownHandler(KeyboardEventArgs e)
    {
        if (e.Key.ToLowerInvariant() == "p" && TheDateTime.Hour < 12)
        {
            await Task.Delay(20);
            TheDateTime = TheDateTime.AddHours(12);
        }
        if (e.Key.ToLowerInvariant() == "a" && TheDateTime.Hour > 12)
        {
            await Task.Delay(20);
            TheDateTime = TheDateTime.AddHours(-12);
        }
    }
}
````



>caption DateInput - Select AM/PM by pressing A or P on keyboard

````CSHTML
@* Press A or P on keyboard to select AM or PM*@

@TheTime
<br />

<span @onkeydown="@OnKeyDownHandler">
    <TelerikDateInput Format="hh:mm:ss tt" @bind-Value="@TheTime"></TelerikDateInput>
</span>
@code{
    DateTime TheTime { get; set; } = DateTime.Now;

    async Task OnKeyDownHandler(KeyboardEventArgs e)
    {
        if (e.Key.ToLowerInvariant() == "p" && TheTime.Hour < 12)
        {
            await Task.Delay(20);
            TheTime = TheTime.AddHours(12);
        }
        if (e.Key.ToLowerInvariant() == "a" && TheTime.Hour > 12)
        {
            await Task.Delay(20);
            TheTime = TheTime.AddHours(-12);
        }
    }
}
````

