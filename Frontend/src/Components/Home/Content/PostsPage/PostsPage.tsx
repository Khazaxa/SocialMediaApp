import { useState, useEffect } from "react";
import styles from "./PostsPage.module.scss";
import api from "../../../../ApiConfig/ApiConfig";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Notifications from "../../../Notifications/Notifications";

interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  author: string;
}

interface Comment {
  id: number;
  content: string;
  author: string;
  authorId: number;
  postId: number;
}

export function PostsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [postReadMore, setPostReadMore] = useState<{
    [key: number]: boolean;
  }>({});
  const [commentReadMore, setCommentReadMore] = useState<{
    [key: number]: boolean;
  }>({});
  const [visibleComments, setVisibleComments] = useState<{
    [key: number]: boolean;
  }>({});
  const [postTitle, setPostTitle] = useState<string>("");
  const [postContent, setPostContent] = useState<string>("");
  const [postId, setPostId] = useState<number | null>(null);
  const [commentContent, setCommentContent] = useState<string>("");
  const [visibleCommentMenu, setVisibleCommentMenu] = useState<number | null>(
    null
  );
  const addPostFormView = location.state?.addPostFormView || false;
  const removeCheckboxesPosts = location.state?.removeCheckboxesPosts || false;
  const [commentFormView, setCommentFormView] = useState<{
    [key: number]: boolean;
  }>({});
  const userIdLocal = localStorage.getItem("userId");
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<
    "success" | "error" | "warning" | null
  >(null);
  const notificationDelay = () => {
    setTimeout(() => {
      setMessage("");
      setMessageType(null);
    }, 3000);
  };

  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search")?.toLowerCase() || "";
  const filterOption = searchParams.get("filter") || "name";

  const filteredPosts = posts.filter((post) => {
    if (filterOption === "name") {
      return post.title.toLowerCase().includes(searchTerm);
    } else if (filterOption === "user") {
      return post.author.toLowerCase().includes(searchTerm);
    } else if (filterOption === "id") {
      return post.id.toString().includes(searchTerm);
    }
    return false;
  });

  const toggleCommentMenu = (commentId: number) => {
    setVisibleCommentMenu((prev) => (prev === commentId ? null : commentId));
  };

  const fetchPosts = async () => {
    const response = await api.get("/posts");
    setPosts(response.data);
  };

  const fetchComments = async () => {
    const response = await api.get("/comments");
    setComments(response.data);
  };

  useEffect(() => {
    fetchPosts();
    fetchComments();
  }, []);

  useEffect(() => {
    if (!addPostFormView) {
      setPostTitle("");
      setPostContent("");
    }
  }, [addPostFormView]);

  useEffect(() => {
    if (!removeCheckboxesPosts) {
      setCheckedItems([]);
    }
  }, [removeCheckboxesPosts]);

  useEffect(() => {
    if (postId !== null && !commentFormView[postId]) {
      setCommentContent("");
    }
  }, [postId, commentFormView]);

  const removePost = async () => {
    try {
      for (const id of checkedItems) {
        await api.delete(`/post/${id}`);
        navigate("/posts", { state: { removeCheckboxesPosts: false } });
        fetchPosts();
      }

      setMessage("Post(s) removed successfully!");
      setMessageType("success");
      notificationDelay();
    } catch (error) {
      setMessage("Error removing post(s)!\n\n" + error);
      setMessageType("error");
      notificationDelay();
    }
  };

  const handleRemoveItemClick = (id: number) => {
    if (!removeCheckboxesPosts) {
      return;
    }

    setCheckedItems((prevCheckedItems) =>
      prevCheckedItems.includes(id)
        ? prevCheckedItems.filter((item) => item !== id)
        : [...prevCheckedItems, id]
    );
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = event.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleAddPost = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      await api.post("/post", { title: postTitle, content: postContent });
      setPostTitle("");
      setPostContent("");
      navigate("/posts", { state: { addPostFormView: false } });
      fetchPosts();

      setMessage("Post added successfully!");
      setMessageType("success");
      notificationDelay();
    } catch (error) {
      setMessage("Error adding post: " + error);
      setMessageType("error");
      notificationDelay();
    }
  };

  const readMorePost = (id: number) => {
    setPostReadMore((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const readMoreComment = (id: number) => {
    setCommentReadMore((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleShowCommentForm = (postId: number) => async () => {
    toggleCommentMenu(0);
    setCommentFormView((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (postId !== null) {
      await api.post("/comment", { content: commentContent, postId: postId });
      fetchComments();
      setCommentContent("");
      setCommentFormView((prevState) => ({
        ...prevState,
        [postId]: !prevState[postId],
      }));
      setPostId(null);
      setMessage("Comment added successfully!");
      setMessageType("success");
      notificationDelay();
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await api.delete(`/comment/${commentId}`);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
      setMessage("Comment deleted successfully!");
      setMessageType("success");
      notificationDelay();
    } catch (error) {
      setMessage("Error deleting comment: " + error);
      setMessageType("error");
      notificationDelay();
    }
  };

  const handleShowMoreComents = (postId: number) => {
    toggleCommentMenu(0);
    setVisibleComments((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };

  return (
    <div className={styles.postsPage}>
      <Notifications messageType={messageType} message={message} />

      {removeCheckboxesPosts ? (
        <button
          className={styles.removeBtn}
          onClick={removePost}
          disabled={checkedItems.length === 0}
        >
          Remove
        </button>
      ) : (
        true
      )}

      <div id={styles.formContainer}>
        <form
          className={addPostFormView ? styles.showForm : styles.hideForm}
          onSubmit={handleAddPost}
        >
          <button
            className={styles.closeFormBtn}
            type="button"
            onClick={() =>
              navigate("/posts", { state: { addPostFormView: false } })
            }
          >
            X
          </button>

          <p>Post title:</p>

          <textarea
            className={styles.postTitleInput}
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            required
          />

          <p>Post content:</p>

          <textarea
            className={styles.postContentInput}
            value={postContent}
            onChange={(e) => {
              setPostContent(e.target.value);
              handleInputChange(e);
            }}
            required
          ></textarea>

          <button className={styles.submitFormBtn} type="submit">
            Add post
          </button>
        </form>
      </div>

      <div className={styles.postsList}>
        {filteredPosts.map((post) => (
          <div
            className={styles.postCard}
            key={post.id}
            onClick={
              removeCheckboxesPosts && post.authorId === Number(userIdLocal)
                ? () => handleRemoveItemClick(post.id)
                : undefined
            }
          >
            {removeCheckboxesPosts && post.authorId === Number(userIdLocal) ? (
              <input
                key={post.id}
                type="checkbox"
                className={styles.checkboxes}
                checked={checkedItems.includes(post.id)}
                readOnly
              />
            ) : (
              true
            )}

            <div className={styles.postTitle}>
              <span>
                {post.title}
                <span className={styles.author}> by {post.author}</span>
              </span>
            </div>
            <hr />
            <div className={styles.postContent}>
              {!postReadMore[post.id] ? (
                post.content.length > 200 ? (
                  <span>
                    {post.content.slice(0, 200)} ...
                    <span
                      className={styles.readMoreBtn}
                      onClick={() => readMorePost(post.id)}
                    >
                      Show more
                    </span>
                  </span>
                ) : (
                  post.content
                )
              ) : (
                <span>
                  {post.content}
                  <span
                    className={styles.readMoreBtn}
                    onClick={() => readMorePost(post.id)}
                  >
                    Show less
                  </span>
                </span>
              )}
            </div>
            <hr />
            <ul className={styles.commentsList}>
              <li className={styles.commentsCounter}>
                {comments.filter((comment) => comment.postId === post.id)
                  .length > 0 ? (
                  <>
                    Comments (
                    {
                      comments.filter((comment) => comment.postId === post.id)
                        .length
                    }
                    ):
                    {!visibleComments[post.id] ? (
                      comments.filter((comment) => comment.postId === post.id)
                        .length > 2 ? (
                        <span
                          onClick={() => {
                            handleShowMoreComents(post.id);
                          }}
                        >
                          Show more comments
                        </span>
                      ) : (
                        false
                      )
                    ) : comments.filter((comment) => comment.postId === post.id)
                        .length > 2 ? (
                      <span
                        onClick={() => {
                          handleShowMoreComents(post.id);
                        }}
                      >
                        Show less comments
                      </span>
                    ) : (
                      false
                    )}
                  </>
                ) : (
                  false
                )}
              </li>

              {comments.filter((comment) => comment.postId === post.id).length >
              0 ? (
                <>
                  {!visibleComments[post.id] ? (
                    <>
                      {comments
                        .filter((comment) => comment.postId === post.id)
                        .slice(0, 2)
                        .map((comment) => (
                          <li key={comment.content} className={styles.comment}>
                            <div className={styles.commentContent}>
                              <strong>{comment.author}: </strong>
                              {!commentReadMore[comment.id] ? (
                                comment.content.length > 200 ? (
                                  <span>
                                    {comment.content.slice(0, 200)} ...
                                    <span
                                      className={styles.readMoreBtn}
                                      onClick={() =>
                                        readMoreComment(comment.id)
                                      }
                                    >
                                      Show more
                                    </span>
                                  </span>
                                ) : (
                                  comment.content
                                )
                              ) : (
                                <span>
                                  {comment.content}
                                  <span
                                    className={styles.readMoreBtn}
                                    onClick={() => readMoreComment(comment.id)}
                                  >
                                    Show less
                                  </span>
                                </span>
                              )}
                            </div>
                            {comment.authorId === Number(userIdLocal) ? (
                              <div className={styles.commentMenu}>
                                <button
                                  className={styles.menuButton}
                                  onClick={() => toggleCommentMenu(comment.id)}
                                >
                                  &#x22EE;
                                </button>
                                {visibleCommentMenu === comment.id && (
                                  <div className={styles.menuOptions}>
                                    <button
                                      onClick={() =>
                                        handleDeleteComment(comment.id)
                                      }
                                    >
                                      Delete
                                    </button>
                                  </div>
                                )}
                              </div>
                            ) : (
                              false
                            )}
                          </li>
                        ))}
                    </>
                  ) : (
                    <>
                      {comments
                        .filter((comment) => comment.postId === post.id)
                        .map((comment) => (
                          <li key={comment.content} className={styles.comment}>
                            <div className={styles.commentContent}>
                              <strong>{comment.author}: </strong>
                              {!commentReadMore[comment.id] ? (
                                comment.content.length > 200 ? (
                                  <span>
                                    {comment.content.slice(0, 200)} ...
                                    <span
                                      className={styles.readMoreBtn}
                                      onClick={() =>
                                        readMoreComment(comment.id)
                                      }
                                    >
                                      Show more
                                    </span>
                                  </span>
                                ) : (
                                  comment.content
                                )
                              ) : (
                                <span>
                                  {comment.content}
                                  <span
                                    className={styles.readMoreBtn}
                                    onClick={() => readMoreComment(comment.id)}
                                  >
                                    Show less
                                  </span>
                                </span>
                              )}
                            </div>

                            {comment.authorId === Number(userIdLocal) ? (
                              <div className={styles.commentMenu}>
                                <button
                                  className={styles.menuButton}
                                  onClick={() => toggleCommentMenu(comment.id)}
                                >
                                  &#x22EE;
                                </button>
                                {visibleCommentMenu === comment.id && (
                                  <div className={styles.menuOptions}>
                                    <button
                                      onClick={() =>
                                        handleDeleteComment(comment.id)
                                      }
                                    >
                                      Delete
                                    </button>
                                  </div>
                                )}
                              </div>
                            ) : (
                              false
                            )}
                          </li>
                        ))}
                    </>
                  )}
                  <hr />
                </>
              ) : (
                false
              )}
            </ul>
            {commentFormView[post.id] ? (
              <form
                className={styles.addCommentForm}
                onSubmit={handleAddComment}
              >
                <textarea
                  className={styles.commentInput}
                  placeholder="Type comment"
                  onChange={(e) => setCommentContent(e.target.value)}
                  required
                />
                <div className={styles.commentFormBtns}>
                  <button
                    onClick={() => {
                      setPostId(post.id);
                      toggleCommentMenu(0);
                    }}
                    type="submit"
                  >
                    Comment
                  </button>
                  <button onClick={handleShowCommentForm(post.id)}>
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              false
            )}
            {!commentFormView[post.id] ? (
              <button
                className={styles.addCommentBtn}
                onClick={handleShowCommentForm(post.id)}
              >
                Add comment
              </button>
            ) : (
              false
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
