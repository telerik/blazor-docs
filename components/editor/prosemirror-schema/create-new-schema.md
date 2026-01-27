---
title: Create a New Schema
page_title:  Create a New Schema
description: Expore how to create a new schema for the Editor for Blazor.
slug: editor-create-new-schema
tags: telerik,blazor,editor,prosemirror,schema
published: True
position: 5
components: ["editor"]
---
# Create a New Schema

This article describes how you can create a new [ProseMirror schema](slug:editor-prosemirror-schema-overview) for the Editor to use. Creating a new schema is useful if you want to change the majority of the default schema.

@[template](/_contentTemplates/editor/general.md#prosemirror-schema-prerequisites)

## Basics

@[template](/_contentTemplates/editor/general.md#prosemirror-schema-general-info)

## Plugin Dependencies

Some of the ProseMirror plugins that the Editor uses by design depend on specific nodes in the default ProseMirror schema of the Editor. To get a collection of the default plugins, use the [`getPlugins` function](slug:editor-prosemirror-plugins#adding-a-custom-plugin).

When creating a new schema from scratch, it is possible to get an exception if you do not include the needed nodes in your custom schema.

You have several options in this case:

* Include the corresponding nodes in your custom schema.
* Get the collection of default plugins and remove the plugins that require the missing node.
* Pass a [custom empty collection of plugins to the Editor](slug:editor-prosemirror-plugins) to override the built-in ones.

Note that with the last two options you will lose the functionality that comes with the plugin(s) you remove.

## Creating a New Schema

The below example shows how to:

* Create a new instance of the `Schema` object and include several nodes and marks in it. The new schema supports only a couple of HTML elements such as `<p>`, `<ul>`, `<ol>` and `<a>`.
* Remove a plugin that requires a node which is not part of your schema. The new Schema in this example does not include `<ol>` or `<ul>` elements, so we are removing the plugin that requires these nodes.
* Return the updated schema, so the Editor can use it.

>caption Create New ProseMirror Schema

````RAZOR
@using Telerik.Blazor.Components.Editor
@* Avoid ambiguous reference with SVG icons *@
@using EditorNS = Telerik.Blazor.Components.Editor;

<TelerikEditor @bind-Value="@EditorValue"
               Schema="schemaProvider"
               Plugins="pluginsProvider"
               Tools="@EditorTools"
               Width="650px"
               Height="400px">
</TelerikEditor>

@code {
    private string EditorValue { get; set; } = string.Empty;

    protected override Task OnInitializedAsync()
    {
        EditorValue = @"
        <p>This Telerik Blazor Editor uses a ProseMirror Schema that supports only several nodes and marks - Paragraph, Hyperlinks, Bold text, Emphasized text, Underlined text.</p>

        <p>The new Schema does not include &lt;ol&gt or &lt;ul&gt elements, so we are removing the plugin that requires these nodes.</p>

        <p> Try editing the HTML to inserted non-supported tags such as &lt;ol&gt, &lt;h1&gt; or &lt;img&gt; - see how it is stripped and converted to &lt;p&gt;.";

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

        EditorTools.Add(new ViewHtml());

        base.OnInitialized();
    }
}

@* Move JavaScript code to a separate JS file in production *@
<script suppress-error="BL9992">
    window.pluginsProvider = (args) => {
        const defaultSchema = args.getSchema();

        var plugins = args.getPlugins(defaultSchema);

        plugins.shift();

        console.log(plugins);

        return plugins;
    }

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
````

## See Also

* [Live Demo: Editor - ProseMirror Schema](https://demos.telerik.com/blazor-ui/editor/prosemirror-schema)
* [Modify the Default Schema](slug:editor-modify-default-schema)


<!-- # Common Scenarios

List here the KB articles created as part of https://github.com/telerik/blazor/issues/9608 

Similar to how this is handled in the Grid State article - https://docs.telerik.com/blazor-ui/components/grid/state#examples
-->