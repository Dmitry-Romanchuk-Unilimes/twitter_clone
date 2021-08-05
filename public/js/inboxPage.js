$(document).ready(() => {
  $.get('/api/chats', (data, status, xhr) => {
    if(xhr.status === 400) alert('Could not get char list');
    else outputChatList(data, $('.resultsContainer'));
  })
})
