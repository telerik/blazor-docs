---
title: Paritally Localized Components, Missing Text, Not Translated Text
description: What to do when not all texts in the Telerik components are translated based on the localization
type: troubleshooting
page_title: Not all texts are translated
slug: common-kb-partial-localization
position: 
tags: 
ticketid: 1494633
res_type: kb
---



## Description
I am using [localization]({%slug globalization-localization%}) for my components, but some strings (texts) are not translated. 

For example, the column menu stays in English, or is missing its texts altogether. Or, the filter option messages are not translated. 



Symptoms include:

* Basically, localization is enabled but the messages for Grids (or other components) are not localized.

* Some texts (like button texts, filter operator names and so on) are localized (translated) but others are not.

* Texts are missing altogether (such as the text for one button), while others are present (like the text for the adjacent button).

>caption In this article

<!-- Start Document Outline -->

* [Cause\Possible Cause(s)](#causepossible-causes)
* [Solution](#solution)
* [Notes](#notes)

<!-- End Document Outline -->

## Cause\Possible Cause(s)
The most common reason for such behavior is that the application uses old localization files that do not contain the necessary keys and their translations.

The second most common reason for the problem is that these particular keys are not present in the current translation (localization) even if they are present in the default (English) list.

Depending on the particular service implementation, an empty string or the English text may be returned for such keys that don't have translations.

## Solution
Ensure that all the keys used by the Telerik components are present and translated in your application. 

You can find an up-to-date list of those keys in the `demos` folder of your local installation (both [automated]({%slug installation/msi%}) and the [zip archive]({%slug installation/zip%})) - this is our online demos solution and the `Resources` folder in it contains a few sample localization files. We add the new keys for every release in the default translation file.

## Notes

The Telerik UI for Blazor suite grows rapidly, and we constantly add new features and components, so the localization file receives more and more keys with each release. You may want to review it for changes every time you upgrade the Telerik version or include a new component that you haven't used before.

The following repository contains translations provided by the community. You can use them as base and also contribute your own - both new translations, and updates to older ones that contain new keys. We welcome contributions and pull requests. Repository link: [https://github.com/telerik/blazor-ui-messages](https://github.com/telerik/blazor-ui-messages).

Apart from missing texts, you may occasionally experience an error, similar to this one:

>warning Unhandled exception rendering component: Value cannot be null. (Parameter 'format')

See this knowledge base article for more details on that: [Value cannot be null. (Parameter 'format')]({%slug common-kb-null-value-parameter-format%})
