namespace Domain.Comments.Dto;

public record CommentDto(
    int Id,
    string Content,
    string Author,
    int AuthorId,
    int PostId
);