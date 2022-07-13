(() => {
  const author = window.prompt('Please enter your name', 'Thor Odinson');
  const submitButton = document.querySelector('.search-section button.btn');
  const input = document.querySelector('.search-section input');
  const commentSection = document.querySelector('.comments-section');

  const socket = io();

  const getDuration = (startTime) => {
    const duration = moment.duration(moment(startTime).diff(moment()));
    return duration.humanize(true);
  };

  const addComment = ({ text, author, timestamp, image, id, upvotes }) => {
    const friendlyTime = getDuration(timestamp);
    const comment = `
    <div class="comment">
          <div class="comment-img">
            <img
              src="${image}"
              alt="${author} profile picture"
            />
          </div>
          <div class="comment-details">
            <div class="comment-identity">
              <p class="name">${author}</p>
              <p class="time">・ ${friendlyTime}</p>
            </div>
            <p class="comment-text">${text}</p>
            <div class="comment-buttons">
              <a href="#" class="upvote-btn comment-btn" data-id="${id}">▲ Upvote (${upvotes})</a>
              <a href="#" role="button" class="reply-btn comment-btn">Reply</a>
            </div>
          </div>
        </div>
    `;

    commentSection.insertAdjacentHTML('afterbegin', comment);
    document.querySelector('.comment-details .time').time = timestamp;
    document.querySelector('.comment-details .upvote-btn').addEventListener('click', (e) => {
      e.preventDefault();
      socket.emit('upvote', id);
    })
    document.querySelector('.comment-details .reply-btn').addEventListener('click', (e) => {
      e.preventDefault();
      input.value = `@${author} `;
      input.focus();
    })
  };

  submitButton.addEventListener('click', () => {
    const text = input.value;
    const image = '/avatar.jpg';

    if (text) {
      socket.emit('comment', { text, author, image });
      input.value = '';
    }
  });

  socket.on('comment', (data) => {
    console.log(data);
    addComment(data);
  });

  socket.on("comments", (data) => {
    console.log(data);
    data.forEach(comment => addComment(comment));
  });

  socket.on('upvote', (data) => {
    console.log(data);
    const upvoteBtn = document.querySelector(`.comment-details .upvote-btn[data-id="${data.id}"]`);
    upvoteBtn.innerText = `▲ Upvote (${data.upvotes})`;
  });

  const fetchComments = () => {
    fetch('/comments')
      .then((response) => response.json())
      .then((data) => {
        data.forEach((comment) => {
          addComment(comment);
        });
      });
  }

  // fetchComments();

  setInterval(() => {
    const times = document.querySelectorAll('.comment-details .time');
    times.forEach((p) => {
      p.innerText = getDuration(p.time);
    });
  }, 1000);
})();
