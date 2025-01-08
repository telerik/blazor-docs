#format-placeholder

### Format Placeholder

It is possible to set custom strings as placeholders for each date format segment. This feature is available for the following Telerik UI for Blazor components:

* DateInput
* DatePicker
* DateRangePicker
* DateTimePicker
* TimePicker

To set up the `FormatPlaceholder`, use the `<*Component*FormatPlaceholder>` nested tag. It allows you to set format placeholders by using the following parameters:

* `Day`
* `Month`
* `Year`
* `Hour`
* `Minute`
* `Second`
* `Weekday`
* `DayPeriod`

By default, the value for all parameters is `null`, which applies the full format specifier. 

#end

#dateinput-typing-settings
textbox is a [DateInput component](slug://components/dateinput/overview), which provides various parameters to configure the keyboard typing experience. The settings are related to:

* Caret placement;
* Two-digit year values;
* Automatic correction of invalid date segments.

See the [DateInput keyboard documentation](slug://dateinput-keyboard-typing) for details and examples. The same DateInput parameters with the same behavior exist for the
#end

#typing-parameters

### Typing User Experience

The component provides multiple parameters, which control the [caret placement, two-digit year values and the auto-correct behavior of the textbox. See the **DateInput** documentation for details](slug://dateinput-keyboard-typing).

#end
