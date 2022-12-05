---
title: Show loading indicator for initially missing data when virtualization is enabled
description: How to display loading indicator in virtual MultiSelect that does not have data on initialization
type: how-to
page_title: Show loading indicator for initially missing data when virtualization is enabled
slug: multiselect-kb-virtualization-with-initial-loader
position: 
tags: autocomplete, combobox, dropdownlist, multiselect, virtual, loader, loading, indicator, sign, virtualization
ticketid: 1587267
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>
                AutoComplete for Blazor, <br />
                ComboBox for Blazor, <br />
                DropDownList for Blazor, <br />                
                MultiColumnComboBox for Blazor, <br />
                MultiSelect for Blazor, <br />
            </td>
		</tr>
	</tbody>
</table>


## Description

The loading indicator is not working when VirutalColumn is used. How to enable the loading animation in the popup?

I have enabled virtualization in MultiSelect but I don't see a loading sign when the component initializes and there is no data. How can I display a loader in the popup?

## Solution

When virtualization is enabled, the loading indicator is not rendered for performance reasons.

To display a loading sign if the component does not have data when it initializes, use the NoData Template to integrate several instances of the Skeleton component.


````CSHTML

````
