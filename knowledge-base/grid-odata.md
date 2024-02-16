---
title: Consume ODATA services in the grid
description: How to ConsumeODATA services in the grid.
type: how-to
page_title: Consume ODATA services in the grid
slug: common-kb-odata
position: 
tags: 
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Grid for Blazor</td>
        </tr>
    </tbody>
</table>


## Description

How to use the grid with an ODATA service? How do I get parameters such as filtering and sorting to pass to the service so it can return the appropriate data?


## Solution

An example is available in the following project: [https://github.com/telerik/blazor-ui/tree/master/grid/odata](https://github.com/telerik/blazor-ui/tree/master/grid/odata)

In this example application, the ODATA query contains all the available data. This configuration is intentional in order to cover different scenarios. For example:
* some columns may be calculated;
* some columns may be conditionally displayed;
* some column templates may rely on fields that are not shown in the grid;

That being said, you can get the OData string we provide and modify it as needed to match the application needs (for example, amend the [`$select`](https://www.odata.org/getting-started/basic-tutorial/#select) parameter to get only certain fields from the query and not all the data).
