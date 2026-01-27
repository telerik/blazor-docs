---
title: Appearance
page_title: Avatar Appearance
description: Appearance settings of the Avatar for Blazor.
slug: avatar-appearance
tags: telerik,blazor,avatar,appearance
published: True
position: 10
components: ["avatar"]
---
# Appearance Settings

You can control the appearance of the Avatar by setting the following parameters:

* [Size](#size)
* [Rounded](#rounded)
* [FillMode](#fillmode)
* [ThemeColor](#themecolor)

You can use all of them together to achieve the desired appearance. This article will explain their effect one by one.

## Size

You can increase or decrease the size of the Avatar by setting the `Size` parameter to a member of the `Telerik.Blazor.ThemeConstants.Avatar.Size` class:

| Class members | Manual declarations |
|---------------|--------|
| `Small`   |`sm`|
| `Medium` (default value)  |`md`|
| `Large`   |`lg`|

> The default value of the `Size` will take precedence over the values of the `Width` and `Height` parameters. Set the `Size` to an empty `string` to apply your custom `Width` and `Height`.

>caption The built-in Avatar sizes

````RAZOR
@{
    var fields = typeof(Telerik.Blazor.ThemeConstants.Avatar.Size)
        .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static
        | System.Reflection.BindingFlags.FlattenHierarchy)
        .Where(field => field.IsLiteral && !field.IsInitOnly).ToList();

    foreach (var field in fields)
    {
        string size = field.GetValue(null).ToString();

        <div style="float:left; margin: 20px;">
        <TelerikAvatar Size="@size" Type="AvatarType.Text">
            JD
        </TelerikAvatar>
        </div>
    }
}
````

## Rounded

The `Rounded` parameter applies the `border-radius` CSS style to the Avatar to achieve curving of the edges. You can set it to a member of the `Telerik.Blazor.ThemeConstants.Avatar.Rounded` class:

| Class members | Manual declarations |
|------------|--------|
|`Small` |`sm`|
|`Medium`|`md`|
|`Large`|`lg`|
|`Full` (default value) |`full`|

>caption The built-in values of the Rounded attribute

````RAZOR
@* The built-in rounded options of the Avatar.  *@

@{
    var fields = typeof(Telerik.Blazor.ThemeConstants.Avatar.Rounded)
        .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static
        | System.Reflection.BindingFlags.FlattenHierarchy)
        .Where(field => field.IsLiteral && !field.IsInitOnly).ToList();

    foreach (var field in fields)
    {
        string rounded = field.GetValue(null).ToString();

        <div style="float:left; margin: 20px;">
            <TelerikAvatar Rounded="@rounded" Type="AvatarType.Text">
                JD
            </TelerikAvatar>
        </div>
    }
}
````

## FillMode

The `FillMode` controls whether the TelerikAvatar has background or is just outlined. You can set it to a member of the `Telerik.Blazor.ThemeConstants.Avatar.FillMode` class:

| Class members | Manual declarations |
|------------|--------|
|`Solid` (default value) |`solid`|
|`Outline`|`outline`|

>tip This setting is applicable when the `AvatarType` is set to `Text` or `Icon`. With the `Image` type, the provided image takes all the available space in the Avatar.

>caption The built-in Fill modes

````RAZOR
@* These are all built-in fill modes of the Avatar*@

@{
    var fields = typeof(Telerik.Blazor.ThemeConstants.Avatar.FillMode)
        .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static
        | System.Reflection.BindingFlags.FlattenHierarchy)
        .Where(field => field.IsLiteral && !field.IsInitOnly).ToList();

    foreach (var field in fields)
    {
        string fillmode = field.GetValue(null).ToString();

        <div style="float:left; margin: 20px;">
            <TelerikAvatar FillMode="@fillmode" Type="AvatarType.Text">
                JD
            </TelerikAvatar>
        </div>
    }
}
````

## ThemeColor

The color of the Avatar is controlled through the `ThemeColor` parameter. You can set it to a member of the `Telerik.Blazor.ThemeConstants.Avatar.ThemeColor` class:

| Class members | Manual declarations |
|------------|--------|
|`Base` (default value) |`base`|
|`Primary`|`primary`|
|`Secondary`|`secondary`|
|`Tertiary`|`tertiary`|
|`Info`|`info`|
|`Success`|`success`|
|`Warning`|`warning`|
|`Error`|`error`|
|`Dark`|`dark`|
|`Light`|`light`|
|`Inverse`|`inverse`|


>caption The built-in ThemeColors

````RAZOR
@* The built-in Avatar colors *@

@{
    var fields = typeof(Telerik.Blazor.ThemeConstants.Avatar.ThemeColor)
        .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static
        | System.Reflection.BindingFlags.FlattenHierarchy)
        .Where(field => field.IsLiteral && !field.IsInitOnly).ToList();

    foreach (var field in fields)
    {
        string themeColor = field.GetValue(null).ToString();

        <div style="float:left; margin: 20px;">
            <TelerikAvatar ThemeColor="@themeColor" Type="AvatarType.Text">
                JD
            </TelerikAvatar>
        </div>
    }
}
````

@[template](/_contentTemplates/common/themebuilder-section.md#appearance-themebuilder)

## Next Steps

* [Explore the Avatar types](slug:avatar-types)

## See Also

  * [Live Demo: Avatar Appearance](https://demos.telerik.com/blazor-ui/avatar/appearance)