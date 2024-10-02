<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="css/styles.css">
    <title>Club Deportivo</title>
    <style>
        /* Agrega estilos personalizados aquí si es necesario */
        #formStudent {
            display: none; /* El formulario se oculta inicialmente */
        }
        #btnSend{
            color: white;
        }

        #formEvents{
            display: none;
        }
    </style>
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
                        <li class="list-inline-item"><a href="about.jsp">Acerca de..</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</header>

<main>
    <div class="container">
        <h1 class="text-center my-4">Formulario de Estudiantes</h1>

        <!-- Formulario de Afiliados -->
        <form id="formStudent">
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="idStudent" class="form-label">ID</label>
                        <input type="number" value="0" class="form-control" id="idStudent" name="idStudent">
                    </div>
                    <div class="form-group">
                        <label for="nameStudent" class="form-label">Nombre</label>
                        <input type="text" class="form-control" id="nameStudent" name="nameStudent">
                    </div>
                    <div class="form-group">
                        <label for="surnameStudent" class="form-label">Apellido</label>
                        <input type="text" class="form-control" id="surnameStudent" name="surnameStudent">
                    </div>
                    <div class="form-group">
                        <label for="address" class="form-label">Direccion</label>
                        <input type="text" id="address" class="form-control input-padron" >
                    </div>
                    <div class="form-group">
                        <label class="form-label">Disciplina</label>
                        <fieldset class="form-group">
                            <select class="form-control" id="dicipline">
                                <option>Futbol</option>
                                <option>Baloncesto</option>
                                <option>Tenis</option>
                                <option>Natacion</option>
                                <option>Atletismo</option>
                            </select>
                        </fieldset>
                    </div>
                    <div class="form-group form-check">
                        <input type="checkbox" class="form-check-input" id="isIndividual" name="isIndividual">
                        <label class="form-check-label form-label" for="isIndividual">Individual</label>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="nameEvent" class="form-label">Nombre del evento</label>
                        <input type="text" class="form-control" id="nameEvent" name="nameEvent">
                    </div>
                    <div class="form-group row">
                        <label for="date" class="col-sm-3 col-form-label">Fecha:</label>
                        <div class="col-sm-9">
                            <input type="date" class="form-control" id="date" name="date">
                        </div>
                    </div>
                    <label for="resultEvent" class="col-sm-3 col-form-label">Puesto:</label>
                    <select class="form-control" name="resultEvent" id="resultEvent">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="2">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                    </select>

                    <div>
                        <br><br>
                        <button type="button" id="btnSend" class="btn btn-primary">Enviar Formulario</button>
                        <br><br>
                    </div>

                </div>
            </div>
        </form>
    </div>

    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <button type="button" id="btnAddStudent" class="btn btn-block btnAddStudent">Agregar Estudiante</button>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="row justify-content-center" style="margin-top: 10px;">
            <div class="col-md-8">
                <form id="formEvents">
                    <h1 class="text-center my-4">Eventos</h1>
                    <div class="form-group row">
                        <label for="idStudentEvent" class="col-sm-3 col-form-label">Id del estudiante:</label>
                        <div class="col-sm-9">
                            <input type="number" value="0" class="form-control" id="idStudentEvent" name="idStudentEvent">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="name" class="col-sm-3 col-form-label">Nombre del evento:</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="name" name="name">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="position" class="col-sm-3 col-form-label">Posicion en el evento:</label>
                        <div class="col-sm-9">
                            <select class="form-control" name="resultEvent" id="position">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="2">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="dateEvent" class="col-sm-3 col-form-label">Fecha:</label>
                        <div class="col-sm-9">
                            <input type="date" class="form-control" id="dateEvent" name="dateEvent">
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-sm-6">
                            <button class="btn btn-primary btn-block" id="cancel" type="submit">Cancelar</button>
                        </div>
                        <div class="col-sm-6">
                            <button class="btn btn-primary btn-block" id="sendEvent" type="submit">Enviar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="container" style="margin-top: 70px; margin-bottom: 80px;">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <button type="button" id="btnAddEvent" class="btn btn-block btnAddEvent1">Agregar Evento</button>
            </div>
        </div>
    </div>
    <br>

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
                        <th>Actualizar</th>
                        <th>Eliminar</th>
                    </tr>
                    <tbody>
                    </tbody>
                    </thead>
                </table>
            </div>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.7.1.js" integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4="
            crossorigin="anonymous"></script>
    <script src="js/script.js"></script>
    <script>
        $(document).ready(function() {
            $('#btnAddStudent').click(function() {
                $('#formStudent').toggle();
            });

            $('#btnAddEvent').click(function() {
                $('#formEvents').toggle();
            });

        });

    </script>
</main>
</body>
</html>

