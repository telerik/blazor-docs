#format-placeholder

## Format Placeholder

The `FormatPlaceholder` parameter allows you to set custom strings as placeholders for each DateTime segment and is available for the following Telerik UI for Blazor components:

* DateInput
* DatePicker
* DateTimePicker
* DateRangePicker
* TimePicker

To set up the `FormatPlaceholder`, you should use the `<*Component*FormatPlaceholder>` nested tag. It allows you to set format placeholders by using the following parameters:

* `Day`
* `Month`
* `Year`
* `Hour`
* `Minute`
* `Second`
* `Weekday`

By default the value for all parameters would be `null`, the full format specifier for would be applied. 

>caption Provide a custom string to the day, month, and year segments

````CSHTML
@* Provide custom rendering of the day, month, and year segments *@

<TelerikDatePicker @bind-Value="@DateValue">
    <DatePickerFormatPlaceholder Day="Day"
                                 Month="Month"
                                 Year="YEAR">
    </DatePickerFormatPlaceholder>
</TelerikDatePicker>

@code {
    public DateTime? DateValue { get; set; }
}
````

#end
