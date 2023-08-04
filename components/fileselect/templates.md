---
title: Templates
page_title: FileSelect Templates
description: Discover the Blazor FileSelect component templates that enable you to customize the rendered button. The templates allow you to change the text and add custom content. 
slug: fileselect-templates
tags: telerik,blazor,fileselect,templates
published: True
position: 30
---

# FileSelect Templates

The `SelectFilesButtonTemplate` allows you to modify the **Select Files...** button. It lets you change the default text of the button and include custom content like an [icon](/blazor-ui/common-features/icons) or image.

>caption Using FileSelect SelectFilesButtonTemplate

```CSHTML
<div>
    <TelerikFileSelect>
        <SelectFilesButtonTemplate>
            <TelerikFontIcon Icon="@FontIcon.Upload" />
            Click to Select Files for Upload
        </SelectFilesButtonTemplate>
    </TelerikFileSelect>
</div>
```

## See Also

* [FileSelect API](/blazor-ui/api/Telerik.Blazor.Components.TelerikFileSelect)
* [FileSelect Overview]({%slug fileselect-overview%})
* [FileSelect Validation]({%slug fileselect-validation%})
* [FileSelect Events]({%slug fileselect-events%})