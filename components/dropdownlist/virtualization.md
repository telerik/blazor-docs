---
title: Virtualization
page_title: DropDownList - Virtualization
description: UI virtualization to allow large data sources in the DropDownList for Blazor.
slug: dropdownlist-virtualization
tags: telerik,blazor,dropdown,DropDownList,virtualization
published: True
position: 20
components: ["dropdownlist"]
---

# DropDownList Virtualization

The DropDownList @[template](/_contentTemplates/common/dropdowns-virtualization.md#value-proposition)

#### In This Article

* [Basics](#basics)
* [Local Data Example](#local-data-example)
* [Remote Data Example](#remote-data-example)

## Basics

@[template](/_contentTemplates/common/dropdowns-virtualization.md#basics-core)

* `ValueMapper` - `Func<TValue, Task<TItem>>` - @[template](/_contentTemplates/common/dropdowns-virtualization.md#value-mapper-text)

@[template](/_contentTemplates/common/dropdowns-virtualization.md#remote-data-specifics)

### Limitations

@[template](/_contentTemplates/common/dropdowns-virtualization.md#limitations)

## Local Data Example

<demo metaUrl="client/dropdownlist/virtualization/local/" height="350"></demo>

## Remote Data Example

@[template](/_contentTemplates/common/dropdowns-virtualization.md#remote-data-sample-intro)

@[template](/_contentTemplates/common/dropdowns-virtualization.md#value-mapper-in-remote-example)

Run this and see how you can display, scroll and filter over 10k records in the dropdownlist without delays and performance issues from a remote endpoint. There is artificial delay in these operations for the sake of the demonstration.

<demo metaUrl="client/dropdownlist/virtualization/remote/" height="450"></demo>

## See Also

* [Live Demo: DropDownList Virtualization](https://demos.telerik.com/blazor-ui/dropdownlist/virtualization)
* [Blazor DropDownList](slug:components/dropdownlist/overview)
