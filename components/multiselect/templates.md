---
title: Templates
page_title: MultiSelect - Templates
description: Templates in the MultiSelect for Blazor.
slug: multiselect-templates
tags: telerik,blazor,multiselect,templates
published: True
position: 20
---

# MultiSelect Templates

The MultiSelect component allows you to change what is rendered in its items, header and footer through templates.

>caption In this article:

* [Item Template](#item-template)
* [Tag Template](#tag-template)
* [Header Template](#header-template)
* [Footer Template](#footer-template)
* [No Data Template](#no-data-template)
* [Example](#example)

## Item Template

@[template](/_contentTemplates/dropdowns/templates.md#item-template)

## Tag Template

@[template](/_contentTemplates/dropdowns/templates.md#tag-template)

## Header Template

@[template](/_contentTemplates/dropdowns/templates.md#header-template)

## Footer Template

@[template](/_contentTemplates/dropdowns/templates.md#footer-template)

## No Data Template

@[template](/_contentTemplates/dropdowns/templates.md#no-data-template)

## Example

>caption Using MultiSelect Templates

````CSHTML
* MultiSelect component with HeaderTemplate, ItemTemplate, TagTemplate, FooterTemplate and NoDataTemplate *@

<p>
    <TelerikCheckBox @bind-Value="@IsDataAvailable" OnChange="@OnCheckBoxChangeHandler" />
    MultiSelect has data
</p>

<TelerikMultiSelect Data="@MultiSelectData"
                    @bind-Value="@SelectedRoles"
                    TextField="Title"
                    ValueField="Id"
                    Placeholder="Write the roles you need">
    <HeaderTemplate>
        <strong>Select one or more:</strong>
    </HeaderTemplate>
    <ItemTemplate>
        Include <strong>@context.Title</strong>
    </ItemTemplate>
    <TagTemplate>
        <TelerikFontIcon Icon="@context.Icon"></TelerikFontIcon>
        @context.Title
    </TagTemplate>
    <FooterTemplate>
        <h6>Total Positions: @MultiSelectData.Count()</h6>
    </FooterTemplate>
    <NoDataTemplate>
        <div class="no-data-template">
            <TelerikFontIcon Class="k-icon k-icon-lg" Icon="@FontIcon.FilesError"></TelerikFontIcon>
            <p>No items available</p>
        </div>
    </NoDataTemplate>
</TelerikMultiSelect>

@code {
    private List<int> SelectedRoles { get; set; }

    private bool IsDataAvailable { get; set; } = true;

    private List<Role> MultiSelectData { get; set; }   

    private List<Role> SourceData { get; set; } = new List<Role>()
    {
        new Role(){Id = 1, Title = "Manager", Icon = FontIcon.User},
        new Role(){Id = 2, Title = "Developer", Icon = FontIcon.Code},
        new Role(){Id = 3, Title = "QA", Icon = FontIcon.ValidationXhtml},
        new Role(){Id = 4, Title = "Technical Writer", Icon = FontIcon.Js},
        new Role(){Id = 5, Title = "Support Engineer", Icon = FontIcon.QuestionCircle},
        new Role(){Id = 6, Title = "Sales Agent", Icon = FontIcon.Dollar},
        new Role(){Id = 7, Title = "Architect", Icon = FontIcon.BuildingBlocks},
        new Role(){Id = 8, Title = "Designer", Icon = FontIcon.Brush},
    };

    public class Role
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public FontIcon Icon { get; set; }
    }

    protected override void OnInitialized()
    {
        MultiSelectData = SourceData;
    }

    private void OnCheckBoxChangeHandler()
    {
        if (IsDataAvailable)
        {
            MultiSelectData = new List<Role>(SourceData);
        }
        else
        {
            MultiSelectData = new List<Role>();
        }
    }
}
````

## See Also

  * [Live Demo: MultiSelect Templates](https://demos.telerik.com/blazor-ui/multiselect/templates)
   
  
