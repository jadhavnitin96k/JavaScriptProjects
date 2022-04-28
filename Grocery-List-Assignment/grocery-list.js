const form = document.querySelector('#newItemForm');
const input = document.querySelector('#newItemInput');
const itemsList = document.querySelector('#items');
const clearItems = document.querySelector('#clearItems');

form.addEventListener('submit', addItems);

function addItems(e) {
    e.preventDefault();

    const item = input.value.trim();

    //Show error message when input is blank.
    const errorMsg = document.querySelector('#errorMsg');
    if (item == '') {
        errorMsg.innerHTML = 'Please enter the item name.';
        return;
    }
    else {
        errorMsg.innerHTML = '';
    }

    //Create elements
    const itemInList = document.createElement('div');
    const listItemName = document.createElement('input');
    const editItemName = document.createElement('span');
    const deleteItem = document.createElement('span');

    //Add class name to elements
    itemInList.classList.add('item');
    listItemName.classList.add('text');

    //Put value, type, setAttribute to elements
    listItemName.value = item;
    listItemName.type = 'text';
    listItemName.setAttribute('readonly', 'true');

    editItemName.innerHTML = '<i class="fas fa-edit"></i>';
    editItemName.value = true;

    deleteItem.innerHTML = '<i class="fas fa-trash"></i>';

    //Appending order of elements
    itemInList.appendChild(listItemName);
    itemInList.appendChild(editItemName);
    itemInList.appendChild(deleteItem);
    itemsList.appendChild(itemInList);

    input.value = "";

    editItem(editItemName, listItemName);
    removeItem(deleteItem, itemInList);
}

function editItem(editItemName, listItemName) {

    editItemName.addEventListener('click', function () {
        if (editItemName.value === true) {
            listItemName.removeAttribute('readonly');
            editItemName.value = false;
            editItemName.innerHTML = '<i class="fas fa-save"></i>';
        }
        else {
            listItemName.setAttribute('readonly', 'true');
            editItemName.value = true;
            editItemName.innerHTML = '<i class="fas fa-edit"></i>';
        }
    });
}

function removeItem(deleteItem, itemInList) {

    deleteItem.addEventListener('click', function () {
        itemsList.removeChild(itemInList);
    });
}

//Clear all items in list
if (itemsList.innerHTML != '') {
    clearItems.removeAttribute('disabled');
    clearItems.addEventListener('click', function () {
        itemsList.innerHTML = '';
    });
}