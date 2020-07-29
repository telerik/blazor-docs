#async-events-link
>tip The grid events can be async. The example below shows synchronous versions for brevity. You can find the async signatures in the [CRUD Operations Overview](overview) article.
#end


#rowclick-args

The `GridRowClickEventArgs` class exposes an `EventArgs` property. It maps to `MouseEventArgs` or `KeyboardEventArgs` depending on the user's action (clicking the row with the mouse/tapping it on a touch device, or pressing `Enter` when the row is focused). You can use the event arguments to determine the keyboard key or the position of the mouse cursor when the user took an action.

#end

#rowclick-args-example

        if (args.EventArgs is KeyboardEventArgs keyboardEventArgs)
        {
            Console.WriteLine($"The user clicked {keyboardEventArgs.Key} on row {model.Name}");
        }
        else if (args.EventArgs is MouseEventArgs mouseEventArgs)
        {
            Console.WriteLine($"The user clicked {mouseEventArgs.ClientX} {mouseEventArgs.ClientY} on row {model.Name}");
        }

#end



