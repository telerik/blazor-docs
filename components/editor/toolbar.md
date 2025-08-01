---
title: Toolbar
page_title: Editor - Toolbar
description: Controlling the Toolbar in the Editor for Blazor - add and define buttons and tools.
slug: editor-toolbar
tags: telerik,blazor,toolbar
published: True
position: 20
---


# Editor Toolbar

The toolbar of the editor is where it command buttons reside and they let the end user apply various formatting and styling - from bold and italic words, to creating lists, tables, inserting images or [custom tools](slug:editor-custom-tools) you can define.

![The Editor Toolbar](images/editor-toolbar-overview.png)

This article contains the following sections:

* [Basics](#basics)
* [Built-in Tool Lists](#built-in-tool-lists)
* [Choose Toolbar Items](#choose-toolbar-items)
	* [Add/Remove Tools From Existing Toolbar](#add-remove-tools-from-existing-toolbar)
	* [Create a Toolbar From Scratch](#create-a-toolbar-from-scratch)
	* [Customize Built-in Tools](#customize-built-in-tools)


## Basics

The Editor tools and commands are in the `Telerik.Blazor.Components.Editor` namespace. If you will be applying settings related to the tools (such as choosing a different built-in toolset or adding custom tools), you should add an `using` statement for this namespace.

To control the collection of buttons and commands available to the user, you provide the desired collection to the `Tools` parameter of the editor, which takes a `List<IEditorTool>`.

## Built-in Tool Lists

The Editor comes with [two predefined sets of tools](#predefined-toolset-configurations) in the `EditorToolSets` static class:

* `Default` includes the most commonly used tools and commands. If you do not apply any settings, the `Default` list of tools will be used.
* `All` includes all the available tools and commands.

The following example shows how to use the `All` toolset.

>caption Use all built-in Editor tools

<demo metaUrl="client/editor/builtintools/" height="420"></demo>

### Predefined Toolset Configurations

The following code snippets show the built-in toolset configurations in `EditorToolSets`. See the [Built-in Editor Tools](slug:editor-built-in-tools) article for more information on each tool.

<div class="skip-repl"></div>

````C#
public static List<IEditorTool> Default = new List<IEditorTool>()
{
    new EditorButtonGroup(new Bold(), new Italic(), new Underline()),
    new Format(),
    new EditorButtonGroup(new AlignLeft(), new AlignCenter(), new AlignRight(), new AlignJustify()),
    new EditorButtonGroup(new UnorderedList(), new OrderedList(), new Indent(), new Outdent()),
    new EditorButtonGroup(new CreateLink(), new Unlink()),
    new InsertImage()
};

public static List<IEditorTool> All = new List<IEditorTool>()
{
    new EditorButtonGroup(new Undo(), new Redo()),
    new EditorButtonGroup(new Bold(), new Italic(), new Underline(), new Strikethrough()),
    new EditorButtonGroup(new SubScript(), new SuperScript()),
    new Format(),
    new FontFamily(),
    new FontSize(),
    new ForeColor(),
    new BackgroundColor(),
    new EditorButtonGroup(new AlignLeft(), new AlignCenter(), new AlignRight(), new AlignJustify()),
    new EditorButtonGroup(new UnorderedList(), new OrderedList(), new Indent(), new Outdent()),
    new EditorButtonGroup(new CreateLink(), new Unlink()),
    new InsertImage(),
    new InsertTable(),
    new EditorButtonGroup(new AddColumnBefore(), new AddColumnAfter(), new AddRowBefore(), new AddRowAfter()),
    new EditorButtonGroup(new DeleteColumn(), new DeleteRow(), new DeleteTable()),
    new EditorButtonGroup(new MergeCells(), new SplitCell()),
    new ViewHtml()
};
````

## Choose Toolbar Items

To define your own customized collection of tools, you use the `Tools` parameter of the Editor component and populate it with the commands you want available. They can include [custom tools](slug:editor-custom-tools).

The `Tools` collection is a `List<IEditorTool>`.

Editor tools can be individual buttons (such as Undo, Bold), dropdowns (such as Format or FontSize), and button groups that hold several buttons. 

To add a button, add a `new <Command>()` where `Command` is the name of the tool from [this table](slug:editor-built-in-tools#built-in-tools-and-commands). The VS Intellisense can also show you the classes in the `Telerik.Blazor.Components.Editor.` namespace.

To define a button group, add a `new EditorButtonGroup(comma-separated collection of button commands)`.

Button groups can take only buttons, and dropdowns and custom tools cannot be added to them.

>caption Examples:

* [Add/Remove Tools From Existing Toolbar](#add-remove-tools-from-existing-toolbar)
* [Create a Toolbar From Scratch](#create-a-toolbar-from-scratch)
* [Customize Built-in Tools](#customize-built-in-tools)

### Add/Remove Tools From Existing Toolbar

This example shows how to start from the existing `Default` toolbar collection of the editor and to modify it to:

* add Undo and Redo to the beginning, in their own tool group;
* add Supercript tool to the Bold, Italic, Underline group;
* Remove the Format tool;
* add ViewHtml at the end, in its own toolgroup.

>caption Modify the Default toolset

<demo metaUrl="client/editor/modifytools/" height="400"></demo>


### Create a Toolbar From Scratch

This example shows how you can keep adding tools to the toolbar to get the desired collection.

>caption Create your own toolbar

<demo metaUrl="client/editor/createtoolbar/" height="400"></demo>


### Customize Built-in Tools

When adding a built-in tool to the collection, you can set various parameters to it, such as `Class`, `Icon`, `Title` for buttons; `DefaultText` or a customized `Data` collection for dropdowns. The tools have default values, and you can alter them. You also have access to the default `Data` collections of the drodown tools through the `EditorDropDownListToolItems` static class.

>caption Customize the default values of the built-in tools - tooltips, available items, class and appearance

<demo metaUrl="client/editor/customizetools/" height="400"></demo>


## See Also

* [Editor Overview](slug:editor-overview)
