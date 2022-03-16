---
title: Overview
page_title: Filter Overview
description: Discover the Blazor Filter and explore the examples.
slug: filter-overview
tags: telerik,blazor,filter,overview
published: True
position: 0
---

# Blazor Filter Overview
The Filter serves as a complementary addition to a data-bound component that does not have built-in filtering options.

The component gives a unified way to build filter descriptors using its [fields]({%slug filter-fields%}). You can also define different [operators]({%slug filter-operators%}) and use these filter descriptors to filter data.

## Creating Blazor Filter
1. Use the `TelerikFilter` tag to add the component to your razor page.
2. Set the `Value` parameter via one-way or two-way binding.
3. Add the `FilterField` tag, a child tag of the `FilterFields`.
4. Set the `Name` and `Type` properties.

>caption A basic configuration of the Telerik Filter.

````CSHTML
@* This code snippet showcases an example of a basic Filter configuration. *@

@using Telerik.DataSource

<TelerikFilter @ref="FilterRef" @bind-Value="@Value">
    <FilterFields>
        <FilterField Name="@(nameof(Person.EmployeeId))" Type="@(typeof(int))" Label="Id"></FilterField>
        <FilterField Name="@(nameof(Person.Name))" Type="@(typeof(string))" Label="First Name"></FilterField>
        <FilterField Name="@(nameof(Person.AgeInYears))" Type="@(typeof(int))" Label="Age"></FilterField>
    </FilterFields>
</TelerikFilter>

@code {
    TelerikFilter FilterRef { get; set; }
    public CompositeFilterDescriptor Value { get; set; } = new CompositeFilterDescriptor();

    public class Person
    {
        public int EmployeeId { get; set; }

        public string Name { get; set; }

        public int AgeInYears { get; set; }
    }
}
````

## Fields
The fields are responsible for setting up the Filter information. [Read more about the supported Blazor Filter fields...]({%slug filter-fields%})

## Parameters
The Blazor Filter provides parameters that allow you to configure the component:

| Parameter | Type | Description |
| ----------- | ----------- | ----------- |
| `Class` | `string` | The class that will be rendered on the outermost element. |
| `Value` | `CompositeFilterDescriptor` | Sets the value of the filter component. |

## Events
The Blazor Filter generates events that you can handle and further customize its behavior. [Read more about the Blazor Filter events...]({%slug filter-events%}).

## Next Steps
[Configure the Filter Fields]({%slug filter-fields%})

[Using the Filter Events]({%slug filter-events%})

## See Also

  * [Live Demo: Filter](https://demos.telerik.com/blazor-ui/filter/overview)