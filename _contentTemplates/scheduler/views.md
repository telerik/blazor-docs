#day-views-common-properties
## View Parameters

Generally, the views are designed around the timeframe that they show and the day-based views share some common properties that you will likely have to set to provide a good user experience for the user:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Attribute | Type and Default Value | Description |
|----------|----------|----------|
| `EndTime` | `DateTime` | The counterpart to `StartTime` &mdash; defines when the full day ends. Defaults to midnight. If you set the `EndTime` earlier than midnight, you reduce the elements that render, but the user may not see late appointments.
| `HideAllDayRow` | `bool` | Determines whether to render the row for all-day appointments. If set to `true`, this row will be hidden.
| `SlotDivisions` |`int` | The number of partitions in each major time slot.
| `SlotDuration` | `int` | The time span of each major time slot in minutes.
| `StartTime` | `DateTime` | The first hour displayed in the view. Defaults to midnight. If not set to a value close to the start of the working day, the view may show blank spaces before scrolling down.
|`WorkDayEnd` | `DateTime` | The counterpart to `WorkDayStart` &mdash; defines when the working day ends.
| `WorkDayStart` | `DateTime` | The start time of the working day; differentiates work hours with a distinct background for easy identification. Influences the **Show Business Hours** toggle.
#end

#visible-times-tip
If there are appointments outside of the defined visible time the user will not be able to see them. For most cases where the working day is subject to scheduling this may not be a problem, but if your users need to manage night shifts or irregular work hours, you may want to have a longer day rendered, or to bind the value to a time picker so the user can alter it themselves.
#end

#day-slots-explanation
### Slots

Views that show hours let you control their precision through the `SlotDuration` and `SlotDivisions` parameters:

1. `SlotDuration` - the time span of each major time slot in minutes.
1. `SlotDivisions` - the number of partitions in each major time slot.

>caption Figure: Slots explanation

![Blazor Slot Example](images/slot-example.png)
#end
