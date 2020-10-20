// Blog Page

const category = document.querySelector(".category");
const title = document.querySelector(".title");
const date = document.querySelector(".date");
const contentText = document.querySelector(".text");

// articles

let articles = [
  {
    category: "Technology",
    title: "Introduction to Web Development",
    date: "01/10/20",
    text: `In this course, you will learn the fundamentals of web development.`,
  },
  // {
  //   category: "Life",
  //   title: "Work from Home",
  //   date: "23/09/20",
  //   text: "Are you suffering from a job loss? Here is my advice.",
  // }
];

// List articles or none

const displayArticles = (articles) => {
  const articleDiv = document.querySelector(".article-section");
  articleDiv.innerHTML = articles
    .map(
      (article) =>
        `<article class="blog">
            <strong class="">${article.category}</strong>
            <h2 class="">${article.title}</h2>
            <div class="">${article.date}</div>
            <p class="">${article.text}</p>
            <a href="#" class="stretched-link">Read More...</a>
            <div class="modify-btns">
              <button class="btn btn-edit">Edit</button>
              <button class="btn btn-delete">Delete</button>
            </div>
          </article>
          `
    )
    .join("\n");
};

displayArticles(articles);

const addArticle = () => {
  const addArticle = document.querySelector(".add-article");

  // create form dynamically
  addArticle.innerHTML = `<form class="new-article">
   <label for="inputCategory">Category :</label>
   <input type="text" id="inputCategory" class="form-control"
   placeholder="Category" required autofocus>
   <label for="inputTitle">Title :</label>
   <input type="text" id="inputTitle" placeholder="Title" required/>
   <label for="inputDate">Date :</label>
   <input type="date" id="inputDate"
   class="form-control" placeholder="Date" required>
   <label for="inputText">Text :</label>
   <textarea id="inputText"></textarea>
   <input type="submit" id="save" value="Save"/>
   </form>`;

     document.querySelector(".new-article").addEventListener(
         "submit", (e)=>{ e.preventDefault()
          articles = readValues(articles);
          displayArticles(articles);          
        }
         );
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
}

  