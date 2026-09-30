---
title: Recurrence
page_title: Scheduler Recurrence
description: Learn how to set up the Telerik Scheduler for Blazor to display and edit recurring appointments.
slug: scheduler-recurrence
tags: telerik, blazor, scheduler, recurrence
published: True
position: 7
components: ["scheduler"]
---

# Scheduler Recurrence

The Telerik Scheduler for Blazor supports displaying and editing of recurring appointments and exceptions. This article describes how to:

* Configure the Scheduler for using recurring appointments.
* Define recurrence rules and recurrence exceptions in the Scheduler data.
* Edit recurring appointments and exceptions.
* Handle editing and deleting recurring appointments with the recurrence context.

## Basics

To display recurring appointments in the Scheduler component, the model class must implement [three recurrence-related properties](slug:scheduler-appointments-databinding#appointment-features):

* `RecurrenceRule`
* `RecurrenceExceptions`
* `RecurrenceId`

You can also [define custom property names](slug:scheduler-appointments-databinding#example-with-custom-field-names) through the respective Scheduler parameters:

* `RecurrenceRuleField`
* `RecurrenceExceptionsField`
* `RecurrenceIdField`

A single Scheduler data item defines one series of recurring appointments. Set the `RecurrenceRule` value, according to the [RFC5545 standard](https://tools.ietf.org/html/rfc5545#section-3.3.10), except for a [known discrepancy with extra hyphens in `UNTIL`](https://feedback.telerik.com/blazor/1529000-recurrencerule-does-not-support-the-rfc5545-date-format-like-20210722t000000). Then, if exceptions to the recurrence rule exist:

* Each exception must be a separate data item.
* The `RecurrenceId` property of each exception must be equal to `Id` value of the recurring appointment.
* The `RecurrenceExceptions` property of the recurring appointment must contain the `Start` values of all occurrences, which are exceptions to the recurrence rule. The correct values are the original start `DateTime` values of the occurrences, which would apply if there were no exceptions.

[Telerik UI for Blazor version 15.0.0](https://www.telerik.com/support/whats-new/blazor-ui/release-history/progress-telerik-ui-for-blazor-15-0-0-changelog) introduced a revised built-in recurrence editing UI.

## Example

>caption Bind Scheduler to recurring appointments and recurrence exceptions

<demo metaUrl="client/scheduler/recurrence/example-1/" height="780"></demo>

## Handling Recurring Appointments in CRUD Events

When users edit, update, or delete a recurring appointment, the Scheduler prompts them to choose whether to modify only the current occurrence or the entire series. The `OnEdit`, `OnUpdate`, and `OnDelete` event handlers receive event arguments that include an `EditMode` property. This property indicates the user's choice when interacting with recurring appointments:

* `SchedulerRecurrenceEditMode.Series`&mdash;The user chose to edit or delete the entire series of recurring appointments.
* `SchedulerRecurrenceEditMode.Occurrence`&mdash;The user chose to edit or delete only a single occurrence of the recurring appointment.

### Example

You can use the `EditMode` property to implement different logic based on whether the user is modifying a single occurrence or the entire series.

>caption Handle RecurrenceEditMode in OnUpdate and OnDelete events

<demo metaUrl="client/scheduler/recurrence/example-2/" height="780"></demo>

### Important Considerations

* When the user edits or deletes a single occurrence of a recurring appointment, the Scheduler automatically manages the `RecurrenceExceptions` list and creates exception appointments with the appropriate `RecurrenceId`.
* The `RecurrenceEditMode` property is only relevant when working with recurring appointments. For regular (non-recurring) appointments, this property is not used.
* When creating a new appointment in a time slot that matches a recurring appointment, the user can choose to create an exception or a new independent appointment.

## Recurrence Editor Components

Telerik UI for Blazor provides standalone components that you can use to edit recurring appointments outside the Scheduler or in a [custom Scheduler popup edit form](slug:scheduler-kb-custom-edit-form). [Telerik UI for Blazor version 15.0.0](https://www.telerik.com/support/whats-new/blazor-ui/release-history/progress-telerik-ui-for-blazor-15-0-0-changelog) introduced a revised built-in recurrence editing UI, but the previously exposed standalone recurrence editors continued working as before.

The Telerik Blazor recurrence editor components include:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Component Name | Renders As | Description |
| --- | --- | --- |
| `RecurrenceFrequencyEditor` | Button Group | Defines whether the appointment repeats daily, weekly, monthly, yearly, or never. |
| `RecurrenceIntervalEditor` | Numeric TextBox | Defines whether the appointment repeats in each period (for example, every day), or skips periods (for example, once in three days). |
| `RecurrenceEditor` | Button&nbsp;Group or Radio&nbsp;Group | <ul><li>For weekly frequency, the Recurrence Editor is a Button Group with multiple selection, which allows choosing week days.</li><li>For monthly and yearly frequency, the Recurrence Editor is a combination for DropDownLists and a Numeric TextBox, which allow selecting repetition on specific days or week days.</li></ul> |
| `RecurrenceEndEditor` | Radio&nbsp;Group, Numeric&nbsp;TextBox, Date&nbsp;Picker | Defines if the appointment repeats indefinitely, a number of times, or until a specific date. |

### Parameters

All recurrence editor components expose:

* A `Rule` parameter of type `Telerik.Recurrence.RecurrenceRule` that supports two-way binding.
* A `RuleChanged` event that receives a `RecurrenceRule` argument.
* A `Class` parameter for [styling customizations](slug:themes-override).

In addition:

* The `RecurrenceIntervalEditor` supports an `Id` parameter of type `string`. Use it to set a custom `id` attribute to the Numeric TextBox and the same `for` attribute to the associated **Repeat every** label.
* The `RecurrenceEndEditor` supports an `End` parameter of type `DateTime`. Use it to set a default value for the **End On** Date Picker when there is no `UNTIL` setting in the recurrence rule string.

### Recurrence Rule Type Conversion

Use the following methods to convert from [RFC5545 strings](https://tools.ietf.org/html/rfc5545#section-3.3.10) to `RecurrenceRule` objects and vice-versa:

* The static method `RecurrenceRule.Parse()` to convert from RFC5545 `string` to `RecurrenceRule`.
* The instance method `RecurrenceRule.ToString()` to convert from `RecurrenceRule` to a RFC5545 `string`.

>caption Converting between different recurrence rule formats

````C#.skip-repl
// RFC5545 string
string recurrenceString = "FREQ=WEEKLY;BYDAY=MO,WE,FR";

// Convert to RecurrenceRule
RecurrenceRule recurrenceRule = RecurrenceRule.Parse(recurrenceString);

// Make some changes...

// Convert to RFC5545 string
string newRecurrenceString = recurrenceRule.ToString();
````

### Telerik Form Integration

There are two recommended ways to use the Telerik recurrence editors in a Telerik Form:

* Place each recurrence editor in a separate [Form item `Template`](slug:form-formitems-template). This is the simpler option to set up.
* Place all recurrence editors in a [`<FormItemsTemplate>`](slug:form-formitems-formitemstemplate). This is a more verbose approach, which provides better control over the Form's HTML rendering, layout and styling.

The following examples can serve as a reference for creating [custom Telerik Scheduler edit forms](slug:scheduler-kb-custom-edit-form) with recurrence editing. Using a markup structure that differs from the ones below may produce unexpected layouts.

>caption Using Telerik recurrence editors in separate Form item templates

<demo metaUrl="client/scheduler/recurrence/example-3/" height="780"></demo>

To add the recurrence editors to a `FormItemsTemplate`, follow the same approach as in the example above, but add the following `<FormItemsTemplate>` tag as a child of `<TelerikForm>`.

>caption Using Telerik recurrence editors in a FormItemsTemplate

````RAZOR.skip-repl
<FormItemsTemplate Context="formContext">
    @{
        var formItems = formContext.Items.Cast<IFormItem>().ToList();
    }
    <TelerikFormItemRenderer Item="@( formItems.First(x => x.Field == nameof(Appointment.Title)) )" />
    <TelerikFormItemRenderer Item="@( formItems.First(x => x.Field == nameof(Appointment.Start)) )" />
    <TelerikFormItemRenderer Item="@( formItems.First(x => x.Field == nameof(Appointment.End)) )" />
    <TelerikFormItemRenderer Item="@( formItems.First(x => x.Field == nameof(Appointment.RecurrenceRule)) )" />
    <div class="k-form-field">
        <TelerikRecurrenceFrequencyEditor Rule="@Rule"
                                            RuleChanged="@OnRuleChanged" />
    </div>
    @if (Rule != null)
    {
        <div class="k-form-field">
            <TelerikRecurrenceIntervalEditor Rule="@Rule" />
        </div>
    }
    <div class="k-form-field">
        <TelerikRecurrenceEditor Rule="@Rule"
                                    RuleChanged="@OnRuleChanged" />
    </div>
    @if (Rule != null)
    {
        <div class="k-form-field">
            <TelerikRecurrenceEndEditor Rule="@Rule"
                                        EndDate="@RecurrenceEndDefaultDate" />
        </div>
    }
</FormItemsTemplate>
````

## Next Steps

* [Enable Scheduler Editing](slug:scheduler-appointments-edit)

## See Also

* [Live Demo: Scheduler Recurring Appointments](https://demos.telerik.com/blazor-ui/scheduler/recurring-appointments)
* [Scheduler API Reference](slug:Telerik.Blazor.Components.TelerikScheduler-1)
