---
title: Modify the Default Schema
page_title:  Modify the Default Schema
description: Expore how to modify the default schema the Editor for Blazor uses.
slug: editor-modify-default-schema
tags: telerik,blazor,editor,prosemirror,schema
published: True
position: 3
---

# Modify the Default ProseMirror Schema

This article describes how you can modify the default [ProseMirror schema that the Editor for Blazor uses]({%slug editor-prosemirror-schema-overview%}). Updating the existing schema is useful if you want to:

* Extend the Editor capabilities and allow end users to add more kinds of HTML tags than the predefined ones.
* Allow adding more attributes to the predefined HTML elements.
* Restrict end users from adding some of the predefined HTML elements.

@[template](/_contentTemplates/editor/general.md#prosemirror-schema-prerequisites)

## Basics

@[template](/_contentTemplates/editor/general.md#prosemirror-schema-general-info)

## Modifying the Schema

To modify the default ProseMirror schema that the Editor uses:

1. In the global app scope (the `window` object) declare a JS function that returns an instance of the <a href="https://prosemirror.net/docs/ref/#model.Schema" target="_blank">ProseMirror `Schema` class</a>.
1. Use the `getSchema()` method of the event arguments to get the default ProseMirror Schema of the Editor.
1. Change the `Schema` object as needed: add, remove nodes and marks, or modify their allowed attributes. To get the names of the nodes/marks in the default editor `Schema`, use your dev tools and inspect the `nodes` field of the default `Schema` object.
1. Return the updated `Schema` object.
1. Pass the name of the JS function to the `Schema` parameter of the Editor.

## Example

The below example shows how to modify the default ProseMirror schema to:

* Add a `data-id` attribute to the `<p>` element.
* Remove the default `horizontal_rule` node that does not allow any attributes and add a custom node for the `<hr>` element that allows setting a CSS `class`.
* Add a `mark` for the `<s>` element.

>tip The Editor in this example uses the [`Div` edit mode]({%slug editor-edit-modes-iframe%}), so the style for the `<hr>` element is applied. If you use the default [`Iframe` edit mode]({%slug editor-edit-modes-div%}), you have to plug the styles with JavaScript as shown in [this example]({%slug editor-prosemirror-plugins%}).

>caption Modify the default ProseMirror Schema

````CSHTML
<style>
    hr.custom-hr {
        border-color: red;
    }
</style>

<TelerikEditor @bind-Value="@TheEditorValue"
               Schema="schemaProvider"
               EditMode="@EditorEditMode.Div">
</TelerikEditor>

@code {
    private string TheEditorValue { get; set; }

    protected override Task OnInitializedAsync()
    {
        TheEditorValue = @"
        A horizontal rule with a custom class
        <hr class='custom-hr' />
        <p data-id='paragraph-data-id'>
            A paragraph with a 'data-id' attribute.
        </p>
        <s>
            An s element.
        </s>";

        return base.OnInitializedAsync();
    }
}

@* Move JavaScript code to a separate JS file in production *@
<script suppress-error="BL9992">
    var tagMark = (tag) => ({
        [tag]: {
            name: tag,
            inclusive: true,
            parseDOM: [{ tag }],
            toDOM: () => [tag, 0],
        },
    });

    var updatedHr = {
        attrs: {
            class: { default: null },
        },
        group: "block",
        parseDOM: [
            {
                tag: "hr",
                getAttrs: (dom) => ({
                    class: dom.getAttribute("class")
                }),
            },
        ],
        toDOM: (node) => {
            return ["hr", { class: node.attrs.class }];
        },
    };

    window.schemaProvider = (args) => {
        const schema = args.getSchema();
        const Schema = args.ProseMirror.Schema

        const paragraph = { ...schema.spec.nodes.get("paragraph") };
        paragraph.attrs["data-id"] = { default: null };
        let nodes = schema.spec.nodes.update("paragraph", paragraph);

        nodes = nodes.remove("horizontal_rule");

        nodes = nodes.addToEnd("hr", updatedHr);

        const markStrikeThrough = tagMark("s");
        const marks = schema.spec.marks.append(markStrikeThrough);

        const newSchema = new Schema({ nodes, marks });
        return newSchema;
    }
</script>
````

## See Also

* [Live Demo: Editor - ProseMirror Schema](https://demos.telerik.com/blazor-ui/editor/prosemirror-schema)
* [Create a New Schema]({%slug editor-create-new-schema%})


<!-- # Common Scenarios

List here the KB articles created as part of https://github.com/telerik/blazor/issues/9608 

Similar to how this is handled in the Grid State article - https://docs.telerik.com/blazor-ui/components/grid/state#examples
-->