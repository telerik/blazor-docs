---
title: Overview
page_title: Data Binding Overview
description: Learn the fundamentals and features of Telerik Blazor component data binding.
slug: common-features-data-binding-overview
tags: telerik,blazor,binding,databinding
published: True
position: 0
---

# Data Binding Overview

This article describes the fundamentals of data binding the Telerik Blazor components. For the sake of clarity, also check article [Value Binding vs Data Binding]({%slug get-started-value-vs-data-binding%}).

* [Data binding options](#how-to-provide-data)
* [Supported data types](#data-type)
* [Model property names can matter](#model-property-names)
* [How to refresh the component data](#refresh-data)


## How to Provide Data

The Telerik Blazor components are detached from the application's data layer. They do not make data requests directly and rely on the application for data.

There are two main ways to provide data to the components:

* `Data` parameter - use it to provide all the data at once.
* [`OnRead` event]({%slug common-features-data-binding-onread%}) - use it to load data on demand in chunks. 

Hierarchy components like the TreeList and the TreeView don't have an `OnRead` event. Instead, they load data on demand via `OnExpand` events.

>warning Do not use `Data` and `OnRead` at the same time with the same component.


## Data Type

All databound Telerik Blazor components expect their data to be `IEnumerable<T>`, where `T` can be any object type.

### Component Type

All databound components are generic and their type depends on the model type `T`. This is important when you need to define a component reference with the `@ref` directive:

>caption Defining reference to a databound component

<div class="skip-repl"></div>

````CSHTML
<TelerikGrid @ref="@Grid1" />
<TelerikComboBox @ref="@Combo1" />

@code {
    // incorrect
    private TelerikGrid Grid1 { get; set; }
    private TelerikComboBox Combo1 { get; set; }

    // correct
    private TelerikGrid<SampleModel> Grid1 { get; set; }
    private TelerikComboBox<SampleModel, int?> Combo1 { get; set; }
}
````

If the component `Data` is not set initially, set the `TItem` parameter to point to the model type. If the component has a `Value` parameter, then set `TValue` in this case as well.

>caption Setting TItem and TValue

<div class="skip-repl"></div>

````CSHTML
<TelerikGrid TItem="@SampleModel" />

<TelerikComboBox TItem="@SampleModel"
                 TValue="@(int?)"
                 @bind-Value="@ComboValue" />

@code {
    int? ComboValue { get; set; }

    public class SampleModel
    {
        public int Id { get; set; }
        public int Text { get; set; }
    }
}
````

## Model Property Names

Some components handle properties with specific names in a predefined way. For example, the Menu will automatically render the `Text` property of its items. If the property names are different, the component will expect additional configuration. All these specifics are described in each component documentation.


## Refresh Data

There are three ways to refresh the component data:

* [Bind the component to Observable data]({%slug common-features-observable-data%}). **This option applies only** if the `Data` parameter is set. The component will refresh automatically when items are **added or removed**.
* Call the component's `Rebind()` method. UI for Blazor version **3.3.0** exposed `Rebind()` for all databound components. Until then, the method was available only for the [components that have an `OnRead` event]({%slug common-features-data-binding-onread%}#components-with-onread-event)
* Reset the `Data` parameter reference. Sometimes, you may also need to call `StateHasChanged()` - for example, if the refreshing occurs in `OnAfterRenderAsync`.

The [example below](#example) demonstrates the second and third option.

### Reset the Collection Reference

The Blazor framework will fire `OnParametersSet` of a component only when it detects a change in the component's parameter values (such as `Data`). The change detection works like this:

* For primitive types (numbers, strings, booleans), the detection occurs happens when the **value** changes.
* For complex types (such as `IEnumerable` and any application-specific objects), the detection occurs when the **object reference** changes.

Thus, you will usually need to create a new reference for `Data` value in order to refresh the component.

### Example

>caption Call `Rebind()` or create new Data reference

<div class="skip-repl"></div>

````CSHTML
<p>
    <TelerikButton OnClick="@RefreshGridData">Refresh Grid Data</TelerikButton>
</p>

<TelerikGrid @ref="@GridRef"
             Data="@GridData"
             AutoGenerateColumns="true" />

@code {
    TelerikGrid<SampleModel> GridRef { get; set; }
    List<SampleModel> GridData { get; set; }

    void RefreshGridData()
    {
        var newId = GridData.Count + 1;

        GridData.FirstOrDefault().Text = DateTime.Now.Ticks.ToString();

        GridData.Add(new SampleModel() {
            Id = newId,
            Text = "Text " + newId
        });

        // components with an OnRead event have a Rebind method:
        //GridRef.Rebind();

        // OR

        // all databound components can use a new data reference:
        GridData = new List<SampleModel>(GridData);

        // call only if necessary
        //StateHasChanged();
    }

    protected override void OnInitialized()
    {
        GridData = new List<SampleModel>();

        for (int i = 1; i <= 3; i++)
        {
            GridData.Add(new SampleModel() {
                Id = i,
                Text = "Text " + i
            });
        }

        base.OnInitialized();
    }

    public class SampleModel
    {
        public int Id { get; set; }
        public string Text { get; set; }
    }
}
````


## Next Steps

* [Data Binding with the OnRead event]({%slug common-features-data-binding-onread%})
* [Data Binding to Observable Data]({%slug common-features-observable-data%})
* [Data Binding to cloud data services]({%slug common-features-data-binding-cloud%})
