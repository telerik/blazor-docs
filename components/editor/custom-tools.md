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
	* [Replace the CreateLink Tool](#replace-the-createlink-tool)
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

### Replace the CreateLink Tool

The built-in `CreateLink` tool opens the predefined hyperlink dialog. To control the dialog markup, remove `CreateLink` from the `Tools` collection and add a custom tool that opens your own [`TelerikDialog`](slug:dialog-overview). After the user enters the link details, execute the Editor `createLink` command with `LinkCommandArgs`.

The following example creates a toolbar without the built-in `CreateLink` tool and uses a custom dialog instead.

````RAZOR
@using Telerik.Blazor.Components.Editor

<TelerikEditor @ref="@EditorRef"
			   Tools="@Tools"
			   @bind-Value="@EditorValue">
	<EditorCustomTools>
		<EditorCustomTool Name="CustomCreateLink">
			<TelerikButton OnClick="@OpenLinkDialog">Insert Hyperlink</TelerikButton>
		</EditorCustomTool>
	</EditorCustomTools>
</TelerikEditor>

<TelerikDialog @bind-Visible="@LinkDialogVisible" Title="Insert Hyperlink">
	<DialogContent>
		<label for="link-url">URL</label>
		<TelerikTextBox Id="link-url" @bind-Value="@LinkUrl" />

		<label for="link-text">Text</label>
		<TelerikTextBox Id="link-text" @bind-Value="@LinkText" />

		<label for="link-title">Title</label>
		<TelerikTextBox Id="link-title" @bind-Value="@LinkTitle" />
	</DialogContent>
	<DialogButtons>
		<TelerikButton OnClick="@ApplyLink">Insert</TelerikButton>
		<TelerikButton OnClick="@CloseLinkDialog">Cancel</TelerikButton>
	</DialogButtons>
</TelerikDialog>

@code {
	private TelerikEditor EditorRef { get; set; }

	private string EditorValue { get; set; } = "<p>Select text, then insert a link.</p>";

	private List<IEditorTool> Tools { get; set; } = new()
	{
		new Bold(),
		new CustomTool("CustomCreateLink"),
		new Unlink()
	};

	private bool LinkDialogVisible { get; set; }

	private string LinkUrl { get; set; } = "https://www.example.com";

	private string LinkText { get; set; } = "Example link";

	private string LinkTitle { get; set; } = "Example link";

	private void OpenLinkDialog()
	{
		LinkDialogVisible = true;
	}

	private void CloseLinkDialog()
	{
		LinkDialogVisible = false;
	}

	private async Task ApplyLink()
	{
		await EditorRef.ExecuteAsync(new LinkCommandArgs(LinkUrl, LinkText, "_blank", LinkTitle, null));
		LinkDialogVisible = false;
	}
}
````

The browser owns the current text selection. Preserve the selection before opening the custom dialog if the command has to apply to the selected text. For more information, see [getting the selected content from the Editor](slug:editor-kb-get-selection).

## Examples

When [choosing which Editor tools to render](slug:editor-toolbar#choose-toolbar-items), it is possible to [create a tools collection from scratch](slug:editor-toolbar#create-a-toolbar-from-scratch) or [append additional tools to a preset collection](slug:editor-toolbar#add-remove-tools-from-existing-toolbar).

In this section you can find the following examples:

* [Change the Value](#change-the-value)
* [Use Editor Commands](#use-editor-commands)
* [Save Command](#save-command)

### Change the Value

>caption Custom tool that manipulates the Value to add a signature at the end

<demo metaUrl="client/editor/custom-tools/change-value/" height="400"></demo>


### Use Editor Commands

>caption Custom Tool that uses the editor commands to alter the selected content

<demo metaUrl="client/editor/custom-tools/use-editor-commands/" height="400"></demo>

### Save Command

You can call application code from the editor tools to, for example, save the current content.

<demo metaUrl="client/editor/custom-tools/save-command/" height="400"></demo>


<!--
### More Examples

The [blazor-ui repo]() contains more exmaples of creating custom tools - they also include custom dropdowns, custom dialogs, and extracting the rendering and main logic of the custom tool to a separate component to declutter the main view.
-->


## See Also

* [Editor Overview](slug:editor-overview)
* [Built-in Tools](slug:editor-built-in-tools)
* [Toolbar](slug:editor-toolbar)

