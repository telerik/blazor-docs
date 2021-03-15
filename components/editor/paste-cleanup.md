---
title: Paste Cleanup
page_title: Editor - Paste Cleanup
description: Paste Cleanup of the content of the Editor for Blazor, such as from MS Word.
slug: editor-paste-cleanup
tags: telerik,blazor,editor,paste,cleanup
position: 70
---

# Editor Paste Cleanup

The Telerik Editor component for Blazor can improve the quality of the content pasted into it by removing tags and attributes, and by fixing issues such as lists pasted from Microsoft Word.

#### In this article


* [Basics](#basics)
* [Paste Settings Features](#paste-settings-features)
* [Notes](#notes)


## Basics

To control the behavior of the editor when content is pasted, you can set the desired parameters to its `EditorPasteSettings` tag that you can find under the `EditorSettings` tag.

>caption Set pasting behaviors in the Telerik Editor

````CSHTML
@* Some sample paste cleanup settings to showcase their usage *@

<TelerikEditor @bind-Value="@EditorValue">
    <EditorSettings>
        <EditorPasteSettings ConvertMsLists="true"
                             RemoveMsClasses="true"
                             RemoveMsStyles="true"
                             RemoveHtmlComments="true"
                             StripTags="@StripTags"
                             RemoveAttributes="@RemoveAttributes">
        </EditorPasteSettings>
    </EditorSettings>
</TelerikEditor>
@code {
    public string EditorValue { get; set; }
    public List<string> RemoveAttributes { get; set; } = new List<string>() { "onclick", "onerror" };
    public List<string> StripTags { get; set; } = new List<string>() { "font" } ;
}
````

## Paste Settings Features

The following list describes the behaviors and functionality each parameter of the `EditorPasteSettings` provides:

* `ConvertMsList` - `bool` - If set to `true`, MS Word lists will be converted into HTML lists. By default, Word's list are paragraphs with the respective styling which is not accurate in html.

* `RemoveHtmlComments` - `bool` - If set to `true`, comments will be removed from the HTML.
For example, `<!-- comment --> <p> content </p>` will result in `<p> content </p>`

* `RemoveAllAttributes` - `bool` - Determines whether all DOM attributes should be stripped. Takes precedence over `RemoveMsClasses`, `removeMsStyles`, `RemoveAttributes`.

* `RemoveMsClasses` - `bool` - If set to `true`, class attributes starting with `Mso` will be removed from the HTML. These are usually classes that come with content pasted from MS Word. For example,  `<p class="MsoNormal">pasted from MS Word</p>` will result in `<p>pasted from MS Word</p>`.

* `RemoveMsStyles` - `bool`- If set to `true`, style attributes starting with `Mso` will be removed from the HTML. These are usually styles that come with content pasted from MS Word. For example, `<p><span style="color:#7C7C7C; mso-themecolor:accent3; mso-themeshade:191;">content</span></p>` will result in `<p><span style="color: #7C7C7C; background: silver;">content</span></p>`.

* `StripTags` - `List<string>` - Specifies a list of tags to be removed from the HTML. Child nodes of removed tags will be kept in place. For example. when `StripTags` is `{ "span" }` , pasting `<p><span lang=EN-US>content</span></p>` will result in `<p>content</p>`.

* `RemoveAttributes` - `List<string>` - Specifies the DOM attributes that should be removed from the HTML. For example, when set to `{ "lang" }` , pasting `<p><span lang=EN-US>content</span></p>` will result in `<p><span>content</span></p>`.



## Notes

>caution The content cleaning the editor performs happens on paste only. The user can still alter the HTML and if you are sending or receiving data over the wire, there is a chance such requests can be interecepted and altered maliciously. Therefore, the paste cleanup functionality of the editor cannot and does not replace content sanitization according to the application's standards and logic.
>
> @[template](/_contentTemplates/editor/general.md#app-must-sanitize-content)

## See Also

  * [Editor Overview]({%slug editor-overview%})
