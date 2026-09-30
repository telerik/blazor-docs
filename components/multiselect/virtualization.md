---
title: Virtualization
page_title: MultiSelect - Virtualization
description: UI virtualization to allow large data sources in the MultiSelect for Blazor.
slug: multiselect-virtualization
tags: telerik,blazor,MultiSelect,virtualization
published: True
position: 25
components: ["multiselect"]
---

# MultiSelect Virtualization

The MultiSelect @[template](/_contentTemplates/common/dropdowns-virtualization.md#value-proposition)

#### In This Article

* [Basics](#basics)
* [Local Data Example](#local-data-example)
* [Remote Data Example](#remote-data-example)

## Basics

@[template](/_contentTemplates/common/dropdowns-virtualization.md#basics-core)


* `ValueMapper` - `Func<List<TValue>, Task<List<TItem>>>` - @[template](/_contentTemplates/common/dropdowns-virtualization.md#value-mapper-text)

@[template](/_contentTemplates/common/dropdowns-virtualization.md#remote-data-specifics)

### Limitations

@[template](/_contentTemplates/common/dropdowns-virtualization.md#limitations)


## Local Data Example

<demo metaUrl="client/multiselect/virtualization/example-1/" height="420"></demo>


## Remote Data Example

@[template](/_contentTemplates/common/dropdowns-virtualization.md#remote-data-sample-intro)

@[template](/_contentTemplates/common/dropdowns-virtualization.md#value-mapper-in-remote-example)

* An optional [`OnSelectAll` event handler](slug:multiselect-events#onselectall) that toggles all items in the data, rather than just the currently rendered chunk. When filtering is active, the `OnSelectAll` handler should apply the filter criteria to the full data collection before selecting or deselecting items.

Run this and see how you can display, scroll and filter over 10k records in the MultiSelect without delays and performance issues from a remote endpoint. There is artificial delay in these operations for the sake of the demonstration.

<demo metaUrl="client/multiselect/virtualization/example-2/" height="420"></demo>


## See Also

* [Live Demo: MultiSelect Virtualization](https://demos.telerik.com/blazor-ui/multiselect/virtualization)

