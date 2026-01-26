---
title: Events
page_title: Filter - Events
description: Discover the Blazor Filter events and explore the examples.
slug: filter-events
tags: telerik,blazor,filter,events,event
published: true
position: 11
components: ["filter"]
---
# Filter Events

This article explains the available events for the Telerik Filter for Blazor:

* [OnUpdate](#onupdate)

## OnUpdate

The `OnUpdate` event fires when the user changes the Filter `Value`. The component is designed for one-way binding and works directly with the object reference of the bound `CompositeFilterDescriptor`. The component updates the `Value` internally. Use the `OnUpdate` event to handle any additional logic when the Filter `Value` is modified.

>caption Handle OnUpdate

````RAZOR
@using Telerik.DataSource

<div class="info-note">Change any filter value to trigger the event and see the message update from the OnUpdate handler.</div>

<TelerikFilter Value="@Value" OnUpdate="@OnFilterUpdate">
    <FilterFields>
        <FilterField Name="@(nameof(Person.EmployeeId))" Type="@(typeof(int))" Label="Id"></FilterField>
        <FilterField Name="@(nameof(Person.Name))" Type="@(typeof(string))" Label="First Name"></FilterField>
        <FilterField Name="@(nameof(Person.AgeInYears))" Type="@(typeof(int))" Label="Age"></FilterField>
    </FilterFields>
</TelerikFilter>
<br />
<div>
    <strong>@EventMessage</strong>
</div>

<style>
    .info-note {
        background: #e6f4ff;
        padding: 10px;
        border-radius: 4px;
        margin-bottom: 10px;
        width: 400px;
    }
</style>

@code {
    private CompositeFilterDescriptor Value { get; set; } = new CompositeFilterDescriptor();
    private string EventMessage { get; set; } = string.Empty;

    private void OnFilterUpdate()
    {
        EventMessage = $"Filter updated at {DateTime.Now:HH:mm:ss}";
    }

    public class Person
    {
        public int EmployeeId { get; set; }
        public string Name { get; set; } = string.Empty;
        public int AgeInYears { get; set; }
    }
}
````

## See Also

  * [Live Demo: Filter](https://demos.telerik.com/blazor-ui/filter/overview)