---
title: Composite Filter Descriptor
page_title: Composite Filter Descriptor
description: Discover the CompositeFilterDescriptor properties and how to access the filter descriptor value.
slug: common-features-composite-filter-descriptor
tags: telerik,blazor,compositefilterdescriptor
published: True
position: 8
---

# Composite Filter Descriptor

The [`CompositeFilterDescriptor`](/blazor-ui/api/Telerik.DataSource.CompositeFilterDescriptor) exposes two properties:
* [`FilterDescriptors`](/blazor-ui/api/telerik.datasource.compositefilterdescriptor#Telerik_DataSource_CompositeFilterDescriptor_FilterDescriptors)&mdash;The property represents a [`FilterDescriptorCollection`](/blazor-ui/api/Telerik.DataSource.FilterDescriptorCollection). The `FilterDescriptorCollection` contains [`IFilterDescriptor`](/blazor-ui/api/Telerik.DataSource.IFilterDescriptor) instances. To get the properties of each filter descriptor instance cast the `IFilterDescriptor` to a [`FilterDescriptor`](/blazor-ui/api/telerik.datasource.filterdescriptor). Each `FilterDescriptor` instance gives access to:
    * The `Member`&mdash;The field where the user filters. Each filter descriptor describes also the `MemberType`, that represents the type of the field.
    * The `Operator`&mdash;The [`FilterOperator`](/blazor-ui/api/telerik.datasource.filteroperator) that applies. There are different operators depending on the `MemberType`. Read more about the [filter operators]({%slug common-features-filter-operators%}).
    * The `Value`&mdash;The user input to filter by.
* [`LogicalOperator`](/blazor-ui/api/telerik.datasource.compositefilterdescriptor#Telerik_DataSource_CompositeFilterDescriptor_LogicalOperator)&mdash;It can be either AND or OR. The logical operator applies between the filter descriptor instances.