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

This article describes how you can modify the default ProseMirror Schema that the Editor for Blazor uses. Updating the existing schema is useful if you want to:

* Extend the Editor capabilities and allow your users to add more kinds of HTML tags than the predefined ones.
* Allow adding more attributes to the predefined HTML elements.
* Restrict the users from adding some of the predefined HTML elements.

## Prerequisites

Customization of the ProseMirror Schema requires familiarity with:

* JavaScript - the ProseMirror library is JavaScript-based and working with the Schema is performed through JavaScript.
* [ProseMirror Schema](https://prosemirror.net/docs/guide/#schema) - the schema structure and its children ([nodes](https://prosemirror.net/docs/ref/#model.NodeType), [marks](https://prosemirror.net/docs/ref/#model.MarkType)).

## Modifying the Schema

To modify the default ProseMirror Schema of the Editor for Blazor, use the `Schema` parameter. It accepts a `string` - the name of the JS function declared in the global scope (`window` object) that is used to provide custom ProseMirror schema. The function must return an instance of the [ProseMirror Schema class](https://prosemirror.net/docs/ref/#model.Schema) (the updated schema).

The function accepts an `arguments` object with the following properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Description |
|----------|-------------|
| `getSchema` | A function that returns the current [`Schema` object](https://prosemirror.net/docs/ref/#model.Schema). Before the Editor is initialized, the returned `Schema` is the default `Schema` of the Editor. After the Editor is initialized, the returned `Schema` is the updated schema. Iy you don't provide a custom schema, this function always retrns the default schema. |
| `getView` | A function that returns the currently used instance of [`EditorView` object](https://prosemirror.net/docs/ref/#view.EditorView). Before the Editor is initialized, the view (the result of the function) is null. |
| `ProseMirror` | An object that contains various ProseMirror classes and functions. |

> You can set a custom schema only once—upon the initialization of the Editor component. Further changes to the schema will not be reflected. The Editor will continue to use the initially provided schema or, if no schema is initially provided, the built-in one.

## Example

The below example shows how to modify the default ProseMirror Schema to:

* Add a `data-id` attribute to the `<p>` element.
* Remove the default `horizontal_rule` node that does not allow any attributes and add a custom node for the `<hr>` element that allows setting a CSS `class`.
* Add a `mark` for the `<s>` element.

>tip The Editor in this example uses the [`Div` edit mode]({%slug editor-edit-modes-iframe%}), so the style for the `<hr>` element is applied. If you use the default [`Iframe` edit mode]({%slug editor-edit-modes-div%}), you have to plug the styles with JavaScript as shown in [this example]({%slug editor-prosemirror-plugins%}).

>caption Modify the default ProseMirror Schema

````CSHTML
<script>
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
````

## See Also

* [Live Demo: Editor - ProseMirror Schema](https://demos.telerik.com/blazor-ui/editor/prosemirror-schema)
* [Modify the Default Schema]({%slug editor-modify-default-schema%})
* [Create a New Schema]({%slug editor-create-new-schema%})


<!-- # Common Scenarios

List here the KB articles created as part of https://github.com/telerik/blazor/issues/9608 

Similar to how this is handle in the Grid State article - https://docs.telerik.com/blazor-ui/components/grid/state#examples
-->