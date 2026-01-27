---
title: Display Conditional Tooltips to ComboBox and MultiSelect for Dynamic Widths
description: Learn how to conditionally display tooltips for TelerikComboBox and TelerikMultiSelect components based on dynamic text overflow.
type: how-to
page_title: Implementing Dynamic Tooltips for ComboBox and MultiSelect in Blazor
slug: combobox-multiselect-kb-conditional-tooltips
tags: blazor, combobox, multiselect, tooltip
ticketid: 1693287
res_type: kb
components: ["combobox"]
---
## Environment

<table>
    <tbody>
        <tr>
            <td> Product </td>
            <td>
            ComboBox for Blazor, <br/>
            MultiSelect for Blazor
            </td>
        </tr>
    </tbody>
</table>

## Description

I want to display tooltips for the [ComboBox](slug:components/combobox/overview) and [MultiSelect](slug:multiselect-overview) components in my Blazor application only when the text is ellipsed due to dynamic widths. If there’s enough space for the text to be fully visible, the tooltip should not appear. 

This knowledge base article also answers the following questions:
- How to show tooltips for ellipsed text in ComboBox and MultiSelect?
- How to use JavaScript to check text overflow in Blazor components?
- How to implement dynamic tooltips based on [`clientWidth`](https://developer.mozilla.org/en-US/docs/Web/API/Element/clientWidth) and [`scrollWidth`](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollWidth)?

## Solution

To ensure tooltips are displayed only when text is ellipsed, use JavaScript to check whether the element's `scrollWidth` exceeds its `clientWidth`. Below are the steps to implement this functionality for both components:

### ComboBox Implementation

1. Add a `<span>` wrapper around the ComboBox component and assign it an id.
2. Use JavaScript to check for text overflow and conditionally set the tooltip target.

>caption Display a Tooltip for Overflowing ComboBox Items

```razor
@inject IJSRuntime JS

@if (SelectedHobbyId != 0)
{
    <TelerikTooltip TargetSelector="#products-multiselect[title]" />
}

@{
    <span id="@(IsCurrentOverflowing ? "products-multiselect" : "products-multiselect-none")"
          @onmouseenter="OnMouseEnter"
          title="@CurrentHobbyName">
        <TelerikComboBox @bind-Value="@SelectedHobbyId"
                         Data="@Hobbies"
                         Placeholder="Select your favourite sport..."
                         TextField="@nameof(HobbiesDto.HobbyName)"
                         ValueField="@nameof(HobbiesDto.HobbyId)"
                         Filterable="true"
                         Width="20%"
                         Class="example-cb">
        </TelerikComboBox>
    </span>
}

@* suppress-error allows script tags inside Razor components.
   Move the script to an external file in production apps. *@
<script suppress-error="BL9992">
    window.isTextOverflowing = () => {
        const el = document.querySelector('.example-cb .k-input-inner');
        if (!el) {
            return;
        }

        return el.scrollWidth > el.clientWidth;
    };
</script>

@code {
    private int SelectedHobbyId { get; set; }
    private bool IsCurrentOverflowing { get; set; } = false;
    private string CurrentHobbyName => FindCurrentHobby()?.HobbyName;

    private IEnumerable<HobbiesDto> Hobbies { get; set; } = new List<HobbiesDto>()
    {
        new HobbiesDto(1, "This is a test for a very very very very long sentance."),
        new HobbiesDto(2, "This is some long test sentance."),
        new HobbiesDto(3, "This is another long test sentance."),
        new HobbiesDto(4, "Table Tennis"),
        new HobbiesDto(5, "Volleyball"),
        new HobbiesDto(6, "Football"),
    };

    private async Task OnMouseEnter()
    {
        @if (SelectedHobbyId != 0)
        {
            IsCurrentOverflowing = await JS.InvokeAsync<bool>("isTextOverflowing");
        }
    }

    private HobbiesDto? FindCurrentHobby()
    {
        return Hobbies.FirstOrDefault(x => x.HobbyId == SelectedHobbyId);
    }

    public class HobbiesDto
    {
        public HobbiesDto(int id, string name)
        {
            HobbyId = id;
            HobbyName = name;
        }

        public int HobbyId { get; set; }
        public string HobbyName { get; set; }
    }
}
```

### MultiSelect Implementation

1. Use the [`TagTemplate`](slug:multiselect-templates#tag-template) to customize the display of tags in the MultiSelect.
2. Use JavaScript to determine overflow and set the tooltip.

>caption Display a Tooltip for Overflowing MultiSelect Items

```razor
@inject IJSRuntime JS

<TelerikTooltip TargetSelector=".example-ms .k-chip-label[title]">
    <Template>
        @{
            var title = context.Title;
            var hobby = Hobbies.FirstOrDefault(x => x.HobbyId == Convert.ToInt32(title));
            <div>
                @(hobby?.HobbyName)
            </div>
        }
    </Template>
</TelerikTooltip>

<TelerikMultiSelect Data="@Hobbies"
                    Class="example-ms"
                    @bind-Value="@SelectedHobbyIds"
                    ValueField="@nameof(HobbiesDto.HobbyId)"
                    TextField="@nameof(HobbiesDto.HobbyName)"
                    Placeholder="Select your favourite sport..."
                    Id="products-multiselect" Width="300px">
    <TagTemplate>
        <span class="k-chip-content">
            @{
                int? itemTitle = IsItemOverflowing ? context.HobbyId : null;
            }
            <span
            class="k-chip-label"
            @onmouseenter="() => OnHoverHandler(context.HobbyId)"
            id="item @context.HobbyId"
            title="@itemTitle">
                @context.HobbyName
            </span>
        </span>
    </TagTemplate>
</TelerikMultiSelect>

@* suppress-error allows script tags inside Razor components.
   Move the script to an external file in production apps. *@
<script suppress-error="BL9992">
    window.isTextOverflowing = (id) => {
        const el = document.getElementById(id);
        if (!el) {
            return false;
        }
        
        return el.scrollWidth > el.clientWidth;
    };
</script>

@code {
    private bool IsItemOverflowing { get; set; }
    private List<int> SelectedHobbyIds { get; set; }

    private IEnumerable<HobbiesDto> Hobbies { get; set; } = new List<HobbiesDto>()
    {
        new HobbiesDto(1, "This is a test for a very very very very long sentance."),
        new HobbiesDto(2, "Some long test sentance."),
        new HobbiesDto(3, "Some very very very long test sentance."),
        new HobbiesDto(4, "Table Tennis"),
        new HobbiesDto(5, "Volleyball"),
        new HobbiesDto(6, "Football"),
    };

    private async Task OnHoverHandler(int id)
    {
        IsItemOverflowing = await JS.InvokeAsync<bool>("isTextOverflowing", $"item {id}");
    }

    public class HobbiesDto
    {
        public int HobbyId { get; set; }
        public string HobbyName { get; set; }

        public HobbiesDto(int id, string name)
        {
            HobbyId = id;
            HobbyName = name;
        }
    }
}
```

### Notes

- Move custom JavaScript functions to your static assets directory in production.
- Ensure the tooltip `TargetSelector` only matches elements with overflow.

## See Also

- [ComboBox Overview](slug:components/combobox/overview)
- [MultiSelect Overview](slug:multiselect-overview)
- [Tooltip Overview](slug:tooltip-overview)
- [JavaScript scrollWidth Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollWidth)
- [JavaScript clientWidth Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Element/clientWidth)