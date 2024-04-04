const commentFormHandler = async (event) => {
    event.preventDefault();
  
    const comment_body = document.querySelector("#comment").value.trim();
  
    console.log("Comment:", comment_body);
   
    if (comment_body) {
      const response = await fetch("/api/comment", {
        method: "POST",
        body: JSON.stringify({ comment_body }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        document.location.replace("/");
      } else {
        alert(response.statusText);
      }
    }
  };
  document.querySelector("#comment-form").addEventListener("submit", commentFormHandler);
  
  const deleteComment = async (event) => {
    event.preventDefault();
  
    const commentID = event.target.dataset.id
   
    if (commentID) {
      const response = await fetch("/api/comment/"+commentID, {
        method: "DELETE",
        // body: JSON.stringify({ comment_ }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
      }
    }
  };
  document.querySelector(".delete").addEventListener("click", deleteComment);