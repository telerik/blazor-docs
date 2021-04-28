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
			<td>DateInput for Blazor, DateTimePicker for Blazor, TimePicker for Blazor, DatePicker for Blazor</td>
		</tr>
	</tbody>
</table>


## Question
Can I use a `DateTimeOffset` field with the Telerik date input and picker?

Do the Telerik DateInput, DatePicker, DateTimePicker, TimePicker support the `DateTimeOffset` type?

## Answer
The Telerik date and time inputs and pickers can work with a `DateTimeOffset` type and with the `DateTime` types. They can also be nullable.

When the `Value` is of type `DateTimeOffset` the Telerik components will use its `.DateTime` field, which matches to the local time, just like with a "simple" `DateTime` object.

For the DatePicker component, see the [Notes](#notes) below

>caption Sample of how the Telerik Date-Time inputs work with a DateTimeOffset

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

### TelerikDatePicker

The TelerikDatePicker component has no time portion and thus using time offsets is not relevant to such UI. Thus, it requires a `DateTime` field. It sets the time to `00:00` hours when choosing a date from it, and you must take that into account when calculating the offset and `DateTimeOffset` object, even when usung the `.Date` or `.DateTime` field of the `DateTimeOffset` object.

The example below shows how you can use the ValueChanged event of the TelerikDatePicker to apply the time portion so that the offset does not alter the dates. While this prevents you from using two-way binding (`@bind-Value`), it will still update the view-model at the same time. You can, of course, use any other suitable logic for your scenario (including creating a separate `DateTime` field in the view-model).

>caption DatePicker with DateTimeOffset - one way to account for the time difference

````
@if (DateEffective != null)
{
    <p>UTC: @DateEffective.UtcDateTime.ToString("dd MMM yyyy, HH:mm:ss")</p>
    <p>Local: @DateEffective.LocalDateTime.ToString("dd MMM yyyy, HH:mm:ss")</p>
    <p>DateTime (used by Telerik components): @DateEffective.DateTime.ToString("dd MMM yyyy, HH:mm:ss")</p>
    <p>Offset (hours): @DateEffective.Offset.Hours</p>
}

<TelerikDatePicker Value="@DateEffective.Date" ValueChanged="@((DateTime d) => UpdateDateTimeOffsetField(d))" Format="d" />

@code{
    DateTimeOffset DateEffective { get; set; }

    void UpdateDateTimeOffsetField(DateTime currDate)
    {
        // Take the current (existing) time portion to add it to the 00:00 hours the date picker will provide
        DateTime currDateWithTime = currDate
            .AddHours(DateEffective.DateTime.Hour)
            .AddMinutes(DateEffective.DateTime.Minute)
            .AddSeconds(DateEffective.DateTime.Second);
        // re-instantiate the DateTimeOffset with the proper time so the offset does not change the date
        DateEffective = new DateTimeOffset(currDateWithTime);
    }

    protected override void OnInitialized()
    {
        DateEffective = new DateTimeOffset(DateTime.Now, new TimeSpan(3, 0, 0));
        base.OnInitialized();
    }
}
````


>caption DatePicker with nullable DateTimeOffset - one way to avoid null reference errors

````CSHTML
@* if you try to directly use the MyDateTimeOffset.Value.Date for the date picker, you can get
null reference exeptions when the struct is null
such as "Nullable object must have a value." - you can reproduce this without Telerik components
so you need to add a field to take care of the conversion. *@

@if (DateTimeReturn != null)
{
    <p>UTC: @DateTimeReturn.Value.UtcDateTime.ToString("dd MMM yyyy, HH:mm:ss")</p>
    <p>Local: @DateTimeReturn.Value.LocalDateTime.ToString("dd MMM yyyy, HH:mm:ss")</p>
    <p>DateTime (used by Telerik components): @DateTimeReturn.Value.DateTime.ToString("dd MMM yyyy, HH:mm:ss")</p>
    <p>Offset (hours): @DateTimeReturn.Value.Offset.Hours</p>
}

<TelerikDatePicker Class="form-control" Value="@DatePickerField"
                       ValueChanged="@((DateTime? d) => DateTimeReturnChanged(d))"></TelerikDatePicker>

@code{
    public System.DateTimeOffset? DateTimeReturn { get; set; }
    DateTime? DatePickerField { get; set; }

    void DateTimeReturnChanged(DateTime? d)
    {
        DatePickerField = d;
        if(DateTimeReturn == null)
        {
            DateTimeReturn = new DateTimeOffset();
        }
        // Take the current (existing) time portion to add it to the 00:00 hours the date picker will provide
        DateTime currDateWithTime = d.Value
            .AddHours(DateTimeReturn.Value.DateTime.Hour)
            .AddMinutes(DateTimeReturn.Value.DateTime.Minute)
            .AddSeconds(DateTimeReturn.Value.DateTime.Second);
        // re-instantiate the DateTimeOffset with the proper time so the offset does not change the date
        DateTimeReturn = new DateTimeOffset(currDateWithTime);

        DateTimeReturn = d;
    }

    protected override void OnInitialized()
    {
        if(DateTimeReturn != null)
        {
            DatePickerField = new DateTime(DateTimeReturn.Value.Date.Year, DateTimeReturn.Value.Date.Month, DateTimeReturn.Value.Date.Day);
        }
        base.OnInitialized();
    }
}
````

