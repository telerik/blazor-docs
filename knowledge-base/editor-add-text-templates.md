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

1. [Create custom tool]({%slug editor-custom-tools%}). If you want to include more than one template option, you may consider a [DropDownList]({%slug components/dropdownlist/overview%}) component as per the example below. Thus, the user will be able to easily select one of the suggested templates.

1. Provide a colection of your templates to the `Data` parameter of the DropDownList. The example below shows how you can use a complex model for the templates. The DropDownList only uses an `Id` and `Title` to show the available templates to the user. Once the user selects the desired template, you may retrieve its content from the database, for example. The key part is that the content of the template should be provided to the Editor as `string`, so the component can render it.

1. Handle the [`ValueChanged`]({%slug components/dropdownlist/events%}#valuechanged) event of the DropDownList to get the template value and update the Editor value. You may add the template value to the Editor or replace the whole content depending on the exact desired result.

````CSHTML
@using Telerik.Blazor.Components.Editor

<TelerikEditor @bind-Value="@EditorValue"
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
    private string EditorValue { get; set; }

    private int SelectedTemplateId { get; set; }

    private List<TemplateModel> Templates { get; set; } = new List<TemplateModel>();

    private void OnTemplateSelected(int TemplateID)
    {
        SelectedTemplateId = TemplateID;

        TemplateModel SelectedTemplate = Templates.FirstOrDefault(x => x.Id == TemplateID);

        EditorValue += SelectedTemplate.Content;
    }

    protected override async Task OnInitializedAsync()
    {
        Tools.Add(new CustomTool("Templates"));

        Templates = new List<TemplateModel>()
        {
        new TemplateModel()
        {
            Id = 1,
            Title="Signature",
            Content = "<p></p><p>Regards,</p><h4>Jane Doe</h4><p><em>Senior Support Engineer</em></p><p>Telerik UI for Blazor</p>"
        },
        new TemplateModel()
        {
            Id = 2,
            Title="Sick leave",
            Content = "<p>Dear sender,</p><p>I am currently out of office on a sick leave. Please contact my team members for urgent requests.</p><p>Regards,</p><p>Jane Doe</p>"
        },
        };
    }

    public List<IEditorTool> Tools { get; set; } = new List<IEditorTool>()
    {
        new EditorButtonGroup(new Undo(), new Redo()),
        new EditorButtonGroup(new Bold(), new Italic(), new Underline()),
        new EditorButtonGroup(new UnorderedList())
    };

    public class TemplateModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
    }
}
````

