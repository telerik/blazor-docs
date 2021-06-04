---
title: ComboBox in Grid FilterMenuTemplate is Empty the First Time it is Opened
description: The ComboBox in a Grid filter menu template is blank and has no data when opened for the first time.
type: troubleshooting
page_title: ComboBox in Grid Filter Menu Template Has no Data When Opened the First Time
slug: grid-kb-combobox-in-filtermenu-empty
position: 
tags: 
ticketid: 1522512
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2.24.0</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>Grid for Blazor</td>
		</tr>
	</tbody>
</table>


## Description
I have a ComboBox in a Grid `FilterMenuTemplate`. The first time I open it, the dropdown is empty and reads and *No Data*. The second time the ComboBox is opened, the data shows as expected.

## Cause\Possible Cause(s)
The behavior is related to the filter menu popup. It is rendered outside the Grid component in the page `<body>`. If the ComboBox data is loaded asynchronously, the popup is not refreshed even by `StateHasChanged`.

## Suggested Workarounds
* Load the ComboBox data initially, before the filter menu is opened for the first time.
* Load the ComboBox data synchronously.
