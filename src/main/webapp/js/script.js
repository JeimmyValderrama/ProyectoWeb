//Función para cargar todos los estudiantes una vez este cargada la page
$(document).ready(function () {
    getStudents();
});

function validateId(filter, param)  {
    const url = "servletFilter";
    const data = {
        filter: filter,
        param: $(param).val()
    };

    $.ajax({
        type: "GET",
        url: url,
        data: data,
        dataType: "json",
        success: function (response) {
            console.log(response)
            if (response.length === 0) {
                alert("El id user no existe")
                return true;
            } else {
                return false;
            }

        },
        error: function (xhr, status, error) {
            console.log("Error al enviar los datos");
            console.log(xhr.status);
            console.log(xhr.responseText);
            let errorMessage = JSON.parse(xhr.responseText).error;
            alert("Error: " + errorMessage);
        },
    });
    return true;
}

$("#btnSend").click(function (event) {
    event.preventDefault();
    if(!validateId("IdEstudiante", "#IdEstudiante")){
        return;
    }

    if (!validateForm()) {
        return;
    }
    const url = "ajaxServlet";
    const isIndividualValue = $("#isIndividual").prop("checked") ? "Indivudal" : "Team";

    const diciplineData={
        name: $("#dicipline").val(),
        type: isIndividualValue
    }

    let  events = [];
    const eventData = {
        name: $("#nameEvent").val(),
        position: parseInt($("#resultEvent").val()),
        date: $("#date").val()
    }
    events.push(eventData)
    const studentData = {
        id: $("#idStudent").val(),
        name: $("#nameStudent").val(),
        surname: $("#surnameStudent").val(),
        address: $("#address").val(),
        discipline: diciplineData,
        events: events
    };

    const jsonData = JSON.stringify(studentData);
    console.log(jsonData)

    $.ajax({
        type: "POST",
        url: url,
        contentType: "application/json", // Especificar el tipo de contenido como JSON
        data: jsonData,
        success: function (response) {
            console.log("Datos enviados correctamente");
            console.log(response);
            getStudents();
        },
        error: function (xhr, status, error) {
            console.log("Error al enviar los datos");
            console.log(xhr.status);
            console.log(xhr.responseText);
            let errorMessage = JSON.parse(xhr.responseText).error;
            alert("Error: " + errorMessage);
        },
        complete: function (xhr, status) {
            $("#idStudent").val("");
            $("#nameStudent").val("");
            $("#surnameStudent").val("");
            $("#address").val("");
            $("#dicipline").val("");
            $("#nameEvent").val("");
            $("#resultEvent").val("");
            $("#date").val("");
            $("#isIndividual").prop("checked", false);
            $('#formStudent').toggle();
        }
    });
});

function getStudents() {
    const url = "ajaxServlet";

    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        success: function (response) {
            updateTable(response);
        },
        error: function (xhr, status, error) {
            console.log("Error al obtener los estudiantes");
            console.log(xhr.status);
            console.log(xhr.responseText);
            let errorMessage = JSON.parse(xhr.responseText).error;
            alert("Error: " + errorMessage);
        }
    });
}

$("#sendEvent").click(function (event) {
    event.preventDefault();

    if(!validateId("IdEstudiante", '#idStudentEvent')){
        return;
    }

    if (!validateFormEvent()) {
        return;
    }

    const url = "servletFilter";
    const data = {
        filter: "IdEstudiante",
        param: $("#idStudentEvent").val()
    };

    const dataEvent = {
        name: $("#name").val(),
        position: parseInt($("#position").val()),
        date: $("#dateEvent").val(),
    }

    $.ajax({
        type: "GET",
        url: url,
        data: data,
        dataType: "json",
        success: function (response) {
            var newEvent = {
                name: dataEvent.name,
                position: dataEvent.position,
                date: dataEvent.date
            };
            response[0].events.push(newEvent);

            updateStudent(response[0].id, response[0].name, response[0].surname, response[0].address, response[0].discipline, response[0].events);
        },
        error: function (xhr, status, error) {
            console.log("Error al enviar los datos");
            console.log(xhr.status);
            console.log(xhr.responseText);
            let errorMessage = JSON.parse(xhr.responseText).error;
            alert("Error: " + errorMessage);
        },
        complete: function (xhr, status) {
            $("#idStudentEvent").val("");
            $("#name").val("");
            $("#resultEvent").val("");
            $("#date").val("");
            $('#formEvents').toggle();
        }
    });
});

