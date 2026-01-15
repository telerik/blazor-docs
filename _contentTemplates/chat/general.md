#messagecs
    public class Message
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string AuthorId { get; set; } = string.Empty;
        public string AuthorName { get; set; } = string.Empty;
        public string AuthorImageUrl { get; set; } = string.Empty;
        public IEnumerable<FileSelectFileInfo> Files { get; set; } = new List<FileSelectFileInfo>();
        public bool IsDeleted { get; set; }
        public bool IsPinned { get; set; }
        public bool IsTyping { get; set; }
        public string ReplyToId { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public List<string> SuggestedActions { get; set; } = new();
        public string Text { get; set; } = string.Empty;
        public DateTime Timestamp { get; set; } = DateTime.Now;
    }
#end