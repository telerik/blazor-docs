---
title: Autofit all Grid columns on initial load. 
description: Autofit all Grid columns on initial load, so that their widths match their content. 
type: troubleshooting
page_title: Autofit all Grid columns on initial load. 
slug: grid-autofit-columns-on-initial-load
position: 
tags: 
res_type: kb
---


## Description

I would like to autofit the Grid columns on initial load of the Component using the [AutoFitAllColumns]({%slug components/grid/columns/resize%}#autofit-columns) method of the Grid reference. The goal is for all column widths to match the column content.

## Background

In the 2.28.0 release of Telerik UI for Blazor, the Grid introduced methods to autofit one or more columns via the Grid reference. I would like to achieve that behavior on initial load of the component, but can not find a suitable event to call the methods.

## Solution

Conceptually speaking the `OnAfterRender` and `OnAfterRenderAsync` lifecycle hooks should be the suitable events to call the autofit methods. This solution might not be really suitable because if the data service takes a longer time to populate the data for the Grid the OnAfterRenderAsync might have already fired before the actual data is rendered in the DOM. The AutoFit feature relies on the data to fit the columns based on the content in the cells and thus it is reliant on the data being already rendered in the DOM. 

The best possible place to call the AutoFit methods would be in the data layer of the application after the data service that populates the collection bound to the `Data` parameter of the Grid. 
