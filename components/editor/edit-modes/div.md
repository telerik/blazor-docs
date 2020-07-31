---
title: Div
page_title: Editor - Div Edit Mode
description: Div Edit Mode in the Editor for Blazor.
slug: editor-edit-modes-div
tags: telerik,blazor,edit,mode,div
published: True
position: 3
---


# Editor Div Edit Mode

The Div [edit mode]({%slug editor-edit-modes-overview%}) uses a `<div>` element for the editable area of the Editor.

This has the following implications:

* CSS rules from the current page apply to the content as well.
    
    * This includes rules that would match elements and classes you have in the content, so the content looks like the current page.
    * Such behavior can be useful when the final styles for the content will be similar/identical to the current page hosting the editor.
    * You can cascade classes that will affect only the editor content but not the rest of the page through the `.k-editor-content` class - this is the wrapper of the editor content area.

* The Editor cannot add specific styling for elements in the editable area, as they would be elements selectors (such as `table {border: 1px solid black}`) which can impact negatively the hosting page.

To use this mode, set the `EditMode` parameter of the editor to `EditorEditMode.Div` explicitly:

>caption Use the `Div` edit mode

````CSHTML
<TelerikEditor EditMode="@EditorEditMode.Div"></TelerikEditor>
````

The example below shows how you can customize the appearance of elements in the editor. It showcases the following:

* an element selector from the page affects the editor (e.g., the `p` selector in the sample)
* if your content has predefined classes, attribute and other features that can be used in CSS selectors, you can target them too (e.g., the `h1.my-heading` selector)
* how to make the editor adjust its height based on the content height - see the `Height="auto"` parameter
* how to cascade rules so that they only affect the editor content and not the main page (see the `.k-editor-content` cascade)
* how to style the content area element itself

>caption Customize the content area appearance in Div mode

````CSHTML
@using Telerik.Blazor.Components.Editor

@* The "auto" height makes the browser expand the editor according to its contents *@

<TelerikEditor EditMode="@EditorEditMode.Div" Height="auto"
               Width="740px" Tools="@EditorToolSets.All" @bind-Value="@TheEditorContent">
</TelerikEditor>

<style>
    /* style generic elements */
    p {
        background-color: #affffa;
        margin: 2em;
    }

    /* style tables - e.g., to add borders so the user can see them.
    The editor adds the .k-table class to tables
    This will style only the content area itself and not the main page because of the .k-editor-content selector
    */
    .k-editor-content .k-table {
        border: 2px dashed #808080;
    }
    .k-editor-content  .k-table td {
        border: 1px solid #808080;
    }

    /* style an element in the content that already has a certain class */
    h1.my-heading {
        color: red;
    }

    /* style only the content area itself and not its contents */
    .k-editor-content .k-content{
        background: pink;
    }
</style>

@code {
    string TheEditorContent { get; set; } = @"<h1 class=""my-heading"">Lorem ipsum</h1>
        <p>Dolor sit amet.</p>
        <table>
          <tr>
            <th>Col 1</th>
            <th>Col 2</th>
          </tr>
          <tr>
            <td>Cell 1 1</td>
            <td>Cell 1 2</td>
          </tr>
          <tr>
            <td>Cell 2 1</td>
            <td>Cell 2 2</td>
          </tr>
        </table>
        <p>
            Praesent egestas mi nec lobortis sagittis. Cras luctus at nunc et porta. Pellentesque non sagittis lectus, ac iaculis purus. Quisque posuere, arcu eget porta commodo, magna ante finibus justo, non blandit dolor lectus at sem. Vivamus vehicula euismod neque, vel egestas nibh porttitor vitae. Nam efficitur congue lacus, vel cursus sapien tempus id. Suspendisse quam velit, laoreet vel nisl vitae, commodo auctor est. Donec id velit vel magna aliquet consectetur at nec magna. Nunc vel odio maximus augue rutrum accumsan non vitae mi.
        </p>
        <p>
            Sed id mattis nisl, at pretium mauris. Sed a risus blandit, auctor elit sit amet, eleifend orci. Praesent nisl diam, scelerisque auctor mi ut, faucibus maximus urna. Ut non consectetur urna, ac dapibus ex. Suspendisse non arcu sapien. Nullam sed dignissim diam. In vel diam id urna iaculis lacinia vitae quis lacus. Praesent ipsum velit, vehicula eget mi sit amet, suscipit vehicula massa. Vivamus id mattis libero, sit amet mattis tellus.
        </p>";
}
````

## See Also

  * [Editor Overview]({%slug editor-overview%})
  * [Editor Toolbar]({%slug editor-toolbars%})

