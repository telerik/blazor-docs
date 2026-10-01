---
title: Filter
page_title: TreeList - Filter Template
description: Use custom filter templates in treelist for Blazor.
slug: treelist-templates-filter
tags: telerik,blazor,treelist,templates,filter
published: True
position: 35
components: ["treelist"]
---

# Filter Template

The Filter Template lets you customize the appearance and logic of the built-in filters. It lets you step on the built-in filtering logic of the treelist and implement your own design and logic for setting their values.

There are two different templates you can use depending on the [Filter Mode](slug:treelist-filtering) that you chose:

* [Filter Row Template](#filter-row-template)
* [Filter Menu Template](#filter-menu-template)


## Filter Row Template

By default, the filter row puts an appropriate editor (like a numeric textbox for numbers) and its `ValueChanged` handler triggers treelist filtering on every keystroke. There is also a button for the user to choose a filter operator, and a clear filter button when there is a value in the editor.

To customize the filter cell, use the `<FilterCellTemplate>` tag of the `<TreeListColumn>`. It receives a `context` of type `FilterCellTemplateContext` that provides the following members:

* `FilterDescriptor` - a [CompositeFilterDescriptor](slug:Telerik.DataSource.CompositeFilterDescriptor) object that describes the column filter. By default, its `FilterDescriptors` field contains two `FilterDescriptor` instances and its `LogicalOperator` is `AND`. You can populate the filter values in the existing `FilterDescriptors` and add more instances. You can change their [filter operator](slug:common-features-filter-operators) and the `LogicalOperator` of the `CompositeFilterDescriptor`.

* `FilterAsync()` - an `async` method that invokes the built-in treelist filtering logic so you can call upon it easily from your template (e.g., when a value changes or a button is clicked).

* `ClearFilterAsync()` - an `async` method that invokes the built-in treelist clear filtering logic so you can call upon it easily from your template (e.g., when a value is cleared or a button is clicked).

You can store a reference to each column's context in a field in the view-model, so you can write the handlers in the standard C# code, instead of using lambdas in the markup. You can also pass the context as a Parameter to your own separate filter component to reduce clutter in the main treelist markup and code.

### Examples

The example below shows a custom filter that:

* Implements a min-max filter in the filter cell through two numeric textboxes.
* Filters in the `OnChange` event (only when the user presses Enter or blurs the input).
* Shows how you can store a reference to the context or use it inline in the template.
* Showcases building a filter descriptor with two filters and sample logic that always filters the data even if one of the inputs is empty.


>caption Custom Filter Row Template - Min and Max filters on OnChange

<demo metaUrl="client/treelist/templates/filter/example-1/" height="720"></demo>

## Filter Menu Template

By default, the filter menu contains two filter values that are tied with a logical operator - OR or AND, with filtering being triggered through a dedicated Filter button and a Clear button removes the filter.

To customize the filter menu, use the `<FilterMenuTemplate>` tag of the `<TreeListColumn>`. The `Filter` and `Clear` buttons are still available below the template.

The template receives a `context` of type `FilterMenuTemplateContext` that provides the following members:

* `FilterDescriptor` - the object that describes the column filter. By default it has two filters with the type and name of the field, and you can add more to its `FilterDescriptors` collection, or change its `LogicalOperator` from the default `AND`.

You can store a reference to each column's context in a field in the view-model, so you can reference it from event handlers in the standard C# code, instead of passing it as an argument to lambdas in the markup only. You can also pass the context as a Parameter to your own separate filter component to reduce clutter in the main treelist markup and code.

### Examples

The example below shows a custom filter that:

* Implements a multi checkbox filter that lets the user choose several values from the data source.
* Shows how you can store a reference to the context or use it inline in the template.
* Showcases building multiple filter descriptors for each value the user chooses.


>caption Custom Filter Menu Template - Multiple Checkboxes

>tip The treelist can create a checkbox filter for you, see the [CheckBoxList Filtering](slug:treelist-checklist-filter) article.

<demo metaUrl="client/treelist/templates/filter/example-2/" height="720"></demo>
