---
title: MultiDay
page_title: Scheduler for Blazor | MultiDay View
description: MultiDay View in the Scheduler for Blazor
slug: scheduler-views-multiday
tags: telerik,blazor,scheduler,view,multiday
published: True
position: 1
---

# MultiDay View

The MultiDay view of the Scheduler for Blazor shows several days at once to the user.

The `Date` parameter of the scheduler controls which is the first rendered date, and the `NumberOfDays` parameter of the View controls how many days will be rendered.

In this article:

* [Example](#example)
* [View Parameters](#view-parameters)
	* [Slots](#slots)

>caption Figure: MultiDay View in the scheduler

![](images/multiday-view-sample.png)

## Example

>caption Declare the MultiDay View in the markup

>tip You can declare other views as well, this example adds only the multiday view for brevity.


````CSHTML
@* Define the multiday view. The screenshot above is the result from this code snippet *@

<TelerikScheduler Data="@Appointments" @bind-Date="@StartDate" Height="600px"
                  StartField="@(nameof(SchedulerAppointment.StartTime))"
                  EndField="@(nameof(SchedulerAppointment.EndTime))"
                  TitleField="@(nameof(SchedulerAppointment.Title))"
                  DescriptionField="@(nameof(SchedulerAppointment.Description))"
                  IsAllDayField="@(nameof(SchedulerAppointment.IsAllDay))">
    <SchedulerViews>
        <SchedulerMultiDayView StartTime="@DayStart" EndTime="@DayEnd" WorkDayStart="@WorkDayStart" WorkDayEnd="@WorkDayEnd" NumberOfDays="10" />
    </SchedulerViews>
</TelerikScheduler>

@code {
    public DateTime StartDate { get; set; } = new DateTime(2019, 11, 29);
    public SchedulerView CurrView { get; set; } = SchedulerView.Day;
    //the time portions are important
    public DateTime DayStart { get; set; } = new DateTime(2000, 1, 1, 8, 0, 0);
    public DateTime DayEnd { get; set; } = new DateTime(2000, 1, 1, 20, 0, 0);
    public DateTime WorkDayStart { get; set; } = new DateTime(2000, 1, 1, 9, 0, 0);
    public DateTime WorkDayEnd { get; set; } = new DateTime(2000, 1, 1, 17, 0, 0);
    List<SchedulerAppointment> Appointments = new List<SchedulerAppointment>()
    {
            new SchedulerAppointment
            {
                Title = "Board meeting",
                Description = "Q4 is coming to a close, review the details.",
                StartTime = new DateTime(2019, 12, 5, 10, 00, 0),
                EndTime = new DateTime(2019, 12, 5, 11, 30, 0)
            },

            new SchedulerAppointment
            {
                Title = "Vet visit",
                Description = "The cat needs vaccinations and her teeth checked.",
                StartTime = new DateTime(2019, 11, 29, 11, 30, 0),
                EndTime = new DateTime(2019, 11, 29, 12, 0, 0)
            },

            new SchedulerAppointment
            {
                Title = "Planning meeting",
                Description = "Kick off the new project.",
                StartTime = new DateTime(2019, 12, 6, 9, 30, 0),
                EndTime = new DateTime(2019, 12, 6, 12, 45, 0)
            },

            new SchedulerAppointment
            {
                Title = "Trip to Hawaii",
                Description = "An unforgettable holiday!",
                IsAllDay = true,
                StartTime = new DateTime(2019, 11, 27),
                EndTime = new DateTime(2019, 12, 05)
            }
    };

    public class SchedulerAppointment
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public bool IsAllDay { get; set; }
    }
}
````


@[template](/_contentTemplates/scheduler/views.md#day-views-common-properties)

@[template](/_contentTemplates/scheduler/views.md#day-slots-explanation)


## See Also

  * [Views]({%slug scheduler-views-overview%})
  * [Navigation]({%slug scheduler-navigation%})
  * [Live Demo: Scheduler MultiDay View](https://demos.telerik.com/blazor-ui/scheduler/multiday-view)
  
