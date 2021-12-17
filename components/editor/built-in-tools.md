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

This article explains which are the built-in tools of the `Editor`, how to invoke them programatically and what functionality they offer. 

In this article:

* [Built-in Tools](#built-in-tools)
	* [Inline Tools](#inline-tools)
	* [Color Tool Customization](#color-tool-customization)
	* [Block Tools](#block-tools)
	* [Table Tools](#table-tools)
	* [Commands Without Built-in Tools](#commands-without-built-in-tools)
* [Programmatic Execution](#programmatic-execution)


## Built-in Tools

The sections below list the tools that come with the editor and provide the following information:

* `Tool Name` - the human-readable name of the tool.

* `Command Name` - the `commandName` of the tool for [executing it programmatically](#programmatic-execution).

* `Tool Type` - the type of the tool - whether it is a button, a dropdown or a color tool. Only buttons can be added to tool groups in the [toolbar]({%slug editor-toolbars%}).

* `Description` - more detailed information on what the tool does.

* `Class Name` - the name of the class that you need to instantiate in order to [add the tool to the toolbar]({%slug editor-toolbars%}) in your own code.

* `Arguments` - the type of the argument you must pass to the `ExecuteAsync` method of the editor in order to invoke the command programmatically.

There are the following types of tools:

* [Inline Tools](#inline-tools)
* [Block Tools](#block-tools)
* [Table Tools](#table-tools)
* [Commands Without Built-in Tools](#commands-without-built-in-tools)

### Inline Tools

The `Inline` tools work with or add an inline HTML element. Example of these are an `<a>`, `<img>`, `<strong>` and `<em>`.

>caption Table 1: Inline tools in the Editor

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
            <td><a href="#color-tool-customization">BackgroundColor</a></td>
            <td>backColor</td>
            <td>Color</td>
            <td>Change the background color of the selected text</td>
            <td>new BackgroundColor()</td>
            <td>new FormatCommandArgs(string commandName, string Value)</td>
        </tr>
        <tr>
            <td><a href="#color-tool-customization">ForeColor</a></td>
            <td>foreColor</td>
            <td>Color</td>
            <td>Change the font color of a selected text</td>
            <td>new ForeColor()</td>
            <td>new FormatCommandArgs(string commandName, string Value)</td>
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

### Color Tool Customization

The `ForeColor` and `BackgroundColor` tools expose a `Colors` property that accepts a color collection as `IEnumerable<string>`. You can provide a member of [`ColorPalettePresets`](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.ColorPalettePresets), or a custom list of [RGB(A) or HEX colors in different supported formats]({%slug colorpicker-overview%}#supported-value-formats).

````CSHTML
@using Telerik.Blazor.Components.Editor

<TelerikEditor Tools="@Tools"
               @bind-Value="@Value"></TelerikEditor>

@code {
    string Value { get; set; }

    List<IEditorTool> Tools { get; set; } = new List<IEditorTool>() {
        new ForeColor() { Colors = new List<string> { "#f00", "#ff9900", "rgb(0, 128, 0)", "rgba(0, 0, 255, .8)" } },
        new BackgroundColor() { Colors = ColorPalettePresets.Basic }
    };
}
````

### Block Tools

The `Block` tools work with or add a block HTML element, like `<h1>`, `<h2>`, `<p>` and `<ul>`.

>caption Table 2: Block tools in the Editor

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
            <td>new ImageCommandArgs(string src, string alt, string width, string height)</td>
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

>caption Table 3: Table tools in the Editor

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
            <td>DeleteTable</td>
            <td>deleteTable</td>
            <td>Button</td>
            <td>Deletes the selected HTML table</td>
            <td>new DeleteTable()</td>
            <td>new ToolCommandArgs(string commandName)</td>
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


### Commands Without Built-in Tools

There are commands without built-in tools, but can be [executed programmatically](#programmatic-execution).

>caption Table 4: Commands without tools in the Editor

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
            <td>Clean Formatting</td>
            <td>cleanFormatting</td>
            <td>N/A</td>
            <td>Cleans the inline formatting of a selected text</td>
            <td>N/A</td>
            <td>new ToolCommandArgs(string commandName)</td>
        </tr>
        <tr>
            <td>Insert HTML</td>
            <td>insertHTML</td>
            <td>N/A</td>
            <td>Inserts HTML at the cursor position. To insert multiple nodes, wrap them in a single element.<br />By default this is a block command that will wrap passed inline content in a <code>p</code> or <code>div</code>, depending on the context. To insert inline content, set the third argument to <code>true</code>. There are separate commands for inserting links and images.</td>
            <td>N/A</td>
            <td>new HtmlCommandArgs(string commandName, string value, bool inline)</td>
        </tr>
    </tbody>
</table>

## Programmatic Execution

You can invoke the built-in editor tools from outside the component or from [custom tools]({%slug editor-custom-tool%}).

In order to do so you need to use the [Editor reference]({%slug editor-overview%}#component-reference) and to call the [ExecuteAsync method]({%slug editor-overview%}#methods).

>tip Use the reference tables above to find the command name and its arguments for the tool you want to invoke.

>caption Execute tools from buttons outside the Editor

````CSHTML
@* Click on the buttons to execute the Editor tools *@

@using Telerik.Blazor.Components.Editor

<TelerikButton OnClick="@InsertHr">Insert hr</TelerikButton>
<TelerikButton OnClick="@BoldText">Create bold text</TelerikButton>
<TelerikButton OnClick="@InsertTable">Insert Table</TelerikButton>
<TelerikButton OnClick="@InsertImage">Insert Image</TelerikButton>
<TelerikButton OnClick="@InsertInlineText">Insert Inline Text</TelerikButton>

<TelerikEditor @ref="@TheEditor" @bind-Value="@TheContent"></TelerikEditor>

@code{
    TelerikEditor TheEditor { get; set; }

    string TheContent { get; set; } = "<p>Lorem ipsum.</p><p>Dolor sit amet.</p>";

    async Task InsertHr()
    {
        await TheEditor.ExecuteAsync(new HtmlCommandArgs("insertHtml", "<hr />"));
    }

    async Task InsertInlineText()
    {
        await TheEditor.ExecuteAsync(new HtmlCommandArgs("insertHtml", "John Doe", true));
    }

    async Task InsertImage()
    {
        await TheEditor.ExecuteAsync(new ImageCommandArgs("https://demos.telerik.com/blazor-ui/images/articles/1-220x140.png", "the alt text", "220px", "140px"));
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

