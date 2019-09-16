---
title: Set active tab by index
description: how to select or activate a tab by index
type: how-to
page_title: Select tab by index
slug: tabstrip-activate-by-index
position: 
tags: 
ticketid: 1422293
res_type: kb
---

## Environment
<table>
    <tbody>
	    <tr>
	    	<td>Product</td>
	    	<td>TabStrip for Blazor</td>
	    </tr>
    </tbody>
</table>


## Description
I have a TabStrip that renders tabs dynamically based on a list. Is there a way to set the active tab based on an index or a key?

## Solution

As of version 2.0.0, tabs are selected by index out of the box through the `ActiveTabIndex` parameter. See the examples in the [Tab Strip documentation]({%slug components/tabstrip/overview%}).

