function saveToLocalStorage(event) {
    event.preventDefault();
    const expenseamount = event.target.expenseamount.value;
    const description = event.target.description.value;
    const category = event.target.category.value;
    const obj = {
        expenseamount,
        description,
        category
    };

    axios.post("https://crudcrud.com/api/83cef52b09a7478da3d4a3cae897471a/saveData", obj)
        .then((res) => {
            showNewUserOnScreen(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    // localStorage.setItem(obj.description, JSON.stringify(obj));
    // showNewUserOnScreen(obj)
}
window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/83cef52b09a7478da3d4a3cae897471a/saveData")
        .then((res) => {
            console.log(res)
            for (var i = 0; i < res.data.length; i++) {
                showNewUserOnScreen(res.data[i])
            }
        })
        .catch((err) => {
            console.log(err)
        })

    // const localStorageObj = localStorage;
    // const localstoragekeys = Object.keys(localStorageObj)

    // for (var i = 0; i < localstoragekeys.length; i++) {
    //     const key = localstoragekeys[i]
    //     const userDetailsString = localStorageObj[key];
    //     const userDetailsObj = JSON.parse(userDetailsString);
    //     showNewUserOnScreen(userDetailsObj)
    // }
})

// SHOW DATA
function showNewUserOnScreen(user) {
    document.getElementById('descri').value = '';
    document.getElementById('expense').value = '';

    if (localStorage.getItem(user.description) !== null) {
        removeUserFromScreen(user.description)
    }
    const parentNode = document.getElementById('showOn');
    const childNode = `<li id=${user._id}> ${user.expenseamount} - ${user.description} - ${user.category}
                                 <button onclick=deleteUser('${user._id}')> Delete Data </button>   
                                 <button onclick=editUser('${user.description}','${user.expenseamount}','${user._id}')> Edit Data </button>        
                                    </li>`
    parentNode.innerHTML = parentNode.innerHTML + childNode;
}
// EDIT USER

function editUser(description, expenseamount, userId) {
    document.getElementById('descri').value = description;
    document.getElementById('expense').value = expenseamount;


    deleteUser(userId);
}


// DELETE USER
function deleteUser(userId) {
    axios.delete(`https://crudcrud.com/api/83cef52b09a7478da3d4a3cae897471a/saveData/${userId}`)
        .then((res) => {
            removeUserFromScreen(userId)
        })
        .catch((err) => {
            console.log(err)
        })
    // console.log(description);
    // localStorage.removeItem(description);
    // removeUserFromScreen(description);
}
function removeUserFromScreen(userId) {
    const parentNode = document.getElementById('showOn');
    const childNodeToBeDeleted = document.getElementById(userId);
    if (childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted);
    }
}



