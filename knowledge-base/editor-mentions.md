---
title: Mentions in Editor
description: Learn how to add support for mentions in the Telerik Editor component for Blazor.
type: how-to
page_title: Mentions in Editor
slug: editor-kb-mentions
position: 
tags: telerik, blazor, editor, mentions
ticketid: 1545505
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

How to enable or implement support for `@mentions` in the TelerikEditor for Blazor, similar to GitHub, Facebook, etc.?

## Solution

You can use the [proseMirror-mentions](https://github.com/joelewis/prosemirror-mentions) plugin to provide a `@mentions` and `#hashtags` functionality for the Telerik Blazor Editor component. To implement the feature, customize the built-in [ProseMirror schema](slug:editor-prosemirror-schema-overview) and [integrate a ProseMirror plugin](slug:editor-prosemirror-plugins).

For dynamic positioning of the mentions list, set the [`EditMode`](slug:Telerik.Blazor.Components.TelerikEditor#telerik_blazor_components_telerikeditor_editmode) property of the Editor to `EditorEditorMode.Div`. This ensures that the mentions dropdown position is correct relative to the Editor content.

````RAZOR.skip-repl
<TelerikEditor EditMode="EditorEditMode.Div" />
````

### Setting up WebPack and Installing proseMirror-mentions

1. Setup the Javascript project by running the following command in the root folder of your project:
    ````SH.skip-repl
    npm init -y
    ````
    > This command creates a `package.json` file with the project's configuration. The `-y` flag accepts all defaults for simplicity. In a real world application, consider running `npm init` without the flag to configure settings interactively.
2. Install a JavaScript bundler. In this example we will use [webpack](https://webpack.js.org), so run:
    ````SH.skip-repl
    npm install webpack webpack-cli --save-dev
    ````
3. Configure the build script in the `scripts` section of `package.json` (in this example all of our Javascript files will go into `wwwroot/js`): 
    ````JSON.skip-repl
    "scripts": {
        "build": "webpack ./wwwroot/js/index.js --output-path ./wwwroot/js --output-filename index.bundle.js"
    },
    ````
5. Update the module type in `package.json`:
    ````JSON.skip-repl
    "type": module"
    ````
    This enables ES6 `import`/`export` syntax instead of the CommonJS require statements which will be useful later on.
6. Install [proseMirror-mentions](https://github.com/joelewis/prosemirror-mentions) by running:
    ````SH.skip-repl
    npm install prosemirror-mentions
    ````
7. Create a file named `index.js` in your project's `wwwroot/js` directory and paste the contents from the respective code tab below.
8. Build the JavaScript bundle by running:
    ````SH.skip-repl
    npm run build
    ````
    This creates the `index.bundle.js` file in your `wwwroot/js` directory.

### Include the JavaScript Bundle

After building the JavaScript bundle, you need to include it in your Blazor application:

**Global Level (App.razor):**
<div class="skip-repl"></div>

````razor App.razor
<!DOCTYPE html>
<html>
<head>
    <!-- other head content -->
</head>
<body>
    <!-- body content -->
    
    <script src="js/index.bundle.js"></script>
</body>
</html>
````

### Integrate the Mentions Plugin

The following code demonstrates how to integrate the `proseMirror-mentions` plugin in the Editor.

<div class="skip-repl"></div>

````razor Component.razor
@using Microsoft.Extensions.Logging.Abstractions

@implements IDisposable

@inject IJSRuntime JSRuntime
@inject IServiceProvider ServiceProvider

<TelerikEditor Plugins="pluginsProvider"
               Schema="schemaProvider"
               EditMode="EditorEditMode.Div">
</TelerikEditor>

@code {
    // Replace Component with your actual component type
    private DotNetObjectReference<Component>? dotNetRef;
    private List<Mention> Mentions { get; set; } = new List<Mention>()
    {
        new()
        {
            Id = "board",
            Name = "Jane Simons",
            Email = "jane.simons@company.com",
        },
        new()
        {
            Id = "engineering",
            Name = "Peter Parker",
            Email = "peter.parker@company.com"
        },
        new()
        {
            Id = "generalManager",
            Name = "Liam Turner",
            Email = "liam.turner@company.com"
        }
    };

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            dotNetRef = DotNetObjectReference.Create(this);
            await JSRuntime.InvokeVoidAsync("initializeMentions", dotNetRef);
        }
    }

    [JSInvokable]
    public async Task<Mention[]> GetMentionSuggestionsAsync(string text)
    {
        return Mentions.Where(mention => mention.Name.ToLower().Contains(text)).ToArray();
    }

    [JSInvokable]
    public async Task<string> GetMentionSuggestionsHTML(List<Mention> mentions)
    {
        using var htmlRenderer = new HtmlRenderer(ServiceProvider, NullLoggerFactory.Instance);
        var html = await htmlRenderer.Dispatcher.InvokeAsync(async () =>
        {
            var dictionary = new Dictionary<string, object?>
            {
                    { "Items", mentions }
            };
            var parameters = ParameterView.FromDictionary(dictionary);
            var output = await htmlRenderer.RenderComponentAsync<MentionSuggestionList>(parameters);
            return output.ToHtmlString();
        });

        return html;
    }

    public void Dispose()
    {
        dotNetRef?.Dispose();
    }
}
````
````razor MentionSuggestionList.razor
@*
    IMPORTANT: outer div's "suggestion-item-list" class is mandatory. The plugin uses this class for querying.
    IMPORTANT: inner div's "suggestion-item" class is mandatory too for the same reasons.
*@

<div class="suggestion-item-list k-popup k-list-container" style="max-height: 200px;">
    <div class="k-list">
        <div class="k-list-content">
            <ul class="k-list-ul">
                @if (Items == null || Items.Count() == 0)
                {
                    <li class="suggestion-item k-list-item">
                        No Suggestions
                    </li>
                }
                else
                {
                    @foreach (Mention item in Items)
                    {
                        <li class="suggestion-item k-list-item">
                            @item.Name
                            <br />
                            @item.Email
                        </li>
                    }
                }
            </ul>
        </div>
    </div>
</div>

@code {
    [Parameter]
    public IEnumerable<Mention>? Items { get; set; }
}
````
````cs Mention.cs
public class Mention
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
}
````
````js wwwroot/js/index.js
import { addMentionNodes, addTagNodes, getMentionsPlugin } from 'prosemirror-mentions';

let _dotnetRef;
window.initializeMentions = (dotnetRef) => {
    _dotnetRef = dotnetRef;
}

let mentionSuggestionsHTML = null;

var mentionPlugin = getMentionsPlugin({
    getSuggestions: (type, text, done) => {
        setTimeout(async () => {
            if (type === 'mention') {
                try {
                    const suggestions = await _dotnetRef.invokeMethodAsync('GetMentionSuggestionsAsync', text);
                    mentionSuggestionsHTML = await _dotnetRef.invokeMethodAsync('GetMentionSuggestionsHTML', suggestions);
                    done(suggestions);
                } catch (error) {
                    console.error('Error getting suggestions:', error);
                    done([]);
                }
            }
        }, 0);
    },
    getSuggestionsHTML: (items, type) => {
        if (type === 'mention') {
            return mentionSuggestionsHTML;
        }
    }
});

window.pluginsProvider = (args) => {
    const schema = args.getSchema();
    
    return [mentionPlugin, ...args.getPlugins(schema)];
}

window.schemaProvider = (args) => {
    const schema = args.getSchema();
    const Schema = args.ProseMirror.Schema;
    const nodes = addMentionNodes(schema.spec.nodes);
    const mentionsSchema = new Schema({
        nodes: nodes,
        marks: schema.spec.marks
    });

    return mentionsSchema;
}

````

## See Also

* [Editor Schema](slug:editor-prosemirror-schema-overview)
* [Editor Plugins](slug:editor-prosemirror-plugins)
* [ProseMirror Documentation](https://prosemirror.net/docs/ref)
* [proseMirror-mentions](https://github.com/joelewis/prosemirror-mentions)