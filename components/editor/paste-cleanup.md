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
<p>Copy this paragraph that has some <font color="red" face="Courier New">inline font </font> and <span style="font-family:Impact, Charcoal, sans-serif;color:#ffffff;background-color:#3366ff;">inline styles</span> and <span data-id="some-metadata">paste it </span> in the Editor<!--I am a comment that will disappear-->.</p>

@* Some sample paste cleanup settings to showcase their usage- the first three ones are commonly used for MS Word and these are their default values *@

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

The editor content as a string so you can see the differences with the original content above:
<br />
@EditorValue

@code {
    public string EditorValue { get; set; }
    public List<string> RemoveAttributes { get; set; } = new List<string>() { "data-id" };
    public List<string> StripTags { get; set; } = new List<string>() { "font" };
}
````

## Paste Settings Features

The following list describes the behaviors and functionality each parameter of the `EditorPasteSettings` provides:

* `ConvertMsList` - `bool` - If set to `true` (defaults to `true`), MS Word lists will be converted into HTML lists. By default, Word's list are paragraphs with the respective styling which is not accurate in html.

* `RemoveHtmlComments` - `bool` - If set to `true`, comments will be removed from the HTML.
For example, `<!-- comment --> <p> content </p>` will result in `<p> content </p>`

* `RemoveAllAttributes` - `bool` - Determines whether all DOM attributes should be stripped. Takes precedence over `RemoveMsClasses`, `removeMsStyles`, `RemoveAttributes`.

* `RemoveMsClasses` - `bool` - If set to `true` (defaults to `true`), class attributes starting with `Mso` will be removed from the HTML. These are usually classes that come with content pasted from MS Word. For example,  `<p class="MsoNormal">pasted from MS Word</p>` will result in `<p>pasted from MS Word</p>`.

* `RemoveMsStyles` - `bool`- If set to `true` (defaults to `true`), style attributes starting with `Mso` will be removed from the HTML. These are usually styles that come with content pasted from MS Word. For example, `<p><span style="color:#7C7C7C; mso-themecolor:accent3; mso-themeshade:191;">content</span></p>` will result in `<p><span style="color: #7C7C7C; background: silver;">content</span></p>`.

* `StripTags` - `List<string>` - Specifies a list of tags to be removed from the HTML. Child nodes of removed tags will be kept in place. For example. when `StripTags` is `{ "span" }` , pasting `<p><span lang=EN-US>content</span></p>` will result in `<p>content</p>`.

* `RemoveAttributes` - `List<string>` - Specifies the DOM attributes that should be removed from the HTML. For example, when set to `{ "lang" }` , pasting `<p><span lang=EN-US>content</span></p>` will result in `<p><span>content</span></p>`.



## Notes

This section provides information on a few key concepts and behaviors that you should be aware of:

* [Content Size](#content-size)
* [Content Sanitization](#content-sanitization)
* [Paste Text and Image from MS Word](#paste-text-and-image-from-ms-word)


### Content Size
@[template](/_contentTemplates/editor/general.md#content-size-signalr)

### Content Sanitization

>caution The content cleaning the editor performs happens on paste only. The user can still alter the HTML and if you are sending or receiving data over the wire, there is a chance such requests can be intercepted and altered maliciously if the application is not secured. Therefore, the paste cleanup functionality of the editor cannot and does not replace content sanitization according to the application's standards and logic.
>
> @[template](/_contentTemplates/editor/general.md#app-must-sanitize-content)


The editor clears `<script>` tags and removes DOM event handler attributes (e.g., `<img onerror="code();" onclick="otherCode();" alt="lorem ipsum" />` will become `<img  alt="lorem ipsum" />`). The user can still alter this and data can be modified during transmission as well, as explained above.

>tip To clean up content and ensure it is safe, before you store and reuse it, you can consider ready-made HTML sanitization libraries that are available on free package sources like nuget.org. While Telerik is not in a position to recommend particular packages, we recommend you consider such an approach.

### Paste Text and Image from MS Word

If you copy both text and an image from MS Word and paste in the Editor, the image will not get pasted as expected. This behavior is due to the security policy of the browser.

Instead of reading the image data and loading it as a `base64` string to the `src` attribute of the `<img> `element, the browser generates an `<img>` tag which points to the clipboard location of the file on the client machine.

A browser is not allowed to access such a resource, and so it throws an error and the image is not rendered which you can verify in the browser dev tools console, you will see an error such as: `"Not allowed to load local resource: <some image path>"`. 

You can read more about this in <a href="https://stackoverflow.com/questions/39007243/cannot-open-local-file-chrome-not-allowed-to-load-local-resource" target="_blank">this StackOverflow thread</a>.

#### Work Around

To work around this browser behavior, copy only the text or a single image from the MS Word document, and paste the image in the content area of the Editor separately. 

By default, the browser allows you to copy and paste a single image from Word in the Editor by converting its `src` to a `base64` string. 

If you paste more images at the same time, their `src` attributes will not be converted to `base64` strings and the browser will paste them with their `http` protocol and `URL` pointing to the physical folder which will result in the error described above.

## See Also

  * [Editor Overview]({%slug editor-overview%})
  * [Live Demo: Paste Cleanup](https://demos.telerik.com/blazor-ui/editor/paste-cleanup)
