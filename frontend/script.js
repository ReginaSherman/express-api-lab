const gifs = document.querySelector('.gifs')
const submit = document.getElementById('submit')
const editSubmit = document.getElementById('submit-edit')
const deleteButton = document.getElementById('delete')

// Stores which item to edit/delete when the edit modal is up
let currentlyEditing = ''

function editModal (gif) {
  // Sets the edit modal to have the data from the gif clicked on
  $('#modal-edit').modal('open')
  const nameEdit = document.getElementById('name-edit')
  const urlEdit = document.getElementById('url-edit')

  nameEdit.value = gif.name
  urlEdit.value = gif.url

  currentlyEditing = gif._id
}

function addPictures (gifData) {
  // Adds all of the gifs to the dom
  gifs.innerHTML = ''
  gifData.forEach(gif => {
    if (!gif.url) return

    const imageNode = document.createElement('img')
    imageNode.setAttribute('src', gif.url)
    imageNode.classList.add('gif')

    imageNode.addEventListener('click', () => { editModal(gif) })

    gifs.appendChild(imageNode)
  })
}

function getPictures() {
  axios.get('http://localhost:3000/gifs').then(response => {
  // gets the initial data
  addPictures(response.data)
})
}

editSubmit.addEventListener('click', (e) => {
  // submits the put request to edit a gif
  const name = document.getElementById('name-edit').value
  const url = document.getElementById('url-edit').value

  axios.put(`http://localhost:3000/gifs/${currentlyEditing}`, {
    name,
    url
  }).then((resp) => {
    console.log(resp)
    getPictures()
    $('#modal-edit').modal('close')
  })
})

submit.addEventListener('click', (e) => {
  // submits the post request to create a new picture
  const name = document.getElementById('name').value
  const url = document.getElementById('url').value

  axios.post('http://localhost:3000/gifs', {
    name,
    url
  }).then((resp) => {
    getPictures()
    $('#modal-create').modal('close')
  })
})

deleteButton.addEventListener('click', (e) => {
  // deletes an image
  axios.delete(`http://localhost:3000/gifs/${currentlyEditing}`).then(() => {
    getPictures()
    $('#modal-edit').modal('close')
  })
})

// initializes modal package
$('.modal').modal()
getPictures()
