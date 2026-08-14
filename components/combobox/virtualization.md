---
title: Virtualization
page_title: ComboBox - Virtualization
description: UI virtualization to allow large data sources in the ComboBox for Blazor.
slug: combobox-virtualization
tags: telerik,blazor,combo,combobox,virtualization
published: True
position: 30
components: ["combobox"]
---

# ComboBox Virtualization

The ComboBox @[template](/_contentTemplates/common/dropdowns-virtualization.md#value-proposition)

#### In This Article

* [Basics](#basics)
* [Local Data Example](#local-data-example)
* [Remote Data Example](#remote-data-example)

>caption Display, scroll and filter over 10k records in the combobox without delays and performance issues

![Virtual Scrolling of large local data](images/combobox-virtual-scrolling-local.gif)

## Basics

@[template](/_contentTemplates/common/dropdowns-virtualization.md#basics-core)


* `ValueMapper` - `Func<TValue, Task<TItem>>` - @[template](/_contentTemplates/common/dropdowns-virtualization.md#value-mapper-text)

@[template](/_contentTemplates/common/dropdowns-virtualization.md#remote-data-specifics)

### Limitations

@[template](/_contentTemplates/common/dropdowns-virtualization.md#limitations)

## Local Data Example

<demo metaUrl="client/combobox/virtualization/local/" height="350"></demo>

## Remote Data Example

@[template](/_contentTemplates/common/dropdowns-virtualization.md#remote-data-sample-intro)

@[template](/_contentTemplates/common/dropdowns-virtualization.md#value-mapper-in-remote-example)

Run this and see how you can display, scroll and filter over 10k records in the combobox without delays and performance issues from a remote endpoint. There is artificial delay in these operations for the sake of the demonstration.

<demo metaUrl="client/combobox/virtualization/remote/" height="450"></demo>

## See Also

* [Live Demo: ComboBox Virtualization](https://demos.telerik.com/blazor-ui/combobox/virtualization)
   
  

