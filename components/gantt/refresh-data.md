---
title: Refresh Data
page_title: Gantt Refresh Data
description: Refresh Gantt Data using the Rebind method, Observable Data or creating a new Collection reference.
slug: gantt-refresh-data
tags: telerik,blazor,Gantt,observable,data,new,collection
published: True
position: 20
components: ["gantt"]
---

# Gantt - Refresh Data

@[template](/_contentTemplates/common/observable-data.md#intro)

In this article:
* [Rebind Method](#rebind-method)
* [Observable Data](#observable-data)
* [New Collection Reference](#new-collection-reference)

## Rebind Method

@[template](/_contentTemplates/common/rebind-method.md#intro)

<demo metaUrl="client/gantt/refresh-data/example-3/" height="740"></demo>

## Observable Data

@[template](/_contentTemplates/common/observable-data.md#observable-data)

>caption Bind the Gantt to an ObservableCollection, so it can react to collection changes.

<demo metaUrl="client/gantt/refresh-data/example-2/" height="740"></demo>

@[template](/_contentTemplates/common/observable-data.md#tip-for-new-collection)

## New Collection Reference

@[template](/_contentTemplates/common/observable-data.md#refresh-data)

>caption Create new collection reference to refresh the Gantt data.

<demo metaUrl="client/gantt/refresh-data/example-1/" height="740"></demo>

## See Also

* [ObservableCollection](slug:common-features-observable-data)
* [INotifyCollectionChanged Interface](https://docs.microsoft.com/en-us/dotnet/api/system.collections.specialized.inotifycollectionchanged?view=netframework-4.8)
* [Live Demos](https://demos.telerik.com/blazor-ui)
