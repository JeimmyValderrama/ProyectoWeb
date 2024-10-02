$(document).ready(function () {
    getStudentsAll()
});

$("#sendFilter").click(function (event) {
    event.preventDefault();
    console.log("asdasdasfe")
    if(!validateForm()){
        return;
    }

    const url = "servletFilter";
    const data = {
        filter: $("#filter").val(),
        param: $("#paramDiscipline").val()
    };


    $.ajax({
        type: "GET",
        url: url,
        data: data,
        success: function (response) {
            console.log("Datos enviados correctamente");
            console.log(response);
            updateTable(response)
        },
        error: function (xhr, status, error) {
            console.log("Error al enviar los datos");
            console.log(xhr.status);
            console.log(xhr.responseText);
            let errorMessage = JSON.parse(xhr.responseText).error;
            alert("Error: " + errorMessage);
        },
        complete: function (xhr, status) {
            if (xhr.status === 400) {
                let errorMessage = JSON.parse(xhr.responseText).error;
                alert("Error: " + errorMessage);
            }
        }
    });
});

function validateForm() {
    var filter = document.getElementById("filter").value;
    var paramValue = "";
    console.log("hplasasddas");
    console.log(filter);


    if (filter === "Disciplina" || filter === "Nombre" || filter === "Apellido" || filter === "Evento") {
        paramValue = document.getElementById("paramDiscipline").value;
        console.log( paramValue);

        return validarTexto(paramValue);
    } else if (filter === "IdEstudiante") {
        paramValue = document.getElementById("paramDiscipline").value;

        return validarNumero(paramValue);
    }

    // Si no hay necesidad de validación, devuelve true
    return true;
}

function validarTexto(value) {
    return /^[a-zA-Z\s]{3,}$/.test(value);
}

function validarNumero(value) {
    return value.trim() !== "" && !isNaN(value) && parseInt(value) > 0;
}

function getStudentsAll() {
    const url = "servletFilter";
    const data = {
        filter: "",
        param: ""
    };

    $.ajax({
        type: "GET",
        url: url,
        data: data,
        dataType: "json",
        success: function (response) {
            console.log("Afiliados obtenidos correctamente");
            console.log(response);
            updateTable(response);
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
        });
    }else {
        const tr = $("<tr>");
        tr.append(`<td colspan="6">No hay estudiantes</td>`);
        tbody.append(tr);
    }
}




