---
title: Mentions in Editor
description: How to support mentions in the Editor?
type: how-to
page_title: Mentions in Editor
slug: editor-kb-mentions
position: 
tags: telerik,blazor,editor,mentions
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

## Solution

```razor Component
@using Microsoft.Extensions.Logging.Abstractions

@implements IDisposable

<TelerikEditor Plugins="pluginsProvider"
               Schema="schemaProvider"
               EditMode="EditorEditMode.Div">
</TelerikEditor>

@code {
    private DotNetObjectReference<Editor>? _dotNetRef;
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

    [Inject]
    private IJSRuntime JSRuntime { get; set; }

    [Inject]
    private IServiceProvider ServiceProvider { get; set; }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            _dotNetRef = DotNetObjectReference.Create(this);
            await JSRuntime.InvokeVoidAsync("initializeMentions", _dotNetRef);
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
        _dotNetRef?.Dispose();
    }
}
```

```razor MentionSuggestionList
<div class="suggestion-item-list">
    @if(Items == null || !Items.Any())
    {
        <div class="suggestion-item">
            No suggestions
        </div>
    } else
    {
        @foreach(var item in Items) {
            <div class="suggestion-item">
                <div class="suggestion-item-content">
                    <div class="suggestion-text">
                        <div class="suggestion-name">
                            @item.Name
                        </div>
                        <div class="suggestion-title">
                            @item.Email
                        </div>
                    </div>
                </div>
            </div>
        }
    }
</div>

@code {
    [Parameter]
    public IEnumerable<Mention> Items { get; set; }
}
```

```cs Mention.cs
public class Mention
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
}
```

```js Javascript
import { addMentionNodes, addTagNodes, getMentionsPlugin } from 'prosemirror-mentions';

let _dotnetRef;
window.initializeMentions = (dotnetRef) => {
    _dotnetRef = dotnetRef;
}

/**
 * IMPORTANT: outer div's "suggestion-item-list" class is mandatory. The plugin uses this class for querying.
 * IMPORTANT: inner div's "suggestion-item" class is mandatory too for the same reasons
 */
var getMentionSuggestionsHTML = items => '<div class="suggestion-item-list">' +
    items.map(i => '<div class="suggestion-item">' + i.name + '</div>').join('') +
    '</div>';

/**
 * IMPORTANT: outer div's "suggestion-item-list" class is mandatory. The plugin uses this class for querying.
 * IMPORTANT: inner div's "suggestion-item" class is mandatory too for the same reasons
 */
var getTagSuggestionsHTML = items => '<div class="suggestion-item-list">' +
    items.map(i => '<div class="suggestion-item">' + i.tag + '</div>').join('') +
    '</div>';

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
            } else {
                // pass dummy tag suggestions
                done([{ tag: 'WikiLeaks' }, { tag: 'NetNeutrality' }])
            }
        }, 0);
    },
    getSuggestionsHTML: (items, type) => {
        if (type === 'mention') {
            return mentionSuggestionsHTML;
        } else if (type === 'tag') {
            return getTagSuggestionsHTML(items)
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
    const nodes = addTagNodes(addMentionNodes(schema.spec.nodes));
    const mentionsSchema = new Schema({
        nodes: nodes,
        marks: schema.spec.marks
    });

    return mentionsSchema;
}

```
