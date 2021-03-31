---
title: Display ON/OFF Labels of the Switch in Bootstrap and Material
description: How to display ON/OFF Labels of the Switch in Bootstrap and Material
type: how-to
page_title: Display ON/OFF Labels of the Switch in Bootstrap and Material
slug: switch-kb-display-labels-in-bootstrap
position: 
tags: 
ticketid: 1513399
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Switch for Blazor</td>
		</tr>
	</tbody>
</table>


## Description
Telerik Switch control doesn't seem to display the ON/OFF Labels when used with Bootstrap.
How can I customize it to show the ON/OFF labels when I'm using Bootstrap theme?

## Solution
In Bootstrap and Material themes the Switch component does not render any labels by design. You can also test that in our [live demo](https://demos.telerik.com/blazor-ui/switch/labels).

The labels have classes k-switch-label-on and k-switch-label-off which have display:none property.

In order to display the ON/OFF labels when using Bootstrap or Material themes, you can use custom CSS and override their current display property. See the example below for reference and test it with Bootstrap/Material theme.

````CSHTML
@* Show the ON/OFF labels in Bootstrap and Material *@

<style>
    .k-switch-label-on, .k-switch-label-off {
        display: inline;
    }
</style>

<label>
    <TelerikSwitch @bind-Value="@isSelected" />
    <br />
    @( isSelected ? "Selected" : "Not selected" )
</label>

@code {
    private bool isSelected { get; set; }
}
````
