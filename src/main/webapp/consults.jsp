    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Club Deportivo</title>
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="css/styles.css">
        <script>
            function cambiarTipoCampo() {
                var filter = document.getElementById("filter").value;
                var param = document.getElementById("param");

                // Elimina cualquier elemento de campoConsulta
                param.innerHTML = "";

                // Si la opción seleccionada es "Disciplina", añade un select
                if (filter === "Disciplina") {
                    var selectDisciplina = document.createElement("select");
                    selectDisciplina.setAttribute("class", "form-control");
                    selectDisciplina.setAttribute("id", "paramDiscipline");
                    selectDisciplina.setAttribute("name", "paramDiscipline");

                    var disciplinas = ["Futbol", "Baloncesto", "Tenis", "Natacion", "Atletismo"];

                    disciplinas.forEach(function(disciplina) {
                        var option = document.createElement("option");
                        option.value = disciplina;
                        option.text = disciplina;
                        selectDisciplina.appendChild(option);
                    });

                    param.appendChild(selectDisciplina);
                }

                if(filter === "IdEstudiante"){
                    var inputNumber = document.createElement("input");
                    inputNumber.setAttribute("type", "number");
                    inputNumber.setAttribute("class", "form-control");
                    inputNumber.setAttribute("id", "paramDiscipline");
                    inputNumber.setAttribute("name", "paramDiscipline");

                    param.appendChild(inputNumber);
                }

                if(filter === "MostrarTodos"){

                }

                if(filter === "Nombre" || filter === "Apellido" || filter === "Evento") {
                    var inputText = document.createElement("input");
                    inputText.setAttribute("type", "text");
                    inputText.setAttribute("class", "form-control");
                    inputText.setAttribute("id", "paramDiscipline");
                    inputText.setAttribute("name", "paramDiscipline");

                    param.appendChild(inputText);
                }


            }
        </script>

    </head>
    <body>
    <header>
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <h1 class="text-center"><img src="images/club.png" alt="CLUB DEPORTIVO"></h1>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <nav class="text-center">
                        <ul class="list-inline">
                            <li class="list-inline-item"><a href="index.jsp">Home</a></li>
                            <li class="list-inline-item"><a href="consults.jsp">Consultas</a></li>
                            <li class="list-inline-item"><a href="about.jsp">Acerca de...</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </header>


    <main>
    <div class="container">
        <h1 class="text-center my-4">Consultas</h1>
        <div class="row justify-content-center">
            <div class="col-md-8">
                <form id="myForm">
                    <div class="form-group row">
                        <label for="filter" class="col-sm-3 col-form-label">Filtro:</label>
                        <div class="col-sm-9">
                            <select class="form-control" id="filter" name="filter" onchange="cambiarTipoCampo()">
                                <option selected></option>
                                <option value="MostrarTodos">Mostrar Todos</option>
                                <option value="Nombre">Nombre</option>
                                <option value="Apellido">Apellido</option>
                                <option value="IdEstudiante">Id Estudiante</option>
                                <option value="Disciplina">Disciplina</option>
                                <option value="Evento">Evento</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Consulta:</label>
                        <div class="col-sm-9"  id="param">
                        </div>
                    </div>

                    <div class="form-group row">
                        <div class="col-sm-12">
                            <button class="btn btn-primary btn-block" id="sendFilter" type="submit">Consultar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
        <br>
        <h1 class="text-center my-4">Estudiantes</h1>
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="table-responsive" style="width: 100%; height: 100%;">
                    <table class="table table-bordered table-striped" id="tableStudents" style="width: 98%;margin-left: 10px">
                        <thead>
                        <tr>
                            <th>ID Estudiante</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Direccion</th>
                            <th>Disciplina</th>
                            <th>Modalidad</th>
                            <th>Eventos</th>
                            <th>Fecha</th>
                            <th>Puestos</th>
                        </tr>
                        <tbody>
                        </tbody>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </main>
    <script src="https://code.jquery.com/jquery-3.7.1.js" integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4="
            crossorigin="anonymous"></script>
    <script src="js/filter.js"></script>
    </body>
    </html>
