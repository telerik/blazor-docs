---
title: Icons
page_title: Icons
description: How to use the built-in font icons in the UI for Blazor suite.
slug: general-information/font-icons
tags: telerik,blazor,icon,font,built-in
published: True
position: 1
---

# Built-in Icons

The UI for Blazor suite comes with a set of font icons that you can use in various places like in the Button component, or as a standalone component.

In this article:

* [Standalone Icon Component](#standalone-icon-component)
* [Icon in Telerik Component](#icon-in-telerik-component)
* [Icons List](#icons-list)


## Standalone Icon Component

Telerik UI for Blazor comes with the `TelerikIcon` component that you can use to render icons. It works with the following image types:

* **Telerik font icon** - You can find the rendered icons and their names in the [Icons List](#icons-list) section below. Use those names as plain strings.

* **Third party font-icon** - the `IconClass` parameter lets you set a CSS class that provides the required font name, font size and content for the `::before` pseudoelement.

* **Raster image** - the `ImageUrl` is a string points to the image - it can be a path relative to the `wwwroot` folder, or an absolute URL.

* **Raster image sprite** - the `SpriteClass` parameter lets you provide the classes from your site's stylesheet that produce the desired appearance and background positions for your sprites.

>caption Render a standalone icon through the TelerikIcon component

````CSHTML
<TelerikIcon Icon="audio" /> @* will render the audio note icon *@

<TelerikIcon IconClass="oi oi-home" /> @* home icon from OpenIconic, assuming you have loaded the font on the page, you can use your own CSS classes and font icon fonts *@

<TelerikIcon ImageUrl="https://docs.telerik.com/blazor-ui/images/snowboarding.png" /> @* an image by URL, renders an actual <img /> tag *@
````

>caption The result from the snippet above

![](images/standalone-font-icons.png)

### Icon Parameters - Order of Precedence

The priority order of the Icon properties, if more than one is defined, is:

1. `ImageUrl`
2. `Icon`
3. `IconClass`
4. `SpriteClass`

This order applies to other components that expose the same parameters, such as the TelerikButton or the grid command buttons.

## Icon in Telerik Component

Some Telerik components expose icon features out-of-the box. These parameters match the `TelerikIcon` component described above.

>caption How to use a built-in font icon class on a component's Icon property

````CSHTML
<TelerikButton Icon="filter">I show the Filter icon</TelerikButton>
````

>caption The result from the code snippet above

![](images/telerik-button-with-icon.png)

## Icons List

This section lists the avaialble font icons that come with the Telerik UI for Blazor themes. 

Each icon is accompanied by its name that you can use in the Telerik Blazor components where a Telerik `Icon` parameter is available.


<div id="iconListContainer">

    <script src="scripts/scoped-plugin.js"></script>
    
    <style scoped>
    </style>
    
    <style scoped>
        ul.WebComponentsIcons > li:before {
            content: none !important;
        }
    
        ul.WebComponentsIcons > li {
            line-height: 15px;
            list-style-type: none;
            line-height: 15px;
        }
        
        ul.WebComponentsIcons .k-icon {
            display: block;
            clear: both;
            margin: 0 auto 10px;
            color: #656565;
            font-size: 32px;
        }
    </style>
        
    <ul id="IconsList" class="WebComponentsIcons">
        <li>Please wait, the list of icons is loading and rendering...</li>
    </ul>
    
    <p id="iconsLoadFail" style="display:none;">The Icon list failed to load. You can see the available icons in the <a href="https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web#list-of-font-icons">Kendo UI Font Icons</a> article. To use them with UI for Blazor, remove the <code>k-i-</code> prefix.</p>

</div>

<script>
    function scopeLatestTheme() {
        var latestThemeUrl = "https://unpkg.com/@progress/kendo-theme-default@latest/dist/all.css";

        $.ajax({
            url: latestThemeUrl,
            dataType: "text/css",
            success: function (data, extStatus, jqXHR) {
                console.log("fetching the themes changed, the icons list needs to be fixed, please open an issue if you see this");
                showFallbackInfo();
            },
            error: function (data, extStatus, jqXHR) {
                if (extStatus == "parsererror") { // we expect parsing the styles to fail
                    document.querySelector("#iconListContainer style").innerHTML = data.responseText;
                }
            },
        });
    }

    function renderIconsList() {
        scopeLatestTheme();

        var iconsListJson = "https://raw.githubusercontent.com/telerik/kendo-icons/develop/src/icons/icons-list.json?token=ABL26UZCFI62VK2U3EVSJZLAEALVM";
       
        $.getJSON(iconsListJson, function (data) {

            var iconsList = data.list;
            var iconsToRender = [];
            
            $.each(iconsList, function (index, iconName) {
                if (iconName != null) {
                    iconsToRender.push(`<li><span class="k-icon k-i-${iconName}"></span>${iconName}</li>`)
                }
            });

            $("#IconsList").html(iconsToRender.join(""));
        })
        .fail(showFallbackInfo);
    }
    
    function showFallbackInfo(){
        document.querySelector("#iconListContainer #iconsLoadFail").style.display = "";
        document.querySelector("#iconListContainer #IconsList").style.display = "none";
    }

    window.addEventListener("load", function () {
        setTimeout(function () {
            try {
                renderIconsList();
            } catch (e) {
                showFallbackInfo();
            }
        }, 1500); 
    });
</script>



## See Also

  * [Kendo UI Web Font Icons Library](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web)
  * [Live Demos](https://demos.telerik.com/blazor-ui/)
