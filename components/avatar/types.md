---
title: Types
page_title: Avatar Types
description: Explore the Blazor Avatar Types.
slug: avatar-types
tags: telerik,blazor,avatar,type,image,icon,text
published: True
position: 5
---

# Avatar Types

The `Type` parameter of the Avatar for Blazor defines what kind of content will render inside the component. The parameter allows the Avatar to adjust its styling to its content.

The Avatar serves as a wrapper - you should declare the desired content as `ChildContent` inside the `<TelerikAvatar>` tag and specify the `Type` based on the content type.

The `Type` parameter accepts a member of the `AvatarType` enum:

* `Image` - default value
* `Text`
* `Icon`

If the `Type` parameter value is not matching the type of the content, you will not get the optimal appearance of the component. For example, using `AvatarType.Image` when you render text in the component will result in misaligned text.

>tip We recommend setting the correct `Type` to the Avatar depending on the content you want to display inside it. The Avatar will apply different styles to the content based on the specified `Type`.

>caption Different types of Avatar content

````RAZOR
@*Avatar types*@

<TelerikAvatar Type="AvatarType.Image">

    <img src="https://demos.telerik.com/blazor-ui/images/panelbar/robert.jpg" />

</TelerikAvatar>

<TelerikAvatar Type="AvatarType.Text">
    JD
</TelerikAvatar>

<TelerikAvatar Type="AvatarType.Icon">

    <TelerikSvgIcon Icon="@SvgIcon.User"></TelerikSvgIcon>

</TelerikAvatar>
````

## Next Steps

* [Configure the appearance options of the Avatar](slug:avatar-appearance)

## See Also

  * [Live Demo: Avatar](https://demos.telerik.com/blazor-ui/avatar/overview)