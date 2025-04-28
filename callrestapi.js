var url = "https://celularesapipostgres-latest.onrender.com/api/phones";

function postPhone() {
  console.log(url);

  var myMarca = $('#marca').val();
  var myModelo = $('#modelo').val();
  var myPrecio = $('#precio').val();
  var myDescripcion = $('#descripcion').val();

  if (!myMarca || !myModelo || !myPrecio || !myDescripcion) {
    alert("Todos los campos son obligatorios.");
    return;
  }

  var myPhone = {
    marca: myMarca,
    modelo: myModelo,
    precio: myPrecio,
    descripcion: myDescripcion
  };

  $.ajax({
    url: url,
    type: 'post',
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      alert("Teléfono creado exitosamente.");
      $('#resultado').html(JSON.stringify(data));
    },
    data: JSON.stringify(myPhone)
  });
}
function getPhones() {
  console.log(url);

  $.getJSON(url, function(json) {
    console.log(json);

    var arrPhones = json.Telefono; 

    var htmlTablePhones = '<table border="1">';
    
    htmlTablePhones += `
      <tr>
        <th>ID</th>
        <th>Marca</th>
        <th>Modelo</th>
        <th>Precio</th>
        <th>Descripción</th>
      </tr>`;

    arrPhones.forEach(function(item) {
      console.log(item);
      htmlTablePhones += `
        <tr>
          <td>${item.id}</td>
          <td>${item.marca}</td>
          <td>${item.modelo}</td>
          <td>${item.precio}</td>
          <td>${item.descripcion}</td>
        </tr>`;
    });

    htmlTablePhones += '</table>';
    $('#resultado').html(htmlTablePhones);
  });
}

function updatePhone() {
  console.log("Actualizando teléfono...");

  var phoneId = $('#id').val(); 
  var myMarca = $('#marca').val();
  var myModelo = $('#modelo').val();
  var myPrecio = $('#precio').val();
  var myDescripcion = $('#descripcion').val();

  if (!phoneId || !myMarca || !myModelo || !myPrecio || !myDescripcion) {
    alert("Todos los campos son obligatorios, incluyendo el ID.");
    return;
  }

  var updatedPhone = {
    marca: myMarca,
    modelo: myModelo,
    precio: myPrecio,
    descripcion: myDescripcion
  };

  $.ajax({
    url: `${url}/${phoneId}`, 
    type: 'put',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify(updatedPhone),
    success: function(data) {
      console.log(data);
      alert("Teléfono actualizado exitosamente.");
      getPhones(); 
    },
    error: function(err) {
      console.error(err);
      alert("Error al actualizar teléfono.");
    }
  });
}
function deletePhone() {
  console.log("Eliminando teléfono...");

  var phoneId = $('#id').val();

  if (!phoneId) {
    alert("Debes ingresar el ID del teléfono para eliminar.");
    return;
  }

  $.ajax({
    url: `${url}/${phoneId}`, 
    type: 'delete',
    dataType: 'json',
    success: function(data) {
      console.log(data);
      alert("Teléfono eliminado exitosamente.");
      getPhones(); 
    },
    error: function(err) {
      console.error(err);
      alert("Error al eliminar teléfono.");
    }
  });
}

