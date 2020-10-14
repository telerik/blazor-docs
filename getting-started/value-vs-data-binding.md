---
title: Value Binding vs Data Binding
page_title: Value Binding vs Data Binding
description: Differences between Value Binding and Data Binding in Telerik UI for Blazor.
slug: get-started-value-vs-data-binding
tags: telerik,blazor,value,data,binding
published: True
position: 30
---

# Value Binding vs Data Binding

This article explains the difference between `Value` and `@bind-Value`, and between Value Binding and Data Binding.

This article contains the following sections:

* [Value Binding](#value-binding)
	* [One-way Binding](#one-way-binding)
	* [Two-way Binding](#two-way-binding)
* [Data Binding](#data-binding)
* [Terminology in MSDN vs Telerik Documentation](#terminology-in-msdn-vs-telerik-documentation)



## Value Binding

In this documentation, we will refer to Value Binding as the process of passing values between a component and its parent. Value binding tells the component to take the value of the corresponding field from the view-model and use it.

Value binding has two forms:

* **one-way binding** (syntax like `<ParameterName>="@someField"`, for example `Value="@someField"`, `Page="@someField"`).

* **two-way binding** (syntax like `@bind-<ParameterName>="@someField"`, for example `@bind-Value="@someField"`, `@bind-Page="@someField"`).

### One-way Binding 

One-way binding does *not* update the view-model if the component changes this value.

When using one-way binding, you *can* use the `<ParameterName>Changed` event. For example, you can use both `Value` and `ValueChanged`.

If you want to update the view-model in this scenario, you should handle the corresponding `<Parameter>Changed` event, and in the handler you will update the view-model with the new data. This allows you to apply some synchronous logic to that new value and effectively cancel the update if you don't set the new value to the view-model.

### Two-way Binding

Two-way binding *updates* the view-model field if the component changes this value.

When using two-way binding, you _cannot_ use the `<ParameterName>Changed` event. For example, if you use `@bind-Value`, adding `ValueChanged` will throw an exception from the framework. The way two-way binding works internally in Blazor is that the event is handled to populate the view-model field already, so you cannot handle it again.

## Data Binding

In this documentation, we will refer to Data Binding as the process of providing a component with a collection of data (models) that it will use and display. 

There is no two-way binding in this case, the flow of the data is from the parent to the child component. Sometimes the parent component needs to be aware of data changes in the child component. The usual approach is to raise a specific event that the parent can handle and apply the necessary changes to its own view-model.

Data binding includes the following steps:

* Creating a collection with the desired set of models/primitive types in the view-model. You would usually get it from a data service specific to the app.

* Pointing the `Data` parameter of the Telerik component to that collection

* Setting other necessary parameters that instruct the component how to work with that data (such as specifying ID fields, text and value fields, etc.).


## Terminology in MSDN vs Telerik Documentation

In the MSDN documentation, the `@bind` or `@bind-Value` syntax is referred to as "Data Binding" because it carries a piece of data to/from the view-model to an input component (like a simple `<input />` or its form equivalent - the `<InputText />`).

In the Telerik UI for Blazor documentation, the `@bind-Value` syntax is referred to as "Value Binding" because it carries field values to and from the view-model.

In the Telerik UI for Blazor documentation, we call "Data Binding" the process of providing a collection of models to a component so that this component can work with them. For example, display them - rows in a grid, appointments in a scheduler, items in a dropdown.

In the MSDN documentation, providing data to a component like that is not covered - it uses simple HTML elements and `@foreach` loops to generate `<option>` elements for dropdowns or `<tr>` elements for grids.

This lack of terminology in the framework for a scenario that is considered basic for a component suite prompts the difference in conventions that we use.
