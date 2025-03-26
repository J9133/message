export async function update(url, token, datajson) {
  async function get() {
    const response = await fetch(url)
    return response.json()
  }
  
  async function getsha() {
  const response = await fetch(url, {
    headers: {
      'Authorization': `token ${token}`
    }
  });
  const res = await response.json();
  console.log("SHA:", res.sha);
  return res.sha;
}
  const sha = await getsha()
  let data = await get()
  const datanew = JSON.parse(atob(data.content))
  const fdata = { ...datanew, ...datajson };
  const newdata = btoa(JSON.stringify(fdata, null, 2));
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization':`token ${token}`,
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({
      message: 'new',
      content: newdata,
      branch: 'main',
      sha: sha
    })
  })
  
  console.log(response)
}// end update func

export function hide(message) {
  try {
    const item = document.createElement('h2');
    const usr = document.getElementById('username')
    item.id = 'message';
    if (usr.value){
      item.textContent = message
    } else {
      item.textContent = message
    }
    document.getElementById('chatBox').appendChild(item);
  } catch (error) {
    console.error(error);
  }
}

export async function get(url, token) {
  const response = await fetch(url, {
    headers: {
      'Authorization': `token ${token}`
    }
  })
  const data = await response.json()
  return await atob(data.content)
    }
