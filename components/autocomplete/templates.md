---
title: Templates
page_title: AutoComplete - Templates
description: Templates in the AutoComplete for Blazor.
slug: autocomplete-templates
tags: telerik,blazor,combo,autocomplete,templates
published: True
position: 20
---

# AutoComplete Templates

The AutoComplete component allows you to change what is rendered in its items, header and footer through templates.

List of the available templates:

* [Item Template](#item-template)
* [Header Template](#header-template)
* [Footer Template](#footer-template)
* [No Data Template](#no-data-template)


## Item Template

The Item template determines how the individual items are rendered in the dropdown element of the component. By default, the text from the particular suggestions is rendered.

>caption Item Template Example

````CSHTML
@* Define what renders for the items in the dropdown *@

<TelerikAutoComplete Data="@Suggestions" @bind-Value="@Role" Placeholder="Write your position">
    <ItemTemplate>
        Are you a&nbsp;<strong>@context</strong>
    </ItemTemplate>
</TelerikAutoComplete>

@code{
    string Role { get; set; }

    List<string> Suggestions { get; set; } = new List<string> {
        "Manager", "Developer", "QA", "Technical Writer", "Support Engineer", "Sales Agent", "Architect", "Designer"
    };
}
````

>caption The result from the code snippet above

![Blazor Autocomplete Item Template](images/autocomplete-item-template.png)

## Header Template

The header is content that you can place above the list of items inside the dropdown element. It is always visible when the combobox is expanded. By default it is empty.

>caption Header Example

````CSHTML
@* Define a header in the dropdown *@

<TelerikAutoComplete Data="@Suggestions" @bind-Value="@Role" Placeholder="Write your position">
    <HeaderTemplate>
        <strong>Write your own if you don't see it in the list</strong>
    </HeaderTemplate>
</TelerikAutoComplete>

@code{
    string Role { get; set; }

    List<string> Suggestions { get; set; } = new List<string> {
        "Manager", "Developer", "QA", "Technical Writer", "Support Engineer", "Sales Agent", "Architect", "Designer"
    };
}
````

>caption The result from the code snippet above

![Blazor Autocomplete Header Template](images/autocomplete-header-template.png)

## Footer Template

The footer is content that you can place below the list of items inside the dropdownlist element. It is always visible when the dropdown is expanded. By default it is empty.

>caption Footer Example

````CSHTML
@* Define dropdown footer *@

<TelerikAutoComplete Data="@Suggestions" @bind-Value="@Role" Placeholder="Write your position">
    <FooterTemplate>
        <h5>Total Positions: @Suggestions.Count()</h5>
    </FooterTemplate>
</TelerikAutoComplete>

@code{
    string Role { get; set; }

    List<string> Suggestions { get; set; } = new List<string> {
        "Manager", "Developer", "QA", "Technical Writer", "Support Engineer", "Sales Agent", "Architect", "Designer"
    };
}
````

>caption The result from the code snippet above

![Blazor Autocomplete Footer Template](images/autocomplete-footer-template.png)

## No Data Template

@[template](/_contentTemplates/dropdowns/templates.md#no-data-template)

>caption No Data Template Example

````CSHTML
<TelerikAutoComplete Data="@AutoCompleteData" @bind-Value="@AutoCompleteValue">
    <NoDataTemplate>
        <div class="no-data-template">
            <TelerikIcon Class="k-icon k-icon-lg" Icon="files-error"></TelerikIcon>
            <p>No records available</p>
        </div>
    </NoDataTemplate>
</TelerikAutoComplete>

@code {
    private List<string> AutoCompleteData { get; set; } = new List<string>();

    private string AutoCompleteValue { get; set; }
}
````

## See Also

  * [Live Demo: AutoComplete Templates](https://demos.telerik.com/blazor-ui/autocomplete/templates)
   
  
