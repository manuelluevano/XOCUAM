export async function loginApi(user, pass) {
  try {
    var requestOptions = {
      method: "POST",
      redirect: "follow",
    };

    const url = `http://70.35.199.154/XOCUAMAPI/api/Security/Autenticate?userName=${user}&password=${pass}&apiKey=A7714912-05A1-4677-B79D-12F8F7CFDD76`;
    const response = await fetch(url, requestOptions);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log("error login", error);
  }
}

export async function registerUser(firsName, lastName, email, password) {
  try {
    var requestOptions = {
      method: "POST",
      redirect: "follow",
    };

    const url = `http://70.35.199.154/XOCUAMAPI/Api/Security/Register?email=${email}&firstName=${firsName}&apiKey=A7714912-05A1-4677-B79D-12F8F7CFDD76&lastName=${lastName}&password=${password}`;
    const response = await fetch(url, requestOptions);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log("error login", error);
  }
}

export async function forgotPassword(email) {
  try {
    var requestOptions = {
      method: "POST",
      redirect: "follow",
    };
    const url = `http://70.35.199.154/XOCUAMAPI/Api/Security/PasswordRecovery?email=${email}&apiKey=A7714912-05A1-4677-B79D-12F8F7CFDD76`;
    const response = await fetch(url, requestOptions);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log("error login", error);
  }
}

export async function listEvents(cat) {
  // Obtemos el dia actual
  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    //Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
    if (month > 9) {
      return year + "-" + month + "-" + date; //format: d-m-y;
    } else {
      return year + "-" + 0 + month + "-" + date; //format: d-m-y;
    }
  };
  //Obtenemos inico de ventos (de un mes)
  const getCurrentDateInicio = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth();
    if (month === 11) {
      var year = new Date().getFullYear() + 1;
      var month = 1;
    } else if (month === 12) {
      var year = new Date().getFullYear() + 1;
      var month = 2;
    } else {
      var year = new Date().getFullYear();
      var month = new Date().getMonth() + 3;
    }

    //Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
    if (month > 9) {
      return year + "-" + month + "-" + date; //format: d-m-y;
    } else {
      return year + "-" + 0 + month + "-" + date; //format: d-m-y;
    }
  };

  const fechaActual = getCurrentDate();
  console.log("Fecha Actual", fechaActual);
  const fechaTermino = getCurrentDateInicio();
  console.log("Fecha Termino", fechaTermino);

  try {
    var requestOptions = {
      method: "POST",
      redirect: "follow",
    };
    const url = `http://70.35.199.154/XOCUAMAPI/Api/EventsAPI/EventList?beginDate=${fechaActual}&endDate=${fechaTermino}&categoryID=${cat}&apiKey=A7714912-05A1-4677-B79D-12F8F7CFDD76`;
    const response = await fetch(url, requestOptions);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log("error get events", error);
  }
}

export async function eventoSeleccionado(EventId) {
  console.log("id recibido", EventId);
  try {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    const url = `http://70.35.199.154/XOCUAMAPI/Api/EventsAPI/GetEventData?eventID=${EventId}&apiKey=A7714912-05A1-4677-B79D-12F8F7CFDD76`;
    const response = await fetch(url, requestOptions);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function registroEvento(id, user) {
  console.log("Registro de evento", id, "user", user);
  try {
    var requestOptions = {
      method: "POST",
      redirect: "follow",
    };
    const url = `http://70.35.199.154/XOCUAMAPI/Api/EventsAPI/EventSubscription?eventID=${id}&userID=${user}&apiKey=A7714912-05A1-4677-B79D-12F8F7CFDD76`;
    const response = await fetch(url, requestOptions);
    const result = await response.json();
    console.log("Resultado", result);

    // Alert.alert(`${result.errorMsg}`);

    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function EliminarEvento(id) {
  try {
    var requestOptions = {
      method: "POST",
      redirect: "follow",
    };
    const url = `http://70.35.199.154/XOCUAMAPI/Api/EventsAPI/RemoveEventSubscription?eventSubscriptionID=${id}&apiKey=A7714912-05A1-4677-B79D-12F8F7CFDD76`;
    const response = await fetch(url, requestOptions);
    const result = await response.json();
    console.log("Elemento eliminado", result);
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function eventosSuscritos(userID) {
  try {
    var requestOptions = {
      method: "POST",
      redirect: "follow",
    };
    const url = `http://70.35.199.154/XOCUAMAPI/Api/EventsAPI/EventSubscriptionList?userID=${userID}&apiKey=A7714912-05A1-4677-B79D-12F8F7CFDD76`;
    const response = await fetch(url, requestOptions);
    const result = await response.json();
    // console.log("Mis Eventos Suscritos", result);

    return result;
  } catch (error) {
    console.log(error);
  }
}
