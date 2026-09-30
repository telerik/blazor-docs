---
title: Refresh Data
page_title: ListView Refresh Data
description: Refresh ListView Data using Observable Data or creating a new Collection reference.
slug: listview-refresh-data
tags: telerik,blazor,listview,observable,data,new,collection
published: True
position: 53
components: ["listview"]
---

# ListView - Refresh Data

@[template](/_contentTemplates/common/observable-data.md#intro)

In this article:

* [Rebind Method](#rebind-method)
* [Observable Data](#observable-data)
* [New Collection Reference](#new-collection-reference)

## Rebind Method

To refresh the `ListView` data when using [`OnRead`](slug:listview-manual-operations), call the `Rebind` method of the `TelerikListView` reference. This will fire the `OnRead` event and execute the business logic in the handler.

<demo metaUrl="client/listview/refresh-data/example-1/" height="620"></demo>

@[template](/_contentTemplates/common/refresh-data-not-applicable.md#refresh-data-note)

## Observable Data

@[template](/_contentTemplates/common/observable-data.md#observable-data)

>caption Bind the ListView to an ObservableCollection, so it can react to collection changes.

<demo metaUrl="client/listview/refresh-data/example-2/" height="670"></demo>

@[template](/_contentTemplates/common/observable-data.md#tip-for-new-collection)

## New Collection Reference

@[template](/_contentTemplates/common/observable-data.md#refresh-data)

>caption Create new collection reference to refresh the ListView data.

<demo metaUrl="client/listview/refresh-data/example-3/" height="700"></demo>

## See Also

* [ObservableCollection](slug:common-features-observable-data)
* [INotifyCollectionChanged Interface](https://docs.microsoft.com/en-us/dotnet/api/system.collections.specialized.inotifycollectionchanged?view=netframework-4.8)
* [Live Demos](https://demos.telerik.com/blazor-ui)
