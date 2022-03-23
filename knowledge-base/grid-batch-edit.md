---
title: Batch Editing in the Grid
description: How to implement batch editing in the grid.
type: how-to
page_title: Grid Batch Edit
slug: grid-kb-batch-edit
position: 
tags:
ticketid: 1556263
res_type: kb
---


## Description

How to edit several records in the grid at once and to only create one request to the database/service to save the changes? How to implement batch editing?


## Solution

An example is available in the following project: [https://github.com/telerik/blazor-ui/tree/master/grid/batch-editing](https://github.com/telerik/blazor-ui/tree/master/grid/batch-editing)

> Clicking on the "Save All" button while there is an open cell editor can cause a race condition with the browser events. As a result, the new value in the open cell editor may not be persisted. There are two ways to avoid this:
> * Use the `OnEdit` and `OnUpdate` events to enable the "Save All" button when the Grid is **not** in edit mode
> * [Check the Grid State](https://docs.telerik.com/blazor-ui/components/grid/state#initiate-editing-or-inserting-of-an-item) in the "Save All" click handler to see if the Grid is in edit mode. In this case, [call the OnUpdate handler manually](https://docs.telerik.com/blazor-ui/components/grid/editing/incell#editor-template) and apply the user changes to the Grid data. Unlike the linked example, there is no need to exit edit mode programmatically, because the Grid will do that. However, mind the possibility for the `OnUpdate` handler to execute twice.
