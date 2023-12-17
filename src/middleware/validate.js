import { getUserByLogin } from '../models/queries/authenticationQueries.js';

export default async function validate(user, expectedPermission) {  
    try {     
      if(!user)
        return false;
      
      const dbUser = await getUserByLogin(user.login);  

      if (!dbUser)
        return false;
        
      if(Boolean(dbUser.admin) === expectedPermission)
        return true;
      else
        return false;
      
    } catch (error) {
      console.log(error);
    }  
}