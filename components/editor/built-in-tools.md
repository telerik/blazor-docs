---
title: Built-in Tools
page_title: Editor - Built-in Tools
description: Built-in Tools in the Editor for Blazor.
slug: editor-built-in-tools
tags: telerik,blazor,built-in,tools
published: True
position: 40
---


# Editor Built-in Tools

This article explains which are the built-in tools of the `Editor`, how to invoke them from programatically and what functionality do they offer. 

In this article:

* [Built-in Tools](#build-in-tools)
    * [Inline Tools](#inline-tools) 
    * [Block Tools](#block-tools)
    * [Table Tools](#table-tools)
* [Tools Execution](#tools-execution)


## Built-in Tools

### Inline Tools

The `Inline` tools add an inline HTML element. Example of these are an `<a>`, `<img>`, `<strong>` and `<em>`.

<table>
    <thead>
        <tr>
            <th>Tool Name</th>
            <th>Command Name</th>
            <th>Tool Type</th>
            <th>Description</th>
            <th>Class Name</th>
            <th>Arguments</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Bold</td>
            <td>bold</td>
            <td>Button</td>
            <td>Applies bold formatting to the selected text</td>
            <td>new Bold()</td>
            <td>new ToolCommandArgs(string commandName)</td>
        </tr>
        <tr>
            <td>CreateLink</td>
            <td>createLink</td>
            <td>Button</td>
            <td>Create a hyperlink from the selected text</td>
            <td>new CreateLink()</td>
            <td>new LinkCommandArgs(string href, string text, string target, string title, null)</td>
        </tr>
        <tr>
            <td>FontFamily</td>
            <td>fontFamily</td>
            <td>DropDown</td>
            <td>Specify the font typeface for the selected text</td>
            <td>new FontFamily()</td>
            <td>new FormatCommandArgs(string commandName, string Value)</td>
        </tr>
        <tr>
            <td>FontSize</td>
            <td>fontSize</td>
            <td>DropDown</td>
            <td>Specify the size of the selected text</td>
            <td>new FontSize()</td>
            <td>new FormatCommandArgs(string commandName, string Value)</td>
        </tr>
        <tr>
            <td>Italic</td>
            <td>italic</td>
            <td>Button</td>
            <td>Applies italic formatting to the selected text</td>
            <td>new Italic()</td>
            <td>new ToolCommandArgs(string commandName)</td>
        </tr>
        <tr>
            <td>Strikethrough</td>
            <td>strikethrough</td>
            <td>Button</td>
            <td>Applies strikethrough formatting to the selected text</td>
            <td>new Strikethrough()</td>
            <td>new ToolCommandArgs(string commandName)</td>
        </tr>
        <tr>
            <td>SubScript</td>
            <td>subscript</td>
            <td>Button</td>
            <td>Makes the selected text subscript</td>
            <td>new SubScript()</td>
            <td>new ToolCommandArgs(string commandName)</td>
        </tr>
        <tr>
            <td>SuperScript</td>
            <td>superscript</td>
            <td>Button</td>
            <td>Makes the selected text superscript</td>
            <td>new SuperScript</td>
            <td>new ToolCommandArgs(string commandName)</td>
        </tr>
        <tr>
            <td>Underline</td>
            <td>underline</td>
            <td>Button</td>
            <td>Applies underline formatting to the selected text</td>
            <td>new Underline()</td>
            <td>new ToolCommandArgs(string commandName)</td>
        </tr>
        <tr>
            <td>Unlink</td>
            <td>unlink</td>
            <td>Button</td>
            <td>Remove a hyperlink</td>
            <td>new Unlink()</td>
            <td>new ToolCommandArgs(string commandName)</td>
        </tr>
    </tbody>
</table>

### Block Tools

The `Block` tools add a block HTML element, like `<h1>`, `<h2>`, `<p>` and `<ul>`.

<table>
    <thead>
        <tr>
            <th>Tool Name</th>
            <th>Command Name</th>
            <th>Tool Type</th>
            <th>Description</th>
            <th>Class Name</th>
            <th>Arguments</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>AlignCenter</td>
            <td>alignCenter</td>
            <td>Button</td>
            <td>Aligns the selected paragraph to the center</td>
            <td>new AlignCenter()</td>
            <td>new ToolCommandArgs(string commandName)</td>
        </tr>
        <tr>
            <td>AlignJustify</td>
            <td>alignJustify</td>
            <td>Button</td>
            <td>Justifies the selected paragraph</td>
            <td>new AlignJustify()</td>
            <td>new ToolCommandArgs(string commandName)</td>
        </tr>
        <tr>
            <td>AlignLeft</td>
            <td>alignLeft</td>
            <td>Button</td>
            <td>Aligns the selected paragraph to the left</td>
            <td>new AlignLeft()</td>
            <td>new ToolCommandArgs(string commandName)</td>
        </tr>
        <tr>
            <td>AlignRight</td>
            <td>alignRight</td>
            <td>Button</td>
            <td>Aligns the selected paragraph to the right</td>
            <td>new AlignRight()</td>
            <td>new ToolCommandArgs(string commandName)</td>
        </tr>
        <tr>
            <td>Format</td>
            <td>format</td>
            <td>DropDown</td>
            <td>Applies standard formatting to the selected text like Heading 1, Paragraph and so on</td>
            <td>new Format()</td>
            <td>new FormatCommandArgs(string commandName, string Value)</td>
        </tr>
        <tr>
            <td>Indent</td>
            <td>indent</td>
            <td>Button</td>
            <td>Add indent to the selected text</td>
            <td>new Indent()</td>
            <td>new ToolCommandArgs(string commandName)</td>
        </tr>
        <tr>
            <td>InsertImage</td>
            <td>insertImage</td>
            <td>Button</td>
            <td>Inserts image from a desired URL</td>
            <td>new InsertImage()</td>
            <td>new ImageCommandArgs(string src, string alt, string width, string height, string commandName)</td>
        </tr>
        <tr>
            <td>OrderedList</td>
            <td>insertOrderedList</td>
            <td>Button</td>
            <td>Creates a list of bullets from the selection</td>
            <td>new OrderedList()</td>
            <td>new ToolCommandArgs(string commandName)</td>
        </tr>
        <tr>
            <td>Outdent</td>
            <td>outdent</td>
            <td>Button</td>
            <td>Remove indent from the selected text</td>
            <td>new Outdent()</td>
            <td>new ToolCommandArgs(string commandName)</td>
        </tr>
        <tr>
            <td>Redo</td>
            <td>redo</td>
            <td>Button</td>
            <td>Repeats the last undone action</td>
            <td>new Redo()</td>
            <td>new ToolCommandArgs(string commandName)</td>
        </tr>
        <tr>
            <td>ViewHtml</td>
            <td>setHtml</td>
            <td>Button</td>
            <td>Offers a HTML view for the selected text</td>
            <td>new ViewHtml()</td>
            <td>new HtmlCommandArgs(string commandName, string value)</td>
        </tr>
        <tr>
            <td>Undo</td>
            <td>undo</td>
            <td>Button</td>
            <td>Undoes the last action</td>
            <td>new Undo()</td>
            <td>new ToolCommandArgs(string commandName)</td>
        </tr>
        <tr>
            <td>UnorderedList</td>
            <td>insertUnorderedList</td>
            <td>Button</td>
            <td>Creates a list of bullets from the selection</td>
            <td>new UnorderedList()</td>
            <td>new ToolCommandArgs(string commandName)</td>
        </tr>
    </tbody>
</table>

### Table Tools

The `Table` tools add an HTML `<table>` or control its rendering, like adding columns and rows, merging and splitting cells.

<table>
    <thead>
        <tr>
            <th>Tool Name</th>
            <th>Command Name</th>
            <th>Tool Type</th>
            <th>Description</th>
            <th>Class Name</th>
            <th>Arguments</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>InsertTable</td>
            <td>insertTable</td>
            <td>Button</td>
            <td>Inserts a table with the desired number of columns and rows</td>
            <td>new InsertTable()</td>
            <td>new TableCommandArgs(int rows, int cols)</td>
        </tr>
        <tr>
            <td>AddColumnBefore</td>
            <td>addColumnBefore</td>
            <td>Button</td>
            <td>Inserts a column before the selected one</td>
            <td>new AddColumnBefore()</td>
            <td>new ToolCommandArgs(string commandName)</td>
        </tr>
        <tr>
            <td>AddColumnAfter</td>
            <td>addColumnAfter</td>
            <td>Button</td>
            <td>Inserts a column after the selected one</td>
            <td>new AddColumnAfter()</td>
            <td>new ToolCommandArgs(string commandName)</td>
        </tr>
        <tr>
            <td>AddRowBefore</td>
            <td>addRowBefore</td>
            <td>Button</td>
            <td>Inserts a row before the selected one</td>
            <td>new AddRowBefore()</td>
            <td>new ToolCommandArgs(string commandName)</td>
        </tr>
        <tr>
            <td>AddRowAfter</td>
            <td>addRowAfter</td>
            <td>Button</td>
            <td>Inserts a row after the selected one</td>
            <td>new AddRowAfter()</td>
            <td>new ToolCommandArgs(string commandName)</td>
        </tr>
        <tr>
            <td>DeleteRow</td>
            <td>deleteRow</td>
            <td>Button</td>
            <td>Deletes the selected row</td>
            <td>new DeleteRow()</td>
            <td>new ToolCommandArgs(string commandName)</td>
        </tr>
        <tr>
            <td>DeleteColumn</td>
            <td>deleteColumn</td>
            <td>Button</td>
            <td>Deletes the selected column</td>
            <td>new DeleteColumn()</td>
            <td>new ToolCommandArgs(string commandName)</td>
        </tr>
        <tr>
            <td>MergeCells</td>
            <td>mergeCells</td>
            <td>Button</td>
            <td>Merges the selected cells</td>
            <td>new MergeCells()</td>
            <td>new ToolCommandArgs(string commandName)</td>
        </tr>
        <tr>
            <td>SplitCell</td>
            <td>splitCell</td>
            <td>Button</td>
            <td>Splits already merged cells</td>
            <td>new SplitCell()</td>
            <td>new ToolCommandArgs(string commandName)</td>
        </tr>
    </tbody>
</table>

## Tools Execution

You can invoke the `Editors` tools from outside the component. 

In order to do so you need to use the [Editor reference]({%slug editor-overview%}#component-reference) and use the [ExecuteAsync method]({%slug editor-overview%}#methods).

>caption Execute tools from buttons outside the Editor

````CSHTML
@* Click on the buttons to execute the Editor tools *@

@using Telerik.Blazor.Components.Editor

<TelerikButton OnClick="@InsertHr">Insert hr</TelerikButton>
<TelerikButton OnClick="@BoldText">Create bold text</TelerikButton>
<TelerikButton OnClick="@InsertTable">Insert Table</TelerikButton>
<TelerikButton OnClick="@InsertImage">Insert Image</TelerikButton>


<TelerikEditor @ref="@TheEditor" @bind-Value="@TheContent" Height="100%"></TelerikEditor>

@code{
    TelerikEditor TheEditor { get; set; }

    string TheContent { get; set; } = "<p>Lorem ipsum.</p><p>Dolor sit amet.</p>";

    async Task InsertHr()
    {
        await TheEditor.ExecuteAsync(new FormatCommandArgs("insertHtml", "<hr />"));
    }

    async Task InsertImage()
    {
        await TheEditor.ExecuteAsync(new ImageCommandArgs("https://demos.telerik.com/blazor-ui/images/articles/1-220x140.png", "image", "220px", "140px"));
    }

    async Task BoldText()
    {
        await TheEditor.ExecuteAsync(new ToolCommandArgs("bold"));
    }

    async Task InsertTable()
    {
        await TheEditor.ExecuteAsync(new TableCommandArgs(4, 4));
    }
}
````

## See Also

  * [Editor Overview]({%slug editor-overview%})
  * [Editor Toolbar]({%slug editor-toolbars%})

