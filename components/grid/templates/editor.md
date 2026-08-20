---
title: Editor
page_title: Grid - Editor Template
description: Use custom editor templates in Grid for Blazor.
slug: grid-templates-editor
tags: telerik,blazor,grid,templates,editor
published: True
position: 15
components: ["grid"]
---

# Editor Template

The column's `EditorTemplate` defines the inline template or component that will be rendered when the user is [editing](slug:grid-editing-overview) the field. It is also used when inserting a new item.

You can data bind components in the editor template to the current `context`. This is the data item instance, which is bound to the currently edited Grid row. Cast `context` to the data item type and store it in a global or local variable. Then, use this variable for one-way or two-way binding in the `EditorTemplate`.

The template receives a [copy of the original data item](slug:grid-editing-overview#item-instances). This allows users to cancel their edits and restore the original property value. The [CRUD Events section](slug:grid-editing-overview#events) provides more information about this programmatic item creation.

If you need more complex logic inside the editor template, compared to simple data binding, use the `change` event of the custom editor component. You can also use a [custom Grid edit form](slug:grid-kb-custom-edit-form).

When an input receives an `EditContext` (usually as a cascading parameter), the framework also requires a `ValueExpression`. If you use two-way binding (the `@bind-Value` syntax), the `ValueExpression` is deducted from there. However, if you use only the `Value` parameter, you have to pass the `ValueExpression` explicitly. This is a lambda expression that tells the framework what property of the model to use for validation. The following sample demonstrates how to achieve that. You can also check the [Requires a value for ValueExpression](slug:common-kb-requires-valueexpression) knowledge base article for more details.

<div class="skip-repl"></div>
````RAZOR
<EditorTemplate>
    <TelerikTextBox Value="@myModel.MyField"
                    ValueChanged="@( (string newValue) => myModel.MyField = newValue )"
                    ValueExpression="@( () => myModel.MyField )">
    </TelerikTextBox>
</EditorTemplate>

@* Applies to the other input type components as well *@
````

**In this article:**

* [Notes](#notes)
* [Examples](#examples)
    * [Multi-line text with HTML Editor or TextArea](#multi-line-text-with-html-editor-or-textarea)
    * [How to limit the input options with a select element](#limit-the-input-options-with-a-select-element)
    * [Editor template for a foreign key column](#editor-template-for-a-foreign-key-column)

## Notes

* @[template](/_contentTemplates/common/inputs.md#edit-debouncedelay)

* We recommend casting the Editor Template context to your model and storing it in a local or a dedicated global variable. Do not share a global variable within multiple templates, like column (cell) template and editor template. Variable sharing can lead to unexpected behavior.

* Direct casting of the `context` can make two-way data binding not work properly.

>caption Not recommended: direct casting with two-way parameter binding

````RAZOR.skip-repl
<EditorTemplate>
    <TelerikTextArea @bind-Value="@((Product)context).Description" />
</EditorTemplate>
````

>caption Recommended: cast the context in advance

<div class="skip-repl"></div>

````RAZOR
<EditorTemplate>
    @{
        var editProduct = (Product)context;

        <TelerikTextArea @bind-Value="@editProduct.Description" />
    }
</EditorTemplate>
````

## Examples

This section demonstrates different scenarios with the Editor Template:

## Multi-line text with HTML Editor or TextArea

The Grid will save changes and close the current edit row (or edit cell) when the user hits Enter. To prevent this inside HTML Editor or TextArea components, stop the propagation of the `keydown` event:

<demo metaUrl="client/grid/templates-editor-textarea/"></demo>

## Limit the input options with a select element

<demo metaUrl="client/grid/templates-editor-select/"></demo>

## Editor template for a foreign key column

This example uses an ID that represents the foreign key for the grid column `Field`. You may want to use a text field that you can add to your model (or from a [nested model](slug:grid-use-navigation-properties)) instead - this will change what renders in the `Template` by default, and will change the rules and operators for filtering, sorting, and so using a field with human-readable information (like strings) might provide better UX.

Also check the [Grid Foreign Key Column](slug:grids-foreign-key) knowledge base article.

<demo metaUrl="client/grid/templates-editor-foreign-key/"></demo>

## In-Cell Editor Templates

The incell editor template requires a focusable element to maintain the tab order when using the keyboard. If you prevent editing based on a runtime condition, you must provide some focusable element. (Setting `Editable=false` for the entire column does not require a focusable element.) Here is one way to add a focusable non-editable element:

<div class="skip-repl"></div>

````RAZOR
<EditorTemplate>
    @{
        if (myCurrentEditCondition)
        {
            <MyCustomEditor />
        }
        else
        {
            <div tabindex="0">editing not allowed</div>
        }
    }
</EditorTemplate>
````

## See Also

* [Live Demo: Grid Templates](https://demos.telerik.com/blazor-ui/grid/templates)
* [Live Demo: Grid Custom Editor Template](https://demos.telerik.com/blazor-ui/grid/custom-editor)
* [Blazor Grid](slug:grid-overview)
