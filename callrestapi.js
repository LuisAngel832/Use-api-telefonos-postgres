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
      const phones = data.phones;
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
            <td>${phone.brand}</td>
            <td>${phone.model}</td>
            <td>${phone.price}</td>
            <td>${phone.description}</td>
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



function updatePhone() {

  let phoneId = $('#id').val(); // ID del teléfono a actualizar
  let myBrand = $('#brand').val();
  let myModel = $('#model').val();
  let myPrice = $('#price').val();
  let myDescription = $('#description').val();

  if (!phoneId || !myBrand || !myModel || !myPrice || !myDescription) {
    alert("Todos los campos son obligatorios, incluido el ID.");
    return;
  }

  let updatedPhone = {
    brand: myBrand,
    model: myModel,
    price: myPrice,
    description: myDescription
  };

  $.ajax({
    url: `${url}/${phoneId}`, // Endpoint con el ID del teléfono
    type: 'put',
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      alert("Teléfono actualizado correctamente.");
      getPhones(); // Refresca la lista de teléfonos
    },
    data: JSON.stringify(updatedPhone)
  });
}
function setForm(phone) {
  $('#id').val(phone.id);
  $('#brand').val(phone.brand);
  $('#model').val(phone.model);
  $('#price').val(phone.price);
  $('#description').val(phone.description);
}

function deletePhoneById(id) {
  if (confirm("¿Seguro que deseas eliminar este teléfono?")) {
    $.ajax({
      url: `${url}/${id}`,
      type: 'delete',
      success: function () {
        alert("Teléfono eliminado correctamente.");
        getPhones();
      }
    });
  }
}


  
