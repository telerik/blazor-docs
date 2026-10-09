---
title: Resources
page_title: Scheduler - Resources
description: Resources in the Scheduler for Blazor.
slug: scheduler-resources
tags: telerik,blazor,scheduler,resources
tag: updated
published: true
position: 30
components: ["scheduler"]
---

# Scheduler Resources

The Scheduler lets you associate appointments with shared resources (such as meeting rooms, people, equipment) and display the appointments in the corresponding resource color. This article describes how to set up the Scheduler and its data to work with resources.

## Basics

Resources are optional. You can define no resources, one type of resource, or multiple types of resources. When the user opens an appointment for editing, they will have a DropDownList for each type of resource.

To use resources:

1. Define a resource class with a name of your choice and `string` properties for the resource name, value, and color. The following snippet uses the default expected property names, which do not require additional Scheduler configuration (`Color`, `Text`, `Value`). You can also use custom names and specify them in each `<SchedulerResource>` definition.
    ````C#.skip-repl
    public class Resource
    {
        public string Color { get; set; } = string.Empty;
        public string Text { get; set; } = string.Empty;
        public string Value { get; set; } = string.Empty;
    }
    ````
1. Define one or more collections of resources.
    ````C#.skip-repl
        private List<Resource> Rooms { get; set; } = new List<Resource>()
            {
                new Resource()
                {
                    Text = "Small Room",
                    Value = "1",
                    Color = "lime"
                },
                new Resource()
                {
                    Text = "Big Room",
                    Value = "2",
                    Color = "orange"
                }
            };
    ````
1. Add a `string` property to the Scheduler model for each resource.
    ````C#.skip-repl
    public class Appointment
    {
        public string Room { get; set; } = string.Empty;
    }
    ````
1. Add one `<SchedulerResource>` tag for each resource type.
    * Set the `Data` parameter to the resource collection of that type.
    * Set the `Field` parameter to the property name for the same resource in the Scheduler model.
    * If the resource class uses custom property names, specify them with the `ColorField`, `TextField`, and `ValueField` parameters.
    ````RAZOR.skip-repl
    <TelerikScheduler>
        <SchedulerResources>
            <SchedulerResource Data="@Rooms"
                               Field="@nameof(Appointment.Room)"
                               Title="Room" />
        </SchedulerResources>
    </TelerikScheduler>
    ````

The resource definition order in the `<SchedulerResources>` collection matters:

* It determines the order of the resource selection dropdowns in the [Scheduler edit form](slug:scheduler-appointments-edit).
* The background color of each appointment depends on the first matched resource.

>tip Other ways to style the appointments are the [`ItemTemplate`](slug:scheduler-templates-appointment) and the [`OnItemRender` event](slug:scheduler-events#onitemrender).

## Example

>caption Using Scheduler resources with default property names

<demo metaUrl="client/scheduler/resources/example-1/" height="800"></demo>

## See Also

* [Live Demo: Scheduler Resources](https://demos.telerik.com/blazor-ui/scheduler/resources)
* [Scheduler Resource Grouping](slug:scheduler-resource-grouping)
* [Scheduler Appointment Editing](slug:scheduler-appointments-edit)
* [Scheduler Data Binding](slug:scheduler-appointments-databinding)
