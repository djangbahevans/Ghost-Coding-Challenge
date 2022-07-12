(() => {
  const author = window.prompt('Please enter your name', 'Thor Odinson');
  const submitButton = document.querySelector('.search-section button.btn');
  const input = document.querySelector('.search-section input');
  const commentSection = document.querySelector('.comments-section');

  const getDuration = (startTime) => {
    const duration = moment.duration(moment(startTime).diff(moment()));
    return duration.humanize(true);
  };

  const addComment = ({ text, author, time, image }) => {
    const friendlyTime = getDuration(time);
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
              <a href="#" class="upvote-btn comment-btn">▲ Upvote</a>
              <a href="#" role="button" class="reply-btn comment-btn">Reply</a>
            </div>
          </div>
        </div>
    `;

    commentSection.insertAdjacentHTML('afterbegin', comment);
    document.querySelector('.comment-details .time').time = time;
  };

  submitButton.addEventListener('click', () => {
    const comment = input.value;

    input.value = '';
    const image = '/avatar.jpg';
    addComment({ text: comment, author, image, time: new Date() });
  });

  setInterval(() => {
    const times = document.querySelectorAll('.comment-details .time');
    times.forEach((p) => {
      p.innerText = getDuration(p.time);
    });
  }, 1000);
})();
