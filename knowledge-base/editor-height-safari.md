---
title: Fix the height of the Editor in Iframe mode in Safari
description: How to fix the height of the Editor in Iframe mode in Safari
type: how-to
page_title: Fix the height of the Editor in Iframe mode in Safari
slug: editor-kb-height-safari
position:
tags:
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Editor for Blazor</td>
		</tr>
	</tbody>
</table>


## Description

I am using the Telerik UI for Blazor Editor and the edit mode is set to Iframe. I would like to editor to take all the available height and thus set its Height parameter to 100%. When I run it under the Safari browser the height of the content area is not applied correctly.

## Solution

The issue stems from the Iframe support of the Safari browser and especially when the height is set in percentage. The solution is to use CSS and set the height of content area. Depending on the desired UI of the application the rules should change from the one set in the example below.

>caption Set the height of the content area of the Editor

````CSHTML
@*Use CSS to set the height of the content area*@

<style>
    .myEditor .k-editor-content .k-iframe {
        height: 100%;
    }
</style>

<div style="height:600px; width:600px">

    <h2>IFrame</h2>
    <TelerikEditor @bind-Value="@Val1" EditMode="@EditorEditMode.Iframe" Class="myEditor"></TelerikEditor>

</div>
@code {
    public string Val1 { get; set; } = "<p>I am in an iframe</p>";
}
````


