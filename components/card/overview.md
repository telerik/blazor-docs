---
title: Overview
page_title: Card Overview
description: Overview of the Card for Blazor.
slug: card-overview
tags: telerik,blazor,card,overview
published: True
position: 0
---

In this article:

* Overview
* Card elements

# Card Overview

bafcj

#### To use a Telerik Card for Blazor

1. add the `TelerikCard` tag
1. add the desired [Card Elements](#card-elements)


## Card Elements

* `CardHeader` - renders header area, useful for title, subtitle, etc.

* `CardImage` - renders card image to fill the size of the card.

* `CardBody` - renders the body of the card with added paddings.

* `CardFooter` -  renders footer area separated from the content through separator

* `CardActions` - renders dedicated area for actions. You could place any action buttons inside and style them with the predefined orientation and layout of the buttons.

* `CardSeparator` - renders a horizontal line. It could be used it as a standalone building block, or inside any of the above blocks. When used as nested component, it will be rendered in accordance to any margin applied to the content.

* `CardTitle` - renders div title with default theme styling.

* `CardSubTitle` - renders div title with default theme styling as sub title.

## Features

>caption The Card provides the following features:

* `Width` - string - defines width of the component

* `Class` - string - the CSS class that will be rendered on the main wrapping element of the Card.

* `Orientation` - `CardOrientation` - defines the orientation of the card. Takese a member of the `Telerik.Blazor.CardOrientation` enum:
    * `Horizontal`
    * `Vertical`

* `ThemeColor` - string - defines the `ThemeColor` of the component. We support predefined theme colors such as info, error, success (members of the `Telerik.Blazor.ThemeColors` class).

* `ChildContent` - `RenderFragment` - defines the child content of the component.



## See Also

  * [Data Binding]({%slug autocomplete-databind%})
  * [Live Demo: Card](https://demos.telerik.com/blazor-ui/..........)
  * [Live Demo: AutoComplete Validation](https://demos.telerik.com/blazor-ui/autocomplete/validation)
  * [API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikAutoComplete-1)