function updateStudent(id, name, surname, address, discipline, events) {
    const url = "ajaxServlet";

    // Crear un objeto con los datos del estudiante
    const studentData = {
        id: id,
        name: name,
        surname: surname,
        address: address,
        discipline: discipline,
        events: events
    };

    // Convertir el objeto a JSON
    const jsonData = JSON.stringify(studentData);
    console.log(jsonData)

    $.ajax({
        type: "PUT",
        url: url,
        contentType: "application/json", // Especificar el tipo de contenido como JSON
        data: jsonData,
        dataType: "json",
        success: function (response) {
            console.log("Estudiantes obtenidos correctamente");
            console.log(response);
            getStudents();
        },
        error: function (xhr, status, error) {
            console.log("Error al obtener los afiliados");
            console.log(xhr.status);
            console.log(xhr.responseText);
            let errorMessage = JSON.parse(xhr.responseText).error;
            alert("Error: " + errorMessage);
        }
    });


}

function validateForm() {
    const id = $("#idStudent").val();
    const name = $("#nameStudent").val();
    const surname = $("#surnameStudent").val();
    const address = $("#address").val();
    const eventName = $("#nameEvent").val();

    // Validar que el ID sea mayor que 0 y contenga solo números
    if (id <= 0 || isNaN(id)) {
        alert("El ID debe ser un número mayor que 0.");
        return false;
    }

// Validar nombre y apellido
    if (!/^[a-zA-Z\s]{3,}$/.test(name)) {
        alert("El nombre debe tener más de 5 letras y no contener caracteres especiales.");
        return false;
    }

    if (!/^[a-zA-Z\s]{5,}$/.test(surname)) {
        alert("El apellido debe tener más de 5 letras y no contener caracteres especiales.");
        return false;
    }

// Validar dirección
    if (!/^[a-zA-Z0-9\s]{5,}$/.test(address)) {
        alert("Direccion Invalida");
        return false;
    }

    const disValue = document.getElementById("dicipline").value;

    if (disValue === "") {
        alert("Por favor, ingrese una disciplina valida.");
        return false;
    }

    // Validar nombre del evento
    if (!/^[a-zA-Z\s]{5,}$/.test(eventName)) {
        alert("El nombre del evento debe tener al menos 5 caracteres.");
        return false;
    }

    const dateValue = document.getElementById("date").value;

    if (dateValue === "") {
        alert("Por favor, ingrese una fecha valida.");
        return false;
    }
    const disRes = document.getElementById("resultEvent").value;

    if (disRes === "") {
        alert("Por favor, ingrese una puesto valido.");
        return false;
    }

    return true; // Si todas las validaciones pasan, retorna true
}

function validateFormEvent() {
    const id = $("#idStudentEvent").val();
    const name = $("#name").val();
    const eventDate = $("#dateEvent").val();

    if (id <= 0 || isNaN(id)) {
        alert("El ID debe ser un número mayor que 0.");
        return false;
    }

    if (!/^[a-zA-Z\s]{3,}$/.test(name)) {
        alert("El nombre debe tener más de 5 letras y no contener caracteres especiales.");
        return false;
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(eventDate)) {
        alert("El formato de la fecha del evento debe ser YYYY-MM-DD.");
        return false;
    }

    return true; // Si todas las validaciones pasan, retorna true
}

