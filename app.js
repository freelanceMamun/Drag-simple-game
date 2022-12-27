const draggable_list = document.getElementById('draggable_list')
const checkBtn = document.getElementById('check-list')

const richestPeople = [
  'Jeff Bezos',
  'Bill Gates',
  'Warren Buffett',
  'Bernard Arnault',
  'Carlos Slim Helu',
  'Amancio Ortega',
  'Larry Ellison',
  'Mark Zuckerberg',
  'Michael Bloomberg',
  'Larry Page',
]
const listItems = []

let dragStartIndex

function createList() {
  ;[...richestPeople]
    .map((a) => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .forEach((person, index) => {
      const listItem = document.createElement('li')

      listItem.setAttribute('data-index', index)

      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
          <p class="person-name">${person}</p>
          <i class="fas fa-grip-lines"></i>
        </div>
      `

      listItems.push(listItem)

      draggable_list.appendChild(listItem)
    })
  addEventlisterns()
}
createList()
function dragStart() {
  dragStartIndex = +this.closest('li').getAttribute('data-index')
}

function dragEnter() {
  this.classList.add('over')
}
function dragLeave() {
  this.classList.remove('over')
}

function dragOver(e) {
  e.preventDefault()
}
function dragDrop() {
  const DragEndIndex = +this.getAttribute('data-index')
  swapItems(dragStartIndex, DragEndIndex)
  this.classList.remove('over')
}

function swapItems(formIndex, toIndex) {
  const itemOne = listItems[formIndex].querySelector('.draggable')
  const itemTwo = listItems[toIndex].querySelector('.draggable')

  listItems[formIndex].appendChild(itemTwo)
  listItems[toIndex].appendChild(itemOne)
}

function addEventlisterns() {
  const draggable = document.querySelectorAll('.draggable')
  const draggableItems = document.querySelectorAll('#draggable_list li')
  console.log(draggable)
  draggable.forEach((draggable) => {
    draggable.addEventListener('dragstart', dragStart)
  })

  draggableItems.forEach((item) => {
    item.addEventListener('dragover', dragOver)
    item.addEventListener('drop', dragDrop)
    item.addEventListener('dragenter', dragEnter)
    item.addEventListener('dragleave', dragLeave)
  })
}

checkBtn.addEventListener('click', function () {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector('.draggable').innerText.trim()

    if (personName !== richestPeople[index]) {
      listItem.classList.add('wrong')
    } else {
      listItem.classList.remove('wrong')
      listItem.classList.add('right')
    }
  })
})
