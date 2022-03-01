---
title: Events
page_title: Filter - Events
description: Discover the Blazor Filter events and explore the examples.
slug: filter-events
tags: telerik,blazor,filter,events,event
published: true
position: 11
---

# Filter Events

This article explains the available events for the Telerik Filter for Blazor:

* [ValueChanged](#valuechanged)

## ValueChanged

The `ValueChanged` event fires when the value has changed. Its event handler receives the updated `CompositeFilterDescriptor` as an argument.

>caption Handle ValueChanged.

````CSHTML
@* This code snippet showcases an example of how to handle the ValueChanged event. *@

@using Telerik.DataSource

<TelerikFilter Value="@Value" ValueChanged="@OnValueChanged">
    <FilterFields>
        <FilterField Name="@(nameof(Person.EmployeeId))" Type="@(typeof(int))" Label="Id"></FilterField>
        <FilterField Name="@(nameof(Person.Name))" Type="@(typeof(string))" Label="First Name"></FilterField>
        <FilterField Name="@(nameof(Person.AgeInYears))" Type="@(typeof(int))" Label="Age"></FilterField>
        <FilterField Name="@(nameof(Person.IsOutOfOffice))" Type="@(typeof(bool))" Label="Out Of Office"></FilterField>
        <FilterField Name="@(nameof(Person.HireDate))" Type="@(typeof(DateTime))" Label="Hire Date"></FilterField>
    </FilterFields>
</TelerikFilter>

<div>
    <strong>ValueChanged triggered count: </strong> @TriggeredValueChangedCount

    <div class="log-container">
        List of applied filters:
        @compositeFilterDescriptorFragment(Value)
    </div>
</div>

@code {
    public CompositeFilterDescriptor Value { get; set; } = new CompositeFilterDescriptor();
    public int TriggeredValueChangedCount { get; set; }

    private void OnValueChanged(CompositeFilterDescriptor filter)
    {
        Value = filter;
        TriggeredValueChangedCount++;
    }

    static RenderFragment<CompositeFilterDescriptor> compositeFilterDescriptorFragment = (cfd) =>
        @<text>
            @{
                <div>CompositeFilterDescriptor info: Logical Operator: @cfd.LogicalOperator</div>

                FilterDescriptor currentFilterDescriptor;
                CompositeFilterDescriptor currentCompositeDescriptor;

                @foreach (var item in cfd.FilterDescriptors)
                {
                    if (item is CompositeFilterDescriptor)
                    {
                        currentCompositeDescriptor = item as CompositeFilterDescriptor;
                        @compositeFilterDescriptorFragment(currentCompositeDescriptor);
                    }
                    else
                    {
                        currentFilterDescriptor = item as FilterDescriptor;
                        @filterDescriptorFragment(currentFilterDescriptor)
                    }
                }
            }
        </text>;

    static RenderFragment<FilterDescriptor> filterDescriptorFragment = (fd)
        => @<text><div>FilterDescriptor info: Member: @fd.Member Type: @fd.MemberType Value: @fd.Value</div></text>;
        public class Person
    {
        public int EmployeeId { get; set; }

        public string Name { get; set; }

        public int AgeInYears { get; set; }

        public bool IsOutOfOffice { get; set; }

        public DateTime HireDate { get; set; }
    }
}

<style>
    .log-container div {
        clear: both;
    }
</style>
````

## See Also

  * [Live Demo: Filter](https://demos.telerik.com/blazor-ui/filter/events)