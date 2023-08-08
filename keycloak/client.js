async function isActive(accessToken) {
  const isActive = await client.introspect(accessToken);
  console.log("test", isActive)

  if (isActive.active == false) {
    return false;
  } else {
    return true;
  }
}

async function getUserRoles(accessToken){
  const isActive = await client.introspect(accessToken)

  if(isActive.active == false){
    return null
  }
  else{
    return isActive.realm_access.roles
  }
}

