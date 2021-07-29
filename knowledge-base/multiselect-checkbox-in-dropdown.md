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

The AutoClose feature allows the MultiSelect to stay open while the user selects the input.

The MultiSelect offers a highlighted state for the selected items already, yet if you want to add checkboxes, you can do that through the ItemTemplate (https://docs.telerik.com/blazor-ui/components/multiselect/templates) and you can get their `checked` attribute by comparing the current item against the selected items.

>caption Add checkboxes in the multiselect

````CSHTML
@* Note: If you use complex models, the GetChecked() method will be more complex and 
    you would need to implement another convention for the id attribute, and you would need to cast the context *@

<TelerikMultiSelect Data="@Roles" @bind-Value="@TheValues" AutoClose="false" Placeholder="Write the roles you need">
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

### Select All Checkbox

You can add a "Select All" feature through the `HeaderTemplate` - it only has to update the `Value` collection accordingly (empty, or to have all the items in the `Data`).

Here is one example:

````CSHTML
@* Note: If you use complex models, the GetChecked() method will be more complex and
    you would need to implement another convention for the id attribute, and you would need to cast the context *@
    
<TelerikMultiSelect Data="@Roles" @bind-Value="@TheValues" AutoClose="false" Placeholder="Write the roles you need">

    <HeaderTemplate>
        <label style="padding: 4px 8px;">
            <TelerikCheckBox TValue="bool" Value="@IsAllSelected()" ValueChanged="@( (bool v) => ToggleSelectAll(v) )"></TelerikCheckBox>
            &nbsp;Select All
        </label>
    </HeaderTemplate>

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
    void ToggleSelectAll(bool selectAll)
    {
        if (selectAll)
        {
            TheValues = new List<string>(Roles);
        }
        else
        {
            TheValues = new List<string>();
        }
    }

    bool IsAllSelected()
    {
        return TheValues.Count == Roles.Count;

        // in this example we do a simple count check for performance
        // all items in the dropdown should be in the data anyway
        // caveat: virtualization does not work that way, but for it selecting all
        // would be a completely different feature anyway that will require asking the server for data
        // so it is beyond the scope of this article as it depends heavily on the use case and needs
    }
    
    // for the item checkboxes
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

