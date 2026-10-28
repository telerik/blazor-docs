---
title: Refresh Data
page_title: MultiSelect Refresh Data
description: Refresh MultiSelect Data using Observable Data or creating a new Collection reference.
slug: multiselect-refresh-data
tags: telerik,blazor,multiselect,observable,data,new,collection
published: True
position: 30
components: ["multiselect"]
---

# MultiSelect - Refresh Data

@[template](/_contentTemplates/common/observable-data.md#intro)

Sections in this article:

* [Rebind Method](#rebind-method)
* [Observable Data](#observable-data)
* [New Collection Reference](#new-collection-reference)
* [Update Value](#update-value)

## Rebind Method

You can refresh the data of the MultiSelect by using the `Rebind` method exposed to the reference of the TelerikMultiSelect. If you have manually defined the [OnRead event](slug:multiselect-events#onread) the business logic defined in its event handler will be executed. 

<demo metaUrl="client/multiselect/refresh-data/example-1/" height="420"></demo>

@[template](/_contentTemplates/common/refresh-data-not-applicable.md#refresh-data-note)

## Observable Data

@[template](/_contentTemplates/common/observable-data.md#observable-data)


>caption Bind the MultiSelect component to an ObservableCollection, so it can react to collection changes.

<demo metaUrl="client/multiselect/refresh-data/example-2/" height="620"></demo>

@[template](/_contentTemplates/common/observable-data.md#tip-for-new-collection)

## New Collection Reference

@[template](/_contentTemplates/common/observable-data.md#refresh-data)

>caption Create new collection reference to refresh the Multiselect data.

<demo metaUrl="client/multiselect/refresh-data/example-3/" height="620"></demo>

## Update Value

The `Value` parameter also accepts a collection but it does not support observable data. If you want to change the Value, make sure you are providing a collection of items that are included in the data source (not random ones).

>caption Set/change the selected values or clear the selection programmatically.

<demo metaUrl="client/multiselect/refresh-data/example-4/" height="620"></demo>

## See Also

* [ObservableCollection](slug:common-features-observable-data)
* [INotifyCollectionChanged Interface](https://docs.microsoft.com/en-us/dotnet/api/system.collections.specialized.inotifycollectionchanged?view=netframework-4.8)
* [Live Demos](https://demos.telerik.com/blazor-ui)
