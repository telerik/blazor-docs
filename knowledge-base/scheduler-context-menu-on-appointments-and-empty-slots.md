---
title: Show Context Menu on Scheduler Appointments and on Empty Slots
description: How to use the Context Menu component to add, edit, and delete appointments in Scheduler timeslots.
type: how-to
page_title: How to Show Context Menu on Scheduler Appointments and Empty Time Slots
slug: scheduler-kb-context-menu-on-appointments-and-empty-slots
tags: scheduler, blazor, contextmenu, appointments, empty slots
res_type: kb
ticketid: 1656007
previous_url: /knowledge-base/scheduler-appointment-context-menu
components: ["scheduler"]
---
## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>
                ContextMenu for Blazor,<br />
                Scheduler for Blazor
            </td>
        </tr>
    </tbody>
</table>

## Description

This KB article answers the following questions:

* How to add a [Context menu](slug:contextmenu-overview) to the appointments to provide shortcuts to custom features?
* How to add a Context menu that can be opened anywhere on the scheduler board, not just on appointments?
* Is there any way to get the timeslot of where the Context menu is open?
* How do I add a new appointment at a specific timeslot through the Context menu?

## Solution

To implement a Context menu on appointments and on empty slots in the Scheduler, follow these steps:

1. Use the Scheduler templates to [integrate the Context menu](slug:contextmenu-integration):
    * Use the [Appointment Templates](slug:scheduler-templates-appointment) to enable the Context menu to appear on appointments. 
    * Use the [Slot Templates](slug:scheduler-templates-slot) to enable the Context menu to appear on cells without appointments. 
1. Pass the context of the template in the `@oncontextmenu` event.
1. Use the timeslot or appointment information obtained from the context of the template.
1. Add the desired [Context menu](slug:contextmenu-overview) and create its items, commands and actions as needed.

>caption Different Context menu commands depending on the IsImportant appointment model property
````RAZOR

<TelerikScheduler @ref="@SchedulerRef"
                  Data="@Appointments"
                  @bind-Date="@StartDate"
                  @bind-View="@CurrView"
                  Height="600px">
    <SchedulerViews>
        <SchedulerDayView StartTime="@DayStart">
            <SlotTemplate>
                @{
                    SchedulerSlotTemplateContext emptySlot = (SchedulerSlotTemplateContext)context;
                    <div class="empty-slot-template"
                    @oncontextmenu:preventDefault
                         @oncontextmenu="@( (MouseEventArgs e) => ShowContextMenuFromEmptySlot(e, emptySlot) )">
                    </div>
                }
            </SlotTemplate>
        </SchedulerDayView>
        <SchedulerWeekView StartTime="@DayStart">
            <SlotTemplate>
                @{
                    SchedulerSlotTemplateContext emptySlot = (SchedulerSlotTemplateContext)context;
                    <div class="empty-slot-template"
                         @oncontextmenu:preventDefault="true"
                         @oncontextmenu="@( (MouseEventArgs e) => ShowContextMenuFromEmptySlot(e, emptySlot) )">
                    </div>
                }
            </SlotTemplate>
        </SchedulerWeekView>
        <SchedulerMultiDayView StartTime="@DayStart" NumberOfDays="10">
            <SlotTemplate>
                @{
                    SchedulerSlotTemplateContext emptySlot = (SchedulerSlotTemplateContext)context;
                    <div class="empty-slot-template"
                         @oncontextmenu:preventDefault="true"
                         @oncontextmenu="@( (MouseEventArgs e) => ShowContextMenuFromEmptySlot(e, emptySlot) )">
                    </div>
                }
            </SlotTemplate>
        </SchedulerMultiDayView>
    </SchedulerViews>
    <ItemTemplate>
        @{
            SchedulerAppointment appointment = (SchedulerAppointment)context;
            <div style="height:100%" class="@( appointment.IsImportant ? "important-appt" : "" )"
                 @oncontextmenu:preventDefault="true"
                 @oncontextmenu="@( (MouseEventArgs e) => ShowItemContextMenu(e, appointment) )">
                <div style="height:100%" class="k-event-template">@appointment.Title</div>
            </div>
        }
    </ItemTemplate>
    <AllDayItemTemplate>
        @{
            SchedulerAppointment appointment = (SchedulerAppointment)context;
            <div style="height:100%" class="@( appointment.IsImportant ? "important-appt" : "" )"
                 @oncontextmenu:preventDefault="true"
                 @oncontextmenu="@( (MouseEventArgs e) => ShowItemContextMenu(e, appointment) )">
                <div style="height:100%" class="k-event-template">@appointment.Title</div>
            </div>
        }
    </AllDayItemTemplate>
