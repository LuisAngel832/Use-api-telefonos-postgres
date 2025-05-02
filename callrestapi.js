var url = "https://celularesapipostgres-latest.onrender.com/api/phones";

function postPhone() {
  var myMarca = $('#brand').val();
  var myModelo = $('#model').val();
  var myPrecio = $('#price').val();
  var myDescripcion = $('#description').val();

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
    data: JSON.stringify(myPhone),
    success: function (data) {
      alert("Teléfono agregado correctamente.");
      getPhones();
    },
    error: function (err) {
      console.error(err);
      alert("Error al agregar teléfono.");
    }
  });
}

function getPhones() {
  $.ajax({
    url: url,
    type: 'get',
    dataType: 'json',
    success: function (data) {
      const phones = data.Telefono;

      if (!Array.isArray(phones)) {
        alert("La respuesta del servidor no contiene una lista de teléfonos válida.");
        return;
      }

      let html = `
        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Precio</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
      `;

      phones.forEach(phone => {
        html += `
          <tr>
            <td>${phone.id}</td>
            <td>${phone.marca}</td>
            <td>${phone.modelo}</td>
            <td>${phone.precio}</td>
            <td>${phone.descripcion}</td>
            <td>
              <button onclick='setForm(${JSON.stringify(phone)})'>Actualizar</button>
              <button onclick='deletePhoneById(${phone.id})'>Eliminar</button>
            </td>
          </tr>
        `;
      });

      html += '</tbody></table>';
      $('#resultado').html(html);
    },
    error: function (err) {
      console.error(err);
      alert("Error al obtener teléfonos.");
    }
  });
}

function setForm(phone) {
  $('#id').val(phone.id);
  $('#brand').val(phone.marca);
  $('#model').val(phone.modelo);
  $('#price').val(phone.precio);
  $('#description').val(phone.descripcion);
}

function updatePhone() {
  let phoneId = $('#id').val();
  let myMarca = $('#brand').val();
  let myModelo = $('#model').val();
  let myPrecio = $('#price').val();
  let myDescripcion = $('#description').val();

  if (!phoneId || !myMarca || !myModelo || !myPrecio || !myDescripcion) {
    alert("Todos los campos son obligatorios, incluido el ID.");
    return;
  }

  let updatedPhone = {
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
    success: function () {
      alert("Teléfono actualizado correctamente.");
      getPhones();
    },
    error: function (err) {
      console.error(err);
      alert("Error al actualizar teléfono.");
    }
  });
}

function deletePhoneById(id) {
  if (confirm("¿Seguro que deseas eliminar este teléfono?")) {
    $.ajax({
      url: `${url}/${id}`,
      type: 'delete',
      success: function () {
        alert("Teléfono eliminado correctamente.");
        getPhones();
      },
      error: function (err) {
        console.error(err);
        alert("Error al eliminar teléfono.");
      }
    });
  }
}
