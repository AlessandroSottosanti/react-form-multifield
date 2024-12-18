import { useState, useEffect } from 'react';



// TODO: USE EFFECT() DOVRÀ ESSERE INIZIALIZZATO PER IMPOSTARE LO STATO CON LE CHECKBOX 
// ANZICHÉ CON LA SELECT E RESTITUIRE UN MESSAGGIO CON UN ALERT CHE AVVERTE DELLO STATO DEL POST

function App() {

  const initialPost = {
    authorPost: "",
    titlePost: "",
    contentPost: "",
    statePost: "",
    imagePost: "",
    categoryPost: "",
    tagsPost: [],
  }

  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState(initialPost); // object

  // const [filteredPosts, setFilteredPosts] = useState(posts);

  const [search, setSearch] = useState("");

  // useEffect(() => {
  //   const newFilteredPosts = posts.filter((post) => post.title.includes(search));
  //   setFilteredPosts(newFilteredPosts);
  // }, [search, posts]);



  // Salva post
  const handleNewPostSubmit = (event) => {
    event.preventDefault();

    // 1 creo l'oggetto della nuov post
    const newPost = {
      ...formData,
      id: Date.now(),
    };

    // 2 creo la copia dell'array menu precedente, aggiungendo la nuova pizza
    const newArray = [...posts, newPost];

    // 3. aggiorno lo stato del menu
    setPosts(newArray);

    // 4. Ripulisco i campi del form
    setFormData(initialPost);

  };

  const handleInputChange = (event) => {
    const keyToChange = event.target.name;
    // Se l'input è checkbox,
    //    allora il value da inserire sarà true o false, preso da target.checked
    let newValue;

    if (event.target.type === "checkbox") {
      newValue = event.target.checked;
    } else {
      newValue = event.target.value;
    }

    const newData = {
      ...formData,
      [keyToChange]: newValue,
    };

    setFormData(newData);
  };


  // Elimina post
  const handleDelete = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  }


  function capitalizeWords(str) {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
  

console.log("post:", posts);


  return (
    <>
      {/* Form posts */}
      <form onSubmit={handleNewPostSubmit}>
        <div className='container m-5 d-flex flex-column gap-3'>
          <h2>Inserisci un nuovo post</h2>
          <label htmlFor="authorPost">Autore Post</label>
          <input className='form-control' name='authorPost' type="text" id='authorPost' value={formData.authorPost} onChange={handleInputChange} />

          <label htmlFor="titlePost">Titolo post</label>
          <input className='form-control' name='titlePost' type="text" id='titlePost' value={formData.titlePost} onChange={handleInputChange} />

          <label htmlFor='contentPost'>Contenuto post</label>
          <textarea className='form-control' name='contentPost' type="text-area" id='contentPost' value={formData.contentPost} onChange={handleInputChange} />

          <select className="form-select" name='statePost' aria-label="Default select example" value={formData.statePost} onChange={handleInputChange}>
            <option value="" disabled >Stato del post</option>
            <option value="published">Pubblicato</option>
            <option value="draft">Bozza</option>
          </select>

          <select className="form-select" name='categoryPost' aria-label="Default select example" value={formData.categoryPost} onChange={handleInputChange}>
            <option value="" disabled >Categoria del post</option>
            <option value="it">IT</option>
            <option value="economy">Economy</option>
            <option value="news">News</option>
          </select>

          <label htmlFor='contentPost'>Url immagine del post</label>
          <input className='form-control' type="url" id='imagePost' name='imagePost' value={formData.imagePost} onChange={handleInputChange}/>

          <div className="d-flex gap-3">
            <button type='submit' className={`btn btn-success ${(!formData.authorPost || !formData.titlePost || !formData.contentPost || !formData.statePost || !formData.categoryPost || !formData.imagePost) && 'disabled' }`}>Salva</button>
            <button type='clear' className='btn btn-danger'>Cancella</button>
          </div>


        </div>
      </form>

      {/* Lista posts */}
      <div className="container m-5 d-flex flex-column gap-3">
{/* 
        <div className="my-4">
          <h2>Filtra i task</h2>
          <input
          className='form-control'
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div> */}

        <h2>Elenco post</h2>
        {posts.length > 0 ?

          (posts.map((curPost) => (
            curPost.statePost === "published" &&
            <div className="card" key={curPost.id}>
              <div className="card-header d-flex justify-content-between align-items-center">
                <h2>{curPost.titlePost}</h2>
                <span>{curPost.authorPost}</span>
                <button onClick={() => handleDelete(curPost.id)} className='btn btn-danger'>Delete</button>
              </div>
              <div className="card-body d-flex flex-column justify-content-center my-5 gap-3">
                <div className='d-flex justify-content-center'><img src={curPost.imagePost} alt="" /></div>
                <h4>Categoria post: {capitalizeWords(curPost.categoryPost)}</h4>
                <p>{curPost.contentPost}</p></div>
            </div>
          )))

          :
          (
            <div className="card">
              <div className="card-body">Nessun post presente.</div>
            </div>
          )

        }
      </div>

    </>
  )
}

export default App
