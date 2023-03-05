//Problème: l'interaction avec l'utilisateur ne fournit pas les résultats souhaités
//Solution: ajouter de l'interactivité pour que l'utilisateur puisse gérer ses tâches quotidiennes.

const taskInput = document.getElementById("new-task"); // nouvel-tâche
const addButton = document.getElementsByTagName("button")[0]; //premier bouton
const incompleteTasksHolder = document.getElementById("incomplete-tasks"); //tâches-incomplètes
const completedTasksHolder = document.getElementById("completed-tasks"); //tâches-complètes

//Nouvel élément de liste de tâches
const createNewTaskElement = function (taskString) {
// créer un élément de liste
const listItem = document.createElement("li");
// case à cocher
const checkBox = document.createElement("input");
// étiquette
const label = document.createElement("label");
// saisie (texte)
const editInput = document.createElement("input");
// bouton.edit
const editButton = document.createElement("button");
// bouton.supprimer
const deleteButton = document.createElement("button");
//Chaque élément doit être modifié
checkBox.type = "checkBox";
editInput.type = "text";
editButton.innerText = "Modifier";
editButton.className = "edit";
deleteButton.innerText = "Supprimer";
deleteButton.className = "delete";
label.innerText = taskString;
// Chaque élément doit être ajouté
listItem.appendChild(checkBox);
listItem.appendChild(label);
listItem.appendChild(editInput);
listItem.appendChild(editButton);
listItem.appendChild(deleteButton);

return listItem;
};

//Ajouter une nouvelle tâche
const addTask = function () {
console.log("Ajouter une tâche...");
//Créer un nouvel élément de liste avec le texte de #new-task:
const listItem = createNewTaskElement(taskInput.value);
//Ajouter listItem à incompleteTaskHolder
incompleteTasksHolder.appendChild(listItem);
bindTaskEvents(listItem, taskCompleted);
taskInput.value = "";
};

//Modifier une tâche existante
const editTask = function () {
console.log("Modifier une tâche...");
const listItem = this.parentNode;
const editInput = listItem.querySelector("input[type=text]");
const label = listItem.querySelector("label");

const containsClass = listItem.classList.contains("editMode");
// si la classe parent est .editMode
if (containsClass) {
//Passer de .editMode
//Le texte de l'étiquette devient la valeur de la saisie
label.innerText = editInput.value;
} else {
//Passer à .editMode
//la valeur de la saisie devient le texte de l'étiquette
editInput.value = label.innerText;
}
//Toggle .editMode sur le parent
listItem.classList.toggle("editMode");
};

//Supprimer une tâche existante
const deleteTask = function () {
console.log("Supprimer une tâche...");
//Supprimer l'élément de liste parent de l'ul
const listItem = this.parentNode;
const ul = listItem.parentNode;

ul.removeChild(listItem);
};

//Marquer une tâche comme terminée
const taskCompleted = function () {
console.log("Tâche terminée...");
//Lorsque la case à cocher est cochée
//Ajouter l'élément de liste de tâches à #completed-tasks ul
const listItem = this.parentNode
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};
// Marquer une tâche comme incomplète
const tacheIncomplète = function () {
  console.log("Tâche incomplète...");
  // Lorsque la case à cocher n'est pas cochée, ajoutez l'élément enfant à #incomplete-tasks
  const listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  };
  
  // Ajouter un événement de clic pour ajouter une tâche
  addButton.addEventListener("click", addTask);
  
  // Lier les événements de tâche à l'élément de liste de tâches
  const bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log("Lier les événements de l'élément de liste");
  // Sélectionnez les enfants de l'élément de liste
  const checkBox = taskListItem.querySelector('input[type="checkbox"]');
  const editButton = taskListItem.querySelector("button.edit");
  const deleteButton = taskListItem.querySelector("button.delete");
  // Lier editTask au bouton d'édition
  editButton.onclick = editTask;
  // Lier deleteTask au bouton de suppression
  deleteButton.onclick = deleteTask;
  // Lier checkBoxEventHandler à la case à cocher
  checkBox.onchange = checkBoxEventHandler;
  };
// Parcourir les éléments de la liste ul de incompleteTaskHolder
for (let i = 0; i < incompleteTasksHolder.children.length; i++) {
  // Associer des événements aux enfants de l'élément de liste (taskCompleted)
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
  }
  // Pour chaque élément enfant de l'élément "completedTasksHolder"
  for (let i = 0; i < completedTasksHolder.children.length; i++) {
  // Associer des événements aux enfants de l'élément de liste (taskIncomplete)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
  }