</TelerikScheduler>

@* ContextMenu for ItemTemplate and AllDayItemTemplate *@
<TelerikContextMenu @ref="@TheItemContextMenuRef"
                    Data="@MenuItems"
                    TextField="@nameof(ContextMenuItem.Text)"
                    IconField="@nameof(ContextMenuItem.Icon)"
                    DisabledField="@nameof(ContextMenuItem.Disabled)"
                    OnClick="@( async (ContextMenuItem item) => await MenuClickItemHandler(item) )">
</TelerikContextMenu>

@* ContextMenu for SlotTemplate *@
<TelerikContextMenu @ref="@TheSlotContextMenuRef"
                    Data="@SlotItems"
                    TextField="@nameof(ContextMenuItem.Text)"
                    IconField="@nameof(ContextMenuItem.Icon)"
                    DisabledField="@nameof(ContextMenuItem.Disabled)"
                    OnClick="@( async (ContextMenuItem slot) => await MenuClickSlotHandler(slot) )">
</TelerikContextMenu>

<style>
    .empty-slot-template {
        display: flex;
        width: 100%;
        height: 100%
    }

    .important-appt {
        color: purple;
        font-weight: bold;
        font-size: 1.5em;
    }
</style>

@code {
    private TelerikScheduler<SchedulerAppointment>? SchedulerRef { get; set; }
    private List<SchedulerAppointment> Appointments { get; set; } = new();
    private DateTime StartDate { get; set; } = DateTime.Today;
    private SchedulerView CurrView { get; set; } = SchedulerView.Week;
    private DateTime DayStart { get; set; } = DateTime.Today;

    private SchedulerAppointment? LastClickedAppointment { get; set; }
    private SchedulerSlotTemplateContext? LastClickedEmptySlot { get; set; }
    private TelerikContextMenu<ContextMenuItem>? TheItemContextMenuRef { get; set; }
    private TelerikContextMenu<ContextMenuItem>? TheSlotContextMenuRef { get; set; }

    private List<ContextMenuItem> MenuItems = new()
        {
            new ContextMenuItem
            {
                Text = "Toggle Important",
                CommandName = "toggleimportant",
                Icon = SvgIcon.Pencil
            },
            new ContextMenuItem
            {
                Text = "Delete",
                CommandName = "delete",
                Icon = SvgIcon.Trash
            }
        };
    private List<ContextMenuItem> SlotItems = new()
        {
            new ContextMenuItem
            {
                Text = "Create appointment",
                CommandName = "create",
                Icon = SvgIcon.Plus
            }
        };

    private async Task ShowItemContextMenu(MouseEventArgs e, SchedulerAppointment appt)
    {
        LastClickedAppointment = appt;
        ToggleItemDisabled(LastClickedAppointment);
        await TheItemContextMenuRef?.ShowAsync(e.ClientX, e.ClientY);
    }

    private void ToggleItemDisabled(SchedulerAppointment appt)
    {
        MenuItems[0].Disabled = appt.IsImportant;
    }

    private async Task MenuClickItemHandler(ContextMenuItem clickedItem)
    {
        if (!string.IsNullOrEmpty(clickedItem.CommandName) && LastClickedAppointment != null)
        {
            switch (clickedItem.CommandName.ToLowerInvariant())
            {
                case "delete":
                    await DeleteAppointment(LastClickedAppointment);
                    break;
                case "toggleimportant":
                    await ToggleAppointmentImportant(LastClickedAppointment);
                    break;
                default:
                    break;
            }
        }
        LastClickedAppointment = null;
    }

    private async Task ToggleAppointmentImportant(SchedulerAppointment appt)
    {
        appt.IsImportant = !appt.IsImportant;
        var index = Appointments.FindIndex(i => i.Id == appt.Id);
        if (index != -1)
        {
            Appointments[index] = appt;
        }
        await Task.Delay(100); // simulate network delay
        SchedulerRef?.Rebind();
    }

    private async Task DeleteAppointment(SchedulerAppointment appt)
    {
        if (appt.IsImportant)
        {
            return;
        }
        Appointments.Remove(appt);
        await Task.Delay(100); // simulate network delay
        SchedulerRef?.Rebind();
    }

    private async Task ShowContextMenuFromEmptySlot(MouseEventArgs e, SchedulerSlotTemplateContext emptySlot)
    {
        LastClickedEmptySlot = emptySlot;
        await TheSlotContextMenuRef?.ShowAsync(e.ClientX, e.ClientY);
    }

    private async Task MenuClickSlotHandler(ContextMenuItem emptySlot)
    {
        if (!string.IsNullOrEmpty(emptySlot.CommandName) && LastClickedEmptySlot != null)
        {
            switch (emptySlot.CommandName.ToLowerInvariant())
            {
                case "create":
                    await CreateAppt(LastClickedEmptySlot);
                    break;
                default:
                    break;
            }
        }
        LastClickedEmptySlot = null;
    }

    private async Task CreateAppt(SchedulerSlotTemplateContext emptySlot)
    {
        var newAppointment = new SchedulerAppointment
            {
                Title = "New appointment",
                IsImportant = false,
                Description = "New appointment created from context menu.",
                Start = emptySlot.Start,
                End = emptySlot.End,
            };
        Appointments.Add(newAppointment);
        await Task.Delay(100); // simulate network delay
        SchedulerRef?.Rebind();
    }

    protected override void OnInitialized()
    {
        Appointments = GenerateData();
    }

    private List<SchedulerAppointment> GenerateData()
    {
        var appointments = new List<SchedulerAppointment>()
        {
            new SchedulerAppointment
            {
                Title = "Vet visit",
                IsImportant = true,
                Description = "The cat needs vaccinations and her teeth checked.",
                Start = DateTime.Today.AddDays(2),
                End = DateTime.Today.AddHours(2).AddMinutes(30),
            },
            new SchedulerAppointment
            {
                Title = "Trip to Hawaii",
                Description = "An unforgettable holiday!",
                IsAllDay = true,
                Start = DateTime.Today.AddDays(-10),
                End = DateTime.Today.AddDays(-2),
            },
            new SchedulerAppointment
            {
                Title = "Jane's birthday party",
                Description = "Make sure to get her fresh flowers in addition to the gift.",
                Start = DateTime.Today.AddDays(5).AddHours(10),
                End = DateTime.Today.AddDays(5).AddHours(18),
            },
            new SchedulerAppointment
            {
                Title = "Brunch with HR",
                Description = "Performance evaluation of the new recruit.",
                Start = DateTime.Today.AddDays(3).AddHours(3),
                End = DateTime.Today.AddDays(3).AddHours(3).AddMinutes(45),
            },
            new SchedulerAppointment
            {
                Title = "Interview with new recruit",
                Description = "See if John will be a suitable match for our team.",
                Start = DateTime.Today.AddDays(3).AddHours(1).AddMinutes(30),
                End = DateTime.Today.AddDays(3).AddHours(2).AddMinutes(30),
            },
            new SchedulerAppointment
            {
                Title = "New Project Kickoff",
                Description = "Everyone assemble! We will also have clients on the call from a later time zone.",
                Start = DateTime.Today.AddDays(3).AddHours(8).AddMinutes(30),
                End = DateTime.Today.AddDays(3).AddHours(11).AddMinutes(30),
            },
            new SchedulerAppointment
            {
                Title = "Get photos",
                Description = "Get the printed photos from last week's holiday. It's on the way from the vet to work.",
                Start = DateTime.Today.AddHours(2).AddMinutes(15),
                End = DateTime.Today.AddHours(2).AddMinutes(30),
            },
            new SchedulerAppointment
            {
               Title = "Conference",
               IsImportant = true,
               Description = "The big important work conference. Don't forget to practice your presentation.",
               Start = DateTime.Today.AddDays(6),
               End = DateTime.Today.AddDays(11),
                    IsAllDay = true,
            }
        };

        return appointments;
    }

    public class ContextMenuItem
    {
        public string Text { get; set; }
        public string CommandName { get; set; }
        public ISvgIcon Icon { get; set; }
        public bool Disabled { get; set; }
    }

    public class SchedulerAppointment
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public bool IsAllDay { get; set; }
        public bool IsImportant { get; set; }

        public SchedulerAppointment()
        {
            this.Id = Guid.NewGuid();
        }
    }
}
````

## See Also
* [Scheduler Overview](slug:scheduler-overview)
* [Scheduler Appointment Templates](slug:scheduler-templates-appointment)
* [Scheduler Slot Templates](slug:scheduler-templates-slot)
* [Context menu Overview](slug:contextmenu-overview)
* [Context menu Integration](slug:contextmenu-integration)