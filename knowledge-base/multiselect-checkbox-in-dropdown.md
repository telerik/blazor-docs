---
title: Checkbox in MultiSelect
description: How to add checkbox in the MultiSelect dropdown.
type: how-to
page_title: Checkbox in MultiSelect
slug: multiselect-kb-checkbox-in-dropdown
position: 
tags: 
ticketid: 1453142, 1606291
res_type: kb
components: ["multiselect"]
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

The MultiSelect offers a highlighted state for the selected items already, yet if you want to add checkboxes, you can do that through the [`ItemTemplate`](slug:multiselect-templates#item-template) and you can get their `checked` attribute by comparing the current item against the selected items.

>caption Add checkboxes in the multiselect

````RAZOR
@* Note: If you use complex models, the GetChecked() method will be more complex and 
    you would need to implement another convention for the id attribute, and you would need to cast the context *@

<TelerikMultiSelect Data="@Roles"
                    @bind-Value="@TheValues"
                    AutoClose="false"
                    Placeholder="Write the roles you need">
    <ItemTemplate>
        <input type="checkbox"
               id="@( "cb" + context.Replace(" ", "") )"
               class="k-checkbox k-rounded-md k-checkbox-md"
               checked="@GetChecked(context)">
        @context
    </ItemTemplate>
</TelerikMultiSelect>

@foreach (var item in TheValues)
{
    <div>@item</div>
}

@code {
    private List<string> TheValues { get; set; } = new List<string>();

    bool GetChecked(string text)
    {
        return TheValues.Contains(text);
    }

    private List<string> Roles { get; set; } = new List<string> {
        "Manager", "Developer", "QA", "Technical Writer", "Support Engineer", "Sales Agent", "Architect", "Designer"
    };
}
````

### Select All Checkbox

You can add a "Select All" feature through the `HeaderTemplate` - it only has to update the `Value` collection accordingly (empty, or to have all the items in the `Data`).

>caption Select all MultiSelect items with a checkbox

````RAZOR
@* Note: If you use complex models, the GetChecked() method will be more complex and
    you would need to implement another convention for the id attribute, and you would need to cast the context *@
    
<TelerikMultiSelect @ref="MultiSelectRef"
                    Data="@Roles"
                    @bind-Value="@TheValues"
                    AutoClose="false"
                    Placeholder="Write the roles you need">
    <HeaderTemplate>
        <div class="select-all-item">
            <TelerikCheckBox TValue="bool"
                             Value="@IsAllSelected()"
                             ValueChanged="@( (bool v) => ToggleSelectAll(v) )"
                             Id="ms-select-all-checkbox">
            </TelerikCheckBox>
            <label for="ms-select-all-checkbox">&nbsp;Select All</label>
        </div>
    </HeaderTemplate>
    <ItemTemplate>
        <input type="checkbox"
               id="@( "cb" + context.Replace(" ", "") )"
               class="k-checkbox k-checkbox-md"
               checked="@GetChecked(context)">
        @context
    </ItemTemplate>

</TelerikMultiSelect>

<style>
    .select-all-item {
        padding: 4px 8px;
        display: flex;
        cursor: pointer;
    }

        .select-all-item:hover {
            background: rgba(0, 0, 0, 0.06);
        }
        .select-all-item label {
            display: block;
            flex: 1 1 auto;
            cursor: pointer;
        }
</style>

@foreach (var item in TheValues)
{
    <div>@item</div>
}

@code {
    private TelerikMultiSelect<string, string> MultiSelectRef;
    private List<string> TheValues { get; set; } = new List<string>();

    void ToggleSelectAll(bool selectAll)
    {
        TheValues.Clear();

        if (selectAll)
        {
            TheValues.AddRange(Roles);
        }

        MultiSelectRef.Rebind();
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

    private List<string> Roles { get; set; } = new List<string> {
        "Manager", "Developer", "QA", "Technical Writer", "Support Engineer", "Sales Agent", "Architect", "Designer"
    };
}
````
