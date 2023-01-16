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
* [Header Template](#header-template)
* [Footer Template](#footer-template)
* [No Data Template](#no-data-template)
* [Example](#example)

## Item Template

@[template](/_contentTemplates/dropdowns/templates.md#item-template)

## Header Template

@[template](/_contentTemplates/dropdowns/templates.md#header-template)

## Footer Template

@[template](/_contentTemplates/dropdowns/templates.md#footer-template)

## No Data Template

@[template](/_contentTemplates/dropdowns/templates.md#no-data-template)

## Example

>caption Using MultiSelect Templates

````CSHTML
@* MultiSelect component with HeaderTemplate, ItemTemplate, FooterTemplate and NoDataTemplate *@

<p>
    <TelerikCheckBox @bind-Value="@IsDataAvailable" OnChange="@OnCheckBoxChangeHandler" />
    MultiSelect has data
</p>

<TelerikMultiSelect Data="@MultiSelectData" @bind-Value="@SelectedRoles" Placeholder="Write the roles you need">
    <HeaderTemplate>
        <strong>Select one or more:</strong>
    </HeaderTemplate>
    <ItemTemplate>
        Include <strong>@context</strong>
    </ItemTemplate>
    <FooterTemplate>
        <h6>Total Positions: @MultiSelectData.Count()</h6>
    </FooterTemplate>
    <NoDataTemplate>
        <div class="no-data-template">
            <TelerikFontIcon Class="k-icon k-icon-lg" Icon="files-error"></TelerikIcon>
            <p>No items available</p>
        </div>
    </NoDataTemplate>
</TelerikMultiSelect>

@code {
    private List<string> SelectedRoles { get; set; }

    private bool IsDataAvailable { get; set; } = true;

    private List<string> MultiSelectData { get; set; }

    private List<string> SourceData { get; set; } = new List<string> { "Manager", "Developer", "QA", "Technical Writer", "Support Engineer", "Sales Agent", "Architect", "Designer" };

    protected override void OnInitialized()
    {
        MultiSelectData = SourceData;
    }

    private void OnCheckBoxChangeHandler()
    {
        if (IsDataAvailable)
        {
            MultiSelectData = new List<string>(SourceData);
        }
        else
        {
            MultiSelectData = new List<string>();
        }
    }
}
````

## See Also

  * [Live Demo: MultiSelect Templates](https://demos.telerik.com/blazor-ui/multiselect/templates)
   
  
