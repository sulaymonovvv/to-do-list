function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();
  if (!taskText) return;

  const taskList = document.getElementById("taskList");
  const li = document.createElement("li");
  li.className = "list-group-item d-flex align-items-center justify-content-between";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "form-check-input me-2";

  const textInput = document.createElement("textarea");
  textInput.rows = 1;
  textInput.className = "task-text form-control";
  textInput.value = taskText;
  textInput.readOnly = true;
  textInput.style.resize = "none";

  // Auto resize textarea
  textInput.addEventListener("input", () => {
    textInput.style.height = "auto";
    textInput.style.height = textInput.scrollHeight + "px";
  });

  const timestamp = document.createElement("div");
  timestamp.className = "timestamp";
  const createdAt = new Date();
  timestamp.textContent = `Yaratilgan: ${createdAt.toLocaleString()}`;

  const btnGroup = document.createElement("div");
  btnGroup.className = "btn-group";

  const editBtn = document.createElement("button");
  editBtn.className = "btn btn-sm btn-outline-secondary";
  editBtn.innerHTML = '<i class="fas fa-pen"></i>';
  let isEditing = false;

  editBtn.onclick = () => {
    isEditing = !isEditing;
    textInput.readOnly = !isEditing;
    if (!isEditing) {
      timestamp.textContent = `Edited: ${new Date().toLocaleString()}`;
    }
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-sm btn-outline-danger";
  deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
  deleteBtn.onclick = () => {
    taskList.removeChild(li);
  };

  checkbox.onchange = () => {
    textInput.classList.toggle("completed", checkbox.checked);
  };

  btnGroup.appendChild(editBtn);
  btnGroup.appendChild(deleteBtn);

  const leftSide = document.createElement("div");
  leftSide.className = "d-flex flex-column flex-grow-1 ms-2";
  leftSide.appendChild(textInput);
  leftSide.appendChild(timestamp);

  li.appendChild(checkbox);
  li.appendChild(leftSide);
  li.appendChild(btnGroup);

  taskList.appendChild(li);
  input.value = "";
}