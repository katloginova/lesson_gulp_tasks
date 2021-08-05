'use strict';

class TodosCollection {
    constructor(url) {
        this._url = url;
        this.list = [];
    }

    fetchTodos() {
        return fetch(this._url)
            .then(res => res.json())
            .then((data) => this.setData(data));
    }

    setData(data) {
        this.list = data;
    }

    deleteTodo(id) {
        this.list = this.list.filter((item) => item.id != id);

        return fetch(`${this._url}/${id}`, {
            method: 'DELETE',
        }).then(res => res.json());
    }

    submitForm(formData) {
        return fetch(this._url, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-type': 'application/json'
                },
            }).then((resp) => resp.json())
            .then((data) => this.list.push(data));
    }

    editTodo(id) {
        this.list = $.map(this.list, (item) =>
            item.id != id ?
            item : {
                ...item,
                isDone: !item.isDone
            });
        const editedTodo = this.list.find((item) => item.id == id);

        return fetch(`${this._url}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(editedTodo),
            headers: {
                'Content-type': 'application/json'
            },
        }).then(res => res.json());
    }
}