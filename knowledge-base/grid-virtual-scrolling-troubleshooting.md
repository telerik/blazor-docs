---
title: Virtual Scrolling - Troubleshooting
description: Troubleshoot errors when Virtual Scrolling is enabled
type: troubleshooting
page_title: Virtual Scrolling - Troubleshooting
slug: grid-kb-virtual-scrolling-troubleshooting
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
I have a Grid with [Virtual Scrolling]({%slug components/grid/virtual-scrolling%}) enabled. When I scroll up or down the rows for the current view port are not rendered as the loading indicator remains visible as shown in the image below.


![](images/virtual-scrolling-loading-indicator.png)


## Cause\Possible Cause(s)

There are several possible causes to that behavior:
* The rendered row height in the browser is larger than the value set to the `RowHeight` parameter of the Grid. This depends on the used Theme and / or custom CSS rules applied to the `<tr>` HTML tag.
* The `RowHeight` parameter changes on runtime. Changing the height of the row dynamically depending on the content will cause issues with the virtualization logic.
* The browser and monitor settings do not match the settings of the Grid. Different browser zoom levels and monitor DPI can cause the browser to render with unexpected dimensions and / or non-integer values of the `<tr>`.


## Solution
Set the `RowHeight` parameter to a fixed value in pixels so that it accommodates the content (depending on the padding, margins, font-size and etc. Theme and CSS related rules) and matches the monitor and browser settings.
