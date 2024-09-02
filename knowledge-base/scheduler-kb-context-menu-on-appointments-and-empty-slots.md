---
title: Manage Appointments via Context Menu in the Scheduler
description: How to use the context menu to add, edit, delete appointments in specific timeslots in the Scheduler.
type: how-to
page_title: How to Add Appointments on Empty Slot in the Scheduler Using the ContextMenu. How to Add ContextMenu on Appointment in the Scheduler.
slug: scheduler-kb-context-menu-on-appointments-and-empty-slots
tags: scheduler, blazor, contextmenu, appointments, empty slots
res_type: kb
ticketid: 1656007
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

* How to add a [Context menu]({%slug contextmenu-overview%}) to the appointments to provide shortcuts to custom features?
* How to add a Context menu that can be opened anywhere on the scheduler board, not just on appointments? 
* Is it possible to get the timeslot information where the Context menu is opened?
* How do I add a new appointment at a specific timeslot through the Context menu?

## Solution

To implement a Context menu on appointments and on empty slots in the Scheduler, follow these steps:

1. Use the Scheduler templates to [integrate the Context menu]({%slug contextmenu-integration%}) with them:
* Use the [Appointment Templates]({%slug scheduler-templates-appointment%}) to enable the Context menu to appear on appointments. 
* Use the [Slot Templates]({%slug scheduler-templates-slot%}) to enable the Context menu to appear on cells without appointments. 
2. Pass the context of the template in the `@oncontextmenu` event.
3. Utilize the timeslot or appointment information obtained from the context of the template.
4. Add the desired Context menu and create its items, commands and actions as needed.

````CSHTML
Because of the IsImportant flags set in the appointment models, you cannot delete the "Conference" and "Vet Visit" and the newly created appointments.
This is reflected in the context menu options for them to showcase sample logic for altering its items.

<TelerikScheduler @ref="@SchedulerRef"
                  Data="@Appointments"
                  @bind-Date="@StartDate"
                  Height="600px"
                  @bind-View="@CurrView">
    <SchedulerViews>
        <SchedulerDayView StartTime="@DayStart">
            <SlotTemplate>
                @{
                    SchedulerSlotTemplateContext EmptySlot = (SchedulerSlotTemplateContext)context;
                    <div style="display:flex; width: 100%; height:100%"
                         @oncontextmenu:preventDefault="true"
                         @oncontextmenu="@( (MouseEventArgs e) => ShowContextMenuFromEmptySlot(e, EmptySlot) )">
                    </div>
                }
            </SlotTemplate>
        </SchedulerDayView>
        <SchedulerWeekView StartTime="@DayStart">
            <SlotTemplate>
                @{
                    SchedulerSlotTemplateContext EmptySlot = (SchedulerSlotTemplateContext)context;
                    <div style="display:flex; width: 100%; height:100%"
                         @oncontextmenu:preventDefault="true"
                         @oncontextmenu="@( (MouseEventArgs e) => ShowContextMenuFromEmptySlot(e, EmptySlot) )">
                    </div>
                }
            </SlotTemplate>
        </SchedulerWeekView>
        <SchedulerMultiDayView StartTime="@DayStart" NumberOfDays="10">
            <SlotTemplate>
                @{
                    SchedulerSlotTemplateContext EmptySlot = (SchedulerSlotTemplateContext)context;
                    <div style="display:flex; width: 100%; height:100%"
                         @oncontextmenu:preventDefault="true"
                         @oncontextmenu="@( (MouseEventArgs e) => ShowContextMenuFromEmptySlot(e, EmptySlot) )">
                    </div>
                }
            </SlotTemplate>
        </SchedulerMultiDayView>
    </SchedulerViews>
    <ItemTemplate>
        @{
            SchedulerAppointment Appointment = (SchedulerAppointment)context;
            <div style="height:100%" class="@( Appointment.IsImportant ? "important-appt" : "" )"
                 @oncontextmenu:preventDefault="true"
                 @oncontextmenu="@( (MouseEventArgs e) => ShowItemContextMenu(e, Appointment) )">
                <div style="height:100%" class="k-event-template">@Appointment.Title</div>
            </div>
        }
    </ItemTemplate>
    <AllDayItemTemplate>
        @{
            SchedulerAppointment Appointment = (SchedulerAppointment)context;
            <div style="height:100%" class="@( Appointment.IsImportant ? "important-appt" : "" )"
                 @oncontextmenu:preventDefault="true"
                 @oncontextmenu="@( (MouseEventArgs e) => ShowItemContextMenu(e, Appointment) )">
                <div style="height:100%" class="k-event-template">@Appointment.Title</div>
            </div>
        }
    </AllDayItemTemplate>
