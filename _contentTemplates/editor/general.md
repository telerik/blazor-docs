#app-must-sanitize-content
The application must sanitize the content before passing it to the editor and, optionally, before saving it to its storage after obtaining it from the editor. It is up to the application to ensure there is no malicious content (such as input sanitization, XSS attack prevention and other security concerns).
#end

#content-size-signalr
Content in the editor can become very large. For example, the user may have pasted an entire document, or pasted content has an image that will get converted to its `base64` representation that is rather large. With a server-side Blazor application, large content can cause the SignalR connection to drop because the content might exceed its limit. To cater for such cases, you may need to increase that packet limit. You can do that with a line similar to this:


**C#**

    services.AddServerSideBlazor().AddHubOptions(o =>
    {
        o.MaximumReceiveMessageSize = 4 * 1024 * 1024; // 4MB
    });

#end