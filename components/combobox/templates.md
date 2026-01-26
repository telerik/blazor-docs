---
title: Templates
page_title: ComboBox - Templates
description: Templates in the ComboBox for Blazor.
slug: components/combobox/templates
tags: telerik,blazor,combo,combobox,templates
published: True
position: 25
components: ["combobox"]
---
# ComboBox Templates

The ComboBox component allows you to change what is rendered in its items, header and footer through templates.

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

>caption Using ComboBox Templates

````RAZOR
@* ComboBox component with HeaderTemplate, ItemTemplate, FooterTemplate and NoDataTemplate *@

<p>
    <TelerikCheckBox @bind-Value="@IsDataAvailable" OnChange="@OnCheckBoxChangeHandler" />
    ComboBox has data
</p>

<TelerikComboBox Data="@ComboBoxData" @bind-Value="@Role" Placeholder="Write your position">
    <HeaderTemplate>
        <strong>Select one of the following:</strong>
    </HeaderTemplate>
    <ItemTemplate>
        Are you a <strong>@context</strong>
    </ItemTemplate>
    <FooterTemplate>
        <h6>Total Positions: @ComboBoxData.Count()</h6>
    </FooterTemplate>
    <NoDataTemplate>
        <div class="no-data-template">
            <TelerikSvgIcon Size="@ThemeConstants.SvgIcon.Size.Large" Icon="@SvgIcon.FilesError"></TelerikSvgIcon>
            <p>No items available</p>
        </div>
    </NoDataTemplate>
</TelerikComboBox>

@code {
    private string Role { get; set; }

    private bool IsDataAvailable { get; set; } = true;

    private List<string> ComboBoxData { get; set; }

    private List<string> SourceData { get; set; } = new List<string> { "Manager", "Developer", "QA", "Technical Writer", "Support Engineer", "Sales Agent", "Architect", "Designer" };

    protected override void OnInitialized()
    {
        ComboBoxData = SourceData;
    }

    private void OnCheckBoxChangeHandler()
    {
        if (IsDataAvailable)
        {
            ComboBoxData = new List<string>(SourceData);
        }else{
            ComboBoxData = new List<string>();
        }
    }
}
````

## See Also

  * [Live Demo: ComboBox Templates](https://demos.telerik.com/blazor-ui/combobox/templates)
   
  
