---
title: Programmatic Copy and Paste in the Editor
description: Learn how to programmatically copy and paste in the Telerik UI for Blazor Editor with additional buttons in the Editor toolbar.
type: how-to
page_title: Programmatic Copy and Paste in the Editor with Toobar Buttons
slug: editor-kb-copy-paste-programmatically
ticketid: 1595176
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Editor for Blazor</td>
        </tr>
    </tbody>
</table>


## Description

How to implement **Copy** and **Paste** buttons in the Editor toolbar?

How can I copy and paste in the Editor component programmatically?


## Solution

To programmatically copy from the Editor:

1. Use a [custom Editor tool](slug://editor-custom-tools) that relies on plain HTML and completely client-side event handling. Do not use `@onclick` directives or Razor component events.
1. On tool click (pure JavaScript event), [obtain the window selection](https://developer.mozilla.org/en-US/docs/Web/API/Window/getSelection).
1. Use the [`write()`](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/write) method of the browser [`Clipboard`](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard).

To programmatically paste in the Editor:

1. Use a [custom Editor tool](slug://editor-custom-tools) that relies on plain HTML and completely client-side event handling. Do not use `@onclick` directives or Razor component events.
1. On tool click (pure JavaScript event), use the [`read()`](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/read) method of the browser Clipboard.
1. Pass the clipboard content to the [.NET runtime with `JSInterop`](https://learn.microsoft.com/en-us/aspnet/core/blazor/javascript-interoperability/call-dotnet-from-javascript).
1. Use the [`insertHtml` Editor command](slug://editor-built-in-tools#commands-without-built-in-tools). For more information, see the section on [programmatic execution](slug://editor-built-in-tools#programmatic-execution) and analyze if you will be pasting block content or inline content.

>caption Programmatic copy and paste in the Telerik UI for Blazor Editor

````RAZOR
@using Telerik.Blazor.Components.Editor

@inject IJSRuntime js

@implements IDisposable

<TelerikEditor @ref="@EditorRef"
               @bind-Value="@EditorValue"
               Tools="@Tools"
               Height="600px"
               Id="editor1">
    <EditorCustomTools>
        <EditorCustomTool Name="CustomCopy">
            <button class="k-button k-button-solid k-rounded-md k-button-md k-button-solid-base"
                    onclick="copyFromEditor()">
                <span class="k-button-text">Copy from Editor</span>
            </button>
        </EditorCustomTool>
        <EditorCustomTool Name="CustomPaste">
            <button class="k-button k-button-solid k-rounded-md k-button-md k-button-solid-base"
                    onclick="pasteInEditor()">
                <span class="k-button-text">Paste in Editor</span>
            </button>
        </EditorCustomTool>
    </EditorCustomTools>
</TelerikEditor>

@* Move the JavaScript to a separate JS file! *@
<script suppress-error="BL9992">
    var dotNetReference;

    function getDotNetRef(ref) {
        dotNetReference = ref;
    }

    function copyFromEditor() {
        // When using the Iframe EditMode:
        var windowObject = document.querySelector("#editor1 iframe").contentWindow;
        // When using the Div EditMode:
        //var windowObject = window;

        var sel = windowObject.getSelection();
        var html = "";
        if (sel.rangeCount) {
            // Extract the selected content from multiple tags.
            var container = document.createElement("div");
            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                container.appendChild(sel.getRangeAt(i).cloneContents());
            }
            html = container.innerHTML;
        }

        var data = [new ClipboardItem({
            'text/plain': new Blob([html], {type: 'text/plain'}),
            'text/html': new Blob([html], {type: 'text/html'})
        })];

        navigator.clipboard.write(data).then( () => {
                // success
            },
            () => {
                // failure
            }
        );
    }

    async function pasteInEditor() {
        var clipboardContent = await navigator.clipboard.read();

        var textBlob;
        var textContent = "";
        var htmlBlob;
        var htmlContent = "";

        for (const clipboardItem of clipboardContent) {
            for (const type of clipboardItem.types) {
                if (type == "text/plain") {
                    textBlob = await clipboardItem.getType(type);
                    // textContent will still contain tags
                    textContent = await new Response(textBlob).text();
                } else if (type == "text/html") {
                    htmlBlob = await clipboardItem.getType(type);
                    // htmlContent will contain inline styles
                    htmlContent = await new Response(htmlBlob).text();
                }
            }
        }

        dotNetReference.invokeMethodAsync("InsertClipboard", textContent);
    }
</script>

@code {
    private TelerikEditor EditorRef { get; set; } = null!;

    private string EditorValue { get; set; } = "<h1>Heading One</h1><ol><li>List item 1</li><li>List item 2</li></ol><p>This is a paragraph.</p>";

    private List<IEditorTool> Tools { get; set; } = null!;

    // Replace __Main with the actual name of the Razor component.
    private DotNetObjectReference<__Main>? DotNetRef;

    protected override Task OnInitializedAsync()
    {
        DotNetRef = DotNetObjectReference.Create(this);

        Tools = new List<IEditorTool>(EditorToolSets.All);

        Tools.Add(new CustomTool("CustomCopy"));
        Tools.Add(new CustomTool("CustomPaste"));

        return base.OnInitializedAsync();
    }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            await js.InvokeVoidAsync("getDotNetRef", DotNetRef);
        }

        await base.OnAfterRenderAsync(firstRender);
    }

    [JSInvokable]
    public async Task InsertClipboard(string clipboardContent)
    {
        // The insertHtml command can work with block or inline content,
        // but you need to know what you are getting.
        var blockTags = new string[] { "<h", "<p", "<div", "<ul", "<ol", "<li", "<table" };
        bool inlineInsert = !blockTags.Any(tag => clipboardContent.Contains(tag));

        // The insertHtml command expects one tag maximum,
        // so if there are more, wrap them.
        int childTags = System.Text.RegularExpressions.Regex.Matches(clipboardContent, "<").Count;
        string wrapTag = inlineInsert ? "span" : "div";

        if (childTags > 0)
        {
            clipboardContent = $"<{wrapTag}>{clipboardContent}</{wrapTag}>";
        }

        await EditorRef.ExecuteAsync(new HtmlCommandArgs("insertHtml", clipboardContent, inlineInsert));
    }

    public void Dispose()
    {
        DotNetRef?.Dispose();
    }
}
````


## Notes

* Replace `__Main` with the actual name of the Razor component, which holds the Editor.
* The above example makes a few assumptions, which affect the overall implementation. Adjust the example, according to your scenario and requirements.
* The code uses a lot of standard JavaScript API and general logic, which are not related to the Editor component.
* Copy-pasting a collection of several HTML tags, for example, list items, may produce unexpected or undesired results, depending on the paste location.
* Programmatic copying and pasting in the browser requires specific implementation and user permissions. The app controls only one of the following challenges:

  * Some users may prohibit programmatic clipboard access.
  * Browsers may prompt users to approve programmatic pasting every time.
  * Browsers prohibit programmatic clipboard access unless the access occurs in a user event. This means you can't use Blazor `@onclick` handlers and `JSInterop` calls from the server to the browser, because the JavaScript execution doesn't occur as a result of user events.


# See Also

* [Built-in Editor Tools](slug://editor-built-in-tools)
* [Custom Editor Tools](slug://editor-custom-tools)
