---
title: Templates
page_title: Upload Templates
description: Templates in the Upload for Blazor.
slug: upload-templates
tags: telerik,blazor,upload,templates
published: True
position: 30
---

# Upload Templates

The `SelectFilesButtonTemplate` allows you to modify the "Select Files..." button. It lets you change the default text of the button and include a custom content like an [icon](https://docs.telerik.com/blazor-ui/common-features/icons) or image.

>caption Using Upload SelectFilesButtonTemplate

```HTML
<div>
    <TelerikUpload>
        <SelectFilesButtonTemplate>
            <TelerikFontIcon Icon="@FontIcon.Upload" />
            Click to Select Files for Upload
        </SelectFilesButtonTemplate>
    </TelerikUpload>
</div>

```

## See Also

* [Upload API](/blazor-ui/api/Telerik.Blazor.Components.TelerikUpload)
* [Upload Overview]({%slug upload-overview%})
* [Upload Validation]({%slug upload-validation%})
* [Upload Events]({%slug upload-events%})