var url = "https://celularesapipostgres-latest.onrender.com/api/phones";

function postPhone() {
  var myBrand = $('#brand').val();
  var myModel = $('#model').val();
  var myPrice = $('#price').val();
  var myDescription = $('#description').val();

  if (!myBrand || !myModel || !myPrice || !myDescription) {
    alert("Todos los campos son obligatorios.");
    return;
  }

  var myPhone = {
    brand: myBrand,
    model: myModel,
    price: myPrice,
    description: myDescription
  };

  $.ajax({
    url: url,
    type: 'post',
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      alert("Teléfono agregado correctamente.");
      getPhones();
    },
    data: JSON.stringify(myPhone)
  });
}

function getPhones() {
  $.ajax({
    url: url,
    type: 'get',
    dataType: 'json',
    success: function (data) {
      const phones = data.Telefono; // Usamos "Telefono" como aparece en la respuesta

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
    }
  });
}


function setForm(phone) {
  $('#id').val(phone.id);
  $('#brand').val(phone.marca); // en lugar de phone.brand
  $('#model').val(phone.modelo); // en lugar de phone.model
  $('#price').val(phone.precio); // en lugar de phone.price
  $('#description').val(phone.descripcion); // en lugar de phone.description
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
    success: function () {
      alert("Teléfono actualizado correctamente.");
      getPhones();
    },
    data: JSON.stringify(updatedPhone),
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
