---
title: Keyboard Typing
page_title: DateInput - Keyboard Typing User Experience
description: Blazor Date Input Configuration for efficient and fast keyboard typing.
slug: dateinput-keyboard-typing
tags: telerik,blazor,DateInput,efficient,keyboard,input
published: true
previous_url: /components/dateinput/efficient-keyboard-input
position: 3
---

# DateInput Keyboard Typing

This article describes the parameters, which affect the typing user experience in the Date Input textbox.

The settings control the following component behaviors:

* Caret move from one date format segment to the next;
* Handling of two-digit year values;
* Automatic correction of invalid date segments.


## Summary

The table below provides a quick reference to the relevant parameters. For more detailed descriptions and [example](#example), check the sections below.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default Value | Description |
|---|---|---|
| [`AllowCaretMode`](#allowcaretmode) | `bool` | Sets if the users should see a **blinking caret** inside the Date Input when possible. |
| [`AutoCorrectParts`](#autocorrectparts) | `bool` <br /> (`true`) | Sets if the Date Input should **change the value of invalid segments automatically**. |
| [`AutoSwitchKeys`](#autoswitchkeys) | `List<object>` | The custom keys, which will **move the focus to the next date format segment**. |
| [`AutoSwitchParts`](#autoswitchparts) | `bool` <br /> (`true`) | Sets if the caret will **move automatically to the next date format segment** when the user completes the current one. |
| [`TwoDigitYearMax`](#twodigityearmax) | `int` <br /> (`68`) | The maximum year value that is considered part of the **current century**. |


## AllowCaretMode

`AllowCaretMode` sets if the users should see a **blinking caret** inside the Date Input, when possible. It's `false` by default.

* When `false`, one date format segment is fully selected (highlighted) and there is no visible caret.
* When `true`, users will see the caret when a date segment is partially complete, or when [`AutoSwitchParts`](#autoswitchparts) is `false`.

See the [example](#example) below.


## AutoCorrectParts

`AutoCorrectParts` sets if the Date Input should **change the value of invalid segments automatically**. It's `true` by default. For example, if the value is `January 31` and the user changes the month to `February`, the component will auto-correct the day to `28`.

* When `true`, the component will not allow the user to input an invalid date when using the arrow keys to increment and decrement the segment values.
* When `false`, the component will allow the user to enter an invalid date and will show its invalid styling to hint the user to auto-correct the value on their own.

See the [example](#example) below.


## AutoSwitchKeys

`AutoSwitchKeys` lists the keyboard keys, which will **move the focus to the next date format segment**. By default, this list is empty.

The left and right arrows always change the focused segment, regardless of this parameter value.

To define `Tab` as an auto-switch key, use its key name `"tab"`. Note that this may be unexpected for some keyboard users.

````RAZOR.skip-repl
<TelerikDateInput AutoSwitchKeys="@( new List<object>() { "/", "tab" } )" />
````

See the [complete example](#example) below.


## AutoSwitchParts

`AutoSwitchParts` sets if the caret will **move automatically to the next date format segment** when the user completes the current one. It's `true` by default.

* When `true`, the caret will **not** move for days and months if the segment value is equal to `1` or `2`, because the value may not be complete yet. In this case, the user should press an arrow key or an "auto switch key" to advance.
* When `false`, the user should always advance to the next segment manually with the arrow keys or any of the `AutoSwitchKeys`.

See the [example](#example) below.


## TwoDigitYearMax

This setting applies only to scenarios with a **two-digit year `Format` (`yy`)**.

`TwoDigitYearMax` defines the maximum year value that is considered part of the **current century**. The default value is `68`.

For example, a user input of `68` will be treated as `2068`, but `69` will be treated as `1969`. The parameter supports both two-digit or four-digit integers.

* To allow only years from the *current century*, set to `100`.
* To allow only years from the *previous century*, set to `0`.

> The user *cannot* enter a year through the keyboard, which violates the above logic. If this contradicts the application requirements, then use a **four-digit year** in the date format. Users may be able to select any year from the Calendar popup (when using a DatePicker). However, the application and component configuration should not allow such discrepancy between keyboard and mouse capabilities. The latter may confuse users or lead to unexpected component value.


## Example

The following example lets you experiment with the Date Input typing settings. It starts with the default component behavior, except for `AutoSwitchKeys`.

>caption Configure the DateInput typing experience

````RAZOR
<ul>
    <li><label> <TelerikCheckBox @bind-Value="@AllowCaretMode" /> AllowCaretMode </label></li>
    <li><label> <TelerikCheckBox @bind-Value="@AutoCorrectParts" /> AutoCorrectParts </label></li>
    <li><label> <TelerikCheckBox @bind-Value="@AutoSwitchParts" /> AutoSwitchParts </label></li>

    <li>
        <label>
            <TelerikNumericTextBox @bind-Value="@TwoDigitYearMax" Min="0" Max="100" Width="80px" />
            TwoDigitYearMax (0 - 100)
        </label>
    </li>

    <li>
        AutoSwitchKeys:
        @foreach (var key in AutoSwitchKeys)
        {
            <text> &nbsp; '@key' </text>
        }
    </li>
</ul>

<TelerikDateInput @bind-Value="@DateValue"
                  AllowCaretMode="@AllowCaretMode"
                  AutoCorrectParts="@AutoCorrectParts"
                  AutoSwitchKeys="@AutoSwitchKeys"
                  AutoSwitchParts="@AutoSwitchParts"
                  TwoDigitYearMax="@TwoDigitYearMax"
                  Format="yy-MM-dd HH:mm:ss"
                  Width="200px" />

<p>DateValue: @DateValue.ToString("yyyy-MM-dd HH:mm:ss")</p>

@code {
    private DateTime DateValue { get; set; } = DateTime.Now;

    private bool AllowCaretMode { get; set; } = false;
    private bool AutoCorrectParts { get; set; } = true;
    private List<object> AutoSwitchKeys { get; set; } = new List<object>() { ".", ",", "/", "-", ":", " " };
    private bool AutoSwitchParts { get; set; } = true;
    private int TwoDigitYearMax { get; set; } = 68;
}
````


## Notes

There are many user experience patterns and ways that users want to input dates, considering that there are many date formats. The existing typing settings provide flexibility and efficiency for multiple scenarios and preferences. There may be some users in your user base that seek a slightly different experience. It is impractical to handle all possible scenarios, so we have chosen what we believe will work best for the majority of people.


## Next Steps

* [Set Date Input format](slug:components/dateinput/supported-formats)
* [Customize the Date Input appearance](slug:dateinput-appearance)
* [Handle Date Input events](slug:components/dateinput/events)


## See Also

* [Live Demo: Date Input](https://demos.telerik.com/blazor-ui/dateinput/overview)
* [DateInput Overview](slug:components/dateinput/overview)
