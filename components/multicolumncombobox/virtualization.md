---
title: Virtualization
page_title: MultiColumnComboBox - Virtualization
description: UI virtualization to allow large data sources in the MultiColumnComboBox for Blazor.
slug: multicolumncombobox-virtualization
tags: telerik,blazor,combo,combobox,virtualization
published: True
position: 30
components: ["multicolumncombobox"]
---

# MultiColumnComboBox Virtualization

The MultiColumnComboBox @[template](/_contentTemplates/common/dropdowns-virtualization.md#value-proposition)

#### In This Article

* [Basics](#basics)
* [Local Data Example](#local-data-example)
* [Remote Data Example](#remote-data-example)

## Basics

This section will explain the parameters and behaviors that are related to the virtualization feature so you can set it up.

>caption To enable UI virtualization, you need to set the following parameters of the component:

* `ScrollMode` - `Telerik.Blazor.DropDownScrollMode` - set it to `DropDownScrollMode.Virtual`. It defaults to the "regular" scrolling.
* `ListHeight` - `string` - [set the height](slug:common-features/dimensions) of the dropdown. It must **not** be a `null/empty` string.
* `ItemHeight` - `decimal` - set it to the height each individual item will have in the dropdown. Make sure to accommodate the content your items will have and any item template.
* `PageSize` - `int` - defines how many items will actually be rendered and reused. The value determines how many items are loaded on each scroll. The number of items must be large enough according to the `ItemHeight` and popup `ListHeight`, so that there are more items than the dropdown so there is a scrollbar.

You can find a basic example in the [Local Data](#local-data-example) section below.

>caption For working with [remote data](#remote-data-example), you also need:

* `ValueMapper` - `Func<TValue, Task<TItem>>` - @[template](/_contentTemplates/common/dropdowns-virtualization.md#value-mapper-text)

@[template](/_contentTemplates/common/dropdowns-virtualization.md#remote-data-specifics)

### Limitations

@[template](/_contentTemplates/common/dropdowns-virtualization.md#limitations)

## Local Data Example

<demo metaUrl="client/multicolumncombobox/virtualization/example-1/" height="520"></demo>

## Remote Data Example

@[template](/_contentTemplates/common/dropdowns-virtualization.md#remote-data-sample-intro)

@[template](/_contentTemplates/common/dropdowns-virtualization.md#value-mapper-in-remote-example)

Run this and see how you can display, scroll and filter over 10k records in the combobox without delays and performance issues from a remote endpoint. There is artificial delay in these operations for the sake of the demonstration.

<demo metaUrl="client/multicolumncombobox/virtualization/example-2/" height="520"></demo>


## See Also

* [Live Demo: MultiColumnComboBox Virtualization](https://demos.telerik.com/blazor-ui/multicolumncombobox/virtualization)
   
  
