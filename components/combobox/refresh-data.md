---
title: Refresh Data
page_title: ComboBox Refresh Data
description: Refresh ComboBox Data using Observable Data or creating a new Collection reference.
slug: combobox-refresh-data
tags: telerik,blazor,combobox,observable,data,new,collection
published: True
position: 35
components: ["combobox"]
---

# ComboBox - Refresh Data

@[template](/_contentTemplates/common/observable-data.md#intro)

In this article:

* [Rebind Method](#rebind-method)
* [Observable Data](#observable-data)
* [New Collection Reference](#new-collection-reference)


## Rebind Method

To refresh the ComboBox data when using [`OnRead`](slug:components/combobox/events#onread), call the `Rebind` method of the TelerikComboBox reference. This will fire the `OnRead` event and execute the business logic in the handler.

<demo metaUrl="client/combobox/refresh-data/rebind/" height="300"></demo>

@[template](/_contentTemplates/common/refresh-data-not-applicable.md#refresh-data-note)

## Observable Data

@[template](/_contentTemplates/common/observable-data.md#observable-data)

>caption Bind the ComboBox component to an ObservableCollection, so it can react to collection changes.

<demo metaUrl="client/combobox/refresh-data/observable/" height="400"></demo>

@[template](/_contentTemplates/common/observable-data.md#tip-for-new-collection)

## New Collection Reference

@[template](/_contentTemplates/common/observable-data.md#refresh-data)

>caption Create new collection reference to refresh the ComboBox data.

<demo metaUrl="client/combobox/refresh-data/new-collection/" height="450"></demo>

## See Also

* [ObservableCollection](slug:common-features-observable-data)
* [INotifyCollectionChanged Interface](https://docs.microsoft.com/en-us/dotnet/api/system.collections.specialized.inotifycollectionchanged?view=netframework-4.8)
* [Live Demos](https://demos.telerik.com/blazor-ui)
