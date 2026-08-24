---
title: Indeterminate State
page_title: CheckBox - Indeterminate State
description: Indeterminate State in the CheckBox for Blazor.
slug: checkbox-indeterminate-state
tags: telerik,blazor,checkbox,state,indeterminate
published: true
position: 2
components: ["checkbox"]
---

# CheckBox Indeterminate State

In addition to the basic *checked* and *unchecked* states, the Telerik CheckBox has a third *indeterminate* state. From UX perspective, the indeterminate state means that the CheckBox is neither checked, nor unchecked.

## Basics

To put a CheckBox in the indeterminate state, set its `Indeterminate` parameter to `true`. You can use two-way binding for the parameter or the [`IndeterminateChanged` event](slug:checkbox-events#indeterminatechanged). A `Value` change by the user clears that state and the user cannot restore it on their own. A `true` indeterminate state is only set by the application logic.

The `Indeterminate` parameter controls the [`indeterminate` property](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/indeterminate) of the standard HTML `<input type="checkbox" />`.

You can set the `Indeterminate` parameter to `true`, no matter if:

* The component `Value` type is `bool` or nullable `bool?`.
* The current component `Value` is `true`, `false,` or `null`. Depending on the [Telerik CSS theme](slug:themes-overview) and current `Value`, the CheckBox indeterminate state may look different.

>caption Using the CheckBox Indeterminate parameter

<demo metaUrl="client/checkbox/indeterminate/" height="300"></demo>

## Examples

Possible use cases for the indeterminate CheckBox state are:

* A CheckBox is [bound to a nullable boolean](#null-value) property and the current `Value` is `null`.
* [A "parent" CheckBox is related to multiple "child" CheckBoxes](#related-checkboxes) that have different values. Another example for such a built-in behavior is a [TreeView with CheckBoxes](https://demos.telerik.com/blazor-ui/treeview/checkboxes).

### Null Value

The following sample shows how to:

* Set the `Indeterminate` parameter to `true` automatically when the CheckBox `Value` is `null`.
* Use the [CheckBox `ValueChanged` event](slug:checkbox-events#valuechanged) Enable users to toggle between all three possible CheckBox values: `true`, `false`, and `null`.

>caption Using CheckBox Indeterminate when the Value is null

<demo metaUrl="client/checkbox/indeterminate-null-value/" height="220"></demo>

### Related CheckBoxes

The following sample shows how to set the `Indeterminate` parameter of a "parent" CheckBox, depending on the `Value` of several "child" CheckBoxes.

>caption Using CheckBox Indeterminate with related CheckBoxes

<demo metaUrl="client/checkbox/indeterminate-related/" height="350"></demo>

## See Also

* [Checkbox Overview](slug:checkbox-overview)
* [Checkbox Events](slug:checkbox-events)
