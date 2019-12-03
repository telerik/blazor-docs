#day-views-common-properties
## View Parameters

Generally, the views are designed around the timeframe that they show and the day-based views share some common properties that you will likely have to set to provide a good user experience for the user:

* `StartTime` - this is the first hour that is shown in the view. Defaults to midnight, so if you do not set it to a value close to the start of the working day, the user is likely to see only blank spaces before they scroll down.

* `WorkDayStart` - this is when the working day starts. The work hours have a different background than non-working hours so the user can distinguish them easily. This parameter also influences the "Show Business Hours" toggle.

* `EndTime` - the counterpart to `StartTime` - defines when the full day ends. Defaults to midnight. If you have the day end earlier you can reduce the amount of elements that render, but the user may not see some late appointments.

* `WorkDayStart` - the counterpart to `WorkDayStart` - defines when the working day ends.

* `SlotDuration` - the time span of each major time slot in minutes.

* `SlotDivisions` - the number of partitions in each major time slot.
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

![](images/slot-example.png)
#end