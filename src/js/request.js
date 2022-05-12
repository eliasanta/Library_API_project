/* altri modi per fare le chiamate */
export class Request {
  async getFetch(url) {
    let response = await fetch(url); // la fetch restituisce una promise di conseguenza non è necessario scrivere la promise esplicitamente
    return await response.json();
  }
  
  async postFetch(url, dataPost) {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(dataPost),
    });
    return await response.json();
  }

}
