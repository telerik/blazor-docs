---
title: Custom Tools
page_title: Custom Editor Tools
description: How to make a custom tool in the Editor for Blazor.
slug: editor-custom-tools
tags: telerik,blazor,custom,tool
published: True
position: 60
previous_url: /components/editor/custom-tool
components: ["editor"]
---

# Editor Custom Tools

The [Blazor Editor](https://www.telerik.com/blazor-ui/editor) component lets you add custom tools to its [toolbar](slug:editor-toolbar). In those tools, you can use both the [built-in tools and commands](slug:editor-built-in-tools) the editor provides, and also your own custom logic.

In this article:

* [Basics](#basics)
* [Examples](#examples)
	* [Change the Value](#change-the-value)
	* [Use Editor Commands](#use-editor-commands)
    * [Save Command](#save-command)

## Basics

To create a custom tool:

1. Make sure your Editor has the `<EditorCustomTools>` tag.

1. Under it, add an `<EditorCustomTool>` tag and set its `Name` parameter to something you can use to distinguish this tool. You can add more than one custom tool in the Editor.

1. Inside that tag, add your custom content (e.g., buttons, dropdowns, etc.) with their desired rendering, data, logic, event handlers.

1. [Add the custom tool to the Editor toolbar via the `Tools` collection](slug:editor-toolbar#choose-toolbar-items). You can add the custom tools in the desired order and position, regardless of their order in the markup. Custom tools can be added as standalone tools only, not inside an `EditorButtonGroup`.

1. Manipulate the editor content as desired from the custom content events (like clicks) - either through the [editor commands](slug:editor-built-in-tools), or with your own code that manipulates its `Value` field contents.

## Examples

When [choosing which Editor tools to render](slug:editor-toolbar#choose-toolbar-items), it is possible to [create a tools collection from scratch](slug:editor-toolbar#create-a-toolbar-from-scratch) or [append additional tools to a preset collection](slug:editor-toolbar#add-remove-tools-from-existing-toolbar).

In this section you can find the following examples:

* [Change the Value](#change-the-value)
* [Use Editor Commands](#use-editor-commands)
* [Save Command](#save-command)

### Change the Value

>caption Custom tool that manipulates the Value to add a signature at the end

<demo metaUrl="client/editor/custom-tools/change-value/" height="480"></demo>


### Use Editor Commands

>caption Custom Tool that uses the editor commands to alter the selected content

<demo metaUrl="client/editor/custom-tools/use-editor-commands/" height="480"></demo>

### Save Command

You can call application code from the editor tools to, for example, save the current content.

<demo metaUrl="client/editor/custom-tools/save-command/" height="480"></demo>


<!--
### More Examples

The [blazor-ui repo]() contains more exmaples of creating custom tools - they also include custom dropdowns, custom dialogs, and extracting the rendering and main logic of the custom tool to a separate component to declutter the main view.
-->


## See Also

* [Editor Overview](slug:editor-overview)
* [Built-in Tools](slug:editor-built-in-tools)
* [Toolbar](slug:editor-toolbar)

