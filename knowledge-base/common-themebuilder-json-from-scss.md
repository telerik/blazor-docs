---
title: Missing JSON file to Import in the ThemeBuilder
description: The SASS Theme Builder requires a JSON file to import a theme. Here is how to create it if you don't have it.
type: troubleshooting
page_title: JSON File for Theme Builder Import Unavailable
slug: common-kb-themebuilder-json-from-scss
position: 
tags: telerik, blazor, custom, theme, themebuilder
ticketid: 1523785, 1521445, 1525713
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>UI for Blazor</td>
		</tr>
	</tbody>
</table>


## Description
I have a custom theme `SCSS` (SASS) file with variables and values, which I created with the [SASS Theme Builder](https://themebuilder.telerik.com/blazor-ui). I want to import this `SCSS` file to the Theme Builder to make some changes, but the Theme Builder now requires a `JSON` file import.

## Cause\Possible Cause(s)
The Theme Builder used to accept an `SCSS` (SASS) file to import an existing custom theme. This caused [some issues](https://github.com/telerik/kendo-themes/issues/2043) and we decided to switch to `JSON` import instead.

## Suggested Workarounds
If your custom theme targets specific components, we recommend that you [create it from scratch]({%slug themes-custom%}).

If your custom theme targets all components, you can create the `JSON` file manually from the existing `SCSS` file. Here is how the JSON file should look like and the things you need to change:

* `CUSTOM_NAME` - should be the name of your custom theme
* `ORIGINAL_NAME` - should be the name of your base theme, e.g. `default`, `bootstrap`, `material`, etc.
* all variable **values**

```json
{
    "name": "CUSTOM_NAME",
    "base": "@progress/kendo-theme-ORIGINAL_NAME",
    "product": "kendo",
    "components": [],
    "themeBuilder": [
        {
            "name": "",
            "variables": {
                "border-radius": {
                    "name": "Border radius",
                    "type": "number",
                    "value": "2px",
                    "key": "border-radius"
                },
                "primary": {
                    "name": "Primary",
                    "type": "color",
                    "value": "#fb00ff",
                    "key": "primary"
                },
                "secondary": {
                    "name": "Secondary",
                    "type": "color",
                    "value": "#f6f6f6",
                    "key": "secondary"
                },
                "info": {
                    "name": "Info",
                    "type": "color",
                    "value": "#3e80ed",
                    "key": "info"
                },
                "success": {
                    "name": "Success",
                    "type": "color",
                    "value": "#5ec232",
                    "key": "success"
                },
                "warning": {
                    "name": "Warning",
                    "type": "color",
                    "value": "#fdce3e",
                    "key": "warning"
                },
                "error": {
                    "name": "Error",
                    "type": "color",
                    "value": "#d51923",
                    "key": "error"
                },
                "body-text": {
                    "name": "Body text color",
                    "type": "color",
                    "value": "#424242",
                    "key": "body-text"
                },
                "body-bg": {
                    "name": "Body background",
                    "type": "color",
                    "value": "#ffffff",
                    "key": "body-bg"
                },
                "headings-text": {
                    "name": "Headings text color",
                    "type": "color",
                    "value": "#272727",
                    "key": "headings-text"
                },
                "subtle-text": {
                    "name": "Subtle text color",
                    "type": "color",
                    "value": "#666666",
                    "key": "subtle-text"
                },
                "disabled-text": {
                    "name": "Disabled text color",
                    "type": "color",
                    "value": "#8f8f8f",
                    "key": "disabled-text"
                },
                "component-text": {
                    "name": "Component text color",
                    "type": "color",
                    "value": "#0912b7",
                    "key": "component-text"
                },
                "component-bg": {
                    "name": "Component background",
                    "type": "color",
                    "value": "#ffffff",
                    "key": "component-bg"
                },
                "base-text": {
                    "name": "Header text color",
                    "type": "color",
                    "value": "#424242",
                    "key": "base-text"
                },
                "base-bg": {
                    "name": "Header background",
                    "type": "color",
                    "value": "#fafafa",
                    "key": "base-bg"
                },
                "hovered-text": {
                    "name": "Hover text color",
                    "type": "color",
                    "value": "#424242",
                    "key": "hovered-text"
                },
                "hovered-bg": {
                    "name": "Hover background",
                    "type": "color",
                    "value": "#ececec",
                    "key": "hovered-bg"
                },
                "selected-text": {
                    "name": "Selected text color",
                    "type": "color",
                    "value": "#ffffff",
                    "key": "selected-text"
                },
                "selected-bg": {
                    "name": "Selected background",
                    "type": "color",
                    "value": "#ff6358",
                    "key": "selected-bg"
                },
                "button-text": {
                    "name": "Button text color",
                    "type": "color",
                    "value": "#424242",
                    "key": "button-text"
                },
                "button-bg": {
                    "name": "Button background",
                    "type": "color",
                    "value": "#f5f5f5",
                    "key": "button-bg"
                },
                "link-text": {
                    "name": "Link text color",
                    "type": "color",
                    "value": "#32f800",
                    "key": "link-text"
                },
                "link-hover-text": {
                    "name": "Link hover text color",
                    "type": "color",
                    "value": "#d6534a",
                    "key": "link-hover-text"
                },
                "series-a": {
                    "name": "Series A",
                    "type": "color",
                    "value": "#ff6358",
                    "key": "series-a"
                },
                "series-b": {
                    "name": "Series B",
                    "type": "color",
                    "value": "#ffd246",
                    "key": "series-b"
                },
                "series-c": {
                    "name": "Series C",
                    "type": "color",
                    "value": "#78d237",
                    "key": "series-c"
                },
                "series-d": {
                    "name": "Series D",
                    "type": "color",
                    "value": "#28b4c8",
                    "key": "series-d"
                },
                "series-e": {
                    "name": "Series E",
                    "type": "color",
                    "value": "#2d73f5",
                    "key": "series-e"
                },
                "series-f": {
                    "name": "Series F",
                    "type": "color",
                    "value": "#aa46be",
                    "key": "series-f"
                }
            }
        }
    ]
}
```
