---
title: Display ON/OFF Labels of the Switch in Bootstrap and Material
description: How to display ON/OFF Labels of the Switch in Bootstrap and Material theme
type: how-to
page_title: Display ON/OFF Labels of the Switch in Bootstrap and Material Theme
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
How can I customize it to show the ON/OFF labels when I'm using Bootstrap or Material theme?

## Solution
In Bootstrap and Material themes the Switch component does not render any labels by design. You can also test that in our [live demo](https://demos.telerik.com/blazor-ui/switch/labels).

The labels have classes k-switch-label-on and k-switch-label-off which have display:none property.

In order to display the ON/OFF labels when using Bootstrap or Material themes, you can use custom CSS and override their current display property. You can also add the desired styles to control their appearance. See the examples below for reference and test them with Bootstrap/Material theme.

>caption Display the ON/OFF labels in Bootstrap

````CSHTML
@* Display and style ON/OFF Switch labels in Bootstrap *@

<style>
    .k-switch-label-on, .k-switch-label-off {
        display: inline;
    }

    .k-switch-label-on {
        left: 7px;
        color: #ffffff;
        text-transform: uppercase;
    }

    .k-switch-label-off {
        right: 5px;
        color: #424242;
        text-transform: uppercase;
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

>caption Display the ON/OFF labels in Material


````CSHTML
@* Display and style ON/OFF Switch labels in Material *@

<style>
    .k-switch-label-on, .k-switch-label-off {
        display: inline;
    }

    .k-switch-label-on {
        left: 3px;
        font-size: 7px;
        color: #ffffff;
        text-transform: uppercase;
    }

    .k-switch-label-off {
        right: 1px;
        font-size: 7px;
        color: #ffffff;
        text-transform: uppercase;
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