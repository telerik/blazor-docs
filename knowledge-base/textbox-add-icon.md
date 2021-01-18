---
title: How can I add an icon to a TextBox?
description: How to add an icon or button in the textbox.
type: how-to
page_title: How to add icon to the textbox
slug: textbox-kb-add-icon
position: 
tags: 
ticketid: 1461494, 1459772
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>TextBox for Blazor</td>
		</tr>
	</tbody>
</table>


## Description
I would like to add a icon in the TextBox, like a search icon, or email or phone. 

Is there anyway to do an 'addon' button with the TelerikTextBox?

## Solution
You simply need to add the desired icon and HTML, and to style them so they fit your needs. Libraries like Bootstrap offer design patterns for this, or you could apply your own styling over your own elements.

The example below showcases both approaches and here is the outcome from it:

![add icon to the textbox - result](images/textbox-icon-example.png)

>caption How to add icons to the textbox

````CSHTML
<h3>Bootstrap prepend or append approach</h3>

<div style="width: 500px;">
    <div class="form-group">
        <div class="input-group">
            <div class="input-group-prepend">
                <label for="theTb">
                    <span class="input-group-text">
                        <TelerikIcon Icon="home" />
                        &nbsp;Home
                    </span>
                </label>
            </div>
            <TelerikTextBox Class="form-control" @bind-Value="@TheText" Id="theTb" />
        </div>
    </div>
</div>


<h3>Your own element to overlap the textbox</h3>


<label>
    the label text
    <span class="tb-icon-container">
        @* Use the desired icons and styling here, 
            if you use a little more complex markup you could even 
            add event handlers to make this into a button *@
        <TelerikIcon Icon="zoom" />
        <TelerikTextBox @bind-Value="@TheText" />
    </span>
</label>

<br />
<br />
<span class="tb-icon-container with-label">
    <TelerikIcon Icon="zoom" />
    <TelerikTextBox @bind-Value="@TheText" Label="some label" />
</span>
<style>
    .tb-icon-container {
        position: relative;
    }

        /* these rules position the icon. Update with your own selector if you add HTML elements for click events */
        .tb-icon-container .k-icon {
            position: absolute;
            z-index: 1;
            top: 0;
            left: 0.5em;
        }

        /* no floating label */
        .tb-icon-container input.k-textbox,
        /* for the floating label */
        .tb-icon-container .k-textbox input,
        .tb-icon-container .k-state-empty .k-label {
            padding-left: 2em;
        }

        /* this rule also positions the icon for the floating label scenario, tweak it with your own selectors if you use other HTML */
        .tb-icon-container.with-label .k-icon {
            top: 0.5em;
        }
</style>

@code{
    string TheText { get; set; } = "lorem ipsum";
}
````
