
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';

//import './App.css';

const App = () => {


  const customStyle = {
    backgroundColor: '#ccc'
  }

  const [url] = useState("https://jsonplaceholder.typicode.com");
  const [users, setUsers] = useState(null);
  const [posts, setPosts] = useState(null);

  const newMessage = (icon, message) => {
    Swal.fire({
      icon: icon || 'success',
      text: message || 'Any fool can use a computer'
    })
  }

  const newResponseMessage = (icon, message) => {
    switch (icon) {
      case 'success':
        toast.success(message);
        break;

      case 'warning':
        toast.warning(message);
        break;

      case 'info':
        toast.info(message);
        break;

      case 'error':
        toast.error(message);
        break;
    }
  }

  const getData = (url, options = { 'Content-Type': 'application/json' }) => {
    fetch(url, options) // GET (default), POST, PUT, DELETE etc.
      .then((response) => {
        console.log(response);
        return response.json()
      })
      .then((info) => {
        console.log(info)

        if (Array.isArray(info)) {
          setUsers(info)
          //newMessage('success', 'Usuarios cargados con exito!.');
          newResponseMessage('success', 'Usuarios cargados con exito!.');
        } else {
          //newMessage('error', 'Error al intentar buscar usuarios!.');
          newResponseMessage('error', 'Error al intentar buscar usuarios!.');
        }

      })
      .catch((error) => {
        newMessage('error', error.message);
      })
  }

  const getAsyncData = async (url, options = { 'Content-Type': 'application/json' }) => {
    try {
      const response = await fetch(url, options); // return una promise
      console.log(response);

      const info = await response.json();
      console.log(info);

      if (Array.isArray(info)) {
        setPosts(info)
        //newMessage('success', 'Usuarios cargados con exito!.');
        newResponseMessage('success', 'Posts cargados con exito!.');
      } else {
        //newMessage('error', 'Error al intentar buscar usuarios!.');
        newResponseMessage('error', 'Error al intentar buscar posts!.');
      }

    } catch (error) {
      newMessage('error', error.message);
    }
  }

  useEffect(() => {
    getData(`${url}/users`);
    getAsyncData(`${url}/posts`);
  }, [])

  return (
    <>
      <h1>Fetching React</h1>
      <ul className='list-group'>
        {
          !!users && users.length > 0 && users.map((item) => {
            return <li className="list-group-item" key={item.id}>{item.name}</li>
          })
        }
      </ul>

      <ul className='list-group' style={customStyle}>
        {
          !!posts && posts.length > 0 && posts.map((item) => {
            return <li className="list-group-item" key={item.id}>{item.title}</li>
          })
        }
      </ul>

      <ToastContainer className="dark" />
    </>
  )
}

export default App;
