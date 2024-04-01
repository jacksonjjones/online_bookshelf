const search = document.getElementById('search')
const searchBook = document.getElementById('searchBook')
searchBook.addEventListener('click', function () {
    fetch('/api/google/search/'+search.value )
    .then(res => res.json())
    .then(data => {
        console.log(data)
        for (let i = 0; i < data.length; i++) {
        const container = document.createElement('div')
        const title = document.createElement('h2')
        title.innerText = data[i].volumeInfo.title
        container.appendChild(title)
        // const author
        // const thumbnail
        document.getElementById('searchedBooks').appendChild(container)
        
}
})
});
