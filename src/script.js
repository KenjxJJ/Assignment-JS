// Blog Page
//  window.addEventListener('load', () => {
const category = document.querySelector(".category");
const title = document.querySelector(".title");
const date = document.querySelector(".date");
const contentText = document.querySelector(".text");

// articles

let articles = [
  {
    id: 1,
    category: "Technology",
    title: "Introduction to Web Development",
    date: "01/10/20",
    text: `In this course, you will learn the fundamentals of web development.`,
  },
  {
    id: 2,
    category: "Life",
    title: "Work from Home",
    date: "23/09/20",
    text: "Are you suffering from a job loss? Here is my advice.",
  },
  {
    id: 3,
    category: "Life",
    title: "Work from Home",
    date: "23/09/20",
    text: "Are you suffering from a job loss? Here is my advice.",
  },
  {
    id: 4,
    category: "Technology",
    title: "Introduction to Web Development",
    date: "01/10/20",
    text: `In this course, you will learn the fundamentals of web development.`,
  }
];

// List articles or none

function displayArticles(articles) {
  let articleDiv = document.querySelector(".article-section");
  articleDiv.innerHTML = articles.map(
    (article) => `<article class="blog">
            <strong class="category">${article.category}</strong>
            <h2 class="title">#<span id="id">${article.id}</span> - ${article.title}</h2>
            <div class="date">${article.date}</div>
            <p class="editable">${article.text}</p>
            <a href="#" class="stretched-link">Read More...</a>
            <div class="modify-btns">
              <button class="btn btn-edit">Edit</button>
              <button class="btn btn-delete">Delete</button>
            </div>
          </article>
          `
  )
    .join("\n");
}

displayArticles(articles);

const addArticle = () => {
  const addArticle = document.querySelector(".add-article");

  // create form dynamically
  addArticle.innerHTML = `<form class="new-article">
   <label for="inputCategory">Category :</label>
   <input type="text" id="inputCategory" class="form-control"
   placeholder="Category" required autofocus>
   <label for="inputTitle">Title :</label>
   <textarea id="inputTitle" required></textarea>
   <label for="inputDate">Date :</label>
   <input type="date" id="inputDate"
   class="form-control" placeholder="Date" required>
   <label for="inputText">Text :</label>
   <textarea id="inputText"></textarea>
   <input type="submit" id="save" value="Save"/>
   </form>`;

  document.querySelector(".new-article").addEventListener("submit", (e) => {
    e.preventDefault();
    articles = readValues(articles);
    displayArticles(articles);
  });
};

document.querySelector(".btn-add").addEventListener("click", addArticle);

// Obtain form values
const readValues = (articles) => {
  const category = document.querySelector("#inputCategory").value;
  const date = document.querySelector("#inputDate").value;
  const title = document.querySelector("#inputTitle").value;
  const text = document.querySelector("#inputText").value;
  articles.push({ category, date, title, text });
  return articles;
};

const editBlog = (article) => {
  let editCategory, editTitle, editDate, editText = '';

  const blogItems = document.querySelector('.blog').children;

  editCategory = blogItems[0].textContent;
  editTitle = blogItems[1].textContent;
  editDate = blogItems[2].textContent;
  editText = blogItems[3].textContent;

  editDate = new Date(editDate).toISOString().slice(0, 10);

  // Create and insert a form for editing...

  document.querySelector(".article-section").innerHTML =
    `<form id="edit-text">    
    <label for="inputCategory">Category :</label>
    <input type="text" id="inputCategory" 
    value=${editCategory} class="edit form-control" required/>
    <label for="inputTitle">Title : </label>
    <textarea class="edit form-control" id="inputTitle" required/>${editTitle}</textarea>
    <label for="inputDate">Date:</label>
    <input type="date" class="edit form-control" id="inputDate" 
    value=${editDate} required/>
    <label for="inputText">Text:</label>
    <textarea class="edit">${editText}</textarea>  
        <button type="submit" id="#save">Save</button>
    </form>
    `;

  // Attach submit event listening on the newly placed form

  document.querySelector("#edit-text").addEventListener("submit", (e) => {
    e.preventDefault();
    //read newly edited text
    const editedCategory = document.querySelector("#inputCategory").value;
    const editedTitle = document.querySelector("#inputTitle").value;
    const editedDate = document.querySelector("#inputDate").value;
    const editedText = document.querySelector(".edit").value;
    const newArticle = { editedCategory, editedTitle, editedDate, editedText };
    const newArticleInPlace = replaceWithEditedText(article, newArticle);
        replaceAll(newArticleInPlace, articles);
  });
}

const replaceWithEditedText = (article, newArticle) => {
  article.text = newArticle.editedText;
  article.category = newArticle.editedCategory;
  article.title = newArticle.editedTitle;
  article.date = newArticle.editedDate;
  return article;
};

const replaceAll = (newArticle, articles) => {
  document
    .querySelector(".article-section")
    .removeChild(document.querySelector("#edit-text"));
let articleNumber = articles.findIndex( article => article === newArticle)
    //replace the old article with the new one using an index from the original array     
if( articleNumber !== -1) articles[articleNumber]= newArticle;
 displayArticles(articles);
};


for (let elem of document.querySelectorAll(".blog")) {
  (elem.querySelector(".btn-edit")).addEventListener("click", (e) => {
    
   let id =  +elem.querySelector('#id').textContent;
    articleSelected =  articles.find( article => article.id === id );
    editBlog(articleSelected);
    e.stopPropagation();
    
  });

}
// Implement delete functionality

const deleteArticle = (elem, articles) => {
  let final = articles.filter(art => {
    return art.id !== +(elem.querySelector("#id").textContent);
  });

  document.querySelector(".article-section").
    removeChild(elem);
    // console.log(final);
}

for (let elem of document.querySelectorAll(".blog")) {
  (elem.querySelector(".btn-delete")).addEventListener("click", (e) => {
    deleteArticle(elem, articles);
    e.stopPropagation();
    
  });

}