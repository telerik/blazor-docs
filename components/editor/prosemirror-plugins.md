---
title: ProseMirror Plugins
page_title:  ProseMirror Plugins
description: Explore how to use the ProseMirror Plugins in the Editor for Blazor uses.
slug: editor-prosemirror-plugins
tags: telerik,blazor,editor,prosemirror,plugins
published: True
position: 130
---

# ProseMirror Plugins

The Telerik UI for Blazor Editor component is based on the [ProseMirror library](https://prosemirror.net/). ProseMirror provides a set of tools and concepts for building rich text editors, using user interface inspired by what-you-see-is-what-you-get.

## Concept

The ProseMirror [plugin system](https://prosemirror.net/docs/ref/#state.Plugin_System) enables developers to create custom tools and functionality. One of the main building blocks of each editor is its [`EditorState`](https://prosemirror.net/docs/ref/#state) object. The state is created through a static [`create`](https://prosemirror.net/docs/ref/#state.EditorState%5Ecreate) method which takes a configuration object, containing the starting document node, the [`Schema`](https://prosemirror.net/docs/ref/#model.Schema), and a collection of [plugins](https://prosemirror.net/docs/ref/#state.Plugin) which will be active in this state.

Plugins are instances of the [`Plugin` class](https://prosemirror.net/docs/ref/#state.Plugin) and can model a wide variety of features. The basic ones may only add some [properties](https://prosemirror.net/docs/ref/#view.EditorProps) to the editor view to respond to certain events. More complicated features may add a new state to the editor and update it based on [transactions](https://prosemirror.net/docs/ref/#state.Transaction).

For further details about the ProseMirror plugins, refer to [the this ProseMirror guide](https://prosemirror.net/docs/guide/#state.plugins).

## Adding a Custom Plugin

The ProseMirror library is JavaScript-based and adding plugins to the Editor is performed through JavaScript.

To add a custom plugin to the Editor for Blazor, use the `Plugins` parameter (`string`). It accepts a `string`&mdash;the name of the JS function declared in the global scope (`window` object) that is used to provide custom ProseMirror plugins.

The function accepts an `arguments` object with the following properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Description |
|----------|-------------|
| `getSchema` | A function that returns the current [`Schema` object](https://prosemirror.net/docs/ref/#model.Schema). Before the Editor is initialized, the `Schema` is the default `Schema`. After the Editor is initialized, the returned `Schema` is the updated schema. If you don't provide a custom schema, this function always returns the default schema. |
| `getView` | A function that returns the currently used instance of the [`EditorView` object](https://prosemirror.net/docs/ref/#view.EditorView). Before the Editor is initialized, the view (the result of the function) is null. |
| `ProseMirror` | An object that contains various ProseMirror classes and functions.|
| `getPlugins` | A function that accepts `Schema` as an argument and returns the default Editor plugins. The function must return an array of ProseMirror plugins. |

> To ensure all the built-in functionalities of the Editor are working correctly, the result array must contain the default plugins which can be retrieved by calling the `getPlugins` function.

>caption Adding a Placeholder Plugin

```CSHTML
@using Telerik.Blazor.Components.Editor
@inject IJSRuntime js

@* Move JavaScript code to a separate JS file in production *@
<script suppress-error="BL9992">
    window.pluginsProvider = (args) => {
        const schema = args.getSchema();
        var placeHolderKey = new args.ProseMirror.PluginKey("placeholder");

        function placeholder(emptyMessage) {
            console.log(args);
            return new args.ProseMirror.Plugin({
                key: placeHolderKey,
                props: {
                    decorations: (state) => {
                        const { doc } = state;
                        const empty =
                            doc.textContent === "" &&
                            doc.childCount <= 1 &&
                            doc.content.size <= 2;
                        if (!empty) {
                            return args.ProseMirror.DecorationSet.empty;
                        }
                        const decorations = [];
                        const decAttrs = {
                            class: "placeholder",
                            "data-placeholder": emptyMessage,
                        };
                        doc.descendants((node, pos) => {
                            decorations.push(args.ProseMirror.Decoration.node(pos, pos + node.nodeSize, decAttrs));
                        });
                        return args.ProseMirror.DecorationSet.create(doc, decorations);
                    }
                }
            });
        }        

        return [...args.getPlugins(schema), placeholder("Enter some content ...")];
    }

    function injectEditorStyleTag() {
        var doc = document.querySelector("iframe").contentWindow.document;
        var head = doc.querySelector("head");

        var style = doc.createElement("style");
        style.type = "text/css";

        var iframeStyles = `p.placeholder:first-child:before {
                        content: attr(data-placeholder);
                        float: left;
                        color: rgb(0, 0, 0, 0.5);
                        cursor: text;
                        height: 0;
                        font-style: italic;
                    }`;

        style.appendChild(doc.createTextNode(iframeStyles));
        head.appendChild(style);
    };
</script>

<TelerikEditor Height="400px"
               Width="700px"
               @bind-Value="@EditorValue"
               Plugins="pluginsProvider">
</TelerikEditor>

@code {
    private string EditorValue { get; set; }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            await js.InvokeVoidAsync("injectEditorStyleTag");
        }
    }
}
```

## See Also

* [Live Demo: Editor - ProseMirror Plugins](https://demos.telerik.com/blazor-ui/editor/prosemirror-plugins)


<!-- # Examples

List here the KB articles created as part of https://github.com/telerik/blazor/issues/9608 

Similar to how this is handle in the Grid State article - https://docs.telerik.com/blazor-ui/components/grid/state#examples
-->