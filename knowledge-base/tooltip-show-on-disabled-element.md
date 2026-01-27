---
title: Display Tooltip on Disabled HTML Element
description: Learn how to show a Tooltip for a disabled element by wrapping it with another HTML element in Blazor applications.
type: how-to
page_title: How to Display Tooltip on Disabled HTML Element
slug: tooltip-kb-disabled-element
tags: tooltip, disabled element
res_type: kb
ticketid: 1665023
components: ["tooltip"]
---
## Environment

<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Tooltip for Blazor</td>
		</tr>
	</tbody>
</table>

## Description

When an HTML element is disabled, providing additional information via a Tooltip can be challenging since disabled elements do not respond to mouse events. Hence, the Tooltip cannot detect when the user hovers over a disabled element.

This knowledge base article also answers the following questions:
- How can I display a tooltip over a disabled HTML element in Blazor?
- How to display a tooltip over a disabled button?
- What is the workaround for showing tooltips on disabled elements in Blazor?
- Can a tooltip be associated with a disabled element in Blazor applications?

## Solution

To display a Tooltip for a disabled button, wrap the disabled button within another HTML element, like a `<div>`, and then set the Tooltip to target this wrapper element. This approach allows the Tooltip to be activated when the user hovers over the area covering the disabled button.

Here's an example demonstrating how to implement this solution:
   
````RAZOR
<div class="disabled-button" style="width: fit-content;">
    <TelerikButton Enabled="false">Hover me</TelerikButton>
</div>

<TelerikTooltip TargetSelector=".disabled-button">
    <Template>
        @{
            <h6>
                <strong>Disabled button</strong>
            </h6>
        }
    </Template>
</TelerikTooltip>
````

## See Also

- [Tooltip Component Overview](slug:tooltip-overview)
- [Button Component Overview](slug:components/button/overview)
