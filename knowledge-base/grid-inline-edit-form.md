---
title: Add inline Telerik Form to the the Grid Rows
description: How to add inline Telerik Form to the Grid Rows.
type: how-to
page_title: Add inline Telerik Form to the the Grid Rows
slug: grid-kb-inline-form
position: 
tags: telerik,blazor,grid,inline,form,rows
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

I want to add an inline Telerik Form to the Grid rows when I enter edit mode.


## Solution

Adding an inline Telerik Form to the Grid rows is possible by following the steps below:

* Define a DetailTemplate.
* Hide the hierarchy expand column with CSS.
* Use the SetStateAsync() method to enter and exit edit mode programatically.

>tip The Telerik Form works with a cloned instance of the edited/added item to support cancellation. If you cancel the addition or update of an item, you need to delete it from the Grid Data collection.   

https://supportheroes.telerik.com/ticket/1639016