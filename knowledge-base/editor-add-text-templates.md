---
title: Add text templates in Editor
description: How to insert text templates in Editor?
type: how-to
page_title: Add text templates in Editor
slug: editor-kb-add-text-templates
position: 
tags: editor, text, template, insert, add
ticketid: 1589596
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

Is there a way to insert templated text in the Editor?

I want to have a tool that prefills various templates in the Editor. How to achieve this?

## Solution

Create a custom tool that programmatically changes the Editor value (inserts the desired templated text in the Editor).

1. [Create a custom tool](slug://editor-custom-tools). If you want to include more than one template option, consider a [DropDownList](slug://components/dropdownlist/overview), as per the example below. Thus, users will be able to easily select one of the suggested templates.

1. Provide a [collection of your templates to the `Data` parameter of the DropDownList](slug://components/dropdownlist/databind). The example below shows how you can use a complex model for the templates. The DropDownList only uses an `Id` and `Title` to show the available templates to the user. Once the user selects the desired template, you may retrieve its content from the database, for example. The key part is that the content of the template should be provided to the Editor as `string`, so the component can render it.

1. Handle the [`ValueChanged`](slug://components/dropdownlist/events#valuechanged) event of the DropDownList to get the template value and update the Editor value. In the example below, the selected value is deliberately not updated in the viewport, so it is not shown in the main element in the DropDownList - this allows the user to select the same template more than once. You may add the template value to the Editor or replace the whole content depending on the exact desired result. You may also control the position at which the template will be inserted.

````RAZOR
@using Telerik.Blazor.Components.Editor

<TelerikEditor @ref="@EditorRef"
               @bind-Value="@EditorValue"
               Tools="@Tools">
    <EditorCustomTools>
        <EditorCustomTool Name="Templates">
            <TelerikDropDownList Data="@Templates"
                                 Value="@SelectedTemplateId"
                                 ValueChanged="@((int TemplateId) => OnTemplateSelected(TemplateId))"
                                 ValueExpression="@(() => SelectedTemplateId)"
                                 DefaultText="Select template"
                                 ValueField="Id"
                                 TextField="Title"
                                 Width="200px">
            </TelerikDropDownList>
        </EditorCustomTool>
    </EditorCustomTools>
</TelerikEditor>

@code {
    private TelerikEditor EditorRef { get; set; }

    private string EditorValue { get; set; } = "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p><p>Phasellus ornare fermentum ultrices.</p>";

    private int SelectedTemplateId { get; set; }

    private List<TemplateModel> Templates { get; set; } = new List<TemplateModel>();

    private async Task OnTemplateSelected(int TemplateID)
    {
        TemplateModel SelectedTemplate = Templates.FirstOrDefault(x => x.Id == TemplateID);

        switch (SelectedTemplate.Position)
        {
            case InsertPosition.End:

                EditorValue += SelectedTemplate.Content;
                break;

            case InsertPosition.Block:
                await EditorRef.ExecuteAsync(new HtmlCommandArgs("insertHtml", SelectedTemplate.Content));
                break;

            case InsertPosition.Inline:
                await EditorRef.ExecuteAsync(new HtmlCommandArgs("insertHtml", SelectedTemplate.Content, true));
                break;
        }
    }

    protected override async Task OnInitializedAsync()
    {
        Tools.Add(new CustomTool("Templates"));

        Templates = new List<TemplateModel>()
        {
        new TemplateModel()
        {
            Id = 1,
            Title="Signature at the end",
            Position = InsertPosition.End,
            Content = "<p></p><p>Regards,</p><h4>Jane Doe</h4><p><em>Senior Support Engineer</em></p><p>Telerik UI for Blazor</p>"
        },
         new TemplateModel()
        {
            Id = 2,
            Title="Block Template",
            Position = InsertPosition.Block,
            Content = "Block template content."
        },
        new TemplateModel()
        {
            Id = 3,
            Title="Inline Template",
            Position = InsertPosition.Inline,
            Content = "inline template content"
        },
        };
    }

    public List<IEditorTool> Tools { get; set; } = new List<IEditorTool>()
    {
        new EditorButtonGroup(new Telerik.Blazor.Components.Editor.Undo(), new Telerik.Blazor.Components.Editor.Redo()),
        new EditorButtonGroup(new Telerik.Blazor.Components.Editor.Bold(), new Telerik.Blazor.Components.Editor.Italic(), new Telerik.Blazor.Components.Editor.Underline()),
        new EditorButtonGroup(new UnorderedList())
    };

    public class TemplateModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public InsertPosition Position { get; set; }
        public string Content { get; set; }
    }

    public enum InsertPosition
    {
        End,
        Block,
        Inline
    }
}
````

