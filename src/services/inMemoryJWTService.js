const inMemoryJWTService = ()=>{
    let inMemoryJWT = null
    const getToken = ()=> inMemoryJWT
    const setToken = (token, tokenExpiration = null) => {
        inMemoryJWT = token
    }
    const deleteToken = () => {inMemoryJWT = null}
    return {getToken, setToken, deleteToken}
}

export default inMemoryJWTService()