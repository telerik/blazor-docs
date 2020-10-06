---
title: Date Inputs and Pickers with DateTimeOffset
description: How the Telerik Date Inputs and Pickers work with the DateTimeOffset type
type: how-to
page_title: Date Inputs and Pickers with DateTimeOffset
slug: date-input-picker-kb-datetimeoffset
position: 
tags: 
ticketid: 1462128
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>DatePicker for Blazor, DateInput for Blazor, DateTimePicker for Blazor, TimePicker for Blazor</td>
		</tr>
	</tbody>
</table>


## Question
Can I use a `DateTimeOffset` field with the Telerik date input and picker?

Do the Telerik DateInput, DatePicker, DateTimePicker, TimePicker support the `DateTimeOffset` type?

## Answer
The Telerik date and time inputs and pickers can work with a `DateTimeOffset` type and with the `DateTime` types. They can also be nullable.

When the `Value` is of type `DateTimeOffset` the Telerik components will use its `.DateTime` field, which matches to the local time, just like with a "simple" `DateTime` object.

>caption Sample of how the Telerik Date and Time inputs work with a DateTimeOffset

````CSHTML
@if(TheValue != null)
{
    <p>UTC: @TheValue.UtcDateTime.ToString("dd MMM yyyy, HH:mm:ss")</p>
    <p>Local: @TheValue.LocalDateTime.ToString("dd MMM yyyy, HH:mm:ss")</p>
    <p>DateTime (used by Telerik components): @TheValue.DateTime.ToString("dd MMM yyyy, HH:mm:ss")</p>
    <p>Offset (hours): @TheValue.Offset.Hours</p>
}

<TelerikDateInput @bind-Value="@TheValue" Format="F" Width="400px" />

<br /><br />

<TelerikDateTimePicker @bind-Value="@TheValue" Format="F" Width="400px" />

@code{
    DateTimeOffset TheValue { get; set; }

    protected override void OnInitialized()
    {
        // this is where you set the desired time zone and offset
        // You can add the necessary business logic here or in separate fields
        TheValue = new DateTimeOffset(DateTime.Now, new TimeSpan(3, 0 , 0));

        base.OnInitialized();
    }
}
````

## Notes

It is up to the application logic to initialize that field with the suitable offset according to the user settings, current timezone or other business logic. UI for choosing a time zone and offsets, if needed, is also up to the application and is not offered as part of the Telerik Date and Time inputs and pickers.

You can find some examples of working with `DateTime` and `DateTimeOffset` objects in the following articles from MSDN:

* [Instantiating a DateTimeOffset object](https://docs.microsoft.com/en-us/dotnet/standard/datetime/instantiating-a-datetimeoffset-object#datetimeoffset-constructors)

* [Converting between DateTime and DateTimeOffset](https://docs.microsoft.com/en-us/dotnet/standard/datetime/converting-between-datetime-and-offset)

* [DateTimeOffset Struct](https://docs.microsoft.com/en-us/dotnet/api/system.datetimeoffset?view=netcore-3.1)

