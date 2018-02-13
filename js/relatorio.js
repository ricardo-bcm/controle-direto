const list = async () => {
  const url = `dbscripts/relatorio.php`;
  try {
    let response = await fetch( url );
    if ( response.ok ) {
      let jsonResponse = await response.json();
      console.log(jsonResponse);
      return jsonResponse;
    }
  } catch(e) {
    console.log(e);
  }
};

let showResponse = json => {
  let total = 0;
   json.forEach( function(element, index) {
      total += parseFloat(element);
   });
  document.getElementById('total-geral').innerHTML = 'R$ ' + total.toFixed(2);
};

list().then( response => showResponse( response ) );