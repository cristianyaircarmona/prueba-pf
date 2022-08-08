import Role from '../models/Role';

export const createRoles = async () => {

    try {
        const count = await Role.estimatedDocumentCount()
    
        if (count > 0) return console.log('Roles loaded');
    
        const values = await Promise.all([new Role({ name: 'user' }).save(),
        new Role({ name: 'admin' }).save()]);
    
        console.log('Roles created');

    } catch(err){
        console.error(err)
    } 

}