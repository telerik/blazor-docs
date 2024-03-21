#define-in-teleriklayout

1. Create a new layout file in the app, for example, `TelerikLayout.razor`.
1. Place the new layout in the same folder as the default application layout `MainLayout.razor`.
1. Add a `<TelerikRootComponent>` tag to the new layout and set `@Body` as the root component's child content.
1. Make the new layout a parent of the default application layout.

>caption Adding TelerikRootComponent to a new layout

<div class="skip-repl"></div>

````TelerikLayout.razor
@inherits LayoutComponentBase

<TelerikRootComponent>
    @Body
</TelerikRootComponent>
````
````MainLayout.razor
@inherits LayoutComponentBase
@layout TelerikLayout

@* The other MainLayout.razor content remains the same. *@
````

#end
