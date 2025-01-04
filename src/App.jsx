import { useState, useEffect } from 'react';



// TODO: USE EFFECT() DOVRÀ ESSERE INIZIALIZZATO PER IMPOSTARE LO STATO CON LE CHECKBOX 
// ANZICHÉ CON LA SELECT E RESTITUIRE UN MESSAGGIO CON UN ALERT CHE AVVERTE DELLO STATO DEL POST

function App() {

  const initialPost = {
    authorPost: "",
    titlePost: "",
    contentPost: "",
    statePost: false,
    imagePost: "",
    categoryPost: "",
    tagsPost: [],
  }

  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState(initialPost); // object

  const [filteredPosts, setFilteredPosts] = useState(posts);

  const [search, setSearch] = useState("");

  const [state, setState] = useState(false);

   useEffect(() => {
      const newFilteredPosts = posts.filter((post) => post.titlePost.includes(search));
      setFilteredPosts(newFilteredPosts);
   }, [search, posts]);

   useEffect(() => {
    state ? 
      alert("Il post è pubblicato")
      :
      alert("Il post è una bozza")
   }, [state, posts]);

  // Salva post
  const handleNewPostSubmit = (event) => {
    event.preventDefault();

    const newPost = {
      ...formData,
      id: Date.now(),
    };

    const newArray = [...posts, newPost];

    setPosts(newArray);

    setFormData(initialPost);

  };

  const handleInputChange = (event) => {
    const keyToChange = event.target.name;

    let newValue;
    console.log(`tipo di input:  ${event.target.type} ${event.target.checked}`)
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
 console.log(`filteredPosts ${filteredPosts}`);

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

          <div className="form-check">
            <input className="form-check-input" type="checkbox"  checked={formData.statePost} name='statePost' id="statePost" onChange={handleInputChange} />
              <label className="form-check-label" for="statePost">
                Post Pubblico
              </label>
          </div>

          <select className="form-select" name='categoryPost' aria-label="Default select example" value={formData.categoryPost} onChange={handleInputChange}>
            <option value="" disabled >Categoria del post</option>
            <option value="it">IT</option>
            <option value="economy">Economy</option>
            <option value="news">News</option>
          </select>

          <label htmlFor='contentPost'>Url immagine del post</label>
          <input className='form-control' type="url" id='imagePost' name='imagePost' value={formData.imagePost} onChange={handleInputChange} />

          <div className="d-flex gap-3">
            <button type='submit' className={`btn btn-success ${(!formData.authorPost || !formData.titlePost || !formData.contentPost || !formData.categoryPost || !formData.imagePost) && 'disabled'}`}>Salva</button>
            <button type='clear' className='btn btn-danger'>Cancella</button>
          </div>


        </div>
      </form>

      {/* Lista posts */}
      <div className="container m-5 d-flex flex-column gap-3">
        
        <div className="my-4">
          <h2>Filtra i task</h2>
          <input
          className='form-control'
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div> 

        <h2>Elenco post</h2>
        {filteredPosts.length > 0 ?

          (filteredPosts.map((curPost) => (
            curPost.statePost &&
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
