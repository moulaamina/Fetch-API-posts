function getPosts(userId) {
  fetch('https://jsonplaceholder.typicode.com/posts?userId=' + userId)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((posts) => {
      document.getElementById('posts').innerHTML = '';
      for (post of posts) {
        let content = `
        <div id="post">
            <h3>${post.title}</h3>
            <p>${post.body}</p>
          </div>
        `;
        document.getElementById('posts').innerHTML += content;
      }
    });
}

function getUsers() {
  return new Promise((resolve, reject) => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          reject('Error with Users request');
        }
      })
      .then((users) => {
        document.getElementById('users').innerHTML = '';
        for (user of users) {
          let content = `
        <div id="user" onclick="userClicked(${user.id},this)">
            <h4>${user.name}</h4>
            <p>${user.email}</p>
          </div>
        `;
          document.getElementById('users').innerHTML += content;
        }
        resolve();
      });
  });
}

getUsers()
  .then(() => {
    getPosts(2);
  })
  .catch((error) => {
    alert(error);
  });

function userClicked(id, element) {
  getPosts(id);
  let clicked = document.getElementsByClassName('clicked');
  for (el of clicked) {
    el.classList.remove('clicked');
  }
  element.classList.add('clicked');
}