function validate(row) {
    // Obtener los valores editados
    const name = row.find("td:nth-child(2)").text();
    const surname = row.find("td:nth-child(3)").text();
    const address = row.find("td:nth-child(4)").text();

    let evenstName = [];
    let eventsDate = [];
    let eventsPosition = [];

    row.find("td:nth-child(7)").each(function () {
        let name = $(this).text().split('.').filter(Boolean);
        name.forEach(function(element) {
            evenstName.push(element);
        });
    });

    row.find("td:nth-child(8)").each(function () {
        let date = $(this).text().split('.').filter(Boolean);
        date.forEach(function(element) {
            eventsDate.push(element);
        });
    });

    row.find("td:nth-child(9)").each(function () {
        let position = $(this).text().split('.').filter(Boolean);
        position.forEach(function(element) {
            eventsPosition.push(element);
        });
    });


// Validar nombre y apellido
    if (!/^[a-zA-Z\s]{3,}$/.test(name)) {
        alert("El nombre debe tener más de 5 letras y no contener caracteres especiales.");
        return false;
    }

    if (!/^[a-zA-Z\s]{3,}$/.test(surname)) {
        alert("El apellido debe tener más de 5 letras y no contener caracteres especiales.");
        return false;
    }

// Validar dirección
    if (!/^[a-zA-Z0-9\s]+$/.test(address)) {
        alert("La dirección solo debe contener letras y números sin caracteres especiales.");
        return false;
    }

// Validar nombre de eventos
    let isValid = true;
    evenstName.forEach(function(eventName) {
        if (!/^[a-zA-Z\s]+$/.test(eventName)) {
            alert("El nombre del evento debe contener solo letras.");
            isValid = false;
        }
    });

// Validar formato de fecha (YYYY-MM-DD)
    eventsDate.forEach(function(eventDate) {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(eventDate)) {
            alert("El formato de la fecha del evento debe ser YYYY-MM-DD.");
            isValid = false;
        }
    });

// Validar posición (solo números)
    eventsPosition.forEach(function(eventPosition) {
        if (!/^\d+$/.test(eventPosition)) {
            alert("La posición del evento debe contener solo números.");
            isValid = false;
        }
    });

// Retornar el estado de validez
    return isValid;
}

