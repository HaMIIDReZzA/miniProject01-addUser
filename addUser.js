let addButton=document.querySelector('#addButton')
let addUserContainer=document.querySelector('.user-container');
class Users {
    constructor(name, lastNames, phoneNumber, visitTime){
        this.name = name;
        this.lastNames = lastNames;
        this.phoneNumber = phoneNumber;
        this.visitTime = visitTime;
    }
}

function openNav() {
    document.getElementById("user-container-height").style.height = "310px";
    }
    
    function closeNav() {
    document.getElementById("user-container-height").style.height = "0";
    }

class UI {
    static displayUsers(){
        const users = Store.getUsers();

        users.forEach((user) => UI.addUserToList(user));
    }

    static addUserToList(user) {
        const list = document.querySelector('#user-list');

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.lastNames}</td>
            <td>${user.phoneNumber}</td>
            <td>${user.visitTime}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">Delete</a></td>
        `;

        list.appendChild(row);
    }

    static deleteUser(element){
        if(element.classList.contains('delete')){
            element.parentElement.parentElement.remove();
        }
    }

    static showNotification(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.user-container');
        const form = document.querySelector('#user-form');
        container.insertBefore(div, form);

        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    static clearFileds(){
        document.querySelector('#name').value = '';
        document.querySelector('#lastNames').value = '';
        document.querySelector('#phoneNumber').value = '';
        document.querySelector('#visitTime').value = '';
    }
}

class Store {
    static getUsers(){
        let users;
        if(localStorage.getItem('users') === null){
            users = [];
        }else{
            users = JSON.parse(localStorage.getItem('users'));
        }

        return users;
    }

    static addUser(user){
        const users = Store.getUsers();

        users.push(user);

        localStorage.setItem('users', JSON.stringify(users));
    }

    static removeUser(id){
        const users = Store.getUsers();

        users.forEach((user, index) => {
            if(user.id === this.name){
                users.splice(index, 1);
            }
        });

        localStorage.setItem('users', JSON.stringify(users));
    }
}

document.addEventListener('DOMContentLoaded', UI.displayUsers);

document.querySelector('#user-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.querySelector('#name').value;
    const lastNames = document.querySelector('#lastNames').value;
    const phoneNumber = document.querySelector('#phoneNumber').value;
    const visitTime = document.querySelector('#visitTime').value;

    if(name === '' || phoneNumber === '' || lastNames === '' || visitTime === ''){
        UI.showNotification('All fields are required!', 'danger');
    }else{
        const user = new Users(name, lastNames, phoneNumber, visitTime);

        UI.addUserToList(user);

        Store.addUser(user);

        // UI.showNotification('User added', 'success');

        UI.clearFileds();

        // console.log(user);
    }
});

document.querySelector('#user-list').addEventListener('click', (e) => {

    UI.deleteUser(e.target);

    Store.removeUser(e.target.parentElement.previousElementSibling.textContent)
});
