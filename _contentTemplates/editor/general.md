#app-must-sanitize-content

The application must sanitize the content before passing it to the editor and, optionally, before saving it to its storage after obtaining it from the editor. It is up to the application to ensure there is no malicious content (such as input sanitization, XSS attack prevention and other security concerns).

#end

#content-size-signalr

This section applies only to Blazor **Server** apps. Blazor **WebAssembly** apps do not require additional configuration for the Editor to work with large content.

Blazor **Server** apps use the **SignalR WebSocket** to send the Editor `Value` from the browser to the server .NET runtime and vice-versa. The default SignalR maximum message size is **32 KB**. To work with larger content (especially paste images as Base64 strings), [increase the max WebSocket message size for the Blazor application]({%slug common-kb-increase-signalr-max-message-size%}).

#end
