---
title: Data Binding
page_title: Scheduler - Data Binding Appointments
description: Data Binding appointments in the Scheduler for Blazor.
slug: scheduler-appointments-databinding
tags: telerik,blazor,scheduler,data,bind,databind,databinding,appointments
published: True
position: 1
components: ["scheduler"]
---

# Scheduler Appointments Data Binding

The Scheduler component is designed to work with a collection of appointments. This article will explain their features and how to define the appointment model, so that the Scheduler recognizes it.

@[template](/_contentTemplates/common/general-info.md#valuebind-vs-databind-link)

In this article:

* [Appointment features and how to implement the Scheduler model](#appointment-features)
* [Built-in validation](#built-in-validation)
* [Example with default property names of the appointment model](#example-with-default-field-names)
* [Example with custom property names](#example-with-custom-field-names)


## Appointment Features

Some of the Scheduler features and behaviors depend directly on values in the appointment items. There are two ways to implement property names in the appointment model:

* Define a model with *default (expected) property names*. In this case, the Scheduler will recognize and use the properties automatically. See [an example with default field names](#example-with-default-field-names).
* Define *custom property names*. In this case, define the property names as parameters of the `<TelerikScheduler>` tag. The parameter names derive from the default property names, for example `IdField`, `TitleField`, `StartField`, etc. See [an example with custom field names](#example-with-custom-field-names).

>tip The Scheduler model can carry additional information in other existing properties, that will be used by your application logic, or in [Scheduler item templates](slug:scheduler-templates-appointment).

The following table lists the default property names and explains how the Scheduler uses these properties. The appointment model needs to provide all properties from the list below, no matter if they have the same names or not.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property Name | Type | Description |
| --- | --- | --- |
| `Id` | `object` | A unique identifier for the appointment. Useful for finding appointments in a collection, and required for recurring appointments. The Scheduler uses it to establish a relationship between a recurring appointment and its exceptions. Must be something that can be uniquely compared, like a `Guid`. |
| `Title` | `string` | The Scheduler displays appointment titles, so users can identify the event. |
| `Description` | `string` | Detailed description of the event. Shown in the edit form. |
| `Start` | `DateTime` | The date and time at which the appointment starts. |
| `End` | `DateTime` | The date and time at which the appointment ends. |
| `IsAllDay` | `bool` | Defines whether the appointment shows in the all-day slot of the applicable view. Such events are not rendered in a specific time interval (slot), but are always shown when their day is visible. |
| `ReadOnly` | `bool` | Defines whether the appointment disables selection, dragging, resizing, and editing. Read-only appointments display in different color. |
| `RecurrenceRule` | `string` | The recurrence rule for a recurring appointment according to the [RFC5545 standard](https://tools.ietf.org/html/rfc5545#section-3.3.10). Present only for a recurring appointment, but not for an exception from it. In the data source, there is only one item that determines a recurring event, and the Scheduler expands it to render the necessary number of appointments in the UI. |
| `RecurrenceExceptions` | `List<DateTime>` | A list of exceptions for a recurring appointment. It tells the Scheduler when to skip rendering a recurring appointment because its instance is explicitly changed or removed (deleted), and so it is an exception to the recurrence rule. **Also see the note below.** |
| `RecurrenceId` | `object` | The unique identifier of the recurring appointment to which the current appointment is an exception. Must be of the same type as the `Id` field (e.g., a `Guid`). Present only for an exception from a recurrence, but not for the recurring appointment itself. |

> Exception dates are relative to the start time of the recurring appointment, and changing the start time of a  recurring appointment (either through the edit form, or by dragging any recurring event) will update the exception dates to match the new start time. This does not affect exception instances that are already created, because they are separate appointments. For example, let's say we have an event that recurs every day - from Monday to Sunday, including. If we create an exception for Tuesday, and change the start time of the entire recurring event to begin on the Wednesday after that, we will have the exception appointment on Tuesday and a gap on Thursday, because the exception date that was initially Tuesday actually matches the second occurrence of the appointment, which is now on Thursday.


##  Built-in Validation

By default, the Scheduler requires that an appointment has:

* title - this is what is rendered for the user to see
* start time - so the scheduler can know where to render it
* end time - so the scheduler can know where it ends

The built-in edit form also enforces that the end time is after the start time.

The Scheduler edit form works with an instance that that the scheduler creates from the provided model from its data source. This means that custom validation rules (attributes) in the model will not be used by the scheduler. To implement custom validation logic, implement a custom edit form. Make sure that the same three fields, at minimum, are required and available in the appointments you store, otherwise errors may be thrown.


## Example with Default Field Names

>caption Data Binding to a model that uses the default field names

<demo metaUrl="client/scheduler/data-bind/example-1/" height="780"></demo>

## Example with Custom Field Names

>caption Data Binding to a model with custom field names

<demo metaUrl="client/scheduler/data-bind/example-2/" height="780"></demo>


## Next Steps

* [Configure Scheduler views](slug:scheduler-views-overview)
* [Enable Scheduler editing](slug:scheduler-appointments-edit)


## See Also

* [Live Demo: Scheduler](https://demos.telerik.com/blazor-ui/scheduler/overview)
