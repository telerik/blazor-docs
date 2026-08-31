---
title: Built-in Tools
page_title: Editor - Built-in Tools and Commands
description: Built-in Tools and commands in the Editor for Blazor.
slug: editor-built-in-tools
tags: telerik,blazor,built-in,tools
published: True
position: 40
components: ["editor"]
---

# Editor Built-in Tools

This article explains which are the built-in tools and commands of the Editor, how to invoke them programmatically and what functionality they offer.


## How to Use this Article

This article describes the Editor *tools* and *commands*.

An Editor *tool* is the visible interface for a given action. For example, the button that bolds text is a tool. Built-in  tools can render as buttons, color pickers or dropdown lists. The Editor also supports [custom tools with custom rendering](slug:editor-custom-tools).

An Editor *command* is the action, which modifies the HTML value in some way. Each built-in Editor tool has an associated command. Custom tools can execute business logic or invoke built-in commands.

The information about the Editor tools and commands is organized in tables below. Here is what the table headers mean:

* `Class Name` - use it to [add the tool to the Editor toolbar](slug:editor-toolbar)

* `Command Name` - use it to [execute the command programmatically](#programmatic-execution). In this case, also use the syntax from the `Argument` column.

* `Tool Type` - a tool can be a [button](slug:Telerik.Blazor.Components.Editor.ButtonTool), a [dropdown list](slug:Telerik.Blazor.Components.Editor.DropDownListTool) or a [color picker](slug:Telerik.Blazor.Components.Editor.ColorTool). Each of these three types exposes some customization options. See the examples for the [color tools](#color-tool-customization), [font tools](#font-tool-customization) and the [Format tool](#format-tool-customization). Only *buttons* can be added to tool groups in the [toolbar](slug:editor-toolbar).

* `Description` - information about what the tool and command do.

* `Argument for ExecuteAsync` - shows the expected class instance and parameters that you must pass to the Editor's `ExecuteAsync` method to invoke the command programmatically.

Here is a simple example that demonstrates how to use class names, command names and `ExecuteAsync` arguments.

>caption Use tool class names and command names with the Blazor Editor

<demo metaUrl="client/editor/built-in-tools/use-tool-class-names/" height="480"></demo>


## Built-in Tools and Commands

* [Inline Tools](#inline-tools)
    * [Color Tool Customization](#color-tool-customization)
    * [Font Tool Customization](#font-tool-customization)
* [Block Tools](#block-tools)
    * [Format Tool Customization](#format-tool-customization)
* [Table Tools](#table-tools)
* [Commands Without Built-in Tools](#commands-without-built-in-tools)
* [Programmatic Command Execution](#programmatic-execution)

When [choosing which Editor tools to render](slug:editor-toolbar#choose-toolbar-items), it is possible to [create a tools collection from scratch](slug:editor-toolbar#create-a-toolbar-from-scratch) or [append additional tools to a preset collection](slug:editor-toolbar#add-remove-tools-from-existing-toolbar).

## Inline Tools

The inline tools add or work with inline HTML elements. For example, such elements are `<a>`, `<img>`, `<strong>` and `<em>`.

>caption Table 1: Inline Tools of the Editor

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

<table>
    <thead>
        <tr>
            <th>Class Name</th>
            <th>Command Name</th>
            <th>Tool Type</th>
            <th>Description</th>
            <th>Argument for ExecuteAsync</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Bold</td>
            <td>bold</td>
            <td>button</td>
            <td>Applies bold style</td>
            <td>new ToolCommandArgs(string commandName)</td>
        </tr>
        <tr>
            <td><a href="#color-tool-customization">BackgroundColor</a></td>
            <td>backColor</td>
            <td>color</td>
            <td>Changes the background color</td>
            <td>new FormatCommandArgs(string commandName, string Value)</td>
        </tr>
        <tr>
            <td><a href="#color-tool-customization">ForeColor</a></td>
            <td>foreColor</td>
            <td>color</td>
            <td>Changes the text color</td>
            <td>new FormatCommandArgs(string commandName, string Value)</td>
        </tr>
        <tr>
            <td>CreateLink</td>
            <td>createLink</td>
            <td>button</td>
            <td>Creates a hyperlink</td>
            <td>new LinkCommandArgs(string href, string text, string target, string title, null)</td>
        </tr>
        <tr>
            <td><a href="#font-tool-customization">FontFamily</a></td>
            <td>fontFamily</td>
            <td>dropdown</td>
            <td>Sets the font typeface</td>
            <td>new FormatCommandArgs(string commandName, string Value)</td>
        </tr>
        <tr>
            <td><a href="#font-tool-customization">FontSize</a></td>
            <td>fontSize</td>
            <td>dropdown</td>
            <td>Sets the text font size</td>
            <td>new FormatCommandArgs(string commandName, string Value)</td>
        </tr>
        <tr>
            <td>Italic</td>
            <td>italic</td>
            <td>button</td>
            <td>Applies italic style</td>
            <td>new ToolCommandArgs(string commandName)</td>
        </tr>
        <tr>
            <td>Strikethrough</td>
            <td>strikethrough</td>
            <td>button</td>
            <td>Applies strikethrough formatting</td>
            <td>new ToolCommandArgs(string commandName)</td>
        </tr>
        <tr>
            <td>SubScript</td>
            <td>subscript</td>
            <td>button</td>
            <td>Makes the selected text subscript</td>
            <td>new ToolCommandArgs(string commandName)</td>
        </tr>
        <tr>
            <td>SuperScript</td>
            <td>superscript</td>
            <td>button</td>
            <td>Makes the selected text superscript</td>
            <td>new ToolCommandArgs(string commandName)</td>
        </tr>
        <tr>
            <td>Underline</td>
            <td>underline</td>
            <td>button</td>
            <td>Applies underline style</td>
            <td>new ToolCommandArgs(string commandName)</td>
        </tr>
        <tr>
            <td>Unlink</td>
            <td>unlink</td>
            <td>button</td>
            <td>Removes a hyperlink</td>
            <td>new ToolCommandArgs(string commandName)</td>
        </tr>
    </tbody>
</table>


### Color Tool Customization

The `ForeColor` and `BackgroundColor` tools expose a few customization properties:

| Property | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `Colors` | `IEnumerable<string>`. | The list of available colors to set from the Color tool. You can provide a member of [`ColorPalettePresets`](slug:Telerik.Blazor.ColorPalettePresets), or a custom list of [RGB(A) or HEX colors in different supported formats](slug:colorpicker-overview#supported-value-formats). |
| `Title` | `string` | The tooltip content that shows on tool mouse over. |
| `ValueFormat` | `ColorFormat` enum <br /> (`Rgb`) | The format, which the Color tool will set in the generated HTML markup. Use `Rgb` or `Hex`. |

>caption Customizing the Editor Color Tools

<demo metaUrl="client/editor/built-in-tools/color-tool-customization/" height="480"></demo>


### Font Tool Customization

The [`FontFamily`](slug:Telerik.Blazor.Components.Editor.FontFamily) and [`FontSize`](slug:Telerik.Blazor.Components.Editor.FontSize) tools have a `Data` property that accepts a `List<EditorDropDownListItem>`. Use it to customize the available options in these dropdowns. You can also change the dropdown label via `DefaultText`.

<demo metaUrl="client/editor/built-in-tools/font-tool-customization/" height="480"></demo>


## Block Tools

The block tools add or work with block HTML elements, like `<h1>`, `<h2>`, `<p>` and `<ul>`.

All tools in the table below are *buttons*, except `Format`, which is a *dropdown*.

>caption Table 2: Block Tools of the Editor

<table>
    <thead>
        <tr>
            <th>Class Name</th>
            <th>Command Name</th>
            <th>Description</th>
            <th>Argument for ExecuteAsync</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>AlignCenter</td>
            <td>alignCenter</td>
            <td>Aligns the selected paragraph to the center</td>
            <td>new ToolCommandArgs(string commandName)</td>
        </tr>
        <tr>
            <td>AlignJustify</td>
            <td>alignJustify</td>
            <td>Justifies the selected paragraph</td>
            <td>new ToolCommandArgs(string commandName)</td>
        </tr>
        <tr>
            <td>AlignLeft</td>
            <td>alignLeft</td>
            <td>Aligns the selected paragraph to the left</td>
            <td>new ToolCommandArgs(string commandName)</td>
        </tr>
        <tr>
            <td>AlignRight</td>
            <td>alignRight</td>
            <td>Aligns the selected paragraph to the right</td>
            <td>new ToolCommandArgs(string commandName)</td>
        </tr>
        <tr>
            <td><a href="#format-tool-customization">Format</a></td>
            <td>format</td>
            <td>Applies standard formatting to the selected text like Heading 1, Paragraph and so on. Unlike the other tools in this table, this one is a dropdown.</td>
            <td>new FormatCommandArgs(string commandName, string Value)</td>
        </tr>
        <tr>
            <td>Indent</td>
            <td>indent</td>
            <td>Adds indent to the selected text</td>
            <td>new ToolCommandArgs(string commandName)</td>
        </tr>
        <tr>
            <td>InsertImage</td>
            <td>insertImage</td>
            <td>Inserts image from a desired URL</td>
            <td>new ImageCommandArgs(string src, string alt, string width, string height)</td>
        </tr>
        <tr>
            <td>OrderedList</td>
            <td>insertOrderedList</td>
            <td>Creates a list of numeric bullets</td>
            <td>new ToolCommandArgs(string commandName)</td>
        </tr>
        <tr>
            <td>Outdent</td>
            <td>outdent</td>
            <td>Removes indent from the selected text</td>
            <td>new ToolCommandArgs(string commandName)</td>
        </tr>
        <tr>
            <td>Redo</td>
            <td>redo</td>
            <td>Repeats the last undone action</td>
            <td>new ToolCommandArgs(string commandName)</td>
        </tr>
        <tr>
            <td>ViewHtml</td>
            <td>setHtml</td>
            <td>Shows and updates the raw HTML of the Editor content</td>
            <td>new HtmlCommandArgs(string commandName, string value)</td>
        </tr>
        <tr>
            <td>Undo</td>
            <td>undo</td>
            <td>Reverts the last action</td>
            <td>new ToolCommandArgs(string commandName)</td>
        </tr>
        <tr>
            <td>UnorderedList</td>
            <td>insertUnorderedList</td>
            <td>Creates a list of bullets</td>
            <td>new ToolCommandArgs(string commandName)</td>
        </tr>
    </tbody>
</table>

### Format Tool Customization

The [`Format` tool exposes a `Data` property](slug:Telerik.Blazor.Components.Editor.Format) that accepts a `List<EditorDropDownListItem>`. Use it to reduce or reorder the items in the dropdown list.

<demo metaUrl="client/editor/built-in-tools/format-tool-customization/" height="480"></demo>


## Table Tools

The table tools create and manipulate HTML `<table>` elements. These tools can add or remove columns and rows, and merge or split cells.

All tools in the table below are *buttons*.

>caption Table 3: Editor Table Tools

<table>
    <thead>
        <tr>
            <th>Class Name</th>
            <th>Command Name</th>
            <th>Description</th>
            <th>Argument for ExecuteAsync</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>InsertTable</td>
            <td>insertTable</td>
            <td>Inserts a table with the desired number of columns and rows</td>
            <td>new TableCommandArgs(int rows, int cols)</td>
        </tr>
        <tr>
            <td>DeleteTable</td>
            <td>deleteTable</td>
            <td>Deletes the selected HTML table</td>
            <td>new ToolCommandArgs(string commandName)</td>
        </tr>
        <tr>
            <td>AddColumnBefore</td>
            <td>addColumnBefore</td>
            <td>Inserts a column before the selected one</td>
            <td>new ToolCommandArgs(string commandName)</td>
        </tr>
        <tr>
            <td>AddColumnAfter</td>
            <td>addColumnAfter</td>
            <td>Inserts a column after the selected one</td>
            <td>new ToolCommandArgs(string commandName)</td>
        </tr>
        <tr>
            <td>AddRowBefore</td>
            <td>addRowBefore</td>
            <td>Inserts a row before the selected one</td>
            <td>new ToolCommandArgs(string commandName)</td>
        </tr>
        <tr>
            <td>AddRowAfter</td>
            <td>addRowAfter</td>
            <td>Inserts a row after the selected one</td>
            <td>new ToolCommandArgs(string commandName)</td>
        </tr>
        <tr>
            <td>DeleteRow</td>
            <td>deleteRow</td>
            <td>Deletes the selected row</td>
            <td>new ToolCommandArgs(string commandName)</td>
        </tr>
        <tr>
            <td>DeleteColumn</td>
            <td>deleteColumn</td>
            <td>Deletes the selected column</td>
            <td>new ToolCommandArgs(string commandName)</td>
        </tr>
        <tr>
            <td>MergeCells</td>
            <td>mergeCells</td>
            <td>Merges the selected cells</td>
            <td>new ToolCommandArgs(string commandName)</td>
        </tr>
        <tr>
            <td>SplitCell</td>
            <td>splitCell</td>
            <td>Splits already merged cells</td>
            <td>new ToolCommandArgs(string commandName)</td>
        </tr>
    </tbody>
</table>


## Commands Without Built-in Tools

Some Editor commands have no built-in tools. These commands can only be [invoked programmatically](#programmatic-execution).

>caption Table 4: Editor Commands Without Tools

<table>
    <thead>
        <tr>
            <th>Command Name</th>
            <th>Description</th>
            <th>Arguments for ExecuteAsync</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>cleanFormatting</td>
            <td>Cleans the inline formatting of a selected text</td>
            <td>new ToolCommandArgs(string commandName)</td>
        </tr>
        <tr>
            <td>insertHtml</td>
            <td>Inserts HTML at the cursor position. To insert multiple nodes, wrap them in a single element.<br />By default this is a block command that will wrap passed inline content in a <code>p</code> or <code>div</code>, depending on the context. To insert inline content, set the third argument to <code>true</code>.<br />Note there are separate commands for inserting links and images.</td>
            <td>new HtmlCommandArgs(string commandName, string value, bool inline)</td>
        </tr>
    </tbody>
</table>


## Programmatic Execution

You can invoke the built-in Editor commands from outside the component or from [custom tools](slug:editor-custom-tools).

In order to do so, you need to use the [Editor reference](slug:editor-overview#editor-reference-and-methods) and to call the [ExecuteAsync method](slug:editor-overview#editor-reference-and-methods).

>tip Use the reference tables above to find the command name and its arguments for the command you want to invoke.

>caption Execute commands from buttons outside the Editor

<demo metaUrl="client/editor/built-in-tools/programmatic-execution/" height="560"></demo>


## See Also

* [Editor Overview](slug:editor-overview)
* [Editor Toolbar](slug:editor-toolbar)