</TelerikScheduler>

@* ContextMenu for ItemTemplate and AllDayItemTemplate *@
<TelerikContextMenu @ref="@TheItemContextMenu"
                    Data="@MenuItems"
                    TextField="Text"
                    IconField="Icon"
                    DisabledField="Disabled"
                    OnClick="@( async (ContextMenuItem itm) => await MenuClickItemHandler(itm) )">
</TelerikContextMenu>

@* ContextMenu for SlotTemplate *@
<TelerikContextMenu @ref="@TheSlotContextMenu"
                    Data="@MenuSlots"
                    TextField="Text"
                    IconField="Icon"
                    DisabledField="Disabled"
                    OnClick="@( async (ContextMenuItem itm) => await MenuClickSlotHandler(itm) )">
</TelerikContextMenu>

<style>
    .important-appt {
        color: purple;
        font-weight: bold;
        font-size: 1.5em;
    }
</style>

@code {
    private TelerikScheduler<SchedulerAppointment> SchedulerRef { get; set; }
    private List<SchedulerAppointment> Appointments { get; set; } = new List<SchedulerAppointment>();
    private DateTime StartDate { get; set; } = DateTime.Today;
    private SchedulerView CurrView { get; set; } = SchedulerView.Week;
    private DateTime DayStart { get; set; } = DateTime.Today;

    private SchedulerAppointment LastClickedAppointment { get; set; }
    private SchedulerSlotTemplateContext LastClickedEmptySlot { get; set; }
    private TelerikContextMenu<ContextMenuItem> TheItemContextMenu { get; set; }
    private TelerikContextMenu<ContextMenuItem> TheSlotContextMenu { get; set; }

    private List<ContextMenuItem> MenuItems = new List<ContextMenuItem>()
        {
            new ContextMenuItem
            {
                Text = "Delete",
                CommandName = "delete",
                Icon = SvgIcon.X
            },
            new ContextMenuItem
            {
                Text = "Toggle Important",
                CommandName = "toggleimportant",
                Icon = SvgIcon.Pencil
            }
        };
    private List<ContextMenuItem> MenuSlots = new List<ContextMenuItem>()
        {
            new ContextMenuItem
            {
                Text = "Create appointment",
                CommandName = "create",
                Icon = SvgIcon.File
            }
        };

    //handle ContextMenu for Item
    private async Task ShowItemContextMenu(MouseEventArgs e, SchedulerAppointment appt)
    {
        LastClickedAppointment = appt;
        PrepareMenuItems(LastClickedAppointment);
        await TheItemContextMenu.ShowAsync(e.ClientX, e.ClientY);
    }

    private void PrepareMenuItems(SchedulerAppointment appt)
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
                    await DeleteAppt(LastClickedAppointment);
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

    private async Task DeleteAppt(SchedulerAppointment appt)
    {
        if (appt.IsImportant)
        {
            return;
        }
        Appointments.Remove(appt);
        await Task.Delay(100);
        SchedulerRef.Rebind();
    }

    private async Task ToggleAppointmentImportant(SchedulerAppointment appt)
    {
        appt.IsImportant = !appt.IsImportant;
        var index = Appointments.FindIndex(i => i.Id == appt.Id);
        if (index != -1)
        {
            Appointments[index] = appt;
        }
        await Task.Delay(100);
        SchedulerRef.Rebind();
    }

    //handle ContextMenu for Slot
    private async Task ShowContextMenuFromEmptySlot(MouseEventArgs e, SchedulerSlotTemplateContext emptySlot)
    {
        LastClickedEmptySlot = emptySlot;
        await TheSlotContextMenu.ShowAsync(e.ClientX, e.ClientY);
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
        await Task.Delay(100);
        SchedulerRef.Rebind();
    }

    //generate data
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
