import modal from './Modal.vue'

export default {
	install: function(Vue) {

		Vue.component('modal', modal)

		Vue.prototype.$l = {

			createModal: function(name) {
				var modal = document.createElement('div');
				modal.setAttribute('data-role', 'modal');
				modal.setAttribute('id', name);
				modal.setAttribute('class', 'modal')

				var modalContent = document.createElement('div');
				modalContent.setAttribute('class', 'modal-content');

				modal.appendChild(modalContent)
				document.body.appendChild(modal);

				return modalContent;
			},

			openModal: function(name) {
				document.getElementById(name).style.display = 'block';
			},

			closeModal: function(name){
				document.getElementById(name).style.display = 'none';
			},

			alert: function(message, title) {
				var name = 'modal'+Math.floor(Math.random()*1000);
				var modal = this.createModal(name);

				modal.parentElement.onclick= function(){
					document.body.removeChild(modal.parentElement)
				}

				if (title !== undefined) {
					var modalHeader = document.createElement('div')
					modalHeader.setAttribute('class', 'modal-header')
					modalHeader.innerHTML = title
					modal.appendChild(modalHeader)
				}

				var modalBody = document.createElement('div')
				modalBody.setAttribute('class', 'modal-body')
				modalBody.innerHTML = message
				modal.appendChild(modalBody)

				this.openModal(name);
			}
		}
	}
}