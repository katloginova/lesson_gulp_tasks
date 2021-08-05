'use strict';

const DELETE_BTN_SELECTOR = '.delete-btn';
const ADDER_BTN_SELECTOR = '.adder__btn';
const LIST_ITEM_SELECTOR = '.list__item';
const DONE_CLASS = 'done';


const $todoTemplate = $('#todoTemplate').html();


class TodosView {
    constructor($el, config = {}) {
        this._container = $el;
        this._$list = null;
        this._$form = null;
        this._$todoInput = null;
        this._$submit = null;
        this._config = config;

        this.initView();
    }

    initView() {
        this._$list = $('<ul class="todolist__list list"></ul>');
        this._$form = $('<form id="todoForm" class="todolist__adder adder"></form>');
        this._$todoInput = $('<input id="todoInput" type="text" placeholder="Add New Todo" class="adder__todo">');
        this._$submit = $('<input id="btnAdd" type="submit"  class="adder__btn btn" value="add todo">');

        this._container
        .append(this._$list)
        .append(this._$form
            .append(this._$todoInput)
            .append(this._$submit)
        );

        this._$list.on('click', DELETE_BTN_SELECTOR, this.onListClick.bind(this));
        this._$form.submit(ADDER_BTN_SELECTOR, this.onFormSubmit.bind(this));
        this._$list.on('click', LIST_ITEM_SELECTOR, this.onListItemClick.bind(this));
    }

    onListClick(e) {
        const id = this.getIdItem($(e.target));

        this._config.onDelete(id);
    }

    onFormSubmit(e) {
        e.preventDefault();

        if (this.isInputValid()) {
            const formData = this.getFormData();

            this._config.onSubmit(formData);
            this.resetForm();
        }

    }

    onListItemClick(e) {
        const id = this.getIdItem($(e.target));

        this._config.onEdit(id);
    }

    renderList(list) {
        this._$list.html(list.map(this.getListItemHtml).join(''));
    }

    getListItemHtml({
        id,
        title,
        isDone
    }) {
        return $todoTemplate
            .replace('{{id}}', id)
            .replace('{{title}}', title)
            .replace('{{classDone}}', isDone ? DONE_CLASS : '');
    }

    getIdItem($el) {
        return $el.closest(LIST_ITEM_SELECTOR).data('todoId');
    }

    getFormData() {
        return {
            title: this._$todoInput.val(),
            isDone: false,
        };
    }

    isInputValid() {
        return this._$todoInput.val() !== '';
    }

    resetForm() {
        this._$todoInput.val('');
    }
}