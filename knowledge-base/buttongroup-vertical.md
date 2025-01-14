---
title: Vertical ButtonGroup
description: How to create a vertical Blazor ButtonGroup with CSS
type: how-to
page_title: Vertical ButtonGroup
slug: buttongroup-kb-vertical
position: 
tags: buttongroup, vertical, button
ticketid: 1554336
res_type: kb
---

## Environment

<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>ButtonGroup for Blazor</td>
		</tr>
	</tbody>
</table>

## Description

How to create a vertical button group? What is the best way to make the buttons display one below the other?

## Solution

[Override the ButtonGroup styles](slug://themes-override) and change the default horizontal [flexbox layout](https://css-tricks.com/snippets/css/a-guide-to-flexbox/). Make the following changes:

* Change the `flexbox-flow` style to `column`.
* Set a `Width` to the button group or leave it expand to 100%.
* Determine whether the button group should fall on a separate line or not.
* Reset the button margins.
* Change the rounded corners.

````RAZOR
<p>Inline button group</p>

before

<TelerikButtonGroup Class="vertical-buttons" Width="100px">
    <ButtonGroupToggleButton>First</ButtonGroupToggleButton>
    <ButtonGroupToggleButton>Second</ButtonGroupToggleButton>
    <ButtonGroupToggleButton>Third</ButtonGroupToggleButton>
</TelerikButtonGroup>

after

<p>Block button group</p>

before

<TelerikButtonGroup Class="vertical-buttons block-buttons" Width="100px">
    <ButtonGroupToggleButton>First</ButtonGroupToggleButton>
    <ButtonGroupToggleButton>Second</ButtonGroupToggleButton>
    <ButtonGroupToggleButton>Third</ButtonGroupToggleButton>
</TelerikButtonGroup>

after

<style>
    /* arrange buttons vertically */
    .vertical-buttons {
        flex-flow: column;
    }

    /* set block display */
    .block-buttons {
        display: flex;
    }

    /* remove default margins and overlapping */
    .vertical-buttons .k-button {
        margin: 0;
    }
    .vertical-buttons.k-button-group > .k-button + .k-button {
        margin-inline-start: 0;
    }

    /* adjust rounded and square corners */
    .vertical-buttons.k-button-group > .k-button:first-child:not(:only-child) {
        border-radius: 2px 2px 0 0;
    }
    .vertical-buttons.k-button-group > .k-button:last-child:not(:only-child) {
        border-radius: 0 0 2px 2px;
    }

</style>
````
