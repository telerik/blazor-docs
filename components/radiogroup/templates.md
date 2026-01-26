---
title: Templates
page_title: RadioGroup - Templates
description: Templates in the Radio Button Group for Blazor.
slug: radiogroup-templates
tags: telerik,blazor,radio button group,template
published: true
position: 20
components: ["radiogroup"]
---
# RadioGroup Templates

This article describes the available templates of the Telerik RadioGroup component for Blazor.

## Item Template

The `ItemTemplate` allow you to customize the rendering and appearance of each radio item. The template is a standard Blazor `RenderFragment`, so it can contain HTML markup or nested child components.

The template exposes a `context` variable. Cast it to the RadioGroup model type to access all data item properties.

>caption Using RadioGroup Item Template

````RAZOR
<TelerikRadioGroup Data="@RadioOptions"
                   @bind-Value="@RadioValue"
                   ValueField="@nameof(RadioModel.Id)"
                   TextField="@nameof(RadioModel.Text)">
    <ItemTemplate>
        @{
            var item = context as RadioModel;
        }
        <strong>@item.Text</strong> with <em>@item.Description</em>
    </ItemTemplate>
</TelerikRadioGroup>

@code {
    private List<RadioModel> RadioOptions { get; set; }

    private int RadioValue { get; set; }

    protected override void OnInitialized()
    {
        RadioOptions = new List<RadioModel>();

        for (int i = 1; i <= 3; i++)
        {
            RadioOptions.Add(new RadioModel()
            {
                Id = i,
                Text = $"Radio option {i}",
                Description = $"description {i}"
            });
        }

        base.OnInitialized();
    }

    public class RadioModel
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string Description { get; set; }
    }
}
````

## Next Steps

* [Handle the RadioGroup Events](slug:radiogroup-events)

## See Also

* [Live Demo: RadioGroup Templates](https://demos.telerik.com/blazor-ui/radiogroup/templates)
* [RadioGroup Label Position](slug:radiogroup-label-position)