function updateTable(students) {
    const tbody = $("#tableStudents tbody");
    tbody.empty();

    if (students && students.length > 0) {
        students.forEach(student => {
            const tr = $("<tr>");

            tr.append(`<td>${student.id}</td>`);
            tr.append(`<td>${student.name}</td>`);
            tr.append(`<td>${student.surname}</td>`);
            tr.append(`<td>${student.address}</td>`);
            tr.append(`<td>${student.discipline.name}</td>`);
            tr.append(`<td>${student.discipline.type}</td>`);

            const eventCell = $("<td></td>");
            const eventList = $("<ul></ul>");
            const eventDate = $("<td></td>");

            student.events.forEach(event => {
                const eventListName = $(`<li>${event.name}.</li>`);
                eventList.append(eventListName); // Agrega el nombre del evento a la lista
            });

            student.events.forEach(event => {
                const eventListDate = $(`<li>${event.date}.</li>`);
                eventDate.append(eventListDate); // Agrega la fecha del evento a la lista
            });

            const resultCell = $("<td></td>");

            student.events.forEach(event => {
                const resultListItem = $(`<li>${event.position}.</li>`);
                resultCell.append(resultListItem);
            });

            eventCell.append(eventList);
            tr.append(eventCell);
            tr.append(eventDate)
            tr.append(resultCell);
            tbody.append(tr);

            // Agregar celda para el icono de eliminación
            const updateIconCell = $("<td></td>");
            const updateIcon = $("<img src='images/update.png' style='width: 50px; height: 50px;'>");
            updateIconCell.append(updateIcon);
            tr.append(updateIconCell);

            // Agregar celda para el icono de eliminación
            const deleteIconCell = $("<td></td>");
            const deleteIcon = $("<img class='delete-icon' src='images/delete.png' style='width: 50px; height: 50px;'>");
            deleteIconCell.append(deleteIcon);
            tr.append(deleteIconCell);

            // Asignar evento de clic al ícono de eliminación
            deleteIcon.click(function() {
                // Obtener el ID del estudiante asociado a esta fila
                const studentId = $(this).closest("tr").find("td:first").text();
                console.log(studentId);
                // Llamar a la función para eliminar el estudiante
                deleteStudent(studentId, tr);
            });

            updateIcon.click(function () {
                // Obtener la fila actual
                const row = $(this).closest("tr");

                // Hacer que las celdas sean editables
                row.find("td:not(:first-child):not(:last-child)").attr("contenteditable", "true");

                // Convertir los campos 5 y 6 en listas desplegables
                const disciplineSelect = $("<select>");
                // Agregar opciones a la lista desplegable para el campo 5
                disciplineSelect.append("<option value='Futbol'>Futbol</option>");
                disciplineSelect.append("<option value='Baloncesto'>Baloncesto</option>");
                disciplineSelect.append("<option value='Tenis'>Tenis</option>");
                disciplineSelect.append("<option value='Natacion'>Natacion</option>");
                disciplineSelect.append("<option value='Atletismo'>Atletismo</option>");
                // Puedes agregar más opciones según sea necesario
                row.find("td:nth-child(5)").empty().append(disciplineSelect);

                const typeSelect = $("<select>");
                // Agregar opciones a la lista desplegable para el campo 6
                typeSelect.append("<option value='Individual'>Individual</option>");
                typeSelect.append("<option value='Team'>Team</option>");
                // Puedes agregar más opciones según sea necesario
                row.find("td:nth-child(6)").empty().append(typeSelect);

                // Cambiar el ícono de actualización por un ícono de guardar
                $(this).attr("src", "images/save.png");
                $(this).off("click"); // Desactivar el evento de clic para evitar múltiples llamadas

                // Manejar el clic en el ícono de guardar
                $(this).click(function () {
                    if(!validate(row)){
                        // Hacer que las celdas dejen de ser editables
                        row.find("td").removeAttr("contenteditable");
                        // Cambiar el ícono de guardar por el ícono de actualización
                        $(this).attr("src", "images/update.png");
                        getStudents();
                        return;
                    }
                    // Obtener los valores editados
                    const id = row.find("td:nth-child(1)").text();
                    const name = row.find("td:nth-child(2)").text();
                    const surname = row.find("td:nth-child(3)").text();
                    const address = row.find("td:nth-child(4)").text();
                    const discipline = {
                        name: row.find("td:nth-child(5) select").val(),
                        type: row.find("td:nth-child(6) select").val()
                    };
                    let evenstName = [];
                    let eventsDate = [];
                    let eventsPosition = [];

                    row.find("td:nth-child(7)").each(function () {
                        let name = $(this).text().split('.').filter(Boolean);
                        name.forEach(function(element) {
                            evenstName.push(element);
                        });
                    });

                    row.find("td:nth-child(8)").each(function () {
                        let date = $(this).text().split('.').filter(Boolean);
                        date.forEach(function(element) {
                            eventsDate.push(element);
                        });
                    });

                    row.find("td:nth-child(9)").each(function () {
                        let position = $(this).text().split('.').filter(Boolean);
                        position.forEach(function(element) {
                            eventsPosition.push(element);
                        });
                    });

                    let events = [];

                    for (let i = 0; i < evenstName.length; i++) {
                        let evento = {
                            name: evenstName[i],
                            date: eventsDate[i],
                            position: eventsPosition[i]
                        };
                        events.push(evento);
                    }

                    updateStudent(id, name, surname, address, discipline, events);

                    // Hacer que las celdas dejen de ser editables
                    row.find("td").removeAttr("contenteditable");

                    // Cambiar el ícono de guardar por el ícono de actualización
                    $(this).attr("src", "images/update.png");

                });

            });
        });
    } else {
        const tr = $("<tr>");
        tr.append(`<td colspan="6">No hay estudiantes</td>`);
        tbody.append(tr);
    }
}

// Función para eliminar un estudiante
function deleteStudent(studentId, tr) {
    // Construir la URL con el ID del estudiante
    const url = "ajaxServlet?studentId=" + studentId;

    // Realizar la solicitud DELETE
    $.ajax({
        type: "DELETE",
        url: url,
        success: function () {
            console.log("Solicitud DELETE exitosa");
            tr.remove();
        },
        error: function (xhr, status, error) {
            console.log("Error al eliminar el estudiante");
            console.log(xhr.status);
            console.log(xhr.responseText);
            let errorMessage = JSON.parse(xhr.responseText).error;
            alert("Error: " + errorMessage);
        }
    });
}


