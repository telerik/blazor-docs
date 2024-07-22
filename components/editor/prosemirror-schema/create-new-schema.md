---
title: Create a New Schema
page_title:  Create a New Schema
description: Expore how to create a new schema for the Editor for Blazor.
slug: editor-create-new-schema
tags: telerik,blazor,editor,prosemirror,schema
published: True
position: 5
---

# Create a New Schema

This article describes how you can create a new [ProseMirror schema]({%slug editor-prosemirror-schema-overview%}) for the Editor to use. Creating a new schema is useful if you want to change the majority of the default schema.

@[template](/_contentTemplates/editor/general.md#prosemirror-schema-prerequisites)

## Basics

@[template](/_contentTemplates/editor/general.md#prosemirror-schema-general-info)


## Creating a New Schema

1. In the global app scope (the `window` object) declare a JS function that returns an instance of the [ProseMirror `Schema` class](https://prosemirror.net/docs/ref/#model.Schema).
1. Create a new instance of the `Schema` object and include your desired nodes and marks in it.
1. Return the new `Schema` object.
1. Pass the name of the JS function to the `Schema` parameter of the Editor.

> Some of the ProseMirror plugins that the Editor uses by design depend on specific nodes in the default ProseMirror schema of the Editor. When creating a new schema from scratch, it is possible to get an exception if you do not include the needed nodes in your custom schema. In this case, you can either include the corresponding nodes or pass and a [custom empty collection of plugins to the Editor]({%slug editor-prosemirror-plugins%}) to override the built-in ones.

## Example

The below example shows how to create a new ProseMirror schema and pass it to the Editor. The new schema supports only a couple of HTML elements such as `<p>`, `<ul>`, `<ol>` and `<a>`. 

>caption Create New ProseMirror Schema

````CSHTML
@using Telerik.Blazor.Components.Editor
@* Avoid ambiguous reference with SVG icons *@
@using EditorNS = Telerik.Blazor.Components.Editor;

<!-- Move JavaScript code to a separate JS file in production -->
<script suppress-error="BL9992">
    var getAttributes = (dom) => {
        const result = {};
        const attributes = dom.attributes;
        let attr;

        for (let i = 0; i < attributes.length; i++) {
            attr = attributes[i];
            result[attr.name] = attr.value;
        }

        return result;
    };

    var commonAttributes = () => {
        return {
            style: { default: null },
            class: { default: null },
            id: { default: null },
        };
    };

    var hasAttrs = (
        attrs,
        exclude
    ) => {
        for (const attr in attrs) {
            if (attr && attrs[attr] !== null && attr !== exclude) {
                return true;
            }
        }
        return false;
    };

    var getAttrs = (
        attrs,
        exclude
    ) => {
        const result = {};
        for (const attr in attrs) {
            if (attr && attrs[attr] !== null && attr !== exclude) {
                result[attr] = attrs[attr];
            }
        }
        return result;
    };

    var tagMark = (tag) => {
        // https://prosemirror.net/docs/ref/#model.MarkSpec
        return {
            [tag]: {
                name: tag,
                inclusive: true,
                parseDOM: [{ tag: tag }],
                toDOM: () => [tag, hole],
            },
        };
    };

    var hole = 0;

    window.schemaProvider = (args) => {
        const nodes = {
            // The top level document node.
            doc: {
                content: "block+",
            },

            paragraph: {
                content: "inline*",
                group: "block",
                attrs: {
                    ...commonAttributes(),
                },
                parseDOM: [
                    {
                        tag: "p",
                        getAttrs: getAttributes,
                    },
                ],
                toDOM: (node) =>
                    hasAttrs(node.attrs) ? ["p", getAttrs(node.attrs), hole] : ["p", hole],
            },

            // The text node.
            text: {
                inline: true,
                group: "inline",
            },                     

            ordered_list: {
                content: "list_item+",
                group: "block",
                attrs: {
                    ...commonAttributes(),
                    type: { default: null },
                    order: { default: 1 },
                },
                parseDOM: [
                    {
                        tag: "ol",
                        getAttrs: (dom) => {
                            return {
                                ...getAttributes(dom),
                                order: dom.hasAttribute("start")
                                    ? parseInt(dom.getAttribute("start") || "1", 10)
                                    : 1,
                            };
                        },
                    },
                ],
                toDOM: (node) => {
                    return node.attrs.order === 1
                        ? hasAttrs(node.attrs, "order")
                            ? ["ol", getAttrs(node.attrs, "order"), hole]
                            : ["ol", 0]
                        : [
                            "ol",
                            { ...getAttrs(node.attrs, "order"), start: node.attrs.order },
                            hole,
                        ];
                },
            },

            bullet_list: {
                content: "list_item+",
                group: "block",
                attrs: { ...commonAttributes() },
                parseDOM: [{ tag: "ul", getAttrs: getAttributes }],
                toDOM: (node) =>
                    hasAttrs(node.attrs) ? ["ul", getAttrs(node.attrs), hole] : ["ul", 0],
            },

            list_item: {
                content: "block*",
                attrs: { ...commonAttributes() },
                parseDOM: [{ tag: "li", getAttrs: getAttributes }],
                toDOM: (node) =>
                    hasAttrs(node.attrs) ? ["li", getAttrs(node.attrs), hole] : ["li", 0],
                defining: true,
            },

            // default ProseMirror table nodes
            ...args.ProseMirror.tableNodes({
                tableGroup: "block",
                cellContent: "block+",
                cellAttributes: {},
            }),
        };

        const marks = {
            link: {
                attrs: {
                    ...commonAttributes(),
                    href: { default: null },
                    target: { default: null },
                    title: { default: null },
                },
                inclusive: false,
                parseDOM: [{ tag: "a", getAttrs: getAttributes }],
                toDOM(node) {
                    return ["a", getAttrs(node.attrs), hole];
                },
            },

            ...tagMark("strong"),
            ...tagMark("b"),
            ...tagMark("em"),
            ...tagMark("i"),
            ...tagMark("u")
        };

        const mySchema = new args.ProseMirror.Schema({ nodes, marks });

        return mySchema;
    }
</script>

<TelerikEditor @bind-Value="@TheEditorValue"
               Schema="schemaProvider"
               Tools="@EditorTools"
               Width="650px"               
               Height="400px">
</TelerikEditor>

@code {
    private string EditorValue { get; set; } = string.Empty;

    protected override Task OnInitializedAsync()
    {
        TheEditorValue = @"
        <p>This Telerik Blazor Editor uses a ProseMirror Schema that supports only several nodes and marks:
        <ul>
            <li>Paragraph</li>
            <li>Ordered and unordered lists</li>
            <li>Hyperlinks</li>
        </ul>
        <p> Try editing the HTML to inserted non-supported tags such as &lt;span&gt;, &lt;h1&gt; or &lt;img&gt; - see how it is stripped and converted to &lt;p&gt;.";

        return base.OnInitializedAsync();
    }

    private List<IEditorTool> EditorTools { get; set; }

    protected override void OnInitialized()
    {
        EditorTools = new List<IEditorTool>();

        EditorButtonGroup firstGroup = new EditorButtonGroup(
            new EditorNS.Bold(),
            new EditorNS.Italic(),
            new EditorNS.Underline()
        );
        EditorTools.Add(firstGroup);

        EditorTools.Add(new CreateLink());

        EditorButtonGroup seondGroup = new EditorButtonGroup(
           new EditorNS.OrderedList(),
           new EditorNS.UnorderedList()
       );

        EditorTools.Add(seondGroup);

        EditorTools.Add(new ViewHtml());

        base.OnInitialized();
    }
}
````

## See Also

* [Live Demo: Editor - ProseMirror Schema](https://demos.telerik.com/blazor-ui/editor/prosemirror-schema)
* [Modify the Default Schema]({%slug editor-modify-default-schema%})


<!-- # Common Scenarios

List here the KB articles created as part of https://github.com/telerik/blazor/issues/9608 

Similar to how this is handle in the Grid State article - https://docs.telerik.com/blazor-ui/components/grid/state#examples
-->