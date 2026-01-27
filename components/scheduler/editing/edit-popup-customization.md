---
title: Edit Popup Customization
page_title: Scheduler - Edit Popup Customization
description: Edit Popup Customization in the Scheduler for Blazor.
slug: scheduler-edit-popup-customization
tags: telerik,blazor,scheduler,edit,popup,customization
published: True
position: 10
components: ["scheduler"]
---
# Edit Popup Customization

The Scheduler allows customization of the edit popup and its form. You can define your desired configuration in the `SchedulerPopupEditSettings` and `SchedulerPopupEditFormSettings` tags under the `SchedulerSettings` tag.

### Popup Customization

The `SchedulerPopupEditSettings` nested tag exposes the following parameters to allow popup customization:

@[template](/_contentTemplates/common/popup-edit-customization.md#popup-settings)

### Edit Form Customization

The `SchedulerPopupEditFormSettings` nested tag exposes the following parameters to allow edit form customization:

@[template](/_contentTemplates/common/popup-edit-customization.md#edit-form-settings)

>caption Customize the popup edit form

````RAZOR
@*The snippet focuses on the popup edit form customization. CRUD events are not handled for brevity*@

<TelerikScheduler Data="@Appointments"
                  @bind-Date="@StartDate"
                  @bind-View="@CurrView"
                  AllowCreate="true"
                  AllowUpdate="true"
                  Height="600px"
                  Width="800px">

    <SchedulerSettings>
        <SchedulerPopupEditSettings Width="600px"
                                    MinWidth="500px"
                                    MaxHeight="99vh"
                                    Title="Edit Event"
                                    Class="custom-popup">
        </SchedulerPopupEditSettings>
        <SchedulerPopupEditFormSettings ButtonsLayout="FormButtonsLayout.Stretch">
        </SchedulerPopupEditFormSettings>
    </SchedulerSettings>
    <SchedulerViews>
        <SchedulerWeekView StartTime="@DayStart" />
    </SchedulerViews>
</TelerikScheduler>

@code {
    public DateTime StartDate { get; set; } = new DateTime(2019, 11, 29);
    public SchedulerView CurrView { get; set; } = SchedulerView.Week;
    public DateTime DayStart { get; set; } = new DateTime(2000, 1, 1, 8, 0, 0);//the time portion is important

    List<SchedulerAppointment> Appointments = new List<SchedulerAppointment>()
    {
            new SchedulerAppointment
            {
                Title = "Vet visit",
                Description = "The cat needs vaccinations and her teeth checked.",
                Start = new DateTime(2019, 11, 26, 11, 30, 0),
                End = new DateTime(2019, 11, 26, 12, 0, 0)
            },

            new SchedulerAppointment
            {
                Title = "Planning meeting",
                Description = "Kick off the new project.",
                Start = new DateTime(2019, 11, 25, 9, 30, 0),
                End = new DateTime(2019, 11, 25, 12, 45, 0)
            },

            new SchedulerAppointment
            {
                Title = "Trip to Hawaii",
                Description = "An unforgettable holiday!",
                IsAllDay = true,
                Start = new DateTime(2019, 11, 27),
                End = new DateTime(2019, 12, 07)
            }
    };

    public class SchedulerAppointment
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public bool IsAllDay { get; set; }
    }
}
````


## See Also

  * [Data Binding](slug:scheduler-appointments-databinding)
  * [Live Demo: Appointment Editing](https://demos.telerik.com/blazor-ui/scheduler/appointment-editing)
  * [Custom Edit Form](https://github.com/telerik/blazor-ui/tree/master/scheduler/custom-edit-form)
