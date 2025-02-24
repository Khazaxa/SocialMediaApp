namespace Domain.Comments.Dto;

public record CommentParams(
    int PostId,
    string Content
);