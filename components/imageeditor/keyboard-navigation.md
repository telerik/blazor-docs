---
title: Keyboard Navigation
page_title: ImageEditor - Keyboard Navigation
description: Find the default keyboard shortcuts of the ImageEditor for Blazor and learn how to operate the toolbar, the sidebar, the tool panes, and the canvas with the keyboard.
slug: imageeditor-keyboard-navigation
tags: telerik,blazor,imageeditor,keyboard,shortcuts,accessibility
published: True
position: 95
components: ["imageeditor"]
---

# ImageEditor Keyboard Navigation

The [ImageEditor](slug:imageeditor-overview) provides keyboard navigation for its toolbar, sidebar, tool panes, and canvas. This article lists the default keyboard shortcuts. It extends the general information about [keyboard navigation in Telerik UI for Blazor](slug:accessibility-overview#keyboard-navigation).

The sidebar uses [roving focus](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex). The tool pane is exposed as a labeled region. The canvas is focusable and exposed as an application when an image is loaded, and the canvas image has an accessible name.

## General Shortcuts

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Key Combination | Description |
| --- | --- |
| `Tab` / `Shift` + `Tab` | Moves focus through the focusable controls in the toolbar, the sidebar, the tool pane, and the canvas. |
| `Alt` + `W` | Moves focus to the first available control in the toolbar when focus is inside the editor. On macOS, use `Option` + `W`. |
| `Ctrl` + `O` | Opens an image. This shortcut also works when no image is loaded. |
| `Ctrl` + `Z` | Undoes the last edit. |
| `Ctrl` + `Y` | Redoes the last reverted edit. |
| `Ctrl` + `Shift` + `S` | Opens the [Export Image dialog](slug:imageeditor-export#export-dialog). |
| `Escape` | Stops the text editing, closes the active tool pane, or clears the selected object. |

## Zoom Shortcuts

| Key Combination | Description |
| --- | --- |
| `Ctrl` + `+` / `Ctrl` + `=` / `Ctrl` + `Add` | Zooms in. |
| `Ctrl` + `-` / `Ctrl` + `Subtract` | Zooms out. |
| `Shift` + `1` | Fits the image to the screen. |
| `Shift` + `0` | Displays the image at its actual size. |

## Sidebar and Tool Pane Shortcuts

| Key Combination | Description |
| --- | --- |
| `Arrow` keys | Move focus between the tools in the sidebar. |
| `Home` / `End` | Focus the first or the last tool in the sidebar. |
| `Enter` / `Space` | Activate the focused sidebar tool. |
| `Ctrl` + `F3` | Moves focus to the active tool pane. |

## Object Shortcuts

The following shortcuts apply to the [objects on the canvas](slug:imageeditor-tools#objects).

| Key Combination | Description |
| --- | --- |
| `R` | Inserts a rectangle. |
| `O` | Inserts an ellipse. |
| `L` | Inserts a line. |
| `T` | Inserts a text box. |
| `Arrow` keys | Nudge the selected object. |
| `Ctrl` + `D` | Duplicates the selected object. |
| `Delete` | Deletes the selected object. The component requests confirmation before it deletes the object. |

## Text Formatting Shortcuts

The following shortcuts apply when editable text is active or selected.

| Key Combination | Description |
| --- | --- |
| `Ctrl` + `B` | Applies bold formatting. |
| `Ctrl` + `I` | Applies italic formatting. |
| `Ctrl` + `U` | Applies underline formatting. |
| `Ctrl` + `Shift` + `L` | Aligns the text to the left. |
| `Ctrl` + `Shift` + `E` | Centers the text. |
| `Ctrl` + `Shift` + `R` | Aligns the text to the right. |

## Notes

* On macOS, the `Command` key replaces `Ctrl` for the command shortcuts.
* The shortcuts that act on an image or on a selected object require a loaded image.
* While the text editor has focus, the component handles the text formatting shortcuts and `Escape`, but not the other editor shortcuts.
* `Backspace` does not delete the selected object.

## See Also

* [Live Demo: ImageEditor](https://demos.telerik.com/blazor-ui/imageeditor/overview)
* [ImageEditor API Reference](slug:Telerik.Blazor.Components.TelerikImageEditor)
* [Accessibility in Telerik UI for Blazor](slug:accessibility-overview)
