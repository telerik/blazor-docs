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
* [Summary Tag Template](#summary-tag-template)
* [Header Template](#header-template)
* [Footer Template](#footer-template)
* [No Data Template](#no-data-template)
* [Example](#example)

## Item Template

@[template](/_contentTemplates/dropdowns/templates.md#item-template)

## Tag Template

@[template](/_contentTemplates/dropdowns/templates.md#tag-template)

## Summary Tag Template

The `SummaryTagTemplate` controls the rendering of the summary tag. The Multiselect renders a summary tag in two cases:
* In [Single Tag Mode](slug:multiselect-tag-mode#single-mode).
* In Multiple Tag Mode - [when the selected items are more than the `MaxAllowedTags`](slug:multiselect-tag-mode#summarized-tags-based-on-the-number-of-selections).

The context of the `SummaryTagTemplate` is of type `MultiSelectSummaryTagTemplateContext<TItem>`. It provides an `Items` field (a `List<TItem>`) that contains the selected items.

## Header Template

@[template](/_contentTemplates/dropdowns/templates.md#header-template)

## Footer Template

@[template](/_contentTemplates/dropdowns/templates.md#footer-template)

## No Data Template

@[template](/_contentTemplates/dropdowns/templates.md#no-data-template)

## Example

>caption Using MultiSelect Templates

````RAZOR
@* MultiSelect component with HeaderTemplate, ItemTemplate, TagTemplate, SummaryTagTemplate, FooterTemplate and NoDataTemplate *@

<p>
    <TelerikCheckBox @bind-Value="@IsDataAvailable" OnChange="@OnCheckBoxChangeHandler" />
    MultiSelect has data
</p>

<TelerikMultiSelect Data="@MultiSelectData"
                    @bind-Value="@SelectedRoles"
                    TextField="Title"
                    ValueField="Id"
                    MaxAllowedTags="@MaxAllowedTags"
                    Placeholder="Write the roles you need">
    <HeaderTemplate>
        <strong>Select one or more:</strong>
    </HeaderTemplate>
    <ItemTemplate>
        Include <strong>@context.Title</strong>
    </ItemTemplate>
    <TagTemplate>
        <TelerikSvgIcon Icon="@context.Icon"></TelerikSvgIcon>
        @context.Title
    </TagTemplate>
    <SummaryTagTemplate>
        @(context.Items.Count() - MaxAllowedTags) more roles selected
    </SummaryTagTemplate>
    <FooterTemplate>
        <h6>Total Positions: @MultiSelectData.Count()</h6>
    </FooterTemplate>
    <NoDataTemplate>
        <div class="no-data-template">
            <TelerikSvgIcon Size="@ThemeConstants.SvgIcon.Size.Large" Icon="@SvgIcon.FilesError"></TelerikSvgIcon>
            <p>No items available</p>
        </div>
    </NoDataTemplate>
</TelerikMultiSelect>

@code {
    private List<int> SelectedRoles { get; set; } = new List<int>() { 1, 4, 5, 8 };

    private bool IsDataAvailable { get; set; } = true;

    private int MaxAllowedTags { get; set; } = 2;

    private List<Role> MultiSelectData { get; set; }

    private List<Role> SourceData { get; set; } = new List<Role>()
    {
        new Role(){Id = 1, Title = "Manager", Icon = SvgIcon.User},
        new Role(){Id = 2, Title = "Developer", Icon = SvgIcon.Code},
        new Role(){Id = 3, Title = "QA", Icon = SvgIcon.ValidationXhtml},
        new Role(){Id = 4, Title = "Technical Writer", Icon = SvgIcon.Js},
        new Role(){Id = 5, Title = "Support Engineer", Icon = SvgIcon.QuestionCircle},
        new Role(){Id = 6, Title = "Sales Agent", Icon = SvgIcon.Dollar},
        new Role(){Id = 7, Title = "Architect", Icon = SvgIcon.BuildingBlocks},
        new Role(){Id = 8, Title = "Designer", Icon = SvgIcon.Brush},
    };

    public class Role
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public ISvgIcon Icon { get; set; }
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
   
  
