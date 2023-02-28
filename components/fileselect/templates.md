---
title: Templates
page_title: FileSelect - Templates
description: Templates in the FileSelect for Blazor.
slug: fileselect-templates
tags: telerik,blazor,fileselect,templates
published: True
position: 30
---

# FileSelect Templates

The `SelectFilesButtonTemplate` allows you to modify the "Select Files..." button. It lets you change the default text of the button and include a custom content like an [icon](https://docs.telerik.com/blazor-ui/common-features/icons) or image.

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