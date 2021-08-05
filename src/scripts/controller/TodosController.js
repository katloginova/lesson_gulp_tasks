'use strict';

class TodosController {
    constructor($el) {
        this.initCollection();
        this.initView($el);
    }

    initCollection() {
        this.todosCollection = new TodosCollection(URL_TODOS);

        this.todosCollection
            .fetchTodos()
            .then(() => this.renderList());
    }

    initView($el){
        this.todosView = new TodosView($el, {
            onDelete: this.deleteTodo.bind(this),
            onSubmit: this.submitForm.bind(this),
            onEdit: this.editTodo.bind(this),
        });
    }

    renderList(){
        this.todosView.renderList(this.todosCollection.list);
    }

    deleteTodo(id){
        this.todosCollection.deleteTodo(id);
        this.renderList();
    }

    submitForm(formData){
        this.todosCollection.submitForm(formData).then(() => this.renderList());

    }

    editTodo(id){
        this.todosCollection.editTodo(id).then(() => this.renderList());
    }
}