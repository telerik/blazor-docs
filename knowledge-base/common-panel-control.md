---
title: Panel Control
description: How to use a control like a Panel from WebForms in Blazor
type: how-to
page_title: Panel Control Equivalent from WebForms
slug: common-kb-panel-control
position: 
tags: 
ticketid: 1503388
res_type: kb
---

## Environment
<table>
	<tbody>
	</tbody>
</table>


## Description
Is there a good equivalent in your control set or plans for new controls as a replacement for the Web Forms Panel control? We are trying to replicate UI that we had in our Web Forms project and we cannot find a good replacement for a panel.

I often have the situation that i have some controls (Textboxes, DropDowns,...). In Webforms i used a panel or AjaxPanel for example to set all of them invisible/visible. I am missing such a control in Blazor UI.

## Solution
The Panel control in WebForms renders as a simple `<div>`, so this is what you could use to replace it in any razor-based solution (be that blazor, mvc, razor pages). You can set things like `class` or `tabIndex` to it for styling and other functionality.

Instead of setting the `Visible` property of a component/panel/control to toggle its visibility, you can toggle its CSS `display` property, or you just wrap the content you want to remove in a conditional `if`-block.

Depending on your needs, you might not even need a top-level element anymore, or you could use a different element (such as a `<fieldset>`). You could even wrap the desired logic inside your own component and provide a `Visible` parameter to it which will toggle the contents with an if-block. The razor syntax allows full flexibility in the way you approach this.

>caption Example of Panel-like Visibility toggle and appearance styling through a CSS class

````CSHTML
@if (SpecialPortionVisible)
{
    <div class="alert alert-success">this here is the special content</div>
}
else
{
    <div class="alert alert-info">you can even do if-else checks easily, but you do not have to</div>
}

<button @onclick="@( () => SpecialPortionVisible = !SpecialPortionVisible )">toggle content</button>


@code{
    bool SpecialPortionVisible { get; set; } = true;
}
````


