---
title: Highlight textbox content on focus
description: How to select all the textbox content on click or focus.
type: how-to
page_title: Highlight textbox content on focus
slug: textbox-kb-select-in-focus
position: 
tags: 
ticketid: 1480268
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

As soon as I click inside the textbox, I want to select the whole text. How to highlight all the text when the input is focused?


## Solution

At the time of writing, Blazor does not have native API for handling focus and selection, so you need to use JS Interop to select the textbox content.

1. Prepare a small JavaScript function that will call the [select](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/select) method of the input.

    **JavaScript**
    
        <script>
            function selectText(tbId) {
                var tb = document.querySelector("#" + tbId);
                if (tb.select) {
                    tb.select();
                }
            }
        </script>

1. Call that function in the desired event like `@focusin`. See how to get such events [here]({%slug inputs-kb-handle-keyboard-events%}).

    **Razor**
    
        @inject IJSRuntime _js
        
        <span @onfocusin="@FocusInHandler">
            <TelerikTextBox @bind-Value="@TbValue" Id="@TheTbId"></TelerikTextBox>
        </span>
        
        @code{
            string TbValue { get; set; } = "lorem ipsum";
            string TheTbId { get; set; } = "myTb";
        
            async Task FocusInHandler(FocusEventArgs e)
            {
                await _js.InvokeVoidAsync("selectText", TheTbId);
            }
        }



