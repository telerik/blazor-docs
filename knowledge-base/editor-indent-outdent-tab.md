---
title: How can I make the TAB key indent a bulleted list (or SHIFT+TAB to outdent), instead of causing Editor to lose focus?
description: How to Indent and Outdent lists with Tab and Shift+Tab instead of move focus
type: how-to
page_title: Indent and Outdent lists with Tab and Shift+Tab
slug: editor-kb-indent-outdent-tab
position: 
tags: 
ticketid: 1492306
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

When editing a bulleted list, striking the TAB key causes the Editor component to lose focus.

Expected result: current list item is indented

Actual result: Editor loses focus

## Solution

Make sure to read the [notes](#notes) below.

To achieve such behavior:

1. Capture the keyboard events as desired. For example, use the editor in its [`Div` mode]({%slug editor-edit-modes-div%}) and use the Blazor event handling system.

    * If you want, you can also stop the events so they don't invoke their default behavior (moving focus). This is not implemented in this sample (see the [notes](#notes) below).

1. Fire the [editor commands]({%slug editor-edit-modes-div%}) that you want to accomplish the given task - for example, `indent` and `outdent`.

>caption Tab and Shift+Tab to indent and outdent bullet lists.

````CSHTML
@using Telerik.Blazor.Components.Editor

@* Use buttons like these to compare the behavior - by indent/outdent you cannot remove or create lists, and you can only indent an item when another item will remain in the list, so you cannot indent the first item *@
@*<button @onclick="InvokeIndent">indent</button>
<button @onclick="InvokeOutdent">OUTdent</button>*@

<div @onkeydown="@KeyPressHandler">
    <TelerikEditor @ref="@TheEditor" EditMode="@EditorEditMode.Div" @bind-Value="@TheContent"></TelerikEditor>
</div>

@code{
    TelerikEditor TheEditor { get; set; }
    string TheContent { get; set; }

    async Task InvokeIndent()
    {
        await TheEditor.ExecuteAsync(new ToolCommandArgs("indent"));
    }

    async Task InvokeOutdent()
    {
        await TheEditor.ExecuteAsync(new ToolCommandArgs("outdent"));
    }

    async Task KeyPressHandler(KeyboardEventArgs e)
    {
        // use any preferred logic to capture the keyboard event, then invoke the editor commands
        // https://docs.telerik.com/blazor-ui/components/editor/built-in-tools
        if (e.Code == "Tab")
        {
            if (e.ShiftKey)
            {
                Console.WriteLine("Shift+Tab");
                await InvokeOutdent();
            }
            else
            {
                Console.WriteLine("just Tab");
                await InvokeIndent();
            }
        }
    }

    protected override void OnInitialized()
    {
        TheContent = @"<ul>
                        <li>first in ul</li>
                        <li>second unnumbered</li>
                        <li>third li in UL</li>
                    </ul>
                    <ol>
                        <li>first in OL</li>
                        <li>second numbered</li>
                        <li>number three</li>
                    </ol>";
        base.OnInitialized();
    }
}
````

## Notes

>important The `Tab` and `Shift+Tab` key combinations are extremely important in keyboard navigation on a web page. Their primary purpose is to move the focus between focusable elements (such as inputs, buttons and so on). Altering or preventing this behavior must be done with great care to ensure you do not hinder the accessibility of your page.

See the comments in the code snippet above on the indent and outdent command behavior. They have effect only when they are meaningful.

