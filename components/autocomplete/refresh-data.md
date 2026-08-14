---
title: Refresh Data
page_title: Autocomplete Refresh Data
description: Refresh Autocomplete Data using Observable Data or creating a new Collection reference.
slug: autocomplete-refresh-data
tags: telerik,blazor,autocomplete,observable,data,new,collection
published: True
position: 30
components: ["autocomplete"]
---

# Autocomplete - Refresh Data


@[template](/_contentTemplates/common/observable-data.md#intro)

In this article:

* [Rebind Method](#rebind-method)
* [Observable Data](#observable-data)
* [New Collection Reference](#new-collection-reference)

## Rebind Method

To refresh the AutoComplete data when using [`OnRead`](slug:autocomplete-events#onread), call the `Rebind` method of the TelerikAutoComplete reference. This will fire the `OnRead` event and execute the business logic in the handler.

<demo metaUrl="client/autocomplete/refresh-data/rebind/" height="250"></demo>

@[template](/_contentTemplates/common/refresh-data-not-applicable.md#refresh-data-note)

## Observable Data

@[template](/_contentTemplates/common/observable-data.md#observable-data)


>caption Bind the Autocomplete component to an ObservableCollection, so it can react to collection changes.

<demo metaUrl="client/autocomplete/refresh-data/observable/" height="400"></demo>

@[template](/_contentTemplates/common/observable-data.md#tip-for-new-collection)

## New Collection Reference

@[template](/_contentTemplates/common/observable-data.md#refresh-data)

>caption Create new collection reference to refresh the Autocomplete data.

<demo metaUrl="client/autocomplete/refresh-data/new-collection/" height="450"></demo>


## See Also

* [ObservableCollection](slug:common-features-observable-data)
* [INotifyCollectionChanged Interface](https://docs.microsoft.com/en-us/dotnet/api/system.collections.specialized.inotifycollectionchanged?view=netframework-4.8)
* [Live Demos](https://demos.telerik.com/blazor-ui)