---
title: Checkbox in MultiSelect
description: How to add checkbox in the MultiSelect dropdown.
type: how-to
page_title: Checkbox in MultiSelect
slug: multiselect-kb-checkbox-in-dropdown
position: 
tags: 
ticketid: 1453142
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>MultiSelect for Blazor</td>
		</tr>
	</tbody>
</table>


## Description

I'd like a drop down list view/box control with check boxes and filtering. Let me know what I can use from the blazor controls.

Like https://demos.telerik.com/aspnet-ajax/combobox/examples/functionality/checkboxes/defaultcs.aspx 


## Solution

We have the MultiSelect component for this in Blazor: https://demos.telerik.com/blazor-ui/multiselect/overview

There is already a feature request for enabling it to stay open so the user can select many things at once, so you may want to Vote for it and Follow it: https://feedback.telerik.com/blazor/1452680-allow-selection-of-multiple-items-from-multiselect-dropdown-at-once-autoclose-parameter.

The MultiSelect offers a highlighted state for the selected items already, yet if you want to add checkboxes, you can do that through the ItemTemplate (https://docs.telerik.com/blazor-ui/components/multiselect/templates) and you can get their `checked` attribute by comparing the current item against the selected items.

>caption Add checkboxes in the multiselect

````CSHTML
@* Note: If you use complex models, the GetChecked() method will be more complex and 
    you would need to implement another convention for the id attribute, and you would need to cast the context *@

<TelerikMultiSelect Data="@Roles" @bind-Value="@TheValues" Placeholder="Write the roles you need">
    <ItemTemplate>
        <input type="checkbox" id="@( "cb" + context.Replace(" ", "") )" class="k-checkbox" checked="@GetChecked(context)">
        <label class="k-checkbox-label" for="@( "cb" + context.Replace(" ", "") )">@context</label>
    </ItemTemplate>
</TelerikMultiSelect>

@foreach (var item in TheValues)
{
    <div>@item</div>
}

@code{
    bool GetChecked(string text)
    {
        return TheValues.Contains(text);
    }

    List<string> TheValues { get; set; } = new List<string>();

    List<string> Roles { get; set; } = new List<string> {
        "Manager", "Developer", "QA", "Technical Writer", "Support Engineer", "Sales Agent", "Architect", "Designer"
    };
}
````

