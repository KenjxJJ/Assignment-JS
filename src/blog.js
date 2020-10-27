// Blog Page

function displayArticles() {
  // Obtains articles stored
  const articles = JSON.parse(localStorage.getItem("articles"));
  if (articles == null) {
    localStorage.setItem("articles", JSON.stringify([]));
    return;
  }
  else if (articles.length !== 0) {
    let articleDiv = document.querySelector(".article-section");
    articleDiv.innerHTML = articles.map(
      (article, index) => `<article class="blog">
            <strong class="category">${article.category}</strong>
            <h2 class="title">#<span id="id">${index + 1}</span> - ${article.title}</h2>
            <div class="date">${article.date}</div>
            <p class="text">${article.text}</p>
            <a href="#" class="stretched-link">Read More...</a>
            <div class="modify-btns">
              <button class="btn btn-edit">Edit</button>
              <button class="btn btn-delete">Delete</button>
              </div>
              </article>
              `
    )
      .join("\n");
  } else {
    return;
  }
}

displayArticles();

// Obtain form values
const readValues = () => {
  // get the storage of the articles
  const articles = JSON.parse(localStorage.getItem("articles"));

  const category = document.querySelector("#inputCategory").value;
  const date = document.querySelector("#inputDate").value;
  const title = document.querySelector("#inputTitle").value;
  const text = document.querySelector("#inputText").value;

  articles.push({ category, date, title, text });
  console.log(articles);

  localStorage.setItem("articles", JSON.stringify(articles));

};

const addArticle = () => {
  const addArticle = document.querySelector(".add-article");

  // create form dynamically
  addArticle.innerHTML = `
  <form class="new-article">
        <label for="inputCategory">Category :</label>
        <input type="text" id="inputCategory" class="form-control"
        placeholder="Category" required autofocus>
        <label for="inputTitle">Title :</label>
        <input id="inputTitle" class="form-control" placeholder="Title" required>
        <label for="inputDate">Date :</label>
        <input type="date" id="inputDate"
        class="form-control" placeholder="Date" required>
        <label for="inputText">Text :</label>
        <textarea id="inputText"></textarea>
        <input type="submit" id="save" value="Save"/>
   </form>`;

  document.querySelector(".new-article").addEventListener("submit", (e) => {
    e.preventDefault();
    readValues();
    displayArticles();
    location.reload();
  });
};

document.querySelector(".btn-add").addEventListener("click", () =>{
  addArticle();
  document.querySelector(".btn-add").classList.toggle("disabled");
  document.querySelector(".btn-add").setAttribute( "disabled","");
});


const editBlog = (article, index) => {
  // Get articles first from the storage
  const articles = JSON.parse(localStorage.getItem("articles"));

  let dateReformatted = new Date(article.date).toISOString().slice(0, 10);

  // Create and insert a form for editing...

  document.querySelector(".article-section").innerHTML =
    `<form id="edit-text">    
    <label for="inputCategory">Category :</label>
    <input type="text" id="inputCategory" 
    value=${article.category} class="edit form-control" required/>
    <label for="inputTitle">Title : </label>
    <input class="edit form-control" id="inputTitle" value=${article.title} required/>
    <label for="inputDate">Date:</label>
    <input type="date" class="edit form-control" id="inputDate" 
    value=${dateReformatted} required/>
    <label for="inputText">Text:</label>
    <textarea class="edit" id="inputText">${article.text}</textarea>  
        <button type="submit" id="#save">Save</button>
    </form>
    `;

  // Attach submit event listening on the newly placed form

  document.querySelector("#edit-text").addEventListener("submit", (e) => {
    e.preventDefault();
    //read newly edited text
    const category = document.querySelector("#inputCategory").value;
    const title = document.querySelector("#inputTitle").value;
    const date = document.querySelector("#inputDate").value;
    const text = document.querySelector("#inputText").value;
    const newArticle = { category, title, date, text };
    articles[index] = newArticle;

    // Update the records in memory
    localStorage.setItem("articles", JSON.stringify(articles));
    displayArticles();
    location.reload();
  });
}

// Implement edit  functionality

const editFunction =() =>{
const editBtns = document.querySelectorAll(".btn-edit");

editBtns.forEach((editBtn, index) => {
  editBtn.addEventListener('click', () => {
    const articles = JSON.parse(localStorage.getItem("articles"));
    editBlog(articles[index], index);
  });
});
}

// Implement delete functionality

const deleteBlog = () => {
  const delBtns = document.querySelectorAll(".btn-delete");
  delBtns.forEach((delBtn, index) => {
    delBtn.addEventListener('click', () => {
      const articles = JSON.parse(localStorage.getItem("articles"));
      articles.splice(index, 1);
      localStorage.setItem("articles", JSON.stringify(articles));
      location.reload();
    });
  });

}

editFunction();
deleteBlog();