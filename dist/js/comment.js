async function commentFormHandler(event) {
    event.preventDefault();

    const comment_text = document.querySelector('textarea["comment"]').value.trim();

    const review_id = window.location.toString().split('/')[window.location.toString().split('/').length -1];

    if (comment_text) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                review_id,
                comment_text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);